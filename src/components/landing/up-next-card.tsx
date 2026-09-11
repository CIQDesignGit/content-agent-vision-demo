"use client"

import { useState } from "react"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import type { UpNextData } from "./types"
import { UpNextActionItem } from "./up-next-action-item"

interface UpNextCardProps {
  data: UpNextData
}

export function UpNextCard({ data }: UpNextCardProps) {
  const { items } = data
  const [expandedId, setExpandedId] = useState(items[0]?.id ?? "")

  return (
    <Card className="relative flex w-full shrink-0 flex-col self-stretch overflow-hidden rounded-3xl border-0 bg-brand-950 !shadow-pane-brand lg:w-[340px]">
      {/* Inverted surface so the action zone reads as the one place to click. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-72 bg-[radial-gradient(60%_100%_at_50%_50%,var(--color-brand-600),transparent_70%)] opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 size-64 rounded-full bg-brand-500/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 ring-inset"
      />

      <CardContent className="relative flex min-h-0 flex-1 flex-col p-7">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">
          Up next
        </p>

        <ul className="mt-4 flex min-h-0 flex-1 flex-col divide-y divide-white/10">
          {items.map((item) => (
            <UpNextActionItem
              key={item.id}
              item={item}
              expanded={item.id === expandedId}
              onSelect={() => setExpandedId(item.id)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
