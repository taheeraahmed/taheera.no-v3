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

function TerminalHistory({ history, historyEndRef, onHintClick }) {
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

        if (entry.type === 'output' && entry.image) {
          return (
            <div className="line output rich-output" key={`${entry.type}-${index}`}>
              <img className="rich-output-image" src={entry.image} alt={entry.imageAlt ?? 'Terminal file image'} />
              <p className="rich-output-text">{entry.text}</p>
            </div>
          )
        }

        if (entry.type === 'hint') {
          return renderHintEntry(entry.commands, index, onHintClick)
        }

        return (
          <p className={`line ${entry.type}`} key={`${entry.type}-${index}`}>
            {renderTextWithMarkdownLinks(entry.text)}
          </p>
        )
      })}

      <div ref={historyEndRef} />
    </div>
  )
}

export default TerminalHistory
