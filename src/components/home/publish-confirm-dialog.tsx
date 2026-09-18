"use client"

import { useState } from "react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { PublishSummary } from "@/lib/publish-changes"

interface PublishConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  summary: PublishSummary
  onConfirm: () => void
  hasActiveBatch: boolean
}

export function PublishConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: PublishConfirmDialogProps) {
  const [skipNext, setSkipNext] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0 shadow-xl ring-1 ring-slate-200 sm:max-w-xl"
        overlayClassName="bg-slate-900/25 supports-backdrop-filter:backdrop-blur-sm"
      >
        <DialogClose
          render={
            <button
              type="button"
              aria-label="Close"
              className="absolute top-3 right-3 grid size-7 place-items-center text-slate-400 transition-colors hover:text-slate-700"
            />
          }
        >
          <X className="size-4" aria-hidden />
        </DialogClose>

        <DialogHeader className="gap-2 p-6 pr-12">
          <DialogTitle className="text-base font-semibold leading-snug text-slate-900">
            You are about to publish changes. Do you wish to proceed?
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-slate-500">
            Content changes will be published to your product detail page via
            PIM. Please review your changes carefully.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <Checkbox
              id="skip-publish-confirm"
              checked={skipNext}
              onCheckedChange={(v) => setSkipNext(!!v)}
            />
            <span className="text-sm text-slate-600">
              Don&apos;t show this message again
            </span>
          </label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-brand-800 text-white hover:bg-brand-900 focus-visible:outline-brand-800"
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
