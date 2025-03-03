'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import Image from 'next/image'
import type { HeroSectionBlock as HeroSectionBlockProps } from '@/payload-types'

export const HeroSectionBlock: React.FC<
  HeroSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const {
    id,
    title,
    description,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    image,
  } = props

  return (
    <section className="relative pt-16 pb-8 w-full" id={`block-${id}`}>
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4 max-w-xl" // Removed mx-auto
          >
            <div className="space-y-2">
              <AnimatedGradientText
                as="h1"
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none"
              >
                {title}
              </AnimatedGradientText>
              <div className="max-w-[600px] text-muted-foreground md:text-xl my-2 space-y-4">
                {description
                  ?.split('\n\n')
                  .map((paragraph, index) => <p key={index}>{paragraph}</p>) || (
                  <p>No description available</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {primaryButtonText && primaryButtonLink && (
                <Button
                  size="lg"
                  className="bg-primary"
                  onClick={() => (window.location.href = primaryButtonLink)}
                >
                  {primaryButtonText}
                </Button>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => (window.location.href = secondaryButtonLink)}
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </motion.div>
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[500px] mx-auto lg:mx-0" // Added max-w-[500px], removed aspect-video
            >
              <Image
                alt={
                  typeof image === 'object'
                    ? image.alt || 'Dětská ordinace Zbiroh - úvodní obrázek'
                    : 'Dětská ordinace Zbiroh - úvodní obrázek'
                }
                className="rounded-xl object-cover w-full h-auto"
                src={
                  typeof image === 'object' && image.url ? image.url : '/media/hero-placeholder.jpg'
                }
                width={500}
                height={750}
                priority={true} // Load with priority as it's above the fold
                sizes="(max-width: 768px) 100vw, 500px" // Responsive sizing
                quality={90} // High quality for hero image
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
