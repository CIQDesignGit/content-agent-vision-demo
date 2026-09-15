"use client"

export const dynamic = "force-static"

import { AppHeader } from "@/components/home/app-header"
import { AiTrackingView } from "@/components/ai-tracking/ai-tracking-view"
import { LaunchpadTabs } from "@/components/landing/launchpad-tabs"
import { PageShell } from "@/components/layout/page-shell"

export default function AiTrackingPage() {
  return (
    <PageShell>
      <div className="flex min-h-screen flex-col bg-canvas">
        <AppHeader />
        <LaunchpadTabs />
        <main className="flex-1 bg-canvas">
          <AiTrackingView />
        </main>
      </div>
    </PageShell>
  )
}
