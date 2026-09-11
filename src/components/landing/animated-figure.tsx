"use client"

import { useEffect } from "react"
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
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
  const count = useMotionValue(reduced ? value : 0)
  const label = useTransform(count, (v) => v.toFixed(fractionDigits))

  useEffect(() => {
    if (reduced) {
      count.set(value)
      return
    }
    const controls = animate(count, value, {
      duration: DURATION.figure,
      delay,
      ease: EASE_OUT,
    })
    return () => controls.stop()
  }, [count, delay, reduced, value])

  return <motion.span className={className}>{label}</motion.span>
}
