"use client"

import { fadeRiseLand } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { AnalystQuickJobsCard } from "./analyst-quick-jobs-card"
import { RevealGroup, RevealItem } from "./reveal"
import { SeasonalChecklistCard } from "./seasonal-checklist-card"

/**
 * Seasonal up-next + two quick jobs.
 * Lands after the section heading: primary card first, then the jobs column.
 */
export function AnalystWeekStrip({ className }: { className?: string }) {
  return (
    <RevealGroup
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] sm:items-stretch",
        className,
      )}
      delay={0.16}
      stagger={0.14}
    >
      <RevealItem variants={fadeRiseLand} className="min-h-0 h-full">
        <SeasonalChecklistCard className="h-full" />
      </RevealItem>
      <RevealItem variants={fadeRiseLand} className="min-h-0 h-full">
        <AnalystQuickJobsCard className="h-full" />
      </RevealItem>
    </RevealGroup>
  )
}
