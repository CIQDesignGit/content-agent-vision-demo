"use client"

import { useEffect, useState } from "react"
import { MotionConfig } from "framer-motion"
import { fadeRiseOnScroll } from "@/lib/motion"
import { RevealGroup, RevealItem } from "@/components/landing/reveal"
import { AlexaLeaderboard } from "./alexa-leaderboard"
import { CompetitorCompare } from "./competitor-compare"
import { PerformanceChart } from "./performance-chart"
import { PromptPerformance } from "./prompt-performance"
import { BandHeading } from "./shared"
import { StandingMetricCard, standingMetrics } from "./standing-metrics"
import { TopicsSection } from "./topics-section"
import { TrackingHeader } from "./tracking-header"
import type { PromptFilter, TopicSort } from "./types"

export function AiTrackingView() {
  const [mounted, setMounted] = useState(false)
  const [topicSort, setTopicSort] = useState<TopicSort>("share")
  const [promptFilter, setPromptFilter] = useState<PromptFilter>("losing")
  const [topicId, setTopicId] = useState<string | null>(null)
  const [competitorId, setCompetitorId] = useState("bbw")

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
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col">
        <RevealGroup delay={0.08} stagger={0.06}>
          <RevealItem>
            <TrackingHeader />
          </RevealItem>
        </RevealGroup>

        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 pt-6 pb-16">
          <section aria-label="Brand standing" className="flex flex-col gap-5">
            <RevealGroup delay={0.28} stagger={0.06}>
              <RevealItem>
                <BandHeading
                  title="Brand standing"
                  description="Where Aurelle Candles sits across tracked candle questions this period."
                />
              </RevealItem>
            </RevealGroup>

            <RevealGroup
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
              delay={0.46}
              stagger={0.14}
            >
              {standingMetrics.map((metric) => (
                <RevealItem key={metric.id} className="min-w-0">
                  <StandingMetricCard metric={metric} />
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup delay={0.92} stagger={0.06}>
              <RevealItem>
                <div className="grid gap-5 lg:grid-cols-3">
                  <div className="h-full min-w-0 lg:col-span-2">
                    <PerformanceChart />
                  </div>
                  <AlexaLeaderboard />
                </div>
              </RevealItem>
            </RevealGroup>
          </section>

          <RevealGroup onScroll stagger={0.14} className="flex flex-col">
            <RevealItem variants={fadeRiseOnScroll}>
              <TopicsSection
                sort={topicSort}
                onSortChange={setTopicSort}
                onViewPrompts={viewTopicPrompts}
              />
            </RevealItem>
          </RevealGroup>

          <RevealGroup onScroll stagger={0.14} className="flex flex-col">
            <RevealItem variants={fadeRiseOnScroll}>
              <PromptPerformance
                filter={promptFilter}
                topicId={topicId}
                onFilterChange={(next) => {
                  setPromptFilter(next)
                  if (next !== "all") setTopicId(null)
                }}
              />
            </RevealItem>
          </RevealGroup>

          <RevealGroup onScroll stagger={0.14} className="flex flex-col">
            <RevealItem variants={fadeRiseOnScroll}>
              <CompetitorCompare
                competitorId={competitorId}
                onCompetitorChange={setCompetitorId}
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </MotionConfig>
  )
}
