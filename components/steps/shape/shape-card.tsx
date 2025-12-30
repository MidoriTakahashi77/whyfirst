'use client'

import type { ShapePreset } from '@/types'

interface ShapeCardProps {
  shape: ShapePreset
  selected: boolean
  onSelect: () => void
  index: number
}

const ShapePreview = ({ shapeType, isSelected }: { shapeType: string; isSelected: boolean }) => {
  const bgColor = isSelected ? 'bg-white' : 'bg-[#171717]'

  switch (shapeType) {
    case 'geometric':
      return <div className={`w-10 h-10 ${bgColor}`} />
    case 'rounded':
      return <div className={`w-10 h-10 rounded-lg ${bgColor}`} />
    case 'circular':
      return <div className={`w-10 h-10 rounded-full ${bgColor}`} />
    case 'organic':
      return (
        <svg viewBox="0 0 60 60" className="w-10 h-10" aria-hidden="true">
          <path
            d="M30 8 C45 12, 52 25, 48 38 C44 51, 30 54, 18 48 C6 42, 8 28, 14 18 C20 8, 30 8, 30 8Z"
            fill={isSelected ? '#ffffff' : '#171717'}
          />
        </svg>
      )
    case 'angular':
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
          <polygon points="20,2 38,38 2,38" fill={isSelected ? '#ffffff' : '#171717'} />
        </svg>
      )
    case 'minimal':
      return <div className={`w-8 h-8 ${bgColor}`} />
    case 'striped':
      return (
        <div className="w-10 h-10 flex flex-col justify-center gap-1">
          <div className={`h-1 ${bgColor}`} />
          <div className={`h-1 ${bgColor}`} />
          <div className={`h-1 ${bgColor}`} />
        </div>
      )
    case 'grid':
      return (
        <div className="w-10 h-10 grid grid-cols-3 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <div key={`grid-${i.toString()}`} className={`${bgColor}`} />
          ))}
        </div>
      )
    case 'dots':
      return (
        <div className="w-10 h-10 grid grid-cols-3 gap-1 place-items-center">
          {[...Array(9)].map((_, i) => (
            <div key={`dot-${i.toString()}`} className={`w-2 h-2 rounded-full ${bgColor}`} />
          ))}
        </div>
      )
    case 'hexagon':
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            fill={isSelected ? '#ffffff' : '#171717'}
          />
        </svg>
      )
    case 'diamond':
      return (
        <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
          <polygon points="20,2 38,20 20,38 2,20" fill={isSelected ? '#ffffff' : '#171717'} />
        </svg>
      )
    case 'wave':
      return (
        <svg viewBox="0 0 40 20" className="w-10 h-5" aria-hidden="true">
          <path
            d="M0,10 Q10,0 20,10 T40,10"
            fill="none"
            stroke={isSelected ? '#ffffff' : '#171717'}
            strokeWidth="3"
          />
        </svg>
      )
    case 'pill':
      return <div className={`w-12 h-6 rounded-full ${bgColor}`} />
    case 'blob':
      return (
        <svg viewBox="0 0 60 60" className="w-10 h-10" aria-hidden="true">
          <path
            d="M30 6 C42 6, 54 14, 52 28 C50 42, 56 48, 42 54 C28 60, 18 54, 12 44 C6 34, 8 22, 16 14 C24 6, 30 6, 30 6Z"
            fill={isSelected ? '#ffffff' : '#171717'}
          />
        </svg>
      )
    default:
      return <div className={`w-10 h-10 rounded ${bgColor}`} />
  }
}

export function ShapeCard({ shape, selected, onSelect, index }: ShapeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full text-left p-6 rounded-2xl transition-all duration-300 ${
        selected ? 'bg-[#171717] text-white shadow-xl scale-[1.02]' : 'bg-white hover:shadow-md'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Shape Preview */}
      <div
        className={`mb-4 h-16 flex items-center justify-center rounded-xl ${
          selected ? 'bg-white/10' : 'bg-[#F5F5F5]'
        }`}
      >
        <ShapePreview shapeType={shape.shapeType} isSelected={selected} />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className={`font-medium ${selected ? 'text-white' : 'text-[#171717]'}`}>
              {shape.name}
            </h3>
            <span className={`text-sm ${selected ? 'text-white/60' : 'text-[#737373]'}`}>
              {shape.nameJa}
            </span>
          </div>
          <p className={`text-sm mb-3 ${selected ? 'text-white/80' : 'text-[#737373]'}`}>
            {shape.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {shape.keywords.map((keyword) => (
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
