import { cn } from "@ciq-dev/ciq-design-system"
import { MiniSparkline } from "./mini-sparkline"
import type { TopicGapRow } from "./types"

const CHANGE_TONE = {
  widening: "text-error-700",
  flatter: "text-slate-500",
  closing: "text-success-700",
  extending: "text-success-700",
} as const

interface GapTableProps {
  competitorName: string
  rows: TopicGapRow[]
}

export function GapTable({ competitorName, rows }: GapTableProps) {
  return (
    <div className="overflow-x-auto border-t border-slate-100">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border-default">
            {["Topic", "You", competitorName, "Gap", "Gap trend", "Change"].map(
              (heading) => (
                <th key={heading} className="px-5 py-3 text-xs font-medium text-brand-500">
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const gap = row.you - row.them
            return (
              <tr key={row.topic} className="border-b border-slate-100 last:border-0">
                <td className="px-5 py-3.5 text-sm text-fg-primary">{row.topic}</td>
                <td className="px-5 py-3.5 text-sm tabular-nums text-fg-secondary">
                  {row.you}
                </td>
                <td className="px-5 py-3.5 text-sm tabular-nums text-fg-secondary">
                  {row.them}
                </td>
                <td
                  className={cn(
                    "px-5 py-3.5 text-sm font-medium tabular-nums",
                    gap >= 0 ? "text-success-700" : "text-error-700",
                  )}
                >
                  {gap >= 0 ? `+${gap} ahead` : `${gap} behind`}
                </td>
                <td className="px-5 py-3.5">
                  <MiniSparkline values={row.trend} tone={gap >= 0 ? "up" : "down"} />
                </td>
                <td className={cn("px-5 py-3.5 text-sm capitalize", CHANGE_TONE[row.change])}>
                  {row.change}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
