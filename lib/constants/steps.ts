import type { Step } from '@/types/session'

interface StepInfo {
  id: Step
  label: string
  labelJa: string
}

export const stepInfo: StepInfo[] = [
  { id: 'why', label: 'Why', labelJa: 'Why' },
  { id: 'mood', label: 'Mood', labelJa: 'Mood' },
  { id: 'colour', label: 'Colour', labelJa: 'Colour' },
  { id: 'movement', label: 'Movement', labelJa: 'Movement' },
  { id: 'shape', label: 'Shape', labelJa: 'Shape' },
  { id: 'space', label: 'Space', labelJa: 'Space' },
  { id: 'images', label: 'Images', labelJa: '画像選択' },
  { id: 'moodboard', label: 'Moodboard', labelJa: 'ムードボード' },
  { id: 'design', label: 'Design', labelJa: 'デザイン' },
]
