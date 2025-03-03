'use client'

import React, { useCallback, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { RippleButton } from '@/components/ui/ripple-button'
import Image from 'next/image'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import type { GallerySectionBlock as GallerySectionBlockProps } from '@/payload-types'

export const GallerySectionBlock: React.FC<
  GallerySectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, images } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const onSelect = useCallback(
    () => emblaApi && setSelectedIndex(emblaApi.selectedScrollSnap()),
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

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
            <Camera className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <div className="relative">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {images?.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex-[0_0_100%] min-w-0"
                >
                  <div className="relative w-full aspect-video">
                    <Image
                      src={
                        typeof image.image === 'object' && image.image?.url
                          ? image.image.url
                          : '/media/gallery-placeholder.jpg'
                      }
                      alt={
                        typeof image.image === 'object' && image.image?.alt
                          ? image.image.alt
                          : `${image.title || 'Fotografie'} - Dětská ordinace Zbiroh`
                      }
                      width={1600}
                      height={900}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'} // Load first image eagerly
                      sizes="(max-width: 768px) 100vw, 1200px" // Responsive sizing
                      quality={85} // High quality for gallery images
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <RippleButton
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-xs w-10 h-10 border border-primary/20 shadow-lg hover:bg-background/40 transition-colors"
            rippleColor="hsl(var(--primary) / 0.4)"
            onClick={scrollPrev}
            aria-label="Předchozí fotografie"
          >
            ←
          </RippleButton>
          <RippleButton
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-xs w-10 h-10 border border-primary/20 shadow-lg hover:bg-background/40 transition-colors"
            rippleColor="hsl(var(--primary) / 0.4)"
            onClick={scrollNext}
            aria-label="Další fotografie"
          >
            →
          </RippleButton>
          <div className="flex justify-center gap-2 mt-4">
            {images?.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === selectedIndex ? 'bg-primary' : 'bg-primary/20'}`}
                aria-label={`Přejít na fotografii ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
