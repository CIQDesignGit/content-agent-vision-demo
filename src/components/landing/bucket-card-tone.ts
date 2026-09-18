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
  upNext: boolean
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

export function isUpNextBucket(bucket: OpportunityStreamBucket): boolean {
  return Boolean(bucket.badge && /up next/i.test(bucket.badge))
}

/**
 * A closed window is settled history — each job either shipped or it didn't,
 * so the card reads green or grey instead of advertising work to do.
 */
export function bucketCardTone({
  bucket,
  streamId,
  windowClosed,
}: {
  bucket: OpportunityStreamBucket
  streamId: OpportunityStreamKind
  blocked?: boolean
  windowClosed: boolean
}): BucketCardTone {
  const needsInput = bucket.fillMode === "input"
  const captured = windowClosed && bucket.outcome === "captured"
  const missed = windowClosed && !captured
  const upNext = isUpNextBucket(bucket)

  if (captured) {
    return {
      captured,
      missed,
      upNext,
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
      upNext,
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
    upNext,
    chipLabel: bucket.badge
      ? bucket.badge
      : needsInput
        ? "Needs your input"
        : streamId === "seasonal"
          ? "Agent drafts"
          : "Agent fills",
    ChipIcon: needsInput ? UserRound : Sparkles,
    surface: upNext
      ? "bg-white ring-1 ring-amber-200/50 shadow-pane transition-shadow duration-200 group-hover:shadow-pane-hover"
      : "bg-slate-50 ring-1 ring-slate-200/80",
    hover: upNext ? "" : "group-hover:bg-brand-25",
    chip: bucket.badge
      ? upNext
        ? "bg-amber-100/90 text-amber-900 normal-case tracking-normal"
        : "bg-brand-100 text-brand-800 normal-case tracking-normal"
      : needsInput
        ? "bg-brand-100 text-brand-700 normal-case tracking-normal"
        : "bg-brand-100 text-brand-700",
    arrowHover: "group-hover:text-brand-600",
    value: "text-slate-950",
    title: "text-slate-700",
    skuCount: "text-slate-900",
    metaLabel: bucket.fillTime,
    footer: upNext
      ? "border-t border-amber-100/70 bg-warning-50/90 group-hover:border-amber-200/80 group-hover:bg-warning-100/50"
      : "bg-slate-100/70 group-hover:bg-brand-50 group-hover:text-brand-950",
  }
}
