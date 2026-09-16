"use client"

import { useMemo, useState } from "react"
import { ListChecks } from "lucide-react"
import { SectionSelectToggle } from "./section-controls"
import { cn } from "@/lib/utils"
import { buildTitleDiff } from "@/lib/build-title-diff"
import { buildDisplayBulletLists } from "@/lib/build-display-bullet-lists"
import { titleMatchPercent } from "@/lib/title-match"
import { resolvePublishedSourceDisplay } from "@/lib/published-source-display"
import { resolveBulletSyncFootprint } from "@/lib/sync-footprint"
import { BulletBulkActions } from "./bullet-bulk-actions"
import { CompareTabs, ContentRecommendationHeader } from "./content-recommendation-card"
import { AiRecommendationSparklesIcon, SourceChannelLabel } from "./bullet-source-cell"
import { BulletsCompareColumn } from "./bullets-compare-column"
import { MatchPercentBadge } from "./match-percent-badge"
import { BulletsReasoningAltKeywordsBlock } from "./bullets-reasoning-alt-keywords-block"
import { ReasoningAltKeywordsBlock } from "./reasoning-alt-keywords-block"
import {
  buildGroupedBulletReasoning,
  BulletsCombinedRecommendationView,
  GroupedReasoningPanel,
  type CombinedBulletItem,
} from "./bullets-combined-recommendation"
import { AltKeywordsPanel } from "./alt-keywords-panel"
import type { FieldCompareTarget } from "./vertical-source-compare-grid"
import type { FieldPublishQueueItem } from "@/lib/build-field-publish-queue"
import type { AltKeyword, BulletRecommendation, PublishBatch, ReasoningCategory } from "./types"

interface BulletPointsSectionProps {
  pimBullets: string[]
  pdpBullets: string[]
  recommendations: BulletRecommendation[]
  originals: Record<string, string>
  /** When false, no PIM catalog entry exists — recommendations go into the PIM column. */
  hasPimData?: boolean
  getFieldPublishBatch?: (fieldKey: string) => PublishBatch | undefined
  getBulletPublishQueue?: (bulletId: string) => FieldPublishQueueItem[]
  onRecommendationTextChange: (id: string, text: string) => void
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onReset: (id: string) => void
  onUndoAccept: (id: string) => void
  onUndoReject: (id: string) => void
  onPushUpdate: (id: string) => void
  onAcceptAll: () => void
  onRejectAll: () => void
  onResetAll: () => void
  onAcceptNewDraft?: (id: string, text: string) => void
  isIncluded?: boolean
  onToggleInclude?: () => void
  /** When true, hides Accept/Reject/bulk-action buttons — section toggle handles inclusion instead. */
  hideActions?: boolean
}

function getBulletBaselines(
  reco: BulletRecommendation,
  pimBullets: string[],
  pdpBullets: string[],
  getFieldPublishBatch?: (fieldKey: string) => PublishBatch | undefined,
) {
  if (reco.kind === "add") {
    return { pimBaseline: "", pdpBaseline: "" }
  }

  const index = reco.pimIndex ?? 0
  const pimText = pimBullets[index] ?? ""
  const pdpText = pdpBullets[index] ?? ""
  const fp = resolveBulletSyncFootprint(reco)
  const batch = getFieldPublishBatch?.(`bullet:${reco.id}`)
  const display = resolvePublishedSourceDisplay(
    pimText,
    pdpText,
    reco.recommendedText,
    fp,
    batch,
  )

  return { pimBaseline: display.pim, pdpBaseline: display.pdp }
}


/**
 * PDP-only combined bullet list view.
 * Shows all AI-recommended bullets in one box formatted as a bullet list,
 * with bulk Accept / Reject below. Box border + bg adapts to review state.
 * Renders word-level diffs when compareTarget is "pdp", plain text when "final".
 */
