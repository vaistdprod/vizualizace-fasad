'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Coins } from 'lucide-react'
import Link from 'next/link'
import { MagicCard } from '@/components/ui/magic-card'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'

import type { PricingSectionBlock as PricingSectionBlockProps } from '@/payload-types'

export const PricingSectionBlock: React.FC<
  PricingSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, pricingItems, contactPrompt } = props

  return (
    <section className="py-16" id={`block-${id}`}>
      <div id="cenik" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <Coins className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <MagicCard
            className="p-6 rounded-xl"
            gradientColor="hsl(var(--muted))"
            gradientFrom="hsl(var(--primary))"
            gradientTo="hsl(var(--secondary))"
            gradientOpacity={0.2}
          >
            <ul className="divide-y divide-border">
              {pricingItems?.map((item, index) => (
                <motion.li
                  key={`pricing-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="py-4 first:pt-0 last:pb-0 flex justify-between items-center"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="text-primary font-bold">{item.price}</span>
                </motion.li>
              ))}
            </ul>
          </MagicCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            {contactPrompt || 'Máte dotazy k ceníku?'}{' '}
            <Link href="#kontakty" className="text-primary font-medium">
              Kontaktujte nás
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
