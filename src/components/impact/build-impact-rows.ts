import { candleThumbnail } from "@/lib/candle-thumbnails"
import { MOCK_SKUS } from "@/components/home/data"
import type { CalendarEvent, CalendarSkuFinding } from "@/components/landing/types"
import type { ImpactRow } from "./types"

/** Actioned SKUs shown when landing from a homepage opportunity. */
export const IMPACT_ACTIONED_SKU_COUNT = 128

const WHAT_CHANGED_FALLBACKS = [
  "Title optimized for seasonal search intent",
  "Bullets rewritten for deal framing",
  "Description expanded with use cases",
  "AEO attributes filled for answer coverage",
  "Image set corrected in PIM",
  "Promo keywords added to title and bullets",
]

/** Parse labels like "$84K", "$1.24M", "$246,480" into integer cents. */
export function parseImpactLabelToCents(label: string): number {
  const cleaned = label.replace(/[+$,\s]/g, "").toUpperCase()
  const match = cleaned.match(/^([\d.]+)([KM])?$/)
  if (!match) return 0
  const n = Number(match[1])
  if (Number.isNaN(n)) return 0
  if (match[2] === "M") return Math.round(n * 1_000_000 * 100)
  if (match[2] === "K") return Math.round(n * 1_000 * 100)
  return Math.round(n * 100)
}

function formatImpactCents(cents: number): string {
  const dollars = cents / 100
  if (dollars >= 1_000_000) {
    const millions = dollars / 1_000_000
    const label = Number.isInteger(millions)
      ? String(millions)
      : millions.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")
    return `+$${label}M`
  }
  if (dollars >= 1_000) {
    return `+$${Math.round(dollars / 1_000)}K`
  }
  return `+$${Math.round(dollars).toLocaleString("en-US")}`
}

function findingToRow(
  finding: CalendarSkuFinding,
  changedOn: string,
  brand: string,
): ImpactRow {
  const cents = parseImpactLabelToCents(finding.impactLabel)
  const impactLabel = finding.impactLabel.startsWith("+")
    ? finding.impactLabel
    : `+${finding.impactLabel}`

  return {
    id: finding.id,
    productName: finding.name,
    asin: finding.asin,
    brand,
    thumbnailUrl: finding.imageUrl,
    impactLabel,
    impactCents: cents,
    whatChanged: finding.finding,
    changedOn,
  }
}

/**
 * Build a filtered Impact list for an opportunity: real findings first,
 * then generated actioned SKUs up to IMPACT_ACTIONED_SKU_COUNT (128).
 */
export function buildImpactRowsFromEvent(event: CalendarEvent): ImpactRow[] {
  const changedOn = `${event.dateLabel}, 2026`
  const findings = event.skuFindings ?? []
  const templates = MOCK_SKUS
  const seedRows = findings.map((finding, index) =>
    findingToRow(
      finding,
      changedOn,
      templates[index % templates.length]!.brand,
    ),
  )
  const count = IMPACT_ACTIONED_SKU_COUNT

  if (seedRows.length >= count) return seedRows.slice(0, count)

  const opportunityCents = parseImpactLabelToCents(event.valueLabel)
  const seedCents = seedRows.reduce((sum, row) => sum + row.impactCents, 0)
  const remainingSlots = count - seedRows.length
  const remainingCents = Math.max(
    opportunityCents - seedCents,
    remainingSlots * 50_000,
  )

  const generated: ImpactRow[] = Array.from(
    { length: remainingSlots },
    (_, index) => {
      const n = seedRows.length + index + 1
      const template = templates[index % templates.length]!
      const finding = findings[index % Math.max(findings.length, 1)]
      const share = remainingSlots > 0 ? remainingCents / remainingSlots : 0
      // Mild decay so top generated rows stay higher-impact
      const decay = 1 - (index / remainingSlots) * 0.55
      const cents = Math.max(25_000, Math.round(share * decay))
      const whatChanged =
        finding?.finding ??
        WHAT_CHANGED_FALLBACKS[index % WHAT_CHANGED_FALLBACKS.length]!

      return {
        id: `${event.id}-impact-${n}`,
        productName: `${template.title.replace(/ · .*$/, "")} · ${event.name} #${n}`,
        asin: `B${String(8100000000 + n).slice(0, 10)}`,
        brand: template.brand,
        thumbnailUrl: template.thumbnailUrl ?? candleThumbnail(String(n)),
        impactLabel: formatImpactCents(cents),
        impactCents: cents,
        whatChanged,
        changedOn,
      }
    },
  )

  return [...seedRows, ...generated]
}
