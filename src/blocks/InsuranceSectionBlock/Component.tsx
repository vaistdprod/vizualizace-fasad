'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { Button } from '@/components/ui/button'
import { MagicBorderCard } from '@/components/ui/magic-border-card'
import Link from 'next/link'
import type { InsuranceSectionBlock as InsuranceSectionBlockProps } from '@/payload-types'

export const InsuranceSectionBlock: React.FC<InsuranceSectionBlockProps & { id?: string }> = (
  props,
) => {
  const { id, heading, description, partners, contactPrompt, contactCard } = props

  const getCardStyles = (index: number) => {
    const baseClasses = 'flex h-full transform transition-transform duration-500'
    if (index % 3 === 1) return `${baseClasses} md:translate-y-8`
    if (index % 3 === 2) return `${baseClasses} md:translate-y-4`
    return baseClasses
  }

  return (
    <section className="py-16 overflow-hidden" id={`block-${id}`}>
      <div id="pojistovny" className="container px-4 md:px-6 mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <div className="inline-flex items-center">
            <div className="relative">
              <Shield className="w-10 h-10 mr-3 text-primary" />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md" />
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {partners?.map((partner, index) => (
            <motion.div
              key={partner.url || `partner-${partner.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={getCardStyles(index)}
            >
              <Link
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group"
              >
                <MagicBorderCard
                  className="h-full p-6 cursor-pointer flex flex-col items-center justify-center w-full shadow-xs rounded-2xl relative overflow-hidden"
                  gradientColor="hsl(var(--muted))"
                  gradientFrom="hsl(var(--primary))"
                  gradientTo="hsl(var(--secondary))"
                  gradientOpacity={0.5}
                  gradientSize={250}
                  borderBeamSize={80}
                  borderBeamDuration={8}
                  showBorderBeamOnHover={true}
                >
                  <div className="relative sm:w-40 sm:h-40 w-28 h-28 justify-self-center mb-4">
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
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      sizes="(max-width: 640px) 120px, 200px"
                      quality={80}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      onLoad={(e) => {
                        if (e.target) {
                          const img = e.target as HTMLImageElement
                          img.setAttribute('data-loaded', 'true')
                        }
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-base mb-1">{partner.title}</p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-3 h-3" />
                      <span>Navštívit web</span>
                    </div>
                  </div>
                </MagicBorderCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 relative z-10"
        >
          <div className="max-w-3xl mx-auto">
            <MagicBorderCard
              className="p-8 rounded-2xl shadow-md overflow-hidden"
              gradientColor="hsl(var(--muted))"
              gradientFrom="hsl(var(--primary))"
              gradientTo="hsl(var(--secondary))"
              gradientOpacity={0.3}
              gradientSize={300}
              borderBeamSize={100}
              borderBeamDuration={10}
              showBorderBeamOnHover={true}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">
                    <AnimatedGradientText
                      colorFrom="hsl(var(--primary))"
                      colorTo="hsl(var(--secondary))"
                    >
                      {contactCard?.heading || 'Potřebujete poradit?'}
                    </AnimatedGradientText>
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    {contactPrompt ||
                      'Máte dotazy ohledně pojištění? Neváhejte nás kontaktovat pro více informací.'}
                  </p>
                </div>
                <Link href={contactCard?.buttonLink || '#kontakty'}>
                  <Button
                    variant="ripple"
                    size="lg"
                    className="bg-primary/10 text-primary hover:bg-primary/15 border-primary/30 transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>{contactCard?.buttonText || 'Kontaktujte nás'}</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </MagicBorderCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
