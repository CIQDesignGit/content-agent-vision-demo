"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_SWAP, fadeRiseTight, swapTransition } from "@/lib/motion"
import { useQueueActedCount } from "@/lib/queue-progress"
import type { UpNextActionItem as UpNextActionItemData } from "./types"
import { UpNextProgress } from "./up-next-progress"

interface UpNextActionItemProps {
  item: UpNextActionItemData
  expanded: boolean
  onSelect: () => void
}

export const UP_NEXT_COLLAPSED_H = "h-12"

const SPEC_ROW = "flex items-center justify-between py-3.5"
const SPEC_LABEL = "text-xs text-slate-500"
const SPEC_VALUE = "text-sm font-semibold text-slate-900"

export function UpNextActionItem({
  item,
  expanded,
  onSelect,
}: UpNextActionItemProps) {
  const router = useRouter()
  const actedCount = useQueueActedCount(item.id)
  const remaining = Math.max(item.skuCount - actedCount, 0)
  const hasProgress = actedCount > 0
  const specRow = hasProgress
    ? "flex items-center justify-between py-1.5"
    : SPEC_ROW

  if (!expanded) {
    return (
      // `layout` tweens this row's height as the selection moves through the
      // list instead of snapping the whole pane to its new shape.
      <motion.li
        layout
        variants={fadeRiseTight}
        transition={swapTransition}
        className={`shrink-0 ${UP_NEXT_COLLAPSED_H}`}
      >
        <motion.button
          type="button"
          onClick={onSelect}
          aria-expanded={false}
          whileHover={{
            x: 2,
            transition: { duration: DURATION.quick, ease: EASE_SWAP },
          }}
          className="group flex h-full w-full items-center justify-between gap-3 text-left"
        >
          <span className="min-w-0 truncate">
            <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-brand-800">
              {item.name}
            </span>
            <span className="ml-2 text-xs text-slate-400">
              {item.publishBy}
            </span>
          </span>
          <span className="shrink-0 text-sm font-medium tabular-nums text-slate-600">
            {item.valueLabel}
          </span>
        </motion.button>
      </motion.li>
    )
  }

  return (
    <motion.li
      layout
      variants={fadeRiseTight}
      transition={swapTransition}
      className="flex min-h-0 flex-1 flex-col"
    >
      {/* layout="position" lets the parent animate its own height while this
          subtree's type stays unscaled — no rubber-banding text. */}
      <motion.div
        layout="position"
        className="flex flex-1 flex-col pb-1 pt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.base, ease: EASE_SWAP, delay: 0.06 }}
      >
        <button
          type="button"
          onClick={onSelect}
          aria-expanded
          className="text-left"
        >
          <p className="text-base font-semibold leading-snug text-slate-900">
            {item.name}
          </p>
          <p
            className={`font-sans text-4xl font-semibold leading-none tracking-[-0.03em] text-brand-950 tabular-nums ${hasProgress ? "mt-1" : "mt-2"}`}
          >
            {item.valueLabel}
          </p>
        </button>

        {/* Spec list rather than a 3-up grid — each label/value pair gets its
            own baseline. Rows tighten when progress is present so the pane
            doesn't grow to fit the new line. */}
        <dl className="my-auto flex flex-col divide-y divide-brand-200/60 border-y border-brand-200/60">
          <div className={specRow}>
            <dt className={SPEC_LABEL}>Publish by</dt>
            <dd className={`${SPEC_VALUE} tabular-nums`}>{item.publishBy}</dd>
          </div>
          <div className={specRow}>
            <dt className={SPEC_LABEL}>SKUs</dt>
            <dd className={`${SPEC_VALUE} tabular-nums`}>{item.skuCount}</dd>
          </div>
          <div className={specRow}>
            <dt className={SPEC_LABEL}>Goes live</dt>
            <dd className={SPEC_VALUE}>{item.goesLiveNote}</dd>
          </div>
        </dl>

        {hasProgress ? (
          <div className="pt-2">
            <UpNextProgress
              actedCount={actedCount}
              totalCount={item.skuCount}
              valueLabel={item.valueLabel}
            />
          </div>
        ) : null}

        <div className="pt-2">
          <Button
            className="group h-11 w-full rounded-xl bg-brand-700 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus:outline-brand-700"
            onClick={() => router.push(`/workbench?moment=${item.id}`)}
          >
            {actedCount > 0
              ? `Continue Reviewing ${remaining} SKUs`
              : `Review ${item.skuCount} SKUs`}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Button>
        </div>
      </motion.div>
    </motion.li>
  )
}
