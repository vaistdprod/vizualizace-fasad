'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import type { LandingHeroBlock as LandingHeroBlockProps } from '@/payload-types'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const LandingHeroBlock: React.FC<LandingHeroBlockProps & { id?: string }> = (props) => {
  const { id, title, description, primaryButtonText, secondaryButtonText, backgroundImage } = props

  return (
    <section className="relative h-screen flex items-center" id={`block-${id}`}>
      <Image
        src={
          typeof backgroundImage === 'object' && backgroundImage?.url
            ? backgroundImage.url
            : '/placeholder-hero.jpg'
        }
        alt="Landing hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-white"
      >
        <div className="max-w-3xl">
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6">
            {title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl mb-8 text-gray-200">
            {description}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg">
              {primaryButtonText}
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              {secondaryButtonText}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
