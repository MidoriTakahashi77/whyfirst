import { cn } from '@/lib/utils/cn'

interface StepHeaderProps {
  title: string
  description?: string
  step?: number
  totalSteps?: number
  className?: string
}

export function StepHeader({ title, description, step, totalSteps, className }: StepHeaderProps) {
  return (
    <header className={cn('mb-8', className)}>
      {step && totalSteps && (
        <p className="text-sm text-[#737373] mb-2">
          Step {step} / {totalSteps}
        </p>
      )}
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-2 text-[#737373] text-lg">{description}</p>}
    </header>
  )
}
