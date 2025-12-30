'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSessionStore } from '@/lib/store/session-store'
import { canProceed, getNextStep, getPrevStep } from '@/lib/utils/step-validation'

export function StepNavigation() {
  const session = useSessionStore((state) => state.session)
  const goToStep = useSessionStore((state) => state.goToStep)

  if (!session) return null

  const prevStep = getPrevStep(session.currentStep)
  const nextStep = getNextStep(session.currentStep)
  const canGoNext = canProceed(session)

  return (
    <>
      {prevStep && (
        <Button variant="ghost" onClick={() => goToStep(prevStep)}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          戻る
        </Button>
      )}
      <div className="flex-1" />
      {nextStep && (
        <Button onClick={() => goToStep(nextStep)} disabled={!canGoNext}>
          次へ
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </>
  )
}
