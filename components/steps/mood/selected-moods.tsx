'use client'

import { X } from 'lucide-react'
import { moodPresets } from '@/lib/constants/mood-presets'
import { useSessionStore } from '@/lib/store/session-store'

export function SelectedMoods() {
  const session = useSessionStore((state) => state.session)
  const updateSession = useSessionStore((state) => state.updateSession)

  const selected = session?.mood?.selected ?? []
  const custom = session?.mood?.custom ?? []
  const suggested = session?.mood?.suggestedByLLM ?? []

  const removeMood = (id: string) => {
    updateSession({
      mood: {
        selected: selected.filter((s) => s !== id),
        custom,
        suggestedByLLM: suggested,
      },
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

  const selectedMoods = selected.map((id) => moodPresets.find((m) => m.id === id)).filter(Boolean)

  if (selectedMoods.length === 0 && custom.length === 0) {
    return <div className="text-sm text-[#A3A3A3]">選択したMoodがここに表示されます</div>
  }

  return (
    <div className="space-y-2">
      {selectedMoods.map((mood) => (
        <div
          key={mood!.id}
          className="flex items-center justify-between px-3 py-2 bg-[#F5F5F5] rounded-lg"
        >
          <span className="text-sm text-[#171717]">
            {session?.detectedLanguage === 'en' ? mood!.label : mood!.labelJa}
          </span>
          <button
            type="button"
            onClick={() => removeMood(mood!.id)}
            className="p-1 hover:bg-[#E5E5E5] rounded"
          >
            <X className="w-3 h-3 text-[#737373]" />
          </button>
        </div>
      ))}
      {custom.map((c) => (
        <div
          key={c}
          className="flex items-center justify-between px-3 py-2 bg-[#F5F5F5] rounded-lg"
        >
          <span className="text-sm text-[#171717]">{c}</span>
          <button
            type="button"
            onClick={() => removeCustom(c)}
            className="p-1 hover:bg-[#E5E5E5] rounded"
          >
            <X className="w-3 h-3 text-[#737373]" />
          </button>
        </div>
      ))}
    </div>
  )
}
