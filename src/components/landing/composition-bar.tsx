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
        "relative h-full min-w-0 origin-center overflow-hidden rounded-[3px] transition-[filter,opacity] duration-200",
        onHoverChange && "cursor-pointer hover:brightness-110 hover:saturate-125",
        dimmed && "opacity-35",
        isFirst && "rounded-l-full",
        isLast && "rounded-r-full",
        className,
      )}
      style={{ width: `${widthPct}%` }}
      title={title}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
    >
      {/* Top sheen — gives the fill dimension without a gradient fill. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2 bg-white/20"
      />
    </div>
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
  amountClassName,
  info,
  dimmed,
}: {
  swatchClassName: string
  swatchRingClassName?: string
  label: string
  amountLabel: string
  amountClassName: string
  info?: ReactNode
  dimmed?: boolean
}) {
  return (
    <li
      className={cn(
        "flex min-w-0 flex-col gap-1.5 transition-opacity duration-200",
        dimmed && "opacity-40",
      )}
    >
      <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span
          className={cn(
            "size-2 shrink-0 rounded-full",
            swatchClassName,
            swatchRingClassName,
          )}
          aria-hidden
        />
        <span className="truncate">{label}</span>
        {info}
      </span>
      <span
        className={cn(
          "pl-4 font-sans text-lg font-semibold tracking-tight tabular-nums",
          amountClassName,
        )}
      >
        {amountLabel}
      </span>
    </li>
  )
}
