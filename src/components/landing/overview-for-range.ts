import {
  opportunityByStatus,
  opportunityCalculation,
  opportunityMeter,
  opportunityStreams,
  secondaryStats,
  upNext,
} from "./data"
import { dateRangesForYear, resolveDateRange } from "./date-range"
import type { CapturedLiftSplit } from "./with-overview-figures"
import type {
  OpportunityCalculationData,
  OpportunityMeterData,
  OpportunityStatusSegment,
  OpportunityStream,
  SecondaryStat,
  UpNextData,
} from "./types"
import { lastYearOverview } from "./periods/last-year"
import { q1Overview } from "./periods/q1"
import { q2Overview } from "./periods/q2"
import { q3Overview } from "./periods/q3"
import { q4Overview } from "./periods/q4"

export interface OverviewSnapshot {
  meter: OpportunityMeterData
  status: OpportunityStatusSegment[]
  calculation: OpportunityCalculationData
  secondaryStats: SecondaryStat[]
  upNext: UpNextData
  streams: OpportunityStream[]
  capturedSplit: CapturedLiftSplit
}

/** Existing year seed. Dollar figures stay as authored in data.ts. */
const thisYearOverview: OverviewSnapshot = {
  meter: opportunityMeter,
  status: opportunityByStatus,
  calculation: opportunityCalculation,
  secondaryStats,
  upNext,
  streams: opportunityStreams,
  capturedSplit: { foundationalMillions: 0.6, seasonalMillions: 0.2 },
}

const snapshots: Record<string, OverviewSnapshot> = {
  "this-year": thisYearOverview,
  q1: q1Overview,
  q2: q2Overview,
  q3: q3Overview,
  q4: q4Overview,
  "last-year": lastYearOverview,
}

function stampSpan(snapshot: OverviewSnapshot, span: string): OverviewSnapshot {
  return {
    ...snapshot,
    meter: { ...snapshot.meter, periodLabel: span },
    calculation: {
      annualized: { ...snapshot.calculation.annualized, periodBadge: span },
      valueRealized: {
        ...snapshot.calculation.valueRealized,
        periodBadge: span,
      },
    },
  }
}

export function overviewForRange(
  rangeId: string | null | undefined,
  year = new Date().getFullYear(),
): OverviewSnapshot {
  const range = resolveDateRange(rangeId, year)
  const snapshot = snapshots[range.id] ?? thisYearOverview
  const span =
    dateRangesForYear(year).find((option) => option.id === range.id)?.span ??
    range.span
  return stampSpan(snapshot, span)
}
