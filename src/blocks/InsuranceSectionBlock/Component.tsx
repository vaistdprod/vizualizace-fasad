'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import Image from 'next/image'
import { MagicCard } from '@/components/ui/magic-card'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import Link from 'next/link'
import type { InsuranceSectionBlock as InsuranceSectionBlockProps } from '@/payload-types'

export const InsuranceSectionBlock: React.FC<
  InsuranceSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, partners, contactPrompt } = props

  return (
    <section className="py-16" id={`block-${id}`}>
      <div id="pojistovny" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <Shield className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {partners?.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex h-full"
            >
              <Link href={partner.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <MagicCard
                  className="h-full p-4 cursor-pointer flex flex-col items-center justify-center w-full shadow-xs"
                  gradientColor="hsl(var(--muted))"
                  gradientFrom="hsl(var(--primary))"
                  gradientTo="hsl(var(--secondary))"
                  gradientOpacity={0.5}
                >
                  <div className="relative sm:w-40 sm:h-40 w-24 h-24 justify-self-center mb-3">
                    <Image
                      src={
                        typeof partner.logo === 'object' && partner.logo?.url
                          ? partner.logo.url
                          : ''
                      }
                      alt={
                        typeof partner.logo === 'object' && partner.logo?.alt
                          ? partner.logo.alt
                          : 'Logo pojišťovny'
                      }
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-center">{partner.title}</p>
                </MagicCard>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-muted-foreground"
        >
          <p>
            {contactPrompt}{' '}
            <Link href="#kontakty" className="text-primary font-medium">
              Kontaktujte nás
            </Link>{' '}
            pro více informací.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
