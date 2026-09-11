"use client"

import { useRouter } from "next/navigation"
import { Button } from "@ciq-dev/ciq-design-system"
import type { UpNextActionItem as UpNextActionItemData } from "./types"

interface UpNextActionItemProps {
  item: UpNextActionItemData
  expanded: boolean
  onSelect: () => void
}

export const UP_NEXT_COLLAPSED_H = "h-12"

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
            <span className="text-sm font-semibold text-fg-primary group-hover:text-brand-800">
              {item.name}
            </span>
            <span className="ml-2 text-xs text-fg-tertiary">
              {item.publishBy}
            </span>
          </span>
          <span className="shrink-0 text-sm font-medium tabular-nums text-fg-secondary">
            {item.valueLabel}
          </span>
        </button>
      </li>
    )
  }

  return (
    <li className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col pb-4 pt-1">
        <button
          type="button"
          onClick={onSelect}
          aria-expanded
          className="text-left"
        >
          <p className="text-base font-semibold leading-snug text-fg-primary">
            {item.name}
          </p>
          <p className="mt-1.5 font-sans text-3xl font-semibold tracking-tight text-brand-950 tabular-nums">
            {item.valueLabel}
          </p>
        </button>

        {/* Mini-metrics — same label/value pattern as SecondaryStats */}
        <dl className="mt-4 grid grid-cols-3 gap-3">
          <div className="min-w-0">
            <dt className="text-xs text-fg-tertiary">Publish by</dt>
            <dd className="mt-1 text-sm font-semibold tabular-nums text-fg-primary">
              {item.publishBy}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs text-fg-tertiary">SKUs</dt>
            <dd className="mt-1 text-sm font-semibold tabular-nums text-fg-primary">
              {item.skuCount}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs text-fg-tertiary">Goes live</dt>
            <dd className="mt-1 text-sm font-semibold text-fg-primary">
              {item.goesLiveNote}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <Button
            className="w-full bg-brand-800 text-action-primary-fg hover:bg-brand-900 focus:outline-brand-800"
            onClick={() => router.push(`/workbench?moment=${item.id}`)}
          >
            Review {item.skuCount} SKUs
          </Button>
        </div>
      </div>
    </li>
  )
}
