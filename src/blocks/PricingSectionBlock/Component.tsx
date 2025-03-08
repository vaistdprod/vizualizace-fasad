'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Coins } from 'lucide-react'
import Link from 'next/link'
import { MagicCard } from '@/components/ui/magic-card'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { PricingSectionBlock as PricingSectionBlockProps } from '@/payload-types'

export const PricingSectionBlock: React.FC<PricingSectionBlockProps & { id?: string }> = (
  props,
) => {
  const { id, heading, description, pricingItems, contactPrompt, tableHeaders } = props
  const isMobile = useMediaQuery('(max-width: 768px)')

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
            <div className="relative">
              <Coins className="w-10 h-10 mr-3 text-primary" />
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
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <MagicCard
            className={`${isMobile ? 'p-4 sm:p-6' : 'p-8'} pb-0 rounded-2xl shadow-xs overflow-hidden`}
            gradientColor="hsl(var(--muted))"
            gradientFrom="hsl(var(--primary))"
            gradientTo="hsl(var(--secondary))"
            gradientOpacity={0.2}
          >
            {!isMobile && (
              <div className="grid grid-cols-12 px-8 -mx-8 gap-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-8 after:right-8 after:h-px after:bg-border">
                <div className="col-span-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  {tableHeaders?.service || 'Služba'}
                </div>
                <div className="col-span-6 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  {tableHeaders?.description || 'Popis'}
                </div>
                <div className="col-span-2 font-medium text-sm uppercase tracking-wider text-muted-foreground flex justify-end">
                  {tableHeaders?.price || 'Cena'}
                </div>
              </div>
            )}
            <div className="space-y-0">
              {pricingItems?.map((item, index) => (
                <motion.div
                  key={item.id || `pricing-${item.title}-${item.price}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${isMobile ? 'flex flex-col gap-3 py-6' : 'grid grid-cols-12 gap-4 py-4 items-center'} ${isMobile ? 'px-4 sm:px-6 -mx-4 sm:-mx-6' : 'px-8 -mx-8'} hover:bg-primary/5 transition-colors relative ${index !== 0 ? `before:content-[''] before:absolute before:top-0 ${isMobile ? 'before:left-4 before:right-4 sm:before:left-6 sm:before:right-6' : 'before:left-8 before:right-8'} before:h-px before:bg-border` : ''}`}
                >
                  {isMobile ? (
                    <>
                      <div className="flex justify-between items-center w-full">
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <span className="text-primary font-bold text-base bg-primary/5 px-3 py-1.5 rounded-full inline-block ml-3 whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="col-span-4">
                        <h3 className="text-base font-medium">{item.title}</h3>
                      </div>
                      <div className="col-span-6">
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <span className="text-primary font-bold text-base bg-primary/5 px-3 py-1.5 rounded-full inline-block">
                          {item.price}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  )
}
