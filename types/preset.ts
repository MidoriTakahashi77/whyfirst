import type { Animation, ColourPaletteType, ShapeType, SpaceType } from './theme'

// Mood Types
export interface MoodPreset {
  id: string
  label: string
  labelJa: string
  category: string
  isOnomatopoeia: boolean
}

export interface MoodCategory {
  id: string
  label: string
  labelJa: string
  moods: Omit<MoodPreset, 'category' | 'isOnomatopoeia'>[]
}

export interface Onomatopoeia {
  id: string
  label: string
  labelJa: string
}

// Colour Types
export interface ColourPreset {
  id: string
  name: string
  nameJa: string
  hex: string
  description: string
  paletteType: ColourPaletteType
}

// Movement Types
export interface MovementPreset {
  id: string
  name: string
  nameJa: string
  description: string
  keywords: string[]
  animation: Animation
}

// Shape Types
export interface ShapePreset {
  id: string
  name: string
  nameJa: string
  description: string
  keywords: string[]
  shapeType: ShapeType
}

// Space Types
export interface SpacePreset {
  id: string
  name: string
  nameJa: string
  description: string
  keywords: string[]
  spaceType: SpaceType
}

// Mapping Types
export interface MoodMapping {
  moodId: string
  movements: string[]
  shapes: string[]
  spaces: string[]
}
