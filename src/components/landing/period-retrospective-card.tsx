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
    <RevealItem className="flex h-full min-h-0 w-full min-w-0 flex-col">
      <Card className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-3xl border-0 bg-white py-0 ring-1 ring-slate-900/6 !shadow-pane-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-emerald-50 to-transparent"
        />

        <CardContent className="relative flex min-h-0 flex-1 flex-col px-5 py-5">
          <motion.div
            variants={fadeRiseTight}
            className="flex shrink-0 items-center justify-between gap-2"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              {data.heading}
            </p>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              Window closed
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.05, 0.1)}
            className="mt-4 flex flex-col gap-5"
          >
            <PeriodRetroNotes
              kind="highlight"
              heading="What went well"
              notes={data.highlights}
            />
            <PeriodRetroNotes
              kind="lowlight"
              heading="What slipped"
              notes={data.lowlights}
            />
          </motion.div>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
