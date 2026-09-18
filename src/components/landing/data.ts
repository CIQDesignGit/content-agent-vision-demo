import { candleThumbnail } from "@/lib/candle-thumbnails"
import type {
  CalendarEvent,
  CalendarTimelineMarker,
  LostToInactionData,
  OpportunityCalculationData,
  OpportunityMeterData,
  OpportunityStatusSegment,
  OpportunityStream,
  SecondaryStat,
  UpcomingMoment,
  UpNextData,
  ValuePillar,
} from "./types"

/** Customer contract window. Not a calendar year. */
export const contractPeriodLabel = "Aug 2026 – Jul 2027"

export const opportunityMeter: OpportunityMeterData = {
  /** Active opportunity only — forfeited / past windows are excluded. */
  identifiedMillions: 4.81,
  realizedMillions: 0.8,
  periodLabel: contractPeriodLabel,
  pvpDelta: "+$1.41M PvP",
  pvpDeltaPositive: true,
}

export const opportunityByStatus: OpportunityStatusSegment[] = [
  {
    id: "captured",
    label: "Captured",
    amountLabel: "$800K",
    millions: 0.8,
    tooltip:
      "Opportunity already realized — content changes are live on retailer PDPs and contributing to incremental sales.",
  },
  {
    id: "seasonal",
    label: "Seasonal",
    amountLabel: "$3.65M",
    millions: 3.65,
    tooltip:
      "Open windows: Black Friday $1.24M, Cyber Monday $860K, Holiday Gift Guide $510K, and Winter peak $1.04M. Together $3.65M.",
  },
  {
    id: "pdp",
    label: "PDP optimization",
    amountLabel: "$360K",
    millions: 0.36,
    tooltip:
      "The $360K slice of the $2.50M always-on stream that can be captured now. A subset, not a second total.",
  },
  {
    id: "expired",
    label: "Expired",
    amountLabel: "$890K",
    millions: 0.89,
    muted: true,
    tooltip:
      "Prime Day, Jul 12. $890K and 210 deal SKUs closed before publish — excluded from the active total.",
  },
]

export const opportunityCalculation: OpportunityCalculationData = {
  annualized: {
    id: "annualized",
    tabLabel: "Annualized opportunity",
    heading: "Annualized Opportunity Size",
    periodBadge: contractPeriodLabel,
    heroAmountLabel: "$4.81M",
    retailReadinessLiftLabel: "Retail readiness opportunity",
    retailReadinessLiftAmount: "$0.26M",
    amazonOptimizationLiftLabel: "Amazon optimization opportunity",
    amazonOptimizationLiftAmount: "$1.19M",
    seasonalLiftLabel: "Seasonal opportunity",
    seasonalLiftAmount: "$3.36M",
    liftBarPct: { retailReadiness: 5, amazonOptimization: 25, seasonal: 70 },
    kpis: [
      { value: "42", label: "SKUs A/B tested" },
      { value: "+3.0%", label: "Median sales lift" },
      { value: "38 of 42", label: "Challenger won" },
    ],
    calcRows: [
      {
        label: "Annual revenue on attribute-blocked SKUs",
        value: "$8.67M",
      },
      { label: "× banked lift rate", value: "3.0%" },
      {
        label: "Retail readiness opportunity",
        value: "$0.26M",
        variant: "subtotal",
      },
      {
        label: "Annual revenue on always-on SEO & AEO gaps",
        value: "$39.63M",
      },
      { label: "× banked lift rate", value: "3.0%" },
      {
        label: "Amazon optimization opportunity",
        value: "$1.19M",
        variant: "subtotal",
      },
      {
        label: "Revenue in the 2 weeks after each of 17 events",
        value: "$112M",
      },
      { label: "× banked lift rate", value: "3.0%" },
      {
        label: "Seasonal opportunity",
        value: "$3.36M",
        variant: "subtotal",
      },
    ],
    calcSummary: {
      label: "Opportunity ahead",
      value: "$4.81M",
      variant: "total",
    },
    cta: {
      label: "A/B test Results",
      href: "/impact?batch=b1",
    },
    methodology:
      "Revenue figures come from your Vendor Central history, pulled at onboarding. As new tests run the rate updates, and every change keeps a dated audit trail.",
  },
  valueRealized: {
    id: "value-realized",
    tabLabel: "Value Realized",
    heading: "Value realized",
    periodBadge: "Jan 1 – Dec 31, 2026",
    trendBadge: { label: "+$340K this month", positive: true },
    heroAmountLabel: "$800K",
    heroBordered: true,
    retailReadinessLiftLabel: "Retail readiness opportunity",
    retailReadinessLiftAmount: "$100K",
    amazonOptimizationLiftLabel: "Amazon optimization opportunity",
    amazonOptimizationLiftAmount: "$500K",
    seasonalLiftLabel: "Seasonal opportunity",
    seasonalLiftAmount: "$200K",
    liftBarPct: { retailReadiness: 13, amazonOptimization: 62, seasonal: 25 },
    kpis: [
      { value: "128", label: "SKUs live" },
      { value: "3.1 days", label: "Median approve-to-live" },
      { value: "2 mo", label: "Accruing since Aug" },
    ],
    calcRows: [],
    bodyCopy:
      "128 SKUs, accrued over days their content was live — not the full-year value of a test that concluded last month. Each SKU's rate comes from its own A/B result where one exists, otherwise the demand-adjusted baseline (used where Amazon won't run a test).",
    cta: {
      label: "See SKU-level attribution in Agent Impact",
      href: "/impact",
    },
    unrealized: {
      title: "Identified but never published",
      amountLabel: "$890K",
      description:
        "210 deal SKUs (Prime Day, Jul 12) still had gaps when syndication cut off. Not part of the total above and not recoverable — shown so the gap between what was found and what shipped stays visible.",
    },
    methodology: "",
  },
}

