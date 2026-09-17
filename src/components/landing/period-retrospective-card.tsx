"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import { fadeRiseTight, staggerContainer } from "@/lib/motion"
import type { PeriodRetrospective } from "./types"
import { PeriodRetroNotes } from "./period-retro-notes"
import { RevealItem } from "./reveal"

/** Closed-window counterpart to `UpNextCard` — what went well, what slipped. */
export function PeriodRetrospectiveCard({
  data,
}: {
  data: PeriodRetrospective
}) {
  return (
    <RevealItem className="w-full min-w-0">
      <Card className="relative w-full overflow-hidden rounded-3xl border-0 bg-brand-25 py-0 ring-1 ring-brand-200/70 !shadow-pane-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(70%_100%_at_18%_0%,var(--color-brand-100),transparent_75%)]"
        />

        <CardContent className="relative flex flex-col px-6 py-5">
          <motion.div
            variants={fadeRiseTight}
            className="flex shrink-0 items-center justify-between gap-2"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
              {data.heading}
            </p>
            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-slate-500 ring-1 ring-slate-200/80">
              Window closed
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.05, 0.1)}
            className="mt-4 grid grid-cols-1 divide-y divide-brand-200/60 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
          >
            <div className="pb-4 lg:pr-8 lg:pb-0">
              <PeriodRetroNotes
                kind="highlight"
                heading="What went well"
                notes={data.highlights}
              />
            </div>
            <div className="pt-4 lg:pt-0 lg:pl-8">
              <PeriodRetroNotes
                kind="lowlight"
                heading="What slipped"
                notes={data.lowlights}
              />
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
