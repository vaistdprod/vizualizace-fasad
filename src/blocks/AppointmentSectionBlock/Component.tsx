'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import Link from 'next/link'
import Image from 'next/image'
import type { AppointmentSectionBlock as AppointmentSectionBlockProps } from '@/payload-types'

export const AppointmentSectionBlock: React.FC<
  AppointmentSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const {
    id,
    heading,
    description,
    appointmentTypes,
    imageSection,
    contactPrompt,
    contactLinkText,
  } = props

  return (
    <section className="py-16" id={`block-${id}`}>
      <div id="objednani" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <Calendar className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          <div className="lg:w-1/2 space-y-6 w-full">
            {appointmentTypes?.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <MagicCard
                  className="p-6 flex flex-col justify-between w-full bg-card rounded-xl overflow-hidden shadow-xs"
                  gradientColor="hsl(var(--muted))"
                  gradientFrom="hsl(var(--primary))"
                  gradientTo="hsl(var(--secondary))"
                  gradientOpacity={0.5}
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      {type.duration}
                    </div>
                    <p className="text-muted-foreground">{type.description}</p>
                  </div>
                  <Button
                    className="mt-4 w-full cursor-pointer"
                    onClick={() => (window.location.href = type.buttonLink || '#')}
                  >
                    {type.buttonText}
                  </Button>
                </MagicCard>
              </motion.div>
            ))}
          </div>

          {imageSection && (
            <motion.div
              className="lg:w-1/2 rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full min-h-[400px]">
                <Image
                  src={
                    typeof imageSection.image === 'object' && imageSection.image?.url
                      ? imageSection.image.url
                      : ''
                  }
                  alt={
                    typeof imageSection.image === 'object' && imageSection.image?.alt
                      ? imageSection.image.alt
                      : 'Obrázek schůzky'
                  }
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl">
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-2">{imageSection.title}</h3>
                    <p>{imageSection.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {contactPrompt && contactLinkText && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground">
              {contactPrompt}{' '}
              <Link
                href="#kontakty"
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                {contactLinkText}
              </Link>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
