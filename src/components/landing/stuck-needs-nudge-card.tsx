"use client"

import Link from "next/link"
import { ArrowRight, Lock, Pencil, RefreshCw } from "lucide-react"
import { useProfile, withProfileParam } from "@/components/home/profile-context"
import { cn } from "@/lib/utils"
import { stuckBeforeLive } from "./analyst-tasks-data"
import { reviewSkuCtaClassName } from "./review-sku-cta"

const itemIcons = {
  syndication: RefreshCw,
  "brand-registry": Lock,
  drafts: Pencil,
} as const

/** Blocked publishes that need a nudge — same pane chrome as Things to do. */
export function StuckNeedsNudgeCard({ className }: { className?: string }) {
  const { profileId } = useProfile()
  const stuck = stuckBeforeLive
  const reviewHref = withProfileParam(stuck.href, profileId)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-white/80 ring-1 ring-slate-900/6 shadow-pane-lg backdrop-blur-md",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(70%_100%_at_12%_0%,var(--color-brand-50),transparent_70%)]"
      />

      <div className="relative flex flex-col gap-5 px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">
              {stuck.title}
            </h3>
            <span className="rounded-full bg-slate-100/80 px-2 py-0.5 text-[11px] font-medium tabular-nums text-slate-500">
              {stuck.tag}
            </span>
          </div>
          <Link href={reviewHref} className={reviewSkuCtaClassName}>
            Review {stuck.skuCount.toLocaleString()} SKUs
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stuck.items.map((item) => {
            const Icon = itemIcons[item.id as keyof typeof itemIcons] ?? Lock
            return (
              <li key={item.id} className="min-w-0">
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl",
                    "bg-white ring-1 ring-slate-200 transition-colors duration-200",
                    "hover:bg-slate-50",
                  )}
                >
                  <div className="relative flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200">
                        <Icon className="size-3.5" aria-hidden />
                      </span>
                      <span className="text-right">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          SKUs
                        </span>
                        <span className="mt-0.5 block font-sans text-2xl font-semibold tabular-nums tracking-[-0.03em] text-slate-950">
                          {item.count}
                        </span>
                      </span>
                    </div>
                    <p className="mt-3 text-base font-semibold leading-snug tracking-tight text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <p className="text-sm leading-relaxed text-slate-600">
          {stuck.note}
        </p>
      </div>
    </div>
  )
}
