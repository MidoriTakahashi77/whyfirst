'use client'

interface ImageCardProps {
  src: string
  alt: string
  selected?: boolean
  isMain?: boolean
  onClick?: () => void
}

export function ImageCard({ src, alt, selected, isMain, onClick }: ImageCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 bg-[#F5F5F5] ${
        selected
          ? 'border-[#171717] ring-2 ring-[#171717]/20 scale-[1.02]'
          : 'border-transparent hover:border-[#171717]/50 hover:shadow-md'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Selected checkmark */}
      {selected && !isMain && (
        <div className="absolute top-3 right-3 w-7 h-7 bg-[#171717] rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      )}

      {/* Main image indicator */}
      {isMain && (
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
          <svg
            className="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-white text-sm font-medium mt-1">メイン</span>
        </div>
      )}

      {/* Hover overlay */}
      {!selected && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
      )}
    </button>
  )
}
