import { useEffect, useRef, useState } from 'react'
import TerminalWindow from './terminal/TerminalWindow'
import './CvDialog.css'

function CvDialog({ isOpen, fileName, onClose, isActive, onActivate }) {
  const [dialogOffset, setDialogOffset] = useState({ x: 0, y: 0 })
  const [isDraggingDialog, setIsDraggingDialog] = useState(false)
  const dialogRef = useRef(null)
  const dragStateRef = useRef(null)

  const activateDialog = () => {
    onActivate?.()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setDialogOffset({ x: 0, y: 0 })
  }, [isOpen])

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
    <div className="cv-dialog-layer" style={{ zIndex: isActive ? 70 : 20 }}>
      <TerminalWindow
        ref={dialogRef}
        title={fileName}
        onClose={onClose}
        onDragStart={handleDialogDragStart}
        onMouseDown={activateDialog}
        onClick={activateDialog}
        isDragging={isDraggingDialog}
        className="cv-dialog"
        style={{ transform: `translate(${dialogOffset.x}px, ${dialogOffset.y}px)` }}
        role="dialog"
        aria-modal="false"
        aria-label="CV preview"
      >
        <div className="cv-display">
          {!isActive ? (
            <button
              type="button"
              className="cv-activation-overlay"
              aria-label="Activate CV window"
              onClick={activateDialog}
              onMouseDown={activateDialog}
            />
          ) : null}
          <iframe
            className="cv-frame"
            src={`/${fileName}#toolbar=1&navpanes=0`}
            title="Taheera CV"
            onPointerDown={activateDialog}
            onFocus={activateDialog}
          />
        </div>
        <p className="cv-dialog-hint">
          Press <span className="hint-pill hint-pill-key">Escape</span> to close
        </p>
      </TerminalWindow>
    </div>
  )
}

export default CvDialog
