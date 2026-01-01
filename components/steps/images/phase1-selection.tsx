'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSessionStore } from '@/lib/store/session-store'
import type { UnsplashImage } from '@/types/session'
import { ImageCard } from './image-card'
import { SelectedImagesBar } from './selected-images-bar'

interface Phase1SelectionProps {
  onComplete: () => void
  onBack: () => void
}

// モック画像データ（Unsplash API連携前の仮データ）
const generateMockImages = (page: number): UnsplashImage[] => {
  const baseId = page * 6
  return Array.from({ length: 6 }, (_, i) => ({
    id: `mock-${baseId + i}`,
    url: `https://picsum.photos/seed/${baseId + i}/800/600`,
    thumbnailUrl: `https://picsum.photos/seed/${baseId + i}/400/300`,
    photographer: 'Sample Photographer',
    photographerUrl: 'https://unsplash.com',
  }))
}

// Staggered animation delay classes
const staggerClasses = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6']

export function Phase1Selection({ onComplete, onBack }: Phase1SelectionProps) {
  const session = useSessionStore((state) => state.session)
  const createSession = useSessionStore((state) => state.createSession)
  const updateSession = useSessionStore((state) => state.updateSession)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // セッションが存在しない場合は作成
    if (!session) {
      createSession()
    }
  }, [session, createSession])

  const images = useMemo(() => generateMockImages(page), [page])
  const selectedImages = session?.images?.selectedImages ?? []
  const selectedMoods = session?.mood?.selected ?? []

  const toggleImage = (image: UnsplashImage) => {
    const isSelected = selectedImages.some((img) => img.id === image.id)

    let newSelected: UnsplashImage[]
    if (isSelected) {
      newSelected = selectedImages.filter((img) => img.id !== image.id)
    } else if (selectedImages.length < 6) {
      newSelected = [...selectedImages, image]
    } else {
      return
    }

    updateSession({
      images: {
        selectedImages: newSelected,
        mainImage: session?.images?.mainImage ?? null,
        extractedColors: [],
      },
    })
  }

  const removeImage = (imageId: string) => {
    const newSelected = selectedImages.filter((img) => img.id !== imageId)
    updateSession({
      images: {
        selectedImages: newSelected,
        mainImage: session?.images?.mainImage ?? null,
        extractedColors: [],
      },
    })
  }

  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setLoading(false)
    }, 500)
  }

  const isFormValid = selectedImages.length === 6

  return (
    <div className="animate-fade-in-up">
      {/* Title */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-[#737373] mb-3">Step 07 - Phase 1</p>
        <h1 className="text-xl md:text-3xl font-bold text-[#171717] mb-4">
          「これ好き！」と感じた画像を選ぶ
        </h1>
        <p className="text-[#525252] mb-4">
          直感で好きだと思える画像を
          <span className="font-medium">6枚</span>
          選んでください。
        </p>
        <div className="flex flex-col gap-2 text-sm text-[#737373] mb-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#22C55E] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>選んだMoodに合っていて、かつ自分が好きだと思えるものがベスト</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#22C55E] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>この画像からデザインの方向性を導きます</span>
          </div>
        </div>

        {/* Selected moods display */}
        {selectedMoods.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#737373]">選んだMood:</span>
            {selectedMoods.map((mood) => (
              <span
                key={mood}
                className="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm text-[#525252]"
              >
                {mood}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`animate-fade-in-up-sm ${staggerClasses[index % staggerClasses.length]}`}
          >
            <ImageCard
              src={image.thumbnailUrl}
              alt={`Photo by ${image.photographer}`}
              selected={selectedImages.some((img) => img.id === image.id)}
              onClick={() => toggleImage(image)}
            />
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mb-6">
        <Button
          variant="outline"
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 rounded-xl border-[#E5E5E5] text-[#525252] hover:bg-[#F5F5F5]"
        >
          {loading ? '読み込み中...' : '次の6枚を見る'}
        </Button>
      </div>

      {/* Selected Images Bar */}
      <div className="mb-6">
        <SelectedImagesBar selectedImages={selectedImages} maxCount={6} onRemove={removeImage} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-[#E5E5E5]">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#737373] hover:text-[#171717] hover:bg-[#F5F5F5]"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          戻る
        </Button>
        <Button
          onClick={onComplete}
          disabled={!isFormValid}
          className="px-6 py-2 rounded-xl bg-[#171717] text-white hover:bg-[#2d2d2d] disabled:bg-[#E5E5E5] disabled:text-[#A3A3A3] disabled:cursor-not-allowed"
        >
          次へ
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}
