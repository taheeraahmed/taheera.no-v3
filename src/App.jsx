import { useEffect, useRef, useState } from 'react'
import './App.css'
import { aboutMe, contactCard, rootFiles, welcomeLines } from './content'
import ContactCard from './components/ContactCard'
import CvDialog from './components/CvDialog'
import TerminalWindow from './components/terminal/TerminalWindow'
import useDraggableWindow from './hooks/useDraggableWindow'
import usePortfolioWindows from './hooks/usePortfolioWindows'
import { commandNames, CV_FILE_NAME, pathCommands } from './terminal/constants'
import { getPathSuggestions } from './terminal/autocomplete'
import { runCommand } from './terminal/commands'
import { buildTerminalTree, getContentSnapshot } from './terminal/filesystem'
import { createInitialHistory, getWelcomeText, formatPrompt } from './terminal/formatters'
import TerminalHistory from './components/terminal/TerminalHistory'

function App() {
  const [content, setContent] = useState(() =>
    getContentSnapshot({ rootFiles, aboutMe, contactCard, welcomeLines })
  )
  const [cwd, setCwd] = useState([])
  const [input, setInput] = useState('')
  const terminalTree = buildTerminalTree(content)
  const welcomeText = getWelcomeText(content)
  const [history, setHistory] = useState(() => createInitialHistory(content))
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(null)
  const [draftInput, setDraftInput] = useState('')
  const {
    activeWindow,
    closeCvDialog,
    hideCard,
    isCardFlipped,
    isCvDialogOpen,
    openCvDialog,
    setCvActive,
    setTerminalActive,
    showCard,
  } = usePortfolioWindows()
  const { offset: windowOffset, isDragging: isDraggingWindow, handleDragStart: handleWindowDragStart } =
    useDraggableWindow()

  const historyEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  useEffect(() => {
    if (!import.meta.hot) {
      return
    }

    const dispose = import.meta.hot.accept('./content', (newModule) => {
      if (!newModule) {
        return
      }

      setContent(getContentSnapshot(newModule))
    })

    return () => {
      if (typeof dispose === 'function') {
        dispose()
      }
    }
  }, [])

  useEffect(() => {
    setCwd([])
    setInput('')
    setCommandHistory([])
    setHistoryIndex(null)
    setDraftInput('')
    hideCard()
    setHistory(createInitialHistory(content))
  }, [content, hideCard])

  const appendEntries = (entries) => {
    setHistory((prev) => [...prev, ...entries])
  }

  const handleRunCommand = (rawInput) => {
    runCommand({
      rawInput,
      cwd,
      terminalTree,
      welcomeText,
      appendEntries,
      setCwd,
      setHistory,
      hideCard,
      openCvDialog,
      showCard,
      inputRef,
    })
  }

  const handleHintClick = (command) => {
    setInput(command)
    inputRef.current?.focus()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const commandLine = input.trim()
    if (commandLine) {
      setCommandHistory((prev) => [...prev, commandLine])
    }

    setHistoryIndex(null)
    setDraftInput('')
    handleRunCommand(input)
    setInput('')
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      if (commandHistory.length === 0) {
        return
      }

      event.preventDefault()

      if (historyIndex === null) {
        setDraftInput(input)
        const nextIndex = commandHistory.length - 1
        setHistoryIndex(nextIndex)
        setInput(commandHistory[nextIndex])
        return
      }

      const nextIndex = Math.max(historyIndex - 1, 0)
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex])
      return
    }

    if (event.key === 'ArrowDown') {
      if (historyIndex === null) {
        return
      }

      event.preventDefault()

      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(null)
        setInput(draftInput)
        return
      }

      const nextIndex = historyIndex + 1
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex])
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    event.preventDefault()
    const line = input

    if (!line.trim()) {
      return
    }

    if (!line.includes(' ')) {
      completeCommand(line.trim())
      return
    }

    const [command] = line.trim().split(/\s+/)
    if (pathCommands.includes(command)) {
      completePathArgument(line, command)
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      const end = inputRef.current.value.length
      inputRef.current.setSelectionRange(end, end)
    }
  }, [input])

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true })
  }

  const isInteractiveTarget = (target) => {
    return target instanceof Element && target.closest('button, a, input, label')
  }

  const handleWindowMouseDown = (event) => {
    setTerminalActive()

    if (isInteractiveTarget(event.target)) {
      return
    }

    requestAnimationFrame(focusInput)
  }

  const handleWindowClick = (event) => {
    setTerminalActive()

    if (isInteractiveTarget(event.target)) {
      return
    }

    focusInput()
  }

  return (
    <main className="portfolio-page">
      <CvDialog
        isOpen={isCvDialogOpen}
        fileName={CV_FILE_NAME}
        onClose={closeCvDialog}
        isActive={activeWindow === 'cv'}
        onActivate={setCvActive}
      />

      <section
        className={`terminal-stage ${isCardFlipped ? 'is-flipped' : ''} ${isDraggingWindow ? 'is-dragging' : ''}`}
        style={{
          transform: `translate(${windowOffset.x}px, ${windowOffset.y}px)`,
          zIndex: activeWindow === 'terminal' ? 60 : 30,
        }}
      >
        <div className="terminal-flipper">
          <TerminalWindow
            title="simple-but-enhanced-cool-shell"
            onDragStart={handleWindowDragStart}
            onMouseDown={handleWindowMouseDown}
            onClick={handleWindowClick}
            className="terminal-face terminal-face-front"
            aria-label="Interactive shell portfolio"
          >
            <div className="terminal-screen">
              <TerminalHistory history={history} historyEndRef={historyEndRef} onHintClick={handleHintClick} />

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
          </TerminalWindow>

          <section className="terminal-face terminal-face-back terminal-card-face" aria-label="Contact card">
            <div className="terminal-card-screen">
              <ContactCard card={content.contactCard} onClose={hideCard} />
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
