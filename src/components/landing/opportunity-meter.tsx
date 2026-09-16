"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import { cn } from "@/lib/utils"
import { DURATION, EASE_SWAP } from "@/lib/motion"
import type {
  OpportunityCalculationData,
  OpportunityMeterData,
  OpportunityStatusSegment,
} from "./types"
import { OpportunityCalculationPanel } from "./opportunity-calculation-panel"
import { CalculationToggle } from "./opportunity-calculation-toggle"
import { OpportunityMeterOverview } from "./opportunity-meter-overview"
import { RevealItem } from "./reveal"
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
  windowClosed?: boolean
}

export function OpportunityMeter({
  data,
  statusSegments,
  capture,
  calculation,
  windowClosed = false,
}: OpportunityMeterProps) {
  const [calcPanelOpen, setCalcPanelOpen] = useState(false)
  const [calcLayoutActive, setCalcLayoutActive] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const viewButtonRef = useRef<HTMLButtonElement>(null)
  const openedOnce = useRef(false)

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

  useEffect(() => {
    if (!openedOnce.current) {
      if (!calcPanelOpen) return
      openedOnce.current = true
    }
    if (calcPanelOpen) closeButtonRef.current?.focus()
    else viewButtonRef.current?.focus()
  }, [calcPanelOpen])

  return (
    <RevealItem className="flex min-w-0 flex-col">
      <Card
        className={cn(
          "group/meter relative flex w-full flex-col overflow-hidden rounded-3xl border-0 bg-white py-0 ring-1 ring-slate-900/6 !shadow-pane-lg",
          !overviewOverlay &&
            "cursor-pointer transition-[box-shadow,ring-color] hover:ring-brand-300",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(70%_100%_at_15%_0%,var(--color-brand-50),transparent_72%)]"
        />

        <CardContent className="relative flex flex-col p-0">
          <motion.div
            layout
            transition={swap}
            onClick={overviewOverlay ? undefined : openCalculation}
            className="relative flex flex-col"
          >
            <CalculationToggle
              open={calcPanelOpen}
              buttonRef={calcPanelOpen ? closeButtonRef : viewButtonRef}
              onOpen={openCalculation}
              onClose={closeCalculation}
            />

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
                windowClosed={windowClosed}
              />
            </motion.div>

            <AnimatePresence
              initial={false}
              onExitComplete={() => setCalcLayoutActive(false)}
            >
              {calcPanelOpen ? (
                <motion.div
                  key="calc-shell"
                  id="opportunity-calculation-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={swap}
                  onClick={(event) => event.stopPropagation()}
                  className="relative z-10 min-w-0 overflow-hidden"
                >
                  <OpportunityCalculationPanel data={calculation} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
