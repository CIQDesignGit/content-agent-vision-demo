"use client"

export const dynamic = "force-static"

import { AppHeader } from "@/components/home/app-header"
import { AiTrackingView } from "@/components/ai-tracking/ai-tracking-view"
import { LaunchpadTabs } from "@/components/landing/launchpad-tabs"
import { PageShell } from "@/components/layout/page-shell"

export default function AiTrackingPage() {
  return (
    <PageShell className="bg-slate-100">
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <LaunchpadTabs className="bg-white" />
        <main className="flex-1">
          <AiTrackingView />
        </main>
      </div>
    </PageShell>
  )
}
