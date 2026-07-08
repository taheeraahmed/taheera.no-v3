import './App.css'
import ContactCard from './components/ContactCard'
import CatPartyLayer from './components/CatPartyLayer'
import CvDialog from './components/CvDialog'
import TerminalWindow from './components/terminal/TerminalWindow'
import { CV_FILE_NAME } from './terminal/constants'
import { formatPrompt, formatSuggestionLabel, getTerminalListColumnWidth } from './terminal/formatters'
import TerminalHistory from './components/terminal/TerminalHistory'
import { useAppState } from './context/AppStateContext'

function App() {
  const {
    activeWindow,
    activateCatParty,
    catSprites,
    closeCvDialog,
    content,
    cwd,
    handleHintClick,
    handleInputChange,
    handleInputKeyDown,
    handleSubmit,
    handleWindowClick,
    handleWindowDragStart,
    handleWindowMouseDown,
    hideCard,
    history,
    historyEndRef,
    input,
    inputRef,
    isCardFlipped,
    isCatPartyActive,
    isCvDialogOpen,
    isDraggingWindow,
    isPhoneView,
    setCvActive,
    tabCompletion,
    terminalStrings,
    toggleCatParty,
    uiStrings,
    windowOffset,
  } = useAppState()

  const catPartyLayer = <CatPartyLayer isActive={isCatPartyActive} sprites={catSprites} />
  const autocompleteLabels = tabCompletion?.suggestions.map(formatSuggestionLabel) ?? []
  const autocompleteColumnWidth = getTerminalListColumnWidth(autocompleteLabels)
  const autocompleteColumnStyle = { '--autocomplete-column-width': `${autocompleteColumnWidth}ch` }

  if (isPhoneView) {
    return (
      <main className="portfolio-page">
        {catPartyLayer}

        <section className="terminal-card-face mobile-contact-only" aria-label={terminalStrings.contactCardAria}>
          <div className="terminal-card-screen">
            <ContactCard
              card={content.contactCard}
              ui={uiStrings}
              onClose={() => {}}
              onNameHover={activateCatParty}
              onNameClick={toggleCatParty}
              isCatPartyActive={isCatPartyActive}
              isPhoneView={isPhoneView}
            />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="portfolio-page">
      {catPartyLayer}

      <CvDialog
        isOpen={isCvDialogOpen}
        fileName={CV_FILE_NAME}
        onClose={closeCvDialog}
        isActive={activeWindow === 'cv'}
        onActivate={setCvActive}
        ui={uiStrings}
      />

      <section
        className={`terminal-stage ${isCardFlipped ? 'is-flipped' : ''} ${isDraggingWindow ? 'is-dragging' : ''}`}
        style={{
          transform: `translate(${windowOffset.x}px, ${windowOffset.y}px)`,
          zIndex: activeWindow === 'terminal' ? 60 : 30,
        }}
      >
        <div className="terminal-flipper">
          <div className="terminal-face terminal-face-front">
            <TerminalWindow
              title={terminalStrings.windowTitle}
              onDragStart={handleWindowDragStart}
              onMouseDown={handleWindowMouseDown}
              onClick={handleWindowClick}
              aria-label={terminalStrings.terminalAria}
              closeLabel={uiStrings.closeButtonAriaLabel}
            >
            <div className="terminal-screen">
              <TerminalHistory history={history} historyEndRef={historyEndRef} onHintClick={handleHintClick}>
                <form className="command-form" onSubmit={handleSubmit}>
                  <label htmlFor="command-input" className="prompt">
                    {formatPrompt(cwd)}
                  </label>
                  <textarea
                    id="command-input"
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder={terminalStrings.inputPlaceholder}
                    aria-label={terminalStrings.shellInputAria}
                  />
                </form>

                {tabCompletion && tabCompletion.suggestions.length > 1 ? (
                  <div className="autocomplete-suggestions" aria-live="polite" style={autocompleteColumnStyle}>
                    {tabCompletion.suggestions.map((suggestion, index) => {
                      const label = formatSuggestionLabel(suggestion)
                      const isSelected = index === tabCompletion.index
                      const isDirectory = suggestion.endsWith('/')

                      return (
                        <span key={suggestion} className="autocomplete-suggestion">
                          <span
                            className={`autocomplete-suggestion-label${isDirectory ? ' is-directory' : ''}${isSelected ? ' is-selected' : ''}`}
                          >
                            {label}
                          </span>
                        </span>
                      )
                    })}
                  </div>
                ) : null}
              </TerminalHistory>
            </div>
          </TerminalWindow>
          </div>

          <section className="terminal-face terminal-face-back terminal-card-face" aria-label={terminalStrings.contactCardAria}>
            <div className="terminal-card-screen">
              <ContactCard
                card={content.contactCard}
                ui={uiStrings}
                onClose={hideCard}
                onNameHover={activateCatParty}
                onNameClick={toggleCatParty}
                isCatPartyActive={isCatPartyActive}
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
