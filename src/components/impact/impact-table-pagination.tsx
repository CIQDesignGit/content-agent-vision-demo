"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ImpactTablePaginationProps {
  page: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
  totalRows: number
  onPageChange: (page: number) => void
}

function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items: (number | "ellipsis")[] = [1]
  if (current > 3) items.push("ellipsis")

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let page = start; page <= end; page += 1) {
    items.push(page)
  }

  if (current < total - 2) items.push("ellipsis")
  items.push(total)
  return items
}

export function ImpactTablePagination({
  page,
  totalPages,
  rangeStart,
  rangeEnd,
  totalRows,
  onPageChange,
}: ImpactTablePaginationProps) {
  const pageItems = getPageItems(page, totalPages)

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-400">
        Showing{" "}
        <span className="font-medium tabular-nums text-slate-600">
          {rangeStart}–{rangeEnd}
        </span>{" "}
        of{" "}
        <span className="font-medium tabular-nums text-slate-600">
          {totalRows}
        </span>
      </p>

      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={page <= 1}
              className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
              onClick={(event) => {
                event.preventDefault()
                onPageChange(Math.max(1, page - 1))
              }}
            />
          </PaginationItem>

          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  onClick={(event) => {
                    event.preventDefault()
                    onPageChange(item)
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={page >= totalPages}
              className={
                page >= totalPages ? "pointer-events-none opacity-50" : undefined
              }
              onClick={(event) => {
                event.preventDefault()
                onPageChange(Math.min(totalPages, page + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
