"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CalendarDays, ChevronRight, Download } from "lucide-react"
import { AsinChart } from "./asin-chart"
import { AsinCycleItem } from "./asin-cycle-item"
import { formatCompactUsd } from "./format"
import type { AidDetail, AidTextSegment } from "./types"

const money = formatCompactUsd

function TextLine({ segments }: { segments: AidTextSegment[] }) {
  return (
    <>
      {segments.map((segment, idx) => (segment.bold ? <b key={idx}>{segment.text}</b> : <span key={idx}>{segment.text}</span>))}
    </>
  )
}

interface AsinDetailViewProps {
  detail: AidDetail
}

export function AsinDetailView({ detail }: AsinDetailViewProps) {
  const router = useRouter()
  const currentCycle = detail.cycles[0]

  return (
    <div className="aid-root">
      <div className="aid-topbar">
        <div className="aid-topbar-lead">
          <button
            type="button"
            className="aid-back-btn"
            aria-label="Back to Impact"
            onClick={() => router.push("/impact")}
          >
            <ArrowLeft aria-hidden />
          </button>
          <div className="aid-crumbs">
            <span className="aid-link">Agents</span>
            <span className="aid-sep">›</span>
            <Link href="/impact" className="aid-link">
              Content Agent
            </Link>
            <span className="aid-sep">›</span>
            <Link href="/impact" className="aid-link">
              Impact
            </Link>
            <span className="aid-sep">›</span>
            <b>{detail.asin}</b>
          </div>
        </div>
        <div className="aid-head-right">
          <div className="aid-ctrl">
            <CalendarDays aria-hidden />
            {detail.dateRangeLabel} <span className="aid-ctrl-caret">▾</span>
          </div>
          <div className="aid-ctrl border-brand-800 bg-transparent text-brand-800">
            <Download aria-hidden />
            Export
          </div>
        </div>
      </div>

      <div className="aid-page">
        <div className="aid-asin-head">
          <div className="aid-asin-thumb">
            {detail.thumbnailUrl ? (
              <Image
                src={detail.thumbnailUrl}
                alt=""
                width={48}
                height={48}
                className="size-full rounded-lg object-cover"
              />
            ) : (
              detail.thumbnailEmoji
            )}
          </div>
          <div className="aid-asin-titles">
            <h1>{detail.productName}</h1>
            <div className="aid-asin-sub">
              <span>{detail.asin}</span>
              <span className="aid-sep">·</span>
              <span>
                {detail.category} · {detail.brand}
              </span>
              <span className="aid-sep">·</span>
              <span className="aid-state-pill">
                Current attribution{" "}
                <span className="aid-cur-tag">· {currentCycle.method === "ab" ? "A/B test" : "Modelled"}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="aid-heroes">
          <div className="aid-hero aid-primary">
            <div className="aid-h-label">Incremental sales · all time</div>
            <div className="aid-h-value">{money(detail.allTimeSalesCents)}</div>
            <div className="aid-h-sub">
              <TextLine segments={detail.inPeriodSalesLine} />
            </div>
            <div className="aid-run-rate">{detail.dailyRunRateLabel}</div>
            <div className="aid-h-foot">{detail.cyclesFootnote}</div>
          </div>

          <div className="aid-hero">
            <div className="aid-h-label">
              Current attribution <span className={`aid-method-chip aid-${currentCycle.method}`}>{currentCycle.method === "model" ? "Model" : "A/B"}</span>
            </div>
            <div className="aid-h-value">{detail.currentLiftLabel}</div>
            <div className="aid-h-sub">{detail.currentRateFromToLabel}</div>
            <div className="aid-h-foot">{detail.currentCycleSourceLabel}</div>
          </div>

          <div className="aid-hero">
            <div className="aid-h-label">AI visibility · Alexa AI</div>
            <div className="aid-h-value">{detail.aiVisibilityDeltaLabel}</div>
            <div className="aid-h-sub">
              <TextLine segments={detail.aiVisibilityRangeLine} />
            </div>
            <div className="aid-h-foot">{detail.aiVisibilityFootnote}</div>
          </div>

          <div className="aid-hero">
            <div className="aid-h-label">Incremental units · all time</div>
            <div className="aid-h-value">{detail.allTimeUnits.toLocaleString("en-US")}</div>
            <div className="aid-h-sub">
              <TextLine segments={detail.inPeriodUnitsLine} />
            </div>
            <div className="aid-h-foot">Unaffected by price or promotion movement</div>
          </div>
        </div>

        <AsinChart cycles={detail.cycles} />

        <div className="aid-section">
          <div className="aid-section-head">
            <div className="aid-section-title">
              Test &amp; measurement history — {detail.cycles.length} {detail.cycles.length === 1 ? "cycle" : "cycles"}
            </div>
            <div className="aid-section-note">Lifetime earned per cycle, regardless of method</div>
          </div>

          <div className="aid-cycles">
            <div className="aid-cyc-headrow" aria-hidden>
              <span className="aid-cyc-chevron">
                <ChevronRight aria-hidden />
              </span>
              <div className="aid-cyc-when">Cycle</div>
              <div className="aid-cyc-field">Changed</div>
              <div className="aid-cyc-method">Method</div>
              <div className="aid-cyc-verdict">Result</div>
              <div className="aid-cyc-rate">Rate</div>
              <div className="aid-cyc-money">Earned</div>
              <div className="aid-cyc-status">Status</div>
            </div>

            {detail.cycles.map((cycle) => (
              <AsinCycleItem key={cycle.key} cycle={cycle} defaultOpen={cycle.status === "active"} />
            ))}
          </div>
        </div>

        <div className="aid-next-strip">
          <span className="aid-next-dot" />
          <div>
            <b>Next cycle queued</b> — {detail.nextQueuedText}
          </div>
        </div>
      </div>
    </div>
  )
}
