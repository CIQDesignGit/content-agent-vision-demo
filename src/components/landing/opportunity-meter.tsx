"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import { cn } from "@/lib/utils"
import { DURATION, EASE_SWAP } from "@/lib/motion"
import type {
  OpportunityCalculationData,
  OpportunityMeterData,
  OpportunityStatusSegment,
} from "./types"
import { OpportunityCalculationPanel } from "./opportunity-calculation-panel"
import { OpportunityMeterOverview } from "./opportunity-meter-overview"
import { OpportunityMeterRail } from "./opportunity-meter-rail"
import { RevealItem } from "./reveal"
import { ViewCalculationIcon } from "./view-calculation-icon"
import type { CaptureReveal } from "./use-capture-reveal"

const swap = { duration: DURATION.base, ease: EASE_SWAP }
const overviewFade = {
  duration: DURATION.calm,
  ease: EASE_SWAP,
}

interface OpportunityMeterProps {
  data: OpportunityMeterData
  statusSegments: OpportunityStatusSegment[]
  capture: CaptureReveal
  calculation: OpportunityCalculationData
}

export function OpportunityMeter({
  data,
  statusSegments,
  capture,
  calculation,
}: OpportunityMeterProps) {
  const [calcPanelOpen, setCalcPanelOpen] = useState(false)
  /** Keeps overview full-bleed until the calc shell finish exiting. */
  const [calcLayoutActive, setCalcLayoutActive] = useState(false)

  const capturedPct = Math.min(
    100,
    Math.round((data.realizedMillions / data.identifiedMillions) * 100),
  )
  const totalAmountLabel = `$${data.identifiedMillions.toFixed(2)}M`

  const overviewOverlay = calcPanelOpen || calcLayoutActive

  function openCalculation() {
    setCalcLayoutActive(true)
    setCalcPanelOpen(true)
  }

  function closeCalculation() {
    setCalcPanelOpen(false)
  }

  function handleShellExitComplete() {
    setCalcLayoutActive(false)
  }

  return (
    <RevealItem className="flex min-w-0 flex-col">
      <Card className="relative flex w-full flex-col overflow-hidden rounded-3xl border-0 bg-white py-0 ring-1 ring-slate-900/6 !shadow-pane-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(70%_100%_at_15%_0%,var(--color-brand-50),transparent_72%)]"
        />

        <CardContent className="relative flex flex-col p-0">
          <motion.div layout transition={swap} className="relative flex flex-col">
          <button
            type="button"
            onClick={() =>
              calcPanelOpen ? closeCalculation() : openCalculation()
            }
            aria-expanded={calcPanelOpen}
            aria-controls="opportunity-calculation-panel"
            className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {calcPanelOpen ? (
              <>
                <X className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                Close
              </>
            ) : (
              <>
                <ViewCalculationIcon />
                View calculation
              </>
            )}
          </button>

          <motion.div
            aria-hidden={calcPanelOpen}
            className={cn(
              "w-full p-7",
              overviewOverlay &&
                "pointer-events-none absolute inset-0 z-0 overflow-hidden",
            )}
            initial={false}
            animate={{ opacity: calcPanelOpen ? 0 : 1 }}
            transition={{
              ...overviewFade,
              delay: calcPanelOpen ? 0 : DURATION.base,
            }}
          >
            <OpportunityMeterOverview
              variant="full"
              data={data}
              statusSegments={statusSegments}
              capture={capture}
              capturedPct={capturedPct}
              totalAmountLabel={totalAmountLabel}
            />
          </motion.div>

          <AnimatePresence initial={false} onExitComplete={handleShellExitComplete}>
            {calcPanelOpen ? (
              <motion.div
                key="calc-shell"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={swap}
                className="relative z-10 grid grid-cols-[88px_minmax(0,1fr)] overflow-hidden"
              >
                <div className="relative min-h-0 self-stretch border-r border-slate-200">
                  <button
                    type="button"
                    onClick={closeCalculation}
                    aria-label="Return to opportunity overview"
                    className="absolute inset-0 flex cursor-pointer flex-col items-stretch text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-300"
                  >
                    <OpportunityMeterRail
                      identifiedMillions={data.identifiedMillions}
                      realizedMillions={data.realizedMillions}
                      capturedPct={capturedPct}
                    />
                  </button>
                </div>

                <div
                  id="opportunity-calculation-panel"
                  className="min-w-0 overflow-hidden"
                >
                  <OpportunityCalculationPanel data={calculation} />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
