"use client"

interface ConfidenceMeterProps {
  score: number
  max?: number
  note: string
}

export function ConfidenceMeter({
  score,
  max = 4,
  note,
}: ConfidenceMeterProps) {
  return (
    <div className="mt-3 flex items-center gap-2.5 text-[11px] text-fg-tertiary">
      <span className="flex w-[70px] gap-0.5" aria-hidden>
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`h-0.5 flex-1 rounded-sm ${
              i < score ? "bg-brand-600" : "bg-slate-200"
            }`}
          />
        ))}
      </span>
      <span>{note}</span>
    </div>
  )
}
