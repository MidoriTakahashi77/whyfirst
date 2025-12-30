'use client'

import { useRouter } from 'next/navigation'
import { StepLayout, StepMain } from '@/components/steps'
import { SelectedSpace } from '@/components/steps/space/selected-space'
import { SpaceSelector } from '@/components/steps/space/space-selector'
import { useSessionStore } from '@/lib/store/session-store'

export default function SpacePage() {
  const router = useRouter()
  const goToStep = useSessionStore((state) => state.goToStep)

  const handleNext = () => {
    goToStep('images')
    router.push('/images')
  }

  const handleBack = () => {
    goToStep('shape')
    router.push('/shape')
  }

  return (
    <StepLayout>
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
        <span className="text-xl font-bold text-[#171717]">Whyfirst</span>
        <span className="text-sm text-[#737373]">6 / 7</span>
      </header>
      <div className="flex-1 flex">
        <StepMain className="flex-1">
          <SpaceSelector onNext={handleNext} onBack={handleBack} />
        </StepMain>

        <aside className="hidden lg:block w-80 border-l border-[#E5E5E5] p-6">
          <div className="sticky top-24">
            <SelectedSpace onNext={handleNext} onBack={handleBack} />
          </div>
        </aside>
      </div>
    </StepLayout>
  )
}
