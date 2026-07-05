import { useEffect, useRef, useState } from 'react'
import './CvDialog.css'

function CvDialog({ isOpen, fileName, onClose }) {
  const [dialogOffset, setDialogOffset] = useState({ x: 0, y: 0 })
  const [isDraggingDialog, setIsDraggingDialog] = useState(false)
  const dialogRef = useRef(null)
  const dragStateRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setDialogOffset({ x: 0, y: 0 })
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isDraggingDialog) {
      return
    }

    const handlePointerMove = (event) => {
      const dragState = dragStateRef.current
      if (!dragState) {
        return
      }

      const nextX = dragState.originX + event.clientX - dragState.startX
      const nextY = dragState.originY + event.clientY - dragState.startY

      setDialogOffset({
        x: Math.min(Math.max(nextX, dragState.minX), dragState.maxX),
        y: Math.min(Math.max(nextY, dragState.minY), dragState.maxY),
      })
    }

    const stopDragging = () => {
      dragStateRef.current = null
      setIsDraggingDialog(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [isDraggingDialog])

  const handleDialogDragStart = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const dialogRect = dialogRef.current?.getBoundingClientRect()
    if (!dialogRect) {
      return
    }

    const margin = 12
    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: dialogOffset.x,
      originY: dialogOffset.y,
      minX: dialogOffset.x + (margin - dialogRect.left),
      maxX: dialogOffset.x + (window.innerWidth - margin - dialogRect.right),
      minY: dialogOffset.y + (margin - dialogRect.top),
      maxY: dialogOffset.y + (window.innerHeight - margin - dialogRect.bottom),
    }

    setIsDraggingDialog(true)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="cv-dialog-backdrop" onClick={onClose}>
      <section
        className={`cv-dialog ${isDraggingDialog ? 'is-dragging' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="CV preview"
        ref={dialogRef}
        style={{ transform: `translate(${dialogOffset.x}px, ${dialogOffset.y}px)` }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="cv-dialog-header cv-drag-handle" onPointerDown={handleDialogDragStart}>
          <div className="cv-window-controls" aria-label="Window controls">
            <button
              type="button"
              className="dot close cv-dot"
              aria-label="Close CV preview"
              onClick={onClose}
            ></button>
            <span className="dot minimize cv-dot" aria-hidden="true"></span>
            <span className="dot maximize cv-dot" aria-hidden="true"></span>
          </div>
          <p className="cv-dialog-title">{fileName}</p>
        </header>
        <div className="cv-display">
          <iframe className="cv-frame" src={`/${fileName}#toolbar=1&navpanes=0`} title="Taheera CV" />
        </div>
        <p className="cv-dialog-hint">
          Press <span className="hint-pill hint-pill-key">Escape</span> to close
        </p>
      </section>
    </div>
  )
}

export default CvDialog
