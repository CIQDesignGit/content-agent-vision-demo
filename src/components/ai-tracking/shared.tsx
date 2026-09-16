"use client"

import { Fragment, type ReactNode } from "react"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"
import type { DeltaTone } from "./types"

const BOLD = /\*\*([^*]+)\*\*/g

/** Resting surface on the slate canvas — same pane rung as other launchpad cards. */
export const trackingCardClass =
  "overflow-hidden rounded-2xl border-0 bg-white ring-1 ring-slate-900/8 !shadow-pane"

export function BandHeading({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="mt-1.5 h-8 w-1 shrink-0 rounded-full bg-brand-500"
      />
      <div className="min-w-0">
        <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function PanelHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-base font-semibold tracking-tight text-slate-900">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

export function DeltaChip({
  tone,
  label,
}: {
  tone: DeltaTone
  label: string
}) {
  const Icon =
    tone === "up" ? ArrowUpRight : tone === "down" ? ArrowDownRight : Minus

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        tone === "up" && "text-success-700",
        tone === "down" && "text-error-700",
        tone === "flat" && "text-slate-500",
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {label}
    </span>
  )
}

export function InsightRead({
  markdown,
  className,
}: {
  markdown: string
  className?: string
}) {
  const segments: Array<{ type: "text" | "bold"; value: string }> = []
  let lastIndex = 0
  for (const match of markdown.matchAll(BOLD)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      segments.push({ type: "text", value: markdown.slice(lastIndex, index) })
    }
    segments.push({ type: "bold", value: match[1] })
    lastIndex = index + match[0].length
  }
  if (lastIndex < markdown.length) {
    segments.push({ type: "text", value: markdown.slice(lastIndex) })
  }

  return (
    <div className={cn("flex w-full gap-3 rounded-xl bg-slate-50 px-4 py-3.5", className)}>
      <span aria-hidden className="mt-1 h-8 w-0.5 shrink-0 rounded-full bg-brand-400" />
      <p className="text-sm leading-relaxed text-slate-600">
        <span className="font-semibold text-slate-900">The read </span>
        {segments.map((segment, i) =>
          segment.type === "bold" ? (
            <strong key={i} className="font-semibold text-slate-900">
              {segment.value}
            </strong>
          ) : (
            <Fragment key={i}>{segment.value}</Fragment>
          ),
        )}
      </p>
    </div>
  )
}