export const secondaryStats: SecondaryStat[] = [
  {
    id: "working-days-saved",
    label: "Working days saved",
    value: "7.7",
    delta: "8% productivity boost WoW",
    deltaPositive: true,
    footnote: "128 actions taken · 61.9 analyst hours",
    calculation: {
      title: "Working days saved",
      rows: [
        { label: "SKUs published, last 12 months", value: "128" },
        { label: "Manual benchmark, per SKU", value: "30 min" },
        { label: "Agent, per SKU", value: "1 min" },
        { label: "Saved per SKU", value: "29 min" },
        { label: "Total saved", value: "61.9 hrs" },
      ],
      summaryRow: { label: "At an 8-hour working day", value: "7.7 days" },
      methodology:
        "Time saved counts only SKUs actually published, not recommendations sitting in the queue. The 30-minute manual benchmark covers pulling the listing, researching keywords, drafting the title and bullets, and loading them back into Vendor Central.",
    },
  },
  {
    id: "ai-rank",
    label: "AI rank",
    value: "#2",
    delta: "▲ 1 place WoW",
    deltaPositive: true,
    live: true,
    footnote: "Median position across 25 tracked prompts",
    calculation: {
      title: "AI rank",
      rows: [
        { label: "Tracked prompts", value: "25" },
        { label: "Prompts where you appear", value: "18" },
        { label: "Median position when cited", value: "#2" },
      ],
      summaryRow: { label: "Last week", value: "#3" },
      methodology:
        "A live snapshot, not a 12-month total — this is where you stand today, compared with last week's run against the same prompt set. Median position across prompts where your products are cited by Alexa AI. Prompts where you don't appear are excluded from the median and counted separately as coverage, so rank doesn't flatter itself by ignoring absences.",
    },
  },
  {
    id: "ai-share-of-voice",
    label: "AI share of voice",
    value: "34%",
    delta: "▲ 1.4 pp WoW",
    deltaPositive: true,
    live: true,
    footnote: "Weighted, up from 32.6% last week",
    calculation: {
      title: "AI share of voice",
      rows: [
        { label: "Your weighted share today", value: "34%" },
        { label: "Last week", value: "32.6%" },
        { label: "Closest competitor", value: "41%" },
      ],
      summaryRow: { label: "Prompts measured", value: "25" },
      methodology:
        "A live snapshot, not a 12-month total. Share of all brand citations across tracked prompts, weighted by position — being cited first counts more than being cited fifth. Re-measured every week against the same prompt set, so week-over-week movement is comparable.",
    },
  },
]

