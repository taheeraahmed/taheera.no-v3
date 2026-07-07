import { CV_FILE_NAME } from './constants'
import { compareDirectoryEntries, findNode, formatFileName, resolvePath } from './filesystem'
import { formatPath, formatTerminalListColumns, formatTerminalListColumnsWithMeta } from './formatters'
import { DEFAULT_LANGUAGE, getTerminalStrings, normalizeLanguage } from './i18n'

const appendErrorEntry = (appendEntries, baseEntry, text) => {
  appendEntries([baseEntry, { type: 'error', text }])
}

const appendOutputEntry = (appendEntries, baseEntry, text) => {
  appendEntries([baseEntry, { type: 'output', text }])
}

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

  const runLanguageCommand = () => {
    const value = args[0]
    const defaultTerminalStrings = getTerminalStrings(DEFAULT_LANGUAGE)
    const languageTerminalStrings = { ...defaultTerminalStrings, ...terminalStrings }

    if (!value || value.toLowerCase() === 'list') {
      appendOutputEntry(appendEntries, baseEntry, languageTerminalStrings.langCurrent(language))
      return
    }

    const normalized = normalizeLanguage(value)
    if (!normalized) {
      appendErrorEntry(
        appendEntries,
        baseEntry,
        `${languageTerminalStrings.langUnsupported(value)}\n${languageTerminalStrings.langUsage}`,
      )
      return
    }

    if (normalized === language) {
      appendOutputEntry(appendEntries, baseEntry, languageTerminalStrings.langAlreadySet(language))
      return
    }

    setLanguage(normalized)
    const nextLanguageTerminalStrings = {
      ...defaultTerminalStrings,
      ...getTerminalStrings(normalized),
    }

    appendOutputEntry(appendEntries, baseEntry, nextLanguageTerminalStrings.langChanged(normalized))
  }

  const runCardScriptCommand = (scriptName, commandForError) => {
    const normalizedScriptName = scriptName?.replace(/^[.][/]/, '')

    if (normalizedScriptName !== 'card.sh') {
      const message =
        commandForError === 'bash'
          ? terminalStrings.bashNoSuchFile(scriptName)
          : terminalStrings.commandNotFound(commandForError)

      appendErrorEntry(appendEntries, baseEntry, message)
      return
    }

    appendEntries([baseEntry])
    showCard()
    inputRef.current?.blur()
  }

  const commandHandlers = {
    clear: () => {
      hideCard()
      setHistory([])
    },
    help: () => {
      appendEntries([baseEntry, { type: 'help', text: terminalStrings.helpText }])
    },
    pwd: () => {
      appendOutputEntry(appendEntries, baseEntry, formatPath(cwd))
    },
    welcome: () => {
      appendEntries([baseEntry, { type: 'output', text: welcomeText }, { type: 'hint', commands: terminalStrings.hintCommands }])
    },
    ls: () => {
      const target = args[0] ? resolvePath(cwd, args[0]) : cwd
      const node = findNode(terminalTree, target)

      if (!node) {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.lsCannotAccess(args[0]))
        return
      }

      if (node.type === 'file') {
        appendOutputEntry(appendEntries, baseEntry, formatFileName(args[0]))
        return
      }

      const listing = Object.entries(node.children)
        .sort(compareDirectoryEntries)
        .map(([name, child]) => ({
          label: child.type === 'dir' ? `${name}/` : formatFileName(name),
          isDirectory: child.type === 'dir',
        }))

      const formattedListing = formatTerminalListColumns(listing.map((item) => item.label))
      const listingColumns = formatTerminalListColumnsWithMeta(listing)

      appendEntries([
        baseEntry,
        {
          type: 'output',
          text: formattedListing || terminalStrings.emptyDirectory,
          columns: listingColumns,
        },
      ])
    },
    cd: () => {
      const targetPath = resolvePath(cwd, args[0] ?? '/')
      const node = findNode(terminalTree, targetPath)

      if (!node) {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.cdNoSuchDirectory(args[0]))
        return
      }

      if (node.type !== 'dir') {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.cdNotDirectory(args[0]))
        return
      }

      setCwd(targetPath)
      appendEntries([baseEntry])
    },
    cat: () => {
      if (!args[0]) {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.catMissingOperand)
        return
      }

      const rawTarget = args[0]
      if (!rawTarget.endsWith('.txt')) {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.catNoSuchFile(rawTarget))
        return
      }

      const targetPath = resolvePath(cwd, rawTarget.slice(0, -4))
      const node = findNode(terminalTree, targetPath)

      if (!node) {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.catNoSuchFile(args[0]))
        return
      }

      if (node.type !== 'file') {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.catIsDirectory(args[0]))
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
    },
    open: () => {
      if (!args[0]) {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.openMissingOperand)
        return
      }

      const targetPath = resolvePath(cwd, args[0])
      const node = findNode(terminalTree, targetPath)

      if (!node || node.type !== 'file') {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.openCannotOpen(args[0]))
        return
      }

      const targetName = targetPath[targetPath.length - 1]
      if (targetName !== CV_FILE_NAME) {
        appendErrorEntry(appendEntries, baseEntry, terminalStrings.openNoPreview(targetName))
        return
      }

      openCvDialog()
      appendOutputEntry(appendEntries, baseEntry, terminalStrings.openingCv)
    },
    lang: runLanguageCommand,
    language: runLanguageCommand,
    './card.sh': () => {
      runCardScriptCommand('./card.sh', './card.sh')
    },
    bash: () => {
      runCardScriptCommand(args[0], 'bash')
    },
  }

  const handler = commandHandlers[command]
  if (!handler) {
    appendErrorEntry(appendEntries, baseEntry, terminalStrings.commandNotFound(command))
    return
  }

  handler()
}
