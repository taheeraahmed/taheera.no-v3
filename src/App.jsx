import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { DEFAULT_LANGUAGE, getLocalizedContent } from './content'
import ContactCard from './components/ContactCard'
import CvDialog from './components/CvDialog'
import TerminalWindow from './components/terminal/TerminalWindow'
import useDraggableWindow from './hooks/useDraggableWindow'
import usePortfolioWindows from './hooks/usePortfolioWindows'
import { CV_FILE_NAME } from './terminal/constants'
import { getSubmitUpdate, getTabCompletionUpdate } from './terminal/autocomplete'
import { runCommand } from './terminal/commands'
import { buildTerminalTree, getContentSnapshot } from './terminal/filesystem'
import { createInitialHistory, getWelcomeText, formatPrompt } from './terminal/formatters'
import TerminalHistory from './components/terminal/TerminalHistory'
import { getTerminalStrings } from './terminal/i18n'
import useCatParty from './hooks/useCatParty'

function App() {
  const [isPhoneView, setIsPhoneView] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(max-width: 700px)').matches
  })
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
  const [content, setContent] = useState(() =>
    getContentSnapshot(getLocalizedContent(DEFAULT_LANGUAGE))
  )
  const terminalStrings = useMemo(() => getTerminalStrings(language), [language])
  const [cwd, setCwd] = useState([])
  const [input, setInput] = useState('')
  const terminalTree = buildTerminalTree(content)
  const welcomeText = getWelcomeText(content)
  const [history, setHistory] = useState(() => createInitialHistory(content, terminalStrings))
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(null)
  const [draftInput, setDraftInput] = useState('')
  const [tabCompletion, setTabCompletion] = useState(null)
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
  const { isCatPartyActive, catSprites, activateCatParty, toggleCatParty } = useCatParty()

  const historyEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  useEffect(() => {
    setContent(getContentSnapshot(getLocalizedContent(language)))
  }, [language])

  useEffect(() => {
    if (!import.meta.hot) {
      return
    }

    const dispose = import.meta.hot.accept('./content', (newModule) => {
      if (!newModule) {
        return
      }

      setContent(getContentSnapshot(newModule.getLocalizedContent(language)))
    })

    return () => {
      if (typeof dispose === 'function') {
        dispose()
      }
    }
  }, [language])

  const appendEntries = (entries) => {
    setHistory((prev) => [...prev, ...entries])
  }

  const handleRunCommand = (rawInput) => {
    runCommand({
      rawInput,
      language,
      cwd,
      terminalTree,
      terminalStrings,
      welcomeText,
      appendEntries,
      setCwd,
      setLanguage,
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

    const submitUpdate = getSubmitUpdate({ line: input, cwd, terminalTree })
    if (!submitUpdate.shouldExecute) {
      setInput(submitUpdate.nextInput)
      setTabCompletion(null)
      return
    }

    const commandLine = input.trim()
    if (commandLine) {
      setCommandHistory((prev) => [...prev, commandLine])
    }

    setHistoryIndex(null)
    setDraftInput('')
    setTabCompletion(null)
    handleRunCommand(input)
    setInput('')
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      if (commandHistory.length === 0) {
        return
      }

      event.preventDefault()
      setTabCompletion(null)

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
      setTabCompletion(null)

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
    const tabUpdate = getTabCompletionUpdate({
      line: input,
      cwd,
      terminalTree,
      tabCompletion,
    })

    if (!tabUpdate.handled) {
      return
    }

    if ('nextTabCompletion' in tabUpdate) {
      setTabCompletion(tabUpdate.nextTabCompletion)
    }

    if (tabUpdate.nextInput) {
      setInput(tabUpdate.nextInput)
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      const end = inputRef.current.value.length
      inputRef.current.setSelectionRange(end, end)
    }
  }, [input])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(max-width: 700px)')
    const handleMediaChange = (event) => {
      setIsPhoneView(event.matches)
    }

    setIsPhoneView(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true })
  }

  const isInteractiveTarget = (target) => {
    return target instanceof Element && target.closest('button, a, input, label')
  }

  const formatSuggestionLabel = (suggestion) => {
    const hasTrailingSlash = suggestion.endsWith('/')
    const normalized = hasTrailingSlash ? suggestion.slice(0, -1) : suggestion
    const parts = normalized.split('/').filter(Boolean)
    const baseName = parts[parts.length - 1] ?? suggestion

    return hasTrailingSlash ? `${baseName}/` : baseName
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

  if (isPhoneView) {
    return (
      <main className="portfolio-page">
        <div className={`cat-easter-egg ${isCatPartyActive ? 'is-active' : ''}`} aria-hidden="true">
          {isCatPartyActive
            ? catSprites.map((cat) => (
                <img
                  key={cat.id}
                  className="cat-easter-egg-sprite"
                  src={cat.src}
                  alt=""
                  style={cat.style}
                  loading="lazy"
                  decoding="async"
                />
              ))
            : null}
        </div>

        <section className="terminal-card-face mobile-contact-only" aria-label={terminalStrings.contactCardAria}>
          <div className="terminal-card-screen">
            <ContactCard
              card={content.contactCard}
              ui={content.ui}
              onClose={() => {}}
              onNameHover={activateCatParty}
              onNameClick={toggleCatParty}
              isCatPartyActive={isCatPartyActive}
              isPhoneView={isPhoneView}
            />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="portfolio-page">
      <div className={`cat-easter-egg ${isCatPartyActive ? 'is-active' : ''}`} aria-hidden="true">
        {isCatPartyActive
          ? catSprites.map((cat) => (
              <img
                key={cat.id}
                className="cat-easter-egg-sprite"
                src={cat.src}
                alt=""
                style={cat.style}
                loading="lazy"
                decoding="async"
              />
            ))
          : null}
      </div>

      <CvDialog
        isOpen={isCvDialogOpen}
        fileName={CV_FILE_NAME}
        onClose={closeCvDialog}
        isActive={activeWindow === 'cv'}
        onActivate={setCvActive}
        ui={content.ui}
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
            title={terminalStrings.windowTitle}
            onDragStart={handleWindowDragStart}
            onMouseDown={handleWindowMouseDown}
            onClick={handleWindowClick}
            className="terminal-face terminal-face-front"
            aria-label={terminalStrings.terminalAria}
            closeLabel={content.ui?.closeButtonAriaLabel ?? 'Close'}
          >
            <div className="terminal-screen">
              <TerminalHistory history={history} historyEndRef={historyEndRef} onHintClick={handleHintClick}>
                {tabCompletion && tabCompletion.suggestions.length > 1 ? (
                  <div className="autocomplete-suggestions" aria-live="polite">
                    {tabCompletion.suggestions.map((suggestion, index) => (
                      <span
                        key={suggestion}
                        className={`autocomplete-suggestion${index === tabCompletion.index ? ' is-selected' : ''}`}
                      >
                        {formatSuggestionLabel(suggestion)}
                      </span>
                    ))}
                  </div>
                ) : null}

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
                      setTabCompletion(null)
                      if (historyIndex !== null) {
                        setHistoryIndex(null)
                      }
                    }}
                    onKeyDown={handleInputKeyDown}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder={terminalStrings.inputPlaceholder}
                    aria-label={terminalStrings.shellInputAria}
                  />
                </form>
              </TerminalHistory>
            </div>
          </TerminalWindow>

          <section className="terminal-face terminal-face-back terminal-card-face" aria-label={terminalStrings.contactCardAria}>
            <div className="terminal-card-screen">
              <ContactCard
                card={content.contactCard}
                ui={content.ui}
                onClose={hideCard}
                onNameHover={activateCatParty}
                onNameClick={toggleCatParty}
                isCatPartyActive={isCatPartyActive}
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
