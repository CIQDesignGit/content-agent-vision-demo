export const DEFAULT_DATE_RANGE_ID = "this-year"

export interface DateRangeOption {
  id: string
  label: string
  span: string
  /** Short range for compact menu cells. Year is shown once in the section label. */
  compact: string
  group: "year" | "quarter"
}

export function dateRangesForYear(year: number): DateRangeOption[] {
  return [
    {
      id: DEFAULT_DATE_RANGE_ID,
      label: "This year",
      span: `Jan 1 – Dec 31, ${year}`,
      compact: String(year),
      group: "year",
    },
    {
      id: "q1",
      label: "Q1",
      span: `Jan 1 – Mar 31, ${year}`,
      compact: "Jan 1 – Mar 31",
      group: "quarter",
    },
    {
      id: "q2",
      label: "Q2",
      span: `Apr 1 – Jun 30, ${year}`,
      compact: "Apr 1 – Jun 30",
      group: "quarter",
    },
    {
      id: "q3",
      label: "Q3",
      span: `Jul 1 – Sep 30, ${year}`,
      compact: "Jul 1 – Sep 30",
      group: "quarter",
    },
    {
      id: "q4",
      label: "Q4",
      span: `Oct 1 – Dec 31, ${year}`,
      compact: "Oct 1 – Dec 31",
      group: "quarter",
    },
    {
      id: "last-year",
      label: "Last year",
      span: `Jan 1 – Dec 31, ${year - 1}`,
      compact: String(year - 1),
      group: "year",
    },
  ]
}

export function currentQuarterId(date = new Date()): string {
  return `q${Math.floor(date.getMonth() / 3) + 1}`
}

export function resolveDateRange(
  rangeId: string | null | undefined,
  year = new Date().getFullYear(),
): DateRangeOption {
  const ranges = dateRangesForYear(year)
  return ranges.find((range) => range.id === rangeId) ?? ranges[0]
}

/** Matches the primary label shown in `DateRangePicker` trigger text. */
export function dateRangeHeadline(range: DateRangeOption): string {
  return range.id === DEFAULT_DATE_RANGE_ID ? "This year" : range.label
}
