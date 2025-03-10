'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageSquare, Lightbulb, Image as ImageIcon, FileEdit, Send } from 'lucide-react'
import type { PartnershipProcessBlock as PartnershipProcessBlockProps } from '@/payload-types'

const iconMap = {
  MessageSquare,
  Lightbulb,
  ImageIcon,
  FileEdit,
  Send,
}

export const PartnershipProcessBlock: React.FC<PartnershipProcessBlockProps & { id?: string }> = (
  props,
) => {
  const { id, title, description, steps } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  return (
    <section className="py-24 overflow-hidden" id={`block-${id}`} ref={containerRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 dark:bg-blue-300 rounded-full -translate-x-1/2"
              style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>

          <div className="relative space-y-24">
            {steps?.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: 'easeOut' },
                    },
                  }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
                >
                  <div className="flex-1">
                    <div className="rounded-xl bg-card/30 backdrop-blur-[2px] border shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={
                            typeof step.image === 'object' && step.image?.url ? step.image.url : ''
                          }
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {Icon && <Icon className="h-5 w-5" />}
                          </div>
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Krok {step.number}
                            </span>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-24 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2" />
                  <div className="flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
