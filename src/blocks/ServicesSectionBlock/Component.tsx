'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Stethoscope,
  Syringe,
  Star,
  Heart,
  HeartPulse,
  Activity,
  Bandage,
  MessageCircle,
  Microscope,
} from 'lucide-react'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { MagicBorderCard } from '@/components/ui/magic-border-card'

import type { ServicesSectionBlock as ServicesSectionBlockProps } from '@/payload-types'

const iconMap = {
  Stethoscope,
  Syringe,
  Star,
  Heart,
  HeartPulse,
  Activity,
  Bandage,
  MessageCircle,
  Microscope,
}

export const ServicesSectionBlock: React.FC<
  ServicesSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, services } = props
  // No need for hoveredIndex state anymore

  return (
    <section className="py-20 relative" id={`block-${id}`}>
      <div id="sluzby" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-primary/10 rounded-full blur-lg"
              />
              <Stethoscope className="w-12 h-12 mr-4 text-primary relative z-10" />
            </div>
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-4 -mb-4"
              colorFrom="hsl(var(--primary))"
              colorTo="hsl(var(--secondary))"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          {services?.map((service, index) => {
            const IconComponent =
              service.icon && iconMap[service.icon as keyof typeof iconMap]
                ? iconMap[service.icon as keyof typeof iconMap]
                : Star

            // Create a staggered layout
            const colSpan = index % 3 === 0 ? 'md:col-span-6' : 'md:col-span-3'
            const rowSpan = index % 4 === 0 ? 'md:row-span-2' : ''

            return (
              <motion.div
                key={service.id || `service-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`h-full ${colSpan} ${rowSpan}`}
              >
                <div className="relative h-full group">
                  <MagicBorderCard
                    className="h-full"
                    gradientOpacity={0}
                    showBorderBeamOnHover={true}
                    borderBeamDuration={5}
                  >
                    <div className={`h-full p-6 flex flex-col ${index % 4 === 0 ? 'p-8' : 'p-6'}`}>
                      <div className="mb-4 text-primary relative">
                        <IconComponent className="w-10 h-10 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground flex-grow">
                        {service.shortDescription || 'Popis není k dispozici'}
                      </p>
                    </div>
                  </MagicBorderCard>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
