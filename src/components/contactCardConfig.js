import { Email, GitHub, LinkedIn } from '@mui/icons-material'
import { FaTiktok } from 'react-icons/fa'

export const fieldRows = [
  { labelKey: 'role', key: 'title' },
  { labelKey: 'organization', key: 'organization' },
  { labelKey: 'website', key: 'website', link: true },
  { labelKey: 'location', key: 'location' },
  { labelKey: 'email', key: 'email' },
]

export const socialLinks = [
  {
    label: 'LinkedIn',
    key: 'linkedin',
    icon: LinkedIn,
    titleKey: 'linkedin',
  },
  {
    label: 'GitHub',
    key: 'github',
    icon: GitHub,
    titleKey: 'github',
  },
  {
    label: 'Email',
    key: 'email',
    icon: Email,
    titleKey: 'email',
    isMailto: true,
  },
  {
    label: 'TikTok',
    key: 'tiktok',
    icon: FaTiktok,
    titleKey: 'tiktok',
  },
]

export const defaultCardLabels = {
  role: 'Role',
  organization: 'Organization',
  website: 'Website',
  location: 'Location',
  email: 'Email',
}

export const defaultSocialTitles = {
  linkedin: 'LinkedIn profile',
  github: 'GitHub profile',
  email: 'Send an email',
  tiktok: 'TikTok profile',
}
