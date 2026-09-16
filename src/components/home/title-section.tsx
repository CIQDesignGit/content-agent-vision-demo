"use client"

import { useMemo, useState } from "react"
import { Type } from "lucide-react"
import { SectionSelectToggle } from "./section-controls"
import { titleMatchPercent } from "@/lib/title-match"
import { resolvePublishedSourceDisplay } from "@/lib/published-source-display"
import type { FieldPublishQueueItem } from "@/lib/build-field-publish-queue"
import { fieldLabelContentStack } from "./field-layout"
import {
  ContentRecommendationBody,
  ContentRecommendationHeader,
} from "./content-recommendation-card"
import { MatchPercentBadge } from "./match-percent-badge"
import { ReasoningAltKeywordsBlock } from "./reasoning-alt-keywords-block"
import { ReasoningPanel } from "./reasoning-ui"
import { AltKeywordsPanel } from "./alt-keywords-panel"
import type { AltKeyword } from "./types"
import { PublishQueueList } from "./publish-queue-list"
import { TitleCompareColumn } from "./title-compare-column"
import {
  VerticalSourceCompareGrid,
  type FieldCompareTarget,
} from "./vertical-source-compare-grid"
import type {
  PublishBatch,
  TitleEditSource,
  TitleRecommendation,
  TitleStatus,
  SyncFootprint,
} from "./types"


interface ProductTitleSectionProps {
  pimTitle: string
  pdpTitle: string
  status: TitleStatus
  titleEditSource?: TitleEditSource
  recommendation: TitleRecommendation | null
  syncFootprint?: SyncFootprint
  hasUnpublishedEdits?: boolean
  activeBatch?: PublishBatch
  publishQueue?: FieldPublishQueueItem[]
  /** When false, no PIM catalog entry exists — recommendation goes into the PIM column. */
  hasPimData?: boolean
  onRecommendationChange: (text: string) => void
  onAccept: () => void
  onReject: () => void
  onUndoAccept: () => void
  onUndoReject: () => void
  onPushUpdate?: () => void
  onAcceptNewDraft?: (text: string) => void
  onUndoStagedNewTitle?: () => void
  /** When set, shows a character counter on the recommendation field. */
  charLimit?: number
  isIncluded?: boolean
  onToggleInclude?: () => void
  /** When true, hides Accept/Reject/Undo buttons (section toggle handles inclusion instead). */
  hideActions?: boolean
  /** When true, Reasoning panel starts expanded on mount (title-optimization mode). */
  defaultReasoningOpen?: boolean
}

