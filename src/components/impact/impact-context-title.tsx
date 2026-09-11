interface ImpactContextTitleProps {
  opportunityName: string
  valueLabel: string
  skuCount: number
}

export function ImpactContextTitle({
  opportunityName,
  valueLabel,
  skuCount,
}: ImpactContextTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="type-title text-fg-primary">{opportunityName}</h1>
      <p className="text-sm text-fg-secondary">
        These SKUs contributed{" "}
        <span className="font-semibold tabular-nums text-fg-primary">
          {valueLabel}
        </span>{" "}
        in impact for this opportunity
        <span className="text-fg-tertiary">
          {" "}
          · {skuCount.toLocaleString()} SKUs
        </span>
      </p>
    </div>
  )
}
