'use client'

import { useRouter } from 'next/navigation'
import { StepLayout, StepMain } from '@/components/steps'
import { MovementSelector } from '@/components/steps/movement/movement-selector'
import { SelectedMovement } from '@/components/steps/movement/selected-movement'
import { useSessionStore } from '@/lib/store/session-store'

export default function MovementPage() {
  const router = useRouter()
  const goToStep = useSessionStore((state) => state.goToStep)

  const handleNext = () => {
    goToStep('shape')
    router.push('/shape')
  }

  const handleBack = () => {
    goToStep('colour')
    router.push('/colour')
  }

  return (
    <StepLayout>
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
        <span className="text-xl font-bold text-[#171717]">Whyfirst</span>
        <span className="text-sm text-[#737373]">4 / 7</span>
      </header>
      <div className="flex-1 flex">
        <StepMain className="flex-1">
          <MovementSelector onNext={handleNext} onBack={handleBack} />
        </StepMain>

        <aside className="hidden lg:block w-80 border-l border-[#E5E5E5] p-6">
          <div className="sticky top-24">
            <SelectedMovement onNext={handleNext} onBack={handleBack} />
          </div>
        </aside>
      </div>
    </StepLayout>
  )
}
