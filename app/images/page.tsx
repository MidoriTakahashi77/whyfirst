'use client'

import { StepLayout, StepMain } from '@/components/steps'
import { ImagePhaseManager } from '@/components/steps/images/image-phase-manager'

export default function ImagesPage() {
  return (
    <StepLayout>
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
        <span className="text-xl font-bold text-[#171717]">Whyfirst</span>
        <span className="text-sm text-[#737373]">7 / 7</span>
      </header>
      <div className="flex-1 flex">
        <StepMain className="flex-1">
          <ImagePhaseManager />
        </StepMain>
      </div>
    </StepLayout>
  )
}
