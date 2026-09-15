"use client"

import { fieldLabelContentStack } from "./field-layout"
import { BulletSourceCell, SourceCellLabel } from "./bullet-source-cell"
import {
  PIM_CHANNEL_LABEL,
  PIM_LOGO_ALT,
  RETAILER_LOGO_SRC,
  SALSIFY_LOGO_SRC,
} from "./source-logos"

interface TitleCompareColumnProps {
  kind: "pim" | "pdp"
  value: string
  compareValue: string
  charLimit?: number
  /** Render label row, field row, or both (default). */
  part?: "full" | "label" | "field"
  fillHeight?: boolean
}

export function TitleCompareColumn({
  kind,
  value,
  compareValue,
  charLimit,
  part = "full",
  fillHeight = false,
}: TitleCompareColumnProps) {
  const isPim = kind === "pim"
  const logoSrc = isPim ? SALSIFY_LOGO_SRC : RETAILER_LOGO_SRC
  const logoAlt = isPim ? PIM_LOGO_ALT : "Amazon"
  const sublabel = isPim ? PIM_CHANNEL_LABEL : "Retailer"

  const labelRow = (
    <div className="flex min-h-[30px] items-center">
      <SourceCellLabel logoSrc={logoSrc} logoAlt={logoAlt} sublabel={sublabel} />
    </div>
  )

  const fieldRow = (
    <div className={fillHeight ? "flex h-full min-h-18 w-full flex-col" : "flex min-h-0 flex-1 flex-col"}>
      <BulletSourceCell
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        sublabel={sublabel}
        value={value}
        compareValue={compareValue}
        side={kind}
        showLabel={false}
        charLimit={charLimit}
        fillHeight={fillHeight}
      />
    </div>
  )

  if (part === "label") return labelRow
  if (part === "field") return fieldRow

  return (
    <div className={fieldLabelContentStack("min-h-0 min-w-0")}>
      {labelRow}
      {fieldRow}
    </div>
  )
}
