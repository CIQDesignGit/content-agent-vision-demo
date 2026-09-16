"use client"

import { useState } from "react"
import { formatCompactUsd } from "./format"
import type { AidCycle } from "./types"

const money = formatCompactUsd

interface AsinCycleItemProps {
  cycle: AidCycle
  defaultOpen?: boolean
}

export function AsinCycleItem({ cycle, defaultOpen = false }: AsinCycleItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={`aid-cycle ${cycle.status === "active" ? "aid-active" : "aid-ended"} ${open ? "aid-open" : ""}`}
    >
      <div className="aid-cycle-head" onClick={() => setOpen((v) => !v)}>
        <span className="aid-cyc-chevron">›</span>
        <div className="aid-cyc-when">
          <div className="aid-cyc-label">{cycle.label}</div>
          <div className="aid-cyc-period">{cycle.periodLabel}</div>
        </div>
        <div className="aid-cyc-field">{cycle.field}</div>
        <div className="aid-cyc-method">
          <span className={`aid-method-tag aid-${cycle.method}`}>
            {cycle.method === "model" ? "MODEL" : cycle.method === "resumed" ? "RESUMED" : "A/B"}
          </span>
        </div>
        <div className="aid-cyc-verdict">
          <span className={`aid-verdict-pill aid-${cycle.verdictTone}`}>{cycle.verdictLabel}</span>
        </div>
        <div className={`aid-cyc-rate aid-${cycle.rateTone}`}>{cycle.rateLabel}</div>
        <div className="aid-cyc-money">
          <div className="aid-lifetime">{money(cycle.lifetimeCents)}</div>
          <div className="aid-inperiod">{cycle.inPeriodLabel}</div>
        </div>
        <div className="aid-cyc-status">
          {cycle.status === "active" ? (
            <span className="aid-active-pill">Active</span>
          ) : (
            <span className="aid-ended-pill">Ended</span>
          )}
        </div>
      </div>

      <div className="aid-cycle-body" onClick={(e) => e.stopPropagation()}>
        {cycle.ab ? (
          <div className="aid-cb-grid">
            <div className="aid-cb-block">
              <h5>Amazon&apos;s result</h5>
              <table className="aid-amz-table">
                <thead>
                  <tr>
                    <th>Arm</th>
                    <th>Visitors</th>
                    <th>Conv. rate</th>
                    <th>Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Original</td>
                    <td>{cycle.ab.originalVisitors.toLocaleString("en-US")}</td>
                    <td>{cycle.ab.originalRate.toFixed(2)}%</td>
                    <td>{cycle.ab.originalUnits.toLocaleString("en-US")}</td>
                  </tr>
                  <tr className="aid-winner">
                    <td>Challenger</td>
                    <td>{cycle.ab.challengerVisitors.toLocaleString("en-US")}</td>
                    <td>{cycle.ab.challengerRate.toFixed(2)}%</td>
                    <td>{cycle.ab.challengerUnits.toLocaleString("en-US")}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 12 }}>
                <div className="aid-kv">
                  <span className="aid-k">Evidence strength</span>
                  <span className={`aid-conf-badge aid-${cycle.ab.confidenceTone}`}>
                    {cycle.ab.confidenceTone === "strong" ? "Strong" : cycle.ab.confidenceTone === "mild" ? "Mild" : "Weak"} ·{" "}
                    {cycle.ab.confidencePct}%
                  </span>
                </div>
                <div className="aid-kv">
                  <span className="aid-k">Test ran</span>
                  <span className="aid-v">{cycle.ab.testWindowLabel}</span>
                </div>
                <div className="aid-kv">
                  <span className="aid-k">Published &amp; confirmed live</span>
                  <span className="aid-v">{cycle.ab.publishedOnLabel}</span>
                </div>
              </div>
            </div>
            <div className="aid-cb-block">
              <h5>Value from this cycle</h5>
              <div className="aid-kv">
                <span className="aid-k">Claim rate applied</span>
                <span className="aid-v">{cycle.ab.claimRateLabel}</span>
              </div>
              <div className="aid-kv">
                <span className="aid-k">Active for</span>
                <span className="aid-v">{cycle.ab.activeForLabel}</span>
              </div>
              <div className="aid-kv">
                <span className="aid-k">Incremental sales</span>
                <span className="aid-v" style={{ color: "var(--aid-good)" }}>
                  {cycle.ab.incrementalSalesLabel}
                </span>
              </div>
              <div className="aid-kv">
                <span className="aid-k">Incremental units</span>
                <span className="aid-v">{cycle.ab.incrementalUnits.toLocaleString("en-US")}</span>
              </div>
              {cycle.ab.footnote.variant === "method" ? (
                <div className="aid-method-line aid-ab">
                  <span>ⓘ</span>
                  <div>{cycle.ab.footnote.text}</div>
                </div>
              ) : (
                <div className="aid-zero-note">{cycle.ab.footnote.text}</div>
              )}
            </div>
          </div>
        ) : null}

        {cycle.model ? (
          <>
            <div className="aid-method-line aid-model" style={{ marginTop: 16 }}>
              <span>ⓘ</span>
              <div>{cycle.model.methodLineText}</div>
            </div>

            <div className="aid-ctx" style={{ marginTop: 16 }}>
              {cycle.model.contextStats.map((stat) => (
                <div className="aid-ctx-item" key={stat.label}>
                  <div className="aid-cl">{stat.label}</div>
                  <div className={`aid-cv ${stat.tone ? `aid-${stat.tone}` : ""}`}>{stat.value}</div>
                  <div className="aid-cs">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="aid-cb-grid" style={{ marginTop: 0 }}>
              <div className="aid-cb-block">
                <h5>The calculation</h5>
                {cycle.model.calcRows.map((row) => (
                  <div className={`aid-calc-row ${row.variant ? `aid-${row.variant}` : ""}`} key={row.key}>
                    <span className="aid-k">
                      {row.operator ? <span className="aid-op">{row.operator}</span> : null}
                      {row.label}
                    </span>
                    <span className="aid-v">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="aid-cb-block">
                <h5>Confidence in this read</h5>
                <div className="aid-kv">
                  <span className="aid-k">Confidence score</span>
                  <span className="aid-conf-badge aid-strong">Strong · {cycle.model.confidencePct}%</span>
                </div>
                <div className="aid-kv">
                  <span className="aid-k">Sustained across post window?</span>
                  <span className="aid-v">{cycle.model.sustainedLabel}</span>
                </div>
                <div className="aid-kv">
                  <span className="aid-k">Confound direction</span>
                  <span className="aid-v">{cycle.model.confoundLabel}</span>
                </div>
                <div className="aid-kv">
                  <span className="aid-k">Co-changes in window</span>
                  <span className="aid-v">{cycle.model.coChangesLabel}</span>
                </div>
                <div className="aid-read-box">
                  <div className="aid-rl">{cycle.model.whyNotHigherLabel}</div>
                  <div className="aid-rt">{cycle.model.whyNotHigherText}</div>
                </div>
              </div>
            </div>

            <div className="aid-whatnot">
              <b>What this does not measure.</b> {cycle.model.whatNotText}
            </div>

            <div className="aid-isolate-hint" style={{ marginTop: 14 }}>
              {cycle.model.windowsNoteText}
            </div>
          </>
        ) : null}

        {cycle.resumed ? (
          <div className="aid-cb-grid">
            <div className="aid-cb-block">
              <h5>Why this cycle exists</h5>
              <div className="aid-zero-note" style={{ marginTop: 0 }}>
                {cycle.resumed.whyText}
              </div>
              <div className="aid-kv" style={{ marginTop: 14 }}>
                <span className="aid-k">Rate inherited from</span>
                <span className="aid-v">{cycle.resumed.rateInheritedFromLabel}</span>
              </div>
              <div className="aid-kv">
                <span className="aid-k">Evidence behind the rate</span>
                <span className="aid-v">{cycle.resumed.evidenceRefLabel}</span>
              </div>
            </div>
            <div className="aid-cb-block">
              <h5>Value from this cycle</h5>
              <div className="aid-kv">
                <span className="aid-k">Claim rate applied</span>
                <span className="aid-v">{cycle.resumed.claimRateLabel}</span>
              </div>
              <div className="aid-kv">
                <span className="aid-k">Active for</span>
                <span className="aid-v">{cycle.resumed.activeForLabel}</span>
              </div>
              <div className="aid-kv">
                <span className="aid-k">Incremental sales</span>
                <span className="aid-v" style={{ color: "var(--aid-good)" }}>
                  {cycle.resumed.incrementalSalesLabel}
                </span>
              </div>
              <div className="aid-kv">
                <span className="aid-k">Incremental units</span>
                <span className="aid-v">{cycle.resumed.incrementalUnits.toLocaleString("en-US")}</span>
              </div>
              <div className="aid-method-line aid-resumed">
                <span>ⓘ</span>
                <div>{cycle.resumed.methodLineText}</div>
              </div>
            </div>
          </div>
        ) : null}

        {cycle.diff ? (
          <div className="aid-cb-block" style={{ marginTop: 20 }}>
            <h5>What changed in this cycle</h5>
            <div className="aid-diff-grid">
              <div className="aid-diff-col">
                <h6>
                  Incumbent <span className="aid-chain-note">— {cycle.diff.incumbentNote}</span>
                </h6>
                {cycle.diff.lines.map((line, idx) => (
                  <div className="aid-bullet" key={idx}>
                    {line.incumbent}
                  </div>
                ))}
              </div>
              <div className="aid-diff-col">
                <h6>
                  Challenger <span className="aid-chain-note">— {cycle.diff.challengerNote}</span>
                </h6>
                {cycle.diff.lines.map((line, idx) => (
                  <div className="aid-bullet" key={idx}>
                    {line.challenger.map((segment, segIdx) =>
                      segment.ins ? (
                        <ins key={segIdx}>{segment.text}</ins>
                      ) : (
                        <span key={segIdx}>{segment.text}</span>
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : cycle.noDiffNote ? (
          <div className="aid-zero-note" style={{ marginTop: 20 }}>
            {cycle.noDiffNote}
          </div>
        ) : null}
      </div>
    </div>
  )
}
