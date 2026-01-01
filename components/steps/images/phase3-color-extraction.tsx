'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useColorMagnifier } from '@/lib/hooks'
import { useSessionStore } from '@/lib/store/session-store'
import { extractColorsFromImage, getColorAtPixel } from '@/lib/utils/color-extraction'
import { ColorPaletteEditor } from './color-palette-editor'

interface Phase3ColorExtractionProps {
  onBack: () => void
  onComplete: () => void
}

export function Phase3ColorExtraction({ onBack, onComplete }: Phase3ColorExtractionProps) {
  const session = useSessionStore((state) => state.session)
  const updateSession = useSessionStore((state) => state.updateSession)
  const [loading, setLoading] = useState(false)
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null)

  const mainImage = session?.images?.mainImage
  const extractedColors = session?.images?.extractedColors ?? []

  const {
    sourceCanvasRef,
    magnifierCanvasRef,
    magnifierPosition,
    hoverColor,
    handleMouseMove,
    handleMouseLeave,
    magnifierSize,
  } = useColorMagnifier(activeColorIndex !== null)

  const extractColors = useCallback(async () => {
    if (!mainImage) return

    setLoading(true)
    try {
      const colors = await extractColorsFromImage(mainImage.url)
      updateSession({
        images: {
          selectedImages: session?.images?.selectedImages ?? [],
          mainImage,
          extractedColors: colors,
        },
      })
    } catch (error) {
      console.error('Failed to extract colors:', error)
    } finally {
      setLoading(false)
    }
  }, [mainImage, session?.images?.selectedImages, updateSession])

  // 初回マウント時に自動抽出
  useEffect(() => {
    if (mainImage && extractedColors.length === 0) {
      extractColors()
    }
  }, [mainImage, extractedColors.length, extractColors])

  // 画像をキャンバスに描画
  useEffect(() => {
    if (!mainImage || !sourceCanvasRef.current) return

    const canvas = sourceCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }
    img.src = mainImage.url
  }, [mainImage, sourceCanvasRef])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeColorIndex === null || !sourceCanvasRef.current) return

    const canvas = sourceCanvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = Math.floor((e.clientX - rect.left) * scaleX)
    const y = Math.floor((e.clientY - rect.top) * scaleY)

    const hex = getColorAtPixel(canvas, x, y)

    const newColors = [...extractedColors]
    newColors[activeColorIndex] = {
      ...newColors[activeColorIndex],
      hex,
    }

    updateSession({
      images: {
        selectedImages: session?.images?.selectedImages ?? [],
        mainImage: session?.images?.mainImage ?? null,
        extractedColors: newColors,
      },
    })

    setActiveColorIndex(null)
  }

  const handleColorChange = (index: number, hex: string) => {
    const newColors = [...extractedColors]
    newColors[index] = { ...newColors[index], hex }

    updateSession({
      images: {
        selectedImages: session?.images?.selectedImages ?? [],
        mainImage: session?.images?.mainImage ?? null,
        extractedColors: newColors,
      },
    })
  }

  const isFormValid = extractedColors.length > 0
  const showMagnifier = activeColorIndex !== null && magnifierPosition && hoverColor

  if (!mainImage) return null

  return (
    <>
      {/* Magnifier - always rendered for ref, visibility controlled by style */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: magnifierPosition?.x ?? 0,
          top: magnifierPosition?.y ?? 0,
          zIndex: 9999,
          opacity: showMagnifier ? 1 : 0,
          visibility: showMagnifier ? 'visible' : 'hidden',
        }}
      >
        <div className="bg-white rounded-xl shadow-2xl border-2 border-[#171717] overflow-hidden">
          <canvas
            ref={magnifierCanvasRef}
            className="block"
            style={{ width: magnifierSize, height: magnifierSize }}
          />
          <div className="flex items-center gap-2 px-3 py-2 bg-[#171717]">
            <div
              className="w-6 h-6 rounded border-2 border-white"
              style={{ backgroundColor: hoverColor ?? '#000000' }}
            />
            <span className="font-mono text-sm text-white">
              {hoverColor?.toUpperCase() ?? ''}
            </span>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up">
      {/* Title */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-[#737373] mb-3">Step 07 - Phase 3</p>
        <h1 className="text-xl md:text-3xl font-bold text-[#171717] mb-4">
          カラーパレットを確認・調整する
        </h1>
        <p className="text-[#525252] mb-4">
          選んだ画像から
          <span className="font-medium">5色</span>
          を自動抽出しました。必要に応じて調整してください。
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
            <span>スポイトボタンをクリック後、画像をクリックすると色を取得できます</span>
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
            <span>カラーピッカーやHEX入力で色を変更することもできます</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Image Area */}
        <div className="animate-fade-in-up-sm stagger-1">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-4 shadow-sm">
            <h3 className="font-medium text-[#171717] mb-3">メイン画像</h3>
            <div className="relative">
              <canvas
                ref={sourceCanvasRef}
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`w-full rounded-xl ${activeColorIndex !== null ? 'cursor-crosshair' : 'cursor-default'}`}
              />
              {activeColorIndex !== null && (
                <div className="absolute top-3 left-3 bg-[#171717]/80 text-white px-3 py-1.5 rounded-lg text-sm">
                  クリックで色を取得
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Color Palette Area */}
        <div className="animate-fade-in-up-sm stagger-2">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#171717]">抽出したカラー</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={extractColors}
                disabled={loading}
                className="text-xs"
              >
                {loading ? '抽出中...' : '再抽出'}
              </Button>
            </div>
            {loading ? (
              <div className="text-center py-8 text-[#737373]">
                <div className="w-8 h-8 border-2 border-[#171717] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p>色を抽出中...</p>
              </div>
            ) : (
              <ColorPaletteEditor
                colors={extractedColors}
                activeIndex={activeColorIndex}
                onSelectForPick={setActiveColorIndex}
                onColorChange={handleColorChange}
              />
            )}
          </div>
        </div>
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
          ムードボードへ
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
    </>
  )
}
