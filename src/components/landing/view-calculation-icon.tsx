import { Calculator } from "lucide-react"
import { cn } from "@/lib/utils"

export function ViewCalculationIcon({ className }: { className?: string }) {
  return (
    <Calculator
      className={cn("size-3.5 shrink-0", className)}
      strokeWidth={2}
      aria-hidden
    />
  )
}
