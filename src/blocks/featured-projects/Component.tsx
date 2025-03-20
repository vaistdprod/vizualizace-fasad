// src/blocks/featured-projects/Component.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCachedProjects } from '@/utilities/getProjects'
import type { FeaturedProjectsBlock as FeaturedProjectsBlockType } from '@/payload-types'
import { FeaturedProjectsBlockClient } from './Component.client'

type FeaturedProjectsBlockProps = FeaturedProjectsBlockType & { id?: string }

export const FeaturedProjectsBlock: React.FC<FeaturedProjectsBlockProps> = async (props) => {
  const { id, title, description, afterProjectsText, primaryButton, secondaryButton } = props

  // Call the cached function and await its result
  const projects = await getCachedProjects(true)()

  return (
    <section className="py-24" id={`block-${id}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{description}</p>
        </div>
        {projects.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {projects.slice(0, 6).map((project) => (
              <div
                key={project.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted/30"
              >
                <Link href={`/fotogalerie-fasad#${project.slug}`}>
                  <Image
                    src={
                      typeof project.featuredImage === 'object' && project.featuredImage?.url
                        ? project.featuredImage.url
                        : ''
                    }
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 405px, (min-width: 640px) 608px, calc(100vw - 24px)"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <FeaturedProjectsBlockClient
          afterProjectsText={afterProjectsText}
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
        />
      </div>
    </section>
  )
}

FeaturedProjectsBlock.displayName = 'FeaturedProjectsBlock'
