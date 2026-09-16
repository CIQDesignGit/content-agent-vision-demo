"use client"

import { useEffect, useState } from "react"
import { AlexaLeaderboard } from "./alexa-leaderboard"
import { CompetitorCompare } from "./competitor-compare"
import { PerformanceChart } from "./performance-chart"
import { PromptPerformance } from "./prompt-performance"
import { BandHeading } from "./shared"
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
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 pb-16">
      <div className="flex flex-col gap-3">
        <TrackingHeader period={period} onPeriodChange={setPeriod} />

        <section className="flex flex-col gap-5">
          <BandHeading
            title="Brand standing"
            description="Where you sit across tracked shopper questions this period."
          />
          <StandingMetrics />
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="h-full min-w-0 lg:col-span-2">
              <PerformanceChart />
            </div>
            <AlexaLeaderboard />
          </div>
        </section>
      </div>

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
