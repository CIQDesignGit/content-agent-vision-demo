"use client"

import { useState } from "react"
import { ToggleLeft, ToggleRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AltKeywordsPanel } from "./alt-keywords-panel"
import {
  buildGroupedBulletReasoning,
  GroupedReasoningPanel,
} from "./bullets-combined-recommendation"
import { RecommendationFeedback } from "./recommendation-feedback"
import type { AltKeyword, BulletRecommendation } from "./types"

interface BulletsReasoningAltKeywordsBlockProps {
  bullets: BulletRecommendation[]
  altKeywords?: AltKeyword[]
  hideExpandedPanels?: boolean
  showReasoning?: boolean
  showAltKeywords?: boolean
  onReasoningToggle?: (show: boolean) => void
  onAltKeywordsToggle?: (show: boolean) => void
  usedKeywordIds?: Set<string>
  onUseKeyword?: (keyword: AltKeyword) => void
  onRemoveKeyword?: (keyword: AltKeyword) => void
}

export function BulletsReasoningAltKeywordsBlock({
  bullets,
  altKeywords = [],
  hideExpandedPanels = false,
  showReasoning: controlledShowReasoning,
  showAltKeywords: controlledShowAltKeywords,
  onReasoningToggle,
  onAltKeywordsToggle,
  usedKeywordIds = new Set(),
  onUseKeyword = () => {},
  onRemoveKeyword = () => {},
}: BulletsReasoningAltKeywordsBlockProps) {
  const [localShowReasoning, setLocalShowReasoning] = useState(false)
  const [localShowAltKeywords, setLocalShowAltKeywords] = useState(false)

  const showReasoning = controlledShowReasoning ?? localShowReasoning
  const showAltKeywords = controlledShowAltKeywords ?? localShowAltKeywords

  const grouped = buildGroupedBulletReasoning(bullets)
  const hasReasoning = grouped.length > 0
  const hasAltKeywords = altKeywords.length > 0

  if (!hasReasoning && !hasAltKeywords) return null

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center gap-3 py-1.5">
        {hasReasoning && (
          <button
            type="button"
            onClick={() => {
              const next = !showReasoning
              onReasoningToggle ? onReasoningToggle(next) : setLocalShowReasoning(next)
            }}
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium transition-colors",
              showReasoning ? "text-primary" : "text-slate-500 hover:text-slate-900",
            )}
          >
            {showReasoning ? (
              <ToggleRight className="size-3.5 shrink-0 text-primary" aria-hidden />
            ) : (
              <ToggleLeft className="size-3.5 shrink-0 text-slate-400" aria-hidden />
            )}
            Reasoning
          </button>
        )}
        {hasAltKeywords && (
          <button
            type="button"
            onClick={() => {
              const next = !showAltKeywords
              onAltKeywordsToggle ? onAltKeywordsToggle(next) : setLocalShowAltKeywords(next)
            }}
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium transition-colors",
              showAltKeywords ? "text-primary" : "text-slate-500 hover:text-slate-900",
            )}
          >
            {showAltKeywords ? (
              <ToggleRight className="size-3.5 shrink-0 text-primary" aria-hidden />
            ) : (
              <ToggleLeft className="size-3.5 shrink-0 text-slate-400" aria-hidden />
            )}
            Alt Keywords
            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
              {altKeywords.length}
            </span>
          </button>
        )}
        <RecommendationFeedback />
      </div>

      {!hideExpandedPanels && (
        <div className="flex w-full flex-col">
          {showReasoning && hasReasoning && (
            <div className="pb-2">
              <GroupedReasoningPanel grouped={grouped} />
            </div>
          )}
          {showAltKeywords && hasAltKeywords && (
            <div className="pb-2">
              <AltKeywordsPanel
                keywords={altKeywords}
                usedIds={usedKeywordIds}
                onUse={onUseKeyword}
                onRemove={onRemoveKeyword}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
