"use client"

import { toast } from "sonner"
import {
  opportunityMeter,
  secondaryStats,
  upcomingMoments,
  valuePillars,
} from "./data"
import { MomentsStrip } from "./moments-strip"
import { OpportunityMeter } from "./opportunity-meter"
import { SecondaryStats } from "./secondary-stats"

export function LaunchpadView() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-8">
      <section
        aria-label="Opportunity overview"
        className="flex flex-col gap-3 lg:flex-row lg:items-stretch"
      >
        <OpportunityMeter
          data={opportunityMeter}
          pillars={valuePillars}
          onOpenAudit={() =>
            toast("Audit view coming soon", {
              description: "Opportunity meter detail is stubbed for v1.",
            })
          }
        />
        <SecondaryStats stats={secondaryStats} />
      </section>

      <section aria-label="Action opportunities" className="flex flex-col gap-4">
        <div>
          <h2 className="type-title text-fg-primary">Act on these moments</h2>
          <p className="mt-1 type-body text-fg-tertiary">
            Near-term windows where content changes unlock dollar impact now.
          </p>
        </div>
        <MomentsStrip moments={upcomingMoments} />
      </section>
    </div>
  )
}
