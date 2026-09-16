"use client"

import { cn } from "@/lib/utils"

export type ImpactMode = "ab-test" | "asin"

const IMPACT_MODE_OPTIONS: { value: ImpactMode; label: string }[] = [
  { value: "ab-test", label: "By A/B test" },
  { value: "asin", label: "By ASIN" },
]

export function ImpactModeToggle({
  mode,
  onModeChange,
}: {
  mode: ImpactMode
  onModeChange: (mode: ImpactMode) => void
}) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg bg-slate-100/80 p-0.5">
      {IMPACT_MODE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={mode === option.value}
          onClick={() => onModeChange(option.value)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
            mode === option.value
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5"
              : "text-slate-500 hover:text-slate-700",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
