export type ConfidenceLevel = "high" | "med" | "low"

export type PillarKind = "foundational" | "seasonal" | "aeo"

export type OpportunityStatusKind =
  | "captured"
  | "seasonal"
  | "pdp"
  | "opportunity"
  | "expired"

export type OpportunityViewMode = "status" | "driver"

export interface OpportunityMeterData {
  identifiedMillions: number
  realizedMillions: number
  /** Year / period shown in the overview headline */
  yearLabel: string
}

export interface OpportunityStatusSegment {
  id: OpportunityStatusKind
  label: string
  amountLabel: string
  millions: number
  /** Shown in the legend info tooltip */
  tooltip: string
  /** Muted figure — used for expired / out-of-total buckets */
  muted?: boolean
}

export interface SecondaryStat {
  id: string
  label: string
  value: string
  delta?: string
}

export interface LostToInactionData {
  amountLabel: string
  eventName: string
  eventDateLabel: string
  support: string
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
  note?: string
}

export type CalendarDriverKind = PillarKind

export interface CalendarSkuFinding {
  id: string
  name: string
  asin: string
  /** Product thumbnail — use placehold.co when no real asset */
  imageUrl: string
  finding: string
  driver: CalendarDriverKind
  driverLabel: string
  impactLabel: string
}

export type CalendarMarkerKind = "today" | "active" | "upcoming"

export interface CalendarTimelineMarker {
  id: string
  label: string
  /** 0–100 position along the timeline */
  position: number
  kind: CalendarMarkerKind
}

export type CalendarEventStatus = "open" | "captured" | "forfeited"

export interface CalendarEvent {
  id: string
  name: string
  valueLabel: string
  skuCount: number
  status: CalendarEventStatus
  /** Publish-by or window-closed date label (e.g. "Sep 15") */
  dateLabel: string
  /** Days remaining to publish — open events only */
  daysToAct?: number
  /** Agent insight shown in the expanded panel */
  insightSummary?: string
  dimensions?: MomentDimensionInsight[]
  skuFindings?: CalendarSkuFinding[]
  remainingCount?: number
  remainingValueLabel?: string
}

export interface UpcomingMoment {
  id: string
  name: string
  valueLabel: string
  daysUntil: number
  skuCount: number
  commonIssues: string
  dimensions: MomentDimensionInsight[]
}

/** Single queued moment in the Up next accordion */
export interface UpNextActionItem {
  id: string
  name: string
  valueLabel: string
  publishBy: string
  skuCount: number
  goesLiveNote: string
}

export interface UpNextData {
  items: UpNextActionItem[]
}

export type OpportunityStreamKind = "retail-readiness" | "seasonal" | "pdp"

export type StreamFindingType = "SEO" | "AEO"

export interface OpportunityStreamSku {
  id: string
  name: string
  asin: string
  finding: string
  /** Dollar impact in thousands (e.g. 84 → $84K, 8.9 → $8.9K) */
  impactThousands: number
  findingType?: StreamFindingType
}

export interface OpportunityStream {
  id: OpportunityStreamKind
  title: string
  /** Middle-column context when collapsed (and beside title when expanded) */
  context: string
  /** Highlighted suffix inside context — e.g. "5 days to act" */
  contextHighlight?: string
  skuCount: number
  valueLabel: string
  valueKind: "blocked" | "potential"
  tone: "warning" | "default"
  /** Markdown string; use **bold** for metrics and keywords */
  insight: string
  queueNote?: string
  remainingLabel: string
  rows: OpportunityStreamSku[]
  /** Retail-readiness only — catalog % that is already ready */
  readyPercent?: number
}
