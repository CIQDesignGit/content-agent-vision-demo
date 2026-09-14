"use client"

import { useMemo, useState } from "react"
import { EmptyState } from "@ciq-dev/ciq-design-system"
import { SkuGradientThumbnail } from "@/components/sku-gradient-thumbnail"
import { ImpactTablePagination } from "./impact-table-pagination"
import type { ImpactRow } from "./types"

const PAGE_SIZE = 10

interface ImpactTableProps {
  rows: ImpactRow[]
}

export function ImpactTable({ rows }: ImpactTableProps) {
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
    <div className="overflow-hidden rounded-2xl border border-border-default bg-surface shadow-brand-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border-default">
              <th className="px-5 py-3.5 text-xs font-medium text-brand-500">
                Product
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium text-brand-500">
                Impact
              </th>
              <th className="px-5 py-3.5 text-xs font-medium text-brand-500">
                What Changed?
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium text-brand-500">
                Changed on
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16">
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
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-5 py-3.5 align-middle">
                    <div className="flex min-w-0 items-center gap-3">
                      <SkuGradientThumbnail className="size-10 rounded-md border border-slate-200" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-fg-primary">
                          {row.productName}
                        </p>
                        <p className="font-mono text-xs text-fg-tertiary">
                          {row.asin}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right align-middle text-sm font-semibold tabular-nums text-success-600">
                    {row.impactLabel}
                  </td>
                  <td className="px-5 py-3.5 align-middle text-sm text-fg-secondary">
                    {row.whatChanged}
                  </td>
                  <td className="px-5 py-3.5 text-right align-middle text-sm text-fg-tertiary">
                    {row.changedOn}
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
