"use client"

import { useMemo } from "react"
import { MotionConfig } from "framer-motion"
import { applyCapture } from "./apply-capture"
import { withOverviewFigures } from "./with-overview-figures"
import {
  opportunityByStatus,
  opportunityCalculation,
  opportunityMeter,
  opportunityStreams,
  secondaryStats,
  upNext,
} from "./data"
import { OpportunityMeter } from "./opportunity-meter"
import { OpportunityStreams } from "./opportunity-streams"
import { RevealGroup } from "./reveal"
import { SecondaryStats } from "./secondary-stats"
import { UpNextCard } from "./up-next-card"
import { useCaptureReveal } from "./use-capture-reveal"

export function LaunchpadView() {
  // Publishes from the workbench land here: the meter holds its pre-publish
  // numbers through the entrance, then rises to the new totals.
  const capture = useCaptureReveal()

  const meter = useMemo(
    () => ({
      ...opportunityMeter,
      realizedMillions:
        opportunityMeter.realizedMillions + capture.capturedUsd / 1_000_000,
    }),
    [capture.capturedUsd],
  )

  const statusSegments = useMemo(
    () => applyCapture(opportunityByStatus, capture.capturedUsd, capture.bucket),
    [capture.capturedUsd, capture.bucket],
  )

  const calculation = useMemo(
    () =>
      withOverviewFigures(
        opportunityCalculation,
        meter.identifiedMillions,
        meter.realizedMillions,
      ),
    [meter],
  )

  return (
    // reducedMotion="user" drops every transform and layout animation for
    // anyone who has asked the OS to reduce motion — opacity still resolves,
    // so nothing ends up invisible.
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 pt-2 pb-16">
        {/* Above the fold: reveal on mount. The two panes land together,
            then the stat row follows. */}
        <RevealGroup
          as="section"
          aria-label="Opportunity overview"
          className="flex flex-col gap-4"
          delay={0.06}
          stagger={0.09}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <OpportunityMeter
              data={meter}
              statusSegments={statusSegments}
              capture={capture}
              calculation={calculation}
            />
            <UpNextCard data={upNext} />
          </div>
          <SecondaryStats stats={secondaryStats} />
        </RevealGroup>

        <OpportunityStreams streams={opportunityStreams} />
      </div>
    </MotionConfig>
  )
}
