"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { AlignJustify, CheckCircle2, PanelLeftOpen } from "lucide-react"
import { enterTransition, fadeRise, staggerContainer } from "@/lib/motion"
import { cn } from "@/lib/utils"
import {
  REVIEW_SIDEBAR_CARD_DELAY,
  REVIEW_SIDEBAR_CARD_STAGGER,
} from "./review-entrance"
import { Button } from "@/components/ui/button"
import { Checkbox, ContentAgentSkuCard, TitleOptimizationSkuCard } from "./sku-card"
import type { BulkField } from "./bulk-publish-confirm-dialog"
import type { Sku } from "./types"

// ─── Staggered slide-out hook ─────────────────────────────────────────────────

// Each removed card in a bulk removal starts sliding 60ms after the one above it,
// creating a top-to-bottom wave. After a card slides out, its row height collapses
// (350ms later, 500ms duration). Total budget = (N-1)×60 + 950ms.
const STAGGER_MS = 150

function useSlidingList(incoming: Sku[]) {
  const [rendered, setRendered] = useState<Sku[]>(incoming)
  // id → stagger delay in ms. Presence in map = "this card is leaving".
  const [leavingDelays, setLeavingDelays] = useState<Map<string, number>>(new Map())
  const prevIdsRef = useRef<Set<string> | null>(null)
  // Exit animation is for user-driven removals (publish). Land / hydrate / queue
  // resume must snap to the final list — never slide cards out on arrival.
  const exitsEnabledRef = useRef(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      exitsEnabledRef.current = true
    }, 80)
    return () => window.clearTimeout(timer)
  }, [])

  useLayoutEffect(() => {
    const incomingIds = new Set(incoming.map((s) => s.id))
    const prevIds = prevIdsRef.current
    const removed =
      prevIds == null
        ? []
        : [...prevIds].filter((id) => !incomingIds.has(id))

    prevIdsRef.current = incomingIds

    // First sync, still bootstrapping, or wholesale queue swap → snap.
    const isQueueSwap =
      prevIds != null && removed.length > 0 && removed.length === prevIds.size
    if (prevIds == null || !exitsEnabledRef.current || isQueueSwap) {
      setLeavingDelays(new Map())
      setRendered(incoming)
      return
    }

    if (removed.length === 0) {
      setRendered(incoming)
      return
    }

    // Sort removed IDs by their position in the current rendered list so the
    // stagger wave flows visually top-to-bottom.
    const renderedIds = rendered.map((s) => s.id)
    const removedSorted = [...removed].sort(
      (a, b) => renderedIds.indexOf(a) - renderedIds.indexOf(b),
    )

    setLeavingDelays((prev) => {
      const next = new Map(prev)
      removedSorted.forEach((id, i) => next.set(id, i * STAGGER_MS))
      return next
    })
    setRendered((prev) => prev.map((s) => incoming.find((i) => i.id === s.id) ?? s))

    // For N cards: last card starts at (N-1)×STAGGER_MS, finishes collapsing at +950ms
    const totalMs = (removed.length - 1) * STAGGER_MS + 950
    const timer = setTimeout(() => {
      setLeavingDelays((prev) => {
        const next = new Map(prev)
        removed.forEach((id) => next.delete(id))
        return next
      })
      setRendered(incoming)
    }, totalMs)

    return () => clearTimeout(timer)
  }, [incoming]) // eslint-disable-line react-hooks/exhaustive-deps

  return { rendered, leavingDelays }
}

// ─── Empty state — shown when the to-do queue is fully cleared ────────────────

function SidebarEmptyState({ onOpenFilterPanel }: { onOpenFilterPanel?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
      className="flex flex-1 flex-col items-center justify-center gap-3 px-6 pb-16 text-center"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-brand-50">
        <CheckCircle2 className="size-6 text-brand-500" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-700">All caught up!</p>
        <p className="text-xs leading-relaxed text-slate-400">
          All SKU changes are published.
        </p>
        {onOpenFilterPanel && (
          <p className="text-xs text-slate-400">
            <button
              type="button"
              onClick={onOpenFilterPanel}
              className="font-medium text-brand-500 underline-offset-2 hover:underline"
            >
              Change the filter
            </button>
            {" "}to review in‑progress or completed SKUs.
          </p>
        )}
      </div>
    </motion.div>
  )
}

// All fields forwarded to the confirm dialog — no per-field toggle in sidebar
const ALL_BULK_FIELDS: BulkField[] = ["title", "images", "bullets", "description"]

