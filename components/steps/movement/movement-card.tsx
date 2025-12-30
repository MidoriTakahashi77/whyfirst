'use client'

import type { MovementPreset } from '@/types'

interface MovementCardProps {
  movement: MovementPreset
  selected: boolean
  onSelect: () => void
  index: number
}

const getAnimationClass = (type: string, isActive: boolean) => {
  if (!isActive) return ''
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

export function MovementCard({ movement, selected, onSelect, index }: MovementCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full text-left p-6 rounded-2xl transition-all duration-300 ${
        selected ? 'bg-[#171717] text-white shadow-xl scale-[1.02]' : 'bg-white hover:shadow-md'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Animation Preview */}
      <div
        className={`mb-4 h-16 flex items-center justify-center rounded-xl ${
          selected ? 'bg-white/10' : 'bg-[#F5F5F5]'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-lg ${getAnimationClass(movement.animation, true)} ${
            selected ? 'bg-white' : 'bg-[#171717]'
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className={`font-medium ${selected ? 'text-white' : 'text-[#171717]'}`}>
              {movement.name}
            </h3>
            <span className={`text-sm ${selected ? 'text-white/60' : 'text-[#737373]'}`}>
              {movement.nameJa}
            </span>
          </div>
          <p className={`text-sm mb-3 ${selected ? 'text-white/80' : 'text-[#737373]'}`}>
            {movement.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {movement.keywords.map((keyword) => (
              <span
                key={keyword}
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selected ? 'bg-white/20 text-white/80' : 'bg-[#F5F5F5] text-[#737373]'
                }`}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Checkmark */}
        {selected && (
          <div className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-white">
            <svg
              className="w-4 h-4 text-[#171717]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        )}
      </div>
    </button>
  )
}
