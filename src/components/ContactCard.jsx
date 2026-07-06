import { Email, GitHub, LinkedIn } from '@mui/icons-material'
import { FaTiktok } from 'react-icons/fa'
import HintActionButton from './HintActionButton'
import './ContactCard.css'

const fieldRows = [
  { label: 'Role', key: 'title' },
  { label: 'Organization', key: 'organization' },
  { label: 'Website', key: 'website', link: true },
  { label: 'Location', key: 'location' },
  { label: 'Email', key: 'email' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    key: 'linkedin',
    icon: LinkedIn,
    title: 'LinkedIn profile',
  },
  {
    label: 'GitHub',
    key: 'github',
    icon: GitHub,
    title: 'GitHub profile',
  },
  {
    label: 'Email',
    key: 'email',
    icon: Email,
    title: 'Send an email',
    isMailto: true,
  },
  {
    label: 'TikTok',
    key: 'tiktok',
    icon: FaTiktok,
    title: 'TikTok profile',
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

function ContactCard({ card, onClose }) {
  return (
    <article className="terminal-contact-card" aria-label="Contact card">
      <div className="card-photo-slot">
        <img className="card-photo" src="/me.png" alt={card.imageAlt} />
      </div>

      <div className="card-details">
        <p className="card-badge">card.sh</p>
        <h2>{card.name}</h2>

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
                title={link.title}
              >
                {Icon ? <Icon className="card-social-icon" aria-hidden="true" focusable="false" /> : null}
              </a>
            )
          })}
        </div>

        <dl>
          {fieldRows.map((row) => (
            <div className="card-row" key={row.key}>
              <dt>{row.label}</dt>
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

        <HintActionButton className="card-hint" onClick={onClose} suffix="to return to the terminal." />
      </div>
    </article>
  )
}

export default ContactCard
