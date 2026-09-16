"use client"

import { CalendarDays, ListFilter } from "lucide-react"
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ciq-dev/ciq-design-system"

interface ImpactToolbarProps {
  dateRangeLabel: string
  brands: string[]
  selectedBrand: string
  onBrandChange: (brand: string) => void
}

export function ImpactToolbar({
  dateRangeLabel,
  brands,
  selectedBrand,
  onBrandChange,
}: ImpactToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
      <h1 className="font-sans text-lg font-semibold leading-7 tracking-tight text-slate-900">
        AI Impact
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-8 gap-2 rounded-lg border-border-default bg-surface px-3 text-sm font-medium text-fg-primary hover:bg-surface-muted"
        >
          <CalendarDays className="size-4 text-fg-tertiary" aria-hidden />
          {dateRangeLabel}
        </Button>

        <Select
          value={selectedBrand}
          onValueChange={(value) => {
            if (value) onBrandChange(value)
          }}
        >
          <SelectTrigger className="h-8 w-auto min-w-36 rounded-lg border-border-default bg-surface text-sm font-medium text-fg-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="More filters"
          className="size-8 rounded-lg border-border-default bg-surface text-fg-secondary hover:bg-surface-muted"
        >
          <ListFilter className="size-4" />
        </Button>
      </div>
    </div>
  )
}
