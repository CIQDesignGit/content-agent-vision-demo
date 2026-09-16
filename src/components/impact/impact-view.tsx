"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { calendarEvents } from "@/components/landing/data"
import {
  IMPACT_ACTIONED_SKU_COUNT,
  buildImpactRowsFromEvent,
} from "./build-impact-rows"
import { impactSummary } from "./data"
import { ImpactContextTitle } from "./impact-context-title"
import { ImpactMetricCards } from "./impact-metric-cards"
import { ImpactTable } from "./impact-table"
import { ImpactToolbar } from "./impact-toolbar"
import type { ImpactMetricCard, ImpactRow } from "./types"

function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function buildScopedMetrics(
  base: ImpactMetricCard[],
  rows: ImpactRow[],
  opportunityValueLabel?: string,
): ImpactMetricCard[] {
  const salesCents = rows.reduce((sum, row) => sum + row.impactCents, 0)
  const asinCount = rows.length
  const avgCents = asinCount > 0 ? Math.round(salesCents / asinCount) : 0
  const units = Math.max(120, asinCount * 38)

  return [
    {
      ...base[0],
      value: opportunityValueLabel ?? formatUsd(salesCents),
      supportLead: undefined,
      support:
        opportunityValueLabel != null
          ? "Opportunity impact"
          : `${asinCount} ASINs in selection`,
    },
    {
      ...base[1],
      value: units.toLocaleString("en-US"),
      support: "Across measurable events",
    },
    {
      ...base[2],
      value: formatUsd(avgCents),
      support: `${asinCount}/${asinCount} ASINs measurable`,
    },
    {
      ...base[3],
      value: String(asinCount),
      support: `Actioned on ${asinCount} ASINs`,
    },
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

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-6 pb-6">
      {activeEvent ? (
        <ImpactContextTitle
          opportunityName={activeEvent.name}
          valueLabel={activeEvent.valueLabel}
          skuCount={
            selectedBrand === "All Brands"
              ? IMPACT_ACTIONED_SKU_COUNT
              : filteredRows.length
          }
        />
      ) : null}

      <ImpactToolbar
        dateRangeLabel={impactSummary.dateRangeLabel}
        brands={brandOptions}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
      />
      <div className="flex flex-col gap-5">
        <ImpactMetricCards metrics={metrics} />
        <ImpactTable rows={filteredRows} />
      </div>
    </div>
  )
}
