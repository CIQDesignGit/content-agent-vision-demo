import { candleThumbnail } from "@/lib/candle-thumbnails"
import type { ActionLogEntry, AttemptedChange } from "./types"

export const DEFAULT_DATE_RANGE = "May 03, 2026 - Jun 01, 2026"

const LIGHT_LINEN_CHANGES: AttemptedChange[] = [
  {
    type: "text",
    field: "Title",
    changeKind: "edit",
    liveDate: "May 23",
    fieldReflection: "live",
    before: [
      { text: "Aurelle Candles " },
      { text: "Linen Candle, 12 oz", variant: "removed" },
    ],
    after: [
      { text: "Aurelle Candles " },
      { text: "Light Linen Soy Candle, 10 oz", variant: "added" },
    ],
  },
  {
    type: "bullets",
    field: "Bullets",
    changeKind: "add",
    liveDate: "May 24",
    fieldReflection: "live",
    items: [
      { text: "Clean linen scent for 40 hours" },
      { text: "Soy wax — lighter jar", added: true },
      { text: "Lead-free cotton wick", added: true },
    ],
  },
  {
    type: "text",
    field: "Description",
    changeKind: "edit",
    liveDate: "May 28",
    fieldReflection: "live",
    before: [
      {
        text: "Keep small rooms fresh with a light everyday candle. ",
      },
      {
        text: "A compact paraffin jar suited to single-room use.",
        variant: "removed",
      },
    ],
    after: [
      {
        text: "Aurelle Candles Light Linen Soy Candle is a lighter 10 oz jar with a clean cotton-and-linen scent, a 40-hour burn, and a lead-free wick for bedrooms and guest baths.",
        variant: "added",
      },
    ],
  },
]

const AMAZON_REJECTION_RAW = `Amazon SP-API Error Response (Acceptance):
ErrorCode: 8541
Message: Value for External Product ID is longer than the allowed maximum (14 characters).
Message: Value provided for ISBN/UCCID is invalid for attribute External Product ID.
Message: You can't change External Product ID from its original value 00070230100658.`

const AMAZON_REJECTION: ActionLogEntry["syndicationRemarksDetail"] = {
  kind: "syndication",
  stage: "retailer",
  headline: "Rejected by Amazon at acceptance",
  plainTerms:
    "Amazon refused the update because the External Product ID is too long and can't be changed from its original value.",
  errors: [
    "Value for External Product ID is longer than the allowed maximum (14 characters).",
    "Value provided for ISBN/UCCID is invalid for attribute External Product ID. To fix, resubmit with the correct value.",
    "You can't change External Product ID from its original value 00070230100658. Revert to the original value, or contact Amazon Support if you believe it's incorrect.",
  ],
  suggestedFix:
    "Suggested fix: Revert External Product ID to 00070230100658 (within the 14-character limit) and resubmit.",
  rawText: AMAZON_REJECTION_RAW,
}

