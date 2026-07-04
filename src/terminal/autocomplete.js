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
