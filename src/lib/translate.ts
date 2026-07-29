import Anthropic from '@anthropic-ai/sdk'

export const LOCALE_NAMES: Record<string, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  'en': 'English',
  'ja': '日本語',
  'ko': '한국어',
  'es': 'Español',
}

// Claude occasionally wraps its answer in markdown or appends a "---\n*Note: ...*" explanation
// even when told not to. Strip that defensively in addition to prompting against it.
function sanitizeTranslation(text: string): string {
  let result = text.trim()
  // Drop everything from a "---" divider onward (notes/explanations are appended after it)
  result = result.split(/\n?\s*-{3,}\s*\n?/)[0].trim()

  // Repeatedly strip markdown wrappers — heading marks, bold/italic, wrapping quotes — since
  // Claude sometimes nests them (e.g. "**# Title**") and a single pass can miss the inner one.
  for (let i = 0; i < 4; i++) {
    const before = result
    result = result
      .replace(/^#{1,6}\s*/, '')
      .replace(/^\*{1,3}([^*]+)\*{1,3}$/, '$1')
      .replace(/^_{1,3}([^_]+)_{1,3}$/, '$1')
      .replace(/^["'“”](.+)["'“”]$/, '$1')
      .trim()
    if (result === before) break
  }
  return result
}

export async function translateWithClaude(text: string, targetLocale: string): Promise<string> {
  const targetLang = LOCALE_NAMES[targetLocale] ?? targetLocale
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, timeout: 120_000 })
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 4096,
    system: `你是专业小说翻译，将用户输入的文本翻译成${targetLang}，保持文学风格与语气。

规则（必须严格遵守）：
- 只输出翻译结果本身，不要有任何前言、署名或结尾语。
- 不要附加注释、说明、拼音、原文对照或"Note:"之类的解释。
- 不要使用markdown格式（不要加#标题、**加粗**、引号包裹等）。
- 不要重复输出翻译结果。`,
    messages: [{ role: 'user', content: text }],
  })
  const block = msg.content[0]
  const raw = block.type === 'text' ? block.text : ''
  return sanitizeTranslation(raw)
}
