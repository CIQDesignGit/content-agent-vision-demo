"use client"

import { useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { DURATION, EASE_OUT, staggerContainer } from "@/lib/motion"
import { SecondaryStatCard } from "./secondary-stat-card"
import { useCollapsedSiblingHeight } from "./use-collapsed-sibling-height"
import type { SecondaryStat } from "./types"

interface SecondaryStatsProps {
  stats: SecondaryStat[]
}

/** Opacity only — a translate here fights the layout animation of the expanding card. */
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
}

export function SecondaryStats({ stats }: SecondaryStatsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const columnRef = useRef<HTMLDivElement>(null)
  const collapsedHeight = useCollapsedSiblingHeight(columnRef)

  return (
    <motion.div
      ref={columnRef}
      variants={fadeIn}
      style={
        collapsedHeight
          ? { ["--meter-column-h" as string]: `${collapsedHeight}px` }
          : undefined
      }
      className={cn(
        "relative min-h-0 min-w-0 self-stretch",
        collapsedHeight && "lg:h-(--meter-column-h) lg:self-start",
      )}
    >
      {/* Inset bleed gives rings and shadows room inside the height-locked scroller. */}
      <motion.div
        layoutScroll
        aria-label="Key performance metrics"
        className="scrollbar-none flex flex-col items-stretch gap-3 lg:absolute lg:-inset-x-2.5 lg:-top-1 lg:-bottom-4 lg:overflow-y-auto lg:overscroll-contain lg:px-2.5 lg:pt-1 lg:pb-4"
        variants={staggerContainer(0.06)}
      >
        {stats.map((stat) => (
          <SecondaryStatCard
            key={stat.id}
            stat={stat}
            expanded={expandedId === stat.id}
            anyExpanded={expandedId != null}
            onToggle={() =>
              setExpandedId((current) => (current === stat.id ? null : stat.id))
            }
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