// ─── Main sidebar ─────────────────────────────────────────────────────────────

interface SkuSidebarProps {
  skus: Sku[]
  selectedSkuId: string
  onSelect: (id: string) => void
  totalCount: number
  collapsed: boolean
  onToggle: () => void
  /**
   * True when the queue is genuinely empty because all SKUs were published —
   * as opposed to empty because a filter is hiding them.
   */
  queueEmpty?: boolean
  /** Called when the user clicks "change the filter" in the empty state nudge. */
  onOpenFilterPanel?: () => void
  /** When true, renders TitleOptimizationSkuCard (no quality-score chips). Defaults to false. */
  hideMetrics?: boolean
  /** When true, SKU cards also show Optimization Score. */
  showOptimizationScore?: boolean
  isSelectionMode?: boolean
  selectedSkuIds?: Set<string>
  onToggleSelectionMode?: () => void
  onToggleSkuSelection?: (id: string) => void
  onSelectAllSkus?: () => void
  onDeselectAllSkus?: () => void
  onBulkAcceptAndPublish?: (fields: BulkField[]) => void
  /** Called when "Review" is clicked — defaults to exiting selection mode */
  onBulkReview?: () => void
  /** Play the Review landing sequence: pane first, then staggered SKU cards. */
  animateEntrance?: boolean
  /** List name. Depends on the entry point (issues catalog, moment, or bucket). */
  title?: string
  /** Count line under the title. Defaults to the filtered showing count. */
  description?: string
}

