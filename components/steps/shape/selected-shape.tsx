'use client'

import { Button } from '@/components/ui/button'
import { shapePresets } from '@/lib/constants/shape-presets'
import { useSessionStore } from '@/lib/store/session-store'

interface SelectedShapeProps {
  onNext: () => void
  onBack: () => void
}

export function SelectedShape({ onNext, onBack }: SelectedShapeProps) {
  const session = useSessionStore((state) => state.session)
  const selected = session?.shape?.selected ?? []

  const selectedShape = shapePresets.find((s) => selected.includes(s.id))
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

      {selectedShape ? (
        <div className="mb-6">
          <div className="bg-[#171717] rounded-xl p-6 mb-4">
            <div className="h-20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-lg" />
            </div>
          </div>

          <div className="text-center">
            <p className="font-medium text-[#171717] mb-1">{selectedShape.name}</p>
            <p className="text-sm text-[#737373]">{selectedShape.nameJa}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-[#A3A3A3] text-sm mb-6">
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
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </div>
          <p>形を選んでください</p>
        </div>
      )}

      {/* Navigation */}
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
