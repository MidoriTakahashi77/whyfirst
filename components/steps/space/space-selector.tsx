'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { spacePresets } from '@/lib/constants/space-presets'
import { useSessionStore } from '@/lib/store/session-store'
import { SpaceCard } from './space-card'

interface SpaceSelectorProps {
  onNext: () => void
  onBack: () => void
}

export function SpaceSelector({ onNext, onBack }: SpaceSelectorProps) {
  const session = useSessionStore((state) => state.session)
  const updateSession = useSessionStore((state) => state.updateSession)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const selected = session?.space?.selected ?? []

  const selectSpace = (id: string) => {
    updateSession({
      space: {
        selected: [id],
        custom: [],
      },
    })
  }

  const isFormValid = selected.length === 1

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Title */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-[#737373] mb-3">Step 06</p>
        <h1 className="text-xl md:text-3xl font-bold text-[#171717] mb-4">余白の印象を選ぶ</h1>
        <p className="text-[#525252] mb-4">
          UIの余白・スペーシングの雰囲気を
          <span className="font-medium">1つ</span>
          選んでください。
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
            <span>要素間の距離やパディングに影響します</span>
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
            <span>情報密度や読みやすさに関わります</span>
          </div>
        </div>
      </div>

      {/* Space Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spacePresets.map((space, index) => (
          <div
            key={space.id}
            className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${100 + index * 50}ms` }}
          >
            <SpaceCard
              space={space}
              selected={selected.includes(space.id)}
              onSelect={() => selectSpace(space.id)}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex flex-col gap-3 pt-6">
        <Button
          onClick={onNext}
          disabled={!isFormValid}
          className="w-full px-5 py-3 bg-[#171717] text-white rounded-xl hover:bg-[#2d2d2d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          次へ
        </Button>
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full text-[#737373] hover:text-[#171717]"
        >
          戻る
        </Button>
      </div>
    </div>
  )
}
