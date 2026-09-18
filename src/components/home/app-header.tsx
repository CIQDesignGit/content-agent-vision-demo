"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { AppModuleTabs } from "./app-module-tabs"
import { ProfileSwitcher } from "./profile-switcher"

const BRAND_NAME = "Ally"

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

function AllyWordmark({ className }: { className?: string }) {
  return (
    <span className={className ?? "truncate text-3xl font-bold tracking-tight text-brand-900"}>
      {BRAND_NAME}
    </span>
  )
}

export function AppHeader({ title = BRAND_NAME, backHref, breadcrumb }: AppHeaderProps) {
  const trail =
    breadcrumb ??
    (backHref
      ? [
          { label: BRAND_NAME, href: backHref },
          { label: title },
        ]
      : undefined)

  return (
    <header className="relative flex h-14 shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        {trail ? (
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1">
            {trail.map((item, i) => {
              const isLast = i === trail.length - 1
              const isBrand = item.label === BRAND_NAME
              return (
                <span key={`${item.label}-${i}`} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-slate-300" />}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className={
                        isBrand
                          ? "truncate text-2xl font-bold tracking-tight text-brand-900 transition-colors hover:text-brand-950"
                          : "truncate text-sm text-slate-400 transition-colors hover:text-slate-600"
                      }
                    >
                      {item.label}
                    </Link>
                  ) : isBrand && isLast ? (
                    <AllyWordmark />
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
          <AllyWordmark />
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
