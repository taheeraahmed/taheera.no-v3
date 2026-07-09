import { DEFAULT_LANGUAGE } from './language'
import localizedContent from './localizedContent'

export const getLocalizedContent = (language = DEFAULT_LANGUAGE) =>
  localizedContent[language] ?? localizedContent[DEFAULT_LANGUAGE]
