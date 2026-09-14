"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_OUT, fadeRiseTight } from "@/lib/motion"

/** Shared track chrome for opportunity composition bars (status + driver). */
export function CompositionBarTrack({
  ariaLabel,
  children,
  className,
}: {
  ariaLabel: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("flex h-9 w-full gap-1", className)}
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}

export function CompositionBarSegment({
  widthPct,
  className,
  title,
  isFirst,
  isLast,
  dimmed,
  enterDelay = 0,
  onHoverChange,
}: {
  widthPct: number
  className?: string
  title?: string
  isFirst: boolean
  isLast: boolean
  /** Soften sibling segments while another is hovered */
  dimmed?: boolean
  /** Seconds to hold before this segment draws itself in */
  enterDelay?: number
  onHoverChange?: (hovered: boolean) => void
}) {
  const reduced = useReducedMotion()
  const target = `${widthPct}%`

  return (
    <motion.div
      className={cn(
        "relative h-full min-w-0 overflow-hidden rounded-[3px] transition-[filter,opacity] duration-200",
        onHoverChange && "cursor-pointer hover:brightness-110 hover:saturate-125",
        dimmed && "opacity-35",
        isFirst && "rounded-l-full",
        isLast && "rounded-r-full",
        className,
      )}
      initial={{ width: reduced ? target : 0 }}
      animate={{ width: target }}
      transition={{
        duration: DURATION.draw,
        ease: EASE_OUT,
        delay: reduced ? 0 : enterDelay,
      }}
      title={title}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
    >
      {/* Top-half highlight — reads as a lit, slightly convex fill without
          needing a gradient on the fill colour itself. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-white/20" />
    </motion.div>
  )
}

/** Fixed annotation slot so status/driver bars stay vertically aligned. */
export function CompositionBarFrame({
  annotation,
  children,
}: {
  annotation?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="relative pt-8">
      {annotation}
      {children}
    </div>
  )
}

export function CompositionBarScale({
  start = "$0",
  end,
}: {
  start?: string
  end: string
}) {
  return (
    <div className="flex items-center justify-between text-[11px] font-semibold tabular-nums text-slate-400">
      <span>{start}</span>
      <span>{end}</span>
    </div>
  )
}

/** Legend entry shared by the status and driver views. */
export function CompositionBarLegendItem({
  swatchClassName,
  swatchRingClassName,
  label,
  amountLabel,
  info,
  dimmed,
  muted,
  className,
}: {
  swatchClassName: string
  swatchRingClassName?: string
  label: string
  amountLabel: string
  info?: ReactNode
  dimmed?: boolean
  /** Soften the amount — expired / out-of-total buckets */
  muted?: boolean
  className?: string
}) {
  return (
    <motion.li
      variants={fadeRiseTight}
      className={cn(
        "flex min-w-0 flex-col gap-1.5 transition-opacity duration-200",
        dimmed && "opacity-40",
        className,
      )}
    >
      <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span
          className={cn(
            "size-2.5 shrink-0 rounded-full",
            swatchClassName,
            swatchRingClassName,
          )}
          aria-hidden
        />
        <span className="truncate">{label}</span>
        {info}
      </span>
      {/* Amount stays neutral — the swatch already carries the mapping, and
          a colored figure would compete with the headline value. */}
      <span
        className={cn(
          "pl-4 font-sans text-lg font-semibold tracking-tight tabular-nums",
          muted ? "text-slate-400" : "text-slate-900",
        )}
      >
        {amountLabel}
      </span>
    </motion.li>
  )
}
