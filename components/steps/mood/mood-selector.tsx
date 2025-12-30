'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { moodCategories, onomatopoeiaList } from '@/lib/constants/mood-presets'
import { useSessionStore } from '@/lib/store/session-store'
import { MoodChip } from './mood-chip'

interface MoodSelectorProps {
  onNext: () => void
}

export function MoodSelector({ onNext }: MoodSelectorProps) {
  const session = useSessionStore((state) => state.session)
  const updateSession = useSessionStore((state) => state.updateSession)
  const [customInput, setCustomInput] = useState('')

  const selected = session?.mood?.selected ?? []
  const custom = session?.mood?.custom ?? []
  const suggested = session?.mood?.suggestedByLLM ?? []

  const toggleMood = (id: string) => {
    const newSelected = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]

    updateSession({
      mood: { selected: newSelected, custom, suggestedByLLM: suggested },
    })
  }

  const removeCustom = (value: string) => {
    updateSession({
      mood: {
        selected,
        custom: custom.filter((c) => c !== value),
        suggestedByLLM: suggested,
      },
    })
  }

  const addCustom = () => {
    if (customInput.trim() && !custom.includes(customInput.trim())) {
      updateSession({
        mood: {
          selected,
          custom: [...custom, customInput.trim()],
          suggestedByLLM: suggested,
        },
      })
      setCustomInput('')
    }
  }

  const totalSelected = selected.length + custom.length
  const isValid = totalSelected >= 3 && totalSelected <= 10

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <p className="text-sm text-[#737373]">
        {totalSelected} / 10 選択中（3〜10個選択してください）
      </p>

      {/* Categories */}
      {moodCategories.map((category) => (
        <div key={category.id} className="space-y-3">
          <h3 className="text-sm font-medium text-[#737373]">{category.labelJa}</h3>
          <div className="flex flex-wrap gap-2">
            {category.moods.map((mood) => (
              <MoodChip
                key={mood.id}
                label={session?.detectedLanguage === 'en' ? mood.label : mood.labelJa}
                selected={selected.includes(mood.id)}
                recommended={suggested.includes(mood.id)}
                onClick={() => toggleMood(mood.id)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Onomatopoeia */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#737373]">オノマトペ</h3>
        <div className="flex flex-wrap gap-2">
          {onomatopoeiaList.map((item) => (
            <MoodChip
              key={item.id}
              label={item.labelJa}
              selected={selected.includes(item.id)}
              onClick={() => toggleMood(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#737373]">カスタム</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustom()}
            placeholder="独自の形容詞を追加"
            className="flex-1 px-4 py-2 bg-[#F5F5F5] rounded-lg text-[#171717] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#171717]/10"
          />
          <Button variant="secondary" onClick={addCustom}>
            追加
          </Button>
        </div>
        {custom.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {custom.map((c) => (
              <MoodChip key={c} label={c} selected onClick={() => removeCustom(c)} />
            ))}
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="px-8 py-3 bg-[#171717] text-white rounded-lg hover:bg-[#2d2d2d] disabled:opacity-50"
        >
          次へ
        </Button>
      </div>
    </div>
  )
}
