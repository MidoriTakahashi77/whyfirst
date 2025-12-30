'use client'

import type { SpacePreset } from '@/types'

interface SpaceCardProps {
  space: SpacePreset
  selected: boolean
  onSelect: () => void
  index: number
}

const SpacePreview = ({ spaceType, isSelected }: { spaceType: string; isSelected: boolean }) => {
  const bgColor = isSelected ? 'bg-white' : 'bg-[#171717]'

  const gapClass =
    {
      compact: 'gap-0.5',
      comfortable: 'gap-1.5',
      relaxed: 'gap-3',
      spacious: 'gap-5',
    }[spaceType] ?? 'gap-2'

  return (
    <div className={`flex ${gapClass}`}>
      <div className={`w-8 h-4 rounded ${bgColor}`} />
      <div className={`w-8 h-4 rounded ${bgColor}`} />
      <div className={`w-8 h-4 rounded ${bgColor}`} />
    </div>
  )
}

export function SpaceCard({ space, selected, onSelect, index }: SpaceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full text-left p-6 rounded-2xl transition-all duration-300 ${
        selected ? 'bg-[#171717] text-white shadow-xl scale-[1.02]' : 'bg-white hover:shadow-md'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Space Preview */}
      <div
        className={`mb-4 h-16 flex items-center justify-center rounded-xl ${
          selected ? 'bg-white/10' : 'bg-[#F5F5F5]'
        }`}
      >
        <SpacePreview spaceType={space.spaceType} isSelected={selected} />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className={`font-medium ${selected ? 'text-white' : 'text-[#171717]'}`}>
              {space.name}
            </h3>
            <span className={`text-sm ${selected ? 'text-white/60' : 'text-[#737373]'}`}>
              {space.nameJa}
            </span>
          </div>
          <p className={`text-sm mb-3 ${selected ? 'text-white/80' : 'text-[#737373]'}`}>
            {space.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {space.keywords.map((keyword) => (
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
