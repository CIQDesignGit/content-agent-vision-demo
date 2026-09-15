"use client"

import { useEffect, useState } from "react"
import { AlexaLeaderboard } from "./alexa-leaderboard"
import { CompetitorCompare } from "./competitor-compare"
import { PerformanceChart } from "./performance-chart"
import { PromptPerformance } from "./prompt-performance"
import { SectionKicker } from "./shared"
import { StandingMetrics } from "./standing-metrics"
import { TopicsSection } from "./topics-section"
import { TrackingHeader } from "./tracking-header"
import type { PeriodId, PromptFilter, TopicSort } from "./types"

export function AiTrackingView() {
  const [mounted, setMounted] = useState(false)
  const [period, setPeriod] = useState<PeriodId>("12w")
  const [topicSort, setTopicSort] = useState<TopicSort>("share")
  const [promptFilter, setPromptFilter] = useState<PromptFilter>("losing")
  const [topicId, setTopicId] = useState<string | null>(null)
  const [competitorId, setCompetitorId] = useState("purina")

  useEffect(() => {
    setMounted(true)
  }, [])

  function viewTopicPrompts(nextTopicId: string) {
    setTopicId(nextTopicId)
    setPromptFilter("all")
    document.getElementById("prompt-performance")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  if (!mounted) {
    return <div className="mx-auto min-h-[60vh] w-full max-w-[1200px] px-6 py-8" />
  }

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-8">
      <TrackingHeader period={period} onPeriodChange={setPeriod} />

      <section className="flex flex-col gap-4">
        <SectionKicker>Brand — overall standing</SectionKicker>
        <StandingMetrics />
        <PerformanceChart />
        <AlexaLeaderboard />
      </section>

      <TopicsSection
        sort={topicSort}
        onSortChange={setTopicSort}
        onViewPrompts={viewTopicPrompts}
      />

      <PromptPerformance
        filter={promptFilter}
        topicId={topicId}
        onFilterChange={(next) => {
          setPromptFilter(next)
          if (next !== "all") setTopicId(null)
        }}
      />

      <CompetitorCompare
        competitorId={competitorId}
        onCompetitorChange={setCompetitorId}
      />
    </div>
  )
}
