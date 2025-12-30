import type { DetectedLanguage } from '@/types/session'

export function detectLanguage(text: string): DetectedLanguage {
  // 日本語文字（ひらがな、カタカナ、漢字）が含まれているかチェック
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/
  return japaneseRegex.test(text) ? 'ja' : 'en'
}
