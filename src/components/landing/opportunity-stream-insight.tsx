import { Fragment } from "react"
import { cn } from "@ciq-dev/ciq-design-system"

const BOLD = /\*\*([^*]+)\*\*/g

interface OpportunityStreamInsightProps {
  markdown: string
  warning?: boolean
}

/** Renders stream insight copy with **markdown bold** for metrics and keywords. */
export function OpportunityStreamInsight({
  markdown,
  warning = false,
}: OpportunityStreamInsightProps) {
  const segments: Array<{ type: "text" | "bold"; value: string }> = []
  let lastIndex = 0
  for (const match of markdown.matchAll(BOLD)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      segments.push({ type: "text", value: markdown.slice(lastIndex, index) })
    }
    segments.push({ type: "bold", value: match[1] })
    lastIndex = index + match[0].length
  }
  if (lastIndex < markdown.length) {
    segments.push({ type: "text", value: markdown.slice(lastIndex) })
  }

  return (
    <p className="text-sm leading-relaxed text-slate-800">
      {segments.map((segment, i) =>
        segment.type === "bold" ? (
          <strong
            key={i}
            className={cn(
              "font-semibold",
              warning ? "text-warning-900" : "text-slate-900",
            )}
          >
            {segment.value}
          </strong>
        ) : (
          <Fragment key={i}>{segment.value}</Fragment>
        ),
      )}
    </p>
  )
}
