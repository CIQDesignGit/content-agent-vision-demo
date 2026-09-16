"use client"

import { useMemo, useState } from "react"
import { AlignLeft } from "lucide-react"
import { SectionSelectToggle } from "./section-controls"
import { titleMatchPercent } from "@/lib/title-match"
import { resolvePublishedSourceDisplay } from "@/lib/published-source-display"
import {
  CompareTabs,
  ContentRecommendationBody,
  ContentRecommendationHeader,
} from "./content-recommendation-card"
import { AiRecommendationSparklesIcon, SourceChannelLabel } from "./bullet-source-cell"
import { fieldLabelContentStack } from "./field-layout"
import { MatchPercentBadge } from "./match-percent-badge"
import { ReasoningAltKeywordsBlock } from "./reasoning-alt-keywords-block"
import { ReasoningPanel } from "./reasoning-ui"
import { AltKeywordsPanel } from "./alt-keywords-panel"
import { TitleCompareColumn } from "./title-compare-column"
import type { FieldCompareTarget } from "./vertical-source-compare-grid"
import type { PublishBatch, TitleRecommendation, TitleStatus, SyncFootprint } from "./types"

interface DescriptionSectionProps {
  pimDescription: string
  pdpDescription: string
  status: TitleStatus
  recommendation: TitleRecommendation | null
  syncFootprint?: SyncFootprint
  hasUnpublishedEdits?: boolean
  activeBatch?: PublishBatch
  hasPimData?: boolean
  onRecommendationChange: (text: string) => void
  onAccept: () => void
  onReject: () => void
  onUndoAccept: () => void
  onUndoReject: () => void
  onPushUpdate?: () => void
  onAcceptNewDraft?: (text: string) => void
  isIncluded?: boolean
  onToggleInclude?: () => void
  hideActions?: boolean
}

