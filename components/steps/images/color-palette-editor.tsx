'use client'

import type { ExtractedColor } from '@/types/session'

interface ColorPaletteEditorProps {
  colors: ExtractedColor[]
  activeIndex: number | null
  onSelectForPick: (index: number | null) => void
  onColorChange: (index: number, hex: string) => void
}

const roleLabels: Record<ExtractedColor['role'], { en: string; ja: string }> = {
  primary: { en: 'Primary', ja: 'メインカラー' },
  secondary: { en: 'Secondary', ja: 'サブカラー' },
  accent: { en: 'Accent', ja: 'アクセント' },
  background: { en: 'Background', ja: '背景色' },
  text: { en: 'Text', ja: 'テキスト' },
}

export function ColorPaletteEditor({
  colors,
  activeIndex,
  onSelectForPick,
  onColorChange,
}: ColorPaletteEditorProps) {
  return (
    <div className="space-y-3">
      {colors.map((color, index) => (
        <div
          key={color.role}
          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
            activeIndex === index
              ? 'border-[#171717] bg-[#F5F5F5]'
              : 'border-[#E5E5E5] hover:border-[#D4D4D4]'
          }`}
        >
          <div className="w-24">
            <p className="text-sm font-medium text-[#171717]">{roleLabels[color.role].en}</p>
            <p className="text-xs text-[#737373]">{roleLabels[color.role].ja}</p>
          </div>

          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <input
                type="color"
                value={color.hex}
                onChange={(e) => onColorChange(index, e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border border-[#E5E5E5]"
                style={{ backgroundColor: color.hex }}
              />
            </div>
            <input
              type="text"
              value={color.hex.toUpperCase()}
              onChange={(e) => onColorChange(index, e.target.value)}
              className="flex-1 px-3 py-2 text-sm font-mono bg-white border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#171717]/10"
            />
          </div>

          <button
            type="button"
            onClick={() => onSelectForPick(activeIndex === index ? null : index)}
            className={`p-2.5 rounded-lg transition-colors ${
              activeIndex === index
                ? 'bg-[#171717] text-white'
                : 'bg-[#F5F5F5] text-[#525252] hover:bg-[#E5E5E5]'
            }`}
            title="画像から色を取得"
            aria-label="画像から色を取得"
          >
{/* Eyedropper/Pipette icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.35 2.65a2.5 2.5 0 00-3.54 0l-1.41 1.41-1.06-1.06a1 1 0 00-1.41 1.41l1.06 1.06-7.07 7.07a3 3 0 00-.88 2.12V17a1 1 0 001 1h2.34a3 3 0 002.12-.88l7.07-7.07 1.06 1.06a1 1 0 001.41-1.41l-1.06-1.06 1.41-1.41a2.5 2.5 0 000-3.54l-1.04-1.04zM8.41 16H7v-1.41l7.07-7.07 1.41 1.41L8.41 16z" />
              <path d="M5 20a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
