export const DEFAULT_LANGUAGE = 'en'
export const SUPPORTED_LANGUAGES = ['en', 'no']

export const languageLabels = {
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

export const normalizeLanguage = (value) => normalizeMap[value?.toLowerCase()] ?? null
