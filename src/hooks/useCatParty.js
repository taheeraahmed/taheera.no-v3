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
      x: left,
      y: top,
      fleeRadius: 12 + Math.random() * 16,
      seekSpeed: 0.2 + Math.random() * 0.32,
      fleeSpeed: 0.5 + Math.random() * 0.75,
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
  const catMotionIntervalRef = useRef(null)
  const pointerRef = useRef({ x: 50, y: 50, hasPointer: false })

  const clearSpawnTimeouts = useCallback(() => {
    catSpawnTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    catSpawnTimeoutsRef.current = []
  }, [])

  const stopCatMotion = useCallback(() => {
    if (catMotionIntervalRef.current !== null) {
      window.clearInterval(catMotionIntervalRef.current)
      catMotionIntervalRef.current = null
    }
  }, [])

  const startCatMotion = useCallback(() => {
    stopCatMotion()

    catMotionIntervalRef.current = window.setInterval(() => {
      setCatSprites((prev) => {
        if (prev.length === 0 || !pointerRef.current.hasPointer) {
          return prev
        }

        return prev.map((sprite) => {
          const dx = pointerRef.current.x - sprite.x
          const dy = pointerRef.current.y - sprite.y
          const distance = Math.hypot(dx, dy)

          if (distance < 0.001) {
            return sprite
          }

          const isCursorTooClose = distance < sprite.fleeRadius
          const direction = isCursorTooClose ? -1 : 1
          const speed = isCursorTooClose ? sprite.fleeSpeed : sprite.seekSpeed
          const step = speed * (isCursorTooClose ? (1.15 - distance / sprite.fleeRadius) : Math.min(distance / 36, 1))
          const nextX = Math.min(98, Math.max(2, sprite.x + (dx / distance) * step * direction))
          const nextY = Math.min(98, Math.max(2, sprite.y + (dy / distance) * step * direction))

          return {
            ...sprite,
            x: nextX,
            y: nextY,
            style: {
              ...sprite.style,
              left: `${nextX}%`,
              top: `${nextY}%`,
            },
          }
        })
      })
    }, 40)
  }, [stopCatMotion])

  const spawnCats = useCallback(() => {
    clearSpawnTimeouts()
    stopCatMotion()
    pointerRef.current = { x: 50, y: 50, hasPointer: false }

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

    startCatMotion()
  }, [clearSpawnTimeouts, startCatMotion, stopCatMotion])

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
      stopCatMotion()
    }
  }, [clearSpawnTimeouts, stopCatMotion])

  useEffect(() => {
    if (!isCatPartyActive || typeof window === 'undefined') {
      return
    }

    let animationFrameId = null

    const handlePointerMove = (event) => {
      if (animationFrameId !== null) {
        return
      }

      animationFrameId = window.requestAnimationFrame(() => {
        pointerRef.current = {
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
          hasPointer: true,
        }
        animationFrameId = null
      })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }

      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [isCatPartyActive])

  useEffect(() => {
    if (!isCatPartyActive) {
      stopCatMotion()
    }
  }, [isCatPartyActive, stopCatMotion])

  return {
    isCatPartyActive,
    catSprites,
    activateCatParty,
    toggleCatParty,
  }
}

export default useCatParty
