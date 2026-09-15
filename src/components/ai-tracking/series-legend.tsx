import { cn } from "@ciq-dev/ciq-design-system"

export const chartConfig = {
  visibility: { label: "Visibility" },
  rank: { label: "AI rank" },
  competitorVisibility: { label: "Competitors" },
} as const

export type SeriesKey = keyof typeof chartConfig

const seriesSwatch: Record<SeriesKey, string> = {
  visibility: "bg-brand-500",
  rank: "bg-info-700",
  competitorVisibility: "bg-slate-300",
}

export function SeriesLegend({
  visible,
  onToggle,
}: {
  visible: Record<SeriesKey, boolean>
  onToggle: (key: SeriesKey) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(Object.keys(chartConfig) as SeriesKey[]).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onToggle(key)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600"
        >
          <span
            aria-hidden
            className={cn(
              "size-2.5 rounded-full",
              visible[key] ? seriesSwatch[key] : "bg-slate-200",
            )}
          />
          {chartConfig[key].label}
        </button>
      ))}
    </div>
  )
}
