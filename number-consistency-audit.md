# Number consistency audit

Audit of seeded demo figures as of Sep 16, 2026. Source of truth is `src/components/landing/data.ts`, plus Impact seeds in `src/components/impact/data.ts`.

This is a prototype. Overlapping SKUs across cards are allowed. A headline and the cards under it must still be reconcilable, and the same opportunity must not show two different totals.

## Rules

1. A stream headline, its insight copy, and **Review all N SKUs** must use the same SKU count and dollar total.
2. Card dollar values are a partition of the stream total. They must sum to the headline. SKU counts may overlap, so they do not have to sum to the headline.
3. An “also N of these” overlap cannot be larger than the other card’s SKU count.
4. A meter segment and a stream that name the same opportunity must match, or the UI must say the segment is a subset.
5. Forfeited / expired dollars must match everywhere that event appears.
6. A formula row must multiply out to the subtotal shown beside it.
7. Unused exports still count. Wiring them later would reintroduce a contradiction.

## What already ties

| Check | Result |
| --- | --- |
| Active status bar | Captured $800K + Seasonal $3.65M + PDP $360K = **$4.81M** identified. Expired $890K is excluded. |
| Annualized formula | $48.3M × 3.0% = $1.449M, shown as $1.45M. $112M × 3.0% = $3.36M. $1.45M + $3.36M = **$4.81M**. |
| Value realized split | $600K foundational + $200K seasonal = **$800K**. Bar split 75 / 25 matches. |
| Working days saved | 128 SKUs × 29 min = 61.87 hrs, shown as 61.9 hrs. 61.9 / 8 = **7.7 days**. |
| AI share of voice | 34% − 32.6% = **+1.4 pp**. |
| Black Friday identity | Up next, seasonal stream, and calendar event all say **384 SKUs · $1.24M · publish by Sep 15 · 5 days to act**. |
| Black Friday dimensions | $780K + $310K + $150K = **$1.24M**. |
| Seasonal card dollars | $420K + $380K + $210K + $140K + $90K = **$1.24M**. |
| Always-on card dollars | $980K + $820K + $310K + $240K + $150K = **$2.50M**. |
| Queued events in seasonal copy | Cyber Monday **$860K** and Holiday Gift Guide **$510K** match the calendar. |
| Cyber Monday | Dimensions $860K. 261 − 3 findings = 258 remaining SKUs. $860K − $138K findings = **$722K** remaining. |
| Holiday Gift Guide | Dimensions $510K. 147 − 3 = 144 remaining SKUs. $510K − $94K = **$416K** remaining. |
| Back to School dimensions | $390K + $160K + $90K = **$640K**. |

## Breaks

### 1. Retail-readiness cards no longer add up to the headline

The package-dimensions card was removed. The headline and insight were not.

| | Headline | Five cards |
| --- | --- | --- |
| SKUs | 342 | 104 + 71 + 42 + 27 + 10 = **254** |
| Dollars | $410K | $80K + $75K + $58K + $32K + $15K = **$260K** |

The missing $150K / 88 SKUs is the removed card. `remainingLabel` (“338 more SKUs, $389K blocked”) still assumes 342 SKUs and $410K minus four hidden table rows. Those rows are not on screen.

**Review all** uses the headline, so it says **Review all 342 SKUs** over a $260K card grid.

### 2. Always-on stream and the meter name the same work and disagree

| Surface | Always-on / PDP optimization |
| --- | --- |
| Status bar segment “PDP optimization” | **$360K** |
| Stream “Always on optimization” | **612 SKUs · $2.50M** |

Retail-readiness says **$410K** of queued PDP fixes are stuck behind attributes, and that this amount is not additive. $410K is already larger than the $360K PDP segment, so it cannot be a subset of that segment.

### 3. Seasonal status bar is not the open events

Open calendar events: $1.24M + $860K + $510K = **$2.61M**.

Status bar Seasonal is **$3.65M**. The gap is **$1.04M**, with no event or stream that accounts for it.

The seasonal stream itself is only Black Friday ($1.24M), which is correct if the other events stay queued. It does not explain the status bar.

