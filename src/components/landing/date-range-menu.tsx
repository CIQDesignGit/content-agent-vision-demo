"use client"

import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

import type { DateRangeOption } from "./date-range"

const rangeItemClass =
  "cursor-pointer rounded-md focus:bg-slate-100 data-highlighted:bg-slate-100"

export function MenuSectionLabel({ children }: { children: ReactNode }) {
  return (
    <DropdownMenuLabel className="px-2 pt-1 pb-1.5 text-xs font-medium tracking-wider text-slate-400 uppercase">
      {children}
    </DropdownMenuLabel>
  )
}

function SelectionMark({ selected }: { selected: boolean }) {
  return (
    <Check
      className={cn(
        "pointer-events-none size-3.5 shrink-0 text-brand-600",
        selected ? "opacity-100" : "opacity-0",
      )}
      strokeWidth={2.5}
      aria-hidden
    />
  )
}

function activateRange(
  event: { button?: number },
  onSelect: () => void,
) {
  if (event.button != null && event.button !== 0) return
  onSelect()
}

export function YearRangeItem({
  range,
  selected,
  onSelect,
}: {
  range: DateRangeOption
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <DropdownMenuItem
      closeOnClick
      aria-label={`${range.label}, ${range.span}`}
      aria-current={selected ? "true" : undefined}
      className={cn(
        rangeItemClass,
        "items-center gap-2 px-2.5 py-1.5 pr-2.5",
        selected && "bg-brand-50 focus:bg-brand-100 data-highlighted:bg-brand-100",
      )}
      // Pointer down fires before Base UI's click/focus pipeline can swallow the
      // selection — the previous RadioItem path often focused without navigating.
      onPointerDown={(event) =>
        activateRange(event, () => onSelect(range.id))
      }
      onClick={() => onSelect(range.id)}
    >
      <span className="font-medium text-slate-900">{range.label}</span>
      <span className="ml-auto font-mono text-xs text-slate-500">
        {range.span}
      </span>
      <SelectionMark selected={selected} />
    </DropdownMenuItem>
  )
}

export function QuarterRangeItem({
  range,
  selected,
  current,
  onSelect,
}: {
  range: DateRangeOption
  selected: boolean
  current: boolean
  onSelect: (id: string) => void
}) {
  return (
    <DropdownMenuItem
      closeOnClick
      aria-label={`${range.label}, ${range.compact}`}
      aria-current={selected ? "true" : undefined}
      className={cn(
        rangeItemClass,
        "items-center gap-2 px-2.5 py-1.5 pr-2.5",
        selected && "bg-brand-50 focus:bg-brand-100 data-highlighted:bg-brand-100",
      )}
      onPointerDown={(event) =>
        activateRange(event, () => onSelect(range.id))
      }
      onClick={() => onSelect(range.id)}
    >
      <span className="flex items-center gap-1.5 font-medium text-slate-900">
        {range.label}
        {current ? (
          <span className="rounded-full bg-brand-100 px-1.5 py-px text-xs font-medium tracking-wide text-brand-700 uppercase">
            Now
          </span>
        ) : null}
      </span>
      <span className="ml-auto font-mono text-xs text-slate-500">
        {range.compact}
      </span>
      <SelectionMark selected={selected} />
    </DropdownMenuItem>
  )
}
