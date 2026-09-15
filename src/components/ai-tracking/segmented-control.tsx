"use client"

import { motion } from "framer-motion"
import { cn } from "@ciq-dev/ciq-design-system"
import { swapTransition } from "@/lib/motion"

interface SegmentedOption<T extends string> {
  id: T
  label: string
}

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  layoutId,
}: {
  value: T
  onChange: (value: T) => void
  options: SegmentedOption<T>[]
  ariaLabel: string
  layoutId: string
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex w-fit shrink-0 rounded-full bg-slate-100/80 p-1 ring-1 ring-slate-900/5"
    >
      {options.map((option) => {
        const active = value === option.id
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200",
              active ? "text-brand-900" : "text-slate-500 hover:text-slate-700",
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-900/5"
                transition={swapTransition}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
