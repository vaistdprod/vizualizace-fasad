'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LandingHeroBlock as LandingHeroBlockProps } from '@/payload-types'
import { fadeIn, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

export const LandingHeroBlock: React.FC<LandingHeroBlockProps & { id?: string }> = (props) => {
  const {
    id,
    title,
    description,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
    backgroundImage,
    badgeText,
    scrollIndicator,
  } = props

  return (
    <section className="relative min-h-screen flex items-center pb-20" id={`block-${id}`}>
      {backgroundImage && typeof backgroundImage === 'object' && backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt="Landing hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/40 backdrop-blur-xs" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8"
      >
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            variants={staggerItem}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary"
          >
            {badgeText}
          </motion.div>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-xl mb-8 text-foreground/80 leading-relaxed"
          >
            {description}
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="default" className="group" href={primaryButtonHref || '#'}>
              {primaryButtonText}
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            {secondaryButtonText && (
              <Button size="lg" variant="outline" href={secondaryButtonHref || '#'}>
                {secondaryButtonText}
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle scroll indicator */}
      {scrollIndicator?.enabled && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-foreground/80 mb-2">
              {scrollIndicator.text}
            </span>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-5 w-5 text-foreground cursor-pointer hover:text-primary transition-colors duration-300" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
