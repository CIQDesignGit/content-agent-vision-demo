"use client"

export const dynamic = "force-static"

import { AppHeader } from "@/components/home/app-header"
import { LaunchpadTabs } from "@/components/landing/launchpad-tabs"
import { LaunchpadView } from "@/components/landing/launchpad-view"
import { PageShell } from "@/components/layout/page-shell"

export default function LandingPage() {
  return (
    <PageShell>
      <div className="flex min-h-screen flex-col bg-canvas">
        <AppHeader />
        <LaunchpadTabs />
        <main className="flex-1 bg-canvas">
          <LaunchpadView />
        </main>
      </div>
    </PageShell>
  )
}
