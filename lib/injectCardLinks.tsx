import React from 'react'

export interface CardRef {
  id: string
  titles: string[]
}

/**
 * Replace every occurrence of each card's title aliases with a clickable <span>.
 * All aliases across all cards are sorted longest-first so "风清扬" wins over "风清"
 * when both appear. Titles shorter than 2 characters are skipped.
 */
export function injectCardLinks(
  content: string,
  cards: CardRef[],
  onCardClick: (id: string, title: string) => void,
  linkClassName: string,
  _matchedIds: Set<string>
): React.ReactNode[] {
  if (!content || cards.length === 0) return [content]

  const allTitles: { cardId: string; title: string }[] = []
  for (const card of cards) {
    for (const title of card.titles) {
      if (title.length < 2) continue
      allTitles.push({ cardId: card.id, title })
    }
  }

  // Sort longest first so "风清扬" beats "风清"
  allTitles.sort((a, b) => b.title.length - a.title.length)

  let processedContent = content
  const replacements = new Map<string, { cardId: string; title: string }>()

  allTitles.forEach(({ cardId, title }, idx) => {
    const placeholder = `__CARD_${cardId}_${idx}__`
    // Replace all occurrences at once; placeholders can't match later titles
    processedContent = processedContent.split(title).join(placeholder)
    replacements.set(placeholder, { cardId, title })
  })

  if (replacements.size === 0) return [content]

  const parts = processedContent.split(/(__CARD_[^_]+_\d+__)/)

  return parts
    .map((part, i) => {
      const match = replacements.get(part)
      if (match) {
        return (
          <span
            key={i}
            className={linkClassName}
            data-card-id={match.cardId}
            onClick={() => onCardClick(match.cardId, match.title)}
          >
            {match.title}
          </span>
        )
      }
      return part ? <span key={i}>{part}</span> : null
    })
    .filter(Boolean) as React.ReactNode[]
}
