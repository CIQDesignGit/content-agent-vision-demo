"use client"

import { useMemo } from "react"
import { MotionConfig } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { applyCapture } from "./apply-capture"
import { overviewForRange } from "./overview-for-range"
import { withOverviewFigures } from "./with-overview-figures"
import { OpportunityMeter } from "./opportunity-meter"
import { OpportunityStreams } from "./opportunity-streams"
import { RevealGroup } from "./reveal"
import { SecondaryStats } from "./secondary-stats"
import { useCaptureReveal } from "./use-capture-reveal"

export function LaunchpadView() {
  const searchParams = useSearchParams()
  const rangeId = searchParams.get("range")
  const overview = useMemo(() => overviewForRange(rangeId), [rangeId])

  // Publishes from the workbench land here: the meter holds its pre-publish
  // numbers through the entrance, then rises to the new totals.
  const capture = useCaptureReveal()
  const applyLiveCapture = !overview.windowClosed

  const meter = useMemo(
    () => ({
      ...overview.meter,
      realizedMillions:
        overview.meter.realizedMillions +
        (applyLiveCapture ? capture.capturedUsd / 1_000_000 : 0),
    }),
    [overview.meter, capture.capturedUsd, applyLiveCapture],
  )

  const statusSegments = useMemo(
    () =>
      applyLiveCapture
        ? applyCapture(overview.status, capture.capturedUsd, capture.bucket)
        : overview.status,
    [overview.status, capture.capturedUsd, capture.bucket, applyLiveCapture],
  )

  const calculation = useMemo(
    () =>
      withOverviewFigures(
        overview.calculation,
        meter.identifiedMillions,
        meter.realizedMillions,
        overview.capturedSplit,
      ),
    [overview.calculation, overview.capturedSplit, meter],
  )

  return (
    // reducedMotion="user" drops every transform and layout animation for
    // anyone who has asked the OS to reduce motion — opacity still resolves,
    // so nothing ends up invisible.
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 pt-2 pb-16">
        {/* Above the fold: meter and the stacked metrics land together. */}
        <RevealGroup
          as="section"
          aria-label="Opportunity overview"
          className="flex flex-col gap-4"
          delay={0.06}
          stagger={0.09}
        >
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
            <OpportunityMeter
              data={meter}
              statusSegments={statusSegments}
              capture={capture}
              calculation={calculation}
              windowClosed={overview.windowClosed}
            />
            <SecondaryStats stats={overview.secondaryStats} />
          </div>
        </RevealGroup>

        <OpportunityStreams
          key={rangeId ?? "this-year"}
          streams={overview.streams}
          windowClosed={overview.windowClosed}
          title={overview.streamsTitle}
          description={overview.streamsDescription}
        />
      </div>
    </MotionConfig>
  )
}
