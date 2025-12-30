'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { neutralColours, softColours, vividColours } from '@/lib/constants/colour-presets'
import { useSessionStore } from '@/lib/store/session-store'
import type { ColourPreset } from '@/types'
import { ColourCard } from './colour-card'

const MIN_SELECTION = 1
const MAX_SELECTION = 3

interface ColourSelectorProps {
  onNext: () => void
  onBack: () => void
}

export function ColourSelector({ onNext, onBack }: ColourSelectorProps) {
  const session = useSessionStore((state) => state.session)
  const updateSession = useSessionStore((state) => state.updateSession)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const selected = session?.colour?.selected ?? []
  const custom = session?.colour?.custom ?? []

  const isSelected = (id: string) => selected.includes(id)

  const toggleColour = (colour: ColourPreset) => {
    if (isSelected(colour.id)) {
      updateSession({
        colour: {
          selected: selected.filter((s) => s !== colour.id),
          custom,
        },
      })
    } else if (selected.length < MAX_SELECTION) {
      updateSession({
        colour: {
          selected: [...selected, colour.id],
          custom,
        },
      })
    }
  }

  const isFormValid = selected.length >= MIN_SELECTION

  const renderPalette = (
    title: string,
    titleJa: string,
    colours: ColourPreset[],
    baseDelay: number
  ) => (
    <div className="mb-10">
      <div className="flex items-baseline gap-2 mb-4">
        <h3 className="text-sm font-medium text-[#737373]">{title}</h3>
        <span className="text-sm text-[#A3A3A3]">{titleJa}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {colours.map((colour, index) => (
          <div
            key={colour.id}
            className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${baseDelay + index * 30}ms` }}
          >
            <ColourCard
              colour={colour}
              selected={isSelected(colour.id)}
              disabled={!isSelected(colour.id) && selected.length >= MAX_SELECTION}
              onClick={() => toggleColour(colour)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Title */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-[#737373] mb-3">Step 03</p>
        <h1 className="text-xl md:text-3xl font-bold text-[#171717] mb-4">Whyを色で表現する</h1>
        <p className="text-[#525252] mb-4">
          先ほど言語化したWhyから連想される色を
          <span className="font-medium">
            {MIN_SELECTION}〜{MAX_SELECTION}色
          </span>
          選んで、コンセプトを具体化しましょう。
        </p>
        <div className="flex flex-col gap-2 text-sm text-[#737373]">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#22C55E] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>実際のデザインに使う色ではなく、あくまでイメージです</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#22C55E] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>直感で選んでください。正解・不正解はありません</span>
          </div>
        </div>
      </div>

      {/* Colour Palettes */}
      {renderPalette('Vivid', 'ビビッドカラー', vividColours, 100)}
      {renderPalette('Soft', 'ソフト・パステル', softColours, 400)}
      {renderPalette('Neutral', 'ニュートラルカラー', neutralColours, 700)}

      {/* Mobile Navigation */}
      <div className="lg:hidden flex flex-col gap-3 pt-6">
        <Button
          onClick={onNext}
          disabled={!isFormValid}
          className="w-full px-5 py-3 bg-[#171717] text-white rounded-xl hover:bg-[#2d2d2d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          次へ
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full text-[#737373] hover:text-[#171717]"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          戻る
        </Button>
      </div>
    </div>
  )
}
