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
    <Card className="flex w-full shrink-0 flex-col self-stretch overflow-hidden rounded-2xl border-border-default bg-surface !shadow-brand-soft lg:w-80">
      <CardContent className="flex min-h-0 flex-1 flex-col p-6">
        <p className="shrink-0 text-sm text-fg-tertiary">Up next</p>

        <ul className="mt-3 flex min-h-0 flex-1 flex-col divide-y divide-slate-100">
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
