"use client"

import { motion } from "framer-motion"
import { drawDownOnScroll, fadeRiseTightOnScroll } from "@/lib/motion"

interface SectionHeadingProps {
  title: string
  description?: string
}

/**
 * Shared section header so every band on the page opens the same way.
 * Only the scroll-revealed bands use it, so it carries the scroll timing.
 */
export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="flex items-start gap-3">
      <motion.span
        variants={drawDownOnScroll}
        aria-hidden
        className="mt-1 h-9 w-1 shrink-0 origin-top rounded-full bg-brand-400"
      />
      <motion.div variants={fadeRiseTightOnScroll} className="min-w-0">
        <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        ) : null}
      </motion.div>
    </div>
  )
}
