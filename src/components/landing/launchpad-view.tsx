"use client"

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
import { SecondaryStats } from "./secondary-stats"
import { UpNextCard } from "./up-next-card"
import { YearCalendar } from "./year-calendar"

export function LaunchpadView() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6 pt-10 pb-16">
      <section
        aria-label="Opportunity overview"
        className="flex flex-col gap-4"
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
      </section>

      <section aria-label="Publish calendar">
        <YearCalendar
          yearLabel={calendarYearLabel}
          events={calendarEvents}
        />
      </section>
    </div>
  )
}
