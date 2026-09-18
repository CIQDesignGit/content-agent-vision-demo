"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  BarChart3,
  Bell,
  ChevronRight,
  HelpCircle,
  Mail,
  Rocket,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfileSwitcher } from "./profile-switcher"

const PARENT_APP_HOME_HREF = "https://allybrain.web.app/#/"

function IconHeaderButton({
  badge,
  label,
  href,
  className,
  children,
}: {
  badge?: number | string
  label: string
  href?: string
  className?: string
  children: ReactNode
}) {
  const baseClass = cn("relative grid size-8 place-items-center rounded-md text-slate-600 hover:bg-slate-100", className)

  const inner = (
    <>
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-error-600 px-1 text-[10px] font-semibold text-white">
          {badge}
        </span>
      ) : null}
    </>
  )

  if (href) {
    return (
      <Link href={href} aria-label={label} title={label} className={baseClass}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" aria-label={label} title={label} className={baseClass}>
      {inner}
    </button>
  )
}

interface BreadcrumbItem {
  label: string
  /** When provided, the item is a clickable link. Omit for the current (last) page. */
  href?: string
}

interface AppHeaderProps {
  /** Simple page title. Ignored when `breadcrumb` is provided. */
  title?: string
  /** In-app parent path. Used as a breadcrumb link when `breadcrumb` is omitted. */
  backHref?: string
  /** Renders a breadcrumb trail instead of a plain title. Last item = current page (no link). */
  breadcrumb?: BreadcrumbItem[]
}

export function AppHeader({ title = "Content Agent", backHref, breadcrumb }: AppHeaderProps) {
  const trail =
    breadcrumb ??
    (backHref
      ? [
          { label: "Content Agent", href: backHref },
          { label: title },
        ]
      : undefined)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <a
          href={PARENT_APP_HOME_HREF}
          aria-label="Back to AllyBrain home"
          title="Back to AllyBrain home"
          className="grid size-8 place-items-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <ArrowLeft className="size-5" />
        </a>
        <span aria-hidden className="h-4 w-px bg-slate-200" />

        {trail ? (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1">
            {trail.map((item, i) => {
              const isLast = i === trail.length - 1
              return (
                <span key={item.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3.5 text-slate-300" />}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition-colors hover:text-slate-600"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-slate-900">{item.label}</span>
                  )}
                </span>
              )
            })}
          </nav>
        ) : (
          <span className="text-sm font-medium text-slate-900">{title}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <IconHeaderButton label="Brand Performance" href="/brand-performance">
          <BarChart3 className="size-4" />
        </IconHeaderButton>
        <IconHeaderButton
          label={backHref ? "Content Agent" : "Title Optimization"}
          href={backHref ? "/workbench" : "/title-optimization"}
          className="bg-brand-100"
        >
          <Rocket className="size-4 text-brand-500" />
        </IconHeaderButton>
        <IconHeaderButton label="Alerts" badge={6}>
          <Bell className="size-5" />
        </IconHeaderButton>
        <IconHeaderButton label="Help">
          <HelpCircle className="size-5" />
        </IconHeaderButton>
        <IconHeaderButton label="Share">
          <Share2 className="size-5" />
        </IconHeaderButton>
        <IconHeaderButton label="Inbox">
          <Mail className="size-5" />
        </IconHeaderButton>
        <ProfileSwitcher />
      </div>
    </header>
  )
}
