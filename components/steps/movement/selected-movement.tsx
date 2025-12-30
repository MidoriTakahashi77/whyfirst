'use client'

import { Button } from '@/components/ui/button'
import { movementPresets } from '@/lib/constants/movement-presets'
import { useSessionStore } from '@/lib/store/session-store'

interface SelectedMovementProps {
  onNext: () => void
  onBack: () => void
}

const getAnimationClass = (type: string) => {
  switch (type) {
    case 'subtle':
      return 'animate-movement-subtle'
    case 'smooth':
      return 'animate-movement-smooth'
    case 'gentle':
      return 'animate-movement-gentle'
    case 'responsive':
      return 'animate-movement-responsive'
    case 'dynamic':
      return 'animate-movement-dynamic'
    case 'playful':
      return 'animate-movement-playful'
    case 'energetic':
      return 'animate-movement-energetic'
    default:
      return ''
  }
}

export function SelectedMovement({ onNext, onBack }: SelectedMovementProps) {
  const session = useSessionStore((state) => state.session)

  const selected = session?.movement?.selected ?? []
  const selectedMovement = movementPresets.find((m) => selected.includes(m.id))
  const isFormValid = selected.length === 1

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-[#171717]">選択中</h3>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            isFormValid ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#F5F5F5] text-[#737373]'
          }`}
        >
          {isFormValid ? '1 / 1' : '0 / 1'}
        </span>
      </div>

      {selectedMovement ? (
        <div className="mb-6">
          {/* Preview */}
          <div className="bg-[#171717] rounded-xl p-6 mb-4">
            <div className="h-20 flex items-center justify-center">
              <div
                className={`w-12 h-12 rounded-lg bg-white ${getAnimationClass(selectedMovement.animation)}`}
              />
            </div>
          </div>

          <div className="text-center">
            <p className="font-medium text-[#171717] mb-1">{selectedMovement.name}</p>
            <p className="text-sm text-[#737373]">{selectedMovement.nameJa}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-sm text-[#A3A3A3] mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-[#F5F5F5] flex items-center justify-center">
            <svg
              className="w-8 h-8 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          </div>
          <p>動きを選んでください</p>
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
        </Button>

        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[#737373] hover:text-[#171717] hover:bg-[#F5F5F5]"
        >
          戻る
        </Button>
      </div>
    </div>
  )
}
