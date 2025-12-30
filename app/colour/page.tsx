'use client'

import { useRouter } from 'next/navigation'
import { StepLayout, StepMain } from '@/components/steps'
import { ColourSelector } from '@/components/steps/colour/colour-selector'
import { SelectedColours } from '@/components/steps/colour/selected-colours'
import { useSessionStore } from '@/lib/store/session-store'

export default function ColourPage() {
  const router = useRouter()
  const goToStep = useSessionStore((state) => state.goToStep)

  const handleNext = () => {
    goToStep('movement')
    router.push('/movement')
  }

  const handleBack = () => {
    goToStep('mood')
    router.push('/mood')
  }

  return (
    <StepLayout>
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
        <span className="text-xl font-bold text-[#171717]">Whyfirst</span>
        <span className="text-sm text-[#737373]">3 / 7</span>
      </header>
      <div className="flex-1 flex">
        <StepMain className="flex-1">
          <ColourSelector onNext={handleNext} onBack={handleBack} />
        </StepMain>

        {/* Side panel - desktop only */}
        <aside className="hidden lg:block w-80 border-l border-[#E5E5E5] p-6">
          <div className="sticky top-24">
            <SelectedColours onNext={handleNext} onBack={handleBack} />
          </div>
        </aside>
      </div>
    </StepLayout>
  )
}
