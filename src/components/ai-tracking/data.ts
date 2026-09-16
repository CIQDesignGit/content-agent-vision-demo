import type {
  CompetitorComparison,
  CompetitorOption,
  LeaderboardRow,
  PerformancePoint,
  PromptRow,
  StandingMetric,
  TopicHeadline,
  TopicShare,
} from "./types"

export const trackingMeta = {
  brand: "Aurelle Candles",
  title: "Aurelle Candles — AI Visibility",
  domain: "aurellecandles.commerceiq.io",
  plan: "Pro",
}

export const periodOptions = [
  { id: "12w" as const, label: "Last 12 weeks vs. previous period" },
  { id: "4w" as const, label: "Last 4 weeks vs. previous period" },
]

export const standingMetrics: StandingMetric[] = [
  {
    id: "visibility",
    label: "Brand visibility",
    value: "77.8%",
    support: "Appears in 14 of 18 tracked candle questions",
    deltaLabel: "4.2 pts vs. previous period",
    deltaTone: "up",
  },
  {
    id: "rank",
    label: "AI rank",
    value: "#5",
    support: "Weighted share of voice + best position. Lower is better.",
    deltaLabel: "1 place vs. previous period",
    deltaTone: "down",
  },
  {
    id: "losing",
    label: "Topics losing ground",
    value: "2 of 5",
    support: "Unscented candles · Clean-burning candles",
    deltaLabel: "same as previous",
    deltaTone: "flat",
  },
]

export const performanceSeries: PerformancePoint[] = [
  { label: "9 Jun", visibility: 54, rank: 6.4, competitorVisibility: 61 },
  { label: "23 Jun", visibility: 57, rank: 6.2, competitorVisibility: 63 },
  { label: "7 Jul", visibility: 62, rank: 5.9, competitorVisibility: 65 },
  { label: "21 Jul", visibility: 68, rank: 5.6, competitorVisibility: 68 },
  { label: "4 Aug", visibility: 74, rank: 5.3, competitorVisibility: 70 },
  { label: "18 Aug", visibility: 77.8, rank: 5.0, competitorVisibility: 73 },
]

export const performanceRead =
  "visibility climbed **4.2 points** over the period, but AI rank slipped a place — you're appearing in more candle answers while competitors are appearing higher in them."

export const leaderboardRows: LeaderboardRow[] = [
  { id: "bbw", name: "Bath & Body Works", initials: "B", score: 100, rank: 1, change: null },
  { id: "voluspa", name: "Voluspa", initials: "V", score: 91, rank: 2, change: null },
  { id: "woodwick", name: "WoodWick", initials: "W", score: 87, rank: 3, change: 1 },
  { id: "yankee", name: "Yankee Candle", initials: "Y", score: 81, rank: 4, change: 1 },
  { id: "aurelle", name: "Aurelle Candles (you)", initials: "A", score: 79, rank: 5, isYou: true, change: -1 },
  { id: "nest", name: "Nest Fragrances", initials: "N", score: 68, rank: 6, change: null },
  { id: "paddywax", name: "Paddywax", initials: "P", score: 61, rank: 7, change: null },
  { id: "chesapeake", name: "Chesapeake Bay Candle", initials: "C", score: 55, rank: 8, change: 2 },
]

export const topicShares: TopicShare[] = [
  { id: "jar", name: "Scented jar candles", share: 31, visibility: 100, rank: 2.0, change: 5.1, promptCount: 4 },
  { id: "soy", name: "Soy candles", share: 23, visibility: 75, rank: 3.0, change: 2.4, promptCount: 5 },
  { id: "gift", name: "Gift sets", share: 18, visibility: 100, rank: 5.0, change: -0.2, promptCount: 3 },
  { id: "clean", name: "Clean-burning candles", share: 15, visibility: 75, rank: 6.0, change: -6.3, promptCount: 4 },
  { id: "unscented", name: "Unscented candles", share: 2.5, visibility: 50, rank: 8.5, change: -9.0, promptCount: 4 },
]

export const topicCoverage = { tracked: 18, total: 50 }

export const topicHeadlines: TopicHeadline[] = [
  { label: "Strongest share of voice", value: "Scented jar candles · 31.3%" },
  { label: "Broadest presence", value: "Scented jar candles · 100%" },
  { label: "Biggest gain", value: "Scented jar candles · ▲ 5.1" },
  { label: "Biggest loss", value: "Unscented candles · ▼ 9.0" },
]

export const topicsRead =
  "Aurelle Candles owns the answer on **Scented jar candles** — 31.3% share, the largest of any topic. Its softest theme is **Unscented candles** (2.5% share, position 8.5) and it lost 9 points there this period — steepest drop on the board. That's where content optimized for Alexa AI moves the most share."

