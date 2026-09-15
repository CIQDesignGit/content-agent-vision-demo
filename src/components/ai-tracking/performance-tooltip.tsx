interface PerformanceTooltipProps {
  active?: boolean
  payload?: Array<{ dataKey?: string | number; name?: string; value?: number | string }>
  label?: string | number
}

export function PerformanceTooltip({ active, payload, label }: PerformanceTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      {payload.map((item) => (
        <p key={String(item.dataKey)} className="text-xs text-slate-700">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  )
}
