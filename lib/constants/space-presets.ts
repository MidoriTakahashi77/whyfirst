import type { SpacePreset } from '../../types'

export const spacePresets: SpacePreset[] = [
  {
    id: 'compact',
    name: 'Compact',
    nameJa: 'コンパクト',
    description: '情報密度を高めて効率的に表示',
    keywords: ['高密度', '効率的', 'データ重視', 'ダッシュボード'],
    spaceType: 'compact',
  },
  {
    id: 'comfortable',
    name: 'Comfortable',
    nameJa: 'コンフォータブル',
    description: '適度な余白でバランスの取れた配置',
    keywords: ['バランス', '標準', '読みやすい', '汎用的'],
    spaceType: 'comfortable',
  },
  {
    id: 'relaxed',
    name: 'Relaxed',
    nameJa: 'リラックス',
    description: 'ゆったりとした余白で落ち着いた印象',
    keywords: ['ゆったり', '落ち着き', '高級感', 'ブランド'],
    spaceType: 'relaxed',
  },
  {
    id: 'spacious',
    name: 'Spacious',
    nameJa: 'スペーシャス',
    description: '大胆な余白で洗練された印象を演出',
    keywords: ['広々', '洗練', 'ミニマル', 'プレミアム'],
    spaceType: 'spacious',
  },
]
