import { Card, CardContent, cn } from "@ciq-dev/ciq-design-system"
import type { LostToInactionData } from "./types"

interface LostToInactionCardProps {
  data: LostToInactionData
}

export function LostToInactionCard({ data }: LostToInactionCardProps) {
  return (
    <Card
      className={cn(
        "relative flex w-full shrink-0 overflow-hidden rounded-2xl !border-red-100 bg-surface shadow-sm lg:w-70",
        "bg-linear-to-bl from-red-50/50 via-25% via-surface to-surface",
      )}
    >
      <CardContent className="relative z-10 flex flex-1 flex-col justify-between gap-6 bg-transparent p-0">
        <div className="px-5 pt-5">
          <span className="inline-flex items-center rounded-full bg-error-100 px-2.5 py-0.5 type-caption-strong text-feedback-danger">
            Lost to inaction
          </span>
          <p className="mt-4 font-sans text-4xl font-semibold leading-none tracking-tight text-feedback-danger tabular-nums">
            {data.amountLabel}
          </p>
          <p className="mt-3 text-sm leading-snug text-fg-secondary">
            Estimated sales missed on{" "}
            <span className="font-semibold text-fg-primary">{data.eventName}</span>{" "}
            because recommended content changes weren't published in time.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-red-100 px-5 py-3.5">
          <span className="inline-flex w-fit rounded-md bg-error-100 px-2 py-0.5 type-caption-strong text-feedback-danger">
            {data.eventDateLabel}
          </span>
          <p className="text-xs leading-snug text-fg-secondary">{data.support}</p>
        </div>
      </CardContent>
    </Card>
  )
}
