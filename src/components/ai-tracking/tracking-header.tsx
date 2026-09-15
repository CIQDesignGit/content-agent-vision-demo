"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ciq-dev/ciq-design-system"
import { periodOptions, trackingMeta } from "./data"
import type { PeriodId } from "./types"

interface TrackingHeaderProps {
  period: PeriodId
  onPeriodChange: (period: PeriodId) => void
}

export function TrackingHeader({ period, onPeriodChange }: TrackingHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-fg-primary">
          {trackingMeta.title}
        </h1>
        <p className="mt-1 text-sm text-fg-tertiary">
          {trackingMeta.domain}
          <span className="mx-1.5 text-slate-300">·</span>
          {trackingMeta.plan}
          <span className="mx-1.5 text-slate-300">·</span>
          {trackingMeta.weekLabel}
          <span className="mx-1.5 text-slate-300">·</span>
          {trackingMeta.refreshLabel}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1.5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Period
        </p>
        <Select
          value={period}
          onValueChange={(value) => {
            if (value === "12w" || value === "4w") onPeriodChange(value)
          }}
        >
          <SelectTrigger className="h-9 w-auto min-w-64 rounded-lg border-border-default bg-surface text-sm font-medium text-fg-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {periodOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
