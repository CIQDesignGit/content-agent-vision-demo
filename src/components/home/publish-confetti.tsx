"use client"

import { useEffect, useRef } from "react"
import { Confetti, type ConfettiRef } from "@/components/ui/confetti"

const COLORS = ["#a78bfa", "#875bf7", "#38bdf8", "#fcd34d", "#2dd4bf", "#c4b5fd"]
const GLOBAL = { resize: true, useWorker: false } as const

/** Centre of the canvas, which is itself centred on the popper icon. */
const ORIGIN = { x: 0.5, y: 0.5 }

/**
 * Burst that leaves the popper icon it is nested inside. The canvas is sized in
 * absolute terms and centred on its parent, so the origin stays pinned to the
 * icon no matter how tall the toast grows.
 */
export function PublishConfetti() {
  const canvasRef = useRef<ConfettiRef>(null)

  useEffect(() => {
    let cancelled = false
    let secondId = 0

    const firstId = window.setTimeout(() => {
      if (cancelled) return

      // The popper's cone points up and to the right; the burst follows it.
      void canvasRef.current?.fire({
        particleCount: 44,
        angle: 65,
        spread: 58,
        startVelocity: 26,
        gravity: 1,
        decay: 0.91,
        ticks: 180,
        origin: ORIGIN,
        scalar: 0.55,
        colors: COLORS,
        disableForReducedMotion: false,
      })

      secondId = window.setTimeout(() => {
        if (cancelled) return
        void canvasRef.current?.fire({
          particleCount: 18,
          angle: 80,
          spread: 74,
          startVelocity: 17,
          gravity: 1.1,
          decay: 0.9,
          ticks: 160,
          origin: ORIGIN,
          scalar: 0.45,
          colors: COLORS,
          disableForReducedMotion: false,
        })
      }, 260)
    }, 320)

    return () => {
      cancelled = true
      window.clearTimeout(firstId)
      window.clearTimeout(secondId)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 size-64 -translate-x-1/2 -translate-y-1/2">
      <Confetti
        ref={canvasRef}
        manualstart
        globalOptions={GLOBAL}
        className="block size-full"
      />
    </div>
  )
}
