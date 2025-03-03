'use client' // Keep for Framer Motion animations

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import type { NewsSectionBlock as NewsSectionBlockProps, Aktuality, Media } from '@/payload-types'

export const NewsSectionBlock: React.FC<
  NewsSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, aktuality: aktualitaIds } = props
  const [aktuality, setAktuality] = useState<Aktuality[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('Aktuality IDs:', aktualitaIds) // Debug: log aktualitaIds to confirm
    async function fetchAktuality() {
      if (!aktualitaIds || aktualitaIds.length === 0) {
        setAktuality([])
        return
      }

      // Extract IDs from Aktuality objects or use numbers directly
      const ids = aktualitaIds
        .map((aktualita) => (typeof aktualita === 'number' ? aktualita : aktualita.id))
        .filter((id): id is number => typeof id === 'number')
        .join(',')
      console.log('Extracted IDs:', ids) // Debug: log extracted IDs

      if (!ids) {
        setAktuality([])
        return
      }

      try {
        const response = await fetch(`/api/aktuality?ids=${ids}`)
        console.log('API Response:', response) // Debug: log the response
        if (!response.ok)
          throw new Error(
            `Failed to fetch aktuality aktuality: ${response.status} ${response.statusText}`,
          )
        const data = await response.json()
        console.log('API Data:', data) // Debug: log the parsed data
        if (Array.isArray(data)) {
          setAktuality(data)
        } else {
          throw new Error('Invalid response format: expected an array of aktuality')
        }
      } catch (err) {
        let errorMessage: string
        if (err instanceof Error) {
          errorMessage = err.message
        } else if (typeof err === 'string') {
          errorMessage = err
        } else {
          errorMessage = 'Unknown error occurred'
        }
        console.error('Fetch error:', err)
        setError(errorMessage)
        setAktuality([]) // Fallback to empty aktuality
      }
    }

    fetchAktuality()
  }, [aktualitaIds])

  if (error) {
    return (
      <section className="py-16" id={`block-${id}`}>
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <p className="text-center text-muted-foreground">Error loading news: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16" id={`block-${id}`}>
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <Newspaper className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aktuality.map((aktualita, index) => (
            <Link
              href={`/aktuality/${aktualita.slug}`}
              key={aktualita.slug || `aktualita-${index}`}
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-xl overflow-hidden flex flex-col"
              >
                <div className="w-full h-48 overflow-hidden">
                  <Image
                    src={
                      (aktualita.heroImage as Media)?.url || '/media/news-placeholder.jpg' // Narrow to Media type
                    }
                    alt={
                      (aktualita.heroImage as Media)?.alt || // Narrow to Media type
                      aktualita.title ||
                      'News image'
                    }
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes for performance
                    priority={index === 0} // Add priority for LCP on first image
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => console.error('Image load error:', e, aktualita.heroImage)}
                  />
                </div>
                <div className="p-6 flex-1">
                  <time className="text-sm text-primary font-medium">
                    {aktualita.publishedAt && typeof aktualita.publishedAt === 'string'
                      ? new Date(aktualita.publishedAt).toLocaleDateString('cs-CZ')
                      : 'Datum není k dispozici'}
                  </time>
                  <h3 className="mt-2 text-xl font-semibold leading-tight">{aktualita.title}</h3>
                  <p className="mt-3 text-muted-foreground">
                    {aktualita.meta?.description || 'Žádný popis není k dispozici'}
                  </p>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
