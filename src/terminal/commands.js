import { CV_FILE_NAME, helpText } from './constants'
import { findNode, formatFileName, resolvePath } from './filesystem'
import { formatPath } from './formatters'

export const runCommand = ({
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
}) => {
  const commandLine = rawInput.trim()
  if (!commandLine) {
    return
  }

  const [command, ...args] = commandLine.split(/\s+/)
  const baseEntry = { type: 'command', command: commandLine, cwd }

  if (command === 'clear') {
    setIsCardFlipped(false)
    setHistory([])
    return
  }

  if (command === 'help') {
    appendEntries([baseEntry, { type: 'help', text: helpText }])
    return
  }

  if (command === 'pwd') {
    appendEntries([baseEntry, { type: 'output', text: formatPath(cwd) }])
    return
  }

  if (command === 'welcome') {
    appendEntries([baseEntry, { type: 'output', text: welcomeText }])
    return
  }

  if (command === 'ls') {
    const target = args[0] ? resolvePath(cwd, args[0]) : cwd
    const node = findNode(terminalTree, target)

    if (!node) {
      appendEntries([
        baseEntry,
        { type: 'error', text: `ls: cannot access '${args[0]}': No such file or directory` },
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

    appendEntries([baseEntry, { type: 'output', text: listing || '(empty)' }])
    return
  }

  if (command === 'cd') {
    const targetPath = resolvePath(cwd, args[0] ?? '/')
    const node = findNode(terminalTree, targetPath)

    if (!node) {
      appendEntries([
        baseEntry,
        { type: 'error', text: `cd: no such file or directory: ${args[0]}` },
      ])
      return
    }

    if (node.type !== 'dir') {
      appendEntries([baseEntry, { type: 'error', text: `cd: not a directory: ${args[0]}` }])
      return
    }

    setCwd(targetPath)
    appendEntries([baseEntry])
    return
  }

  if (command === 'cat') {
    if (!args[0]) {
      appendEntries([baseEntry, { type: 'error', text: 'cat: missing file operand' }])
      return
    }

    const targetPath = resolvePath(cwd, args[0].replace(/\.txt$/, ''))
    const node = findNode(terminalTree, targetPath)

    if (!node) {
      appendEntries([baseEntry, { type: 'error', text: `cat: ${args[0]}: No such file or directory` }])
      return
    }

    if (node.type !== 'file') {
      appendEntries([baseEntry, { type: 'error', text: `cat: ${args[0]}: Is a directory` }])
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
      appendEntries([baseEntry, { type: 'error', text: 'open: missing file operand' }])
      return
    }

    const targetPath = resolvePath(cwd, args[0])
    const node = findNode(terminalTree, targetPath)

    if (!node || node.type !== 'file') {
      appendEntries([baseEntry, { type: 'error', text: `open: cannot open '${args[0]}'` }])
      return
    }

    const targetName = targetPath[targetPath.length - 1]
    if (targetName !== CV_FILE_NAME) {
      appendEntries([
        baseEntry,
        { type: 'error', text: `open: '${targetName}' does not support browser preview` },
      ])
      return
    }

    setIsCvDialogOpen(true)
    appendEntries([baseEntry, { type: 'output', text: `Opening ${CV_FILE_NAME}...` }])
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
              ? `bash: ${scriptName}: No such file or directory`
              : `${command}: command not found`,
        },
      ])
      return
    }

    appendEntries([baseEntry])
    setIsCardFlipped(true)
    inputRef.current?.blur()
    return
  }

  appendEntries([baseEntry, { type: 'error', text: `${command}: command not found` }])
}
