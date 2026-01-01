'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getColorAtPixel } from '@/lib/utils/color-extraction'

interface MagnifierState {
  position: { x: number; y: number } | null
  color: string | null
}

interface UseColorMagnifierOptions {
  magnifySize?: number
  pixelSize?: number
  offset?: { x: number; y: number }
}

export function useColorMagnifier(
  isActive: boolean,
  options: UseColorMagnifierOptions = {}
) {
  const { magnifySize = 7, pixelSize = 14, offset = { x: 20, y: -80 } } = options

  const sourceCanvasRef = useRef<HTMLCanvasElement>(null)
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState<MagnifierState>({ position: null, color: null })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isActive || !sourceCanvasRef.current) return

      const canvas = sourceCanvasRef.current
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const x = Math.floor((e.clientX - rect.left) * scaleX)
      const y = Math.floor((e.clientY - rect.top) * scaleY)

      const color = getColorAtPixel(canvas, x, y)

      setState({
        position: { x: e.clientX + offset.x, y: e.clientY + offset.y },
        color,
      })
    },
    [isActive, offset.x, offset.y]
  )

  const handleMouseLeave = useCallback(() => {
    setState({ position: null, color: null })
  }, [])

  // Draw magnifier when state updates
  useEffect(() => {
    if (!state.position || !state.color || !sourceCanvasRef.current || !magnifierCanvasRef.current)
      return

    const canvas = sourceCanvasRef.current
    const magnifierCanvas = magnifierCanvasRef.current
    const magnifierCtx = magnifierCanvas.getContext('2d')
    if (!magnifierCtx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    // Calculate canvas coordinates from screen position
    const x = Math.floor((state.position.x - offset.x - rect.left) * scaleX)
    const y = Math.floor((state.position.y - offset.y - rect.top) * scaleY)

    // Set canvas size
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
          magnifierCtx.fillStyle = getColorAtPixel(canvas, sx, sy)
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
  }, [state.position, state.color, magnifySize, pixelSize, offset.x, offset.y])

  return {
    sourceCanvasRef,
    magnifierCanvasRef,
    magnifierPosition: state.position,
    hoverColor: state.color,
    handleMouseMove,
    handleMouseLeave,
    magnifierSize: magnifySize * pixelSize,
  }
}
