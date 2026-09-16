"use client"

import { cn } from "@/lib/utils"
import type { PeriodRetroNote } from "./types"

function RetroRow({
  note,
  tone,
}: {
  note: PeriodRetroNote
  tone: "highlight" | "lowlight"
}) {
  const win = tone === "highlight"

  return (
    <li className="flex items-baseline justify-between gap-3 py-2 first:pt-0 last:pb-0">
      <span
        className={cn(
          "min-w-0 text-[13px] font-medium leading-snug",
          win ? "text-slate-800" : "text-slate-600",
        )}
      >
        {note.title}
      </span>
      <span
        className={cn(
          "shrink-0 rounded-md px-2 py-0.5 text-sm font-semibold tabular-nums tracking-tight",
          win
            ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80"
            : "bg-slate-100 text-slate-600 ring-1 ring-slate-200/90",
        )}
      >
        {note.amountLabel}
      </span>
    </li>
  )
}

/** Wins or misses — section accent bar signals outcome; no nested panel. */
export function PeriodRetroNotes({
  kind,
  heading,
  notes,
}: {
  kind: "highlight" | "lowlight"
  heading: string
  notes: PeriodRetroNote[]
}) {
  const win = kind === "highlight"

  return (
    <section className="relative min-w-0 pl-4">
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-1 rounded-full",
          win ? "bg-emerald-600" : "bg-slate-300",
        )}
      />
      <h3 className="flex items-center gap-2">
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            win ? "bg-emerald-600" : "bg-slate-400",
          )}
          aria-hidden
        />
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.14em]",
            win ? "text-emerald-800" : "text-slate-500",
          )}
        >
          {heading}
        </span>
      </h3>
      <ul className="mt-2">
        {notes.map((note) => (
          <RetroRow key={note.id} note={note} tone={kind} />
        ))}
      </ul>
    </section>
  )
}
