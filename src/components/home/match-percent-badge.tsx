"use client"

import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const MATCH_TOOLTIP = "Match between PIM and retailer"

export function MatchPercentBadge({ percent }: { percent: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-normal text-slate-500">
      {percent}% match
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                aria-label={MATCH_TOOLTIP}
                className="inline-flex shrink-0 text-slate-400 hover:text-slate-600"
              />
            }
          >
            <Info className="size-3" aria-hidden />
          </TooltipTrigger>
          <TooltipContent side="bottom">{MATCH_TOOLTIP}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  )
}
