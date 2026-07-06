export const formatPath = (segments) => (segments.length ? `/${segments.join('/')}` : '/')

export const formatPrompt = (segments) => `you@taheera.no:${formatPath(segments)}$`

export const splitCommandParts = (commandLine) => {
  const trimmed = commandLine.trim()
  if (!trimmed) {
    return { commandName: '', commandArgs: '' }
  }

  const [commandName, ...rest] = trimmed.split(/\s+/)
  return { commandName, commandArgs: rest.join(' ') }
}

export const splitHelpLineParts = (line) => {
  const match = line.match(/^(\s{2}.*?\S)\s{2,}(.*)$/)

  if (!match) {
    return null
  }

  return {
    commandPart: match[1],
    descriptionPart: match[2],
  }
}

export const formatLastLogin = (date = new Date()) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, ' ')

  return `Last login: ${weekDays[date.getDay()]} ${months[date.getMonth()]} ${day} ${hours}:${minutes}:${seconds} on ttys001`
}

export const getWelcomeText = (content) => content.welcomeLines.join('\n').replace(/^\n+|\n+$/g, '')

export const createInitialHistory = (content, terminalStrings) => [
  {
    type: 'output',
    text: formatLastLogin(),
  },
  {
    type: 'command',
    command: 'welcome',
    cwd: [],
  },
  {
    type: 'output',
    text: getWelcomeText(content),
  },
  {
    type: 'hint',
    commands: terminalStrings.hintCommands,
  },
]
