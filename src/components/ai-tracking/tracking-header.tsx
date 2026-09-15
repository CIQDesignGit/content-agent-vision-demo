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
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-slate-900">
          {trackingMeta.brand}
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-slate-500">
          <span>{trackingMeta.weekLabel}</span>
          <span className="text-slate-300" aria-hidden>
            ·
          </span>
          <span>{trackingMeta.refreshLabel}</span>
        </p>
      </div>

      <Select
        value={period}
        onValueChange={(value) => {
          if (value === "12w" || value === "4w") onPeriodChange(value)
        }}
      >
        <SelectTrigger className="h-9 w-auto min-w-64 rounded-lg border-border-default bg-white text-sm font-medium text-fg-primary">
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
  )
}
