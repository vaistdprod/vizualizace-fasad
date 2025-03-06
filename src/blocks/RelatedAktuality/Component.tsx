import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Aktuality } from '@/payload-types'

import { Card } from '../../components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedAktualityProps = {
  className?: string
  docs?: Aktuality[]
  introContent?: SerializedEditorState
}

export const RelatedAktuality: React.FC<RelatedAktualityProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && (
        <RichText data={introContent} enableGutter={false} className="px-4 lg:px-0" />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch px-4 lg:px-0">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} _relationTo="aktuality" showCategories />
        })}
      </div>
    </div>
  )
}
