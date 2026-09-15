"use client"

import { useEffect, useState } from "react"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ciq-dev/ciq-design-system"

/** Legend info affordance for a composition-bar segment. */
export function SegmentInfo({
  label,
  tooltip,
}: {
  label: string
  tooltip: string
}) {
  // Radix tooltip IDs differ between server and client — mount before wiring.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={`About ${label}`}
        className="shrink-0 rounded-full text-slate-300 transition-colors hover:text-slate-500"
      >
        <Info className="size-3.5" aria-hidden />
      </button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`About ${label}`}
          className="shrink-0 rounded-full text-slate-300 transition-colors hover:text-slate-500"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Info className="size-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs type-caption">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
