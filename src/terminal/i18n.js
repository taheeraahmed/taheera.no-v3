import { CV_FILE_NAME } from './constants'

export const DEFAULT_LANGUAGE = 'en'
export const SUPPORTED_LANGUAGES = ['en', 'no']

const localizedContent = {
  en: {
    rootFiles: {
      'CV_taheera_en.pdf': 'Open with: open CV_taheera_en.pdf',
      'card.sh': 'Run: ./card.sh or bash card.sh',
    },
    contactCard: {
      name: 'Taheera Ahmed',
      title: 'Data Scientist',
      organization: 'NINA (Norwegian Institute for Nature Research)',
      website: 'nina.no',
      linkedin: 'https://www.linkedin.com/in/taheera-ahmed-997750158/',
      github: 'github.com/taheeraahmed/',
      tiktok: 'https://www.tiktok.com/@tira.py',
      location: 'Oslo, Norway',
      email: 'taheera.ahmed@gmail.com',
      imageAlt: 'Portrait placeholder for Taheera',
    },
    aboutMe: {
      running: {
        text: "I hated running in 2024, but I was group-pressured into signing up for a half marathon (it was in Italy, so I thought why not?). I finished it, but used SO much time, it was humbling. This is what has fueled my running motivation :) I've ran three half-marathons since, and I'm still running. Hopefully I will manage to run a half-marathon in under two hours? We will see.",
        image: '/running.jpg',
        imageAlt: 'Taheera finishing her first half-marathon outdoors',
      },
      knitting: {
        text: 'I started knitting during the pandemic, there was so little to do... Now I love knitting, and I have knitted many sweaters, hehe sweaters are my favorite thing to knit!!',
        image: '/buckethat.jpg',
        imageAlt: 'Taheera knitting a bucket hat',
      },
      weightlifting: {
        text: 'Strength training has been part of my routine since high school, I still remember how scary it was entering the gym the first few times. My PR in squats is 115kg (and I weighed 60kg at the time!!)',
        image: '/trene.jpg',
        imageAlt: 'Taheera at the gym',
      },
      reading: {
        text: 'Okei I have to admit, yes, I do like reading, but if I do it often?? Or regularly?? I tend to read more in the summer though. I also like to listen to NRK Leseklubben podcast WHILE I read!! this gives me a lot of motivation for finishing my book :D',
        image: '/lese.jpg',
        imageAlt: 'Taheera reading',
      },
    },
    welcomeLines: [
      `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⡦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠟⠉⠉⠉⢿⣇⠀Hellooo there,
⢀⣴⡾⠛⠛⠭⢟⣕⣄⣾⡏⠀⠀⠀⠀⠀⣿⠀⠀My name is Taheera (tahira), and I work as a data scientist
⡎⣿⠀⠀⠀⠀⠀⠈⢏⣿⡇⠀⠀⠀⠀⢀⡟⠀at NINA (Norwegian Institute for Nature Research, nina.no).
⠹⡿⡄⠀⠀⠀⠀⠀⠀⣿⣇⠀⠀⠀⣠⣟⡡⠤⢄⣀⠀⠀
⠀⠈⠻⣦⣄⠀⠀⠀⣠⡿⣿⣿⣢⡾⠋⠉⠉⠉⠓⠒⢵⣆⠀I built this page to mimic a terminal, but thought well, 
⠀⠀⣀⣬⠻⠷⢶⣤⡯⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠹⣧  I am in a browser after all, 
⢀⣾⠛⠁⠀⠀⠀⢘⣇⣀⣀⣠⣾⠏⠀⠀⠀⠀⠀⠀⠀⢀⡟  so I can add a few extra features :D
⣯⠃⠀⠀⠀⠀⠀⠀⢛⣿⠛⠉⠙⢿⣦⣀⣀⣀⣀⣀⣶⠞⠁  
⣿⡀⠀⠀⠀⠀⠀⠀⣿⡏⠀⠀⠀⠈⢯⢫⡉⠉⠉⠉⠁⠀ I had fun making this hihi
⠙⡷⣄⡀⠀⢀⡤⡺⣿⠀⠀⠀⠀⠀⠈⣇⡇  Hopefully someone sees it <3
⠀⠈⠛⠛⠛⠛⠋⠀⠘⣆⠀⠀⠀⠀⠀⣿⠇⠀ Repo: [github.com/taheeraahmed/taheera.no-vol-3](https://github.com/taheeraahmed/taheera.no-vol-3)⠀⠀⠀                                        
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣤⣀⣤⣖⠏⠀⠀
`,
    ],
  },
  no: {
    rootFiles: {
      'CV_taheera_en.pdf': 'Åpne med: open CV_taheera_en.pdf',
      'card.sh': 'Kjør: ./card.sh eller bash card.sh',
    },
    contactCard: {
      name: 'Taheera Ahmed',
      title: 'Data Scientist',
      organization: 'NINA (Norsk institutt for naturforskning)',
      website: 'nina.no',
      linkedin: 'https://www.linkedin.com/in/taheera-ahmed-997750158/',
      github: 'github.com/taheeraahmed/',
      tiktok: 'https://www.tiktok.com/@tira.py',
      location: 'Oslo, Norge',
      email: 'taheera.ahmed@gmail.com',
      imageAlt: 'Portrett av Taheera',
    },
    aboutMe: {
      running: {
        text: 'Jeg hatet løping i 2024, men ble gruppepresset til å melde meg på et halvmaraton (det var i Italia, så jeg tenkte hvorfor ikke?). Jeg fullførte, men brukte VELDIG lang tid.... Det er egentlig dette som har vært hovedgrunnen til at jeg har fortsatt: vil bare ha bedre kondis :,) Siden Italia har jeg løpt tre halvmaraton. Jeg håper jeg klarer å løpe på under 2 timer en dag :)',
        image: '/running.jpg',
        imageAlt: 'Taheera i mål på sitt første halvmaraton',
      },
      knitting: {
        text: 'Jeg begynte å strikke under pandemien, det var så lite å finne på... Nå elsker jeg strikking, og har strikket mange gensere. Hehe, gensere er favoritten min å strikke!!',
        image: '/buckethat.jpg',
        imageAlt: 'Taheera strikker en bucket hat',
      },
      weightlifting: {
        text: 'Jeg har holdt på med styrketrening siden videregående. Jeg husker fortsatt hvor skummelt det var å gå inn på treningssenteret de første gangene. PR i knebøy er 115kg (og jeg veide 60kg da!!).',
        image: '/trene.jpg',
        imageAlt: 'Taheera på treningssenteret',
      },
      reading: {
        text: 'Okei, så jeg liker å lese, ja, men om jeg gjør det ofte?? eller regelmessig?? Jeg leser nok mest om sommeren. Jeg liker også å høre på NRK Leseklubben-podkasten MENS jeg leser!! Det gjør at jeg faktisk fullfører bøkene jeg starter på hehe :D',
        image: '/lese.jpg',
        imageAlt: 'Taheera leser',
      },
    },
    welcomeLines: [
      `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⡦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠟⠉⠉⠉⢿⣇⠀Heii du,
⢀⣴⡾⠛⠛⠭⢟⣕⣄⣾⡏⠀⠀⠀⠀⠀⣿⠀⠀Jeg heter Taheera (tahira) og jobber som "data scientist"
⡎⣿⠀⠀⠀⠀⠀⠈⢏⣿⡇⠀⠀⠀⠀⢀⡟⠀i NINA (Norsk institutt for naturforskning, nina.no).
⠹⡿⡄⠀⠀⠀⠀⠀⠀⣿⣇⠀⠀⠀⣠⣟⡡⠤⢄⣀⠀⠀
⠀⠈⠻⣦⣄⠀⠀⠀⣠⡿⣿⣿⣢⡾⠋⠉⠉⠉⠓⠒⢵⣆⠀Jeg laget denne siden for å etterligne en terminal,
⠀⠀⣀⣬⠻⠷⢶⣤⡯⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠹⣧  men tenkte siden det er i en nettleseren,
⢀⣾⠛⠁⠀⠀⠀⢘⣇⣀⣀⣠⣾⠏⠀⠀⠀⠀⠀⠀⠀⢀⡟  kan jeg jo legge til noen ekstra features :D
⣯⠃⠀⠀⠀⠀⠀⠀⢛⣿⠛⠉⠙⢿⣦⣀⣀⣀⣀⣀⣶⠞⠁  
⣿⡀⠀⠀⠀⠀⠀⠀⣿⡏⠀⠀⠀⠈⢯⢫⡉⠉⠉⠉⠁⠀ Jeg koste meg med å lage dette hihi
⠙⡷⣄⡀⠀⢀⡤⡺⣿⠀⠀⠀⠀⠀⠈⣇⡇  håper noen ser den <3
⠀⠈⠛⠛⠛⠛⠋⠀⠘⣆⠀⠀⠀⠀⠀⣿⠇⠀ Repo: [github.com/taheeraahmed/taheera.no-vol-3](https://github.com/taheeraahmed/taheera.no-vol-3)
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣤⣀⣤⣖⠏⠀⠀
`,
    ],
  },
}

