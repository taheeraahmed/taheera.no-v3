import { useEffect } from 'react'
import './CvDialog.css'

function CvDialog({ isOpen, fileName, onClose }) {
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

  if (!isOpen) {
    return null
  }

  return (
    <div className="cv-dialog-backdrop" onClick={onClose}>
      <section
        className="cv-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="CV preview"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="cv-dialog-header">
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
