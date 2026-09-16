export type AidMethod = "ab" | "model" | "resumed"

export interface AidFootnote {
  variant: "method" | "zero"
  text: string
}

export interface AidAbResult {
  originalVisitors: number
  originalRate: number
  originalUnits: number
  challengerVisitors: number
  challengerRate: number
  challengerUnits: number
  confidenceTone: "strong" | "mild" | "weak"
  confidencePct: number
  testWindowLabel: string
  publishedOnLabel: string
  claimRateLabel: string
  activeForLabel: string
  incrementalSalesLabel: string
  incrementalUnits: number
  footnote: AidFootnote
}

export interface AidCalcRow {
  key: string
  label: string
  operator?: string
  value: string
  variant?: "derived" | "residual" | "valued"
}

export interface AidContextStat {
  label: string
  value: string
  tone?: "pos" | "neg"
  sub: string
}

export interface AidModelResult {
  methodLineText: string
  contextStats: AidContextStat[]
  calcRows: AidCalcRow[]
  confidencePct: number
  sustainedLabel: string
  confoundLabel: string
  coChangesLabel: string
  whyNotHigherLabel: string
  whyNotHigherText: string
  whatNotText: string
  windowsNoteText: string
}

export interface AidResumedResult {
  whyText: string
  rateInheritedFromLabel: string
  evidenceRefLabel: string
  claimRateLabel: string
  activeForLabel: string
  incrementalSalesLabel: string
  incrementalUnits: number
  methodLineText: string
}

export interface AidDiffSegment {
  text: string
  ins?: boolean
}

export interface AidTextSegment {
  text: string
  bold?: boolean
}

export interface AidDiffLine {
  incumbent: string
  challenger: AidDiffSegment[]
}

export interface AidDiff {
  incumbentNote: string
  challengerNote: string
  lines: AidDiffLine[]
}

export interface AidCycle {
  key: string
  label: string
  periodLabel: string
  field: string
  method: AidMethod
  verdictLabel: string
  verdictTone: "won" | "model" | "resumed"
  rateLabel: string
  rateTone: "pos" | "neg" | "inherited"
  lifetimeCents: number
  inPeriodLabel: string
  status: "active" | "ended"
  startDate: string
  endDate: string
  color: string
  ab?: AidAbResult
  model?: AidModelResult
  resumed?: AidResumedResult
  diff?: AidDiff
  noDiffNote?: string
}

export interface AidDetail {
  asin: string
  productName: string
  brand: string
  category: string
  thumbnailEmoji: string
  /** Local /public path to a real product photo; falls back to thumbnailEmoji when absent. */
  thumbnailUrl?: string
  dateRangeLabel: string
  currentMethod: AidMethod
  allTimeSalesCents: number
  inPeriodSalesLine: AidTextSegment[]
  dailyRunRateLabel: string
  cyclesFootnote: string
  currentLiftLabel: string
  currentRateFromToLabel: string
  currentCycleSourceLabel: string
  aiVisibilityDeltaLabel: string
  aiVisibilityRangeLine: AidTextSegment[]
  aiVisibilityFootnote: string
  allTimeUnits: number
  inPeriodUnitsLine: AidTextSegment[]
  cycles: AidCycle[]
  nextQueuedText: string
}
