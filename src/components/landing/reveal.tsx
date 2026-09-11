"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { fadeRise, revealViewport, staggerContainer } from "@/lib/motion"

type RevealTag = "div" | "section" | "ol" | "ul" | "li"

interface RevealProps {
  children: ReactNode
  className?: string
  as?: RevealTag
  "aria-label"?: string
}

interface RevealGroupProps extends RevealProps {
  /** Seconds before the first child starts. */
  delay?: number
  /** Gap between consecutive children. */
  stagger?: number
  /** Below the fold — hold the reveal until the band is scrolled to. */
  onScroll?: boolean
}

/**
 * Drives a staggered reveal. Children opt in by declaring `hidden`/`visible`
 * variants (via `RevealItem` or a bare motion element) — variant state travels
 * down through React context, so no child has to know its own delay.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
  delay = 0,
  stagger = 0.07,
  onScroll = false,
  ...rest
}: RevealGroupProps) {
  const Tag = motion[as] as typeof motion.div
  const trigger = onScroll
    ? { whileInView: "visible", viewport: revealViewport }
    : { animate: "visible" }

  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      {...trigger}
      {...rest}
    >
      {children}
    </Tag>
  )
}

interface RevealItemProps extends RevealProps {
  /** Swap in the scroll-band timing (`fadeRiseOnScroll`) where needed. */
  variants?: Variants
}

export function RevealItem({
  children,
  className,
  as = "div",
  variants = fadeRise,
  ...rest
}: RevealItemProps) {
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag className={className} variants={variants} {...rest}>
      {children}
    </Tag>
  )
}
