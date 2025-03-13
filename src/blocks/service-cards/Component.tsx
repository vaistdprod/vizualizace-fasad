'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Cuboid as Cube3d, Paintbrush, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import type { ServiceCardsBlock as ServiceCardsBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

const iconMap = {
  Building2,
  Cube3d,
  Paintbrush,
  Compass,
}

export const ServiceCardsBlock: React.FC<ServiceCardsBlockProps & { id?: string }> = (props) => {
  const {
    id,
    services,
    buttonText,
    buttonHref,
    heading,
    badgeText,
    description,
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonHref,
    ctaButtonVariant = 'default',
  } = props

  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="mx-auto max-w-3xl text-center mb-20"
      >
        {badgeText && (
          <div className="inline-block mb-6">
            <span className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {badgeText}
            </span>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          {heading}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="max-w-7xl mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        id={`block-${id}`}
      >
        {services?.map((service, index) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap]
          return (
            <motion.div key={index} variants={staggerItem} className="h-full">
              <MagicCard className="flex-col overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={
                      typeof service.image === 'object' && service.image?.url
                        ? service.image.url
                        : ''
                    }
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 text-primary ">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-2xl font-bold mb-3 text-foreground hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="mb-6 text-muted-foreground">{service.description}</p>

                  <div className="mt-auto">
                    <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                      <ul className="space-y-2.5">
                        {service.features?.map((item, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary mr-2.5" />
                            <span className="font-medium">{item.feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="default"
                      className="w-full group relative overflow-hidden"
                      href={service.buttonHref || buttonHref || '#'}
                    >
                      <span className="relative z-10 flex items-center justify-center w-full">
                        {buttonText}
                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Button>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          )
        })}
      </motion.div>
      {/* Call to Action Section */}
      {ctaTitle && ctaDescription && ctaButtonText && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-semibold mb-4">{ctaTitle}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{ctaDescription}</p>
          <Button
            size="lg"
            variant={ctaButtonVariant}
            className="px-8 group"
            href={ctaButtonHref || '#'}
          >
            {ctaButtonText}
            <span
              className="ml-2 transition-transform group-hover:translate-x-1"
              aria-label="Šipka vpravo"
            >
              →
            </span>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