export const ACTION_LOG_ENTRIES: ActionLogEntry[] = [
  // 1 — Live (happy path)
  {
    id: "log-1",
    skuId: "B07KYLBRT4",
    name: "Aurelle Candles Light Linen Soy Candle",
    thumbnailUrl: candleThumbnail("B07KYLBRT4"),
    pimStatus: "accepted",
    retailerStatus: "accepted",
    pdpStatus: "live",
    syndicationRemarks: "All 3 fields live (May 28).",
    actionedOn: "May 27, 2026, 07:56 PM",
    actionedShort: "actioned May 27 7:56 PM",
    updatedBy: "kathleen.fuller@aurellecandles.com",
    status: "success",
    panelScenario: "live",
    pimWrittenAt: "3:10 PM",
    retailerAt: "3:12 PM",
    pdpAt: "May 28",
    fieldsLive: { live: 3, total: 3 },
    attemptedChanges: LIGHT_LINEN_CHANGES,
  },
  // 2 — Pending (within 5-day crawl window)
  {
    id: "log-2",
    skuId: "B08NF9KBZ4",
    name: "Aurelle Candles Noir Cherry Large Jar, 22 oz",
    thumbnailUrl: candleThumbnail("B08NF9KBZ4"),
    pimStatus: "accepted",
    retailerStatus: "accepted",
    pdpStatus: "pending",
    syndicationRemarks: "Accepted; awaiting PDP — day 2 of 5.",
    actionedOn: "May 19, 2026, 11:42 AM",
    actionedShort: "actioned May 19 11:42 AM",
    updatedBy: "maria.r@commerceiq.ai",
    status: "pending",
    panelScenario: "pending",
    pimWrittenAt: "10:15 AM",
    retailerAt: "10:18 AM",
    pdpProgress: { day: 2, total: 5 },
    fieldsLive: { live: 2, total: 3 },
    attemptedChanges: [
      {
        type: "text",
        field: "Title",
        changeKind: "edit",
        liveDate: "May 19",
        fieldReflection: "live",
        before: [
          { text: "Aurelle Candles " },
          { text: "Noir Cherry Jar, 22oz", variant: "removed" },
        ],
        after: [
          { text: "Aurelle Candles " },
          { text: "Noir Cherry Large Jar, 22 oz", variant: "added" },
        ],
      },
      {
        type: "bullets",
        field: "Bullets",
        changeKind: "add",
        liveDate: "May 20",
        fieldReflection: "live",
        items: [
          { text: "Up to 150 hours of burn time" },
          { text: "Premium-grade paraffin wax", added: true },
        ],
      },
      {
        type: "text",
        field: "Description",
        changeKind: "edit",
        fieldReflection: "pending",
        before: [
          {
            text: "Authentic black cherry fragrance fills any room with rich, long-lasting scent. ",
          },
          {
            text: "Compact jar size ideal for bedside tables and small spaces.",
            variant: "removed",
          },
        ],
        after: [
          {
            text: "This 22 oz large jar delivers up to 150 hours of burn time with premium-grade paraffin wax for a clean, even burn from first light to last.",
            variant: "added",
          },
        ],
      },
    ],
  },
  // 3 — Partially live
  {
    id: "log-3",
    skuId: "B0BLXL6QK6",
    name: "Aurelle Candles Studio Pink Sands, 8 oz",
    thumbnailUrl: candleThumbnail("B0BLXL6QK6"),
    pimStatus: "accepted",
    retailerStatus: "accepted",
    pdpStatus: "partially_live",
    syndicationRemarks: "Title + 2 bullets live; description not reflected.",
    actionedOn: "May 18, 2026, 04:15 PM",
    actionedShort: "actioned May 18 4:15 PM",
    updatedBy: "ayush.p@commerceiq.ai",
    status: "pending",
    panelScenario: "partially_live",
    pimWrittenAt: "2:05 PM",
    retailerAt: "2:08 PM",
    pdpProgress: { day: 5, total: 5 },
    fieldsLive: { live: 2, total: 3 },
    attemptedChanges: [
      {
        type: "text",
        field: "Title",
        changeKind: "edit",
        liveDate: "May 18",
        fieldReflection: "live",
        before: [
          { text: "Aurelle Candles " },
          { text: "Studio Candle Pink Sand", variant: "removed" },
        ],
        after: [
          { text: "Aurelle Candles Studio " },
          { text: "Pink Sands, 8 oz", variant: "added" },
        ],
      },
      {
        type: "bullets",
        field: "Bullets",
        changeKind: "add",
        liveDate: "May 19",
        fieldReflection: "live",
        items: [
          { text: "Coastal pink sands scent", added: true },
          { text: "Clean, even burn", added: true },
        ],
      },
      {
        type: "text",
        field: "Description",
        changeKind: "edit",
        liveDate: "May 18",
        fieldReflection: "not_reflected",
        before: [
          {
            text: "Bring coastal calm to your space with Pink Sands — ",
          },
          {
            text: "a light floral note for small rooms.",
            variant: "removed",
          },
        ],
        after: [
          {
            text: "a sun-warmed blend of floral and citrus notes inspired by beachside breezes, with a clean, even burn in a modern Studio collection vessel.",
            variant: "added",
          },
        ],
      },
    ],
    pdpRemarks: {
      kind: "pdp",
      headline: "Description — not reflected.",
      body: "Title and bullets are live on the PDP; the description never appeared across 5 daily crawls.",
      fields: ["Description"],
      likelyCause: "Vendor-code mapping may not syndicate this attribute to the PDP field Amazon crawls.",
      nextStep: "Check vendor-code mapping or contact FDE if the field should be syndicated separately.",
    },
  },
  // 4 — Retailer pending (cascade)
  {
    id: "log-4",
    skuId: "B00I0DI0Z6",
    name: "Aurelle Candles Citrus Zest Soy Jar, 14 oz",
    thumbnailUrl: candleThumbnail("B00I0DI0Z6"),
    pimStatus: "accepted",
    retailerStatus: "pending",
    pdpStatus: "pending",
    syndicationRemarks: "Awaiting retailer acceptance.",
    actionedOn: "May 17, 2026, 09:30 AM",
    actionedShort: "actioned May 17 9:30 AM",
    updatedBy: "jordan.k@commerceiq.ai",
    status: "pending",
    panelScenario: "pending",
    pimWrittenAt: "9:00 AM",
    attemptedChanges: [
      {
        type: "text",
        field: "Title",
        changeKind: "edit",
        before: [{ text: "Aurelle Citrus Zest Jar", variant: "removed" }],
        after: [
          { text: "Aurelle Candles Citrus Zest — " },
          { text: "Soy Jar, 14 oz", variant: "added" },
        ],
      },
      {
        type: "bullets",
        field: "Bullets",
        changeKind: "add",
        items: [
          { text: "Bright citrus zest scent" },
          { text: "Soy blend, 60-hour burn", added: true },
        ],
      },
      {
        type: "text",
        field: "Description",
        changeKind: "add",
        before: null,
        after: [
          {
            text: "Bright citrus zest soy jar for kitchens and living rooms — orange peel, lemon leaf, and a clean white-floral base in a 14 oz hand-poured jar with a 60-hour burn.",
          },
        ],
      },
    ],
  },
  // 5 — Rejected + long error (PDP —)
  {
    id: "log-5",
    skuId: "B07GR5MSKD",
    name: "Aurelle Candles Amber Floral Soy Candle, 16 oz",
    thumbnailUrl: candleThumbnail("B07GR5MSKD"),
    pimStatus: "accepted",
    retailerStatus: "rejected",
    pdpStatus: "not_run",
    syndicationRemarks: "Amazon rejected: External Product ID too long.",
    actionedOn: "May 15, 2026, 01:22 PM",
    actionedShort: "actioned May 15 1:22 PM",
    updatedBy: "ayush.p@commerceiq.ai",
    status: "failed",
    panelScenario: "rejected",
    pimWrittenAt: "7:37 PM",
    retailerAt: "7:38 PM",
    attemptedChanges: [
      {
        type: "text",
        field: "Title",
        changeKind: "edit",
        before: [{ text: "Aurelle Amber Floral Candle", variant: "removed" }],
        after: [
          {
            text: "Aurelle Candles Amber Floral Soy Candle, 16 oz",
            variant: "added",
          },
        ],
      },
      {
        type: "bullets",
        field: "Bullets",
        changeKind: "add",
        items: [{ text: "Amber, jasmine, and soft musk", added: true }],
      },
      {
        type: "text",
        field: "Description",
        changeKind: "add",
        before: null,
        after: [
          {
            text: "Hand-poured soy candle with amber, jasmine, and musk. The 16 oz jar burns for up to 70 hours and fills medium rooms with a warm floral scent from first light to last.",
          },
        ],
      },
    ],
    syndicationRemarksDetail: AMAZON_REJECTION,
  },
  // 6 — Rejected but live anyway
  {
    id: "log-6",
    skuId: "B00H8R3KM2",
    name: "Aurelle Candles Spiced Cedar 3-Wick, 21 oz",
    thumbnailUrl: candleThumbnail("B00H8R3KM2"),
    pimStatus: "accepted",
    retailerStatus: "rejected",
    pdpStatus: "live",
    syndicationRemarks:
      "Rejected by Amazon, but verified live on PDP May 24. Flagged for FDE.",
    actionedOn: "May 12, 2026, 10:05 AM",
    actionedShort: "actioned May 12 10:05 AM",
    updatedBy: "maria.r@commerceiq.ai",
    status: "pending",
    panelScenario: "rejected_but_live",
    flaggedForFde: true,
    pimWrittenAt: "9:50 AM",
    retailerAt: "9:55 AM",
    pdpAt: "May 24",
    fieldsLive: { live: 2, total: 3 },
    attemptedChanges: [
      {
        type: "text",
        field: "Title",
        changeKind: "edit",
        liveDate: "May 24",
        fieldReflection: "live",
        before: [{ text: "Aurelle Spiced Cedar Candle" }],
        after: [
          { text: "Aurelle Candles Spiced Cedar 3-Wick — " },
          { text: "21 oz, Room-Filling", variant: "added" },
        ],
      },
      {
        type: "bullets",
        field: "Bullets",
        changeKind: "add",
        liveDate: "May 24",
        fieldReflection: "live",
        items: [
          { text: "Three cotton wicks", added: true },
          { text: "Cedar, clove, and smoked wood", added: true },
        ],
      },
      {
        type: "text",
        field: "Description",
        changeKind: "add",
        fieldReflection: "not_submitted",
        before: null,
        after: [
          {
            text: "A 21 oz three-wick jar of cedar, clove, and smoked wood. Built to fill large rooms evenly, with an 80-hour burn and a lead-free cotton wick set.",
          },
        ],
      },
    ],
    syndicationRemarksDetail: {
      kind: "syndication",
      stage: "retailer",
      headline: "Latest submission rejected — prior PDP still live",
      plainTerms:
        "Amazon rejected this submission, but an earlier version remains live on the PDP from May 24.",
      errors: [
        "Submission rejected at retailer acceptance.",
        "PDP crawl confirms prior title and bullets still live.",
      ],
      suggestedFix:
        "Review rejection reason and reconcile with live PDP content before resubmitting. Flagged for FDE.",
      rawText:
        "Retailer rejection on latest submission. PDP crawl verified prior content live May 24.",
    },
  },
]
