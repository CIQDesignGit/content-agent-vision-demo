"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { AppModuleTabs } from "./app-module-tabs"
import { ProfileSwitcher } from "./profile-switcher"

const PARENT_APP_HOME_HREF = "https://allybrain.web.app/#/"

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
    <header className="relative flex h-14 shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        <a
          href={PARENT_APP_HOME_HREF}
          aria-label="Back to AllyBrain home"
          title="Back to AllyBrain home"
          className="grid size-8 shrink-0 place-items-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <ArrowLeft className="size-5" />
        </a>
        <span aria-hidden className="h-4 w-px shrink-0 bg-slate-200" />

        {trail ? (
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1">
            {trail.map((item, i) => {
              const isLast = i === trail.length - 1
              return (
                <span key={item.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-slate-300" />}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="truncate text-sm text-slate-400 transition-colors hover:text-slate-600"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="truncate text-sm font-semibold text-slate-900">
                      {item.label}
                    </span>
                  )}
                </span>
              )
            })}
          </nav>
        ) : (
          <span className="truncate text-sm font-semibold text-slate-900">{title}</span>
        )}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2">
        <div className="pointer-events-auto h-full">
          <AppModuleTabs />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ProfileSwitcher />
      </div>
    </header>
  )
}
