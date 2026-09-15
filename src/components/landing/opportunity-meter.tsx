"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import { fadeRiseTight, staggerContainer, swapPanel } from "@/lib/motion"
import type {
  OpportunityMeterData,
  OpportunityStatusSegment,
  OpportunityViewMode,
  ValuePillar,
} from "./types"
import { AnimatedFigure } from "./animated-figure"
import { OpportunityBreakdown } from "./opportunity-breakdown"
import { OpportunityStatusBar } from "./opportunity-status-bar"
import { OpportunityViewToggle } from "./opportunity-view-toggle"
import { RevealItem } from "./reveal"
import type { CaptureReveal } from "./use-capture-reveal"

interface OpportunityMeterProps {
  data: OpportunityMeterData
  statusSegments: OpportunityStatusSegment[]
  pillars: ValuePillar[]
  capture: CaptureReveal
}

export function OpportunityMeter({
  data,
  statusSegments,
  pillars,
  capture,
}: OpportunityMeterProps) {
  const [view, setView] = useState<OpportunityViewMode>("status")
  const capturedPct = Math.min(
    100,
    Math.round((data.realizedMillions / data.identifiedMillions) * 100),
  )
  const totalAmountLabel = `$${data.identifiedMillions.toFixed(2)}M`

  return (
    <RevealItem className="flex min-w-0 flex-1">
      <Card className="relative w-full overflow-hidden rounded-3xl border-0 bg-white ring-1 ring-slate-900/6 !shadow-pane-lg">
        {/* Light falling from the top-left corner onto the headline value. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(70%_100%_at_15%_0%,var(--color-brand-50),transparent_72%)]"
        />

        <CardContent className="relative flex flex-col gap-8 p-8">
          <motion.div
            className="flex flex-col gap-2.5"
            variants={staggerContainer(0.08, 0.12)}
          >
            <motion.p
              variants={fadeRiseTight}
              className="text-[13px] font-medium text-brand-600"
            >
              Total opportunity the agent has found for {data.yearLabel}
            </motion.p>

            {/* Currency and scale marks are subordinate so the numerals
                carry the weight. tabular-nums stays on the digits only —
                on "$" and "M" it just adds dead advance width. */}
            <motion.p
              variants={fadeRiseTight}
              className="flex items-start font-sans font-semibold leading-none text-brand-950"
            >
              <span className="mt-1 -mr-1 text-3xl text-slate-600 sm:mt-1.5 sm:text-4xl">
                $
              </span>
              <AnimatedFigure
                value={data.identifiedMillions}
                delay={0.3}
                className="text-6xl tracking-[-0.045em] tabular-nums sm:text-7xl"
              />
              <span className="mt-1 ml-1 text-3xl text-slate-600 sm:mt-1.5 sm:text-4xl">
                M
              </span>
            </motion.p>

            <motion.p
              variants={fadeRiseTight}
              className="text-sm leading-relaxed text-slate-500"
            >
              You&apos;ve captured{" "}
              <span className="font-semibold tabular-nums text-slate-900">
                $
                <AnimatedFigure value={data.realizedMillions} delay={0.45} />M
              </span>{" "}
              of it so far, just under a third of the year.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            variants={staggerContainer(0.08, 0.34)}
          >
            <motion.div variants={fadeRiseTight}>
              <OpportunityViewToggle view={view} onChange={setView} />
            </motion.div>

            {/* mode="wait" keeps the two bars from overlapping mid-swap, which
                would read as a flicker at this density. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                variants={swapPanel}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {view === "status" ? (
                  <OpportunityStatusBar
                    segments={statusSegments}
                    capturedPct={capturedPct}
                    capturedAmountLabel={`$${data.realizedMillions.toFixed(2)}M`}
                    totalAmountLabel={totalAmountLabel}
                    capture={capture}
                  />
                ) : (
                  <OpportunityBreakdown
                    identifiedMillions={data.identifiedMillions}
                    pillars={pillars}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
