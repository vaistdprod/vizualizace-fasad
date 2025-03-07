'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { MagicBorderCard } from '@/components/ui/magic-border-card'
import type { NewsSectionBlock as NewsSectionBlockProps, Aktuality, Media } from '@/payload-types'

// Define partial type for aktualityData
type PartialAktuality = Pick<Aktuality, 'title' | 'slug' | 'heroImage' | 'publishedAt' | 'meta'>

export const NewsSectionBlock: React.FC<
  NewsSectionBlockProps & { id?: string; aktualityData?: PartialAktuality[] } // Updated to partial type
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
            <div className="relative">
              <Newspaper className="w-10 h-10 mr-3 text-primary" />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md" />
            </div>
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-4 -mb-4"
              colorFrom="hsl(var(--primary))"
              colorTo="hsl(var(--secondary))"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <motion.p
            className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aktualityData.length === 0 && (
            <p className="text-center text-muted-foreground col-span-full">
              Žádné aktuality k zobrazení.
            </p>
          )}
          {aktualityData.map((aktualita: PartialAktuality, index: number) => (
            <Link
              href={`/aktuality/${aktualita.slug}`}
              key={aktualita.slug ?? `aktualita-${index}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <MagicBorderCard
                  className="h-full flex flex-col shadow-xs rounded-2xl p-px relative overflow-hidden"
                  gradientColor="hsl(var(--muted))"
                  gradientFrom="hsl(var(--primary))"
                  gradientTo="hsl(var(--secondary))"
                  gradientOpacity={0.5}
                  gradientSize={250}
                  borderBeamSize={80}
                  borderBeamDuration={8}
                  showBorderBeamOnHover={true}
                >
                  <article>
                    <div className="w-full overflow-hidden rounded-t-2xl aspect-[3/2] relative">
                      <Image
                        src={(aktualita.heroImage as Media)?.url ?? '/media/news-placeholder.jpg'}
                        alt={
                          (aktualita.heroImage as Media)?.alt ??
                          aktualita.title ??
                          'Obrázek aktuality'
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover overflow-hidden transition-transform duration-300 group-hover:scale-105"
                        priority={index < 3}
                        onError={(e) =>
                          console.error('Chyba načítání obrázku:', e, aktualita.heroImage)
                        }
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <time className="text-sm text-primary font-medium">
                        {aktualita.publishedAt && typeof aktualita.publishedAt === 'string'
                          ? new Date(aktualita.publishedAt).toLocaleDateString('cs-CZ')
                          : 'Datum není k dispozici'}
                      </time>
                      <h3 className="mt-2 text-xl font-semibold leading-tight">
                        {aktualita.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground">
                        {aktualita.meta?.description ?? 'Žádný popis není k dispozici'}
                      </p>
                    </div>
                  </article>
                </MagicBorderCard>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
