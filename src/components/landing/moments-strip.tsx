"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpRight, CalendarDays, Sparkles } from "lucide-react"
import { Button, Card, CardContent, cn } from "@ciq-dev/ciq-design-system"
import type { MomentDimensionInsight, UpcomingMoment } from "./types"

interface MomentsStripProps {
  moments: UpcomingMoment[]
}

function DimensionRow({ dimensions }: { dimensions: MomentDimensionInsight[] }) {
  const ranked = [...dimensions].sort(
    (a, b) => b.potentialMillions - a.potentialMillions,
  )

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {ranked.map((dim) => (
        <div key={dim.kind} className="min-w-0">
          <p className="type-caption text-fg-tertiary">{dim.label}</p>
          <p className="mt-1 type-title tabular-nums tracking-tight text-fg-primary">
            {dim.potential}
          </p>
          <p className="mt-1 type-caption text-fg-tertiary">{dim.note}</p>
        </div>
      ))}
    </div>
  )
}

export function MomentsStrip({ moments }: MomentsStripProps) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(
    () => moments[0]?.id ?? null,
  )
  const selected = moments.find((m) => m.id === selectedId)

  if (moments.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {moments.map((moment) => {
          const active = selectedId === moment.id
          return (
            <button
              key={moment.id}
              type="button"
              onClick={() =>
                setSelectedId((prev) => (prev === moment.id ? null : moment.id))
              }
              className={cn(
                "group rounded-xl border bg-surface p-5 text-left transition-all",
                active
                  ? "border-action-primary bg-brand-50"
                  : "border-border-default hover:border-brand-200 hover:bg-surface-muted",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 type-caption text-fg-tertiary">
                  <CalendarDays className="size-3.5" aria-hidden />
                  In {moment.daysUntil} days
                </span>
              </div>
              <p className="mt-3 type-title text-fg-primary">{moment.name}</p>
              <p className="mt-2 font-sans text-3xl font-semibold tracking-tight text-fg-brand tabular-nums">
                {moment.valueLabel}
              </p>
              <p className="mt-2 type-caption text-fg-tertiary">
                {moment.skuCount.toLocaleString()} SKUs need review to unlock
                this
              </p>
            </button>
          )
        })}
      </div>

      {selected ? (
        <Card className="border-border-default bg-surface shadow-none">
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Sparkles
                    className="size-3.5 shrink-0 text-action-primary"
                    aria-hidden
                  />
                  <p className="type-label text-fg-primary">
                    {selected.name} · AI insights
                  </p>
                </div>
                <p className="mt-1 type-caption text-fg-tertiary">
                  {selected.skuCount.toLocaleString()} SKUs need review ·{" "}
                  {selected.valueLabel} opportunity · {selected.daysUntil} days
                  out
                </p>
              </div>
              <Button
                size="sm"
                className="shrink-0 bg-brand-800 text-action-primary-fg hover:bg-brand-900 focus:outline-brand-800"
                onClick={() =>
                  router.push(`/workbench?moment=${selected.id}`)
                }
              >
                Take Action
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Button>
            </div>

            <div>
              <p className="type-caption-strong uppercase tracking-wider text-fg-tertiary">
                Most common issues
              </p>
              <p className="mt-2 max-w-3xl type-body-lg text-fg-primary">
                {selected.commonIssues}
              </p>
            </div>

            <div>
              <p className="type-caption-strong uppercase tracking-wider text-fg-tertiary">
                Potential by dimension
              </p>
              <div className="mt-4">
                <DimensionRow dimensions={selected.dimensions} />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
