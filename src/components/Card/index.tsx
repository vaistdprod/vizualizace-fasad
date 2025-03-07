'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, memo } from 'react'

import type { Aktuality } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardAktualityData = Pick<Aktuality, 'slug' | 'categories' | 'meta' | 'title'>

// Memoize the Card component to prevent unnecessary re-renders
export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardAktualityData
  _relationTo?: 'aktuality' // Renamed to avoid unused variable warning
  showCategories?: boolean
  title?: string
}> = memo((props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, _relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/aktuality/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-xl overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        {!metaImage && <div className="">Žádný obrázek</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            fill={true}
          />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Nepojmenovaná kategorie'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link
                className="not-prose"
                href={href}
                ref={link.ref}
                prefetch={false} // Only prefetch on hover to reduce network requests
              >
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
})

// Add display name for better debugging
Card.displayName = 'Card'
