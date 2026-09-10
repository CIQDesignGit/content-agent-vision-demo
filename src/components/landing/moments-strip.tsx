"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpRight, CalendarDays } from "lucide-react"
import { Button, cn } from "@ciq-dev/ciq-design-system"
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
    <div className="overflow-hidden rounded-2xl border border-border-default bg-surface shadow-sm">
      <div
        role="tablist"
        aria-label="Upcoming moments"
        className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3"
      >
        {moments.map((moment) => {
          const active = selectedId === moment.id
          return (
            <button
              key={moment.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() =>
                setSelectedId((prev) => (prev === moment.id ? null : moment.id))
              }
              className={cn(
                "group rounded-xl border p-5 text-left transition-all",
                active
                  ? "border-action-primary bg-brand-25"
                  : "border-border-default bg-surface hover:border-brand-200 hover:bg-surface-muted",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="type-title text-fg-primary">{moment.name}</p>
                <span className="inline-flex shrink-0 items-center gap-1.5 type-caption text-fg-tertiary">
                  {moment.daysUntil <= 10 ? (
                    <span className="relative flex size-1.5 shrink-0" aria-hidden>
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-feedback-danger opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-feedback-danger" />
                    </span>
                  ) : null}
                  <CalendarDays className="size-3.5" aria-hidden />
                  In {moment.daysUntil} days
                </span>
              </div>
              <p className="mt-2 font-sans text-3xl font-semibold tracking-tight text-fg-brand tabular-nums">
                {moment.valueLabel}
              </p>
              <p className="mt-2 text-xs text-fg-tertiary">
                {moment.skuCount.toLocaleString()} SKUs need review to unlock
                this
              </p>
            </button>
          )
        })}
      </div>

      {selected ? (
        <div
          role="tabpanel"
          className="flex flex-col gap-6 px-6 pb-6 pt-2"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="type-title text-fg-primary">
                {selected.name} · AI insights
              </h3>
              <p className="mt-1.5 text-xs text-fg-tertiary">
                {selected.skuCount.toLocaleString()} SKUs need review ·{" "}
                {selected.valueLabel} opportunity · {selected.daysUntil} days
                out
              </p>
            </div>
            <Button
              size="sm"
              className="shrink-0 bg-brand-800 text-action-primary-fg hover:bg-brand-900 focus:outline-brand-800"
              onClick={() => router.push(`/workbench?moment=${selected.id}`)}
            >
              Take Action
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Button>
          </div>

          <p className="max-w-3xl type-body-lg text-fg-primary">
            {selected.commonIssues}
          </p>

          <DimensionRow dimensions={selected.dimensions} />
        </div>
      ) : null}
    </div>
  )
}
