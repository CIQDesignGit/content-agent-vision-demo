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
    <Card className="relative flex w-full shrink-0 flex-col self-stretch overflow-hidden rounded-3xl border-0 bg-brand-25 ring-1 ring-brand-200/70 !shadow-pane-lg lg:w-[340px]">
      {/* Faint brand tint plus the page's only filled button is enough to mark
          this as the action pane — no inverted surface required. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,var(--color-brand-100),transparent_75%)]"
      />

      <CardContent className="relative flex min-h-0 flex-1 flex-col p-7">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          Up next
        </p>

        <ul className="mt-4 flex min-h-0 flex-1 flex-col divide-y divide-brand-200/60">
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
