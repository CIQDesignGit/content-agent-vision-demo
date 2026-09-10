"use client"

import {
  lostToInaction,
  opportunityMeter,
  secondaryStats,
  upcomingMoments,
  valuePillars,
} from "./data"
import { LostToInactionCard } from "./lost-to-inaction-card"
import { MomentsStrip } from "./moments-strip"
import { OpportunityMeter } from "./opportunity-meter"

export function LaunchpadView() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-8">
      <section
        aria-label="Opportunity overview"
        className="flex flex-col gap-3 lg:flex-row lg:items-stretch"
      >
        <div className="min-w-0 flex-1">
          <OpportunityMeter
            data={opportunityMeter}
            pillars={valuePillars}
            stats={secondaryStats}
          />
        </div>
        <LostToInactionCard data={lostToInaction} />
      </section>

      <section aria-label="Action opportunities" className="flex flex-col gap-4">
        <div>
          <h2 className="type-title text-fg-primary">
            Dollars waiting to be unlocked
          </h2>
          <p className="mt-1 type-body text-fg-tertiary">
            Upcoming events where a few content fixes can unlock sales before
            the window closes.
          </p>
        </div>
        <MomentsStrip moments={upcomingMoments} />
      </section>
    </div>
  )
}
