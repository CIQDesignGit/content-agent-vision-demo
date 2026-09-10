import type {
  LostToInactionData,
  OpportunityMeterData,
  SecondaryStat,
  UpcomingMoment,
  ValuePillar,
} from "./types"

export const opportunityMeter: OpportunityMeterData = {
  identifiedMillions: 5.7,
  realizedMillions: 1.84,
  timelineLabel: "end of 2026",
}

export const secondaryStats: SecondaryStat[] = [
  {
    id: "actions",
    label: "Actions taken so far",
    value: "128",
    delta: "+14",
  },
  {
    id: "time-saved",
    label: "Time saved",
    value: "47 hrs",
    delta: "This month",
  },
  {
    id: "ai-rank",
    label: "AI Rank",
    value: "#2",
    delta: "+1",
  },
]

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
    displayValue: "$3.2M",
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
    title: "AEO drive sales",
    displayValue: "$1.4M",
    support: "Share of voice in AI answers tracking up over the last 10 weeks.",
    confidence: "med",
    methodology:
      "Attributed share-of-voice gains across tracked prompts × category AOV.",
    sparkline: [18, 19, 21, 20, 23, 24, 26, 25, 28, 31],
  },
]

/** Near-term action windows — dollar-first, sorted by impact. */
export const upcomingMoments: UpcomingMoment[] = [
  {
    id: "bf",
    name: "Black Friday",
    valueLabel: "$2.4M",
    daysUntil: 9,
    skuCount: 384,
    commonIssues:
      "Missing promo keywords in titles, weak deal framing in bullets, and thin holiday bundle language on hero SKUs.",
    dimensions: [
      {
        kind: "seasonal",
        label: "Seasonal lift",
        potential: "+$1.6M",
        potentialMillions: 1.6,
        note: "Event-ready titles and bullets on deal and gift-set SKUs.",
      },
      {
        kind: "aeo",
        label: "AI visibility",
        potential: "+$0.5M",
        potentialMillions: 0.5,
        note: "Answer-ready attributes for “best Black Friday [category]” prompts.",
      },
      {
        kind: "foundational",
        label: "Foundational lift",
        potential: "+$0.3M",
        potentialMillions: 0.3,
        note: "Close coverage gaps on incomplete titles and empty bullets.",
      },
    ],
  },
  {
    id: "cm",
    name: "Cyber Monday",
    valueLabel: "$1.8M",
    daysUntil: 12,
    skuCount: 261,
    commonIssues:
      "Digital-deal SKUs still use generic copy; shipping and exclusivity claims are inconsistent across variants.",
    dimensions: [
      {
        kind: "seasonal",
        label: "Seasonal lift",
        potential: "+$1.1M",
        potentialMillions: 1.1,
        note: "Cyber-specific offer language and urgency cues on top converters.",
      },
      {
        kind: "aeo",
        label: "AI visibility",
        potential: "+$0.4M",
        potentialMillions: 0.4,
        note: "Clarify digital vs. physical fulfillment for AI shopping answers.",
      },
      {
        kind: "foundational",
        label: "Foundational lift",
        potential: "+$0.3M",
        potentialMillions: 0.3,
        note: "Normalize variant titles so size/color doesn’t bury the deal.",
      },
    ],
  },
  {
    id: "gg",
    name: "Holiday Gift Guide",
    valueLabel: "$1.1M",
    daysUntil: 27,
    skuCount: 147,
    commonIssues:
      "Giftability signals are sparse — few “for her/him/kids” cues, occasion tags, and bundle storytelling.",
    dimensions: [
      {
        kind: "seasonal",
        label: "Seasonal lift",
        potential: "+$0.6M",
        potentialMillions: 0.6,
        note: "Gift-guide framing and occasion keywords on curated sets.",
      },
      {
        kind: "aeo",
        label: "AI visibility",
        potential: "+$0.3M",
        potentialMillions: 0.3,
        note: "Surface recipient and price-band attributes for gift prompts.",
      },
      {
        kind: "foundational",
        label: "Foundational lift",
        potential: "+$0.2M",
        potentialMillions: 0.2,
        note: "Fill missing images alt text and incomplete descriptions.",
      },
    ],
  },
]

