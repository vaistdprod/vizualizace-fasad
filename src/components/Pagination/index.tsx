'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
}> = (props) => {
  const router = useRouter()

  const { className, page, totalPages } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent className="bg-muted/30 p-2 rounded-xl shadow-sm border border-border">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                'transition-all duration-200',
                hasPrevPage ? 'hover:bg-primary hover:text-primary-foreground' : 'opacity-50',
              )}
              disabled={!hasPrevPage}
              onClick={() => {
                if (hasPrevPage) {
                  router.push(`/aktuality/stranka/${page - 1}`)
                }
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis className="text-muted-foreground" />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => {
                  router.push(`/aktuality/stranka/${page - 1}`)
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              className="bg-primary text-primary-foreground font-medium"
              onClick={() => {
                router.push(`/aktuality/stranka/${page}`)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => {
                  router.push(`/aktuality/stranka/${page + 1}`)
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis className="text-muted-foreground" />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              className={cn(
                'transition-all duration-200',
                hasNextPage ? 'hover:bg-primary hover:text-primary-foreground' : 'opacity-50',
              )}
              disabled={!hasNextPage}
              onClick={() => {
                if (hasNextPage) {
                  router.push(`/aktuality/stranka/${page + 1}`)
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
