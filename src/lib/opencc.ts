import * as OpenCC from 'opencc-js'

let cnToTw: ReturnType<typeof OpenCC.Converter> | null = null
let twToCn: ReturnType<typeof OpenCC.Converter> | null = null

export function simplifiedToTraditional(text: string): string {
  cnToTw ??= OpenCC.Converter({ from: 'cn', to: 'twp' })
  return cnToTw(text)
}

export function traditionalToSimplified(text: string): string {
  twToCn ??= OpenCC.Converter({ from: 'twp', to: 'cn' })
  return twToCn(text)
}
