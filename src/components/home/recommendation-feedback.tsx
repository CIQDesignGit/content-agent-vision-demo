"use client"

import { useState, type ReactNode } from "react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Vote = "up" | "down"

function FeedbackButton({
  label,
  pressed,
  tone,
  onClick,
  children,
}: {
  label: string
  pressed: boolean
  tone: "up" | "down"
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={label}
            aria-pressed={pressed}
            onClick={onClick}
            className={cn(
              "grid size-6 place-items-center rounded-md transition-colors",
              pressed
                ? tone === "up"
                  ? "bg-success-100 text-success-700"
                  : "bg-error-100 text-error-700"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-600",
            )}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

/** Thumbs up / down for an AI recommendation — one vote, click again to clear. */
export function RecommendationFeedback() {
  const [vote, setVote] = useState<Vote | null>(null)

  function choose(next: Vote) {
    setVote((prev) => (prev === next ? null : next))
  }

  return (
    <TooltipProvider>
      <div
        className="ml-auto flex items-center gap-0.5"
        role="group"
        aria-label="Recommendation feedback"
      >
        <FeedbackButton
          label="Helpful"
          pressed={vote === "up"}
          tone="up"
          onClick={() => choose("up")}
        >
          <ThumbsUp className={cn("size-3.5", vote === "up" && "fill-current")} />
        </FeedbackButton>
        <FeedbackButton
          label="Not helpful"
          pressed={vote === "down"}
          tone="down"
          onClick={() => choose("down")}
        >
          <ThumbsDown className={cn("size-3.5", vote === "down" && "fill-current")} />
        </FeedbackButton>
      </div>
    </TooltipProvider>
  )
}
