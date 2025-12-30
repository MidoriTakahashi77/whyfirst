'use client'

import { stepInfo } from '@/lib/constants/steps'
import { cn } from '@/lib/utils/cn'
import { stepOrder } from '@/lib/utils/step-validation'
import type { Step } from '@/types/session'

interface ProgressIndicatorProps {
  currentStep: Step
  language?: 'en' | 'ja'
}

export function ProgressIndicator({ currentStep, language = 'ja' }: ProgressIndicatorProps) {
  const visibleSteps = stepInfo.filter((s) => s.id !== 'landing' && s.id !== 'preview')
  const currentIndex = stepOrder.indexOf(currentStep)

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2">
      {visibleSteps.map((step, index) => {
        const stepIndex = stepOrder.indexOf(step.id)
        const isCompleted = stepIndex < currentIndex
        const isCurrent = step.id === currentStep

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                isCompleted && 'bg-primary text-primary-foreground',
                isCurrent && 'bg-primary/20 text-primary border-2 border-primary',
                !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                'ml-2 text-sm whitespace-nowrap',
                isCurrent ? 'font-medium' : 'text-muted-foreground'
              )}
            >
              {language === 'ja' ? step.labelJa : step.label}
            </span>
            {index < visibleSteps.length - 1 && <div className="w-8 h-px bg-border mx-2" />}
          </div>
        )
      })}
    </div>
  )
}
