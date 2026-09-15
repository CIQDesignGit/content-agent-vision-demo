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
  brand: "Acme Pet Co.",
  title: "Acme Pet Co. — AI Visibility",
  domain: "acmepet.commerceiq.io",
  plan: "Pro",
  weekLabel: "week of 25 Aug 2026",
  refreshLabel: "next refresh Mon 1 Sep",
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
    support: "Appears in 14 of 18 tracked shopper questions",
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
    support: "Grain-free dog food · Sensitive stomach dog food",
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
  "visibility climbed **4.2 points** over the period, but AI rank slipped a place — you're appearing in more answers while competitors are appearing higher in them."

export const leaderboardRows: LeaderboardRow[] = [
  { id: "purina", name: "Purina Pro Plan", initials: "P", score: 100, rank: 1, change: null },
  { id: "blue", name: "Blue Buffalo", initials: "B", score: 91, rank: 2, change: null },
  { id: "hills", name: "Hill's Science Diet", initials: "H", score: 87, rank: 3, change: 1 },
  { id: "royal", name: "Royal Canin", initials: "R", score: 81, rank: 4, change: 1 },
  { id: "acme", name: "Acme Pet Co. (you)", initials: "A", score: 79, rank: 5, isYou: true, change: -1 },
  { id: "iams", name: "Iams", initials: "I", score: 68, rank: 6, change: null },
  { id: "wellness", name: "Wellness Core", initials: "W", score: 61, rank: 7, change: null },
  { id: "nutro", name: "Nutro", initials: "N", score: 55, rank: 8, change: 2 },
]

export const topicShares: TopicShare[] = [
  { id: "senior", name: "Senior dog food", share: 31, visibility: 100, rank: 2.0, change: 5.1, promptCount: 4 },
  { id: "dry", name: "Dry dog food", share: 23, visibility: 75, rank: 3.0, change: 2.4, promptCount: 5 },
  { id: "puppy", name: "Puppy food", share: 18, visibility: 100, rank: 5.0, change: -0.2, promptCount: 3 },
  { id: "sensitive", name: "Sensitive stomach dog food", share: 15, visibility: 75, rank: 6.0, change: -6.3, promptCount: 4 },
  { id: "grain-free", name: "Grain-free dog food", share: 2.5, visibility: 50, rank: 8.5, change: -9.0, promptCount: 4 },
]

export const topicCoverage = { tracked: 18, total: 50 }

export const topicHeadlines: TopicHeadline[] = [
  { label: "Strongest share of voice", value: "Senior dog food · 31.3%" },
  { label: "Broadest presence", value: "Senior dog food · 100%" },
  { label: "Biggest gain", value: "Senior dog food · ▲ 5.1" },
  { label: "Biggest loss", value: "Grain-free dog food · ▼ 9.0" },
]

export const topicsRead =
  "Acme Pet Co. owns the answer on **Senior dog food** — 31.3% share, the largest of any topic. Its softest theme is **Grain-free dog food** (2.5% share, position 8.5) and it lost 9 points there this period — steepest drop on the board. That's where content optimized for Alexa AI moves the most share."

