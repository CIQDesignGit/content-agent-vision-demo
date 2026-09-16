"use client"

import { useState } from "react"
import { Check, ChevronDown, FunnelPlus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ImpactToolbarProps {
  brands: string[]
  selectedBrand: string
  onBrandChange: (brand: string) => void
}

function BrandFilter({
  brands,
  selectedBrand,
  onBrandChange,
}: ImpactToolbarProps) {
  const [open, setOpen] = useState(false)
  const brandValue = selectedBrand === "All Brands" ? undefined : selectedBrand

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white py-1 pl-2.5 pr-1 text-xs whitespace-nowrap transition-colors outline-none select-none hover:bg-slate-50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
        <span className="font-normal text-slate-400">Brand</span>
        {brandValue ? (
          <span className="font-semibold text-slate-800">{brandValue}</span>
        ) : null}
        <ChevronDown className="size-3.5 shrink-0 text-slate-400" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-44 p-1">
        <ul>
          {brands.map((brand) => {
            const checked = brand === selectedBrand
            return (
              <li key={brand}>
                <button
                  type="button"
                  onClick={() => {
                    onBrandChange(brand)
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span
                    className={cn(
                      "grid size-4 shrink-0 place-items-center rounded border",
                      checked
                        ? "border-primary bg-primary text-white"
                        : "border-slate-300 bg-transparent",
                    )}
                  >
                    {checked ? <Check className="size-3" /> : null}
                  </span>
                  {brand}
                </button>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export function ImpactToolbar({
  brands,
  selectedBrand,
  onBrandChange,
}: ImpactToolbarProps) {
  return (
    <div className="flex w-full min-w-0 items-center gap-2">
      <BrandFilter
        brands={brands}
        selectedBrand={selectedBrand}
        onBrandChange={onBrandChange}
      />

      <button
        type="button"
        aria-label="Filter"
        title="View filters"
        className="grid place-items-center rounded-lg border border-slate-200 px-2 py-1 text-slate-500 transition-colors hover:bg-slate-50"
      >
        <FunnelPlus className="size-3.5" />
      </button>
    </div>
  )
}
