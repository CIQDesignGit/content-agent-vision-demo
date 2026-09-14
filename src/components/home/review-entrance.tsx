"use client"

import type { ReactNode } from "react"
import { MotionConfig, motion } from "framer-motion"
import { enterTransition } from "@/lib/motion"

/** Sidebar pane starts immediately; cards follow as a short wave. */
export const REVIEW_SIDEBAR_CARD_STAGGER = 0.055
export const REVIEW_SIDEBAR_CARD_DELAY = 0.1

const DETAIL_START = 0.36
const DETAIL_STEP = 0.12

/** Right-pane beats — header first, then each section card. */
export const REVIEW_DETAIL_DELAY = {
  header: DETAIL_START,
  toolbar: DETAIL_START + DETAIL_STEP,
  title: DETAIL_START + DETAIL_STEP * 2,
  image: DETAIL_START + DETAIL_STEP * 3,
  bullets: DETAIL_START + DETAIL_STEP * 4,
  description: DETAIL_START + DETAIL_STEP * 5,
} as const

export function ReviewEntrance({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export function ReviewDetailItem({
  children,
  className,
  delay,
}: {
  children: ReactNode
  className?: string
  delay: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...enterTransition, delay }}
    >
      {children}
    </motion.div>
  )
}
