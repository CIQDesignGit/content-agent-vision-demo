"use client"

import { useState } from "react"
import { fadeRiseOnScroll } from "@/lib/motion"
import type { OpportunityStream } from "./types"
import { OpportunityStreamCard } from "./opportunity-stream-card"
import { RevealGroup, RevealItem } from "./reveal"
import { SectionHeading } from "./section-heading"

interface OpportunityStreamsProps {
  streams: OpportunityStream[]
}

export function OpportunityStreams({ streams }: OpportunityStreamsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (streams.length === 0) return null

  return (
    <RevealGroup
      as="section"
      aria-label="Opportunity streams"
      className="flex flex-col gap-5"
      stagger={0.1}
      onScroll
    >
      <SectionHeading
        title="Opportunity streams"
        description="Where the range comes from, and what's blocking it."
      />

      <RevealItem variants={fadeRiseOnScroll}>
        <div className="relative overflow-hidden rounded-3xl bg-white/80 ring-1 ring-slate-900/6 shadow-pane-lg backdrop-blur-md">
          {/* Soft brand wash — same lit-surface language as the meter pane. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(70%_100%_at_12%_0%,var(--color-brand-50),transparent_70%)]"
          />
          <ul className="relative flex flex-col divide-y divide-slate-100/90">
            {streams.map((stream) => (
              <li key={stream.id}>
                <OpportunityStreamCard
                  stream={stream}
                  expanded={expandedId === stream.id}
                  onToggle={() =>
                    setExpandedId((prev) =>
                      prev === stream.id ? null : stream.id,
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </RevealItem>
    </RevealGroup>
  )
}