export const promptRows: PromptRow[] = [
  {
    id: "p1",
    question: "show me highly rated candles for people with scent allergies",
    topicId: "soy",
    topic: "Soy candles",
    appearanceRate: 0,
    trend: [42, 28, 16, 8, 2, 0],
    change: null,
    isGap: true,
  },
  {
    id: "p2",
    question: "unscented candles that still burn for a long time",
    topicId: "unscented",
    topic: "Unscented candles",
    appearanceRate: 0,
    trend: [38, 30, 22, 14, 6, 0],
    change: -25,
    isGap: true,
  },
  {
    id: "p3",
    question: "fragrance-free candles that won't trigger a headache",
    topicId: "unscented",
    topic: "Unscented candles",
    appearanceRate: 0,
    trend: [20, 16, 12, 8, 4, 0],
    change: null,
    isGap: true,
  },
  {
    id: "p4",
    question: "candles that won't soot or smoke up my walls",
    topicId: "clean",
    topic: "Clean-burning candles",
    appearanceRate: 17,
    trend: [48, 40, 34, 28, 22, 17],
    change: -17,
    isGap: true,
  },
  {
    id: "p5",
    question: "best large jar candle for a living room that burns for hours",
    topicId: "jar",
    topic: "Scented jar candles",
    appearanceRate: 100,
    trend: [60, 68, 74, 82, 91, 100],
    change: 25,
    isGap: false,
  },
  {
    id: "p6",
    question: "scented jar candle that smells like cherry or warm spice",
    topicId: "jar",
    topic: "Scented jar candles",
    appearanceRate: 100,
    trend: [84, 88, 90, 94, 97, 100],
    change: 8,
    isGap: false,
  },
  {
    id: "p7",
    question: "candle gift set for a housewarming",
    topicId: "gift",
    topic: "Gift sets",
    appearanceRate: 67,
    trend: [68, 67, 67, 66, 67, 67],
    change: -0.2,
    isGap: false,
  },
  {
    id: "p8",
    question: "soy candle for everyday use on a coffee table",
    topicId: "soy",
    topic: "Soy candles",
    appearanceRate: 75,
    trend: [62, 64, 67, 70, 73, 75],
    change: 5,
    isGap: false,
  },
]

export const promptsRead =
  "every prompt you've lost this period describes a constraint (\"scent allergies\", \"fragrance-free\", \"won't soot\") rather than a candle type. Your winning prompts name the need directly — a large jar, a cherry scent, a gift set. That's a content-language gap, and it's addressable in Review."

export const competitorOptions: CompetitorOption[] = [
  { id: "bbw", name: "Bath & Body Works", score: 100 },
  { id: "voluspa", name: "Voluspa", score: 91 },
  { id: "woodwick", name: "WoodWick", score: 87 },
  { id: "yankee", name: "Yankee Candle", score: 81 },
  { id: "nest", name: "Nest Fragrances", score: 68 },
  { id: "paddywax", name: "Paddywax", score: 61 },
]

export const youScore = 79

