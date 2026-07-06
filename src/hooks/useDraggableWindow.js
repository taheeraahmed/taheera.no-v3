import { useCallback, useEffect, useRef, useState } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function useDraggableWindow({ getBounds } = {}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStateRef = useRef(null)

  useEffect(() => {
    if (!isDragging) {
      return
    }

    const handlePointerMove = (event) => {
      const dragState = dragStateRef.current
      if (!dragState) {
        return
      }

      const nextX = dragState.originX + event.clientX - dragState.startX
      const nextY = dragState.originY + event.clientY - dragState.startY

      if (typeof dragState.minX === 'number') {
        setOffset({
          x: clamp(nextX, dragState.minX, dragState.maxX),
          y: clamp(nextY, dragState.minY, dragState.maxY),
        })
        return
      }

      setOffset({ x: nextX, y: nextY })
    }

    const stopDragging = () => {
      dragStateRef.current = null
      setIsDragging(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [isDragging])

  const handleDragStart = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const nextDragState = {
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
      ...(getBounds ? getBounds(event, offset) : null),
    }

    dragStateRef.current = nextDragState
    setIsDragging(true)
  }, [getBounds, offset])

  const resetOffset = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  return {
    offset,
    setOffset,
    isDragging,
    handleDragStart,
    resetOffset,
  }
}

export default useDraggableWindow