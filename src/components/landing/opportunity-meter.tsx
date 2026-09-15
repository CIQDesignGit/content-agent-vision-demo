"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import { fadeRiseTight, staggerContainer } from "@/lib/motion"
import type { OpportunityMeterData, OpportunityStatusSegment } from "./types"
import { AnimatedFigure } from "./animated-figure"
import { OpportunityStatusBar } from "./opportunity-status-bar"
import { RevealItem } from "./reveal"
import type { CaptureReveal } from "./use-capture-reveal"

interface OpportunityMeterProps {
  data: OpportunityMeterData
  statusSegments: OpportunityStatusSegment[]
  capture: CaptureReveal
}

export function OpportunityMeter({
  data,
  statusSegments,
  capture,
}: OpportunityMeterProps) {
  const capturedPct = Math.min(
    100,
    Math.round((data.realizedMillions / data.identifiedMillions) * 100),
  )
  const totalAmountLabel = `$${data.identifiedMillions.toFixed(2)}M`

  return (
    <RevealItem className="flex h-full min-h-0 min-w-0 flex-col">
      <Card className="relative flex min-h-0 flex-1 w-full flex-col overflow-hidden rounded-3xl border-0 bg-white py-0 ring-1 ring-slate-900/6 !shadow-pane-lg">
        {/* Light falling from the top-left corner onto the headline value. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(70%_100%_at_15%_0%,var(--color-brand-50),transparent_72%)]"
        />

        <CardContent className="relative flex min-h-0 flex-1 flex-col gap-6 p-7">
          <motion.div
            className="flex flex-col gap-2"
            variants={staggerContainer(0.08, 0.12)}
          >
            <motion.p
              variants={fadeRiseTight}
              className="text-[13px] font-medium text-brand-600"
            >
              Total opportunity the agent has found for {data.yearLabel}
            </motion.p>

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
              <span className="font-semibold tabular-nums text-slate-900">
                $
                <AnimatedFigure value={data.realizedMillions} delay={0.45} />M
              </span>{" "}
              captured (
              <span className="font-semibold tabular-nums text-slate-900">
                <AnimatedFigure value={capturedPct} fractionDigits={0} delay={0.5} animateOnMount={false} />%
              </span>{" "}
              of this total).
            </motion.p>
          </motion.div>

          <motion.div className="mt-auto" variants={fadeRiseTight}>
            <OpportunityStatusBar
              segments={statusSegments}
              capturedPct={capturedPct}
              capturedAmountLabel={`$${data.realizedMillions.toFixed(2)}M`}
              totalAmountLabel={totalAmountLabel}
              capture={capture}
            />
          </motion.div>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
