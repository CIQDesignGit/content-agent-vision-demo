"use client"

import { useState } from "react"
import { fadeRiseOnScroll } from "@/lib/motion"
import { cn } from "@/lib/utils"
import type { OpportunityStream } from "./types"
import { OpportunityStreamCard } from "./opportunity-stream-card"
import {
  formatStreamValue,
  parseValueLabelToThousands,
} from "./opportunity-stream-format"
import { RevealGroup, RevealItem } from "./reveal"
import { SectionHeading } from "./section-heading"

interface OpportunityStreamsProps {
  streams: OpportunityStream[]
  windowClosed?: boolean
  /** When set, that stream starts expanded (accordion still toggles). */
  defaultExpandedId?: string | null
  /** When set, these streams start expanded. Implies multi-expand. */
  defaultExpandedIds?: string[]
  /**
   * When false, multiple streams can stay open.
   * Defaults to true unless `defaultExpandedIds` is provided.
   */
  exclusive?: boolean
  /** Each stream in its own pane with gap — clearer when several stay open. */
  separatePanes?: boolean
  title?: string
  description?: string
  hideHeading?: boolean
  className?: string
}

export function OpportunityStreams({
  streams,
  windowClosed = false,
  defaultExpandedId = null,
  defaultExpandedIds,
  exclusive,
  separatePanes = false,
  title = "Open opportunity streams",
  description,
  hideHeading = false,
  className,
}: OpportunityStreamsProps) {
  const multi = exclusive === false || (defaultExpandedIds?.length ?? 0) > 0
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    if (defaultExpandedIds?.length) return new Set(defaultExpandedIds)
    if (defaultExpandedId) return new Set([defaultExpandedId])
    return new Set()
  })

  if (streams.length === 0) return null

  const headingDescription =
    description ??
    (windowClosed
      ? "Where the range came from, and what was captured before it closed."
      : "Where the range comes from, and what's blocking it.")

  const streamsTotalThousands = streams.reduce(
    (sum, stream) => sum + parseValueLabelToThousands(stream.valueLabel),
    0,
  )
  const streamsTotalLabel = formatStreamValue(streamsTotalThousands)

  function toggle(id: string) {
    setExpandedIds((prev) => {
      if (multi) {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }
      return prev.has(id) ? new Set() : new Set([id])
    })
  }

  return (
    <RevealGroup
      as="section"
      aria-label={hideHeading ? "Task streams" : title}
      className={cn("flex flex-col gap-5", className)}
      delay={0.12}
      stagger={0.1}
    >
      {!hideHeading ? (
        <SectionHeading
          title={title}
          description={headingDescription}
          aside={
            <>
              <p className="font-sans text-2xl font-semibold tabular-nums tracking-[-0.03em] text-brand-950">
                {streamsTotalLabel}
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                {windowClosed
                  ? "identified across streams"
                  : "open across streams"}
              </p>
            </>
          }
        />
      ) : null}

      <RevealItem variants={fadeRiseOnScroll}>
        {separatePanes ? (
          <ul className="flex flex-col gap-4">
            {streams.map((stream) => (
              <li
                key={stream.id}
                className="relative overflow-hidden rounded-3xl bg-white/80 ring-1 ring-slate-900/6 shadow-pane-lg backdrop-blur-md"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(70%_100%_at_12%_0%,var(--color-brand-50),transparent_70%)]"
                />
                <div className="relative">
                  <OpportunityStreamCard
                    stream={stream}
                    windowClosed={windowClosed}
                    expanded={expandedIds.has(stream.id)}
                    onToggle={() => toggle(stream.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="relative overflow-hidden rounded-3xl bg-white/80 ring-1 ring-slate-900/6 shadow-pane-lg backdrop-blur-md">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(70%_100%_at_12%_0%,var(--color-brand-50),transparent_70%)]"
            />
            <ul className="relative flex flex-col divide-y divide-slate-100/90">
              {streams.map((stream) => (
                <li key={stream.id}>
                  <OpportunityStreamCard
                    stream={stream}
                    windowClosed={windowClosed}
                    expanded={expandedIds.has(stream.id)}
                    onToggle={() => toggle(stream.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </RevealItem>
    </RevealGroup>
  )
}
