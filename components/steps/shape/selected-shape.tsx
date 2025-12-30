'use client'

import { Button } from '@/components/ui/button'
import { shapePresets } from '@/lib/constants/shape-presets'
import { useSessionStore } from '@/lib/store/session-store'

interface SelectedShapeProps {
  onNext: () => void
  onBack: () => void
}

const renderShapePreview = (shapeType: string) => {
  const color = '#ffffff'

  switch (shapeType) {
    case 'geometric':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <rect x="10" y="10" width="40" height="40" fill={color} />
        </svg>
      )
    case 'rounded':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <rect x="10" y="10" width="40" height="40" rx="12" ry="12" fill={color} />
        </svg>
      )
    case 'circular':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="30" cy="30" r="22" fill={color} />
        </svg>
      )
    case 'organic':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <path
            d="M30 8 C45 12, 52 25, 48 38 C44 51, 30 54, 18 48 C6 42, 8 28, 14 18 C20 8, 30 8, 30 8Z"
            fill={color}
          />
        </svg>
      )
    case 'angular':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <polygon points="30,8 52,50 8,50" fill={color} />
        </svg>
      )
    case 'minimal':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="3" />
          <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="3" />
        </svg>
      )
    case 'striped':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <line x1="10" y1="14" x2="50" y2="14" stroke={color} strokeWidth="4" />
          <line x1="10" y1="26" x2="50" y2="26" stroke={color} strokeWidth="4" />
          <line x1="10" y1="38" x2="50" y2="38" stroke={color} strokeWidth="4" />
          <line x1="10" y1="50" x2="50" y2="50" stroke={color} strokeWidth="4" />
        </svg>
      )
    case 'grid':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <rect x="8" y="8" width="18" height="18" fill={color} />
          <rect x="34" y="8" width="18" height="18" fill={color} />
          <rect x="8" y="34" width="18" height="18" fill={color} />
          <rect x="34" y="34" width="18" height="18" fill={color} />
        </svg>
      )
    case 'dots':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="15" cy="15" r="6" fill={color} />
          <circle cx="30" cy="15" r="6" fill={color} />
          <circle cx="45" cy="15" r="6" fill={color} />
          <circle cx="15" cy="30" r="6" fill={color} />
          <circle cx="30" cy="30" r="6" fill={color} />
          <circle cx="45" cy="30" r="6" fill={color} />
          <circle cx="15" cy="45" r="6" fill={color} />
          <circle cx="30" cy="45" r="6" fill={color} />
          <circle cx="45" cy="45" r="6" fill={color} />
        </svg>
      )
    case 'hexagon':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <polygon points="30,5 52,17 52,43 30,55 8,43 8,17" fill={color} />
        </svg>
      )
    case 'diamond':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <polygon points="30,6 54,30 30,54 6,30" fill={color} />
        </svg>
      )
    case 'pattern':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <polygon points="15,8 22,20 8,20" fill={color} />
          <polygon points="30,8 37,20 23,20" fill={color} />
          <polygon points="45,8 52,20 38,20" fill={color} />
          <polygon points="22,22 29,34 15,34" fill={color} />
          <polygon points="37,22 44,34 30,34" fill={color} />
          <polygon points="15,36 22,48 8,48" fill={color} />
          <polygon points="30,36 37,48 23,48" fill={color} />
          <polygon points="45,36 52,48 38,48" fill={color} />
        </svg>
      )
    case 'wave':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <path d="M5 20 Q15 10, 25 20 T45 20 T55 20" fill="none" stroke={color} strokeWidth="3" />
          <path d="M5 32 Q15 22, 25 32 T45 32 T55 32" fill="none" stroke={color} strokeWidth="3" />
          <path d="M5 44 Q15 34, 25 44 T45 44 T55 44" fill="none" stroke={color} strokeWidth="3" />
        </svg>
      )
    case 'pill':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <rect x="8" y="20" width="44" height="20" rx="10" ry="10" fill={color} />
        </svg>
      )
    case 'blob':
      return (
        <svg width={80} height={80} viewBox="0 0 60 60" aria-hidden="true">
          <path
            d="M30 6 C42 6, 54 14, 52 28 C50 42, 56 48, 42 54 C28 60, 18 54, 12 44 C6 34, 8 22, 16 14 C24 6, 30 6, 30 6Z"
            fill={color}
          />
        </svg>
      )
    default:
      return null
  }
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
            <div className="h-24 flex items-center justify-center">
              {renderShapePreview(selectedShape.shapeType)}
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
