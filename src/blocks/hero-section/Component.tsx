'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDownCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { HeroSectionBlock as HeroSectionBlockProps } from '@/payload-types'

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

export const HeroSectionBlock: React.FC<HeroSectionBlockProps & { id?: string }> = (props) => {
  const { id, title, description, buttonText, backgroundImage } = props

  return (
    <section className="relative h-screen flex items-center" id={`block-${id}`}>
      <Image
        src={
          typeof backgroundImage === 'object' && backgroundImage?.url
            ? backgroundImage.url
            : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
        }
        alt="Modern building facade"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
          >
            {title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg leading-8 mb-8">
            {description}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button size="lg" className="group">
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDownCircle className="h-10 w-10 animate-bounce" />
      </motion.div>
    </section>
  )
}
