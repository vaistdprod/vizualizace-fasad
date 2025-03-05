'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { MagicCard } from '@/components/ui/magic-card'

import type { HoursSectionBlock as HoursSectionBlockProps } from '@/payload-types'

export const HoursSectionBlock: React.FC<
  HoursSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, hours, bloodDrawInfo, emergencyContactInfo, emergencyPhone } =
    props

  return (
    <section className="py-16" id={`block-${id}`}>
      <div id="ordinacni-hodiny" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <Clock className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-4 -mb-4"
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
          className="max-w-2xl mx-auto"
        >
          <MagicCard
            className="p-4 rounded-xl shadow-xs"
            gradientColor="hsl(var(--muted))"
            gradientFrom="hsl(var(--primary))"
            gradientTo="hsl(var(--secondary))"
            gradientOpacity={0.2}
          >
            <div className="divide-y divide-border">
              {hours?.map((schedule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col p-4 hover:bg-accent/10 transition-colors"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium">{schedule.day}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {schedule.hours?.includes('\n') ? (
                      schedule.hours.split('\n').map((line, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:justify-between">
                          <div className="text-muted-foreground font-medium mr-4">
                            {line?.split(' (')[0] || ''}
                          </div>
                          {line?.includes(' (') && (
                            <div className="text-muted-foreground sm:text-right">
                              {line?.split(' (')[1]?.replace(')', '') || ''}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground font-medium">{schedule.hours}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </MagicCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 space-y-4"
        >
          {bloodDrawInfo && (
            <div className="bg-primary/10 p-4 rounded-lg shadow-xs border border-primary/20 max-w-lg mx-auto">
              <p className="font-medium text-primary">{bloodDrawInfo}</p>
            </div>
          )}
          {emergencyContactInfo && emergencyPhone && (
            <p className="text-muted-foreground">
              {emergencyContactInfo}{' '}
              <a
                href={`tel:${emergencyPhone}`}
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                {emergencyPhone}
              </a>
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
