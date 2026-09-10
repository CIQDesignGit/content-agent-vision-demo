"use client"

export const dynamic = "force-static"

import { AppHeader } from "@/components/home/app-header"
import { LaunchpadTabs } from "@/components/landing/launchpad-tabs"
import { PageShell } from "@/components/layout/page-shell"

export default function ImpactPage() {
  return (
    <PageShell>
      <div className="flex min-h-screen flex-col bg-canvas">
        <AppHeader />
        <LaunchpadTabs />
        <main className="flex-1 bg-canvas">
          <div className="mx-auto max-w-[1200px] px-6 py-8">
            <div className="rounded-xl border border-border-default bg-surface px-6 py-20 text-center">
              <h1 className="type-title text-fg-primary">Impact</h1>
              <p className="mx-auto mt-2 max-w-md type-body text-fg-tertiary">
                Realized vs identified impact over time. Coming next.
              </p>
            </div>
          </div>
        </main>
      </div>
    </PageShell>
  )
}
