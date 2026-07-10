import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { simplifiedToTraditional, traditionalToSimplified } from '@/lib/opencc'

const LOCALE_NAMES: Record<string, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
}

const ZH_LOCALES = new Set(['zh-CN', 'zh-TW'])

interface CardEntryInput {
  content: string
  fromChapter: number
}

interface TranslatedCard {
  titles: string[]
  entries: CardEntryInput[]
}

type TranslationResult = Record<string, TranslatedCard>

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { sourceLocale, titles, entries, targetLocales } = body as {
    sourceLocale: string
    titles: string[]
    entries: CardEntryInput[]
    targetLocales: string[]
  }

  if (!titles?.some((t) => t.trim()))
    return NextResponse.json({ error: 'At least one title is required' }, { status: 400 })
  if (!targetLocales?.length)
    return NextResponse.json({ error: 'No target locales specified' }, { status: 400 })

  const result: TranslationResult = {}

  // Handle zh-CN <-> zh-TW with OpenCC
  const zhTargets = targetLocales.filter((l) => ZH_LOCALES.has(l) && l !== sourceLocale)
  for (const loc of zhTargets) {
    const convert = sourceLocale === 'zh-CN' && loc === 'zh-TW'
      ? simplifiedToTraditional
      : sourceLocale === 'zh-TW' && loc === 'zh-CN'
      ? traditionalToSimplified
      : null
    if (!convert) continue
    result[loc] = {
      titles: titles.map((t) => convert(t)),
      entries: (entries ?? []).map((e) => ({
        content: convert(e.content),
        fromChapter: e.fromChapter,
      })),
    }
  }

  // Handle other locales with Claude
  const aiTargets = targetLocales.filter((l) => !ZH_LOCALES.has(l))

  if (aiTargets.length > 0) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const targetList = aiTargets
      .map((l) => `${LOCALE_NAMES[l] ?? l} (${l})`)
      .join(', ')

    const systemPrompt = `你是专业翻译，将小说卡片内容翻译成多种语言。
titles 是人名/专有名词，保持原意，必要时音译。
entries 是百科词条内容，自然翻译。
fromChapter 是数字，原样保留不翻译。
只返回 JSON，不要任何说明。
格式：{"en": {"titles": ["...", "..."], "entries": [{"content": "...", "fromChapter": 1}]}, "ja": {...}}`

    const userPrompt = `源语言：${LOCALE_NAMES[sourceLocale] ?? sourceLocale}
内容：${JSON.stringify({ titles, entries })}
翻译至：${targetList}`

    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const raw = msg.content[0]?.type === 'text' ? msg.content[0].text.trim() : ''
    try {
      // Strip markdown code fences if present
      const jsonStr = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
      const parsed = JSON.parse(jsonStr) as TranslationResult
      Object.assign(result, parsed)
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI translation response', raw }, { status: 500 })
    }
  }

  return NextResponse.json(result)
}
