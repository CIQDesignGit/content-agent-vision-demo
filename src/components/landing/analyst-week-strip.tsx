"use client"

import { cn } from "@/lib/utils"
import { AnalystQueueStats } from "./analyst-queue-stats"
import { SeasonalChecklistCard } from "./seasonal-checklist-card"

/** Seasonal up-next + review queue — secondary to the task accordion. */
export function AnalystWeekStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:items-stretch",
        className,
      )}
    >
      <SeasonalChecklistCard />
      <AnalystQueueStats />
    </div>
  )
}
