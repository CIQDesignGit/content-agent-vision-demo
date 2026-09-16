"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  currentQuarterId,
  DEFAULT_DATE_RANGE_ID,
  dateRangeHeadline,
  dateRangesForYear,
  resolveDateRange,
} from "./date-range"
import {
  MenuSectionLabel,
  QuarterRangeItem,
  YearRangeItem,
} from "./date-range-menu"

export function DateRangePicker({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const year = new Date().getFullYear()
  const ranges = dateRangesForYear(year)
  const selected = resolveDateRange(searchParams.get("range"), year)
  const yearRanges = ranges.filter((range) => range.group === "year")
  const quarterRanges = ranges.filter((range) => range.group === "quarter")
  const activeQuarter = currentQuarterId()

  function selectRange(id: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (id === DEFAULT_DATE_RANGE_ID) params.delete("range")
    else params.set("range", id)
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "ml-auto inline-flex items-center gap-1.5 py-1 text-sm font-medium text-slate-600 hover:text-slate-900",
          className,
        )}
      >
        <Calendar className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
        <span>{dateRangeHeadline(selected)}</span>
        <span className="text-xs font-normal tabular-nums text-slate-400">
          {selected.span}
        </span>
        <ChevronDown className="size-3.5 shrink-0 text-slate-400" strokeWidth={2} aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-80 p-1.5">
        <DropdownMenuRadioGroup value={selected.id} onValueChange={selectRange}>
          <DropdownMenuGroup>
            <MenuSectionLabel>Year</MenuSectionLabel>
            {yearRanges.map((range) => (
              <YearRangeItem
                key={range.id}
                range={range}
                selected={range.id === selected.id}
              />
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-1.5 bg-slate-200" />
          <DropdownMenuGroup>
            <MenuSectionLabel>Quarter · {year}</MenuSectionLabel>
            {quarterRanges.map((range) => (
              <QuarterRangeItem
                key={range.id}
                range={range}
                selected={range.id === selected.id}
                current={range.id === activeQuarter}
              />
            ))}
          </DropdownMenuGroup>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
