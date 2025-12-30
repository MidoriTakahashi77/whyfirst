'use client'

import type { ColourPreset } from '@/types'

interface ColourCardProps {
  colour: ColourPreset
  selected: boolean
  disabled: boolean
  onClick: () => void
}

export function ColourCard({ colour, selected, disabled, onClick }: ColourCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
        selected
          ? 'bg-white shadow-lg ring-2 ring-[#171717] scale-[1.02]'
          : disabled
            ? 'bg-[#F5F5F5] cursor-not-allowed opacity-50'
            : 'bg-white hover:shadow-md hover:scale-[1.02]'
      }`}
    >
      {/* Colour Circle */}
      <div
        className={`w-16 h-16 rounded-full mb-3 transition-all duration-300 ${
          selected ? 'ring-4 ring-offset-2' : 'group-hover:scale-110'
        }`}
        style={
          {
            backgroundColor: colour.hex,
            '--tw-ring-color': colour.hex,
          } as React.CSSProperties
        }
      />

      {/* Name */}
      <div className="text-center">
        <p className="text-sm font-medium text-[#171717]">{colour.name}</p>
        <p className="text-xs text-[#737373]">{colour.nameJa}</p>
      </div>

      {/* Selected Checkmark */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#171717] flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
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
    </button>
  )
}
