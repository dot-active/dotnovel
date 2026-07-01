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

type TranslationResult = Record<string, { title: string; description: string }>

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { sourceLocale, title, description, targetLocales } = body as {
    sourceLocale: string
    title: string
    description: string
    targetLocales: string[]
  }

  if (!title?.trim() || !description?.trim())
    return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
  if (!targetLocales?.length)
    return NextResponse.json({ error: 'No target locales specified' }, { status: 400 })

  const result: TranslationResult = {}

  // Handle zh-CN <-> zh-TW with OpenCC
  const zhTargets = targetLocales.filter((l) => ZH_LOCALES.has(l) && l !== sourceLocale)
  for (const loc of zhTargets) {
    if (sourceLocale === 'zh-CN' && loc === 'zh-TW') {
      result[loc] = {
        title: simplifiedToTraditional(title),
        description: simplifiedToTraditional(description),
      }
    } else if (sourceLocale === 'zh-TW' && loc === 'zh-CN') {
      result[loc] = {
        title: traditionalToSimplified(title),
        description: traditionalToSimplified(description),
      }
    }
  }

  // Handle other locales with Claude
  const aiTargets = targetLocales.filter((l) => !ZH_LOCALES.has(l) || l === sourceLocale)
    .filter((l) => !ZH_LOCALES.has(l))

  if (aiTargets.length > 0) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const targetList = aiTargets
      .map((l) => `${LOCALE_NAMES[l] ?? l} (${l})`)
      .join(', ')

    const systemPrompt = `你是专业小说翻译。将以下角色/设定卡片翻译为多种语言。
title 是小说中的人名或专有名词，翻译时保持原意，必要时音译。
只返回 JSON，不要任何说明或 Markdown。
格式：{"en": {"title": "...", "description": "..."}, "ja": {...}}`

    const userPrompt = `源语言：${LOCALE_NAMES[sourceLocale] ?? sourceLocale}
内容：${JSON.stringify({ title, description })}
翻译至：${targetList}`

    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
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
