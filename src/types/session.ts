export type Step =
  | 'landing'
  | 'why'
  | 'mood'
  | 'colour'
  | 'movement'
  | 'shape'
  | 'space'
  | 'images'
  | 'moodboard'
  | 'design'
  | 'preview'

export type SessionMode = 'full' | 'quick'
export type DetectedLanguage = 'en' | 'ja'

export interface WhyData {
  rawInput: string
}

export interface SelectionData {
  selected: string[]
  custom: string[]
}

export interface MoodData extends SelectionData {
  suggestedByLLM: string[]
}

export type ColourData = SelectionData
export type MovementData = SelectionData
export type ShapeData = SelectionData
export type SpaceData = SelectionData

export interface UnsplashImage {
  id: string
  url: string
  thumbnailUrl: string
  photographer: string
  photographerUrl: string
}

export interface ExtractedColor {
  role: 'primary' | 'secondary' | 'accent' | 'background' | 'text'
  hex: string
  name?: string
}

export interface ImageData {
  selectedImages: UnsplashImage[]
  mainImage: UnsplashImage | null
  extractedColors: ExtractedColor[]
}

export interface MoodboardData {
  layout: 'grid' | 'collage' | 'minimal'
  images: UnsplashImage[]
  colors: ExtractedColor[]
}

export interface DesignData {
  templateId: string
  sections: string[]
  customizations: Record<string, unknown>
}

export interface Session {
  id: string
  mode: SessionMode
  createdAt: string
  updatedAt: string
  currentStep: Step
  detectedLanguage: DetectedLanguage

  why: WhyData | null
  mood: MoodData | null
  colour: ColourData | null
  movement: MovementData | null
  shape: ShapeData | null
  space: SpaceData | null
  images: ImageData | null

  moodboard: MoodboardData | null
  design: DesignData | null
}