export const upNext: UpNextData = {
  items: [
    {
      id: "bf",
      name: "Black Friday",
      valueLabel: "$1.24M",
      publishBy: "Sep 15",
      skuCount: 384,
      goesLiveNote: "4 days later",
    },
  ],
}

export const lostToInaction: LostToInactionData = {
  amountLabel: "$890K",
  eventName: "Prime Day",
  eventDateLabel: "Jul 12",
  support:
    "210 deal SKUs still had title and bullet gaps when the event window closed.",
}

export const valuePillars: ValuePillar[] = [
  {
    id: "foundational",
    kind: "foundational",
    title: "Foundational lift",
    displayValue: "$1.45M",
    tag: { label: "one-time", tone: "neutral" },
    support: "Title and bullet coverage gaps closed across the core catalog.",
    confidence: "high",
    methodology:
      "Annual revenue on SKUs not yet optimized ($48.3M) × 3.0% banked lift rate from 42 SKUs.",
    benchmark: "1.4× category median title completeness",
  },
  {
    id: "seasonal",
    kind: "seasonal",
    title: "Seasonal lift",
    displayValue: "$3.36M",
    tag: { label: "recurring", tone: "recurring" },
    support: "Event-tied copy ready for Black Friday through gift guides.",
    confidence: "med",
    methodology:
      "Revenue in the 2 weeks after each of 17 events ($112M) × 3.0% banked lift rate.",
    benchmark: "vs. prior Black Friday content window",
  },
]

export const calendarYearLabel = "2026"

export const calendarTimelineMarkers: CalendarTimelineMarker[] = [
  { id: "today", label: "Today", position: 2, kind: "today" },
  { id: "sep-15", label: "Sep 15", position: 18, kind: "active" },
  { id: "sep-18", label: "Sep 18", position: 32, kind: "upcoming" },
  { id: "oct-3", label: "Oct 3", position: 52, kind: "upcoming" },
  { id: "nov-20", label: "Nov 20", position: 78, kind: "upcoming" },
]

