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

// POST /api/volumes/translate  — translate a volume title into target locales
export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { sourceLocale, title, targetLocales } = body as {
    sourceLocale: string
    title: string
    targetLocales: string[]
  }

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }
  if (!targetLocales?.length) {
    return NextResponse.json({ error: 'No target locales specified' }, { status: 400 })
  }

  const result: Record<string, { title: string }> = {}

  // zh-CN <-> zh-TW via OpenCC (instant, no AI)
  const zhTargets = targetLocales.filter((l) => ZH_LOCALES.has(l) && l !== sourceLocale)
  for (const loc of zhTargets) {
    const convert =
      sourceLocale === 'zh-CN' && loc === 'zh-TW'
        ? simplifiedToTraditional
        : sourceLocale === 'zh-TW' && loc === 'zh-CN'
          ? traditionalToSimplified
          : null
    if (!convert) continue
    result[loc] = { title: convert(title) }
  }

  // Other locales via Claude
  const aiTargets = targetLocales.filter((l) => !ZH_LOCALES.has(l) && l !== sourceLocale)

  if (aiTargets.length > 0) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const targetList = aiTargets.map((l) => `${LOCALE_NAMES[l] ?? l} (${l})`).join(', ')

    const systemPrompt = `你是专业翻译，将小说分集名称翻译成多种语言。
保持原有的序号格式（如"第一卷"对应语言的表达）。
只返回 JSON，不要任何说明。
格式：{"en": {"title": "..."}, "ja": {"title": "..."}}`

    const userPrompt = `源语言：${LOCALE_NAMES[sourceLocale] ?? sourceLocale}
分集名称：${title}
翻译至：${targetList}`

    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const raw = msg.content[0]?.type === 'text' ? msg.content[0].text.trim() : ''
    try {
      const jsonStr = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
      const parsed = JSON.parse(jsonStr) as Record<string, { title: string }>
      Object.assign(result, parsed)
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI translation response', raw },
        { status: 500 }
      )
    }
  }

  return NextResponse.json(result)
}
