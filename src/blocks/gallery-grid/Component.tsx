import React from 'react'
import { getCachedProjects } from '@/utilities/getProjects'
import { GalleryGridBlockClient } from './Component.client'
import type { Project } from '@/payload-types'

type GalleryGridBlockProps = {
  id?: string
  badgeText?: string
  heading: string
  description?: string
}

export const GalleryGridBlock: React.FC<GalleryGridBlockProps> = async (props) => {
  const { id, badgeText, heading, description } = props
  const projects: Project[] = await getCachedProjects()()

  return (
    <section className="py-24" id={`block-${id}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <GalleryGridBlockClient
          projects={projects}
          badgeText={badgeText}
          heading={heading}
          description={description}
        />
      </div>
    </section>
  )
}

GalleryGridBlock.displayName = 'GalleryGridBlock'