export function DescriptionSection({
  pimDescription,
  pdpDescription,
  status,
  recommendation,
  syncFootprint,
  hasUnpublishedEdits,
  activeBatch,
  hasPimData = true,
  onRecommendationChange,
  onAccept,
  onReject,
  onUndoAccept,
  onUndoReject,
  onPushUpdate,
  onAcceptNewDraft,
  isIncluded = true,
  onToggleInclude,
  hideActions = false,
}: DescriptionSectionProps) {
  const [compareTarget, setCompareTarget] = useState<FieldCompareTarget>("pdp")
  const [draftCompareTarget, setDraftCompareTarget] = useState<FieldCompareTarget>("pdp")
  const [isOpen, setIsOpen] = useState(true)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [draftText, setDraftText] = useState("")
  const [draftOriginalText, setDraftOriginalText] = useState("")
  const [originalText] = useState(() => recommendation?.recommendedText ?? "")
  const [showReasoning, setShowReasoning] = useState(false)
  const [showAltKeywords, setShowAltKeywords] = useState(false)

  const effectiveCompareTarget: FieldCompareTarget =
    !hasPimData && compareTarget === "pim" ? "pdp" : compareTarget
  const compareKind: "pim" | "pdp" = effectiveCompareTarget === "pim" ? "pim" : "pdp"
  const isTextView = effectiveCompareTarget === "final"

  const publishedText = recommendation?.recommendedText
  const { pim: displayPim, pdp: displayPdp } = useMemo(
    () =>
      resolvePublishedSourceDisplay(
        pimDescription,
        pdpDescription,
        publishedText,
        syncFootprint,
        activeBatch,
      ),
    [pimDescription, pdpDescription, publishedText, syncFootprint, activeBatch],
  )

  const matchPercent = useMemo(
    () => (hasPimData ? titleMatchPercent(displayPim, displayPdp) : 0),
    [hasPimData, displayPim, displayPdp],
  )

  const showReco = Boolean(recommendation)
  const showRecoBody = showReco && isOpen
  const isFullySynced = status === "accepted" && syncFootprint === "synced"
  const showSectionCompareTabs = showReco && status === "pending" && isOpen && !isFullySynced
  const altKeywords = recommendation?.altKeywords ?? []
  const hasExpandedPanels =
    showRecoBody && recommendation && (showReasoning || showAltKeywords)

  const recommendationHeaderEl =
    showReco && !isFullySynced ? (
      <ContentRecommendationHeader
        labels={{
          pending: "AI Recommended Description",
          accepted: "Accepted",
          rejected: "Rejected",
          queued: "Changes queued",
        }}
        status={status}
        syncFootprint={syncFootprint}
        compareTarget={effectiveCompareTarget}
        onCompareTargetChange={setCompareTarget}
        isOpen={isOpen}
        onToggleOpen={() => setIsOpen((v) => !v)}
        hideCompareTabs
      />
    ) : null

  function handleAddNewDescription() {
    setDraftText(pimDescription)
    setDraftOriginalText(pimDescription)
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
                pending: "Add new description",
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
          editAriaLabel="Edit new description"
          editRows={5}
        />
      </div>
    ) : null

  const recoBodyProps = {
    recommendation: recommendation!,
    pimBaseline: hasPimData ? displayPim : "",
    pdpBaseline: displayPdp,
    originalText,
    compareTarget: effectiveCompareTarget,
    status,
    syncFootprint,
    hasUnpublishedEdits,
    activeBatch,
    fieldKey: "description" as const,
    onRecommendedTextChange: onRecommendationChange,
    onAccept,
    onReject,
    onReset: () => onRecommendationChange(originalText),
    onUndoAccept,
    onUndoReject,
    onPushUpdate,
    editAriaLabel: "Edit AI recommended description",
    editRows: 5,
    hideActions,
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-field">
      <header className="flex flex-wrap items-center gap-2 pl-1 py-2">
        <AlignLeft className="size-4 shrink-0 text-slate-400" aria-hidden />
        <span className="text-sm font-semibold text-slate-900">Description</span>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-500">
          Optional
        </span>
        {hasPimData && showReco ? <MatchPercentBadge percent={matchPercent} /> : null}
        {showReco && (
          <div className="ml-auto flex items-center gap-2">
            {showSectionCompareTabs ? (
              <CompareTabs
                value={effectiveCompareTarget}
                onChange={setCompareTarget}
                exclude={hasPimData ? [] : ["pim"]}
              />
            ) : null}
            <SectionSelectToggle
              selected={isIncluded}
              onToggle={onToggleInclude ?? (() => {})}
            />
          </div>
        )}
      </header>

      <div className="flex w-full flex-col gap-3">
        {showRecoBody && recommendation && !isFullySynced ? (
          <div className={isTextView ? "grid grid-cols-1 gap-y-2" : "grid grid-cols-2 gap-x-3 gap-y-2"}>
            <div className="flex min-h-[30px] items-center">
              {hasPimData ? (
                recommendationHeaderEl
              ) : (
                <SourceChannelLabel
                  icon={<AiRecommendationSparklesIcon />}
                  label="AI Recommended Description"
                />
              )}
            </div>
            {isTextView ? null : (
            <TitleCompareColumn
              part="label"
              kind={compareKind}
              value={compareKind === "pim" ? displayPim : displayPdp}
              compareValue={compareKind === "pim" ? displayPdp : displayPim}
            />
            )}
            <ContentRecommendationBody
              key={`${pimDescription}|${pdpDescription}|field`}
              {...recoBodyProps}
              compareGridPart="field"
              hideHeader
              hideReasoningAltKeywords
              hideExpandedPanels
              recommendationFieldFillHeight
              showReasoningPanel={showReasoning}
              showAltKeywordsPanel={showAltKeywords}
              onReasoningToggle={setShowReasoning}
              onAltKeywordsToggle={setShowAltKeywords}
              addNewLabel={isAddingNew ? undefined : "Add New Description"}
              onAddNew={isAddingNew ? undefined : handleAddNewDescription}
            />
            {isTextView ? null : (
            <TitleCompareColumn
              part="field"
              fillHeight
              kind={compareKind}
              value={compareKind === "pim" ? displayPim : displayPdp}
              compareValue={compareKind === "pim" ? displayPdp : displayPim}
            />
            )}
            <div className="col-span-1">
              <ContentRecommendationBody
                key={`${pimDescription}|${pdpDescription}|trailing`}
                {...recoBodyProps}
                compareGridPart="trailing"
                addNewLabel={isAddingNew ? undefined : "Add New Description"}
                onAddNew={isAddingNew ? undefined : handleAddNewDescription}
              />
            </div>
            {draftBlock ? <div className={isTextView ? "col-span-1" : "col-span-2"}>{draftBlock}</div> : null}
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
                        onClick={handleAddNewDescription}
                        className="self-start text-xs font-medium text-primary hover:underline"
                      >
                        Edit Description
                      </button>
                    </>
                  ) : null}
                  {draftBlock}
                </div>
              ) : showRecoBody && recommendation ? (
                <ContentRecommendationBody
                  key={`${pimDescription}|${pdpDescription}|fallback`}
                  header={recommendationHeaderEl ?? undefined}
                  {...recoBodyProps}
                  hideExpandedPanels
                  showReasoningPanel={showReasoning}
                  showAltKeywordsPanel={showAltKeywords}
                  onReasoningToggle={setShowReasoning}
                  onAltKeywordsToggle={setShowAltKeywords}
                />
              ) : recommendationHeaderEl}
            </div>
            {isTextView ? null : (
            <TitleCompareColumn
              kind={compareKind}
              value={compareKind === "pim" ? displayPim : displayPdp}
              compareValue={compareKind === "pim" ? displayPdp : displayPim}
            />
            )}
          </div>
        )}

        {recommendation && showRecoBody && !isFullySynced ? (
          <ReasoningAltKeywordsBlock
            reasoning={recommendation.reasoning}
            altKeywords={altKeywords}
            aeoPerformance={recommendation.aeoPerformance}
            hideExpandedPanels
            showReasoning={showReasoning}
            showAltKeywords={showAltKeywords}
            onReasoningToggle={setShowReasoning}
            onAltKeywordsToggle={setShowAltKeywords}
            usedKeywordIds={new Set()}
            onUseKeyword={() => {}}
            onRemoveKeyword={() => {}}
          />
        ) : null}

        {hasExpandedPanels && recommendation ? (
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
                  usedIds={new Set()}
                  onUse={() => {}}
                  onRemove={() => {}}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