### 4. Prime Day is three different dollars

| Surface | Amount | SKUs |
| --- | --- | --- |
| Calendar, forfeited | $890K | 210 |
| Status bar, Expired | $890K | — |
| `lostToInaction` (unused) | $890K | 210 |
| Value realized, “Identified but never published” | **$260K** | 210 |

Same event, same 210 SKUs, two dollar amounts. Value realized also dates it Jul 2026; the calendar date is Jul 12.

### 5. Overlap notes that cannot fit

These “also N” counts are larger than the card they point at.

| Card | Claims | Other card |
| --- | --- | --- |
| Missing top category keywords in bullets (248) | 186 also missing a key search term in the title | Title missing key search term has **168** |
| No answer-ready specs (196) | 142 also have thin bullets for comparison queries | Bullets don't answer comparison prompts has **124** |

### 6. Identical blocked cohort in two streams

Seasonal and Always-on both have a card **Blocked — attributes missing first** with **74 SKUs**. Seasonal prices it at $140K, Always-on at $150K. That reads as one cohort pasted twice, then valued separately, while each stream’s card dollars already sum to its headline.

### 7. Impact does not match captured opportunity

| Surface | Figure |
| --- | --- |
| Launchpad captured | $800K, 128 SKUs live |
| Impact hero, incremental sales lift | **$76,394** |
| Impact table rows | $80K + $62K + $48K + $35K + $28K + $19K = **$272K** |
| Comment in `src/components/impact/data.ts` | “period slice of launchpad captured (**$1.84M** YTD)” — stale. The meter is $800K. `formatMillions` still mentions $1.84M. |
| Time saved | Launchpad 61.9 hrs on 128 SKUs. Impact **132 hrs**. |

Lift rates also disagree: annualized pilot **+3.0%** (42 SKUs), value-pillar copy **2.1%**, Impact conversion lift **2.1%**.

### 8. Same 128 used for two stories

128 is both “SKUs live” / working-days-saved actions and the Back to School captured assortment. If those are not the same set, the number should differ. If they are, Back to School ($640K) and captured-to-date ($800K) need a sentence that says the extra $160K is not from that event.

### 9. Unused data that would break the meter if shown

`valuePillars` is exported and not rendered:

| Pillar | Unused value | Live counterpart |
| --- | --- | --- |
| Foundational lift | $1.1M | Annualized $1.45M |
| Seasonal lift | $2.31M | Annualized $3.36M, status bar $3.65M |
| AI driven sales | $1.4M | No meter segment |

## Date drift

Session date is Sep 16, 2026. Seasonal copy still says publish by **Sep 15** and **5 days to act**. The calendar marker for today sits before Sep 15. Treat this as frozen demo time, or move the deadline.

Impact’s range is Jan 1, 2025 – Sep 9, 2026. The contract window is Aug 2026 – Jul 2027. Value realized is Aug 2026 – Sep 2026, and also “accruing since Apr” over “5 mo”. Those periods do not describe one window.

## Suggested source of truth

Do not invent a fourth total. Pick the surface the user sees first and make the rest follow it.

| Opportunity | Keep | Retire or relabel |
| --- | --- | --- |
| Identified total | **$4.81M** on the meter | — |
| Captured | **$800K** | Impact hero and row sum, or label Impact as a sample, not the total |
| Seasonal open | Status bar **$3.65M**, or the three events at **$2.61M** — not both unlabeled | The other figure |
| Black Friday | **384 SKUs · $1.24M** | — |
| Always-on | Status bar **$360K**, or the stream **$2.50M** — not both as “PDP optimization” | The other figure |
| Retail-readiness | Either restore the 6th card so cards sum to **342 / $410K**, or change the headline, insight, remaining label, and Review all to **254 / $260K** | The unmatched one |
| Prime Day forfeited | **$890K · 210 SKUs** | The $260K unrealized line |
| Expired | **$890K**, same as Prime Day, unless a second forfeited event is added | — |

Card overlap notes should be rewritten after the SKU counts are locked, so no “also N” exceeds the other card.
