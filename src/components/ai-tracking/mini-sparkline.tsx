import { cn } from "@ciq-dev/ciq-design-system"

interface MiniSparklineProps {
  values: number[]
  tone?: "up" | "down" | "flat"
}

export function MiniSparkline({ values, tone = "flat" }: MiniSparklineProps) {
  if (values.length < 2) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const width = 72
  const height = 22
  const step = width / (values.length - 1)
  const points = values
    .map((value, index) => {
      const x = index * step
      const y = height - ((value - min) / span) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn(
        "h-5 w-18",
        tone === "up" && "text-success-600",
        tone === "down" && "text-error-600",
        tone === "flat" && "text-slate-400",
      )}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}
