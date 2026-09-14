import { cn } from "@/lib/utils"

/** Shared SKU placeholder — light multicolor gradient (no per-SKU initials). */
export function SkuGradientThumbnail({
  className,
}: {
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "shrink-0 rounded-lg bg-gradient-to-br from-brand-100 via-info-50 to-warning-100 ring-1 ring-slate-200/80",
        className ?? "size-10",
      )}
    />
  )
}
