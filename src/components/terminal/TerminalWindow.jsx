import { formatPrompt } from '../../terminal/formatters'
import TerminalHistory from './TerminalHistory'
import './TerminalShared.css'
import './TerminalWindow.css'

function TerminalWindow({
  history,
  cwd,
  input,
  setInput,
  historyIndex,
  setHistoryIndex,
  handleSubmit,
  handleInputKeyDown,
  historyEndRef,
  inputRef,
  onHintClick,
}) {
  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true })
  }

  const isInteractiveTarget = (target) => {
    return target instanceof Element && target.closest('button, a, input, label')
  }

  const handleWindowMouseDown = (event) => {
    if (isInteractiveTarget(event.target)) {
      return
    }

    requestAnimationFrame(focusInput)
  }

  const handleWindowClick = (event) => {
    if (isInteractiveTarget(event.target)) {
      return
    }

    focusInput()
  }

  return (
    <section
      className="terminal-window terminal-face terminal-face-front"
      aria-label="Interactive shell portfolio"
      onMouseDown={handleWindowMouseDown}
      onClick={handleWindowClick}
    >
      <header className="terminal-bar">
        <div className="window-controls" aria-hidden="true">
          <span className="dot close"></span>
          <span className="dot minimize"></span>
          <span className="dot maximize"></span>
        </div>
        <p>simple-but-enhanced-cool-shell</p>
      </header>

      <div className="terminal-screen">
        <TerminalHistory history={history} historyEndRef={historyEndRef} onHintClick={onHintClick} />

        <form className="command-form" onSubmit={handleSubmit}>
          <label htmlFor="command-input" className="prompt">
            {formatPrompt(cwd)}
          </label>
          <input
            id="command-input"
            ref={inputRef}
            value={input}
            onChange={(event) => {
              setInput(event.target.value)
              if (historyIndex !== null) {
                setHistoryIndex(null)
              }
            }}
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
            spellCheck="false"
            placeholder="Type a command..."
            aria-label="Shell command input"
          />
        </form>
      </div>
    </section>
  )
}

export default TerminalWindow
