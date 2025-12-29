import type { Animation, BorderRadius, Spacing } from './theme'

export interface MoodPreset {
  id: string
  label: string
  labelJa: string
  category: string
  isOnomatopoeia: boolean
}

export interface ColourPreset {
  id: string
  label: string
  labelJa: string
  tailwind: {
    color: string
    shade: number
  }
  searchTerms: string[]
  isOnomatopoeia: boolean
}

export interface MovementPreset {
  id: string
  label: string
  labelJa: string
  description: string
  descriptionJa: string
  cssValue: {
    animation: Animation
  }
}

export interface ShapePreset {
  id: string
  label: string
  labelJa: string
  description: string
  descriptionJa: string
  cssValue: {
    borderRadius: BorderRadius
  }
}

export interface SpacePreset {
  id: string
  label: string
  labelJa: string
  description: string
  descriptionJa: string
  cssValue: {
    spacing: Spacing
  }
}

export interface MoodMapping {
  moodId: string
  movements: string[]
  shapes: string[]
  spaces: string[]
}
