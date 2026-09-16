"use client"

import { Suspense } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@ciq-dev/ciq-design-system"
import { DateRangePicker } from "./date-range-picker"

export const LAUNCHPAD_TABS = [
  { id: "glance", label: "Overview", href: "/" },
  { id: "ai-tracking", label: "AI Tracking", href: "/ai-tracking" },
  { id: "review", label: "Review SKUs", href: "/workbench" },
  { id: "impact", label: "AI Impact", href: "/impact" },
] as const

export type LaunchpadTabId = (typeof LAUNCHPAD_TABS)[number]["id"]

function tabIdFromPath(pathname: string): LaunchpadTabId | null {
  if (pathname === "/") return "glance"
  if (pathname.startsWith("/ai-tracking")) return "ai-tracking"
  if (pathname.startsWith("/workbench")) return "review"
  if (pathname.startsWith("/impact")) return "impact"
  return null
}

interface LaunchpadTabsProps {
  /** Optional horizontal padding override (e.g. workbench full-bleed). */
  className?: string
}

export function LaunchpadTabs({ className }: LaunchpadTabsProps) {
  const pathname = usePathname()
  const router = useRouter()
  const active = tabIdFromPath(pathname)

  function openTab(href: string) {
    const range = new URLSearchParams(window.location.search).get("range")
    const params = new URLSearchParams()
    if (range) params.set("range", range)
    const query = params.toString()
    router.push(query ? `${href}?${query}` : href)
  }

  return (
    <nav
      aria-label="Launchpad sections"
      className={cn("flex shrink-0 items-center px-6 py-1.5", className)}
    >
      <div className="relative inline-flex items-center rounded-lg bg-slate-100 p-1">
        {LAUNCHPAD_TABS.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                if (pathname !== item.href) openTab(item.href)
              }}
              className={cn(
                "relative rounded-lg px-3.5 py-1 text-sm font-medium transition-colors",
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-800",
              )}
            >
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-slate-900/10"
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </button>
          )
        })}
      </div>
      {pathname === "/" ? (
        <Suspense fallback={null}>
          <DateRangePicker className="ml-auto" />
        </Suspense>
      ) : null}
    </nav>
  )
}
