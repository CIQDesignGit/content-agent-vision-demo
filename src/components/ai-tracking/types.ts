export type PeriodId = "12w" | "4w"

export type TopicSort = "share" | "movement"

export type PromptFilter = "losing" | "all" | "winning"

export type DeltaTone = "up" | "down" | "flat"

export interface StandingMetric {
  id: string
  label: string
  value: string
  support: string
  deltaLabel: string
  deltaTone: DeltaTone
}

export interface PerformancePoint {
  label: string
  visibility: number
  rank: number
  competitorVisibility: number
}

export interface LeaderboardRow {
  id: string
  name: string
  initials: string
  score: number
  rank: number
  isYou?: boolean
  change: number | null
}

export interface TopicShare {
  id: string
  name: string
  share: number
  visibility: number
  rank: number
  change: number
  promptCount: number
}

export interface TopicHeadline {
  label: string
  value: string
}

export interface PromptRow {
  id: string
  question: string
  topicId: string
  topic: string
  appearanceRate: number
  trend: number[]
  change: number | null
  isGap: boolean
}

export interface CompetitorOption {
  id: string
  name: string
  score: number
}

export interface TopicGapRow {
  topic: string
  you: number
  them: number
  change: "widening" | "flatter" | "closing" | "extending"
  trend: number[]
}

export interface CompetitorComparison {
  competitorId: string
  themScore: number
  gapPts: number
  gapDeltaPts: number
  summary: string
  read: string
  rows: TopicGapRow[]
}
