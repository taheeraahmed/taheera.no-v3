import { Email, GitHub, LinkedIn } from '@mui/icons-material'
import { FaTiktok } from 'react-icons/fa'
import HintActionButton from './HintActionButton'
import './ContactCard.css'

const fieldRows = [
  { labelKey: 'role', key: 'title' },
  { labelKey: 'organization', key: 'organization' },
  { labelKey: 'website', key: 'website', link: true },
  { labelKey: 'location', key: 'location' },
  { labelKey: 'email', key: 'email' },
]

const socialLinks = [
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

const toExternalHref = (value) =>
  value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`

const toSocialHref = (link, card) => {
  if (link.isMailto) {
    return `mailto:${card[link.key]}`
  }

  return toExternalHref(card[link.key])
}

function ContactCard({ card, ui, onClose, onNameHover, onNameClick, isCatPartyActive }) {
  const cardLabels = ui?.contactCardLabels ?? {
    role: 'Role',
    organization: 'Organization',
    website: 'Website',
    location: 'Location',
    email: 'Email',
  }
  const socialTitles = ui?.socialTitles ?? {
    linkedin: 'LinkedIn profile',
    github: 'GitHub profile',
    email: 'Send an email',
    tiktok: 'TikTok profile',
  }

  return (
    <article className="terminal-contact-card" aria-label={ui?.contactCardAriaLabel ?? 'Contact card'}>
      <div className="card-photo-slot">
        <img className="card-photo" src="/me.png" alt={card.imageAlt} />
      </div>

      <div className="card-details">
        <p className="card-badge">card.sh</p>
        <h1>
          <button
            type="button"
            className={`card-name-trigger ${isCatPartyActive ? 'is-active' : ''}`}
            onMouseEnter={onNameHover}
            onFocus={onNameHover}
            onClick={onNameClick}
            title={isCatPartyActive ? 'Disable cat mode' : 'Enable cat mode'}
          >
            {card.name}
          </button>
        </h1>

        <div className="card-socials" aria-label="Social links">
          {socialLinks.map((link) => {
            const Icon = link.icon

            return (
              <a
                className="card-social-link"
                href={toSocialHref(link, card)}
                key={link.key}
                target={link.isMailto ? undefined : '_blank'}
                rel={link.isMailto ? undefined : 'noreferrer'}
                aria-label={link.label}
                title={socialTitles[link.titleKey]}
              >
                {Icon ? <Icon className="card-social-icon" aria-hidden="true" focusable="false" /> : null}
              </a>
            )
          })}
        </div>

        <dl>
          {fieldRows.map((row) => (
            <div className="card-row" key={row.key}>
              <dt>{cardLabels[row.labelKey]}</dt>
              <dd>
                {row.link ? (
                  <a className="card-link" href={toExternalHref(card[row.key])} target="_blank" rel="noreferrer">
                    {card[row.key]}
                  </a>
                ) : (
                  card[row.key]
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <HintActionButton
        className="card-hint"
        onClick={onClose}
        prefix={ui?.escapePrefix ?? 'Press'}
        suffix={ui?.closeTerminalSuffix ?? 'to return to the terminal.'}
      />
    </article>
  )
}

export default ContactCard
