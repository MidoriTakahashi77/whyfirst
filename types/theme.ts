export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type Spacing = 'compact' | 'comfortable' | 'relaxed' | 'spacious'
export type Animation =
  | 'none'
  | 'subtle'
  | 'smooth'
  | 'gentle'
  | 'responsive'
  | 'dynamic'
  | 'playful'
  | 'energetic'

export type ShapeType =
  | 'geometric'
  | 'rounded'
  | 'circular'
  | 'organic'
  | 'angular'
  | 'minimal'
  | 'striped'
  | 'grid'
  | 'dots'
  | 'hexagon'
  | 'diamond'
  | 'pattern'
  | 'wave'
  | 'pill'
  | 'blob'

export type SpaceType = 'compact' | 'comfortable' | 'relaxed' | 'spacious'

export type ColourPaletteType = 'vivid' | 'soft' | 'neutral'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface ThemeData {
  colors: ThemeColors
  borderRadius: BorderRadius
  spacing: Spacing
  animation: Animation
}
