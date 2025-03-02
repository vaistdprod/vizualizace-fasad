import React from 'react'
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
import { MagicCard } from '@/components/ui/magic-card'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'

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
  const gradientColor = 'hsl(var(--muted))'

  return (
    <section className="py-16" id={`block-${id}`}>
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <Stethoscope className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service, index) => {
            const IconComponent =
              service.icon && iconMap[service.icon as keyof typeof iconMap]
                ? iconMap[service.icon as keyof typeof iconMap]
                : Star
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <MagicCard
                  className="h-full p-6 cursor-pointer flex flex-col"
                  gradientColor={gradientColor}
                  gradientFrom="hsl(var(--primary))"
                  gradientTo="hsl(var(--secondary))"
                  gradientOpacity={0.5}
                >
                  <div className="mb-4 text-primary">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">
                    {service.shortDescription || 'No description available'}
                  </p>
                </MagicCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
