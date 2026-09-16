"use client"

import { Plus } from "lucide-react"
import { Card } from "@ciq-dev/ciq-design-system"
import { topicCoverage, topicHeadlines, topicShares, topicsRead } from "./data"
import { SegmentedControl } from "./segmented-control"
import { BandHeading, InsightRead, PanelHeader, trackingCardClass } from "./shared"
import { TopicDonutCard } from "./topic-donut-card"
import type { TopicSort } from "./types"

interface TopicsSectionProps {
  sort: TopicSort
  onSortChange: (sort: TopicSort) => void
  onViewPrompts: (topicId: string) => void
}

export function TopicsSection({
  sort,
  onSortChange,
  onViewPrompts,
}: TopicsSectionProps) {
  const topics = [...topicShares].sort((a, b) =>
    sort === "share"
      ? b.share - a.share
      : Math.abs(b.change) - Math.abs(a.change),
  )

  return (
    <section className="flex flex-col gap-5">
      <BandHeading
        title="Topics"
        description="Where you own the answer, and where share is slipping."
      />

      <Card className={trackingCardClass}>
        <div className="px-5 pt-5">
          <PanelHeader
            title="Share by topic"
            description="Click a topic to see the prompts behind it."
            action={
              <SegmentedControl
                value={sort}
                onChange={onSortChange}
                ariaLabel="Sort topics"
                layoutId="topic-sort-thumb"
                options={[
                  { id: "movement", label: "By movement" },
                  { id: "share", label: "By share" },
                ]}
              />
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicDonutCard
              key={topic.id}
              topic={topic}
              onViewPrompts={onViewPrompts}
            />
          ))}
          <div className="flex flex-col items-start justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-fg-primary">
              {topicCoverage.tracked} of {topicCoverage.total} prompts tracked
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
            >
              <Plus className="size-3.5" aria-hidden />
              Add prompts
            </button>
          </div>
        </div>

        <div className="grid gap-0 border-t border-slate-100 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-3 px-5 py-5">
            <div>
              <h4 className="text-base font-semibold tracking-tight text-slate-900">
                Topic headlines
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                The extremes across these themes this period
              </p>
            </div>
            <dl className="flex flex-col">
              {topicHeadlines.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0"
                >
                  <dt className="text-sm text-fg-tertiary">{item.label}</dt>
                  <dd className="text-sm font-medium text-fg-primary">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t border-slate-100 px-5 py-5 lg:border-t-0 lg:border-l lg:border-slate-100">
            <InsightRead className="h-full" markdown={topicsRead} />
          </div>
        </div>
      </Card>
    </section>
  )
}
