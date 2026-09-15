"use client"

import { ArrowRight } from "lucide-react"
import { cn } from "@ciq-dev/ciq-design-system"
import type { TopicShare } from "./types"

const RADIUS = 16
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface TopicDonutCardProps {
  topic: TopicShare
  onViewPrompts: (topicId: string) => void
}

export function TopicDonutCard({ topic, onViewPrompts }: TopicDonutCardProps) {
  const dash = (Math.min(topic.share, 100) / 100) * CIRCUMFERENCE
  const gaining = topic.change > 0
  const losing = topic.change < 0

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-default bg-surface p-4">
      <div className="flex items-start gap-3">
        <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden>
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            fill="none"
            className="stroke-slate-100"
            strokeWidth="5"
          />
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            fill="none"
            className="stroke-brand-500"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
            transform="rotate(-90 20 20)"
          />
        </svg>
        <div className="min-w-0">
          <p className="font-sans text-xl font-semibold tabular-nums text-fg-primary">
            {topic.share % 1 === 0 ? `${topic.share}%` : `${topic.share}%`}
          </p>
          <p className="truncate text-sm font-medium text-fg-secondary">{topic.name}</p>
        </div>
      </div>

      <p className="text-xs text-fg-tertiary">
        {topic.visibility}% viz · rank {topic.rank.toFixed(1)} ·{" "}
        <span
          className={cn(
            "font-medium",
            gaining && "text-success-700",
            losing && "text-error-700",
            !gaining && !losing && "text-slate-500",
          )}
        >
          {gaining ? "▲" : losing ? "▼" : ""} {Math.abs(topic.change).toFixed(1)}
        </span>
      </p>

      <button
        type="button"
        onClick={() => onViewPrompts(topic.id)}
        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
      >
        View {topic.promptCount} prompts
        <ArrowRight className="size-3.5" aria-hidden />
      </button>
    </div>
  )
}
