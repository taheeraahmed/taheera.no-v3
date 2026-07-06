import { useEffect, useRef } from 'react'
import HintActionButton from './HintActionButton'
import TerminalWindow from './terminal/TerminalWindow'
import useDraggableWindow from '../hooks/useDraggableWindow'
import './CvDialog.css'

function CvDialog({ isOpen, fileName, onClose, isActive, onActivate, ui }) {
  const dialogRef = useRef(null)
  const { offset, isDragging, handleDragStart, resetOffset } = useDraggableWindow({
    getBounds: () => {
      const dialogRect = dialogRef.current?.getBoundingClientRect()
      if (!dialogRect) {
        return {}
      }

      const margin = 12
      return {
        minX: offset.x + (margin - dialogRect.left),
        maxX: offset.x + (window.innerWidth - margin - dialogRect.right),
        minY: offset.y + (margin - dialogRect.top),
        maxY: offset.y + (window.innerHeight - margin - dialogRect.bottom),
      }
    },
  })

  const activateDialog = () => {
    onActivate?.()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    resetOffset()
  }, [isOpen, resetOffset])

  if (!isOpen) {
    return null
  }

  return (
    <div className="cv-dialog-layer" style={{ zIndex: isActive ? 70 : 20 }}>
      <TerminalWindow
        ref={dialogRef}
        title={fileName}
        onClose={onClose}
        closeLabel={ui?.closeButtonAriaLabel ?? 'Close'}
        onDragStart={handleDragStart}
        onMouseDown={activateDialog}
        onClick={activateDialog}
        isDragging={isDragging}
        className="cv-dialog"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        role="dialog"
        aria-modal="false"
        aria-label={ui?.cvPreviewAriaLabel ?? 'CV preview'}
      >
        <div className="cv-display">
          {!isActive ? (
            <button
              type="button"
              className="cv-activation-overlay"
              aria-label={ui?.activateCvWindowAriaLabel ?? 'Activate CV window'}
              onClick={activateDialog}
              onMouseDown={activateDialog}
            />
          ) : null}
          <iframe
            className="cv-frame"
            src={`/${fileName}#toolbar=1&navpanes=0`}
            title={ui?.cvFrameTitle ?? 'Taheera CV'}
            onPointerDown={activateDialog}
            onFocus={activateDialog}
          />
        </div>
        <HintActionButton
          className="cv-dialog-hint"
          onClick={onClose}
          prefix={ui?.escapePrefix ?? 'Press'}
          suffix={ui?.closeDialogSuffix ?? 'to close'}
        />
      </TerminalWindow>
    </div>
  )
}

export default CvDialog
