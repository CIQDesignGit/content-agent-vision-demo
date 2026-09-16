"use client"

import { useMemo, useState } from "react"
import { MotionConfig } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { calendarEvents } from "@/components/landing/data"
import { RevealGroup, RevealItem } from "@/components/landing/reveal"
import {
  IMPACT_ACTIONED_SKU_COUNT,
  buildImpactRowsFromEvent,
} from "./build-impact-rows"
import { impactSummary } from "./data"
import { ImpactContextTitle } from "./impact-context-title"
import { ImpactMetricCard } from "./impact-metric-cards"
import { ImpactTable } from "./impact-table"
import { ImpactToolbar } from "./impact-toolbar"
import type { ImpactMetricCard as ImpactMetricCardData, ImpactRow } from "./types"

function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function buildScopedMetrics(
  base: ImpactMetricCardData[],
  rows: ImpactRow[],
  opportunityValueLabel?: string,
): ImpactMetricCardData[] {
  const salesCents = rows.reduce((sum, row) => sum + row.impactCents, 0)
  const asinCount = rows.length

  return [
    {
      ...base[0],
      value: opportunityValueLabel ?? formatUsd(salesCents),
      supportLead: undefined,
      supportLeadTone: undefined,
      support:
        opportunityValueLabel != null
          ? "Opportunity impact"
          : `${asinCount} ASINs in selection`,
    },
    base[1],
    base[2],
    base[3],
  ]
}

export function ImpactView() {
  const searchParams = useSearchParams()
  const momentId = searchParams.get("moment")
  const [selectedBrand, setSelectedBrand] = useState("All Brands")
  const [brandMomentId, setBrandMomentId] = useState(momentId)
  if (momentId !== brandMomentId) {
    setBrandMomentId(momentId)
    setSelectedBrand("All Brands")
  }

  const activeEvent = useMemo(
    () => calendarEvents.find((event) => event.id === momentId) ?? null,
    [momentId],
  )

  const contextRows = useMemo(
    () => (activeEvent ? buildImpactRowsFromEvent(activeEvent) : null),
    [activeEvent],
  )

  const sourceRows = contextRows ?? impactSummary.rows

  const filteredRows = useMemo(() => {
    if (selectedBrand === "All Brands") return sourceRows
    return sourceRows.filter((row) => row.brand === selectedBrand)
  }, [selectedBrand, sourceRows])

  const metrics = useMemo(() => {
    if (!activeEvent && filteredRows.length === impactSummary.rows.length) {
      return impactSummary.metrics
    }
    return buildScopedMetrics(
      impactSummary.metrics,
      filteredRows,
      activeEvent && selectedBrand === "All Brands"
        ? activeEvent.valueLabel
        : undefined,
    )
  }, [activeEvent, filteredRows, selectedBrand])

  const brandOptions = useMemo(() => {
    if (!contextRows) return impactSummary.brands
    const brands = Array.from(new Set(contextRows.map((row) => row.brand)))
    return ["All Brands", ...brands]
  }, [contextRows])

  const metricsRevealDelay = activeEvent ? 0.46 : 0.28
  const metricStagger = 0.14
  // Table follows the last metric card in the entrance sequence (not scroll).
  const tableRevealDelay =
    metricsRevealDelay + Math.max(0, metrics.length - 1) * metricStagger + 0.18

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex w-full flex-col">
        <RevealGroup delay={0.06} stagger={0.06}>
          <RevealItem>
            <div className="flex h-12 shrink-0 items-center border-t border-slate-200 px-6">
              <ImpactToolbar
                brands={brandOptions}
                selectedBrand={selectedBrand}
                onBrandChange={setSelectedBrand}
              />
            </div>
          </RevealItem>
        </RevealGroup>

        <div className="flex flex-1 flex-col gap-4 bg-slate-100 px-6 pb-6">
          {activeEvent ? (
            <RevealGroup delay={0.28} stagger={0.06}>
              <RevealItem>
                <ImpactContextTitle
                  opportunityName={activeEvent.name}
                  valueLabel={activeEvent.valueLabel}
                  skuCount={
                    selectedBrand === "All Brands"
                      ? IMPACT_ACTIONED_SKU_COUNT
                      : filteredRows.length
                  }
                />
              </RevealItem>
            </RevealGroup>
          ) : null}

          <RevealGroup
            aria-label="Impact metrics"
            className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4"
            delay={metricsRevealDelay}
            stagger={metricStagger}
          >
            {metrics.map((metric) => (
              <RevealItem key={metric.id} className="min-w-0">
                <ImpactMetricCard metric={metric} />
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup delay={tableRevealDelay} stagger={0.06} className="flex flex-col">
            <RevealItem>
              <ImpactTable rows={filteredRows} />
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </MotionConfig>
  )
}
