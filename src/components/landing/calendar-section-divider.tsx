"use client"

import {
  CalendarDays,
  CircleCheck,
  CircleSlash,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"

export type CalendarSectionTone = "upcoming" | "captured" | "forfeited"

const SECTION_TONE: Record<
  CalendarSectionTone,
  { chip: string; line: string; icon: LucideIcon }
> = {
  upcoming: {
    chip: "bg-brand-50 text-brand-800",
    line: "bg-brand-100",
    icon: CalendarDays,
  },
  captured: {
    chip: "bg-emerald-50 text-emerald-800",
    line: "bg-emerald-100",
    icon: CircleCheck,
  },
  forfeited: {
    chip: "bg-slate-100 text-slate-600",
    line: "bg-slate-200",
    icon: CircleSlash,
  },
}

export function CalendarSectionDivider({
  label,
  count,
  tone,
}: {
  label: string
  count: number
  tone: CalendarSectionTone
}) {
  const style = SECTION_TONE[tone]
  const Icon = style.icon

  return (
    <div className="flex items-center gap-3" role="separator">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
          style.chip,
        )}
      >
        <Icon className="size-3.5" aria-hidden />
        {label}
        <span className="font-mono tabular-nums opacity-70">{count}</span>
      </span>
      <span className={cn("h-px flex-1", style.line)} aria-hidden />
    </div>
  )
}
