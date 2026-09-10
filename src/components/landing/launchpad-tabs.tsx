"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@ciq-dev/ciq-design-system"

export const LAUNCHPAD_TABS = [
  { id: "glance", label: "At a Glance", href: "/" },
  { id: "review", label: "Review", href: "/workbench" },
  { id: "impact", label: "Impact", href: "/impact" },
  { id: "settings", label: "Settings", href: "/settings" },
] as const

export type LaunchpadTabId = (typeof LAUNCHPAD_TABS)[number]["id"]

function tabIdFromPath(pathname: string): LaunchpadTabId | null {
  if (pathname === "/") return "glance"
  if (pathname.startsWith("/workbench")) return "review"
  if (pathname.startsWith("/impact")) return "impact"
  if (pathname.startsWith("/settings")) return "settings"
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
              if (pathname !== item.href) router.push(item.href)
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
    </nav>
  )
}