/** Publish-by calendar — open deadlines first, forfeited last. */
export const calendarEvents: CalendarEvent[] = [
  {
    id: "bf",
    name: "Black Friday",
    valueLabel: "$1.24M",
    skuCount: 384,
    status: "open",
    dateLabel: "Sep 15",
    daysToAct: 5,
    insightSummary:
      "384 SKUs are missing promo keywords in titles, deal framing in bullets, or bundle language on hero SKUs. I ranked them by the revenue each fix is worth, so the top 20 carry about a third of the total.",
    dimensions: [
      {
        kind: "seasonal",
        label: "Seasonal lift",
        potential: "$780K",
        potentialMillions: 0.78,
      },
      {
        kind: "aeo",
        label: "AI visibility",
        potential: "$310K",
        potentialMillions: 0.31,
      },
      {
        kind: "foundational",
        label: "Foundational lift",
        potential: "$150K",
        potentialMillions: 0.15,
      },
    ],
    skuFindings: [
      {
        id: "bf-1",
        name: "Aurelle Candles Fig & Freesia Jar",
        asin: "B07QK4Z1MN",
        imageUrl: candleThumbnail("B07QK4Z1MN"),
        finding: "No promo keyword in title",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$84K",
      },
      {
        id: "bf-2",
        name: "Aurelle Candles Warm Cashmere 3-Wick",
        asin: "B08LM2W7PP",
        imageUrl: candleThumbnail("B08LM2W7PP"),
        finding: "Bullets don't state the deal terms",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$71K",
      },
      {
        id: "bf-3",
        name: "Aurelle Candles Holiday Trio Gift Set",
        asin: "B09TT5R2QD",
        imageUrl: candleThumbnail("B09TT5R2QD"),
        finding: "Bundle contents not described",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$63K",
      },
      {
        id: "bf-4",
        name: "Aurelle Candles Santal & Smoke Votive Set",
        asin: "B07YH9L3KC",
        imageUrl: candleThumbnail("B07YH9L3KC"),
        finding: "3 attributes missing for answer coverage",
        driver: "aeo",
        driverLabel: "AI visibility",
        impactLabel: "$52K",
      },
      {
        id: "bf-5",
        name: "Aurelle Candles White Tea Pillar",
        asin: "B08FG6N8VT",
        imageUrl: candleThumbnail("B08FG6N8VT"),
        finding: "Title truncated at 142 characters",
        driver: "foundational",
        driverLabel: "Foundational",
        impactLabel: "$47K",
      },
      {
        id: "bf-6",
        name: "Aurelle Candles Moonflower Soy Candle",
        asin: "B09WD1X4HB",
        imageUrl: candleThumbnail("B09WD1X4HB"),
        finding: "Bullets 4 and 5 empty",
        driver: "foundational",
        driverLabel: "Foundational",
        impactLabel: "$41K",
      },
    ],
    remainingCount: 378,
    remainingValueLabel: "$882K",
  },
  {
    id: "cm",
    name: "Cyber Monday",
    valueLabel: "$860K",
    skuCount: 261,
    status: "open",
    dateLabel: "Sep 18",
    daysToAct: 8,
    insightSummary:
      "261 SKUs still use generic digital-deal copy; shipping and exclusivity claims are inconsistent across variants. Ranked by revenue impact so you can clear the highest-value gaps first.",
    dimensions: [
      {
        kind: "seasonal",
        label: "Seasonal lift",
        potential: "$520K",
        potentialMillions: 0.52,
      },
      {
        kind: "aeo",
        label: "AI visibility",
        potential: "$210K",
        potentialMillions: 0.21,
      },
      {
        kind: "foundational",
        label: "Foundational lift",
        potential: "$130K",
        potentialMillions: 0.13,
      },
    ],
    skuFindings: [
      {
        id: "cm-1",
        name: "Aurelle Candles Midnight Amber Jar",
        asin: "B08XK2M1AA",
        imageUrl: candleThumbnail("B08XK2M1AA"),
        finding: "No Cyber Monday offer language in title",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$58K",
      },
      {
        id: "cm-2",
        name: "Aurelle Candles Orange Blossom Tumbler",
        asin: "B09PL7N2BB",
        imageUrl: candleThumbnail("B09PL7N2BB"),
        finding: "Fulfillment type unclear for AI answers",
        driver: "aeo",
        driverLabel: "AI visibility",
        impactLabel: "$44K",
      },
      {
        id: "cm-3",
        name: "Aurelle Candles Vetiver Grove Mini",
        asin: "B07HH3C4DD",
        imageUrl: candleThumbnail("B07HH3C4DD"),
        finding: "Variant titles bury the deal claim",
        driver: "foundational",
        driverLabel: "Foundational",
        impactLabel: "$36K",
      },
    ],
    remainingCount: 258,
    remainingValueLabel: "$722K",
  },
  {
    id: "gg",
    name: "Holiday Gift Guide",
    valueLabel: "$510K",
    skuCount: 147,
    status: "open",
    dateLabel: "Oct 3",
    daysToAct: 23,
    insightSummary:
      "147 SKUs lack giftability signals — few recipient, occasion, or bundle cues. Ranked by revenue so curated gift sets surface first.",
    dimensions: [
      {
        kind: "seasonal",
        label: "Seasonal lift",
        potential: "$280K",
        potentialMillions: 0.28,
      },
      {
        kind: "aeo",
        label: "AI visibility",
        potential: "$140K",
        potentialMillions: 0.14,
      },
      {
        kind: "foundational",
        label: "Foundational lift",
        potential: "$90K",
        potentialMillions: 0.09,
      },
    ],
    skuFindings: [
      {
        id: "gg-1",
        name: "Aurelle Candles Signature Trio Gift Set",
        asin: "B0A11GIFT1",
        imageUrl: candleThumbnail("B0A11GIFT1"),
        finding: "No occasion or recipient keywords",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$39K",
      },
      {
        id: "gg-2",
        name: "Aurelle Candles Evening Ritual Gift Set",
        asin: "B0A22GIFT2",
        imageUrl: candleThumbnail("B0A22GIFT2"),
        finding: "Price-band attributes missing for gift prompts",
        driver: "aeo",
        driverLabel: "AI visibility",
        impactLabel: "$31K",
      },
      {
        id: "gg-3",
        name: "Aurelle Candles Espresso Cream Jar",
        asin: "B0A33GIFT3",
        imageUrl: candleThumbnail("B0A33GIFT3"),
        finding: "Incomplete description and alt text",
        driver: "foundational",
        driverLabel: "Foundational",
        impactLabel: "$24K",
      },
    ],
    remainingCount: 144,
    remainingValueLabel: "$416K",
  },
  {
    id: "wp",
    name: "Winter peak",
    valueLabel: "$1.04M",
    skuCount: 296,
    status: "open",
    dateLabel: "Nov 20",
    daysToAct: 71,
    insightSummary:
      "296 SKUs still need winter-gifting language after the gift-guide window. This is the rest of the seasonal segment — with Black Friday, Cyber Monday, and Holiday Gift Guide it makes $3.65M.",
    dimensions: [
      {
        kind: "seasonal",
        label: "Seasonal lift",
        potential: "$620K",
        potentialMillions: 0.62,
      },
      {
        kind: "aeo",
        label: "AI visibility",
        potential: "$260K",
        potentialMillions: 0.26,
      },
      {
        kind: "foundational",
        label: "Foundational lift",
        potential: "$160K",
        potentialMillions: 0.16,
      },
    ],
  },
  {
    id: "pd",
    name: "Prime Day",
    valueLabel: "$890K",
    skuCount: 210,
    status: "forfeited",
    dateLabel: "Jul 12",
  },
  {
    id: "bts",
    name: "Back to School",
    valueLabel: "$640K",
    skuCount: 84,
    status: "captured",
    dateLabel: "Aug 4",
    insightSummary:
      "You published fixes on 84 of the 128 SKUs now live. This event is $640K of the $800K captured; the other $160K is always-on publishes, not this window.",
    dimensions: [
      {
        kind: "seasonal",
        label: "Seasonal lift",
        potential: "$390K",
        potentialMillions: 0.39,
      },
      {
        kind: "aeo",
        label: "AI visibility",
        potential: "$160K",
        potentialMillions: 0.16,
      },
      {
        kind: "foundational",
        label: "Foundational lift",
        potential: "$90K",
        potentialMillions: 0.09,
      },
    ],
    skuFindings: [
      {
        id: "bts-1",
        name: "Aurelle Candles Fresh Linen Travel Tin",
        asin: "B0BTS001AA",
        imageUrl: candleThumbnail("B0BTS001AA"),
        finding: "Published school-season keywords in title",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$48K",
      },
      {
        id: "bts-2",
        name: "Aurelle Candles Quiet Rain Soy Candle",
        asin: "B0BTS002BB",
        imageUrl: candleThumbnail("B0BTS002BB"),
        finding: "Filled dorm / study-use attributes for AI answers",
        driver: "aeo",
        driverLabel: "AI visibility",
        impactLabel: "$41K",
      },
      {
        id: "bts-3",
        name: "Aurelle Candles Golden Hour Jar",
        asin: "B0BTS003CC",
        imageUrl: candleThumbnail("B0BTS003CC"),
        finding: "Completed bullets and size attributes",
        driver: "foundational",
        driverLabel: "Foundational",
        impactLabel: "$29K",
      },
    ],
  },
]

