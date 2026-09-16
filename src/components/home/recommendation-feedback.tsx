"use client"

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
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
  tone: Vote
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

/** Thumbs up / down, then a short note in a popup beside the vote. */
export function RecommendationFeedback() {
  const [vote, setVote] = useState<Vote | null>(null)
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState("")
  const [draft, setDraft] = useState("")
  const noteId = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
  }, [open, vote])

  function choose(next: Vote) {
    setVote((prev) => {
      if (prev === next) {
        setOpen(false)
        return null
      }
      setDraft(note)
      setOpen(true)
      return next
    })
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    setNote(draft.trim())
    setOpen(false)
  }

  const prompt = vote === "down" ? "What wasn't helpful?" : "What was helpful?"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <div
          className="relative ml-auto flex items-center gap-0.5"
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
          <PopoverTrigger
            className="pointer-events-none absolute top-0 right-0 size-6 opacity-0"
            tabIndex={-1}
            aria-hidden
          />
        </div>
      </TooltipProvider>
      <PopoverContent align="end" side="bottom" sideOffset={6} className="w-64 gap-2 p-3">
        <form onSubmit={submit} className="flex flex-col gap-2">
          <label htmlFor={noteId} className="text-xs font-medium text-slate-700">
            {prompt}
          </label>
          <Textarea
            ref={inputRef}
            id={noteId}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={2}
            placeholder="Add a note"
            className="min-h-16 text-sm"
          />
          <div className="flex justify-end">
            <Button type="submit" size="xs">
              Submit
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
