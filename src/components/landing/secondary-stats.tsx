import type { SecondaryStat } from "./types"

interface SecondaryStatsProps {
  stats: SecondaryStat[]
}

const POSITIVE_DELTA_IDS = new Set(["changes-approved", "ai-share"])

export function SecondaryStats({ stats }: SecondaryStatsProps) {
  return (
    <div
      aria-label="Key performance metrics"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {stats.map((stat) => {
        const isPositive = POSITIVE_DELTA_IDS.has(stat.id)
        return (
          <div
            key={stat.id}
            className="rounded-2xl bg-white/70 px-5 py-4 ring-1 ring-slate-900/5 shadow-pane backdrop-blur-md transition-shadow duration-200 hover:shadow-pane-hover"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
              {stat.label}
            </p>
            <div className="mt-2.5 flex items-baseline gap-2">
              <p className="font-sans text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {stat.value}
              </p>
              {stat.delta ? (
                <p
                  className={
                    isPositive
                      ? "rounded-full bg-teal-50 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-teal-700"
                      : "rounded-full bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-slate-600"
                  }
                >
                  {stat.delta}
                </p>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
