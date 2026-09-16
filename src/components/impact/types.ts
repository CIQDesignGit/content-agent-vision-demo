export interface ImpactMetricCard {
  id: string
  label: string
  value: string
  /** When true, render the primary value in success green. */
  valueTone?: "success" | "default"
  /** Dark accent before the muted footer (e.g. "+18%" or "—"). */
  supportLead?: string
  /** Renders supportLead with a trend arrow, colored accordingly. */
  supportLeadTone?: "up" | "down"
  support: string
}

export type ImpactAttributionApproach = "A/B test" | "Modelled"

export interface ImpactRow {
  id: string
  productName: string
  asin: string
  brand: string
  category: string
  thumbnailUrl: string
  impactLabel: string
  impactCents: number
  attributionApproach: ImpactAttributionApproach
  whatChanged: string
  changedOn: string
}

export interface ImpactSummary {
  dateRangeLabel: string
  brands: string[]
  metrics: ImpactMetricCard[]
  rows: ImpactRow[]
}
