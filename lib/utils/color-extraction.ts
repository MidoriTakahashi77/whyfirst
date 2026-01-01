import { Vibrant } from 'node-vibrant/browser'
import type { ExtractedColor } from '@/types/session'

export async function extractColorsFromImage(imageUrl: string): Promise<ExtractedColor[]> {
  const palette = await Vibrant.from(imageUrl).getPalette()

  const colorMapping: { swatch: keyof typeof palette; role: ExtractedColor['role'] }[] = [
    { swatch: 'Vibrant', role: 'primary' },
    { swatch: 'Muted', role: 'secondary' },
    { swatch: 'DarkVibrant', role: 'accent' },
    { swatch: 'LightMuted', role: 'background' },
    { swatch: 'DarkMuted', role: 'text' },
  ]

  const colors: ExtractedColor[] = colorMapping
    .filter(({ swatch }) => palette[swatch])
    .map(({ swatch, role }) => ({
      role,
      hex: palette[swatch]!.hex,
    }))

  // フォールバック：5色未満の場合はデフォルト色を追加
  const defaultColors: ExtractedColor[] = [
    { role: 'primary', hex: '#3B82F6' },
    { role: 'secondary', hex: '#10B981' },
    { role: 'accent', hex: '#F59E0B' },
    { role: 'background', hex: '#F8FAFC' },
    { role: 'text', hex: '#1E293B' },
  ]

  while (colors.length < 5) {
    const missing = defaultColors.find((dc) => !colors.some((c) => c.role === dc.role))
    if (missing) colors.push(missing)
    else break
  }

  return colors
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

export function getColorAtPixel(canvas: HTMLCanvasElement, x: number, y: number): string {
  const ctx = canvas.getContext('2d')
  if (!ctx) return '#000000'

  const pixel = ctx.getImageData(x, y, 1, 1).data
  return rgbToHex(pixel[0], pixel[1], pixel[2])
}
