'use client'

import type { UnsplashImage } from '@/types/session'

interface SelectedImagesBarProps {
  selectedImages: UnsplashImage[]
  maxCount: number
  onRemove?: (imageId: string) => void
}

export function SelectedImagesBar({ selectedImages, maxCount, onRemove }: SelectedImagesBarProps) {
  const slots = Array.from({ length: maxCount }, (_, i) => selectedImages[i] ?? null)

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-[#171717]">選択した画像</h3>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            selectedImages.length === maxCount
              ? 'bg-[#DCFCE7] text-[#166534]'
              : 'bg-[#F5F5F5] text-[#737373]'
          }`}
        >
          {selectedImages.length} / {maxCount}
        </span>
      </div>

      <div className="flex gap-2">
        {slots.map((image, index) => (
          <div
            key={image?.id ?? `slot-${index.toString()}`}
            className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
              image ? 'border-[#171717]' : 'border-dashed border-[#D4D4D4]'
            }`}
          >
            {image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.thumbnailUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(image.id)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#171717] rounded-full flex items-center justify-center text-white hover:bg-[#404040] transition-colors"
                    aria-label="削除"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#A3A3A3]">
                <span className="text-lg">?</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
