"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DEFAULT_RANGE = "this-year"

function rangesFor(year: number) {
  return [
    {
      id: DEFAULT_RANGE,
      label: "This year",
      span: `Jan 1 – Dec 31, ${year}`,
    },
    {
      id: "q1",
      label: "Q1",
      span: `Jan 1 – Mar 31, ${year}`,
    },
    {
      id: "q2",
      label: "Q2",
      span: `Apr 1 – Jun 30, ${year}`,
    },
    {
      id: "q3",
      label: "Q3",
      span: `Jul 1 – Sep 30, ${year}`,
    },
    {
      id: "q4",
      label: "Q4",
      span: `Oct 1 – Dec 31, ${year}`,
    },
    {
      id: "last-year",
      label: "Last year",
      span: `Jan 1 – Dec 31, ${year - 1}`,
    },
  ]
}

export function DateRangePicker({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const year = new Date().getFullYear()
  const ranges = rangesFor(year)
  const requested = searchParams.get("range")
  const selected =
    ranges.find((range) => range.id === requested) ?? ranges[0]

  function selectRange(id: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (id === DEFAULT_RANGE) params.delete("range")
    else params.set("range", id)
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "ml-auto inline-flex items-center gap-1.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900",
          className,
        )}
      >
        <Calendar className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
        <span>{selected.id === DEFAULT_RANGE ? "This year" : selected.label}</span>
        <span className="text-xs font-normal tabular-nums text-slate-400">
          {selected.span}
        </span>
        <ChevronDown className="size-3.5 shrink-0 text-slate-400" strokeWidth={2} aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuRadioGroup
          value={selected.id}
          onValueChange={selectRange}
        >
          {ranges.map((range) => (
            <DropdownMenuRadioItem key={range.id} value={range.id}>
              <span className="flex w-full items-baseline justify-between gap-4 pr-4">
                <span>{range.label}</span>
                <span className="text-xs tabular-nums text-slate-400">
                  {range.span}
                </span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
