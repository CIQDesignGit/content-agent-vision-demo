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
      className={cn(
        "flex shrink-0 items-center gap-6 border-b border-border-default bg-canvas px-6",
        className,
      )}
    >
      {LAUNCHPAD_TABS.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (pathname !== item.href) openTab(item.href)
            }}
            className={cn(
              "relative py-3 type-label transition-colors",
              isActive
                ? "text-fg-primary"
                : "text-fg-tertiary hover:text-fg-secondary",
            )}
          >
            {item.label}
            {isActive ? (
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-action-primary"
              />
            ) : null}
          </button>
        )
      })}
      <Suspense fallback={null}>
        <DateRangePicker />
      </Suspense>
    </nav>
  )
}
