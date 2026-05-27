import * as OpenCC from 'opencc-js'

export function simplifiedToTraditional(text: string): string {
  const converter = OpenCC.Converter({ from: 'cn', to: 'twp' })
  return converter(text)
}

export function traditionalToSimplified(text: string): string {
  const converter = OpenCC.Converter({ from: 'twp', to: 'cn' })
  return converter(text)
}
