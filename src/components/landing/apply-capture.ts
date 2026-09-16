import type { CaptureBucket } from "@/lib/captured-opportunity"
import type { OpportunityStatusSegment } from "./types"

/** `$1.84M` above a million, `$360K` below it — matches the seeded labels. */
export function formatMillions(millions: number): string {
  if (millions >= 1) return `$${millions.toFixed(2)}M`
  return `$${Math.round(millions * 1000)}K`
}

/** `+$4.2K` / `+$1.2M` — the delta shown against a fresh publish. */
export function formatCaptureDelta(usd: number): string {
  if (usd >= 1_000_000) return `+$${(usd / 1_000_000).toFixed(2)}M`
  if (usd >= 1000) return `+$${(usd / 1000).toFixed(1)}K`
  return `+$${Math.round(usd)}`
}

/**
 * Publishing moves dollars from an open bucket into Captured — it does not change
 * how much opportunity the agent found, so the identified total and the track
 * width stay put. The bucket the SKUs came from drains first, then spills into
 * the other open bucket if it runs dry.
 */
export function applyCapture(
  segments: OpportunityStatusSegment[],
  capturedUsd: number,
  bucket: CaptureBucket,
): OpportunityStatusSegment[] {
  const capturedMillions = capturedUsd / 1_000_000
  if (capturedMillions <= 0) return segments

  const drainOrder: CaptureBucket[] =
    bucket === "seasonal" ? ["seasonal", "pdp"] : ["pdp", "seasonal"]

  const drained = new Map<string, number>()
  let remaining = capturedMillions

  for (const id of drainOrder) {
    const segment = segments.find((s) => s.id === id)
    if (!segment || remaining <= 0) continue
    const take = Math.min(segment.millions, remaining)
    drained.set(id, take)
    remaining -= take
  }

  const moved = capturedMillions - remaining

  return segments.map((segment) => {
    if (segment.id === "captured") {
      const millions = segment.millions + moved
      return { ...segment, millions, amountLabel: formatMillions(millions) }
    }

    const take = drained.get(segment.id)
    if (!take) return segment

    const millions = segment.millions - take
    return { ...segment, millions, amountLabel: formatMillions(millions) }
  })
}

/**
 * Status bar / legend collapse Seasonal + PDP into one bucket.
 * A closed window labels that bucket expired. Capture still drains the source buckets; this is display-only.
 */
export function displayStatusSegments(
  segments: OpportunityStatusSegment[],
  windowClosed = false,
): OpportunityStatusSegment[] {
  const captured = segments.find((s) => s.id === "captured")
  const expired = segments.find((s) => s.id === "expired")
  const openMillions = segments
    .filter((s) => s.id === "seasonal" || s.id === "pdp")
    .reduce((sum, s) => sum + s.millions, 0)

  const opportunity: OpportunityStatusSegment = {
    id: "opportunity",
    label: windowClosed ? "Expired Opportunity" : "Remaining Opportunity",
    millions: openMillions,
    amountLabel: formatMillions(openMillions),
    muted: windowClosed,
    tooltip: windowClosed
      ? "This window has closed, so this lift can no longer be captured."
      : "Uncaptured lift still available — seasonal windows and always-on PDP optimization.",
  }

  return [captured, opportunity, expired].filter(
    (s): s is OpportunityStatusSegment => s != null,
  )
}

/** Bar track matches the legend: captured, combined open opportunity, expired. */
export function trackStatusSegments(
  segments: OpportunityStatusSegment[],
  windowClosed = false,
): OpportunityStatusSegment[] {
  return displayStatusSegments(segments, windowClosed)
}
