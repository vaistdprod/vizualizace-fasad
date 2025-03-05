'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import Image from 'next/image'
import type { HeroSectionBlock as HeroSectionBlockProps } from '@/payload-types'
import { Suspense } from 'react'

// Lazy load motion components to reduce initial bundle size
const MotionDiv = motion.div

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
      <div id="uvod" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4 max-w-xl relative"
          >
            {/* Circular gradient background for better text legibility */}
            <div
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at center, hsl(var(--background) / 0.9) 0%, hsl(var(--background) / 0.7) 40%, hsl(var(--background) / 0.5) 60%, hsl(var(--background) / 0.3) 80%, transparent 100%)',
                transform: 'scale(1.5)',
              }}
            />
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
                  <p>Popis není k dispozici</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {primaryButtonText && primaryButtonLink && (
                <Button
                  size="lg"
                  variant="rainbow" // Rainbow button
                  onClick={() => (window.location.href = primaryButtonLink)}
                >
                  {primaryButtonText}
                </Button>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <Button
                  size="lg"
                  variant="ripple" // Ripple button
                  onClick={() => (window.location.href = secondaryButtonLink)}
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </MotionDiv>
          {image && (
            <Suspense
              fallback={<div className="h-[888px] w-full bg-gray-200 animate-pulse rounded-xl" />}
            >
              <MotionDiv
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto lg:mx-0"
              >
                <Image
                  alt={
                    typeof image === 'object'
                      ? image.alt || 'Dětská ordinace Zbiroh - úvodní obrázek'
                      : 'Dětská ordinace Zbiroh - úvodní obrázek'
                  }
                  className="rounded-xl object-cover w-full h-auto shadow-md"
                  src={typeof image === 'object' && image.url ? image.url : ''}
                  width={592}
                  height={888}
                  priority={true} // This is a critical above-the-fold image
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 592px"
                  quality={85}
                  fetchPriority="high"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jYI2iwAAAABJRU5ErkJggg=="
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                  onLoad={(e) => {
                    if (e.target) {
                      ;(e.target as HTMLImageElement).setAttribute('data-loaded', 'true')
                    }
                  }}
                />
              </MotionDiv>
            </Suspense>
          )}
        </div>
      </div>
    </section>
  )
}