export const getLocalizedContent = (language = DEFAULT_LANGUAGE) =>
  localizedContent[language] ?? localizedContent[DEFAULT_LANGUAGE]


const languageLabels = {
  en: 'English',
  no: 'Norsk',
}

const normalizeMap = {
  en: 'en',
  english: 'en',
  no: 'no',
  nb: 'no',
  nn: 'no',
  norsk: 'no',
  norwegian: 'no',
}

const uiMessages = {
  en: {
    contactCardAriaLabel: 'Contact card',
    cvPreviewAriaLabel: 'CV preview',
    activateCvWindowAriaLabel: 'Activate CV window',
    cvFrameTitle: 'Taheera CV',
    closeButtonAriaLabel: 'Close',
    escapePrefix: 'Press',
    closeTerminalSuffix: 'to return to the terminal.',
    closeDialogSuffix: 'to close',
    contactCardLabels: {
      role: 'Role',
      organization: 'Organization',
      website: 'Website',
      location: 'Location',
      email: 'Email',
    },
    socialTitles: {
      linkedin: 'LinkedIn profile',
      github: 'GitHub profile',
      email: 'Send an email',
      tiktok: 'TikTok profile',
    },
  },
  no: {
    contactCardAriaLabel: 'Kontaktkort',
    cvPreviewAriaLabel: 'CV-forhåndsvisning',
    activateCvWindowAriaLabel: 'Aktivér CV-vindu',
    cvFrameTitle: 'Taheera CV',
    closeButtonAriaLabel: 'Lukk',
    escapePrefix: 'Trykk',
    closeTerminalSuffix: 'for å gå tilbake til terminalen.',
    closeDialogSuffix: 'for å lukke',
    contactCardLabels: {
      role: 'Rolle',
      organization: 'Organisasjon',
      website: 'Nettside',
      location: 'Sted',
      email: 'E-post',
    },
    socialTitles: {
      linkedin: 'LinkedIn-profil',
      github: 'GitHub-profil',
      email: 'Send e-post',
      tiktok: 'TikTok-profil',
    },
  },
}

