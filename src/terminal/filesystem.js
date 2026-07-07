import { CV_FILE_NAME } from './constants'

const makeDirectory = (children) => ({ type: 'dir', children })
const makeFile = (value) => {
  if (typeof value === 'string') {
    return { type: 'file', content: value }
  }

  if (value && typeof value === 'object') {
    return {
      type: 'file',
      content: value.text ?? value.content ?? '',
      image: value.image,
      images: Array.isArray(value.images) ? value.images : undefined,
      imageAlt: value.imageAlt,
    }
  }

  return { type: 'file', content: String(value ?? '') }
}

export const getContentSnapshot = (moduleContent) => ({
  rootFiles: {
    [CV_FILE_NAME]: `Open with: open ${CV_FILE_NAME}`,
    ...(moduleContent.rootFiles ?? {}),
  },
  aboutMe: moduleContent.aboutMe,
  proudOf: moduleContent.proudOf,
  contactCard: moduleContent.contactCard,
  welcomeLines: moduleContent.welcomeLines,
})

const objectToFiles = (entries) =>
  Object.fromEntries(Object.entries(entries).map(([key, value]) => [key, makeFile(value)]))

export const compareDirectoryEntries = ([aName, aNode], [bName, bNode]) => {
  if (aNode.type !== bNode.type) {
    return aNode.type === 'dir' ? -1 : 1
  }

  return aName.localeCompare(bName)
}

export const buildTerminalTree = (content) =>
  makeDirectory({
    ...objectToFiles(content.rootFiles),
    'about-me': makeDirectory(objectToFiles(content.aboutMe)),
    'things-im-proud-of': makeDirectory(objectToFiles(content.proudOf)),
  })

const splitPath = (path) => path.split('/').filter(Boolean)

export const resolvePath = (cwd, rawTarget) => {
  if (!rawTarget || rawTarget === '~' || rawTarget === '/') {
    return []
  }

  const next = rawTarget.startsWith('/') ? [] : [...cwd]
  for (const segment of splitPath(rawTarget)) {
    if (segment === '.' || segment === '') {
      continue
    }

    if (segment === '..') {
      next.pop()
      continue
    }

    next.push(segment)
  }

  return next
}

export const findNode = (terminalTree, segments) => {
  let node = terminalTree

  for (const segment of segments) {
    if (node.type !== 'dir' || !node.children[segment]) {
      return null
    }

    node = node.children[segment]
  }

  return node
}

export const formatFileName = (name) => (name.includes('.') ? name : `${name}.txt`)
