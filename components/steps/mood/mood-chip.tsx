'use client'

import { cn } from '@/lib/utils/cn'

interface MoodChipProps {
  label: string
  selected?: boolean
  recommended?: boolean
  onClick?: () => void
}

export function MoodChip({ label, selected, recommended, onClick }: MoodChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
        'border hover:bg-[#F5F5F5]',
        selected && 'bg-[#171717] text-white border-[#171717]',
        !selected && recommended && 'border-[#171717]/50 bg-[#171717]/5',
        !selected && !recommended && 'border-[#E5E5E5] text-[#171717]'
      )}
    >
      {label}
      {recommended && !selected && <span className="ml-1 text-xs">★</span>}
    </button>
  )
}
