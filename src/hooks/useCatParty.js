import { useCallback, useEffect, useRef, useState } from 'react'

function buildCatSprites(count, batchWindowMs) {
  const seed = Date.now()

  return Array.from({ length: count }, (_, index) => {
    const size = 54 + Math.random() * 72
    const left = Math.random() * 100
    const top = Math.random() * 100
    const driftX = -36 + Math.random() * 72
    const driftY = -28 + Math.random() * 56
    const duration = 5.5 + Math.random() * 8.5
    const delay = -Math.random() * duration
    const rotate = -8 + Math.random() * 16
    const spawnDelayMs = Math.floor(Math.random() * batchWindowMs)

    return {
      id: `cat-${seed}-${index}`,
      spawnDelayMs,
      src: `/oiia-cat.gif?v=${seed}-${index}-${Math.round(Math.random() * 1000000)}`,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        '--cat-drift-x': `${driftX}px`,
        '--cat-drift-y': `${driftY}px`,
        '--cat-duration': `${duration}s`,
        '--cat-delay': `${delay}s`,
        '--cat-rotate': `${rotate}deg`,
      },
    }
  })
}

function useCatParty() {
  const [isCatPartyActive, setIsCatPartyActive] = useState(false)
  const [catSprites, setCatSprites] = useState([])
  const catSpawnTimeoutsRef = useRef([])

  const clearSpawnTimeouts = useCallback(() => {
    catSpawnTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    catSpawnTimeoutsRef.current = []
  }, [])

  const spawnCats = useCallback(() => {
    clearSpawnTimeouts()

    const count = window.innerWidth < 760 ? 36 : 68
    const batchWindowMs = 2200
    const nextSprites = buildCatSprites(count, batchWindowMs)

    setCatSprites([])

    nextSprites.forEach((sprite) => {
      const timeoutId = window.setTimeout(() => {
        setCatSprites((prev) => [...prev, sprite])
      }, sprite.spawnDelayMs)

      catSpawnTimeoutsRef.current.push(timeoutId)
    })
  }, [clearSpawnTimeouts])

  const activateCatParty = useCallback(() => {
    setIsCatPartyActive((prev) => {
      if (!prev) {
        spawnCats()
      }

      return true
    })
  }, [spawnCats])

  const toggleCatParty = useCallback(() => {
    setIsCatPartyActive((prev) => {
      const next = !prev

      if (next) {
        spawnCats()
      }

      return next
    })
  }, [spawnCats])

  useEffect(() => {
    return () => {
      clearSpawnTimeouts()
    }
  }, [clearSpawnTimeouts])

  return {
    isCatPartyActive,
    catSprites,
    activateCatParty,
    toggleCatParty,
  }
}

export default useCatParty
