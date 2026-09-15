"use client"

import { Fragment } from "react"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"
import type { DeltaTone } from "./types"

const BOLD = /\*\*([^*]+)\*\*/g

export function SectionKicker({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
      {children}
    </p>
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

export function InsightRead({ markdown }: { markdown: string }) {
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
    <p className="text-sm leading-relaxed text-slate-600">
      <span className="font-semibold text-slate-900">The read: </span>
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
  )
}
