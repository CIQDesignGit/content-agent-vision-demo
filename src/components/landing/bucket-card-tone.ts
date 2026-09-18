import {
  CheckCircle2,
  CircleSlash,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react"
import type { OpportunityStreamBucket, OpportunityStreamKind } from "./types"

export interface BucketCardTone {
  captured: boolean
  missed: boolean
  chipLabel: string
  ChipIcon: LucideIcon
  surface: string
  hover: string
  chip: string
  arrowHover: string
  value: string
  title: string
  skuCount: string
  metaLabel: string
  footer: string
}

/**
 * A closed window is settled history — each job either shipped or it didn't,
 * so the card reads green or grey instead of advertising work to do.
 */
export function bucketCardTone({
  bucket,
  streamId,
  blocked,
  windowClosed,
}: {
  bucket: OpportunityStreamBucket
  streamId: OpportunityStreamKind
  blocked: boolean
  windowClosed: boolean
}): BucketCardTone {
  const needsInput = bucket.fillMode === "input"
  const captured = windowClosed && bucket.outcome === "captured"
  const missed = windowClosed && !captured

  if (captured) {
    return {
      captured,
      missed,
      chipLabel: "Captured",
      ChipIcon: CheckCircle2,
      surface: "bg-success-50",
      hover: "group-hover:bg-success-100",
      chip: "bg-success-100 text-success-700",
      arrowHover: "group-hover:text-success-600",
      value: "text-success-800",
      title: "text-slate-700",
      skuCount: "text-slate-900",
      metaLabel: "Published in window",
      footer: "bg-success-100/60 group-hover:bg-success-100",
    }
  }

  if (missed) {
    return {
      captured,
      missed,
      chipLabel: "Missed",
      ChipIcon: CircleSlash,
      surface: "bg-slate-50",
      hover: "group-hover:bg-slate-100",
      chip: "bg-slate-200 text-slate-600",
      arrowHover: "group-hover:text-slate-600",
      value: "text-slate-400",
      title: "text-slate-500",
      skuCount: "text-slate-500",
      metaLabel: "Window closed unpublished",
      footer: "bg-slate-100/70 group-hover:bg-slate-200/70",
    }
  }

  return {
    captured,
    missed,
    chipLabel: bucket.badge
      ? bucket.badge
      : needsInput
        ? "Needs you"
        : streamId === "seasonal"
          ? "Agent drafts"
          : "Agent fills",
    ChipIcon: needsInput ? UserRound : Sparkles,
    surface:
      bucket.badge && /up next/i.test(bucket.badge)
        ? "bg-brand-25"
        : "bg-slate-50",
    hover:
      bucket.badge && /up next/i.test(bucket.badge)
        ? "group-hover:bg-brand-50"
        : blocked
          ? "group-hover:bg-warning-50"
          : "group-hover:bg-brand-25",
    chip: bucket.badge
      ? /up next/i.test(bucket.badge)
        ? "bg-brand-100 text-brand-700 normal-case tracking-normal"
        : "bg-warning-100 text-warning-800 normal-case tracking-normal"
      : needsInput
        ? "bg-warning-100 text-warning-700"
        : "bg-brand-100 text-brand-700",
    arrowHover: blocked
      ? "group-hover:text-warning-600"
      : "group-hover:text-brand-600",
    value: "text-slate-950",
    title: "text-slate-700",
    skuCount: "text-slate-900",
    metaLabel: bucket.fillTime,
    footer: bucket.badge && /up next/i.test(bucket.badge)
      ? "bg-brand-50/80 group-hover:bg-brand-100 group-hover:text-brand-950"
      : blocked
        ? "bg-slate-100/70 group-hover:bg-warning-100 group-hover:text-slate-600"
        : "bg-slate-100/70 group-hover:bg-brand-50 group-hover:text-brand-950",
  }
}
