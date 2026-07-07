import { CV_FILE_NAME } from './constants'
import { findNode, formatFileName, resolvePath } from './filesystem'
import { formatPath } from './formatters'
import { DEFAULT_LANGUAGE, getTerminalStrings, normalizeLanguage } from './i18n'

export const runCommand = ({
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
}) => {
  const commandLine = rawInput.trim()
  if (!commandLine) {
    return
  }

  const [command, ...args] = commandLine.split(/\s+/)
  const baseEntry = { type: 'command', command: commandLine, cwd }

  if (command === 'clear') {
    hideCard()
    setHistory([])
    return
  }

  if (command === 'help') {
    appendEntries([baseEntry, { type: 'help', text: terminalStrings.helpText }])
    return
  }

  if (command === 'pwd') {
    appendEntries([baseEntry, { type: 'output', text: formatPath(cwd) }])
    return
  }

  if (command === 'welcome') {
    appendEntries([baseEntry, { type: 'output', text: welcomeText }, { type: 'hint', commands: terminalStrings.hintCommands }])
    return
  }

  if (command === 'ls') {
    const target = args[0] ? resolvePath(cwd, args[0]) : cwd
    const node = findNode(terminalTree, target)

    if (!node) {
      appendEntries([
        baseEntry,
        { type: 'error', text: terminalStrings.lsCannotAccess(args[0]) },
      ])
      return
    }

    if (node.type === 'file') {
      appendEntries([baseEntry, { type: 'output', text: formatFileName(args[0]) }])
      return
    }

    const listing = Object.entries(node.children)
      .map(([name, child]) => (child.type === 'dir' ? `${name}/` : formatFileName(name)))
      .join('    ')

    appendEntries([baseEntry, { type: 'output', text: listing || terminalStrings.emptyDirectory }])
    return
  }

  if (command === 'cd') {
    const targetPath = resolvePath(cwd, args[0] ?? '/')
    const node = findNode(terminalTree, targetPath)

    if (!node) {
      appendEntries([
        baseEntry,
        { type: 'error', text: terminalStrings.cdNoSuchDirectory(args[0]) },
      ])
      return
    }

    if (node.type !== 'dir') {
      appendEntries([baseEntry, { type: 'error', text: terminalStrings.cdNotDirectory(args[0]) }])
      return
    }

    setCwd(targetPath)
    appendEntries([baseEntry])
    return
  }

  if (command === 'cat') {
    if (!args[0]) {
      appendEntries([baseEntry, { type: 'error', text: terminalStrings.catMissingOperand }])
      return
    }

    const targetPath = resolvePath(cwd, args[0].replace(/\.txt$/, ''))
    const node = findNode(terminalTree, targetPath)

    if (!node) {
      appendEntries([baseEntry, { type: 'error', text: terminalStrings.catNoSuchFile(args[0]) }])
      return
    }

    if (node.type !== 'file') {
      appendEntries([baseEntry, { type: 'error', text: terminalStrings.catIsDirectory(args[0]) }])
      return
    }

    appendEntries([
      baseEntry,
      {
        type: 'output',
        text: node.content,
        image: node.image,
        imageAlt: node.imageAlt,
      },
    ])
    return
  }

  if (command === 'open') {
    if (!args[0]) {
      appendEntries([baseEntry, { type: 'error', text: terminalStrings.openMissingOperand }])
      return
    }

    const targetPath = resolvePath(cwd, args[0])
    const node = findNode(terminalTree, targetPath)

    if (!node || node.type !== 'file') {
      appendEntries([baseEntry, { type: 'error', text: terminalStrings.openCannotOpen(args[0]) }])
      return
    }

    const targetName = targetPath[targetPath.length - 1]
    if (targetName !== CV_FILE_NAME) {
      appendEntries([
        baseEntry,
        { type: 'error', text: terminalStrings.openNoPreview(targetName) },
      ])
      return
    }

    openCvDialog()
    appendEntries([baseEntry, { type: 'output', text: terminalStrings.openingCv }])
    return
  }

  if (command === 'lang' || command === 'language') {
    const value = args[0]
    const defaultTerminalStrings = getTerminalStrings(DEFAULT_LANGUAGE)
    const languageTerminalStrings = { ...defaultTerminalStrings, ...terminalStrings }

    if (!value || value.toLowerCase() === 'list') {
      appendEntries([baseEntry, { type: 'output', text: languageTerminalStrings.langCurrent(language) }])
      return
    }

    const normalized = normalizeLanguage(value)
    if (!normalized) {
      appendEntries([
        baseEntry,
        {
          type: 'error',
          text: `${languageTerminalStrings.langUnsupported(value)}\n${languageTerminalStrings.langUsage}`,
        },
      ])
      return
    }

    if (normalized === language) {
      appendEntries([baseEntry, { type: 'output', text: languageTerminalStrings.langAlreadySet(language) }])
      return
    }

    setLanguage(normalized)
    const nextLanguageTerminalStrings = {
      ...defaultTerminalStrings,
      ...getTerminalStrings(normalized),
    }
    appendEntries([baseEntry, { type: 'output', text: nextLanguageTerminalStrings.langChanged(normalized) }])
    return
  }

  if (command === './card.sh' || command === 'bash') {
    const scriptName = command === 'bash' ? args[0] : './card.sh'
    const normalizedScriptName = scriptName?.replace(/^[.][/]/, '')

    if (normalizedScriptName !== 'card.sh') {
      appendEntries([
        baseEntry,
        {
          type: 'error',
          text:
            command === 'bash'
              ? terminalStrings.bashNoSuchFile(scriptName)
              : terminalStrings.commandNotFound(command),
        },
      ])
      return
    }

    appendEntries([baseEntry])
    showCard()
    inputRef.current?.blur()
    return
  }

  appendEntries([baseEntry, { type: 'error', text: terminalStrings.commandNotFound(command) }])
}
