import { candleThumbnail } from "@/lib/candle-thumbnails"
import { cn } from "@/lib/utils"

interface SkuGradientThumbnailProps {
  className?: string
  /** Product id or ASIN — same seed always maps to the same candle photo. */
  seed?: string
  src?: string
  alt?: string
}

export function SkuGradientThumbnail({
  className,
  seed = "candle",
  src,
  alt = "",
}: SkuGradientThumbnailProps) {
  return (
    <img
      src={src ?? candleThumbnail(seed)}
      alt={alt}
      className={cn(
        "shrink-0 rounded-lg object-cover ring-1 ring-slate-200/80",
        className ?? "size-10",
      )}
    />
  )
}
