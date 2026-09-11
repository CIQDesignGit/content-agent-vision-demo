"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@ciq-dev/ciq-design-system"
import type { UpNextActionItem as UpNextActionItemData } from "./types"

interface UpNextActionItemProps {
  item: UpNextActionItemData
  expanded: boolean
  onSelect: () => void
}

export const UP_NEXT_COLLAPSED_H = "h-12"

const SPEC_ROW = "flex items-center justify-between py-3.5"
const SPEC_LABEL = "text-xs text-brand-300"
const SPEC_VALUE = "text-sm font-semibold text-white"

export function UpNextActionItem({
  item,
  expanded,
  onSelect,
}: UpNextActionItemProps) {
  const router = useRouter()

  if (!expanded) {
    return (
      <li className={`shrink-0 ${UP_NEXT_COLLAPSED_H}`}>
        <button
          type="button"
          onClick={onSelect}
          aria-expanded={false}
          className="group flex h-full w-full items-center justify-between gap-3 text-left"
        >
          <span className="min-w-0 truncate">
            <span className="text-sm font-semibold text-brand-100 transition-colors group-hover:text-white">
              {item.name}
            </span>
            <span className="ml-2 text-xs text-brand-400">
              {item.publishBy}
            </span>
          </span>
          <span className="shrink-0 text-sm font-medium tabular-nums text-brand-200">
            {item.valueLabel}
          </span>
        </button>
      </li>
    )
  }

  return (
    <li className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col pb-1 pt-1">
        <button
          type="button"
          onClick={onSelect}
          aria-expanded
          className="text-left"
        >
          <p className="text-base font-semibold leading-snug text-white">
            {item.name}
          </p>
          <p className="mt-2 font-sans text-4xl font-semibold leading-none tracking-[-0.03em] text-white tabular-nums">
            {item.valueLabel}
          </p>
        </button>

        {/* Spec list rather than a 3-up grid — each label/value pair gets its
            own baseline. my-auto splits the leftover height evenly above and
            below so the pane reads as composed rather than bottom-weighted. */}
        <dl className="my-auto flex flex-col divide-y divide-white/10 border-y border-white/10">
          <div className={SPEC_ROW}>
            <dt className={SPEC_LABEL}>Publish by</dt>
            <dd className={`${SPEC_VALUE} tabular-nums`}>{item.publishBy}</dd>
          </div>
          <div className={SPEC_ROW}>
            <dt className={SPEC_LABEL}>SKUs</dt>
            <dd className={`${SPEC_VALUE} tabular-nums`}>{item.skuCount}</dd>
          </div>
          <div className={SPEC_ROW}>
            <dt className={SPEC_LABEL}>Goes live</dt>
            <dd className={SPEC_VALUE}>{item.goesLiveNote}</dd>
          </div>
        </dl>

        <div className="pt-2">
          <Button
            className="group h-11 w-full rounded-xl bg-white text-sm font-semibold text-brand-950 shadow-lg transition-colors hover:bg-brand-50 focus:outline-white"
            onClick={() => router.push(`/workbench?moment=${item.id}`)}
          >
            Review {item.skuCount} SKUs
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Button>
        </div>
      </div>
    </li>
  )
}
