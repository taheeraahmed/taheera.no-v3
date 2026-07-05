import { useEffect, useRef, useState } from 'react'
import './App.css'
import { aboutMe, contactCard, projects, rootFiles, welcomeLines } from './content'
import ContactCard from './components/ContactCard'
import CvDialog from './components/CvDialog'
import TerminalWindow from './components/terminal/TerminalWindow'
import { commandNames, CV_FILE_NAME } from './terminal/constants'
import { getPathSuggestions } from './terminal/autocomplete'
import { runCommand } from './terminal/commands'
import { buildTerminalTree, getContentSnapshot } from './terminal/filesystem'
import { createInitialHistory, getWelcomeText } from './terminal/formatters'

function App() {
  const [content, setContent] = useState(() =>
    getContentSnapshot({ projects, rootFiles, aboutMe, contactCard, welcomeLines })
  )
  const [cwd, setCwd] = useState([])
  const [input, setInput] = useState('')
  const terminalTree = buildTerminalTree(content)
  const welcomeText = getWelcomeText(content)
  const [history, setHistory] = useState(() => createInitialHistory(content))
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(null)
  const [draftInput, setDraftInput] = useState('')
  const [isCvDialogOpen, setIsCvDialogOpen] = useState(false)
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const [windowOffset, setWindowOffset] = useState({ x: 0, y: 0 })
  const [isDraggingWindow, setIsDraggingWindow] = useState(false)

  const historyEndRef = useRef(null)
  const inputRef = useRef(null)
  const dragStateRef = useRef(null)

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
    setIsCardFlipped(false)
    setHistory(createInitialHistory(content))
  }, [welcomeText])

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
      setIsCardFlipped,
      setIsCvDialogOpen,
      inputRef,
    })
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

  const completeCommand = (line) => {
    const matches = commandNames.filter((name) => name.startsWith(line))
    if (matches.length === 1) {
      setInput(`${matches[0]} `)
      return
    }

    if (matches.length > 1) {
      appendEntries([{ type: 'output', text: matches.join('    ') }])
    }
  }

  const completePathArgument = (line, command) => {
    const hasTrailingSpace = /\s$/.test(line)
    const segments = line.trim().split(/\s+/)
    const pathPart = hasTrailingSpace ? '' : segments[1] ?? ''
    const commandPrefix = `${command} `

    const suggestions = getPathSuggestions(terminalTree, cwd, pathPart, {
      directoriesOnly: command === 'cd',
    })

    if (suggestions.length === 1) {
      setInput(`${commandPrefix}${suggestions[0]}`)
      return
    }

    if (suggestions.length > 1) {
      appendEntries([{ type: 'output', text: suggestions.join('    ') }])
    }
  }

  useEffect(() => {
    if (!isCvDialogOpen && !isCardFlipped) {
      return
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isCvDialogOpen) {
          setIsCvDialogOpen(false)
          return
        }

        setIsCardFlipped(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isCardFlipped, isCvDialogOpen])

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
    if (command === 'cd' || command === 'ls' || command === 'cat' || command === 'open' || command === 'bash') {
      completePathArgument(line, command)
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      const end = inputRef.current.value.length
      inputRef.current.setSelectionRange(end, end)
    }
  }, [input])

  useEffect(() => {
    if (!isDraggingWindow) {
      return
    }

    const handlePointerMove = (event) => {
      const dragState = dragStateRef.current
      if (!dragState) {
        return
      }

      setWindowOffset({
        x: dragState.originX + event.clientX - dragState.startX,
        y: dragState.originY + event.clientY - dragState.startY,
      })
    }

    const stopDragging = () => {
      dragStateRef.current = null
      setIsDraggingWindow(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [isDraggingWindow])

  const handleWindowDragStart = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: windowOffset.x,
      originY: windowOffset.y,
    }
    setIsDraggingWindow(true)
  }

  return (
    <main className="portfolio-page">
      <CvDialog isOpen={isCvDialogOpen} fileName={CV_FILE_NAME} onClose={() => setIsCvDialogOpen(false)} />

      <section
        className={`terminal-stage ${isCardFlipped ? 'is-flipped' : ''} ${isDraggingWindow ? 'is-dragging' : ''}`}
        style={{ transform: `translate(${windowOffset.x}px, ${windowOffset.y}px)` }}
      >
        <div className="terminal-flipper">
          <TerminalWindow
            history={history}
            cwd={cwd}
            input={input}
            setInput={setInput}
            historyIndex={historyIndex}
            setHistoryIndex={setHistoryIndex}
            handleSubmit={handleSubmit}
            handleInputKeyDown={handleInputKeyDown}
            historyEndRef={historyEndRef}
            inputRef={inputRef}
            onHintClick={handleRunCommand}
            onDragStart={handleWindowDragStart}
          />

          <section className="terminal-face terminal-face-back terminal-card-face" aria-label="Contact card">
            <div className="terminal-card-screen">
              <ContactCard card={content.contactCard} />
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
