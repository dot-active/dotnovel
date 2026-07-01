import React from 'react'

export interface CardRef {
  id: string
  title: string
}

/**
 * Replace each card's title (first occurrence only) with a clickable <span>.
 * Longest titles matched first so "风清扬" wins over "风清" when both appear.
 * Titles shorter than 2 characters are skipped.
 *
 * @param matchedIds  Shared Set across paragraph calls — cards already linked
 *                    in a previous paragraph are skipped, ensuring each title
 *                    is linked at most once per chapter.
 */
export function injectCardLinks(
  content: string,
  cards: CardRef[],
  onCardClick: (id: string) => void,
  linkClassName: string,
  matchedIds: Set<string>
): React.ReactNode[] {
  if (!content || cards.length === 0) return [content]

  // Sort longest first so "风清扬" beats "风清"
  const sortedCards = [...cards].sort((a, b) => b.title.length - a.title.length)

  let processedContent = content
  const replacements = new Map<string, string>() // placeholder -> cardId

  for (const card of sortedCards) {
    if (card.title.length < 2) continue
    if (matchedIds.has(card.id)) continue // already linked in a prior paragraph

    const index = processedContent.indexOf(card.title)
    if (index === -1) continue

    const placeholder = `__CARD_${card.id}__`
    processedContent =
      processedContent.slice(0, index) +
      placeholder +
      processedContent.slice(index + card.title.length)
    replacements.set(placeholder, card.id)
    matchedIds.add(card.id) // mark so subsequent paragraphs skip it
  }

  if (replacements.size === 0) return [content]

  const parts = processedContent.split(/(__CARD_[^_]+__)/)

  return parts
    .map((part, i) => {
      const cardId = replacements.get(part)
      if (cardId) {
        const card = cards.find((c) => c.id === cardId)!
        return (
          <span
            key={i}
            className={linkClassName}
            data-card-id={cardId}
            onClick={() => onCardClick(cardId)}
          >
            {card.title}
          </span>
        )
      }
      return part ? <span key={i}>{part}</span> : null
    })
    .filter(Boolean) as React.ReactNode[]
}
