"use client"

import { useEffect, useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card } from "@ciq-dev/ciq-design-system"
import { performanceRead, performanceSeries } from "./data"
import { PerformanceTooltip } from "./performance-tooltip"
import { SeriesLegend, type SeriesKey } from "./series-legend"
import { InsightRead, PanelHeader, trackingCardClass } from "./shared"

export function PerformanceChart() {
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState<Record<SeriesKey, boolean>>({
    visibility: true,
    rank: true,
    competitorVisibility: false,
  })

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <Card className={`${trackingCardClass} flex h-full flex-col`}>
      <div className="px-5 pt-5">
        <PanelHeader
          title="Performance over time"
          description="Weekly visibility % and inverted AI rank. Lower rank is better."
          action={
            <SeriesLegend
              visible={visible}
              onToggle={(key) => setVisible((prev) => ({ ...prev, [key]: !prev[key] }))}
            />
          }
        />
      </div>

      <div className="h-72 w-full min-w-0 px-2 pt-2">
        {ready ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceSeries} margin={{ top: 16, right: 16, left: 4, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-slate-100)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--color-slate-400)", fontSize: 11 }}
            />
            <YAxis
              yAxisId="visibility"
              domain={[40, 100]}
              ticks={[40, 55, 70, 85, 100]}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-slate-400)", fontSize: 11 }}
              width={44}
            />
            <YAxis
              yAxisId="rank"
              orientation="right"
              domain={[1, 9]}
              reversed
              ticks={[1, 3, 5, 7, 9]}
              tickFormatter={(value) => `#${value}`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-slate-400)", fontSize: 11 }}
              width={36}
            />
            <Tooltip
              cursor={{ stroke: "var(--color-slate-200)" }}
              content={<PerformanceTooltip />}
            />
            {visible.visibility ? (
              <Line
                yAxisId="visibility"
                type="monotone"
                dataKey="visibility"
                name="Visibility"
                stroke="var(--color-brand-500)"
                strokeWidth={2}
                isAnimationActive={false}
                dot={{ r: 3, fill: "var(--color-brand-500)", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            ) : null}
            {visible.rank ? (
              <Line
                yAxisId="rank"
                type="monotone"
                dataKey="rank"
                name="AI rank"
                stroke="var(--color-info-700)"
                strokeWidth={2}
                strokeDasharray="6 4"
                isAnimationActive={false}
                dot={false}
              />
            ) : null}
            {visible.competitorVisibility ? (
              <Line
                yAxisId="visibility"
                type="monotone"
                dataKey="competitorVisibility"
                name="Competitors"
                stroke="var(--color-slate-300)"
                strokeWidth={2}
                isAnimationActive={false}
                dot={false}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
        ) : null}
      </div>

      <div className="mt-auto px-5 pb-5">
        <InsightRead markdown={performanceRead} />
      </div>
    </Card>
  )
}
