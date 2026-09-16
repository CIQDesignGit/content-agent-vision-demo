"use client"

export const dynamic = "force-static"

import { Suspense } from "react"
import { AppHeader } from "@/components/home/app-header"
import { LaunchpadTabs } from "@/components/landing/launchpad-tabs"
import { LaunchpadView } from "@/components/landing/launchpad-view"
import { PageShell } from "@/components/layout/page-shell"

export default function LandingPage() {
  return (
    <PageShell className="bg-slate-50">
      <div className="relative flex min-h-screen flex-col">
        {/* Ambient canvas — keeps every pane reading as a lit surface
            rather than white-on-white. Fixed so it never scrolls away. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-slate-50" />
          <div className="absolute inset-x-0 top-0 h-170 bg-[radial-gradient(90%_100%_at_50%_-25%,var(--color-brand-100),transparent_62%)]" />
          <div className="absolute -left-48 top-24 size-140 rounded-full bg-sky-200/40 blur-[130px]" />
          <div className="absolute -right-40 -top-16 size-130 rounded-full bg-violet-300/40 blur-[130px]" />
        </div>

        <AppHeader />
        <LaunchpadTabs />
        <main className="flex-1">
          <Suspense fallback={null}>
            <LaunchpadView />
          </Suspense>
        </main>
      </div>
    </PageShell>
  )
}
