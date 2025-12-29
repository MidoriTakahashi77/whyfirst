import type { MoodMapping } from '../../types'

export const moodMappings: MoodMapping[] = [
  // Energy
  {
    moodId: 'energetic',
    movements: ['bounce', 'pop', 'slide-fast'],
    shapes: ['sharp', 'bold'],
    spaces: ['compact', 'tight'],
  },
  {
    moodId: 'dynamic',
    movements: ['slide-fast', 'zoom'],
    shapes: ['geometric', 'bold'],
    spaces: ['balanced', 'normal'],
  },
  {
    moodId: 'vibrant',
    movements: ['bounce', 'pop'],
    shapes: ['bold', 'playful'],
    spaces: ['comfortable', 'balanced'],
  },
  {
    moodId: 'bold',
    movements: ['pop', 'zoom'],
    shapes: ['sharp', 'bold'],
    spaces: ['compact', 'dense'],
  },
  {
    moodId: 'powerful',
    movements: ['slide-fast', 'zoom'],
    shapes: ['sharp', 'geometric'],
    spaces: ['compact', 'tight'],
  },

  // Calm
  {
    moodId: 'calm',
    movements: ['fade', 'float'],
    shapes: ['soft', 'organic'],
    spaces: ['spacious', 'breathing'],
  },
  {
    moodId: 'peaceful',
    movements: ['fade', 'float'],
    shapes: ['soft', 'rounded'],
    spaces: ['spacious', 'airy'],
  },
  {
    moodId: 'serene',
    movements: ['fade', 'none'],
    shapes: ['soft', 'organic'],
    spaces: ['generous', 'breathing'],
  },
  {
    moodId: 'relaxed',
    movements: ['float', 'fade'],
    shapes: ['soft', 'rounded'],
    spaces: ['spacious', 'comfortable'],
  },
  {
    moodId: 'gentle',
    movements: ['fade', 'float'],
    shapes: ['soft', 'organic'],
    spaces: ['airy', 'breathing'],
  },

  // Professional
  {
    moodId: 'professional',
    movements: ['fade', 'slide-slow'],
    shapes: ['subtle', 'minimal'],
    spaces: ['balanced', 'normal'],
  },
  {
    moodId: 'corporate',
    movements: ['slide-slow', 'fade'],
    shapes: ['subtle', 'geometric'],
    spaces: ['normal', 'balanced'],
  },
  {
    moodId: 'trustworthy',
    movements: ['fade', 'slide-slow'],
    shapes: ['rounded', 'subtle'],
    spaces: ['balanced', 'comfortable'],
  },
  {
    moodId: 'reliable',
    movements: ['fade', 'none'],
    shapes: ['subtle', 'rounded'],
    spaces: ['normal', 'balanced'],
  },
  {
    moodId: 'authoritative',
    movements: ['slide-slow', 'none'],
    shapes: ['sharp', 'geometric'],
    spaces: ['compact', 'balanced'],
  },

  // Friendly
  {
    moodId: 'friendly',
    movements: ['bounce', 'fade'],
    shapes: ['rounded', 'soft'],
    spaces: ['comfortable', 'balanced'],
  },
  {
    moodId: 'approachable',
    movements: ['fade', 'bounce'],
    shapes: ['rounded', 'playful'],
    spaces: ['comfortable', 'normal'],
  },
  {
    moodId: 'warm',
    movements: ['fade', 'float'],
    shapes: ['soft', 'rounded'],
    spaces: ['comfortable', 'spacious'],
  },
  {
    moodId: 'inviting',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'rounded'],
    spaces: ['spacious', 'comfortable'],
  },
  {
    moodId: 'welcoming',
    movements: ['fade', 'bounce'],
    shapes: ['rounded', 'soft'],
    spaces: ['spacious', 'airy'],
  },

  // Modern
  {
    moodId: 'modern',
    movements: ['slide-fast', 'zoom'],
    shapes: ['sharp', 'geometric'],
    spaces: ['balanced', 'normal'],
  },
  {
    moodId: 'contemporary',
    movements: ['slide-fast', 'fade'],
    shapes: ['subtle', 'geometric'],
    spaces: ['balanced', 'normal'],
  },
  {
    moodId: 'cutting-edge',
    movements: ['zoom', 'slide-fast'],
    shapes: ['sharp', 'geometric'],
    spaces: ['compact', 'tight'],
  },
  {
    moodId: 'innovative',
    movements: ['pop', 'zoom'],
    shapes: ['geometric', 'bold'],
    spaces: ['balanced', 'comfortable'],
  },
  {
    moodId: 'futuristic',
    movements: ['zoom', 'slide-fast'],
    shapes: ['sharp', 'geometric'],
    spaces: ['spacious', 'balanced'],
  },

  // Classic
  {
    moodId: 'classic',
    movements: ['fade', 'none'],
    shapes: ['rounded', 'subtle'],
    spaces: ['balanced', 'comfortable'],
  },
  {
    moodId: 'timeless',
    movements: ['fade', 'slide-slow'],
    shapes: ['subtle', 'rounded'],
    spaces: ['balanced', 'spacious'],
  },
  {
    moodId: 'traditional',
    movements: ['fade', 'none'],
    shapes: ['subtle', 'rounded'],
    spaces: ['normal', 'balanced'],
  },
  {
    moodId: 'elegant',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'rounded'],
    spaces: ['spacious', 'generous'],
  },
  {
    moodId: 'sophisticated',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'minimal'],
    spaces: ['spacious', 'balanced'],
  },

  // Playful
  {
    moodId: 'playful',
    movements: ['bounce', 'pop'],
    shapes: ['pill', 'playful'],
    spaces: ['comfortable', 'balanced'],
  },
  {
    moodId: 'fun',
    movements: ['bounce', 'shake'],
    shapes: ['playful', 'bold'],
    spaces: ['comfortable', 'normal'],
  },
  {
    moodId: 'whimsical',
    movements: ['float', 'bounce'],
    shapes: ['organic', 'playful'],
    spaces: ['airy', 'comfortable'],
  },
  {
    moodId: 'cheerful',
    movements: ['bounce', 'pop'],
    shapes: ['rounded', 'playful'],
    spaces: ['comfortable', 'balanced'],
  },
  {
    moodId: 'youthful',
    movements: ['bounce', 'pop'],
    shapes: ['pill', 'playful'],
    spaces: ['comfortable', 'balanced'],
  },

  // Minimal
  {
    moodId: 'minimal',
    movements: ['fade', 'none'],
    shapes: ['subtle', 'minimal'],
    spaces: ['spacious', 'airy'],
  },
  {
    moodId: 'clean',
    movements: ['fade', 'slide-slow'],
    shapes: ['subtle', 'minimal'],
    spaces: ['spacious', 'breathing'],
  },
  {
    moodId: 'simple',
    movements: ['fade', 'none'],
    shapes: ['subtle', 'minimal'],
    spaces: ['spacious', 'balanced'],
  },
  {
    moodId: 'understated',
    movements: ['fade', 'none'],
    shapes: ['subtle', 'minimal'],
    spaces: ['balanced', 'spacious'],
  },
  {
    moodId: 'refined',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'minimal'],
    spaces: ['spacious', 'generous'],
  },

  // Luxury
  {
    moodId: 'luxurious',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'rounded'],
    spaces: ['generous', 'spacious'],
  },
  {
    moodId: 'premium',
    movements: ['fade', 'slide-slow'],
    shapes: ['subtle', 'rounded'],
    spaces: ['spacious', 'generous'],
  },
  {
    moodId: 'exclusive',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'minimal'],
    spaces: ['generous', 'spacious'],
  },
  {
    moodId: 'high-end',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'rounded'],
    spaces: ['spacious', 'generous'],
  },
  {
    moodId: 'opulent',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'organic'],
    spaces: ['generous', 'airy'],
  },

  // Creative
  {
    moodId: 'creative',
    movements: ['pop', 'bounce'],
    shapes: ['organic', 'playful'],
    spaces: ['comfortable', 'balanced'],
  },
  {
    moodId: 'artistic',
    movements: ['float', 'fade'],
    shapes: ['organic', 'soft'],
    spaces: ['airy', 'spacious'],
  },
  {
    moodId: 'expressive',
    movements: ['pop', 'bounce'],
    shapes: ['bold', 'organic'],
    spaces: ['comfortable', 'balanced'],
  },
  {
    moodId: 'imaginative',
    movements: ['float', 'bounce'],
    shapes: ['organic', 'playful'],
    spaces: ['airy', 'comfortable'],
  },
  {
    moodId: 'unique',
    movements: ['pop', 'zoom'],
    shapes: ['bold', 'organic'],
    spaces: ['balanced', 'comfortable'],
  },

  // Onomatopoeia - Wakuwaku
  {
    moodId: 'wakuwaku',
    movements: ['bounce', 'pop'],
    shapes: ['playful', 'bold'],
    spaces: ['comfortable', 'balanced'],
  },
  {
    moodId: 'dokidoki',
    movements: ['pulse', 'pop'],
    shapes: ['rounded', 'bold'],
    spaces: ['balanced', 'normal'],
  },
  {
    moodId: 'ukiuki',
    movements: ['bounce', 'float'],
    shapes: ['playful', 'rounded'],
    spaces: ['airy', 'comfortable'],
  },
  {
    moodId: 'kyunkyun',
    movements: ['pulse', 'bounce'],
    shapes: ['soft', 'pill'],
    spaces: ['comfortable', 'balanced'],
  },
  {
    moodId: 'runrun',
    movements: ['bounce', 'float'],
    shapes: ['playful', 'rounded'],
    spaces: ['comfortable', 'airy'],
  },

  // Onomatopoeia - Kirakira
  {
    moodId: 'kirakira',
    movements: ['pulse', 'float'],
    shapes: ['soft', 'pill'],
    spaces: ['airy', 'spacious'],
  },
  {
    moodId: 'pikapika',
    movements: ['pulse', 'fade'],
    shapes: ['rounded', 'soft'],
    spaces: ['balanced', 'spacious'],
  },
  {
    moodId: 'tsuyatsuya',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'rounded'],
    spaces: ['spacious', 'balanced'],
  },
  {
    moodId: 'kirari',
    movements: ['pop', 'fade'],
    shapes: ['sharp', 'bold'],
    spaces: ['balanced', 'normal'],
  },
  {
    moodId: 'giragira',
    movements: ['pop', 'shake'],
    shapes: ['sharp', 'bold'],
    spaces: ['compact', 'tight'],
  },

  // Onomatopoeia - Fuwafuwa
  {
    moodId: 'fuwafuwa',
    movements: ['float', 'fade'],
    shapes: ['soft', 'organic'],
    spaces: ['airy', 'breathing'],
  },
  {
    moodId: 'funwari',
    movements: ['float', 'fade'],
    shapes: ['soft', 'pill'],
    spaces: ['spacious', 'airy'],
  },
  {
    moodId: 'mofumofu',
    movements: ['float', 'fade'],
    shapes: ['soft', 'organic'],
    spaces: ['comfortable', 'spacious'],
  },
  {
    moodId: 'howahowa',
    movements: ['float', 'fade'],
    shapes: ['soft', 'organic'],
    spaces: ['airy', 'generous'],
  },
  {
    moodId: 'yuruyuru',
    movements: ['float', 'fade'],
    shapes: ['soft', 'organic'],
    spaces: ['spacious', 'breathing'],
  },

  // Onomatopoeia - Sukkiri
  {
    moodId: 'sukkiri',
    movements: ['slide-fast', 'fade'],
    shapes: ['sharp', 'minimal'],
    spaces: ['spacious', 'balanced'],
  },
  {
    moodId: 'sappari',
    movements: ['fade', 'slide-fast'],
    shapes: ['minimal', 'subtle'],
    spaces: ['spacious', 'airy'],
  },
  {
    moodId: 'shakitto',
    movements: ['slide-fast', 'pop'],
    shapes: ['sharp', 'geometric'],
    spaces: ['balanced', 'normal'],
  },
  {
    moodId: 'pakitto',
    movements: ['pop', 'slide-fast'],
    shapes: ['sharp', 'geometric'],
    spaces: ['compact', 'balanced'],
  },
  {
    moodId: 'kiritto',
    movements: ['slide-slow', 'fade'],
    shapes: ['sharp', 'minimal'],
    spaces: ['balanced', 'normal'],
  },

  // Onomatopoeia - Shittori
  {
    moodId: 'shittori',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'rounded'],
    spaces: ['spacious', 'generous'],
  },
  {
    moodId: 'hokkori',
    movements: ['fade', 'float'],
    shapes: ['soft', 'rounded'],
    spaces: ['comfortable', 'spacious'],
  },
  {
    moodId: 'pokapoka',
    movements: ['fade', 'float'],
    shapes: ['soft', 'organic'],
    spaces: ['comfortable', 'spacious'],
  },
  {
    moodId: 'jinwari',
    movements: ['fade', 'slide-slow'],
    shapes: ['soft', 'organic'],
    spaces: ['spacious', 'breathing'],
  },
  {
    moodId: 'mattari',
    movements: ['float', 'fade'],
    shapes: ['soft', 'organic'],
    spaces: ['generous', 'breathing'],
  },

  // Onomatopoeia - Dosshiri
  {
    moodId: 'dosshiri',
    movements: ['none', 'slide-slow'],
    shapes: ['sharp', 'geometric'],
    spaces: ['compact', 'dense'],
  },
  {
    moodId: 'gacchiri',
    movements: ['none', 'slide-slow'],
    shapes: ['sharp', 'geometric'],
    spaces: ['compact', 'tight'],
  },
  {
    moodId: 'zusshiri',
    movements: ['none', 'slide-slow'],
    shapes: ['geometric', 'bold'],
    spaces: ['compact', 'dense'],
  },
  {
    moodId: 'shikkari',
    movements: ['fade', 'slide-slow'],
    shapes: ['subtle', 'geometric'],
    spaces: ['balanced', 'normal'],
  },
  {
    moodId: 'gutto',
    movements: ['pop', 'zoom'],
    shapes: ['bold', 'sharp'],
    spaces: ['compact', 'tight'],
  },
]

// Helper functions
export function getMoodMapping(moodId: string): MoodMapping | undefined {
  return moodMappings.find((m) => m.moodId === moodId)
}

export function getRecommendedMovements(moodIds: string[]): string[] {
  const movements = new Set<string>()
  for (const id of moodIds) {
    const mapping = getMoodMapping(id)
    mapping?.movements.forEach((m) => {
      movements.add(m)
    })
  }
  return Array.from(movements)
}

export function getRecommendedShapes(moodIds: string[]): string[] {
  const shapes = new Set<string>()
  for (const id of moodIds) {
    const mapping = getMoodMapping(id)
    mapping?.shapes.forEach((s) => {
      shapes.add(s)
    })
  }
  return Array.from(shapes)
}

export function getRecommendedSpaces(moodIds: string[]): string[] {
  const spaces = new Set<string>()
  for (const id of moodIds) {
    const mapping = getMoodMapping(id)
    mapping?.spaces.forEach((s) => {
      spaces.add(s)
    })
  }
  return Array.from(spaces)
}
