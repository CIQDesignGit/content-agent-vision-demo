"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  Info,
  PartyPopper,
  Trophy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { AbBatch, AbBatchSkuRow } from "./ab-batches-data"

const SKU_TABLE_PAGE_SIZE = 5

function money(cents: number): string {
  const sign = cents < 0 ? "-" : ""
  return `${sign}$${Math.round(Math.abs(cents) / 100).toLocaleString("en-US")}`
}

function liftPct(row: AbBatchSkuRow): number {
  return (row.afterRatePct / row.beforeRatePct - 1) * 100
}

function topPerformer(rows: AbBatchSkuRow[]): AbBatchSkuRow {
  return rows.reduce((best, row) => (liftPct(row) > liftPct(best) ? row : best))
}

function WinRatioBar({ wins, skuCount }: { wins: number; skuCount: number }) {
  const pct = Math.round((wins / skuCount) * 100)
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="text-sm font-semibold tabular-nums text-slate-900">
        {wins}/{skuCount}
      </span>
      <div className="h-1 w-14 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-success-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: AbBatch["status"] }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand-500" />
        </span>
        Running
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-[11px] font-semibold text-success-700">
      <CircleCheck className="size-3" aria-hidden />
      Ended
    </span>
  )
}

interface AbBatchCardProps {
  batch: AbBatch
  open: boolean
  onToggle: () => void
}

export function AbBatchCard({ batch, open, onToggle }: AbBatchCardProps) {
  const [showAllSkus, setShowAllSkus] = useState(false)
  const best = topPerformer(batch.rows)
  const bestLift = liftPct(best)
  const hasMoreSkus = batch.rows.length > SKU_TABLE_PAGE_SIZE
  const visibleRows =
    hasMoreSkus && !showAllSkus ? batch.rows.slice(0, SKU_TABLE_PAGE_SIZE) : batch.rows

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl bg-white/80 ring-1 shadow-pane-lg backdrop-blur-md",
        batch.pilot ? "ring-brand-200" : "ring-slate-900/6",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-6 py-4 text-left"
      >
        <ChevronRight
          className={cn("size-4 shrink-0 text-slate-400 transition-transform", open && "rotate-90")}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">{batch.name}</h3>
            {batch.pilot ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-warning-100 to-brand-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-brand-700 uppercase">
                <Trophy className="size-3" aria-hidden />
                Pilot
              </span>
            ) : null}
            <StatusPill status={batch.status} />
          </div>
          <p className="mt-0.5 truncate text-xs text-slate-400">{batch.whenLabel}</p>
        </div>

        <div className="hidden shrink-0 items-center gap-6 sm:flex">
          <div className="text-right">
            <p className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">Won</p>
            <WinRatioBar wins={batch.wins} skuCount={batch.skuCount} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">Pooled lift</p>
            <p className="text-sm font-semibold tabular-nums text-success-700">+{batch.pooledLiftPct}%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">Gain</p>
            <p className="text-sm font-semibold tabular-nums text-slate-900">{money(batch.gainCents)}</p>
          </div>
        </div>
      </button>

      {open ? (
        <div className="border-t border-slate-100 px-6 py-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {batch.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-slate-50 px-3 py-2.5">
                <p className="text-base font-semibold tabular-nums text-slate-900">{stat.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-600">{stat.label}</p>
                <p className="text-[10.5px] text-slate-400">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-warning-200 bg-gradient-to-r from-warning-50 to-brand-50/60 px-4 py-2.5 text-sm">
            <Trophy className="size-4 shrink-0 text-warning-600" aria-hidden />
            <span className="font-semibold text-slate-900">Top performer</span>
            <span className="min-w-0 truncate text-slate-600">{best.name}</span>
            <span className="ml-auto shrink-0 text-sm font-semibold tabular-nums text-success-700">
              +{bestLift.toFixed(1)}% conversion
            </span>
          </div>

          {batch.findings.length > 0 ? (
            <div className="mt-4">
              <h4 className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">Key findings</h4>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-slate-600">
                {batch.findings.map((finding) => (
                  <li key={finding}>{finding}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {batch.impact ? (
            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/60 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-brand-600 uppercase">
                <PartyPopper className="size-3.5" aria-hidden />
                Sales impact
              </p>
              <p className="mt-1.5 text-sm text-slate-700">{batch.impact.text}</p>
              <p className="mt-1.5 text-xs text-slate-400 italic">{batch.impact.note}</p>
            </div>
          ) : null}

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold tracking-[0.08em] text-slate-500 uppercase">
                    <th className="px-4 py-2.5 font-semibold">SKU</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Conv. rate</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Visitors/arm</th>
                    <th className="px-4 py-2.5 text-right font-semibold">$ impact</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Units</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => {
                    const won = row.afterRatePct >= row.beforeRatePct
                    return (
                      <tr
                        key={row.asin}
                        className={cn(
                          "border-b border-slate-50 last:border-0",
                          row.asin === best.asin && "bg-warning-50/40",
                          !won && "bg-error-50/30",
                        )}
                      >
                        <td className="px-4 py-2.5 align-middle">
                          <Link
                            href={`/impact/${encodeURIComponent(row.asin)}`}
                            className="block max-w-[280px] truncate text-sm font-medium text-slate-900 hover:text-brand-600 hover:underline"
                          >
                            {row.name}
                          </Link>
                          <p className="font-mono text-[11px] text-slate-400">{row.asin}</p>
                        </td>
                        <td
                          className={cn(
                            "px-4 py-2.5 text-right align-middle text-sm tabular-nums",
                            won ? "text-success-700" : "text-error-600",
                          )}
                        >
                          {row.beforeRatePct}%<span className="mx-1 text-slate-300">→</span>
                          {row.afterRatePct}%
                        </td>
                        <td className="px-4 py-2.5 text-right align-middle text-sm tabular-nums text-slate-500">
                          {row.visitors.toLocaleString("en-US")}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-2.5 text-right align-middle text-sm font-semibold tabular-nums",
                            won ? "text-success-700" : "text-error-600",
                          )}
                        >
                          {money(row.impactCents)}
                        </td>
                        <td className="px-4 py-2.5 text-right align-middle text-sm tabular-nums text-slate-500">
                          {row.units}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {hasMoreSkus ? (
              <button
                type="button"
                onClick={() => setShowAllSkus((v) => !v)}
                className="flex w-full items-center justify-center gap-1.5 border-t border-slate-100 py-2.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-slate-50 hover:text-brand-700"
              >
                <ChevronDown className={cn("size-3.5 transition-transform", showAllSkus && "rotate-180")} aria-hidden />
                {showAllSkus ? "Show less" : `Load all ${batch.rows.length} SKUs`}
              </button>
            ) : null}
          </div>

          {batch.pendingCount ? (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="size-3.5 shrink-0" aria-hidden />
              <span>
                +{batch.pendingCount} more SKUs in this batch are still collecting traffic — no result yet.
              </span>
            </div>
          ) : null}

          {batch.rollout ? (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-brand-200 bg-brand-50/40 p-3 text-xs text-slate-600">
              <Info className="size-3.5 shrink-0 text-brand-500" aria-hidden />
              <span>{batch.rollout}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
