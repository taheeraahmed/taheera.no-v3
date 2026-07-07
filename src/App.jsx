import './App.css'
import ContactCard from './components/ContactCard'
import CatPartyLayer from './components/CatPartyLayer'
import CvDialog from './components/CvDialog'
import TerminalWindow from './components/terminal/TerminalWindow'
import { CV_FILE_NAME } from './terminal/constants'
import { formatPrompt, formatSuggestionLabel } from './terminal/formatters'
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
          <TerminalWindow
            title={terminalStrings.windowTitle}
            onDragStart={handleWindowDragStart}
            onMouseDown={handleWindowMouseDown}
            onClick={handleWindowClick}
            className="terminal-face terminal-face-front"
            aria-label={terminalStrings.terminalAria}
            closeLabel={uiStrings.closeButtonAriaLabel}
          >
            <div className="terminal-screen">
              <TerminalHistory history={history} historyEndRef={historyEndRef} onHintClick={handleHintClick}>
                <form className="command-form" onSubmit={handleSubmit}>
                  <label htmlFor="command-input" className="prompt">
                    {formatPrompt(cwd)}
                  </label>
                  <input
                    id="command-input"
                    ref={inputRef}
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
                  <div className="autocomplete-suggestions" aria-live="polite">
                    {tabCompletion.suggestions.map((suggestion, index) => (
                      <span
                        key={suggestion}
                        className={`autocomplete-suggestion${index === tabCompletion.index ? ' is-selected' : ''}`}
                      >
                        {formatSuggestionLabel(suggestion)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </TerminalHistory>
            </div>
          </TerminalWindow>

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
