import { commandNames, pathCommands } from './constants'
import { findNode, resolvePath } from './filesystem'

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
    .sort(([a], [b]) => a.localeCompare(b))

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
