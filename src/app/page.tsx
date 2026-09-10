"use client"

export const dynamic = "force-static"

import { AppHeader } from "@/components/home/app-header"
import { LaunchpadTabs } from "@/components/landing/launchpad-tabs"
import { LaunchpadView } from "@/components/landing/launchpad-view"
import { PageShell } from "@/components/layout/page-shell"

export default function LandingPage() {
  return (
    <PageShell>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <AppHeader />
        <LaunchpadTabs className="bg-surface" />
        <main className="flex-1 bg-slate-50">
          <LaunchpadView />
        </main>
      </div>
    </PageShell>
  )
}
