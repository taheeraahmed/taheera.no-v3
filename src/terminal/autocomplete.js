import { commandNames, pathCommands } from './constants'
import { compareDirectoryEntries, findNode, resolvePath } from './filesystem'

const splitParentAndPartial = (rawPath) => {
  if (!rawPath) {
    return { parentRaw: '', partial: '' }
  }

  const separatorIndex = rawPath.lastIndexOf('/')
  if (separatorIndex < 0) {
    return { parentRaw: '', partial: rawPath }
  }

  return {
    parentRaw: rawPath.slice(0, separatorIndex + 1),
    partial: rawPath.slice(separatorIndex + 1),
  }
}

export const getPathSuggestions = (terminalTree, cwd, rawPath, options = {}) => {
  const { directoriesOnly = false } = options
  const { parentRaw, partial } = splitParentAndPartial(rawPath)
  const parentSegments = resolvePath(cwd, parentRaw || '.')
  const parentNode = findNode(terminalTree, parentSegments)

  if (!parentNode || parentNode.type !== 'dir') {
    return []
  }

  const candidates = Object.entries(parentNode.children)
    .filter(([name, node]) => {
      if (!name.startsWith(partial)) {
        return false
      }

      if (directoriesOnly) {
        return node.type === 'dir'
      }

      return true
    })
    .sort(compareDirectoryEntries)

  return candidates.map(([name, node]) => {
    const suffix = node.type === 'dir' ? '/' : name.includes('.') ? '' : '.txt'
    return `${parentRaw}${name}${suffix}`
  })
}

export const completeCommand = (partial) => {
  const suggestions = commandNames.filter((cmd) => cmd.startsWith(partial))

  if (suggestions.length === 1) {
    return suggestions[0] + ' '
  }

  if (suggestions.length > 1) {
    const commonPrefix = suggestions.reduce((acc, cmd) => {
      let i = 0
      while (i < acc.length && i < cmd.length && acc[i] === cmd[i]) {
        i++
      }
      return acc.slice(0, i)
    })
    if (commonPrefix.length > partial.length) {
      return commonPrefix
    }
  }

  return null
}

export const completePathArgument = (line, command, terminalTree, cwd) => {
  const parts = line.trim().split(/\s+/)
  const rawPath = parts.slice(1).join(' ')
  const suggestions = getPathSuggestions(terminalTree, cwd, rawPath, {
    directoriesOnly: command === 'cd',
  })

  if (suggestions.length === 1) {
    return [command, suggestions[0]].join(' ')
  }

  if (suggestions.length > 1) {
    const commonPrefix = suggestions.reduce((acc, suggestion) => {
      let i = 0
      while (i < acc.length && i < suggestion.length && acc[i] === suggestion[i]) {
        i++
      }
      return acc.slice(0, i)
    })
    if (commonPrefix.length > rawPath.length) {
      return [command, commonPrefix].join(' ')
    }
  }

  return null
}

export const getTabCompletionUpdate = ({ line, cwd, terminalTree, tabCompletion }) => {
  if (!line.trim()) {
    return { handled: false }
  }

  if (!line.includes(' ')) {
    return {
      handled: true,
      nextInput: completeCommand(line.trim()),
      nextTabCompletion: null,
    }
  }

  const [command] = line.trim().split(/\s+/)
  if (!pathCommands.includes(command)) {
    return {
      handled: true,
      nextTabCompletion: null,
    }
  }

  if (tabCompletion && tabCompletion.command === command && tabCompletion.suggestions.length > 1) {
    const nextIndex = (tabCompletion.index + 1) % tabCompletion.suggestions.length
    const nextSuggestion = tabCompletion.suggestions[nextIndex]

    return {
      handled: true,
      nextInput: [command, nextSuggestion].join(' '),
      nextTabCompletion: { ...tabCompletion, index: nextIndex },
    }
  }

  const completed = completePathArgument(line, command, terminalTree, cwd)
  if (completed) {
    return {
      handled: true,
      nextInput: completed,
      nextTabCompletion: null,
    }
  }

  const rawPath = line.trim().split(/\s+/).slice(1).join(' ')
  const suggestions = getPathSuggestions(terminalTree, cwd, rawPath, {
    directoriesOnly: command === 'cd',
  })

  if (suggestions.length > 1) {
    return {
      handled: true,
      nextInput: [command, suggestions[0]].join(' '),
      nextTabCompletion: { command, suggestions, index: 0 },
    }
  }

  return {
    handled: true,
    nextTabCompletion: null,
  }
}

export const getSubmitUpdate = ({ line, cwd, terminalTree }) => {
  const commandLine = line.trim()
  if (!commandLine) {
    return { shouldExecute: true }
  }

  const [command, ...args] = commandLine.split(/\s+/)
  const rawPath = args.join(' ')
  if ((command !== 'cat' && command !== 'open') || !rawPath) {
    return { shouldExecute: true }
  }

  const node = findNode(terminalTree, resolvePath(cwd, rawPath))
  if (node?.type !== 'dir') {
    return { shouldExecute: true }
  }

  const normalizedDirectoryPath = rawPath.endsWith('/') ? rawPath : `${rawPath}/`
  return {
    shouldExecute: false,
    nextInput: `${command} ${normalizedDirectoryPath}`,
  }
}
