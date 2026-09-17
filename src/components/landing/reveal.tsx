"use client"

import { useEffect, useMemo, useRef, type ReactNode } from "react"
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

function openStuckEntrance(node: HTMLElement) {
  node.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
    if (Number.parseFloat(el.style.opacity) !== 0) return
    el.style.opacity = "1"
    if (
      el.style.transform.includes("translate") ||
      el.style.transform.includes("scaleY(0)")
    ) {
      el.style.transform = "none"
    }
  })
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
  const ref = useRef<HTMLElement>(null)
  const variants = useMemo(
    () => staggerContainer(stagger, delay),
    [stagger, delay],
  )
  const trigger = onScroll
    ? { whileInView: "visible", viewport: revealViewport }
    : { animate: "visible" as const }

  // A missed animation frame leaves the band at opacity 0 forever. Open it.
  useEffect(() => {
    if (onScroll) return
    const node = ref.current
    if (!node) return
    const timer = window.setTimeout(() => openStuckEntrance(node), 400)
    const onShow = () => {
      if (document.visibilityState === "visible") openStuckEntrance(node)
    }
    document.addEventListener("visibilitychange", onShow)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener("visibilitychange", onShow)
    }
  }, [onScroll])

  return (
    <Tag
      ref={ref}
      className={className}
      variants={variants}
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