export const promptRows: PromptRow[] = [
  {
    id: "p1",
    question: "show me highly rated dry kibble for dogs with allergies",
    topicId: "dry",
    topic: "Dry dog food",
    appearanceRate: 0,
    trend: [42, 28, 16, 8, 2, 0],
    change: null,
    isGap: true,
  },
  {
    id: "p2",
    question: "grain free dog food for dogs with food sensitivities",
    topicId: "grain-free",
    topic: "Grain-free dog food",
    appearanceRate: 0,
    trend: [38, 30, 22, 14, 6, 0],
    change: -25,
    isGap: true,
  },
  {
    id: "p3",
    question: "healthy grain free dog food options for adult dogs",
    topicId: "grain-free",
    topic: "Grain-free dog food",
    appearanceRate: 0,
    trend: [20, 16, 12, 8, 4, 0],
    change: null,
    isGap: true,
  },
  {
    id: "p4",
    question: "dog food recommendations for dogs with chronic diarrhea",
    topicId: "sensitive",
    topic: "Sensitive stomach dog food",
    appearanceRate: 17,
    trend: [48, 40, 34, 28, 22, 17],
    change: -17,
    isGap: true,
  },
  {
    id: "p5",
    question: "what dog food helps aging dogs with mobility and joint pain",
    topicId: "senior",
    topic: "Senior dog food",
    appearanceRate: 100,
    trend: [60, 68, 74, 82, 91, 100],
    change: 25,
    isGap: false,
  },
  {
    id: "p6",
    question: "best senior dog food for small breeds",
    topicId: "senior",
    topic: "Senior dog food",
    appearanceRate: 100,
    trend: [84, 88, 90, 94, 97, 100],
    change: 8,
    isGap: false,
  },
  {
    id: "p7",
    question: "puppy food for large breed growth",
    topicId: "puppy",
    topic: "Puppy food",
    appearanceRate: 67,
    trend: [68, 67, 67, 66, 67, 67],
    change: -0.2,
    isGap: false,
  },
  {
    id: "p8",
    question: "recommended dry dog food for everyday feeding",
    topicId: "dry",
    topic: "Dry dog food",
    appearanceRate: 75,
    trend: [62, 64, 67, 70, 73, 75],
    change: 5,
    isGap: false,
  },
]

export const promptsRead =
  "every prompt you've lost this period describes a symptom or sensitivity (\"allergies\", \"food sensitivities\", \"chronic diarrhea\") rather than a product type. Your winning prompts name the need directly. That's a content-language gap, and it's addressable in Review."

export const competitorOptions: CompetitorOption[] = [
  { id: "purina", name: "Purina Pro Plan", score: 100 },
  { id: "blue", name: "Blue Buffalo", score: 91 },
  { id: "hills", name: "Hill's Science Diet", score: 87 },
  { id: "royal", name: "Royal Canin", score: 81 },
  { id: "iams", name: "Iams", score: 68 },
  { id: "wellness", name: "Wellness Core", score: 61 },
]

export const youScore = 79

