import { useState } from 'react'
import { formatPrompt, splitCommandParts, splitHelpLineParts } from '../../terminal/formatters'
import './TerminalHistory.css'

const renderHintEntry = (commands, index, onHintClick) => (
  <p className="line output terminal-hint-line" key={`hint-${index}`}>
    <span className="terminal-hint-label">Try:</span>
    {commands.map((command) => (
      <button className="hint-pill" key={command} onClick={() => onHintClick(command)}>
        {command}
      </button>
    ))}
  </p>
)

const renderTextWithMarkdownLinks = (text) => {
  if (!text) {
    return ''
  }

  const nodes = []
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
  let cursor = 0
  let matchIndex = 0
  let match

  while ((match = linkPattern.exec(text)) !== null) {
    const [fullMatch, label, href] = match
    const start = match.index

    if (start > cursor) {
      nodes.push(<span key={`text-${matchIndex}`}>{text.slice(cursor, start)}</span>)
    }

    nodes.push(
      <a
        className="terminal-link terminal-shared-link"
        href={href}
        key={`link-${matchIndex}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {label}
      </a>,
    )

    cursor = start + fullMatch.length
    matchIndex += 1
  }

  if (cursor < text.length) {
    nodes.push(<span key={`text-tail-${matchIndex}`}>{text.slice(cursor)}</span>)
  }

  return nodes.length ? nodes : text
}

const unorderedListPattern = /^\s*[-*]\s+(.+)$/
const orderedListPattern = /^\s*\d+[.)]\s+(.+)$/

const getListFromSection = (sectionText) => {
  const lines = sectionText.split('\n').map((line) => line.trim()).filter(Boolean)

  if (!lines.length) {
    return null
  }

  const unorderedItems = lines
    .map((line) => line.match(unorderedListPattern)?.[1] ?? null)
    .filter(Boolean)

  if (unorderedItems.length === lines.length) {
    return { type: 'ul', items: unorderedItems }
  }

  const orderedItems = lines
    .map((line) => line.match(orderedListPattern)?.[1] ?? null)
    .filter(Boolean)

  if (orderedItems.length === lines.length) {
    return { type: 'ol', items: orderedItems }
  }

  return null
}

const renderStructuredText = (text, keyPrefix) => {
  if (!text) {
    return ''
  }

  const sections = text.split('\n\n').filter((section) => section.trim())

  return sections.map((section, index) => {
    const list = getListFromSection(section)

    if (!list) {
      return (
        <p className="terminal-text-paragraph" key={`${keyPrefix}-paragraph-${index}`}>
          {renderTextWithMarkdownLinks(section)}
        </p>
      )
    }

    const ListTag = list.type

    return (
      <ListTag className="terminal-text-list" key={`${keyPrefix}-list-${index}`}>
        {list.items.map((item, itemIndex) => (
          <li className="terminal-text-list-item" key={`${keyPrefix}-list-item-${index}-${itemIndex}`}>
            {renderTextWithMarkdownLinks(item)}
          </li>
        ))}
      </ListTag>
    )
  })
}

const getEntryImages = (entry) => {
  if (Array.isArray(entry.images) && entry.images.length > 0) {
    return entry.images
  }

  if (entry.image) {
    return [entry.image]
  }

  return []
}

function RichOutputMediaStack({ images, imageAlt }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const totalImages = images.length
  const visibleLayers = [0, 1, 2]
    .filter((offset) => offset < totalImages)
    .map((offset) => ({
      imageIndex: (activeIndex + offset) % totalImages,
      depth: offset,
    }))

  const renderLayers = [...visibleLayers].reverse()

  const handleCycle = () => {
    if (totalImages < 2) {
      return
    }

    setActiveIndex((previousIndex) => (previousIndex + 1) % totalImages)
  }

  const stackLabel = totalImages > 1 ? 'Click to cycle photos' : 'Photo preview'

  return (
    <div className="rich-output-media">
      <button
        type="button"
        className="rich-output-media-stack"
        onClick={handleCycle}
        aria-label={stackLabel}
        title={stackLabel}
      >
        {renderLayers.map((layer) => (
          <img
            key={`${layer.imageIndex}-${layer.depth}`}
            className={`stack-card stack-depth-${layer.depth}`}
            src={images[layer.imageIndex]}
            alt={imageAlt ?? 'Terminal file image'}
            draggable={false}
          />
        ))}
      </button>
      {totalImages > 1 ? (
        <p className="rich-output-image-counter">
          {activeIndex + 1}/{totalImages}
        </p>
      ) : null}
    </div>
  )
}

function TerminalHistory({ history, historyEndRef, onHintClick, children }) {
  return (
    <div className="history" role="log" aria-live="polite">
      {history.map((entry, index) => {
        if (entry.type === 'command') {
          const { commandName, commandArgs } = splitCommandParts(entry.command)

          return (
            <p className="line command" key={`${entry.command}-${index}`}>
              <span className="prompt">{formatPrompt(entry.cwd)}</span>{' '}
              <span className="command-name">{commandName}</span>
              {commandArgs ? <span className="command-args"> {commandArgs}</span> : null}
            </p>
          )
        }

        if (entry.type === 'help') {
          const lines = entry.text.split('\n')

          return (
            <p className="line output help-output" key={`${entry.type}-${index}`}>
              {lines.map((line, lineIndex) => {
                const parts = splitHelpLineParts(line)

                if (!parts) {
                  return (
                    <span
                      className={`help-line ${lineIndex === 0 ? 'help-heading' : ''}`}
                      key={`help-line-${lineIndex}`}
                    >
                      {line}
                    </span>
                  )
                }

                return (
                  <span className="help-line" key={`help-line-${lineIndex}`}>
                    <span className="help-command">{parts.commandPart}</span>
                    <span className="help-description">{parts.descriptionPart}</span>
                  </span>
                )
              })}
            </p>
          )
        }

        if (entry.type === 'output' && (entry.image || (Array.isArray(entry.images) && entry.images.length > 0))) {
          const entryImages = getEntryImages(entry)

          return (
            <div className="line output rich-output" key={`${entry.type}-${index}`}>
              <RichOutputMediaStack images={entryImages} imageAlt={entry.imageAlt} />
              <div className="rich-output-text terminal-text-content">{renderStructuredText(entry.text, `rich-output-${index}`)}</div>
            </div>
          )
        }

        if (entry.type === 'output' && Array.isArray(entry.columns)) {
          return (
            <p className="line output" key={`${entry.type}-${index}`}>
              {entry.columns.map((column, columnIndex) => (
                <span
                  key={`column-${index}-${columnIndex}`}
                  className={column.isDirectory ? 'terminal-directory-item' : undefined}
                >
                  {column.text}
                </span>
              ))}
            </p>
          )
        }

        if (entry.type === 'hint') {
          return renderHintEntry(entry.commands, index, onHintClick)
        }

        if (entry.type === 'chat') {
          return (
            <p className={`line output chat-output${entry.loading ? ' chat-loading' : ''}`} key={`chat-${entry.id ?? index}`}>
              {entry.loading && !entry.text ? (
                <span className="chat-spinner" aria-label="Loading">&#9646;</span>
              ) : (
                <>
                  {entry.text}
                  {entry.loading ? <span className="chat-cursor" aria-hidden="true">&#9646;</span> : null}
                </>
              )}
            </p>
          )
        }

        if (entry.type === 'output') {
          return (
            <div className="line output terminal-text-content" key={`${entry.type}-${index}`}>
              {renderStructuredText(entry.text, `output-${index}`)}
            </div>
          )
        }

        return (
          <p className={`line ${entry.type}`} key={`${entry.type}-${index}`}>
            {renderTextWithMarkdownLinks(entry.text)}
          </p>
        )
      })}

      {children}

      <div ref={historyEndRef} />
    </div>
  )
}

export default TerminalHistory
