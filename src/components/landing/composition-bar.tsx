"use client"

import type { ReactNode } from "react"
import { cn } from "@ciq-dev/ciq-design-system"

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
      className={cn("flex h-7 w-full gap-0.5", className)}
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
  onHoverChange,
}: {
  widthPct: number
  className?: string
  title?: string
  isFirst: boolean
  isLast: boolean
  /** Soften sibling segments while another is hovered */
  dimmed?: boolean
  onHoverChange?: (hovered: boolean) => void
}) {
  return (
    <div
      className={cn(
        "h-full min-w-0 origin-center transition-[filter,opacity,transform] duration-150",
        onHoverChange && "cursor-pointer hover:brightness-110 hover:saturate-125",
        dimmed && "opacity-40",
        isFirst && "rounded-l-lg",
        isLast && "rounded-r-lg",
        className,
      )}
      style={{ width: `${widthPct}%` }}
      title={title}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
    />
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
    <div className="flex items-center justify-between text-xs font-semibold tabular-nums text-slate-500">
      <span>{start}</span>
      <span>{end}</span>
    </div>
  )
}
