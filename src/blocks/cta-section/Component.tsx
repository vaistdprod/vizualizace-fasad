'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CTASectionBlock as CTASectionBlockProps } from '@/payload-types'

export const CTASectionBlock: React.FC<CTASectionBlockProps & { id?: string }> = (props) => {
  const { id, title, description, buttonText, buttonVariant = 'default' } = props

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24 text-center"
      id={`block-${id}`}
    >
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
      <Button size="lg" variant={buttonVariant} className="px-8">
        {buttonText}
        <ArrowRight className="ml-2 h-5 w-5" aria-label="Šipka vpravo" />
      </Button>
    </motion.div>
  )
}
