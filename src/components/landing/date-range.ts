export const DEFAULT_DATE_RANGE_ID = "this-year"

export interface DateRangeOption {
  id: string
  label: string
  span: string
  /** Short range for compact menu cells. Year is shown once in the section label. */
  compact: string
  group: "year" | "quarter"
  /** Inclusive end, YYYY-MM-DD. The window has passed after this local day. */
  endsOn: string
}

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export function dateRangesForYear(year: number): DateRangeOption[] {
  return [
    {
      id: DEFAULT_DATE_RANGE_ID,
      label: "This year",
      span: `Jan 1 – Dec 31, ${year}`,
      compact: String(year),
      group: "year",
      endsOn: isoDate(year, 12, 31),
    },
    {
      id: "q1",
      label: "Q1",
      span: `Jan 1 – Mar 31, ${year}`,
      compact: "Jan 1 – Mar 31",
      group: "quarter",
      endsOn: isoDate(year, 3, 31),
    },
    {
      id: "q2",
      label: "Q2",
      span: `Apr 1 – Jun 30, ${year}`,
      compact: "Apr 1 – Jun 30",
      group: "quarter",
      endsOn: isoDate(year, 6, 30),
    },
    {
      id: "q3",
      label: "Q3",
      span: `Jul 1 – Sep 30, ${year}`,
      compact: "Jul 1 – Sep 30",
      group: "quarter",
      endsOn: isoDate(year, 9, 30),
    },
    {
      id: "q4",
      label: "Q4",
      span: `Oct 1 – Dec 31, ${year}`,
      compact: "Oct 1 – Dec 31",
      group: "quarter",
      endsOn: isoDate(year, 12, 31),
    },
    {
      id: "last-year",
      label: "Last year",
      span: `Jan 1 – Dec 31, ${year - 1}`,
      compact: String(year - 1),
      group: "year",
      endsOn: isoDate(year - 1, 12, 31),
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
  const fallback =
    ranges.find((range) => range.id === DEFAULT_DATE_RANGE_ID) ?? ranges[0]
  if (!rangeId) return fallback
  return ranges.find((range) => range.id === rangeId) ?? fallback
}

/** Matches the primary label shown in `DateRangePicker` trigger text. */
export function dateRangeHeadline(range: DateRangeOption): string {
  return range.id === DEFAULT_DATE_RANGE_ID ? "This year" : range.label
}

/** True once the selected window's last day is over. */
export function dateRangeHasPassed(
  range: DateRangeOption,
  today = new Date(),
): boolean {
  const [year, month, day] = range.endsOn.split("-").map(Number)
  const end = new Date(year, month - 1, day, 23, 59, 59, 999)
  return today.getTime() > end.getTime()
}