export const competitorComparisons: CompetitorComparison[] = [
  {
    competitorId: "bbw",
    themScore: 100,
    gapPts: -21,
    gapDeltaPts: 4,
    summary: "Aurelle Candles is 21 points behind Bath & Body Works overall",
    read: "the overall gap to Bath & Body Works narrowed **4 points**, but that hides the split — you're extending your lead on Scented jar candles while losing ground on Unscented and Clean-burning. Both losing topics share the same constraint-language gap flagged in the prompts above.",
    rows: [
      { topic: "Unscented candles", you: 29, them: 70, change: "widening", trend: [28, 26, 24, 22, 20, 18] },
      { topic: "Gift sets", you: 53, them: 91, change: "flatter", trend: [40, 40, 39, 39, 38, 38] },
      { topic: "Soy candles", you: 71, them: 93, change: "closing", trend: [30, 28, 26, 24, 23, 22] },
      { topic: "Clean-burning candles", you: 66, them: 84, change: "widening", trend: [10, 12, 14, 15, 17, 18] },
      { topic: "Scented jar candles", you: 96, them: 88, change: "extending", trend: [2, 3, 4, 5, 7, 8] },
    ],
  },
  {
    competitorId: "voluspa",
    themScore: 91,
    gapPts: -12,
    gapDeltaPts: 2,
    summary: "Aurelle Candles is 12 points behind Voluspa overall",
    read: "the gap to Voluspa narrowed **2 points**. Scented jar candles still carry the lead; Unscented and Clean-burning remain the topics where Voluspa shows up first.",
    rows: [
      { topic: "Unscented candles", you: 29, them: 62, change: "widening", trend: [24, 26, 28, 30, 32, 33] },
      { topic: "Gift sets", you: 53, them: 78, change: "flatter", trend: [26, 25, 25, 25, 25, 25] },
      { topic: "Soy candles", you: 71, them: 85, change: "closing", trend: [20, 18, 17, 16, 15, 14] },
      { topic: "Clean-burning candles", you: 66, them: 74, change: "widening", trend: [4, 5, 6, 7, 8, 8] },
      { topic: "Scented jar candles", you: 96, them: 80, change: "extending", trend: [10, 11, 13, 14, 15, 16] },
    ],
  },
  {
    competitorId: "woodwick",
    themScore: 87,
    gapPts: -8,
    gapDeltaPts: 1,
    summary: "Aurelle Candles is 8 points behind WoodWick overall",
    read: "WoodWick still leads on clean-burn and low-soot language. The overall gap narrowed **1 point**, almost entirely from Scented jar candles.",
    rows: [
      { topic: "Unscented candles", you: 29, them: 58, change: "widening", trend: [22, 24, 25, 27, 28, 29] },
      { topic: "Gift sets", you: 53, them: 72, change: "flatter", trend: [20, 19, 19, 19, 19, 19] },
      { topic: "Soy candles", you: 71, them: 80, change: "closing", trend: [14, 13, 12, 11, 10, 9] },
      { topic: "Clean-burning candles", you: 66, them: 82, change: "widening", trend: [12, 13, 14, 15, 16, 16] },
      { topic: "Scented jar candles", you: 96, them: 84, change: "extending", trend: [8, 9, 10, 11, 11, 12] },
    ],
  },
  {
    competitorId: "yankee",
    themScore: 81,
    gapPts: -2,
    gapDeltaPts: 3,
    summary: "Aurelle Candles is 2 points behind Yankee Candle overall",
    read: "Yankee Candle is the closest named competitor. The gap narrowed **3 points** — one more period like Scented jar candles and you take the shelf.",
    rows: [
      { topic: "Unscented candles", you: 29, them: 44, change: "widening", trend: [10, 11, 12, 13, 14, 15] },
      { topic: "Gift sets", you: 53, them: 64, change: "flatter", trend: [12, 12, 11, 11, 11, 11] },
      { topic: "Soy candles", you: 71, them: 76, change: "closing", trend: [9, 8, 7, 6, 6, 5] },
      { topic: "Clean-burning candles", you: 66, them: 70, change: "widening", trend: [2, 3, 3, 4, 4, 4] },
      { topic: "Scented jar candles", you: 96, them: 79, change: "extending", trend: [12, 13, 14, 15, 16, 17] },
    ],
  },
  {
    competitorId: "nest",
    themScore: 68,
    gapPts: 11,
    gapDeltaPts: 2,
    summary: "Aurelle Candles is 11 points ahead of Nest Fragrances overall",
    read: "You lead Nest Fragrances on every tracked topic except Unscented candles. Keep the jar-candle language; the remaining risk is the same constraint-gap showing up in prompts.",
    rows: [
      { topic: "Unscented candles", you: 29, them: 36, change: "widening", trend: [4, 5, 6, 6, 7, 7] },
      { topic: "Gift sets", you: 53, them: 48, change: "extending", trend: [3, 3, 4, 4, 5, 5] },
      { topic: "Soy candles", you: 71, them: 58, change: "extending", trend: [8, 9, 10, 11, 12, 13] },
      { topic: "Clean-burning candles", you: 66, them: 54, change: "closing", trend: [16, 15, 14, 13, 13, 12] },
      { topic: "Scented jar candles", you: 96, them: 61, change: "extending", trend: [28, 30, 32, 33, 34, 35] },
    ],
  },
  {
    competitorId: "paddywax",
    themScore: 61,
    gapPts: 18,
    gapDeltaPts: 3,
    summary: "Aurelle Candles is 18 points ahead of Paddywax overall",
    read: "Paddywax is not the competitive threat — Bath & Body Works and Voluspa are. The 18-point lead is widest on Scented jar candles and thinnest on Unscented candles.",
    rows: [
      { topic: "Unscented candles", you: 29, them: 33, change: "flatter", trend: [5, 5, 4, 4, 4, 4] },
      { topic: "Gift sets", you: 53, them: 41, change: "extending", trend: [8, 9, 10, 11, 11, 12] },
      { topic: "Soy candles", you: 71, them: 52, change: "extending", trend: [14, 15, 16, 17, 18, 19] },
      { topic: "Clean-burning candles", you: 66, them: 49, change: "extending", trend: [12, 13, 14, 15, 16, 17] },
      { topic: "Scented jar candles", you: 96, them: 55, change: "extending", trend: [34, 36, 38, 39, 40, 41] },
    ],
  },
]
