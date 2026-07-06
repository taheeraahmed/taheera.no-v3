import { forwardRef } from 'react'
import './TerminalShared.css'
import './TerminalWindow.css'

const TerminalWindow = forwardRef(function TerminalWindow(
  { title, onClose, onDragStart, isDragging, children, className, style, onMouseDown, onClick, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      className={`terminal-window${isDragging ? ' is-dragging' : ''}${className ? ' ' + className : ''}`}
      style={style}
      onMouseDown={onMouseDown}
      onClick={onClick}
      {...rest}
    >
      <header className="terminal-bar terminal-drag-handle" onPointerDown={onDragStart}>
        <div className="window-controls" aria-hidden="true">
          {onClose ? (
            <button type="button" className="dot close" aria-label="Close" onClick={onClose} />
          ) : (
            <span className="dot close"></span>
          )}
          <span className="dot minimize"></span>
          <span className="dot maximize"></span>
        </div>
        <p>{title}</p>
      </header>
      {children}
    </section>
  )
})

export default TerminalWindow
