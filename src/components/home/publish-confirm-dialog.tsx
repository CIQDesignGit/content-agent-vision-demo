"use client"

import { useMemo, useState } from "react"
import { AlertCircle, ClockArrowUp, Info, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  formatPublishFieldList,
  groupPublishableLabels,
  type PublishSummary,
} from "@/lib/publish-changes"

interface PublishConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  summary: PublishSummary
  onConfirm: () => void
  hasActiveBatch: boolean
}

function CaveatRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>
      <p className="text-xs leading-relaxed text-slate-500">{children}</p>
    </div>
  )
}

export function PublishConfirmDialog({
  open,
  onOpenChange,
  summary,
  onConfirm,
  hasActiveBatch,
}: PublishConfirmDialogProps) {
  const [skipNext, setSkipNext] = useState(false)
  const fieldLabels = useMemo(
    () => groupPublishableLabels(summary.publishable),
    [summary.publishable],
  )
  const fieldList = formatPublishFieldList(fieldLabels)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden p-0 shadow-xl ring-1 ring-slate-200 sm:max-w-md"
        overlayClassName="bg-slate-900/25 supports-backdrop-filter:backdrop-blur-sm"
      >
        <DialogHeader className="gap-3 border-b border-slate-200 px-5 pt-5 pb-4">
          <div className="flex items-start gap-3 pr-6">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Send className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 space-y-1">
              <DialogTitle className="text-base font-semibold text-slate-900">
                Publish to PIM &amp; PDP
              </DialogTitle>
              <p className="text-sm leading-relaxed text-slate-500">
                {fieldList} will be sent to PIM and the retailer PDP.
              </p>
            </div>
          </div>
          <DialogDescription className="sr-only">
            Publishing {fieldList}.
            {summary.pendingReviewCount > 0
              ? ` ${summary.pendingReviewCount} suggestions awaiting review will not be published.`
              : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-5 pt-4 pb-4">
          <div className="flex items-center gap-2.5">
            <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-400">
              Publishing:
            </p>
            <div className="flex min-w-0 flex-nowrap gap-1.5 overflow-hidden">
              {fieldLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex shrink-0 items-center rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-sm font-medium whitespace-nowrap text-brand-800"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {summary.pendingReviewCount > 0 && (
              <CaveatRow icon={<AlertCircle className="size-3.5" />}>
                <span className="font-medium text-slate-600">
                  {summary.pendingReviewCount}{" "}
                  {summary.pendingReviewCount === 1 ? "suggestion" : "suggestions"} not included.
                </span>{" "}
                Items awaiting review will stay in the workspace.
              </CaveatRow>
            )}
            {hasActiveBatch ? (
              <CaveatRow icon={<ClockArrowUp className="size-3.5" />}>
                <span className="font-medium text-slate-600">Queued as a follow-up.</span> A
                publish is already in progress — these changes will sync automatically once it
                completes.
              </CaveatRow>
            ) : (
              <CaveatRow icon={<Info className="size-3.5" />}>
                <span className="font-medium text-slate-600">PIM</span> updates within minutes.{" "}
                <span className="font-medium text-slate-600">PDP</span> verification may take
                several hours.
              </CaveatRow>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/80 px-5 py-3.5">
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <Checkbox
              id="skip-publish-confirm"
              checked={skipNext}
              onCheckedChange={(v) => setSkipNext(!!v)}
            />
            <span className="text-xs text-slate-500">Don&apos;t show this again</span>
          </label>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-brand-500 text-white hover:bg-brand-600"
              onClick={onConfirm}
            >
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
