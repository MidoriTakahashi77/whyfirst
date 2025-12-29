export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type Spacing = 'compact' | 'normal' | 'spacious'
export type Animation = 'none' | 'subtle' | 'moderate' | 'expressive'

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
