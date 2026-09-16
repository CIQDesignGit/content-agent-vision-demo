"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { EmptyState } from "@ciq-dev/ciq-design-system"
import { cn } from "@/lib/utils"
import { categoryEmoji } from "./category-emoji"
import { ImpactTablePagination } from "./impact-table-pagination"
import type { ImpactRow } from "./types"

function ProductThumbnail({ row }: { row: ImpactRow }) {
  const hasPhoto = row.thumbnailUrl.startsWith("/")
  if (hasPhoto) {
    return (
      <Image
        src={row.thumbnailUrl}
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-slate-200/80"
      />
    )
  }
  return (
    <span
      aria-hidden
      className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-lg ring-1 ring-slate-200/80"
    >
      {categoryEmoji(row.category)}
    </span>
  )
}

/** Swatch + label rather than a tinted pill — keeps colored chips out of a dense table. */
function AttributionApproach({
  approach,
}: {
  approach: ImpactRow["attributionApproach"]
}) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          approach === "A/B test" ? "bg-data-1" : "bg-data-3",
        )}
        aria-hidden
      />
      {approach}
    </span>
  )
}

const PAGE_SIZE = 10

interface ImpactTableProps {
  rows: ImpactRow[]
}

export function ImpactTable({ rows }: ImpactTableProps) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsIdentity, setRowsIdentity] = useState(rows)
  // Reset to page 1 when the row set changes (filter / moment switch).
  if (rows !== rowsIdentity) {
    setRowsIdentity(rows)
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return rows.slice(start, start + PAGE_SIZE)
  }, [currentPage, rows])

  const rangeStart = rows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, rows.length)

  return (
    <div className="overflow-hidden rounded-3xl bg-white/80 ring-1 ring-slate-900/6 shadow-pane-lg backdrop-blur-md">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-6 py-4">
        <h2 className="font-sans text-base font-semibold tracking-tight text-slate-900">
          Impact by SKU
        </h2>
        <p className="text-xs text-slate-400">
          Ranked by attributed impact over the selected period
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              <th className="w-[36%] px-6 py-3 font-semibold">Product</th>
              <th className="w-[15%] py-3 pr-4 text-right font-semibold">
                Impact
              </th>
              <th className="w-[16%] py-3 pr-4 font-semibold">Attribution</th>
              <th className="w-[17%] py-3 pr-4 font-semibold">What changed</th>
              <th className="py-3 pr-4 font-semibold">Changed on</th>
              <th className="w-10 px-4 py-3" aria-hidden />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16">
                  <EmptyState
                    title="No impact data"
                    description="Try adjusting the date range or filters."
                  />
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="group cursor-pointer border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70"
                  onClick={() => router.push(`/impact/${encodeURIComponent(row.asin)}`)}
                >
                  <td className="px-6 py-3 align-middle">
                    <div className="flex min-w-0 items-center gap-3">
                      <ProductThumbnail row={row} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {row.productName}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          <span className="font-mono">{row.asin}</span>
                          {" · "}
                          {row.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-right align-middle font-sans text-sm font-semibold tabular-nums text-teal-700">
                    {row.impactLabel}
                  </td>
                  <td className="py-3 pr-4 align-middle">
                    <AttributionApproach approach={row.attributionApproach} />
                  </td>
                  <td className="py-3 pr-4 align-middle text-sm text-slate-600">
                    {row.whatChanged === "—" ? (
                      <span className="text-slate-300">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {row.whatChanged.split(", ").map((field) => (
                          <span
                            key={field}
                            className="inline-flex items-center rounded-full bg-slate-100/80 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="py-3 pr-4 align-middle text-sm tabular-nums text-slate-500">
                    {row.changedOn}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <ChevronRight
                      className="size-4 text-slate-300 transition-colors group-hover:text-brand-600"
                      aria-hidden
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {rows.length > 0 ? (
        <ImpactTablePagination
          page={currentPage}
          totalPages={totalPages}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          totalRows={rows.length}
          onPageChange={setPage}
        />
      ) : null}
    </div>
  )
}
