'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { BorderBeam } from '@/components/ui/border-beam'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import type { NewsSectionBlock as NewsSectionBlockProps, Aktuality, Media } from '@/payload-types'

export const NewsSectionBlock: React.FC<
  NewsSectionBlockProps & { id?: string; aktualityData?: Aktuality[] }
> = (props) => {
  const { id, heading, description, aktualityData = [] } = props

  return (
    <section className="py-16" id={`block-${id}`}>
      <div id="aktuality" className="container px-4 md:px-6 mx-auto max-w-7xl">
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
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aktualityData.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full">
              Žádné aktuality k zobrazení.
            </p>
          )}
          {aktualityData.map((aktualita: Aktuality, index: number) => (
            <Link
              href={`/aktuality/${aktualita.slug}`}
              key={aktualita.slug || `aktualita-${index}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card relative rounded-xl overflow-hidden flex flex-col shadow-xs"
              >
                <BorderBeam
                  duration={30}
                  size={600}
                  className="from-transparent via-rose-200 to-transparent"
                />
                <BorderBeam
                  duration={30}
                  delay={15}
                  size={600}
                  className="from-transparent via-rose-200 to-transparent"
                />
                <article>
                  <div className="w-full aspect-[3/2] relative">
                    <Image
                      src={(aktualita.heroImage as Media)?.url || '/media/news-placeholder.jpg'}
                      alt={
                        (aktualita.heroImage as Media)?.alt ||
                        aktualita.title ||
                        'Obrázek aktuality'
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index < 3}
                      onError={(e) =>
                        console.error('Chyba načítání obrázku:', e, aktualita.heroImage)
                      }
                    />
                  </div>
                  <div className="p-6 flex-1 bg-muted/50">
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
                </article>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
