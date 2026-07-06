export const DEFAULT_LANGUAGE = 'en'

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
    ui: {
      terminalAriaLabel: 'Interactive shell portfolio',
      terminalInputPlaceholder: 'Type a command...',
      shellCommandInputAriaLabel: 'Shell command input',
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
    ui: {
      terminalAriaLabel: 'Interaktiv terminal-portefolje',
      terminalInputPlaceholder: 'Skriv en kommando...',
      shellCommandInputAriaLabel: 'Kommandofelt i terminal',
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
  },
}

export const getLocalizedContent = (language = DEFAULT_LANGUAGE) =>
  localizedContent[language] ?? localizedContent[DEFAULT_LANGUAGE]

export const rootFiles = localizedContent[DEFAULT_LANGUAGE].rootFiles
export const contactCard = localizedContent[DEFAULT_LANGUAGE].contactCard
export const aboutMe = localizedContent[DEFAULT_LANGUAGE].aboutMe
export const welcomeLines = localizedContent[DEFAULT_LANGUAGE].welcomeLines
