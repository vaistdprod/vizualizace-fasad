import React from 'react'
import Image from 'next/image'
import { getCachedProjects } from '@/utilities/getProjects'
import { GalleryGridBlockClient } from './Component.client'
import { Plus } from 'lucide-react'
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
        <div className="mx-auto max-w-3xl text-center mb-16">
          {badgeText && (
            <div className="inline-block mb-6">
              <span className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-primary/10 backdrop-blur-xs text-primary">
                {badgeText}
              </span>
            </div>
          )}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {heading}
          </h1>
          {description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {projects.map((project) => (
          <div key={project.id} id={`project-${project.slug}`} className="mb-32 last:mb-0">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-4">{project.title}</h2>
              {project.description && (
                <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.images?.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={
                        typeof image.image === 'object' && image.image?.url ? image.image.url : ''
                      }
                      alt={image.title || `Image ${imageIndex + 1}`}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 mb-3">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                      {image.caption && (
                        <p className="text-sm text-white/90 mt-1">{image.caption}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <GalleryGridBlockClient projects={projects} />
      </div>
    </section>
  )
}

GalleryGridBlock.displayName = 'GalleryGridBlock'
