"use client"

import { useEffect, useRef, useState } from "react"
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion"
import { DURATION, EASE_OUT } from "@/lib/motion"

interface AnimatedFigureProps {
  value: number
  /** Fixed decimal places keep the digit count stable while counting. */
  fractionDigits?: number
  delay?: number
  /** Render the in-between values — defaults to plain fixed decimals. */
  format?: (value: number) => string
  /** Off for figures that should only move when something changes them. */
  animateOnMount?: boolean
  className?: string
}

/**
 * Headline figure that counts up on mount, and re-counts from where it stood
 * whenever the value changes. Pair with `tabular-nums`.
 */
export function AnimatedFigure({
  value,
  fractionDigits = 2,
  delay = 0,
  format,
  animateOnMount = true,
  className,
}: AnimatedFigureProps) {
  const reduced = useReducedMotion()
  const render = format ?? ((v: number) => v.toFixed(fractionDigits))
  // SSR + first paint show the final value so markup matches on hydrate.
  const [label, setLabel] = useState(() => render(value))
  const count = useMotionValue(value)
  const previous = useRef<number | null>(null)

  useMotionValueEvent(count, "change", (v) => {
    setLabel(render(v))
  })

  useEffect(() => {
    const from = previous.current
    previous.current = value

    if (reduced || (from === null && !animateOnMount)) {
      count.set(value)
      return
    }

    let controls: { stop: () => void } | undefined
    // Defer so the hydrated final value paints once before the count-up starts.
    const raf = requestAnimationFrame(() => {
      count.set(from ?? 0)
      controls = animate(count, value, {
        duration: DURATION.figure,
        // The staging delay is for the mount reveal only — a later rise is
        // already being held back by whatever changed the value.
        delay: from === null ? delay : 0,
        ease: EASE_OUT,
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      controls?.stop()
    }
  }, [animateOnMount, count, delay, reduced, value])

  return <span className={className}>{label}</span>
}
