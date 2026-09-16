"use client"

import type { Ref } from "react"
import { X } from "lucide-react"
import { ViewCalculationIcon } from "./view-calculation-icon"

interface CalculationToggleProps {
  open: boolean
  buttonRef: Ref<HTMLButtonElement>
  onOpen: () => void
  onClose: () => void
}

export function CalculationToggle({
  open,
  buttonRef,
  onOpen,
  onClose,
}: CalculationToggleProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        if (open) onClose()
        else onOpen()
      }}
      aria-expanded={open}
      aria-controls="opportunity-calculation-panel"
      className="absolute top-7 right-7 z-20 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover/meter:text-brand-700 hover:text-brand-700"
    >
      {open ? (
        <>
          <X className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          Close
        </>
      ) : (
        <>
          <ViewCalculationIcon />
          View calculation
        </>
      )}
    </button>
  )
}
