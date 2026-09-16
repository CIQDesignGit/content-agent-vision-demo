import { DM_Sans } from "next/font/google"
import { AppHeader } from "@/components/home/app-header"
import { buildAsinDetail } from "@/components/impact/asin-detail/build-detail"
import { AsinDetailView } from "@/components/impact/asin-detail/asin-detail-view"
import {
  AURELLE_FLAGSHIP_ASIN,
  AURELLE_FLAGSHIP_DETAIL,
} from "@/components/impact/asin-detail/sample-aurelle-flagship"
import "@/components/impact/asin-detail/asin-detail.css"
import { impactSummary } from "@/components/impact/data"
import { LaunchpadTabs } from "@/components/landing/launchpad-tabs"
import { PageShell } from "@/components/layout/page-shell"
import type { AidDetail } from "@/components/impact/asin-detail/types"
import type { ImpactRow } from "@/components/impact/types"

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

function findRow(asin: string): ImpactRow {
  const match = impactSummary.rows.find((row) => row.asin === asin)
  if (match) return match

  return {
    id: `fallback-${asin}`,
    productName: `Product ${asin}`,
    asin,
    brand: "—",
    category: "Small appliances",
    thumbnailUrl: "https://placehold.co/64x64?text=SKU",
    impactLabel: "+$2,400",
    impactCents: 240_000,
    attributionApproach: "Modelled",
    whatChanged: "Title",
    changedOn: "Jun 1, 2026",
  }
}

function findDetail(asin: string): AidDetail {
  const decoded = decodeURIComponent(asin)
  if (decoded === AURELLE_FLAGSHIP_ASIN) return AURELLE_FLAGSHIP_DETAIL
  return buildAsinDetail(findRow(decoded))
}

export default async function AsinDetailPage({
  params,
}: {
  params: Promise<{ asin: string }>
}) {
  const { asin } = await params
  const detail = findDetail(asin)

  return (
    <PageShell>
      <div className="flex min-h-screen flex-col bg-canvas">
        <AppHeader />
        <LaunchpadTabs className="border-slate-200/70 bg-white/60 backdrop-blur-xl" />
        <main className={`min-w-0 flex-1 ${dmSans.className}`}>
          <AsinDetailView detail={detail} />
        </main>
      </div>
    </PageShell>
  )
}
