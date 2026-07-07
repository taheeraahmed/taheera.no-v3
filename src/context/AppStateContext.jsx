import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import useDraggableWindow from '../hooks/useDraggableWindow'
import usePortfolioWindows from '../hooks/usePortfolioWindows'
import useCatParty from '../hooks/useCatParty'
import { useWebLLM } from '../hooks/useWebLLM'
import { getSubmitUpdate, getTabCompletionUpdate } from '../terminal/autocomplete'
import { runCommand } from '../terminal/commands'
import { buildTerminalTree, getContentSnapshot } from '../terminal/filesystem'
import { createInitialHistory, getWelcomeText } from '../terminal/formatters'
import { DEFAULT_LANGUAGE, getLocalizedContent, getTerminalStrings, getUiStrings } from '../terminal/i18n'

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
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
  const uiStrings = useMemo(() => getUiStrings(language), [language])
  const [cwd, setCwd] = useState([])
  const [input, setInput] = useState('')
  const terminalTree = useMemo(() => buildTerminalTree(content), [content])
  const welcomeText = useMemo(() => getWelcomeText(content), [content])
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
  const { initEngine, chat, isReady: webllmReady } = useWebLLM()

  const historyEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  useEffect(() => {
    if (!tabCompletion || tabCompletion.suggestions.length <= 1) {
      return
    }

    historyEndRef.current?.scrollIntoView({ block: 'end' })
  }, [tabCompletion])

  useEffect(() => {
    setContent(getContentSnapshot(getLocalizedContent(language)))
  }, [language])

  useEffect(() => {
    if (!import.meta.hot) {
      return
    }

    const dispose = import.meta.hot.accept('../terminal/i18n', (newModule) => {
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

  const handleChatCommand = async (prompt, baseEntry) => {
    if (!prompt.trim()) {
      appendEntries([baseEntry, { type: 'error', text: 'Usage: chat <message>' }])
      return
    }

    const entryId = `chat-${Date.now()}`

    const updateEntry = (text, loading) => {
      setHistory((prev) => prev.map((e) => (e.id === entryId ? { ...e, text, loading } : e)))
    }

    try {
      if (!webllmReady) {
        appendEntries([
          baseEntry,
          { type: 'chat', text: 'Loading AI model for the first time — this may take a minute...', loading: true, id: entryId },
        ])
        await initEngine((progress) => updateEntry(progress, true))
        updateEntry('', true)
      } else {
        appendEntries([baseEntry, { type: 'chat', text: '', loading: true, id: entryId }])
      }

      await chat(prompt.trim(), (text) => updateEntry(text, true))
      setHistory((prev) => prev.map((e) => (e.id === entryId ? { ...e, loading: false } : e)))
    } catch (err) {
      updateEntry(`Error: ${err.message}`, false)
    }
  }

  const handleRunCommand = (rawInput) => {
    const trimmed = rawInput.trim()
    const spaceIndex = trimmed.indexOf(' ')
    const command = spaceIndex >= 0 ? trimmed.slice(0, spaceIndex) : trimmed

    if (command === 'chat') {
      const prompt = spaceIndex >= 0 ? trimmed.slice(spaceIndex + 1) : ''
      const baseEntry = { type: 'command', command: trimmed, cwd }
      handleChatCommand(prompt, baseEntry)
      return
    }

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

  const handleInputChange = (event) => {
    setInput(event.target.value)
    setTabCompletion(null)
    if (historyIndex !== null) {
      setHistoryIndex(null)
    }
  }

  const value = {
    activeWindow,
    activateCatParty,
    catSprites,
    closeCvDialog,
    content,
    cwd,
    handleHintClick,
    handleInputChange,
    handleInputKeyDown,
    handleSubmit,
    handleWindowClick,
    handleWindowDragStart,
    handleWindowMouseDown,
    hideCard,
    history,
    historyEndRef,
    input,
    inputRef,
    isCardFlipped,
    isCatPartyActive,
    isCvDialogOpen,
    isDraggingWindow,
    isPhoneView,
    setCvActive,
    tabCompletion,
    terminalStrings,
    toggleCatParty,
    uiStrings,
    windowOffset,
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }

  return context
}
