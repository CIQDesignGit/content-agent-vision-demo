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
      className="flex w-full shrink-0 cursor-pointer items-center gap-1.5 border-t border-slate-100 px-7 py-3.5 text-left text-sm font-medium text-brand-600 hover:bg-slate-50 hover:text-brand-700"
    >
      {open ? (
        <>
          <X className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          Close
        </>
      ) : (
        <>
          <ViewCalculationIcon />
          How is this calculated?
        </>
      )}
    </button>
  )
}