export const competitorComparisons: CompetitorComparison[] = [
  {
    competitorId: "purina",
    themScore: 100,
    gapPts: -21,
    gapDeltaPts: 4,
    summary: "Acme Pet Co. is 21 points behind Purina Pro Plan overall",
    read: "the overall gap to Purina narrowed **4 points**, but that hides the split — you're extending your lead on Senior dog food while losing ground on Grain-free and Sensitive stomach. Both losing topics share the same symptom-language gap flagged in the prompts above.",
    rows: [
      { topic: "Grain-free dog food", you: 29, them: 70, change: "widening", trend: [28, 26, 24, 22, 20, 18] },
      { topic: "Puppy food", you: 53, them: 91, change: "flatter", trend: [40, 40, 39, 39, 38, 38] },
      { topic: "Dry dog food", you: 71, them: 93, change: "closing", trend: [30, 28, 26, 24, 23, 22] },
      { topic: "Sensitive stomach dog food", you: 66, them: 84, change: "widening", trend: [10, 12, 14, 15, 17, 18] },
      { topic: "Senior dog food", you: 96, them: 88, change: "extending", trend: [2, 3, 4, 5, 7, 8] },
    ],
  },
  {
    competitorId: "blue",
    themScore: 91,
    gapPts: -12,
    gapDeltaPts: 2,
    summary: "Acme Pet Co. is 12 points behind Blue Buffalo overall",
    read: "the gap to Blue Buffalo narrowed **2 points**. Senior still carries the lead; Grain-free and Sensitive stomach remain the topics where Blue shows up first.",
    rows: [
      { topic: "Grain-free dog food", you: 29, them: 62, change: "widening", trend: [24, 26, 28, 30, 32, 33] },
      { topic: "Puppy food", you: 53, them: 78, change: "flatter", trend: [26, 25, 25, 25, 25, 25] },
      { topic: "Dry dog food", you: 71, them: 85, change: "closing", trend: [20, 18, 17, 16, 15, 14] },
      { topic: "Sensitive stomach dog food", you: 66, them: 74, change: "widening", trend: [4, 5, 6, 7, 8, 8] },
      { topic: "Senior dog food", you: 96, them: 80, change: "extending", trend: [10, 11, 13, 14, 15, 16] },
    ],
  },
  {
    competitorId: "hills",
    themScore: 87,
    gapPts: -8,
    gapDeltaPts: 1,
    summary: "Acme Pet Co. is 8 points behind Hill's Science Diet overall",
    read: "Hill's still leads on clinical and sensitive-stomach language. The overall gap narrowed **1 point**, almost entirely from Senior dog food.",
    rows: [
      { topic: "Grain-free dog food", you: 29, them: 58, change: "widening", trend: [22, 24, 25, 27, 28, 29] },
      { topic: "Puppy food", you: 53, them: 72, change: "flatter", trend: [20, 19, 19, 19, 19, 19] },
      { topic: "Dry dog food", you: 71, them: 80, change: "closing", trend: [14, 13, 12, 11, 10, 9] },
      { topic: "Sensitive stomach dog food", you: 66, them: 82, change: "widening", trend: [12, 13, 14, 15, 16, 16] },
      { topic: "Senior dog food", you: 96, them: 84, change: "extending", trend: [8, 9, 10, 11, 11, 12] },
    ],
  },
  {
    competitorId: "royal",
    themScore: 81,
    gapPts: -2,
    gapDeltaPts: 3,
    summary: "Acme Pet Co. is 2 points behind Royal Canin overall",
    read: "Royal Canin is the closest named competitor. The gap narrowed **3 points** — one more period like Senior and you take the shelf.",
    rows: [
      { topic: "Grain-free dog food", you: 29, them: 44, change: "widening", trend: [10, 11, 12, 13, 14, 15] },
      { topic: "Puppy food", you: 53, them: 64, change: "flatter", trend: [12, 12, 11, 11, 11, 11] },
      { topic: "Dry dog food", you: 71, them: 76, change: "closing", trend: [9, 8, 7, 6, 6, 5] },
      { topic: "Sensitive stomach dog food", you: 66, them: 70, change: "widening", trend: [2, 3, 3, 4, 4, 4] },
      { topic: "Senior dog food", you: 96, them: 79, change: "extending", trend: [12, 13, 14, 15, 16, 17] },
    ],
  },
  {
    competitorId: "iams",
    themScore: 68,
    gapPts: 11,
    gapDeltaPts: 2,
    summary: "Acme Pet Co. is 11 points ahead of Iams overall",
    read: "You lead Iams on every tracked topic except Grain-free. Keep the Senior language; the remaining risk is the same symptom-gap showing up in prompts.",
    rows: [
      { topic: "Grain-free dog food", you: 29, them: 36, change: "widening", trend: [4, 5, 6, 6, 7, 7] },
      { topic: "Puppy food", you: 53, them: 48, change: "extending", trend: [3, 3, 4, 4, 5, 5] },
      { topic: "Dry dog food", you: 71, them: 58, change: "extending", trend: [8, 9, 10, 11, 12, 13] },
      { topic: "Sensitive stomach dog food", you: 66, them: 54, change: "closing", trend: [16, 15, 14, 13, 13, 12] },
      { topic: "Senior dog food", you: 96, them: 61, change: "extending", trend: [28, 30, 32, 33, 34, 35] },
    ],
  },
  {
    competitorId: "wellness",
    themScore: 61,
    gapPts: 18,
    gapDeltaPts: 3,
    summary: "Acme Pet Co. is 18 points ahead of Wellness Core overall",
    read: "Wellness is not the competitive threat — Purina and Blue Buffalo are. The 18-point lead is widest on Senior and thinnest on Grain-free.",
    rows: [
      { topic: "Grain-free dog food", you: 29, them: 33, change: "flatter", trend: [5, 5, 4, 4, 4, 4] },
      { topic: "Puppy food", you: 53, them: 41, change: "extending", trend: [8, 9, 10, 11, 11, 12] },
      { topic: "Dry dog food", you: 71, them: 52, change: "extending", trend: [14, 15, 16, 17, 18, 19] },
      { topic: "Sensitive stomach dog food", you: 66, them: 49, change: "extending", trend: [12, 13, 14, 15, 16, 17] },
      { topic: "Senior dog food", you: 96, them: 55, change: "extending", trend: [34, 36, 38, 39, 40, 41] },
    ],
  },
]
