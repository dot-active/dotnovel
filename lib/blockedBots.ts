// Crawlers that bring no readers but each request renders a dynamic page and
// wakes the Neon compute (which then bills for 5+ minutes before suspending).
// AI-training scrapers and SEO-audit bots; regular search engines (Googlebot,
// Bingbot, Baiduspider, YandexBot, DuckDuckBot…) are deliberately not listed.
export const BLOCKED_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'PerplexityBot',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
  'FacebookBot',
  'Diffbot',
  'cohere-ai',
  'ImagesiftBot',
  'Omgilibot',
  'Timpibot',
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'DataForSeoBot',
  'PetalBot',
  'serpstatbot',
  'MegaIndex',
] as const

const blockedBotPattern = new RegExp(BLOCKED_BOTS.join('|'), 'i')

export function isBlockedBot(userAgent: string | null): boolean {
  return !!userAgent && blockedBotPattern.test(userAgent)
}
