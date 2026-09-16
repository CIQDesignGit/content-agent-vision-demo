"use client"

import { useEffect, useRef, useState } from "react"
import { RevealItem } from "@/components/landing/reveal"
import { DURATION } from "@/lib/motion"
import { AbBatchCard } from "./ab-batch-card"
import { AB_BATCHES } from "./ab-batches-data"

interface AbBatchListProps {
  /** Deep-link support, e.g. arriving from Overview's "View pilot results" CTA. */
  initialOpenBatchId?: string | null
  /** Must match the parent RevealGroup's own delay/stagger so the header +
   *  batch cards read as one continuous cascade, not two disconnected ones. */
  revealBaseDelay: number
  revealStagger: number
}

/** Newest/active batch first — same convention as the ASIN detail cycle history. */
export function AbBatchList({
  initialOpenBatchId,
  revealBaseDelay,
  revealStagger,
}: AbBatchListProps) {
  const batches = [...AB_BATCHES].reverse()
  const [openId, setOpenId] = useState<string | null>(null)
  const deepLinkedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!initialOpenBatchId) return
    const index = batches.findIndex((batch) => batch.id === initialOpenBatchId)
    if (index === -1) return

    // Header occupies stagger slot 0, so a batch card at array index `i` is
    // slot `i + 1` — wait for its own reveal to finish before scrolling to
    // it and opening it, so the deep link reads as the next graceful beat
    // in the same cascade rather than an abrupt jump ahead of it.
    const revealFinishSeconds = revealBaseDelay + (index + 1) * revealStagger + DURATION.calm
    const timer = setTimeout(() => {
      setOpenId(initialOpenBatchId)
      deepLinkedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, revealFinishSeconds * 1000)

    return () => clearTimeout(timer)
    // Only run for the deep-link that brought us here, not on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {batches.map((batch) => (
        <RevealItem key={batch.id}>
          <div ref={batch.id === initialOpenBatchId ? deepLinkedRef : undefined}>
            <AbBatchCard
              batch={batch}
              open={openId === batch.id}
              onToggle={() => setOpenId((current) => (current === batch.id ? null : batch.id))}
            />
          </div>
        </RevealItem>
      ))}
    </>
  )
}