/** @deprecated Prefer calendarEvents — kept for any leftover strip usage. */
export const upcomingMoments: UpcomingMoment[] = calendarEvents
  .filter((e) => e.status === "open")
  .map((e) => ({
    id: e.id,
    name: e.name,
    valueLabel: e.valueLabel,
    daysUntil: e.daysToAct ?? 0,
    skuCount: e.skuCount,
    commonIssues: e.insightSummary ?? "",
    dimensions: e.dimensions ?? [],
  }))

/** Accordion streams that replace the open publish-by calendar list. */
export const opportunityStreams: OpportunityStream[] = [
  {
    id: "retail-readiness",
    title: "Retail readiness opportunity",
    context: "of catalog is retail-ready",
    skuCount: 342,
    valueLabel: "$410K",
    valueKind: "blocked",
    tone: "warning",
    readyPercent: 94,
    insight:
      "**342 SKUs** are missing **Amazon attributes** — **100** lack mandatory fields that block syndication (**$150K**), and **242** lack recommended fields that lift SEO and AEO (**$260K**). Amazon won’t accept a content push on the mandatory set until those are backfilled.",
    remainingLabel: "338 more SKUs, $389K blocked in total.",
    buckets: [
      {
        id: "rr-mandatory",
        title: "Missing Mandatory Attributes",
        skuCount: 100,
        fillMode: "input",
        fillTime: "~1 min each · 5 need your input",
        valueThousands: 150,
        badge: "Unblocks syndication & improves SEO",
        alsoNote:
          "These SKUs are not syndicatable. Make your catalog retail ready and unblock syndication.",
      },
      {
        id: "rr-recommended",
        title: "Missing Recommended Attributes",
        skuCount: 242,
        fillTime: "~1-2 min each, agent-drafted",
        valueThousands: 260,
        badge: "Improves SEO & AEO",
        alsoNote:
          "This will improve search and answer engine citation rate.",
      },
    ],
    rows: [
      {
        id: "rr-1",
        name: "Aurelle Candles Noir Cherry Large Jar",
        asin: "B08NF9KBZ4",
        finding: "6 attributes missing — material, weight, safety",
        impactThousands: 8.9,
      },
      {
        id: "rr-2",
        name: "Aurelle Candles Citrus Zest Soy Jar",
        asin: "B00I0DI0Z6",
        finding: "4 attributes missing — care instructions, weight",
        impactThousands: 6.1,
      },
      {
        id: "rr-3",
        name: "Aurelle Candles Vanilla Tobacco Jar",
        asin: "B00FQK1H8C",
        finding: "3 attributes missing — wax type, burn time",
        impactThousands: 3.4,
      },
      {
        id: "rr-4",
        name: "Aurelle Candles Coastal Linen Large Jar",
        asin: "B00FLYWNYQ",
        finding: "9 attributes missing — material, capacity, safety",
        impactThousands: 2.8,
      },
    ],
  },
  {
    id: "seasonal",
    title: "Seasonal opportunity",
    context: "Next up · Black Friday · Publish by Sep 15 ·",
    contextHighlight: "5 days to act",
    skuCount: 384,
    valueLabel: "$1.24M",
    valueKind: "potential",
    tone: "default",
    insight:
      "**384 SKUs** are missing event-ready titles, deal framing, or bundle language for **Black Friday**. I ranked them by revenue each fix is worth, so the **top 20** carry about **a third of the total**.",
    queueNote:
      "Cyber Monday ($860K), Holiday Gift Guide ($510K), and Winter peak ($1.04M) are queued next. With this window they are the $3.65M seasonal segment.",
    remainingLabel: "378 more SKUs worth $882K, ranked by impact.",
    buckets: [
      {
        id: "sea-b1",
        title: "No promo keyword in title",
        skuCount: 142,
        fillTime: "~3 min",
        valueThousands: 420,
        alsoNote:
          "Publish by Sep 15 · 98 of these also need deal terms in bullets",
      },
      {
        id: "sea-b2",
        title: "Bullets don't state the deal terms",
        skuCount: 118,
        fillTime: "~2 min",
        valueThousands: 380,
        alsoNote:
          "Black Friday window · 76 also missing holiday urgency language",
      },
      {
        id: "sea-b3",
        title: "No holiday urgency language",
        skuCount: 96,
        fillTime: "~2 min",
        valueThousands: 210,
        alsoNote:
          "5 days to act · 48 also missing a promo keyword in the title",
      },
      {
        id: "sea-b4",
        title: "Blocked — attributes missing first",
        skuCount: 74,
        fillMode: "input",
        fillTime: "~15 min",
        valueThousands: 140,
        alsoNote:
          "Seasonal copy can't publish until Amazon attributes are backfilled",
      },
      {
        id: "sea-b5",
        title: "Gift-set bundle not described",
        skuCount: 52,
        fillTime: "~2 min",
        valueThousands: 90,
        alsoNote:
          "Gift sets · 31 also missing a promo keyword in the title",
      },
    ],
    rows: [
      {
        id: "bf-1",
        name: "Aurelle Candles Hearthwood Cedar Jar",
        asin: "B079KLGWGR",
        finding: "No promo keyword in title",
        impactThousands: 84,
      },
      {
        id: "bf-2",
        name: "Aurelle Candles Amber Floral Soy Candle",
        asin: "B07GR5MSKD",
        finding: "Bullets don't state the deal terms",
        impactThousands: 71,
      },
      {
        id: "bf-3",
        name: "Aurelle Candles Bergamot Grove Pillar Set",
        asin: "B00005UP2P",
        finding: "Bundle contents not described",
        impactThousands: 63,
      },
      {
        id: "bf-4",
        name: "Aurelle Candles Coastal Linen Large Jar",
        asin: "B00FLYWNYQ",
        finding: "No Black Friday urgency language",
        impactThousands: 52,
      },
      {
        id: "bf-5",
        name: "Aurelle Candles Pink Sands Tumbler",
        asin: "B003IH3JN4",
        finding: "Title truncated at 142 characters",
        impactThousands: 47,
      },
      {
        id: "bf-6",
        name: "Aurelle Candles Rasa Decorative Candle Duo",
        asin: "B08C4L7HC1",
        finding: "Bullets 4 and 5 empty",
        impactThousands: 41,
      },
    ],
  },
  {
    id: "pdp",
    title: "Always-on optimization opportunity",
    context: "Always on · SEO & AEO · No deadline",
    skuCount: 612,
    valueLabel: "$2.50M",
    valueKind: "potential",
    tone: "default",
    insight:
      "**612 SKUs** are missing category-standard keywords, competitor-matched terms, or the structured specs that let an **AI answer engine** cite the listing directly. The meter’s **$360K** PDP segment is the slice of this **$2.50M** ready to capture now — not a second total.",
    remainingLabel: "607 more SKUs worth $2.20M, ranked by impact.",
    buckets: [
      {
        id: "pdp-b1",
        title: "Missing top category keywords in bullets",
        skuCount: 248,
        fillTime: "~2 min",
        valueThousands: 980,
        alsoNote:
          "SEO lift · 119 also missing a key search term in the title",
      },
      {
        id: "pdp-b2",
        title: "No answer-ready specs for common prompts",
        skuCount: 196,
        fillTime: "~3 min",
        valueThousands: 820,
        alsoNote:
          "AEO lift · 88 also have thin bullets for comparison queries",
      },
      {
        id: "pdp-b3",
        title: "Title missing key search term",
        skuCount: 168,
        fillTime: "~2 min",
        valueThousands: 310,
        alsoNote:
          "Always on · 119 overlap with missing category keywords above",
      },
      {
        id: "pdp-b4",
        title: "Bullets don't answer comparison prompts",
        skuCount: 124,
        fillTime: "~2 min",
        valueThousands: 240,
        alsoNote:
          "AEO lift · 88 also missing answer-ready specs",
      },
      {
        id: "pdp-b5",
        title: "Blocked — catalog attributes missing first",
        skuCount: 41,
        fillMode: "input",
        fillTime: "~15 min",
        valueThousands: 150,
        alsoNote:
          "SEO and AEO copy can't publish until Amazon attributes are backfilled",
      },
    ],
    rows: [
      {
        id: "pdp-1",
        name: "Aurelle Candles Citrus Zest Soy Jar",
        asin: "B00I0DI0Z6",
        finding: "Missing top category keywords in bullets",
        impactThousands: 84,
        findingType: "SEO",
      },
      {
        id: "pdp-2",
        name: "Aurelle Candles Noir Cherry Large Jar",
        asin: "B08NF9KBZ4",
        finding: "No answer-ready specs for 'best candle' prompts",
        impactThousands: 67,
        findingType: "AEO",
      },
      {
        id: "pdp-3",
        name: "Aurelle Candles Vanilla Tobacco Jar",
        asin: "B00FQK1H8C",
        finding: "Title missing key search term 'soy jar'",
        impactThousands: 58,
        findingType: "SEO",
      },
      {
        id: "pdp-4",
        name: "Aurelle Candles Spiced Cedar 3-Wick",
        asin: "B00H8R3KM2",
        finding: "Bullets don't answer common comparison prompts",
        impactThousands: 52,
        findingType: "AEO",
      },
      {
        id: "pdp-5",
        name: "Aurelle Candles Bergamot Grove Pillar Set",
        asin: "B00005UP2P",
        finding: "Missing hand-poured keyword competitors rank on",
        impactThousands: 44,
        findingType: "SEO",
      },
    ],
  },
]
