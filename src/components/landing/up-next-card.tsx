"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@ciq-dev/ciq-design-system"
import { fadeRiseTight, staggerContainer } from "@/lib/motion"
import type { UpNextData } from "./types"
import { RevealItem } from "./reveal"
import { UpNextActionItem } from "./up-next-action-item"

interface UpNextCardProps {
  data: UpNextData
}

export function UpNextCard({ data }: UpNextCardProps) {
  const { items } = data
  const [expandedId, setExpandedId] = useState(items[0]?.id ?? "")

  return (
    <RevealItem className="w-full min-w-0">
      <Card className="relative w-full overflow-hidden rounded-3xl border-0 bg-brand-25 py-0 ring-1 ring-brand-200/70 !shadow-pane-lg">
        {/* Faint brand tint plus the page's only filled button is enough to mark
            this as the action pane — no inverted surface required. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(70%_100%_at_18%_0%,var(--color-brand-100),transparent_75%)]"
        />

        <CardContent className="relative flex flex-col px-6 py-5">
          <motion.p
            variants={fadeRiseTight}
            className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600"
          >
            Up next
          </motion.p>

          <motion.ul
            variants={staggerContainer(0.05, 0.14)}
            className="mt-4 flex flex-col divide-y divide-brand-200/60"
          >
            {items.map((item) => (
              <UpNextActionItem
                key={item.id}
                item={item}
                expanded={item.id === expandedId}
                onSelect={() => setExpandedId(item.id)}
              />
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </RevealItem>
  )
}