function NoPimBulletsCombinedView({
  activeRecommendations,
  recommendations,
  originals,
  compareTarget,
  pdpBullets,
  onAcceptAll,
  onRejectAll,
  onResetAll,
  hideActions = false,
}: {
  activeRecommendations: BulletRecommendation[]
  recommendations: BulletRecommendation[]
  originals: Record<string, string>
  compareTarget: FieldCompareTarget
  pdpBullets: string[]
  onAcceptAll: () => void
  onRejectAll: () => void
  onResetAll: () => void
  hideActions?: boolean
}) {
  const allAccepted = activeRecommendations.every((r) => r.status === "accepted")
  const allRejected = activeRecommendations.every((r) => r.status === "rejected")
  const isFinalView = compareTarget === "final"

  // Precompute word-level diffs. Each AI bullet is compared against the PDP bullet
  // at the same position — this produces meaningful kept/removed/added segments.
  const diffs = useMemo(
    () =>
      activeRecommendations.map((reco, idx) => {
        const baseline = pdpBullets[idx] ?? ""
        return buildTitleDiff(baseline, reco.recommendedText)
      }),
    [activeRecommendations, pdpBullets],
  )

  const outerClass = allAccepted
    ? "bg-success-50"
    : allRejected
      ? "bg-slate-50"
      : "bg-brand-50"

  const innerClass = allAccepted
    ? "border-success-200 bg-white"
    : allRejected
      ? "border-slate-200 bg-slate-100"
      : "border-brand-300 bg-white"

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 pb-3">
      <div className={cn("w-full min-w-0 rounded-lg px-0.5 py-0.5", outerClass)}>
        <div className={cn("rounded-md border px-3 py-2", innerClass)}>
          <ul className="space-y-2">
            {activeRecommendations.map((reco, idx) => (
              <li key={reco.id} className="flex gap-2">
                <span
                  className={cn(
                    "mt-0.5 shrink-0 text-sm leading-relaxed",
                    reco.status === "rejected" ? "text-slate-300" : "text-slate-400",
                  )}
                >
                  •
                </span>
                {/* Diff view (vs. PDP) or plain text (Text tab) */}
                {isFinalView || reco.status !== "pending" ? (
                  <span
                    className={cn(
                      "text-sm leading-relaxed",
                      reco.status === "accepted"
                        ? "text-success-700"
                        : reco.status === "rejected"
                          ? "text-slate-400 line-through"
                          : "text-slate-900",
                    )}
                  >
                    {reco.recommendedText}
                  </span>
                ) : (
                  <p className="text-sm leading-relaxed text-slate-900">
                    {diffs[idx].map((seg, si) => {
                      if (seg.kind === "kept") return <span key={si}>{seg.text}</span>
                      if (seg.kind === "removed")
                        return (
                          <span key={si} className="text-slate-400 line-through">
                            {seg.text}
                          </span>
                        )
                      return (
                        <span key={si} className="rounded bg-green-50 px-0.5 font-medium text-green-700">
                          {seg.text}
                        </span>
                      )
                    })}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!hideActions && (
        <BulletBulkActions
          recommendations={recommendations}
          originals={originals}
          onAcceptAll={onAcceptAll}
          onRejectAll={onRejectAll}
          onResetAll={onResetAll}
        />
      )}
    </div>
  )
}

export function BulletPointsSection({
  pimBullets,
  pdpBullets,
  recommendations,
  originals,
  hasPimData = true,
  getFieldPublishBatch,
  getBulletPublishQueue,
  onRecommendationTextChange,
  onAccept,
  onReject,
  onReset,
  onUndoAccept,
  onUndoReject,
  onPushUpdate,
  onAcceptAll,
  onRejectAll,
  onResetAll,
  onAcceptNewDraft,
  isIncluded = true,
  onToggleInclude,
  hideActions = false,
}: BulletPointsSectionProps) {
  const [recoCompareTarget, setRecoCompareTarget] = useState<FieldCompareTarget>("pdp")
  const [showReasoning, setShowReasoning] = useState(false)
  const [showAltKeywords, setShowAltKeywords] = useState(false)
  const [usedKeywordIds, setUsedKeywordIds] = useState<Set<string>>(new Set())
  const [appliedSuffixes, setAppliedSuffixes] = useState<Map<string, string>>(new Map())

  const activeRecommendations = useMemo(
    () =>
      recommendations.filter(
        (reco) =>
          reco.status === "pending" ||
          reco.status === "accepted" ||
          reco.status === "rejected",
      ),
    [recommendations],
  )

  // No-PIM: merged reasoning across all bullets, grouped by category key
  const mergedBulletReasoning = useMemo<ReasoningCategory[]>(() => {
    if (hasPimData) return []
    const byKey = new Map<string, ReasoningCategory>()
    for (const reco of activeRecommendations) {
      for (const cat of reco.reasoning) {
        const existing = byKey.get(cat.key)
        // Prefix each reason summary with the bullet label so context isn't lost
        const prefixedReasons = cat.reasons.map((r) => ({
          ...r,
          summary: `${reco.label}: ${r.summary}`,
        }))
        if (existing) {
          existing.reasons = [...existing.reasons, ...prefixedReasons]
        } else {
          byKey.set(cat.key, { ...cat, reasons: prefixedReasons })
        }
      }
    }
    return Array.from(byKey.values())
  }, [hasPimData, activeRecommendations])

  // Deduplicated alt keywords from all active bullet recommendations (by keyword id)
  const mergedBulletAltKeywords = useMemo<AltKeyword[]>(() => {
    const seen = new Set<string>()
    const result: AltKeyword[] = []
    for (const reco of activeRecommendations) {
      for (const kw of reco.altKeywords ?? []) {
        if (!seen.has(kw.id)) { seen.add(kw.id); result.push(kw) }
      }
    }
    return result
  }, [activeRecommendations])

  // No PIM to compare against — "vs. PIM" falls back to "vs. PDP"; "Text" is still allowed.
  const effectiveRecoCompareTarget: FieldCompareTarget =
    !hasPimData && recoCompareTarget === "pim" ? "pdp" : recoCompareTarget

  const matchPercent = useMemo(
    () => (hasPimData ? titleMatchPercent(pimBullets.join("\n"), pdpBullets.join("\n")) : 0),
    [hasPimData, pimBullets, pdpBullets],
  )

  const displayLists = useMemo(
    () => buildDisplayBulletLists(pimBullets, pdpBullets, recommendations, getFieldPublishBatch),
    [pimBullets, pdpBullets, recommendations, getFieldPublishBatch],
  )

  const hasPendingRecommendations = useMemo(
    () => activeRecommendations.some((reco) => reco.status === "pending"),
    [activeRecommendations],
  )

  const compareKind: "pim" | "pdp" = effectiveRecoCompareTarget === "pim" ? "pim" : "pdp"
  const isTextView = effectiveRecoCompareTarget === "final"
  const showSectionCompareTabs = hasPendingRecommendations

  // PIM+PDP: build combined item array for the new single-box view
  const combinedBulletItems = useMemo<CombinedBulletItem[]>(
    () =>
      activeRecommendations.map((reco) => {
        const { pimBaseline, pdpBaseline } = getBulletBaselines(
          reco, pimBullets, pdpBullets, getFieldPublishBatch,
        )
        return { reco, pimBaseline, pdpBaseline, originalText: originals[reco.id] ?? reco.recommendedText }
      }),
    [activeRecommendations, pimBullets, pdpBullets, originals, getFieldPublishBatch],
  )

  // When no PIM data: all bullets rendered as one combined list in the left column
  const noPimBulletsCell =
    !hasPimData && activeRecommendations.length > 0 ? (
      <NoPimBulletsCombinedView
        activeRecommendations={activeRecommendations}
        recommendations={recommendations}
        originals={originals}
        compareTarget={effectiveRecoCompareTarget}
        pdpBullets={pdpBullets}
        onAcceptAll={onAcceptAll}
        onRejectAll={onRejectAll}
        onResetAll={onResetAll}
        hideActions={hideActions}
      />
    ) : null

  const compareBullets = compareKind === "pim" ? displayLists.pim : displayLists.pdp
  const compareBulletsOther =
    compareKind === "pim"
      ? displayLists.pim.map((_, index) => displayLists.pdp[index] ?? "")
      : displayLists.pim

  function pendingBulletForKeywords() {
    return activeRecommendations.find((reco) => reco.status === "pending")
  }

  function handleUseKeyword(kw: AltKeyword) {
    const reco = pendingBulletForKeywords()
    if (!reco) return
    const cur = reco.recommendedText
    const newText = kw.replacesWord
      ? cur.replace(new RegExp(kw.replacesWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), kw.keyword)
      : cur + `, ${kw.keyword}`
    onRecommendationTextChange(reco.id, newText)
    if (!kw.replacesWord) {
      setAppliedSuffixes((prev) => new Map(prev).set(kw.id, `, ${kw.keyword}`))
    }
    setUsedKeywordIds((prev) => new Set(prev).add(kw.id))
  }

  function handleRemoveKeyword(kw: AltKeyword) {
    const reco = pendingBulletForKeywords()
    if (!reco) return
    const suffix = appliedSuffixes.get(kw.id)
    if (suffix) {
      onRecommendationTextChange(reco.id, reco.recommendedText.replace(suffix, ""))
      setAppliedSuffixes((prev) => {
        const m = new Map(prev)
        m.delete(kw.id)
        return m
      })
    }
    setUsedKeywordIds((prev) => {
      const s = new Set(prev)
      s.delete(kw.id)
      return s
    })
  }

  const groupedActiveReasoning = useMemo(
    () => buildGroupedBulletReasoning(activeRecommendations),
    [activeRecommendations],
  )

  const hasExpandedBulletPanels =
    hasPimData &&
    combinedBulletItems.length > 0 &&
    (showReasoning || showAltKeywords)

  const pimRecoHeader = (
    <ContentRecommendationHeader
      labels={{
        pending: "AI Recommended Bullets",
        accepted: "AI Recommended Bullets",
        rejected: "AI Recommended Bullets",
        queued: "Changes queued",
      }}
      status={hasPendingRecommendations ? "pending" : "accepted"}
      compareTarget={effectiveRecoCompareTarget}
      onCompareTargetChange={setRecoCompareTarget}
      isOpen
      collapsible={false}
      onToggleOpen={() => undefined}
      hideCompareTabs
    />
  )

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-field">
      <header className="flex flex-wrap items-center gap-2 pl-1 py-2">
        <ListChecks className="size-4 shrink-0 text-slate-400" aria-hidden />
        <span className="text-sm font-semibold text-slate-900">Bullet Points</span>
        {hasPimData && activeRecommendations.length > 0 ? (
          <MatchPercentBadge percent={matchPercent} />
        ) : null}
        <div className="ml-auto flex items-center gap-2">
          {showSectionCompareTabs ? (
            <CompareTabs
              value={effectiveRecoCompareTarget}
              onChange={setRecoCompareTarget}
              exclude={hasPimData ? [] : ["pim"]}
            />
          ) : null}
          <SectionSelectToggle
            selected={isIncluded}
            onToggle={onToggleInclude ?? (() => {})}
          />
        </div>
      </header>

      <div className="flex w-full flex-col gap-3">
        {hasPimData && combinedBulletItems.length > 0 ? (
          <>
            <div className={isTextView ? "grid grid-cols-1 items-stretch gap-y-2" : "grid grid-cols-2 items-stretch gap-x-3 gap-y-2"}>
              <div className="flex min-h-[30px] items-center">{pimRecoHeader}</div>
              {isTextView ? null : (
              <BulletsCompareColumn
                part="label"
                kind={compareKind}
                bullets={compareBullets}
                compareBullets={compareBulletsOther}
              />
              )}
              <div className="flex min-h-18 h-full items-stretch self-stretch">
                <BulletsCombinedRecommendationView
                  items={combinedBulletItems}
                  hasPimData={hasPimData}
                  compareTarget={effectiveRecoCompareTarget}
                  altKeywords={mergedBulletAltKeywords}
                  hideActions={hideActions}
                  fillHeight
                  hideReasoningAltKeywords
                  onTextChange={onRecommendationTextChange}
                  onAccept={onAccept}
                  onReject={onReject}
                  onReset={onReset}
                  onUndoAccept={onUndoAccept}
                  onUndoReject={onUndoReject}
                />
              </div>
              {isTextView ? null : (
              <div className="flex min-h-18 h-full items-stretch self-stretch">
                <BulletsCompareColumn
                  part="field"
                  fillHeight
                  kind={compareKind}
                  bullets={compareBullets}
                  compareBullets={compareBulletsOther}
                />
              </div>
              )}
              {!hideActions ? (
                <div className="col-span-1">
                  <BulletBulkActions
                    recommendations={recommendations}
                    originals={originals}
                    onAcceptAll={onAcceptAll}
                    onRejectAll={onRejectAll}
                    onResetAll={onResetAll}
                  />
                </div>
              ) : null}
            </div>
            <BulletsReasoningAltKeywordsBlock
              bullets={activeRecommendations}
              altKeywords={mergedBulletAltKeywords}
              hideExpandedPanels
              showReasoning={showReasoning}
              showAltKeywords={showAltKeywords}
              onReasoningToggle={setShowReasoning}
              onAltKeywordsToggle={setShowAltKeywords}
              usedKeywordIds={usedKeywordIds}
              onUseKeyword={handleUseKeyword}
              onRemoveKeyword={handleRemoveKeyword}
            />
            {hasExpandedBulletPanels ? (
              <div className="flex w-full flex-col">
                {showReasoning && groupedActiveReasoning.length > 0 ? (
                  <div className="pb-2">
                    <GroupedReasoningPanel grouped={groupedActiveReasoning} />
                  </div>
                ) : null}
                {showAltKeywords && mergedBulletAltKeywords.length > 0 ? (
                  <div className="pb-2">
                    <AltKeywordsPanel
                      keywords={mergedBulletAltKeywords}
                      usedIds={usedKeywordIds}
                      onUse={handleUseKeyword}
                      onRemove={handleRemoveKeyword}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        ) : !hasPimData && activeRecommendations.length > 0 ? (
          <div className={isTextView ? "grid grid-cols-1 gap-y-2" : "grid grid-cols-2 gap-x-3 gap-y-2"}>
            <div className="flex min-h-[30px] items-center">
              <SourceChannelLabel
                icon={<AiRecommendationSparklesIcon />}
                label="AI Recommended Bullets"
              />
            </div>
            {isTextView ? null : (
            <BulletsCompareColumn
              part="label"
              kind="pdp"
              bullets={displayLists.pdp}
              compareBullets={[]}
            />
            )}
            <div className="min-h-0">{noPimBulletsCell}</div>
            {isTextView ? null : (
            <BulletsCompareColumn
              part="field"
              fillHeight
              kind="pdp"
              bullets={displayLists.pdp}
              compareBullets={[]}
            />
            )}
          </div>
        ) : null}

        {!hasPimData && (mergedBulletReasoning.length > 0 || mergedBulletAltKeywords.length > 0) ? (
          <ReasoningAltKeywordsBlock
            reasoning={mergedBulletReasoning}
            altKeywords={mergedBulletAltKeywords}
          />
        ) : null}
      </div>
    </section>
  )
}
