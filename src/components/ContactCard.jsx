import './terminal/TerminalShared.css'
import HintActionButton from './HintActionButton'
import { defaultCardLabels, defaultSocialTitles, fieldRows, socialLinks } from './contactCardConfig'
import './ContactCard.css'

const toExternalHref = (value) =>
  value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`

const toSocialHref = (link, card) => {
  if (link.isMailto) {
    return `mailto:${card[link.key]}`
  }

  return toExternalHref(card[link.key])
}

function ContactCard({ card, ui, onClose, onNameHover, onNameClick, isCatPartyActive, isPhoneView = false }) {
  const cardLabels = ui?.contactCardLabels ?? defaultCardLabels
  const socialTitles = ui?.socialTitles ?? defaultSocialTitles

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
                  <a className="card-link terminal-shared-link" href={toExternalHref(card[row.key])} target="_blank" rel="noreferrer">
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

      {isPhoneView ? (
        <p className="card-hint card-hint-static">This page is way cooler from a computer ;);)</p>
      ) : (
        <HintActionButton
          className="card-hint"
          onClick={onClose}
          prefix={ui?.escapePrefix ?? 'Press'}
          suffix={ui?.closeTerminalSuffix ?? 'to return to the terminal.'}
        />
      )}
    </article>
  )
}

export default ContactCard
