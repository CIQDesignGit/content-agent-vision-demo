import type { SkuQueueSource } from "@/lib/moment-sku-queue"

/** Prototype cap so huge share links do not freeze the UI. */
export const SHARE_REVIEW_MAX_COUNT = 500

export interface ShareReviewParams {
  title: string
  count: number
}

/**
 * Parse freeform share-link query params for `/workbench?title=…&count=…`.
 * Returns null when either value is missing or invalid.
 */
export function parseShareReviewParams(
  titleParam: string | null,
  countParam: string | null,
): ShareReviewParams | null {
  const title = titleParam?.trim() ?? ""
  if (!title || countParam == null || countParam.trim() === "") return null

  const parsed = Number(countParam)
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 1) {
    return null
  }

  return {
    title,
    count: Math.min(parsed, SHARE_REVIEW_MAX_COUNT),
  }
}

/** Stable queue id for session progress keyed by title + count. */
export function shareReviewQueueId(title: string, count: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
  return `share-${slug || "queue"}-${count}`
}

export function buildShareReviewQueueSource(
  params: ShareReviewParams,
): SkuQueueSource {
  return {
    id: shareReviewQueueId(params.title, params.count),
    name: params.title,
    skuCount: params.count,
  }
}
