'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { colourPresets } from '@/lib/constants/colour-presets'
import { useSessionStore } from '@/lib/store/session-store'

const MIN_SELECTION = 1
const MAX_SELECTION = 3

interface SelectedColoursProps {
  onNext: () => void
  onBack: () => void
}

export function SelectedColours({ onNext, onBack }: SelectedColoursProps) {
  const session = useSessionStore((state) => state.session)
  const updateSession = useSessionStore((state) => state.updateSession)

  const selected = session?.colour?.selected ?? []
  const custom = session?.colour?.custom ?? []

  const removeColour = (id: string) => {
    updateSession({
      colour: {
        selected: selected.filter((s) => s !== id),
        custom,
      },
    })
  }

  const selectedColours = selected
    .map((id) => colourPresets.find((c) => c.id === id))
    .filter(Boolean)

  const isFormValid = selected.length >= MIN_SELECTION

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-[#171717]">選択中</h3>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            isFormValid ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#F5F5F5] text-[#737373]'
          }`}
        >
          {selected.length} / {MAX_SELECTION}
        </span>
      </div>

      {selectedColours.length > 0 ? (
        <div className="space-y-3 mb-6">
          {selectedColours.map((colour) => (
            <div key={colour!.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F5F5]">
              <div
                className="w-10 h-10 rounded-full shrink-0"
                style={{ backgroundColor: colour!.hex }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#171717]">{colour!.name}</p>
                <p className="text-xs text-[#737373]">{colour!.description}</p>
              </div>
              <button
                type="button"
                onClick={() => removeColour(colour!.id)}
                className="text-[#A3A3A3] hover:text-[#171717] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-[#A3A3A3] text-sm mb-6">
          <div
            className="w-16 h-16 mx-auto mb-3 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #EF4444, #F97316, #EAB308, #22C55E, #3B82F6, #A855F7, #EF4444)',
              opacity: 0.3,
            }}
          />
          <p>カラーを選んでください</p>
        </div>
      )}

      {/* Colour Preview */}
      {selectedColours.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-[#171717]">
          <p className="text-xs text-[#A3A3A3] mb-3">Preview</p>
          <div className="flex gap-2">
            {selectedColours.map((colour) => (
              <div
                key={colour!.id}
                className="flex-1 h-12 rounded-lg first:rounded-l-xl last:rounded-r-xl"
                style={{ backgroundColor: colour!.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onNext}
          disabled={!isFormValid}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#171717] text-white hover:bg-[#2d2d2d] disabled:bg-[#E5E5E5] disabled:text-[#A3A3A3] disabled:cursor-not-allowed"
        >
          次へ
          <svg
            className="w-4 h-4"
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
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[#737373] hover:text-[#171717] hover:bg-[#F5F5F5]"
        >
          <svg
            className="w-4 h-4"
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
