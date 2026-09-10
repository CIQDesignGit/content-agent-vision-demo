export type ConfidenceLevel = "high" | "med" | "low"

export type PillarKind = "foundational" | "seasonal" | "aeo"

export interface OpportunityMeterData {
  identifiedMillions: number
  realizedMillions: number
  updatedLabel: string
  rolloutLabel: string
}

export interface SecondaryStat {
  id: string
  label: string
  value: string
  delta?: string
}

export interface ValuePillar {
  id: string
  kind: PillarKind
  title: string
  displayValue: string
  tag?: { label: string; tone: "neutral" | "recurring" }
  support: string
  confidence: ConfidenceLevel
  methodology: string
  benchmark?: string
  sparkline?: number[]
}

export interface MomentDimensionInsight {
  kind: PillarKind
  label: string
  potential: string
  /** Numeric millions for bar scaling */
  potentialMillions: number
  note: string
}

export interface UpcomingMoment {
  id: string
  name: string
  valueLabel: string
  daysUntil: number
  /** SKUs still needing review for this moment */
  skuCount: number
  /** AI summary of the most common content issues */
  commonIssues: string
  /** Potential improvement across the three value dimensions */
  dimensions: MomentDimensionInsight[]
}

