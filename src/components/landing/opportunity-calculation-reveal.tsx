"use client"

import type { RefObject } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { DURATION, EASE_OUT } from "@/lib/motion"
import type { OpportunityCalculationData } from "./types"
import { OpportunityCalculationPanel } from "./opportunity-calculation-panel"
import { CalculationToggle } from "./opportunity-calculation-toggle"

const slideUp = { duration: DURATION.calm, ease: EASE_OUT }

/**
 * Gap the drawer leaves at the card's top edge. The card surface stays visible
 * above it, so the drawer reads as a pane stacked on the card rather than as
 * the card's own content changing.
 */
const STACK_INSET = 8

interface OpportunityCalculationRevealProps {
  open: boolean
  collapsedHeight?: number
  openHeight?: number
  calculation: OpportunityCalculationData
  panelRef: RefObject<HTMLDivElement | null>
  closeButtonRef: RefObject<HTMLButtonElement | null>
  onOpen: () => void
  onClose: () => void
  onExitComplete: () => void
}

export function OpportunityCalculationReveal({
  open,
  collapsedHeight,
  openHeight,
  calculation,
  panelRef,
  closeButtonRef,
  onOpen,
  onClose,
  onExitComplete,
}: OpportunityCalculationRevealProps) {
  const ready = openHeight != null
  // Start at the card's bottom edge so the panel rises into view, rather than
  // dropping in from the top as the shell grows.
  const enterOffset = collapsedHeight ?? 0
  const openShellHeight =
    openHeight != null ? openHeight + STACK_INSET : collapsedHeight

  return (
    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
      {open ? (
        <motion.div
          key="calc-shell"
          id="opportunity-calculation-panel"
          initial={{ height: collapsedHeight }}
          animate={{ height: openShellHeight }}
          exit={{ height: collapsedHeight }}
          transition={slideUp}
          className="relative z-10 overflow-hidden"
        >
          <motion.div
            ref={panelRef}
            initial={{ y: enterOffset }}
            animate={{ y: ready ? 0 : enterOffset }}
            exit={{ y: enterOffset }}
            transition={slideUp}
            className="absolute inset-x-0 top-2 rounded-t-3xl bg-slate-100 shadow-(--shadow-drawer-up)"
          >
            <OpportunityCalculationPanel data={calculation} />
            <CalculationToggle
              open
              buttonRef={closeButtonRef}
              onOpen={onOpen}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
