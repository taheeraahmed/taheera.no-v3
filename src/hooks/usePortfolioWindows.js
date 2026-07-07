import { useCallback, useEffect, useState } from 'react'

function usePortfolioWindows() {
  const [isCvDialogOpen, setIsCvDialogOpen] = useState(false)
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const [activeWindow, setActiveWindow] = useState('terminal')

  const setTerminalActive = useCallback(() => {
    setActiveWindow('terminal')
  }, [])

  const setCvActive = useCallback(() => {
    setActiveWindow('cv')
  }, [])

  const closeCvDialog = useCallback(() => {
    setIsCvDialogOpen(false)
    setTerminalActive()
  }, [setTerminalActive])

  const openCvDialog = useCallback(() => {
    setIsCvDialogOpen(true)
    setCvActive()
  }, [setCvActive])

  const hideCard = useCallback(() => {
    setIsCardFlipped(false)
  }, [])

  const showCard = useCallback(() => {
    setIsCardFlipped(true)
  }, [])

  useEffect(() => {
    if (!isCvDialogOpen && !isCardFlipped) {
      return
    }

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return
      }

      if (activeWindow === 'cv' && isCvDialogOpen) {
        closeCvDialog()
        return
      }

      if (isCardFlipped) {
        hideCard()
        return
      }

      if (isCvDialogOpen) {
        closeCvDialog()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeWindow, closeCvDialog, hideCard, isCardFlipped, isCvDialogOpen])

  useEffect(() => {
    if (!isCvDialogOpen) {
      setTerminalActive()
    }
  }, [isCvDialogOpen, setTerminalActive])

  return {
    activeWindow,
    closeCvDialog,
    hideCard,
    isCardFlipped,
    isCvDialogOpen,
    openCvDialog,
    setCvActive,
    setTerminalActive,
    showCard,
  }
}

export default usePortfolioWindows