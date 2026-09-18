"use client"

import { useMemo } from "react"
import { MotionConfig } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { fadeRiseLand, fadeRiseOnScroll } from "@/lib/motion"
import { AnalystWeekStrip } from "./analyst-week-strip"
import { overviewForRange } from "./overview-for-range"
import { OpportunityStreams } from "./opportunity-streams"
import { RevealGroup, RevealItem } from "./reveal"
import { SectionHeading } from "./section-heading"
import { StuckNeedsNudgeCard } from "./stuck-needs-nudge-card"

export function AnalystTasksView() {
  const searchParams = useSearchParams()
  const rangeId = searchParams.get("range")
  const overview = useMemo(() => overviewForRange(rangeId), [rangeId])

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 pt-2 pb-16">
        <section aria-label="Today's tasks" className="flex flex-col gap-4">
          <RevealGroup delay={0.04} stagger={0.1}>
            <RevealItem variants={fadeRiseLand}>
              <div className="flex flex-col gap-1">
                <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
                  Today&apos;s tasks
                </h2>
              </div>
            </RevealItem>
          </RevealGroup>

          <AnalystWeekStrip />
        </section>

        <OpportunityStreams
          key={rangeId ?? "this-year"}
          streams={overview.streams.filter((s) => s.id !== "seasonal")}
          windowClosed={overview.windowClosed}
          title="Things to do"
          description=""
          defaultExpandedIds={["pdp", "retail-readiness"]}
          exclusive={false}
          separatePanes
          className="mb-6"
        />

        <RevealGroup
          as="section"
          aria-label="Stuck and needs a nudge"
          className="flex flex-col gap-5"
          delay={0.08}
          stagger={0.1}
        >
          <SectionHeading title="Stuck and needs a nudge" />
          <RevealItem variants={fadeRiseOnScroll}>
            <StuckNeedsNudgeCard />
          </RevealItem>
        </RevealGroup>
      </div>
    </MotionConfig>
  )
}
