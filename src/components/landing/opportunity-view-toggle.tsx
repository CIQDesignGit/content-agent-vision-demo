"use client"

import { motion } from "framer-motion"
import { cn } from "@ciq-dev/ciq-design-system"
import { swapTransition } from "@/lib/motion"
import type { OpportunityViewMode } from "./types"

const VIEW_OPTIONS: { id: OpportunityViewMode; label: string }[] = [
  { id: "status", label: "By status" },
  { id: "driver", label: "By driver" },
]

interface OpportunityViewToggleProps {
  view: OpportunityViewMode
  onChange: (view: OpportunityViewMode) => void
}

export function OpportunityViewToggle({
  view,
  onChange,
}: OpportunityViewToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Opportunity breakdown view"
      className="inline-flex w-fit shrink-0 rounded-full bg-slate-100/80 p-1 ring-1 ring-slate-900/5"
    >
      {VIEW_OPTIONS.map((option) => {
        const active = view === option.id
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
            {/* Shared layoutId slides the thumb between options rather than
                blinking it off one and on the other. */}
            {active ? (
              <motion.span
                layoutId="opportunity-view-thumb"
                aria-hidden
                className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-900/5"
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
