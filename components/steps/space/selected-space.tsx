'use client'

import { Button } from '@/components/ui/button'
import { spacePresets } from '@/lib/constants/space-presets'
import { useSessionStore } from '@/lib/store/session-store'

interface SelectedSpaceProps {
  onNext: () => void
  onBack: () => void
}

export function SelectedSpace({ onNext, onBack }: SelectedSpaceProps) {
  const session = useSessionStore((state) => state.session)
  const selected = session?.space?.selected ?? []

  const selectedSpace = spacePresets.find((s) => selected.includes(s.id))
  const isFormValid = selected.length === 1

  const gapClass = selectedSpace
    ? ({
        compact: 'gap-0.5',
        comfortable: 'gap-1.5',
        relaxed: 'gap-3',
        spacious: 'gap-5',
      }[selectedSpace.spaceType] ?? 'gap-2')
    : 'gap-2'

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

      {selectedSpace ? (
        <div className="mb-6">
          <div className="bg-[#171717] rounded-xl p-6 mb-4">
            <div className="h-20 flex items-center justify-center">
              <div className={`flex ${gapClass}`}>
                <div className="w-10 h-5 rounded bg-white" />
                <div className="w-10 h-5 rounded bg-white" />
                <div className="w-10 h-5 rounded bg-white" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-medium text-[#171717] mb-1">{selectedSpace.name}</p>
            <p className="text-sm text-[#737373]">{selectedSpace.nameJa}</p>
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
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </div>
          <p>余白を選んでください</p>
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
