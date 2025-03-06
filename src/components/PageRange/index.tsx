import React from 'react'
import { cn } from '@/utilities/ui'

const defaultLabels = {
  plural: 'Dokumenty',
  singular: 'Dokument',
}

const defaultCollectionLabels = {
  aktuality: {
    plural: 'Články',
    singular: 'Článek',
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: keyof typeof defaultCollectionLabels
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
    collectionLabelsFromProps ||
    (collection ? defaultCollectionLabels[collection] : undefined) ||
    defaultLabels ||
    {}

  return (
    <div
      className={cn(
        'font-medium text-sm text-muted-foreground rounded-md py-2 px-3 inline-flex items-center',
        'bg-muted/50 border border-border shadow-sm',
        className,
      )}
    >
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && (
        <span className="text-primary">Vyhledávání nenalezlo žádné výsledky.</span>
      )}
      {typeof totalDocs !== 'undefined' && totalDocs > 0 && (
        <>
          <span className="mr-1">Zobrazeno</span>
          <span className="font-semibold text-primary mx-1">
            {indexStart}
            {indexStart > 0 ? ` - ${indexEnd}` : ''}
          </span>
          <span className="mr-1">z</span>
          <span className="font-semibold text-primary mx-1">{totalDocs}</span>
          <span>{totalDocs > 1 ? plural : singular}</span>
        </>
      )}
    </div>
  )
}
