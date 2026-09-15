"use client"

import { motion } from "framer-motion"
import { Card, cn } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { competitorComparisons, competitorOptions, youScore } from "./data"
import { GapTable } from "./gap-table"
import { BandHeading, InsightRead, PanelHeader } from "./shared"

interface CompetitorCompareProps {
  competitorId: string
  onCompetitorChange: (id: string) => void
}

export function CompetitorCompare({
  competitorId,
  onCompetitorChange,
}: CompetitorCompareProps) {
  const comparison =
    competitorComparisons.find((item) => item.competitorId === competitorId) ??
    competitorComparisons[0]
  const competitor =
    competitorOptions.find((item) => item.id === comparison.competitorId) ??
    competitorOptions[0]
  const ahead = comparison.gapPts > 0

  return (
    <section className="flex flex-col gap-5">
      <BandHeading
        title="Competitors"
        description="Head-to-head against a named brand on the same topics."
      />

      <Card className="overflow-hidden rounded-2xl border border-border-default bg-white !shadow-brand-soft">
        <div className="px-5 pt-5">
          <PanelHeader
            title="Named competitor comparison"
            description="Pick a competitor to see where you are ahead or behind."
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {competitorOptions.map((option) => {
              const active = option.id === competitorId
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onCompetitorChange(option.id)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-colors",
                    active
                      ? "bg-brand-50 text-brand-800 ring-brand-200"
                      : "bg-surface text-slate-600 ring-slate-200 hover:bg-slate-50",
                  )}
                >
                  {option.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5 py-5">
          <p className="text-sm font-semibold text-slate-900">Overall AI-shelf score</p>
          <ScoreRow label="Acme Pet Co." score={youScore} highlight />
          <ScoreRow label={competitor.name} score={comparison.themScore} />
          <p className="text-sm text-fg-secondary">
            {comparison.summary}
            <span className="ml-2 text-xs font-medium text-success-700">
              gap {ahead ? "widened" : "narrowed"} {comparison.gapDeltaPts} pts vs.
              previous
            </span>
          </p>
        </div>

        <GapTable competitorName={competitor.name} rows={comparison.rows} />

        <div className="px-5 py-5">
          <InsightRead markdown={comparison.read} />
        </div>
      </Card>
    </section>
  )
}

function ScoreRow({
  label,
  score,
  highlight,
}: {
  label: string
  score: number
  highlight?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <p className="w-40 shrink-0 truncate text-sm text-fg-secondary">{label}</p>
      <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className={cn("h-full rounded-full", highlight ? "bg-brand-500" : "bg-slate-300")}
          initial={false}
          animate={{ width: `${score}%` }}
          transition={{ duration: DURATION.draw, ease: EASE_OUT }}
        />
      </div>
      <p className="w-10 text-right text-sm font-semibold tabular-nums text-fg-primary">
        {score}
      </p>
    </div>
  )
}
