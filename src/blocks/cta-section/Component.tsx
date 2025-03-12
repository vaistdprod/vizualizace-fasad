'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import type { CTASectionBlock as CTASectionBlockProps } from '@/payload-types'
import { fadeInUp, defaultViewport } from '@/utilities/animations'

export const CTASectionBlock: React.FC<CTASectionBlockProps & { id?: string }> = (props) => {
  const { id, title, description, buttonText, buttonHref, buttonVariant = 'default' } = props

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeInUp}
      className="mt-24 text-center"
      id={`block-${id}`}
    >
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
      <Button size="lg" variant={buttonVariant} className="px-8 group" href={buttonHref || '#'}>
        {buttonText}
        <span
          className="ml-2 transition-transform group-hover:translate-x-1"
          aria-label="Šipka vpravo"
        >
          →
        </span>
      </Button>
    </motion.div>
  )
}
