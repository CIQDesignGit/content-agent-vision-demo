"use client"

import { useEffect, useRef } from "react"
import { Confetti, type ConfettiRef } from "@/components/ui/confetti"

const COLORS = ["#a78bfa", "#875bf7", "#38bdf8", "#fcd34d", "#2dd4bf", "#c4b5fd"]
const GLOBAL = { resize: true, useWorker: false } as const

export function PublishConfetti() {
  const behindRef = useRef<ConfettiRef>(null)
  const frontRef = useRef<ConfettiRef>(null)

  useEffect(() => {
    let cancelled = false
    let fallId = 0

    const riseId = window.setTimeout(() => {
      if (cancelled) return
      void behindRef.current?.fire({
        particleCount: 48,
        spread: 62,
        startVelocity: 30,
        gravity: 0.9,
        ticks: 220,
        origin: { x: 0.5, y: 0.7 },
        scalar: 0.7,
        colors: COLORS,
        disableForReducedMotion: false,
      })
      fallId = window.setTimeout(() => {
        if (cancelled) return
        void frontRef.current?.fire({
          particleCount: 24,
          spread: 55,
          startVelocity: 12,
          gravity: 1.15,
          ticks: 200,
          origin: { x: 0.5, y: 0.18 },
          scalar: 0.7,
          colors: COLORS,
          disableForReducedMotion: false,
        })
      }, 480)
    }, 380)

    return () => {
      cancelled = true
      window.clearTimeout(riseId)
      window.clearTimeout(fallId)
    }
  }, [])

  return (
    <>
      <div className="pointer-events-none absolute -inset-x-16 -top-36 -bottom-10 z-0">
        <Confetti
          ref={behindRef}
          manualstart
          globalOptions={GLOBAL}
          className="block size-full"
        />
      </div>
      <div className="pointer-events-none absolute -inset-x-16 -top-36 -bottom-10 z-20">
        <Confetti
          ref={frontRef}
          manualstart
          globalOptions={GLOBAL}
          className="block size-full"
        />
      </div>
    </>
  )
}
