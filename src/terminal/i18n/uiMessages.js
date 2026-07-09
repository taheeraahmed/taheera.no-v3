import { DEFAULT_LANGUAGE } from './language'

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

export const getUiStrings = (language) => uiMessages[language] ?? uiMessages[DEFAULT_LANGUAGE]
