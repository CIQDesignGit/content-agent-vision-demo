"use client"

export const dynamic = "force-static"

import { Suspense } from "react"
import { AppHeader } from "@/components/home/app-header"
import { ImpactView } from "@/components/impact/impact-view"
import { LaunchpadTabs } from "@/components/landing/launchpad-tabs"
import { PageShell } from "@/components/layout/page-shell"

function ImpactFallback() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 pb-6">
      <div className="h-40 animate-pulse rounded-2xl bg-slate-100" />
    </div>
  )
}

export default function ImpactPage() {
  return (
    <PageShell>
      <div className="flex min-h-screen flex-col bg-canvas">
        <AppHeader />
        <LaunchpadTabs />
        <main className="flex-1 bg-canvas">
          <Suspense fallback={<ImpactFallback />}>
            <ImpactView />
          </Suspense>
        </main>
      </div>
    </PageShell>
  )
}