export function ProductTitleSection({
  pimTitle,
  pdpTitle,
  status,
  titleEditSource = "ai",
  recommendation,
  syncFootprint,
  hasUnpublishedEdits,
  activeBatch,
  publishQueue = [],
  hasPimData = true,
  onRecommendationChange,
  onAccept,
  onReject,
  onUndoAccept,
  onUndoReject,
  onPushUpdate,
  onAcceptNewDraft,
  onUndoStagedNewTitle,
  charLimit,
  isIncluded = true,
  onToggleInclude,
  hideActions = false,
  defaultReasoningOpen = false,
}: ProductTitleSectionProps) {
  const [compareTarget, setCompareTarget] = useState<FieldCompareTarget>("pdp")
  const [draftCompareTarget, setDraftCompareTarget] = useState<FieldCompareTarget>("pdp")

  // "Changes queued" state — collapsed by default so users aren't overwhelmed
  const isPublishedLocked =
    status === "accepted" && (syncFootprint === "syncing" || syncFootprint === "queued")
  const [isOpen, setIsOpen] = useState(() => !isPublishedLocked)
  const [prevPublishedLocked, setPrevPublishedLocked] = useState(isPublishedLocked)
  // Keep open/collapsed in sync with the queued state across the full publish lifecycle
  if (isPublishedLocked !== prevPublishedLocked) {
    setPrevPublishedLocked(isPublishedLocked)
    setIsOpen(!isPublishedLocked)
  }

  const [isAddingNew, setIsAddingNew] = useState(false)
  const [draftText, setDraftText] = useState("")
  const [draftOriginalText, setDraftOriginalText] = useState("")
  const [originalText] = useState(() => recommendation?.recommendedText ?? "")

  // Expanded panels are lifted full-width below the 2-column compare grid.
  const [showReasoning, setShowReasoning] = useState(defaultReasoningOpen)
  const [showAltKeywords, setShowAltKeywords] = useState(false)
  const [usedKeywordIds, setUsedKeywordIds] = useState<Set<string>>(new Set())
  const [appliedSuffixes, setAppliedSuffixes] = useState<Map<string, string>>(new Map())

  function handleUseKeyword(kw: AltKeyword) {
    if (kw.replacesWord) {
      const escaped = kw.replacesWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const newText = (recommendation?.recommendedText ?? "").replace(new RegExp(escaped, "i"), kw.keyword)
      onRecommendationChange(newText)
    } else {
      const suffix = `, ${kw.keyword}`
      onRecommendationChange((recommendation?.recommendedText ?? "") + suffix)
      setAppliedSuffixes((prev) => new Map(prev).set(kw.id, suffix))
    }
    setUsedKeywordIds((prev) => new Set(prev).add(kw.id))
  }

  function handleRemoveKeyword(kw: AltKeyword) {
    const suffix = appliedSuffixes.get(kw.id)
    if (suffix) {
      onRecommendationChange((recommendation?.recommendedText ?? "").replace(suffix, ""))
      setAppliedSuffixes((prev) => { const m = new Map(prev); m.delete(kw.id); return m })
    }
    setUsedKeywordIds((prev) => { const s = new Set(prev); s.delete(kw.id); return s })
  }

  const publishedText = recommendation?.recommendedText
  const { pim: displayPim, pdp: displayPdp } = useMemo(
    () =>
      resolvePublishedSourceDisplay(
        pimTitle,
        pdpTitle,
        publishedText,
        syncFootprint,
        activeBatch,
      ),
    [pimTitle, pdpTitle, publishedText, syncFootprint, activeBatch],
  )

  const matchPercent = useMemo(
    () => (hasPimData ? titleMatchPercent(displayPim, displayPdp) : 0),
    [hasPimData, displayPim, displayPdp],
  )

  // When no PIM data exists, "vs. PIM" falls back to "vs. PDP"; "Text" is still allowed.
  const effectiveCompareTarget: FieldCompareTarget =
    !hasPimData && compareTarget === "pim" ? "pdp" : compareTarget
  const compareKind: "pim" | "pdp" = effectiveCompareTarget === "pim" ? "pim" : "pdp"
  const isTextView = effectiveCompareTarget === "final"

  const showReco = Boolean(recommendation)
  const hasPublishQueue = publishQueue.length > 0
  const showRecoBody = showReco && isOpen
  const hasStagedAwaitingPublish =
    hasPublishQueue &&
    status === "accepted" &&
    (syncFootprint === "none" || syncFootprint === undefined)
  const isFullySynced =
    status === "accepted" && syncFootprint === "synced" && !hasPublishQueue
  const isManualTitleEdit = titleEditSource === "manual"

  function handleAddNewTitle() {
    setDraftText(pimTitle)
    setDraftOriginalText(pimTitle)
    setDraftCompareTarget("pim")
    setIsAddingNew(true)
  }

  function handleAcceptDraft() {
    if (!draftText.trim() || !onAcceptNewDraft) return
    onAcceptNewDraft(draftText)
    setIsAddingNew(false)
  }

  const draftRecommendation = recommendation
    ? { ...recommendation, recommendedText: draftText }
    : null

  const draftBlock =
    isAddingNew && draftRecommendation ? (
      <div className="border-t border-slate-200 pt-3">
        <ContentRecommendationBody
          header={
            <ContentRecommendationHeader
              labels={{
                pending: "Add new title",
                accepted: "Accepted",
                rejected: "Rejected",
              }}
              status="pending"
              compareTarget={draftCompareTarget}
              onCompareTargetChange={setDraftCompareTarget}
              isOpen
              collapsible={false}
              onToggleOpen={() => undefined}
              isAiRecommendation={false}
            />
          }
          recommendation={draftRecommendation}
          pimBaseline={hasPimData ? displayPim : ""}
          pdpBaseline={displayPdp}
          originalText={draftOriginalText}
          compareTarget={hasPimData ? draftCompareTarget : "pdp"}
          status="pending"
          syncFootprint="none"
          onRecommendedTextChange={setDraftText}
          onAccept={handleAcceptDraft}
          onReject={() => setIsAddingNew(false)}
          onReset={() => setDraftText(draftOriginalText)}
          onUndoAccept={() => setIsAddingNew(false)}
          hideReasoning
          hideActions={hideActions}
          rejectLabel="Cancel"
          editAriaLabel="Edit new title"
        />
      </div>
    ) : null

  const stagedAcceptedBlock =
    hasStagedAwaitingPublish && hasPublishQueue && recommendation ? (
      <div className="border-t border-slate-200 pt-3">
        <ContentRecommendationBody
          header={
            <ContentRecommendationHeader
              labels={{
                pending: "New title",
                accepted: "Accepted Title",
                rejected: "Rejected",
              }}
              status="accepted"
              syncFootprint="none"
              compareTarget={compareTarget}
              onCompareTargetChange={setCompareTarget}
              isOpen
              collapsible={false}
              onToggleOpen={() => undefined}
              isAiRecommendation={false}
            />
          }
          recommendation={recommendation}
          pimBaseline={hasPimData ? displayPim : ""}
          pdpBaseline={displayPdp}
          originalText={recommendation.recommendedText}
          compareTarget={effectiveCompareTarget}
          status="accepted"
          syncFootprint="none"
          hasUnpublishedEdits={hasUnpublishedEdits}
          onRecommendedTextChange={onRecommendationChange}
          onAccept={onAccept}
          onReject={onReject}
          onReset={() => onRecommendationChange(recommendation.recommendedText)}
          onUndoAccept={onUndoAccept}
          hideReasoning
          hideActions={hideActions}
          editAriaLabel="Edit title"
        />
      </div>
    ) : null

  const recommendationHeaderEl =
    showReco && !isFullySynced ? (
      <ContentRecommendationHeader
        labels={{
          pending: isManualTitleEdit ? "Edit title" : "AI Recommended Title",
          accepted: "Accepted Title",
          rejected: "Rejected",
          queued: "Changes queued",
        }}
        status={status}
        syncFootprint={syncFootprint}
        compareTarget={effectiveCompareTarget}
        onCompareTargetChange={setCompareTarget}
        compareTabsExclude={hasPimData ? [] : ["pim"]}
        isOpen={isOpen}
        onToggleOpen={() => setIsOpen((v) => !v)}
        isAiRecommendation={!isManualTitleEdit}
      />
    ) : null

  // Don't show the grid header when stagedAcceptedBlock already renders it inside queueBody
  const showHeaderInGrid = Boolean(
    recommendationHeaderEl && (!showRecoBody || hasPublishQueue) && !hasStagedAwaitingPublish,
  )

  const queueBody = (
    <div className={fieldLabelContentStack("w-full")}>
      <PublishQueueList items={publishQueue} fieldKey="title" />
      {stagedAcceptedBlock}
    </div>
  )

  const altKeywords = recommendation?.altKeywords ?? []
  const hasExpandedPanels =
    showRecoBody &&
    !isPublishedLocked &&
    !isManualTitleEdit &&
    recommendation &&
    (showReasoning || showAltKeywords)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-field">
      <header className="flex flex-wrap items-center gap-2 pl-1 py-2">
        <Type className="size-4 shrink-0 text-slate-400" aria-hidden />
        <span className="text-sm font-semibold text-slate-900">Title</span>
        {hasPimData && showReco ? <MatchPercentBadge percent={matchPercent} /> : null}
        {showReco && (
          <div className="ml-auto flex items-center gap-2">
            <SectionSelectToggle
              selected={isIncluded}
              onToggle={onToggleInclude ?? (() => {})}
            />
          </div>
        )}
      </header>

      <div className="flex w-full flex-col gap-3">
        {showRecoBody && recommendation && !isFullySynced && !hasPublishQueue ? (
          <div className="flex w-full flex-col gap-3">
            <VerticalSourceCompareGrid
              pimValue={displayPim}
              pdpValue={displayPdp}
              compareTarget={effectiveCompareTarget}
              showPim={hasPimData}
              reverseColumns
              charLimit={charLimit}
              recommendationHeader={recommendationHeaderEl}
              recommendationBody={
                <ContentRecommendationBody
                  key={`${pimTitle}|${pdpTitle}|${hasPimData ? "pim" : "nopim"}|field`}
                  recommendation={recommendation}
                  pimBaseline={hasPimData ? displayPim : ""}
                  pdpBaseline={displayPdp}
                  originalText={originalText}
                  compareTarget={effectiveCompareTarget}
                  status={status}
                  syncFootprint={syncFootprint}
                  hasUnpublishedEdits={hasUnpublishedEdits}
                  activeBatch={activeBatch}
                  fieldKey="title"
                  onRecommendedTextChange={onRecommendationChange}
                  onAccept={onAccept}
                  onReject={onReject}
                  onReset={() => onRecommendationChange(originalText)}
                  onUndoAccept={onUndoAccept}
                  onUndoReject={onUndoReject}
                  onPushUpdate={onPushUpdate}
                  hideReasoning={isManualTitleEdit}
                  hideActions={hideActions}
                  addNewLabel={hasPimData && !isAddingNew ? "Add New Title" : undefined}
                  onAddNew={hasPimData && !isAddingNew ? handleAddNewTitle : undefined}
                  editAriaLabel={isManualTitleEdit ? "Edit title" : "Edit AI recommended title"}
                  charLimit={charLimit}
                  hideHeader
                  hideReasoningAltKeywords
                  hideExpandedPanels
                  showReasoningPanel={showReasoning}
                  showAltKeywordsPanel={showAltKeywords}
                  onReasoningToggle={setShowReasoning}
                  onAltKeywordsToggle={setShowAltKeywords}
                />
              }
            />
            {hasPimData ? draftBlock : null}
          </div>
        ) : (
          <div className={isTextView ? "grid grid-cols-1 items-start" : "grid grid-cols-2 items-start gap-x-3"}>
            <div className={fieldLabelContentStack("min-h-0 min-w-0")}>
              {isFullySynced ? (
                <div className={fieldLabelContentStack("w-full")}>
                  {!isAddingNew ? (
                    <>
                      <p className="text-xs text-slate-500">No AI recommendation</p>
                      <button
                        type="button"
                        onClick={handleAddNewTitle}
                        className="self-start text-sm font-medium text-primary hover:underline"
                      >
                        Edit Title
                      </button>
                    </>
                  ) : null}
                  {draftBlock}
                </div>
              ) : hasPublishQueue && showRecoBody ? (
                queueBody
              ) : showRecoBody && recommendation ? (
                <div className={fieldLabelContentStack("w-full")}>
                  <ContentRecommendationBody
                    key={`${pimTitle}|${pdpTitle}|fallback`}
                    header={recommendationHeaderEl ?? undefined}
                    recommendation={recommendation}
                    pimBaseline={hasPimData ? displayPim : ""}
                    pdpBaseline={displayPdp}
                    originalText={originalText}
                    compareTarget={effectiveCompareTarget}
                    status={status}
                    syncFootprint={syncFootprint}
                    hasUnpublishedEdits={hasUnpublishedEdits}
                    activeBatch={activeBatch}
                    fieldKey="title"
                    onRecommendedTextChange={onRecommendationChange}
                    onAccept={onAccept}
                    onReject={onReject}
                    onReset={() => onRecommendationChange(originalText)}
                    onUndoAccept={onUndoAccept}
                    onUndoReject={onUndoReject}
                    onPushUpdate={onPushUpdate}
                    hideReasoning={isManualTitleEdit}
                    hideActions={hideActions}
                    editAriaLabel={isManualTitleEdit ? "Edit title" : "Edit AI recommended title"}
                    charLimit={charLimit}
                    hideExpandedPanels
                    showReasoningPanel={showReasoning}
                    showAltKeywordsPanel={showAltKeywords}
                    onReasoningToggle={setShowReasoning}
                    onAltKeywordsToggle={setShowAltKeywords}
                  />
                </div>
              ) : showHeaderInGrid ? (
                recommendationHeaderEl
              ) : null}
            </div>
            {isTextView ? null : (
            <TitleCompareColumn
              kind={compareKind}
              value={compareKind === "pim" ? displayPim : displayPdp}
              compareValue={compareKind === "pim" ? displayPdp : displayPim}
              charLimit={charLimit}
            />
            )}
          </div>
        )}

        {!isManualTitleEdit && recommendation && showRecoBody && !isPublishedLocked ? (
          <ReasoningAltKeywordsBlock
            reasoning={recommendation.reasoning}
            altKeywords={altKeywords}
            aeoPerformance={recommendation.aeoPerformance}
            defaultReasoningOpen={defaultReasoningOpen}
            hideExpandedPanels
            showReasoning={showReasoning}
            showAltKeywords={showAltKeywords}
            onReasoningToggle={setShowReasoning}
            onAltKeywordsToggle={setShowAltKeywords}
            usedKeywordIds={usedKeywordIds}
            onUseKeyword={handleUseKeyword}
            onRemoveKeyword={handleRemoveKeyword}
          />
        ) : null}

        {hasExpandedPanels ? (
          <div className="flex w-full flex-col">
            {showReasoning && recommendation.reasoning.length > 0 ? (
              <div className="pb-2">
                <ReasoningPanel
                  reasoning={recommendation.reasoning}
                  aeoPerformance={recommendation.aeoPerformance}
                />
              </div>
            ) : null}
            {showAltKeywords && altKeywords.length > 0 ? (
              <div className="pb-2">
                <AltKeywordsPanel
                  keywords={altKeywords}
                  usedIds={usedKeywordIds}
                  onUse={handleUseKeyword}
                  onRemove={handleRemoveKeyword}
                />
              </div>
            ) : null}
          </div>
        ) : null}

      </div>

      {/* "Add New Title" stays visible even when the queued dropdown is collapsed */}
      {hasPublishQueue && showReco && !isFullySynced && (
        <>
          {!isAddingNew && !hasStagedAwaitingPublish ? (
            <button
              type="button"
              onClick={handleAddNewTitle}
              className="mt-1 self-start text-xs font-medium text-primary hover:underline"
            >
              Add New Title
            </button>
          ) : null}
          {draftBlock}
        </>
      )}
    </section>
  )
}
