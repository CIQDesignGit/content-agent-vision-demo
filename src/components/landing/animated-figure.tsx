"use client"

import { useEffect, useState } from "react"
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
  className?: string
}

/** Headline figure that counts up once on mount. Pair with `tabular-nums`. */
export function AnimatedFigure({
  value,
  fractionDigits = 2,
  delay = 0,
  className,
}: AnimatedFigureProps) {
  const reduced = useReducedMotion()
  // SSR + first paint show the final value so markup matches on hydrate.
  const [label, setLabel] = useState(() => value.toFixed(fractionDigits))
  const count = useMotionValue(value)

  useMotionValueEvent(count, "change", (v) => {
    setLabel(v.toFixed(fractionDigits))
  })

  useEffect(() => {
    if (reduced) {
      count.set(value)
      return
    }

    let controls: { stop: () => void } | undefined
    // Defer so the hydrated final value paints once before the count-up starts.
    const raf = requestAnimationFrame(() => {
      count.set(0)
      controls = animate(count, value, {
        duration: DURATION.figure,
        delay,
        ease: EASE_OUT,
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      controls?.stop()
    }
  }, [count, delay, reduced, value])

  return <span className={className}>{label}</span>
}
