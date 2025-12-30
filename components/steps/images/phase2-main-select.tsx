'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSessionStore } from '@/lib/store/session-store'
import type { UnsplashImage } from '@/types/session'
import { ImageCard } from './image-card'

interface Phase2MainSelectProps {
  onBack: () => void
  onComplete: () => void
}

export function Phase2MainSelect({ onBack, onComplete }: Phase2MainSelectProps) {
  const session = useSessionStore((state) => state.session)
  const updateSession = useSessionStore((state) => state.updateSession)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const selectedImages = session?.images?.selectedImages ?? []
  const mainImage = session?.images?.mainImage

  const setMainImage = (image: UnsplashImage) => {
    updateSession({
      images: {
        selectedImages,
        mainImage: image,
        extractedColors: [],
      },
    })
  }

  const isFormValid = mainImage !== null

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Title */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-[#737373] mb-3">Step 07 - Phase 2</p>
        <h1 className="text-xl md:text-3xl font-bold text-[#171717] mb-4">最も好きな1枚を選ぶ</h1>
        <p className="text-[#525252] mb-4">
          選んだ6枚の中から、特に好きな
          <span className="font-medium">1枚</span>
          を選んでください。
        </p>
        <div className="flex flex-col gap-2 text-sm text-[#737373]">
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
            <span>この画像からカラーパレットを抽出します</span>
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
            <span>デザインの中心となるビジュアルイメージになります</span>
          </div>
        </div>
      </div>

      {/* Selected Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {selectedImages.map((image, index) => (
          <div
            key={image.id}
            className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${100 + index * 50}ms` }}
          >
            <ImageCard
              src={image.thumbnailUrl}
              alt={`Photo by ${image.photographer}`}
              selected={mainImage?.id === image.id}
              isMain={mainImage?.id === image.id}
              onClick={() => setMainImage(image)}
            />
          </div>
        ))}
      </div>

      {/* Selected Main Image Preview */}
      {mainImage && (
        <div
          className={`bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <h3 className="font-medium text-[#171717]">選択したメイン画像</h3>
          </div>
          <p className="text-sm text-[#737373]">
            この画像から色を抽出して、あなたのデザインのカラーパレットを作成します。
          </p>
        </div>
      )}

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
          戻る（画像を選び直す）
        </Button>
        <Button
          onClick={onComplete}
          disabled={!isFormValid}
          className="px-6 py-2 rounded-xl bg-[#171717] text-white hover:bg-[#2d2d2d] disabled:bg-[#E5E5E5] disabled:text-[#A3A3A3] disabled:cursor-not-allowed"
        >
          色を抽出する
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
