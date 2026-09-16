"use client"

import { motion } from "framer-motion"
import { Card, cn } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { promptRows, promptsRead } from "./data"
import { MiniSparkline } from "./mini-sparkline"
import { SegmentedControl } from "./segmented-control"
import { BandHeading, InsightRead, PanelHeader, trackingCardClass } from "./shared"
import type { PromptFilter } from "./types"

interface PromptPerformanceProps {
  filter: PromptFilter
  topicId: string | null
  onFilterChange: (filter: PromptFilter) => void
}

function matchesFilter(change: number | null, filter: PromptFilter) {
  if (filter === "all") return true
  if (filter === "winning") return (change ?? 0) > 0
  return (change ?? 0) < 0 || change == null
}

export function PromptPerformance({
  filter,
  topicId,
  onFilterChange,
}: PromptPerformanceProps) {
  const rows = promptRows.filter((row) => {
    if (topicId && row.topicId !== topicId) return false
    return matchesFilter(row.change, filter)
  })

  return (
    <section id="prompt-performance" className="flex scroll-mt-8 flex-col gap-5">
      <BandHeading
        title="Prompts"
        description="Every candle question Alexa AI was asked this period."
      />

      <Card className={trackingCardClass}>
        <div className="px-5 pt-5 pb-4">
          <PanelHeader
            title="Prompt performance"
            description="Appearance rate is the share of weeks the brand surfaced."
            action={
              <SegmentedControl
                value={filter}
                onChange={onFilterChange}
                ariaLabel="Filter prompts"
                layoutId="prompt-filter-thumb"
                options={[
                  { id: "losing", label: "Losing" },
                  { id: "all", label: "All" },
                  { id: "winning", label: "Winning" },
                ]}
              />
            }
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/80">
                <th className="px-5 py-3 text-xs font-medium text-slate-500">
                  Shopper question
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500">Topic</th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500">
                  Appearance rate
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500">Trend</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-slate-500">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const tone =
                  (row.change ?? 0) > 0
                    ? "up"
                    : (row.change ?? 0) < 0 || row.appearanceRate === 0
                      ? "down"
                      : "flat"
                return (
                  <tr key={row.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-fg-primary">{row.question}</p>
                        {row.isGap ? (
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                            Gap
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-fg-secondary">{row.topic}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <motion.span
                            className="block h-full rounded-full bg-info-500"
                            initial={false}
                            animate={{ width: `${row.appearanceRate}%` }}
                            transition={{ duration: DURATION.draw, ease: EASE_OUT }}
                          />
                        </div>
                        <span className="text-xs font-medium tabular-nums text-fg-secondary">
                          {row.appearanceRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <MiniSparkline values={row.trend} tone={tone} />
                    </td>
                    <td
                      className={cn(
                        "px-5 py-3.5 text-right text-sm font-medium tabular-nums",
                        tone === "up" && "text-success-700",
                        tone === "down" && "text-error-700",
                        tone === "flat" && "text-slate-400",
                      )}
                    >
                      {row.change == null
                        ? "—"
                        : `${row.change > 0 ? "▲" : "▼"} ${Math.abs(row.change)} pts`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-5">
          <InsightRead markdown={promptsRead} />
        </div>
      </Card>
    </section>
  )
}
