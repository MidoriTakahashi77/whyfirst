'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null)
  const [magnifierPosition, setMagnifierPosition] = useState<{ x: number; y: number } | null>(null)
  const [hoverColor, setHoverColor] = useState<string | null>(null)

  const mainImage = session?.images?.mainImage
  const extractedColors = session?.images?.extractedColors ?? []

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    if (!mainImage || !canvasRef.current) return

    const canvas = canvasRef.current
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
  }, [mainImage])

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return null
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = Math.floor((e.clientX - rect.left) * scaleX)
    const y = Math.floor((e.clientY - rect.top) * scaleY)
    return { x, y, clientX: e.clientX, clientY: e.clientY }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeColorIndex === null || !canvasRef.current) return

    const coords = getCanvasCoordinates(e)
    if (!coords) return

    const { x, y, clientX, clientY } = coords
    const canvas = canvasRef.current

    // Get color at current position
    const hex = getColorAtPixel(canvas, x, y)
    setHoverColor(hex)

    // Set magnifier position (offset to not cover cursor)
    setMagnifierPosition({ x: clientX + 20, y: clientY - 80 })
  }

  // Draw magnifier when position updates
  useEffect(() => {
    if (!magnifierPosition || !hoverColor || !canvasRef.current || !magnifierCanvasRef.current) return

    const canvas = canvasRef.current
    const magnifierCanvas = magnifierCanvasRef.current
    const magnifierCtx = magnifierCanvas.getContext('2d')
    if (!magnifierCtx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    // Calculate canvas coordinates from screen position
    const x = Math.floor((magnifierPosition.x - 20 - rect.left) * scaleX)
    const y = Math.floor((magnifierPosition.y + 80 - rect.top) * scaleY)

    // Draw magnified area (7x7 pixels, scaled up)
    const magnifySize = 7
    const pixelSize = 14
    magnifierCanvas.width = magnifySize * pixelSize
    magnifierCanvas.height = magnifySize * pixelSize

    magnifierCtx.imageSmoothingEnabled = false

    // Get the source area (centered on cursor)
    const sourceX = x - Math.floor(magnifySize / 2)
    const sourceY = y - Math.floor(magnifySize / 2)

    // Draw each pixel as a larger square
    for (let py = 0; py < magnifySize; py++) {
      for (let px = 0; px < magnifySize; px++) {
        const sx = sourceX + px
        const sy = sourceY + py
        if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
          const pixelHex = getColorAtPixel(canvas, sx, sy)
          magnifierCtx.fillStyle = pixelHex
        } else {
          magnifierCtx.fillStyle = '#E5E5E5'
        }
        magnifierCtx.fillRect(px * pixelSize, py * pixelSize, pixelSize, pixelSize)
      }
    }

    // Draw center crosshair
    const centerOffset = Math.floor(magnifySize / 2) * pixelSize
    magnifierCtx.strokeStyle = '#FFFFFF'
    magnifierCtx.lineWidth = 2
    magnifierCtx.strokeRect(centerOffset, centerOffset, pixelSize, pixelSize)
  }, [magnifierPosition, hoverColor])

  const handleCanvasMouseLeave = () => {
    setMagnifierPosition(null)
    setHoverColor(null)
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeColorIndex === null || !canvasRef.current) return

    const coords = getCanvasCoordinates(e)
    if (!coords) return

    const { x, y } = coords
    const hex = getColorAtPixel(canvasRef.current, x, y)

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
    setMagnifierPosition(null)
    setHoverColor(null)
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
          opacity: activeColorIndex !== null && magnifierPosition && hoverColor ? 1 : 0,
          visibility: activeColorIndex !== null && magnifierPosition && hoverColor ? 'visible' : 'hidden',
        }}
      >
        <div className="bg-white rounded-xl shadow-2xl border-2 border-[#171717] overflow-hidden">
          <canvas
            ref={magnifierCanvasRef}
            className="block"
            style={{ width: 98, height: 98 }}
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

      <div
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
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
        <div
          className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-4 shadow-sm">
            <h3 className="font-medium text-[#171717] mb-3">メイン画像</h3>
            <div className="relative">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
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
        <div
          className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
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
