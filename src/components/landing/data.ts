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

export const opportunityMeter: OpportunityMeterData = {
  /** Active opportunity only — forfeited / past windows are excluded. */
  identifiedMillions: 4.81,
  realizedMillions: 0.8,
  yearLabel: "2026",
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
      "Opportunity tied to an upcoming event window. Publish by the date to capture the lift before the moment passes.",
  },
  {
    id: "pdp",
    label: "PDP optimization",
    amountLabel: "$360K",
    millions: 0.36,
    tooltip:
      "Always-on SEO and AEO lifts with no hard event deadline. Still available to capture through review and publish.",
  },
  {
    id: "expired",
    label: "Expired",
    amountLabel: "$890K",
    millions: 0.89,
    muted: true,
    tooltip:
      "Past windows that closed before publish — excluded from your active opportunity total.",
  },
]

export const opportunityCalculation: OpportunityCalculationData = {
  annualized: {
    id: "annualized",
    tabLabel: "Annualized opportunity",
    heading: "Annualized Opportunity Size",
    periodBadge: "Aug 2026 – Jul 2027",
    heroAmountLabel: "$3.95M",
    foundationalLiftLabel: "Foundational lift",
    foundationalLiftAmount: "$1.96M",
    seasonalLiftLabel: "Seasonal lift",
    seasonalLiftAmount: "$1.99M",
    liftBarPct: { foundational: 50, seasonal: 50 },
    kpis: [
      { value: "42", label: "SKUs A/B tested in pilot" },
      { value: "+3.0%", label: "Median sales lift" },
      { value: "38 of 42", label: "Challenger won" },
    ],
    calcRows: [
      {
        label: "Annual revenue, SKUs not yet optimized",
        value: "$65.3M",
      },
      { label: "× pilot lift rate", value: "3.0%" },
      {
        label: "Foundational lift",
        value: "$1.96M",
        variant: "subtotal",
      },
      {
        label: "Revenue in the 2 weeks after each of 17 events",
        value: "$66.2M",
      },
      { label: "× pilot lift rate", value: "3.0%" },
      {
        label: "Seasonal lift",
        value: "$1.99M",
        variant: "subtotal",
      },
    ],
    calcSummary: {
      label: "Opportunity ahead",
      value: "$3.95M",
      variant: "total",
    },
    methodology:
      "Revenue figures come from your Vendor Central history, pulled at onboarding. As new tests run the rate updates, and every change keeps a dated audit trail.",
  },
  valueRealized: {
    id: "value-realized",
    tabLabel: "Value Realized",
    heading: "Value realized",
    periodBadge: "Aug 2026 – Sep 2026",
    trendBadge: { label: "+$340K this month", positive: true },
    heroAmountLabel: "$800K",
    heroBordered: true,
    foundationalLiftLabel: "Foundational lift",
    foundationalLiftAmount: "$600K",
    seasonalLiftLabel: "Seasonal lift",
    seasonalLiftAmount: "$200K",
    liftBarPct: { foundational: 75, seasonal: 25 },
    kpis: [
      { value: "128", label: "SKUs live" },
      { value: "3.1 days", label: "Median approve-to-live" },
      { value: "5 mo", label: "Accruing since Apr" },
    ],
    calcRows: [],
    bodyCopy:
      "Counts only the 128 SKUs acted on, accrued over the days their content was actually live — not the full-year value of a test that concluded last month. Each SKU's rate comes from its own A/B result where one exists, and from the demand-adjusted baseline model where Amazon won't test it.",
    cta: {
      label: "See SKU-level attribution in Agent Impact",
      href: "/impact",
    },
    unrealized: {
      title: "Identified but never published",
      amountLabel: "$260K",
      description:
        "Prime Day, Jul 2026. 210 deal SKUs still had gaps when syndication cut off. Not part of the total above and not recoverable — shown so the gap between what was found and what shipped stays visible.",
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

/** Accordion streams that replace the open publish-by calendar list. */
export const opportunityStreams: OpportunityStream[] = [
  {
    id: "retail-readiness",
    title: "Retail-readiness",
    context: "of catalog is retail-ready",
    skuCount: 342,
    valueLabel: "$410K",
    valueKind: "blocked",
    tone: "warning",
    readyPercent: 94,
    insight:
      "**342 SKUs** are missing required **Amazon attributes** — item weight, safety details, technical specs. Amazon won’t accept a content push until these are backfilled, so **$410K** of **PDP fixes** already queued are stuck behind this, not in addition to it.",
    remainingLabel: "338 more SKUs, $389K blocked in total.",
    rows: [
      {
        id: "rr-1",
        name: "Yankee Candle Black Cherry Large Jar",
        asin: "B08NF9KBZ4",
        finding: "6 attributes missing — material, weight, safety",
        impactThousands: 8.9,
      },
      {
        id: "rr-2",
        name: "NutriChef Food Processor 8-Cup",
        asin: "B00I0DI0Z6",
        finding: "4 attributes missing — care instructions, weight",
        impactThousands: 6.1,
      },
      {
        id: "rr-3",
        name: "Proctor Silex 2-Slice Toaster",
        asin: "B00FQK1H8C",
        finding: "3 attributes missing — battery type, dimensions",
        impactThousands: 3.4,
      },
      {
        id: "rr-4",
        name: "Instant Pot Duo 7-in-1, 6 Qt",
        asin: "B00FLYWNYQ",
        finding: "9 attributes missing — material, capacity, safety",
        impactThousands: 2.8,
      },
    ],
  },
  {
    id: "seasonal",
    title: "Seasonal",
    context: "Next up · Black Friday · Publish by Sep 15 ·",
    contextHighlight: "5 days to act",
    skuCount: 384,
    valueLabel: "$1.24M",
    valueKind: "potential",
    tone: "default",
    insight:
      "**384 SKUs** are missing event-ready titles, deal framing, or bundle language for **Black Friday**. I ranked them by revenue each fix is worth, so the **top 20** carry about **a third of the total**.",
    queueNote:
      "Cyber Monday ($860K) and Holiday Gift Guide ($510K) are queued next — they’ll open here once this window closes.",
    remainingLabel: "378 more SKUs worth $882K, ranked by impact.",
    rows: [
      {
        id: "bf-1",
        name: "Vitamix E310 Explorian Blender",
        asin: "B079KLGWGR",
        finding: "No promo keyword in title",
        impactThousands: 84,
      },
      {
        id: "bf-2",
        name: "Dyson V11 Animal Cordless Vacuum",
        asin: "B07GR5MSKD",
        finding: "Bullets don't state the deal terms",
        impactThousands: 71,
      },
      {
        id: "bf-3",
        name: "KitchenAid Artisan 5-Quart Mixer",
        asin: "B00005UP2P",
        finding: "Bundle contents not described",
        impactThousands: 63,
      },
      {
        id: "bf-4",
        name: "Instant Pot Duo 7-in-1, 6 Qt",
        asin: "B00FLYWNYQ",
        finding: "No Black Friday urgency language",
        impactThousands: 52,
      },
      {
        id: "bf-5",
        name: "Shark Navigator Lift-Away Vacuum",
        asin: "B003IH3JN4",
        finding: "Title truncated at 142 characters",
        impactThousands: 47,
      },
      {
        id: "bf-6",
        name: "iRobot Roomba i3+ EVO",
        asin: "B08C4L7HC1",
        finding: "Bullets 4 and 5 empty",
        impactThousands: 41,
      },
    ],
  },
  {
    id: "pdp",
    title: "PDP optimization",
    context: "Always on · SEO & AEO · No deadline",
    skuCount: 612,
    valueLabel: "$2.50M",
    valueKind: "potential",
    tone: "default",
    insight:
      "**612 SKUs** are missing category-standard keywords, competitor-matched terms, or the structured specs that let an **AI answer engine** cite the listing directly.",
    remainingLabel: "607 more SKUs worth $2.20M, ranked by impact.",
    rows: [
      {
        id: "pdp-1",
        name: "NutriChef Food Processor 8-Cup",
        asin: "B00I0DI0Z6",
        finding: "Missing top category keywords in bullets",
        impactThousands: 84,
        findingType: "SEO",
      },
      {
        id: "pdp-2",
        name: "Yankee Candle Black Cherry Large Jar",
        asin: "B08NF9KBZ4",
        finding: "No answer-ready specs for 'best candle' prompts",
        impactThousands: 67,
        findingType: "AEO",
      },
      {
        id: "pdp-3",
        name: "Proctor Silex 2-Slice Toaster",
        asin: "B00FQK1H8C",
        finding: "Title missing key search term 'wide slot'",
        impactThousands: 58,
        findingType: "SEO",
      },
      {
        id: "pdp-4",
        name: "Vevor Electric Grain Mill Grinder",
        asin: "B00H8R3KM2",
        finding: "Bullets don't answer common comparison prompts",
        impactThousands: 52,
        findingType: "AEO",
      },
      {
        id: "pdp-5",
        name: "KitchenAid Artisan 5-Quart Mixer",
        asin: "B00005UP2P",
        finding: "Missing burr-type keyword competitors rank on",
        impactThousands: 44,
        findingType: "SEO",
      },
    ],
  },
]
