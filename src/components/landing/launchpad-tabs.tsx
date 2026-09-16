"use client"

import { Suspense, useLayoutEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@ciq-dev/ciq-design-system"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { DateRangePicker } from "./date-range-picker"

export const LAUNCHPAD_TABS = [
  { id: "glance", label: "Overview", href: "/" },
  { id: "ai-tracking", label: "AI Tracking", href: "/ai-tracking" },
  { id: "review", label: "Review SKUs", href: "/workbench" },
  { id: "impact", label: "AI Impact", href: "/impact" },
] as const

export type LaunchpadTabId = (typeof LAUNCHPAD_TABS)[number]["id"]

const LAST_PILL_KEY = "launchpad-tab-pill"

interface Pill {
  id: LaunchpadTabId
  x: number
  width: number
}

function tabIdFromPath(pathname: string): LaunchpadTabId | null {
  if (pathname === "/") return "glance"
  if (pathname.startsWith("/ai-tracking")) return "ai-tracking"
  if (pathname.startsWith("/workbench")) return "review"
  if (pathname.startsWith("/impact")) return "impact"
  return null
}

function readLastPill(): Pill | null {
  try {
    const raw = sessionStorage.getItem(LAST_PILL_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Pill
    return LAUNCHPAD_TABS.some((tab) => tab.id === parsed.id) ? parsed : null
  } catch {
    return null
  }
}

function writeLastPill(pill: Pill) {
  try {
    sessionStorage.setItem(LAST_PILL_KEY, JSON.stringify(pill))
  } catch {
    // Ignore private-mode storage failures.
  }
}

interface LaunchpadTabsProps {
  /** Optional horizontal padding override (e.g. workbench full-bleed). */
  className?: string
}

export function LaunchpadTabs({ className }: LaunchpadTabsProps) {
  const pathname = usePathname()
  const router = useRouter()
  const active = tabIdFromPath(pathname)
  const tabRefs = useRef<Partial<Record<LaunchpadTabId, HTMLButtonElement>>>({})
  const enteredFrom = useRef(readLastPill())
  const [pill, setPill] = useState<Pill | null>(enteredFrom.current)
  const slide =
    enteredFrom.current != null && enteredFrom.current.id !== active

  useLayoutEffect(() => {
    if (!active) return
    const current = tabRefs.current[active]
    if (!current) return
    const next = {
      id: active,
      x: current.offsetLeft,
      width: current.offsetWidth,
    }
    writeLastPill(next)
    // Paint the previous tab first so the pill can travel. A layout-effect
    // update lands before that frame and the highlight snaps.
    if (!slide) {
      setPill(next)
      return
    }
    const frame = requestAnimationFrame(() => setPill(next))
    return () => cancelAnimationFrame(frame)
  }, [active, slide])

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
      <div className="relative inline-flex items-center rounded-lg bg-slate-100/80 p-1">
        <motion.span
          aria-hidden
          className={cn(
            "absolute top-1 bottom-1 left-0 rounded-lg bg-white shadow-sm ring-1 ring-slate-200/80",
            !pill && "opacity-0",
          )}
          initial={
            slide && enteredFrom.current
              ? { x: enteredFrom.current.x, width: enteredFrom.current.width }
              : false
          }
          animate={{ x: pill?.x ?? 0, width: pill?.width ?? 0 }}
          transition={
            slide
              ? { duration: DURATION.calm, ease: EASE_OUT }
              : { duration: 0 }
          }
        />
        {LAUNCHPAD_TABS.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[item.id] = node ?? undefined
              }}
              type="button"
              onClick={() => {
                if (pathname !== item.href) openTab(item.href)
              }}
              className={cn(
                "relative z-10 rounded-lg px-3.5 py-1 text-sm font-medium transition-colors",
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-800",
              )}
            >
              {item.label}
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
