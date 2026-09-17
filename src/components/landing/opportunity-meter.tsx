"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import { cn } from "@/lib/utils"
import { DURATION, EASE_OUT } from "@/lib/motion"
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

const slideUp = { duration: DURATION.calm, ease: EASE_OUT }

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
  const [covering, setCovering] = useState(false)
  const [collapsedHeight, setCollapsedHeight] = useState<number>()
  const [openHeight, setOpenHeight] = useState<number>()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const viewButtonRef = useRef<HTMLButtonElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const panelContentRef = useRef<HTMLDivElement>(null)
  const openedOnce = useRef(false)

  const capturedPct = Math.min(
    100,
    Math.round((data.realizedMillions / data.identifiedMillions) * 100),
  )
  const totalAmountLabel = `$${data.identifiedMillions.toFixed(2)}M`
  function openCalculation() {
    setCollapsedHeight(overviewRef.current?.offsetHeight)
    setOpenHeight(undefined)
    setCovering(true)
    setCalcPanelOpen(true)
  }

  useLayoutEffect(() => {
    const content = panelContentRef.current
    if (!calcPanelOpen || !content) return
    const measure = () => setOpenHeight(content.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(content)
    return () => observer.disconnect()
  }, [calcPanelOpen])

  function closeCalculation() {
    setCalcPanelOpen(false)
  }
  useEffect(() => {
    if (!calcPanelOpen) return
    openedOnce.current = true
    closeButtonRef.current?.focus()
  }, [calcPanelOpen])

  useEffect(() => {
    if (covering || !openedOnce.current) return
    viewButtonRef.current?.focus()
  }, [covering])

  return (
    <RevealItem className="flex min-w-0 flex-col">
      <Card
        className="group/meter relative flex w-full flex-col overflow-hidden rounded-3xl border-0 bg-white py-0 ring-1 ring-slate-900/6 !shadow-pane-lg"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(70%_100%_at_15%_0%,var(--color-brand-50),transparent_72%)]"
        />

        <CardContent className="relative flex flex-col p-0">
          <div className="relative flex flex-col">
            <div
              ref={overviewRef}
              className={cn(
                "relative z-0 flex flex-col",
                covering && "invisible absolute inset-x-0 top-0",
              )}
              aria-hidden={covering}
              inert={covering}
            >
              <OpportunityMeterOverview
                variant="full"
                data={data}
                statusSegments={statusSegments}
                capture={capture}
                capturedPct={capturedPct}
                totalAmountLabel={totalAmountLabel}
                windowClosed={windowClosed}
                className="px-8 pt-8 pb-7"
              />
              <CalculationToggle
                open={false}
                buttonRef={viewButtonRef}
                onOpen={openCalculation}
                onClose={closeCalculation}
              />
            </div>
            <AnimatePresence initial={false} onExitComplete={() => setCovering(false)}>
              {calcPanelOpen ? (
                <motion.div
                  key="calc-shell"
                  id="opportunity-calculation-panel"
                  initial={{ height: collapsedHeight }}
                  animate={{ height: openHeight ?? collapsedHeight }}
                  exit={{ height: collapsedHeight }}
                  transition={slideUp}
                  className="relative z-10 overflow-hidden bg-white"
                >
                  <div ref={panelContentRef}>
                    <OpportunityCalculationPanel data={calculation} />
                    <CalculationToggle
                      open
                      buttonRef={closeButtonRef}
                      onOpen={openCalculation}
                      onClose={closeCalculation}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
