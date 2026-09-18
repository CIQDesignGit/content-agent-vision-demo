"use client"

import { useEffect, useState } from "react"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ciq-dev/ciq-design-system"

/** Info tip beside a stream title — span trigger so it can sit inside the accordion button. */
export function StreamTitleTip({
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
      <span
        aria-label={`About ${label}`}
        className="inline-flex shrink-0 text-slate-500"
      >
        <Info className="size-3.5" aria-hidden />
      </span>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          role="img"
          aria-label={`About ${label}`}
          className="inline-flex shrink-0 cursor-help text-slate-500 transition-colors hover:text-slate-700"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Info className="size-3.5" aria-hidden />
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs type-caption">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