export function SkuSidebar({
  skus,
  selectedSkuId,
  onSelect,
  totalCount,
  collapsed,
  onToggle,
  queueEmpty = false,
  onOpenFilterPanel,
  hideMetrics = false,
  showOptimizationScore = false,
  isSelectionMode = false,
  selectedSkuIds = new Set(),
  onToggleSelectionMode = () => {},
  onToggleSkuSelection = () => {},
  onSelectAllSkus = () => {},
  onDeselectAllSkus = () => {},
  onBulkAcceptAndPublish = () => {},
  onBulkReview,
  animateEntrance = false,
  title = "SKUs with Issues",
  description,
}: SkuSidebarProps) {
  // Hooks must run unconditionally — before any early return.
  const { rendered, leavingDelays } = useSlidingList(skus)

  if (collapsed) {
    return (
      <motion.aside
        initial={animateEntrance ? { opacity: 0, x: -8 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={enterTransition}
        className="flex w-10 shrink-0 flex-col items-center border-r border-slate-200 bg-white pt-4"
      >
        <button
          type="button"
          aria-label="Expand panel"
          onClick={onToggle}
          className="grid size-7 place-items-center rounded-md text-slate-500 hover:bg-slate-100"
        >
          <PanelLeftOpen className="size-4" />
        </button>
      </motion.aside>
    )
  }

  const selectedCount = selectedSkuIds.size
  const allSelected = selectedCount === skus.length && skus.length > 0
  const someSelected = selectedCount > 0 && !allSelected

  const SkuCardComponent = hideMetrics ? TitleOptimizationSkuCard : ContentAgentSkuCard

  // Only show empty state once all exit animations have fully completed.
  // Must use `rendered.length` (not `skus.length`) because `skus` becomes empty
  // immediately when publish fires, while `rendered` stays populated until the
  // cleanup timeout fires (after TOTAL_MS). Using `skus` would unmount the <ul>
  // before the effect even runs, preventing any animation from ever starting.
  const isEmpty = rendered.length === 0

  return (
    <motion.aside
      initial={animateEntrance ? { opacity: 0, x: -8 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={enterTransition}
      className="flex w-[420px] shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-start justify-between px-4 pb-2 pt-4">
        {isSelectionMode ? (
          <>
            {/* Master checkbox + count */}
            <button
              type="button"
              aria-label={allSelected ? "Deselect all" : "Select all"}
              onClick={allSelected ? onDeselectAllSkus : onSelectAllSkus}
              className="flex items-start gap-2 rounded-md px-1 py-0.5 hover:bg-slate-50"
            >
              <span className="mt-0.5">
                <Checkbox checked={allSelected} indeterminate={someSelected} />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-800">
                  {selectedCount > 0
                    ? `${selectedCount.toLocaleString()} selected`
                    : "Select SKUs"}
                </p>
              </div>
            </button>
            <button
              type="button"
              onClick={onToggleSelectionMode}
              className="mt-0.5 text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="min-w-0 flex-1">
              <h2 className="line-clamp-2 text-sm font-semibold text-slate-700">{title}</h2>
              <p className="mt-0.5 text-[11px] text-slate-400">
                {description ?? `Showing ${skus.length} of ${totalCount}`}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={onToggleSelectionMode}
                className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                Select
              </button>
              <button
                type="button"
                aria-label="Collapse panel"
                onClick={onToggle}
                className="grid size-7 place-items-center rounded-md text-slate-500 hover:bg-slate-100"
              >
                <AlignJustify className="size-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── SKU list / empty state ────────────────────────────────────────────── */}
      {isEmpty ? (
        queueEmpty ? (
          <SidebarEmptyState onOpenFilterPanel={onOpenFilterPanel} />
        ) : (
          <p className="px-4 pb-4 text-xs text-slate-500">No SKUs match the current filter.</p>
        )
      ) : (
        <motion.ul
          variants={
            animateEntrance
              ? staggerContainer(REVIEW_SIDEBAR_CARD_STAGGER, REVIEW_SIDEBAR_CARD_DELAY)
              : undefined
          }
          initial={animateEntrance ? "hidden" : false}
          animate={animateEntrance ? "visible" : undefined}
          className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto bg-white px-3 pb-4 pt-1"
        >
          {rendered.map((sku) => {
            const isLeaving = leavingDelays.has(sku.id)
            // Per-card stagger offset in ms (0 for single removals)
            const staggerMs = leavingDelays.get(sku.id) ?? 0

            return (
              /**
               * Outer <li> — collapses height via CSS grid-rows trick.
               * pb-2 keeps card shadows inside the row box (margin would clip in the scroll area).
               */
              <motion.li
                key={sku.id}
                variants={animateEntrance ? fadeRise : undefined}
                style={{
                  transitionDelay: isLeaving ? `${staggerMs + 350}ms` : "0ms",
                }}
                className={cn(
                  "grid transition-[grid-template-rows,padding-bottom] ease-in-out",
                  isLeaving
                    ? "grid-rows-[0fr] pb-0 duration-500"
                    : "grid-rows-[1fr] pb-2 duration-200",
                )}
              >
                {/* overflow-hidden only while exiting — otherwise box-shadow on the card is clipped */}
                <div
                  className={cn(
                    "min-h-0 px-0.5 py-0.5",
                    isLeaving ? "overflow-hidden" : "overflow-visible",
                  )}
                >
                  {/*
                   * Drive the slide via `animate` (not `exit`) so the stagger delay
                   * is evaluated fresh on the same render where isLeaving turns true.
                   * With AnimatePresence + exit, the delay was read from the *previous*
                   * render's props (all zeros), causing simultaneous exits.
                   */}
                  <motion.div
                    initial={false}
                    animate={
                      isLeaving
                        ? { x: "-110%", opacity: 0 }
                        : { x: 0, opacity: 1 }
                    }
                    transition={{
                      x: { delay: staggerMs / 1000, duration: 0.55, ease: [0.4, 0, 0.2, 1] },
                      opacity: { delay: staggerMs / 1000, duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <SkuCardComponent
                      sku={sku}
                      isActive={sku.id === selectedSkuId}
                      isSelected={selectedSkuIds.has(sku.id)}
                      isSelectionMode={isSelectionMode}
                      showOptimizationScore={showOptimizationScore}
                      onSelect={() => onSelect(sku.id)}
                      onToggle={() => onToggleSkuSelection(sku.id)}
                    />
                  </motion.div>
                </div>
              </motion.li>
            )
          })}
        </motion.ul>
      )}

      {/* ── Bottom action bar — visible when ≥1 SKU is selected ──────────────── */}
      {isSelectionMode && selectedCount > 0 && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-3 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {selectedCount.toLocaleString()} SKU{selectedCount !== 1 ? "s" : ""}
            </p>
            <p className="text-[11px] text-muted-foreground">ready to bulk approve</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-brand-200 text-xs text-brand-600 hover:bg-brand-50"
              onClick={onBulkReview ?? onToggleSelectionMode}
            >
              Review
            </Button>
            <Button
              size="sm"
              className="bg-brand-800 text-xs text-white hover:bg-brand-900 focus-visible:outline-brand-800"
              onClick={() => onBulkAcceptAndPublish(ALL_BULK_FIELDS)}
            >
              Approve {selectedCount} SKU{selectedCount !== 1 ? "s" : ""}
            </Button>
          </div>
        </div>
      )}
    </motion.aside>
  )
}
