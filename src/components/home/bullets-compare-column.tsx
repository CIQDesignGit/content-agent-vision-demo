"use client"

import { cn } from "@/lib/utils"
import { fieldLabelContentStack } from "./field-layout"
import { SourceCellLabel } from "./bullet-source-cell"
import { BulletsSourceCompare } from "./bullets-source-compare"
import {
  PIM_CHANNEL_LABEL,
  PIM_LOGO_ALT,
  RETAILER_LOGO_SRC,
  SALSIFY_LOGO_SRC,
} from "./source-logos"

interface BulletsCompareColumnProps {
  kind: "pim" | "pdp"
  bullets: string[]
  compareBullets: string[]
  part?: "full" | "label" | "field"
  fillHeight?: boolean
}

export function BulletsCompareColumn({
  kind,
  bullets,
  compareBullets,
  part = "full",
  fillHeight = false,
}: BulletsCompareColumnProps) {
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
    <div
      className={cn(
        "flex w-full min-w-0 flex-col rounded-lg border border-slate-200 bg-slate-50",
        fillHeight ? "min-h-18 h-full flex-1 self-stretch" : "min-h-18 flex-1",
      )}
    >
      <BulletsSourceCompare
        bullets={bullets}
        compareBullets={compareBullets}
        side={kind}
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
