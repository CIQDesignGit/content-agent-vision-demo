"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@ciq-dev/ciq-design-system"
import { fadeRiseTight, swapTransition } from "@/lib/motion"
import { useQueueActedCount } from "@/lib/queue-progress"
import type { UpNextActionItem as UpNextActionItemData } from "./types"
import { UpNextProgress } from "./up-next-progress"

interface UpNextActionItemProps {
  item: UpNextActionItemData
  expanded: boolean
  onSelect: () => void
}

const SPEC_LABEL = "text-xs text-slate-500"
const SPEC_VALUE = "text-sm font-semibold text-slate-900"

function reviewLabel(actedCount: number, remaining: number, skuCount: number) {
  return actedCount > 0
    ? `Continue Reviewing ${remaining} SKUs`
    : `Review ${skuCount} SKUs`
}

export function UpNextActionItem({
  item,
  expanded,
  onSelect,
}: UpNextActionItemProps) {
  const router = useRouter()
  const actedCount = useQueueActedCount(item.id)
  const remaining = Math.max(item.skuCount - actedCount, 0)
  const hasProgress = actedCount > 0

  if (!expanded) {
    return (
      <motion.li
        layout
        variants={fadeRiseTight}
        transition={swapTransition}
        className="shrink-0"
      >
        <button
          type="button"
          onClick={onSelect}
          aria-expanded={false}
          className="group flex w-full items-center justify-between gap-3 py-3 text-left"
        >
          <span className="min-w-0 truncate text-sm font-semibold text-slate-700 transition-colors group-hover:text-brand-800">
            {item.name}
            <span className="ml-2 text-xs font-normal text-slate-400">
              {item.publishBy}
            </span>
          </span>
          <span className="shrink-0 text-sm font-medium tabular-nums text-slate-600">
            {item.valueLabel}
          </span>
        </button>
      </motion.li>
    )
  }

  return (
    <motion.li
      layout
      variants={fadeRiseTight}
      transition={swapTransition}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex shrink-0 flex-col items-start gap-3">
          <button
            type="button"
            onClick={onSelect}
            aria-expanded
            className="text-left"
          >
            <p className="text-base font-semibold leading-snug text-slate-900">
              {item.name}
            </p>
            <p className="mt-1 font-sans text-4xl font-semibold leading-none tracking-[-0.03em] text-brand-950 tabular-nums">
              {item.valueLabel}
            </p>
          </button>
        </div>

        <dl className="flex flex-wrap gap-x-8 gap-y-3 lg:flex-1 lg:justify-center">
          <Spec label="Publish by" value={item.publishBy} />
          <Spec label="SKUs" value={String(item.skuCount)} />
          <Spec label="Goes live" value={item.goesLiveNote} />
        </dl>

        <div className="flex w-full shrink-0 flex-col items-start gap-2 lg:w-auto lg:items-end">
          {hasProgress ? (
            <UpNextProgress
              actedCount={actedCount}
              totalCount={item.skuCount}
              valueLabel={item.valueLabel}
            />
          ) : null}
          <Button
            className="group h-11 w-full shrink-0 rounded-xl bg-brand-800 text-sm font-semibold text-white transition-colors hover:bg-brand-900 focus-visible:outline-brand-800 lg:w-auto"
            onClick={() => router.push(`/workbench?moment=${item.id}`)}
          >
            {reviewLabel(actedCount, remaining, item.skuCount)}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Button>
        </div>
      </div>

    </motion.li>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[7rem]">
      <dt className={SPEC_LABEL}>{label}</dt>
      <dd className={`${SPEC_VALUE} mt-1 tabular-nums`}>{value}</dd>
    </div>
  )
}
