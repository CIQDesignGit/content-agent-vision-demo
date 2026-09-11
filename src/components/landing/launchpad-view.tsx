"use client"

import { MotionConfig } from "framer-motion"
import {
  calendarEvents,
  calendarYearLabel,
  opportunityByStatus,
  opportunityMeter,
  secondaryStats,
  upNext,
  valuePillars,
} from "./data"
import { OpportunityMeter } from "./opportunity-meter"
import { RevealGroup } from "./reveal"
import { SecondaryStats } from "./secondary-stats"
import { UpNextCard } from "./up-next-card"
import { YearCalendar } from "./year-calendar"

export function LaunchpadView() {
  return (
    // reducedMotion="user" drops every transform and layout animation for
    // anyone who has asked the OS to reduce motion — opacity still resolves,
    // so nothing ends up invisible.
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 pt-10 pb-16">
        {/* Above the fold: reveal on mount. The two panes land together,
            then the stat row follows. */}
        <RevealGroup
          as="section"
          aria-label="Opportunity overview"
          className="flex flex-col gap-4"
          delay={0.06}
          stagger={0.09}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:min-h-[420px]">
            <OpportunityMeter
              data={opportunityMeter}
              statusSegments={opportunityByStatus}
              pillars={valuePillars}
            />
            <UpNextCard data={upNext} />
          </div>
          <SecondaryStats stats={secondaryStats} />
        </RevealGroup>

        {/* Below the fold: each band waits until it is scrolled to. */}
        <section aria-label="Publish calendar">
          <YearCalendar
            yearLabel={calendarYearLabel}
            events={calendarEvents}
          />
        </section>
      </div>
    </MotionConfig>
  )
}
