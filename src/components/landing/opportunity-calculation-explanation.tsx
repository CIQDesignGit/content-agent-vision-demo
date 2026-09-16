import type { ReactNode } from "react"

export function CalculationExplanation({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 text-xs leading-relaxed text-slate-500">
      {children}
    </div>
  )
}
