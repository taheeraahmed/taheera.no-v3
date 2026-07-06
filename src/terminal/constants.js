export const CV_FILE_NAME = 'CV_taheera_en.pdf'

export const commandNames = [
  'help',
  'welcome',
  'ls',
  'cd',
  'pwd',
  'cat',
  'open',
  'clear',
  'bash',
  './card.sh',
]

export const pathCommands = ['cd', 'ls', 'cat', 'open', 'bash']

export const hintCommands = ['help', 'ls', 'bash card.sh', `open ${CV_FILE_NAME}`]

export const helpText = [
  'Commands:',
  '  help              Show available commands',
  '  welcome           Quick intro about me',
  '  ls [path]         List files and folders',
  '  cd <path>         Change directory',
  '  pwd               Print current path',
  '  cat <file>        Read project or hobby note',
  '  open <file>       Open a file in a browser window',
  '  bash <file>       Run a shell script',
  '  clear             Clear terminal output',
].join('\n')
