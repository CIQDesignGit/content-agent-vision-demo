import type {
  CalendarEvent,
  CalendarTimelineMarker,
  LostToInactionData,
  OpportunityMeterData,
  OpportunityStatusSegment,
  SecondaryStat,
  UpcomingMoment,
  UpNextData,
  ValuePillar,
} from "./types"

export const opportunityMeter: OpportunityMeterData = {
  /** Active opportunity only — forfeited / past windows are excluded. */
  identifiedMillions: 4.81,
  realizedMillions: 1.84,
  yearLabel: "2026",
}

export const opportunityByStatus: OpportunityStatusSegment[] = [
  {
    id: "captured",
    label: "Captured",
    amountLabel: "$1.84M",
    millions: 1.84,
    tooltip:
      "Opportunity already realized — content changes are live on retailer PDPs and contributing to incremental sales.",
  },
  {
    id: "deadline",
    label: "On a deadline",
    amountLabel: "$2.61M",
    millions: 2.61,
    tooltip:
      "Opportunity tied to an upcoming event window. Publish by the date to capture the lift before the moment passes.",
  },
  {
    id: "open",
    label: "Open",
    amountLabel: "$360K",
    millions: 0.36,
    tooltip:
      "Identified opportunity with no hard event deadline yet. Still available to capture through review and publish.",
  },
]

export const secondaryStats: SecondaryStat[] = [
  {
    id: "changes-approved",
    label: "Changes approved",
    value: "128",
    delta: "+14",
  },
  {
    id: "time-saved",
    label: "Analyst time saved",
    value: "47 hrs",
  },
  {
    id: "ai-share",
    label: "Share of AI answers",
    value: "#2",
    delta: "+1",
  },
  {
    id: "approve-to-live",
    label: "Median approve-to-live",
    value: "3.1 days",
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
  eventDateLabel: "Jul 2025",
  support:
    "210 deal SKUs still had title and bullet gaps when the event window closed.",
}

export const valuePillars: ValuePillar[] = [
  {
    id: "foundational",
    kind: "foundational",
    title: "Foundational lift",
    displayValue: "$1.1M",
    tag: { label: "one-time", tone: "neutral" },
    support: "Title and bullet coverage gaps closed across the core catalog.",
    confidence: "high",
    methodology:
      "Based on a 20-SKU pilot, 2.1% conversion lift, scaled to 1,200 SKUs.",
    benchmark: "1.4× category median title completeness",
  },
  {
    id: "seasonal",
    kind: "seasonal",
    title: "Seasonal lift",
    displayValue: "$2.31M",
    tag: { label: "recurring", tone: "recurring" },
    support: "Event-tied copy ready for Black Friday through gift guides.",
    confidence: "med",
    methodology:
      "Modeled from last year’s seasonal attach rate on 340 event SKUs.",
    benchmark: "vs. prior Black Friday content window",
  },
  {
    id: "aeo",
    kind: "aeo",
    title: "AI driven sales",
    displayValue: "$1.4M",
    support: "Share of voice in AI answers tracking up over the last 10 weeks.",
    confidence: "med",
    methodology:
      "Attributed share-of-voice gains across tracked prompts × category AOV.",
    sparkline: [18, 19, 21, 20, 23, 24, 26, 25, 28, 31],
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
        name: "Pro Series Blender 900",
        asin: "B07QK4Z1MN",
        imageUrl: "https://placehold.co/80x80?text=Z1MN",
        finding: "No promo keyword in title",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$84K",
      },
      {
        id: "bf-2",
        name: "Cordless Vac X2",
        asin: "B08LM2W7PP",
        imageUrl: "https://placehold.co/80x80?text=W7PP",
        finding: "Bullets don't state the deal terms",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$71K",
      },
      {
        id: "bf-3",
        name: "Air Fryer 6QT Gift Set",
        asin: "B09TT5R2QD",
        imageUrl: "https://placehold.co/80x80?text=R2QD",
        finding: "Bundle contents not described",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$63K",
      },
      {
        id: "bf-4",
        name: "Espresso Maker Duo",
        asin: "B07YH9L3KC",
        imageUrl: "https://placehold.co/80x80?text=L3KC",
        finding: "3 attributes missing for answer coverage",
        driver: "aeo",
        driverLabel: "AI visibility",
        impactLabel: "$52K",
      },
      {
        id: "bf-5",
        name: "Stand Mixer 5.5L",
        asin: "B08FG6N8VT",
        imageUrl: "https://placehold.co/80x80?text=N8VT",
        finding: "Title truncated at 142 characters",
        driver: "foundational",
        driverLabel: "Foundational",
        impactLabel: "$47K",
      },
      {
        id: "bf-6",
        name: "Robot Mop M3",
        asin: "B09WD1X4HB",
        imageUrl: "https://placehold.co/80x80?text=X4HB",
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
        name: "Wireless Earbuds Pro",
        asin: "B08XK2M1AA",
        imageUrl: "https://placehold.co/80x80?text=M1AA",
        finding: "No Cyber Monday offer language in title",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$58K",
      },
      {
        id: "cm-2",
        name: "Smart Watch S4",
        asin: "B09PL7N2BB",
        imageUrl: "https://placehold.co/80x80?text=N2BB",
        finding: "Fulfillment type unclear for AI answers",
        driver: "aeo",
        driverLabel: "AI visibility",
        impactLabel: "$44K",
      },
      {
        id: "cm-3",
        name: "USB-C Hub 7-in-1",
        asin: "B07HH3C4DD",
        imageUrl: "https://placehold.co/80x80?text=C4DD",
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
        name: "Candle Trio Gift Set",
        asin: "B0A11GIFT1",
        imageUrl: "https://placehold.co/80x80?text=IFT1",
        finding: "No occasion or recipient keywords",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$39K",
      },
      {
        id: "gg-2",
        name: "Skincare Starter Kit",
        asin: "B0A22GIFT2",
        imageUrl: "https://placehold.co/80x80?text=IFT2",
        finding: "Price-band attributes missing for gift prompts",
        driver: "aeo",
        driverLabel: "AI visibility",
        impactLabel: "$31K",
      },
      {
        id: "gg-3",
        name: "Coffee Brewer Mini",
        asin: "B0A33GIFT3",
        imageUrl: "https://placehold.co/80x80?text=IFT3",
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
    skuCount: 128,
    status: "captured",
    dateLabel: "Aug 4",
    insightSummary:
      "You published fixes on 128 SKUs before the window closed — titles, bullets, and AEO attributes for the highest-impact assortment.",
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
        name: "Laptop Sleeve 15in",
        asin: "B0BTS001AA",
        imageUrl: "https://placehold.co/80x80?text=001AA",
        finding: "Published school-season keywords in title",
        driver: "seasonal",
        driverLabel: "Seasonal",
        impactLabel: "$48K",
      },
      {
        id: "bts-2",
        name: "Noise-Cancel Headphones",
        asin: "B0BTS002BB",
        imageUrl: "https://placehold.co/80x80?text=002BB",
        finding: "Filled dorm / study-use attributes for AI answers",
        driver: "aeo",
        driverLabel: "AI visibility",
        impactLabel: "$41K",
      },
      {
        id: "bts-3",
        name: "Desk Lamp LED",
        asin: "B0BTS003CC",
        imageUrl: "https://placehold.co/80x80?text=003CC",
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
