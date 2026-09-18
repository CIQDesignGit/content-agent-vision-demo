/** Upcoming seasonal moment — Content Agent SKU checklist for Halloween. */
export const seasonalChecklist = {
  momentId: "hw",
  eyebrow: "Up next · Seasonal",
  name: "Halloween",
  subtitle: "384 SKUs missing event titles, deal framing, and AEO specs",
  valueLabel: "$1.24M",
  publishBy: "Oct 8",
  eventDate: "Oct 31",
  fillTime: "~35 min total",
  goesLiveNote:
    "Drafted and ranked by revenue, so the biggest SKUs come first.",
  skuCount: 384,
  daysToAct: 20,
}

/** Blocked SKUs that need a nudge before going live. */
export const stuckBeforeLive = {
  title: "Blocked before going live",
  tag: "65 SKUs held up",
  skuCount: 65,
  note: "The agent files the support ticket with Amazon and chases the unblock. You just confirm what to send.",
  href: "/workbench?stream=stuck",
  items: [
    {
      id: "syndication",
      title: "Syndication failed",
      detail: "Amazon rejected the push, safe to retry",
      count: 18,
      tone: "error" as const,
    },
    {
      id: "brand-registry",
      title: "Brand Registry blocked",
      detail: "2 account issues holding 40 SKUs",
      count: 40,
      tone: "error" as const,
    },
    {
      id: "drafts",
      title: "Your unfinished drafts",
      detail: "Started and left open, nothing published",
      count: 7,
      tone: "muted" as const,
    },
  ],
}

export const analystTaskSummary = {
  openLabel: "Awaiting review",
  openCount: 42,
  openPrimary: "$410K blocked",
  openSecondary: "128 actions queued · agent drafts ready to accept or edit",
  openHref: "/workbench",
  closedLabel: "Published this week",
  closedCount: 11,
  closedPrimary: "$48K live on PDP",
  closedSecondary: "11 publishes · syndication verified on retailer PDPs",
  closedHref: "/actions-log",
}
