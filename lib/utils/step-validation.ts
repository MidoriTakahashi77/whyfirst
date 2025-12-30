import type { Session, Step } from '@/types/session'

export const stepOrder: Step[] = [
  'landing',
  'why',
  'mood',
  'colour',
  'movement',
  'shape',
  'space',
  'images',
  'moodboard',
  'design',
  'preview',
]

export const stepValidation: Record<Step, (session: Session) => boolean> = {
  landing: () => true,
  why: (s) => !!s.why?.rawInput,
  mood: (s) => {
    const count = (s.mood?.selected?.length ?? 0) + (s.mood?.custom?.length ?? 0)
    return count >= 3 && count <= 10
  },
  colour: (s) => {
    const count = (s.colour?.selected?.length ?? 0) + (s.colour?.custom?.length ?? 0)
    return count >= 3 && count <= 10
  },
  movement: (s) => {
    const count = (s.movement?.selected?.length ?? 0) + (s.movement?.custom?.length ?? 0)
    return count >= 1 && count <= 3
  },
  shape: (s) => {
    const count = (s.shape?.selected?.length ?? 0) + (s.shape?.custom?.length ?? 0)
    return count >= 1 && count <= 3
  },
  space: (s) => {
    const count = (s.space?.selected?.length ?? 0) + (s.space?.custom?.length ?? 0)
    return count >= 1 && count <= 3
  },
  images: (s) => {
    return (s.images?.selectedImages?.length ?? 0) === 6 && !!s.images?.mainImage
  },
  moodboard: (s) => !!s.moodboard,
  design: (s) => !!s.design,
  preview: () => true,
}

export function canProceed(session: Session): boolean {
  return stepValidation[session.currentStep](session)
}

export function getNextStep(current: Step): Step | null {
  const index = stepOrder.indexOf(current)
  return index < stepOrder.length - 1 ? stepOrder[index + 1] : null
}

export function getPrevStep(current: Step): Step | null {
  const index = stepOrder.indexOf(current)
  return index > 0 ? stepOrder[index - 1] : null
}
