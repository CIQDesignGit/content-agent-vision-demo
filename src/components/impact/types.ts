export interface ImpactMetricCard {
  id: string
  label: string
  value: string
  /** When true, render the primary value in success green. */
  valueTone?: "success" | "default"
  /** Dark accent before the muted footer (e.g. "+18%" or "—"). */
  supportLead?: string
  support: string
}

export interface ImpactRow {
  id: string
  productName: string
  asin: string
  brand: string
  thumbnailUrl: string
  impactLabel: string
  impactCents: number
  whatChanged: string
  changedOn: string
}

export interface ImpactSummary {
  dateRangeLabel: string
  brands: string[]
  metrics: ImpactMetricCard[]
  rows: ImpactRow[]
}