const terminalMessages = {
  en: {
    windowTitle: 'simple-but-enhanced-cool-shell',
    inputPlaceholder: 'Type a command...',
    shellInputAria: 'Shell command input',
    terminalAria: 'Interactive shell portfolio',
    contactCardAria: 'Contact card',
    emptyDirectory: '(empty)',
    openingCv: `Opening ${CV_FILE_NAME}...`,
    commandNotFound: (command) => `${command}: command not found`,
    lsCannotAccess: (target) => `ls: cannot access '${target}': No such file or directory`,
    cdNoSuchDirectory: (target) => `cd: no such file or directory: ${target}`,
    cdNotDirectory: (target) => `cd: not a directory: ${target}`,
    catMissingOperand: 'cat: missing file operand',
    catNoSuchFile: (target) => `cat: ${target}: No such file or directory`,
    catIsDirectory: (target) => `cat: ${target}: Is a directory`,
    openMissingOperand: 'open: missing file operand',
    openCannotOpen: (target) => `open: cannot open '${target}'`,
    openNoPreview: (target) => `open: '${target}' does not support browser preview`,
    bashNoSuchFile: (target) => `bash: ${target}: No such file or directory`,
    langUsage: 'Usage: lang <en|no> or lang list',
    langCurrent: (lang) =>
      `Current language: ${languageLabels[lang] ?? lang} (${lang})\nAvailable languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
    langChanged: (lang) => `Language switched to ${languageLabels[lang] ?? lang} (${lang}).`,
    langAlreadySet: (lang) => `Language is already ${languageLabels[lang] ?? lang} (${lang}).`,
    langUnsupported: (value) =>
      `Unsupported language '${value}'. Available languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
    hintCommands: ['help', 'ls', 'bash card.sh', `open ${CV_FILE_NAME}`, 'lang no'],
    helpText: [
      'Commands:',
      '  help              Show available commands',
      '  welcome           Quick intro about me',
      '  ls [path]         List files and folders',
      '  cd <path>         Change directory',
      '  pwd               Print current path',
      '  cat <file>        Read a file',
      '  open <file>       Open a .pdf file',
      '  bash <file>       Run a shell script',
      '  lang <code>       Switch language (en/no)',
      '  clear             Clear terminal output',
    ].join('\n'),
  },
  no: {
    windowTitle: 'simple-but-enhanced-cool-shell',
    inputPlaceholder: 'Skriv en kommando...',
    shellInputAria: 'Shell kommando input',
    terminalAria: 'Interaktivt shell-portfolio',
    contactCardAria: 'Kontaktkort',
    emptyDirectory: '(tom)',
    openingCv: `Åpner ${CV_FILE_NAME}...`,
    commandNotFound: (command) => `${command}: kommando ikke funnet`,
    lsCannotAccess: (target) => `ls: kan ikke åpne '${target}': filen eller mappen finnes ikke`,
    cdNoSuchDirectory: (target) => `cd: mappen finnes ikke: ${target}`,
    cdNotDirectory: (target) => `cd: ikke en mappe: ${target}`,
    catMissingOperand: 'cat: manglende fil-argument',
    catNoSuchFile: (target) => `cat: ${target}: filen finnes ikke`,
    catIsDirectory: (target) => `cat: ${target}: er en mappe`,
    openMissingOperand: 'open: manglende fil-argument',
    openCannotOpen: (target) => `open: kan ikke åpne '${target}'`,
    openNoPreview: (target) => `open: '${target}' støtter ikke nettleserforhåndsvisning`,
    bashNoSuchFile: (target) => `bash: ${target}: filen finnes ikke`,
    langUsage: 'Bruk: lang <en|no> eller lang list',
    langCurrent: (lang) =>
      `Gjeldende språk: ${languageLabels[lang] ?? lang} (${lang})\nTilgjengelige språk: ${SUPPORTED_LANGUAGES.join(', ')}`,
    langChanged: (lang) => `Språk byttet til ${languageLabels[lang] ?? lang} (${lang}).`,
    langAlreadySet: (lang) => `Språk er allerede ${languageLabels[lang] ?? lang} (${lang}).`,
    langUnsupported: (value) =>
      `Støtter ikke språk '${value}'. Tilgjengelige språk: ${SUPPORTED_LANGUAGES.join(', ')}`,
    hintCommands: ['help', 'ls', 'bash card.sh', `open ${CV_FILE_NAME}`, 'lang en'],
    helpText: [
      'Kommandoer:',
      '  help              Vis tilgjengelige kommandoer',
      '  welcome           Kort intro om meg',
      '  ls [path]         List filer og mapper',
      '  cd <path>         Bytt mappe',
      '  pwd               Vis gjeldende sti',
      '  cat <file>        Les en fil',
      '  open <file>       Åpne en .pdf fil',
      '  bash <file>       Kjør et shell-script',
      '  lang <code>       Bytt språk (en/no)',
      '  clear             Tøm terminalutskriften',
    ].join('\n'),
  },
}

export const normalizeLanguage = (value) => normalizeMap[value?.toLowerCase()] ?? null

export const getTerminalStrings = (language) => {
  if (terminalMessages[language]) {
    return terminalMessages[language]
  }

  return terminalMessages[DEFAULT_LANGUAGE]
}

export const getUiStrings = (language) => {
  if (uiMessages[language]) {
    return uiMessages[language]
  }

  return uiMessages[DEFAULT_LANGUAGE]
}
