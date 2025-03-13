'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Lightbulb,
  Image as ImageIcon,
  FileEdit,
  Send,
  CheckCircle,
  Camera,
  Clock,
  CreditCard,
} from 'lucide-react'
import type { PartnershipProcessBlock as PartnershipProcessBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'
import { MagicCard } from '@/components/ui/magic-card'

const iconMap = {
  MessageSquare,
  Lightbulb,
  ImageIcon,
  FileEdit,
  Send,
  CheckCircle,
  Camera,
  Clock,
  CreditCard,
}

export const PartnershipProcessBlock: React.FC<PartnershipProcessBlockProps & { id?: string }> = (
  props,
) => {
  const { id, title, description, steps, visualizationDetail } = props

  const mainSteps = steps?.filter((step) => step.number <= 4) || []
  const visualizationStep = mainSteps.find((step) => step.number === 3)

  return (
    <section className="py-16 overflow-hidden" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </motion.div>

        {/* Main process steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {mainSteps.map((step) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || MessageSquare
            return (
              <motion.div key={step.number} variants={staggerItem} className="flex flex-col h-full">
                <MagicCard className="bg-card overflow-hidden flex-col">
                  {/* Step header - add rounded-t-xl to match MagicCard */}
                  <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center rounded-t-xl">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground mr-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-primary">Krok {step.number}</span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                  </div>

                  {/* Step image */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={typeof step.image === 'object' && step.image?.url ? step.image.url : ''}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>

                  {/* Step description */}
                  <div className="p-6 flex-grow">
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </MagicCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Visualization process detail */}
        {visualizationStep && visualizationDetail && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="mt-16 pt-16 border-t border-border"
          >
            <div className="flex flex-col items-center mb-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-center">{visualizationDetail.heading}</h3>
              <p className="text-muted-foreground text-center mt-2 max-w-2xl">
                {visualizationDetail.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {visualizationDetail.phases?.map((phase) => {
                const phaseNumber = phase.number
                const bgClass =
                  phaseNumber === 1
                    ? 'bg-primary/5'
                    : phaseNumber === 2
                      ? 'bg-blue-500/5'
                      : 'bg-blue-900/5'

                return (
                  <MagicCard key={phaseNumber} className="bg-card overflow-hidden flex-col">
                    {/* Phase header - add rounded-t-xl */}
                    <div
                      className={`${bgClass} p-4 border-b border-border/50 flex items-center justify-between rounded-t-xl`}
                    >
                      <div className="flex flex-col">
                        <h4 className="text-xl font-bold">{phase.title}</h4>
                        <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                      </div>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary-foreground">
                        <span className="text-xl font-bold text-primary">{phaseNumber}</span>
                      </div>
                    </div>

                    {/* Phase content */}
                    {phaseNumber === 1 && (
                      <div className="p-6 flex-grow">
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="aspect-square relative rounded-md overflow-hidden bg-muted"
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="h-8 w-8 opacity-40" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center py-3 border-y border-border/30">
                          <div className="text-sm font-medium">Vyberete vzory</div>
                          <div className="w-12 h-6 group">
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                              <path
                                d="M5 12H19M19 12L13 6M19 12L13 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          {[1, 2].map((i) => (
                            <div
                              key={i}
                              className="aspect-square relative rounded-md overflow-hidden bg-muted"
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="h-8 w-8 opacity-40" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/30">
                          <div className="text-sm font-medium">Vyberete barvy</div>
                          <div className="w-12 h-6 group">
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                              <path
                                d="M5 12H19M19 12L13 6M19 12L13 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                    {phaseNumber === 2 && (
                      <div className="p-6 flex-grow">
                        <div className="grid grid-cols-2 gap-3">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                              key={i}
                              className="aspect-square relative rounded-md overflow-hidden bg-muted"
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="h-8 w-8 opacity-40" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {phaseNumber === 3 && (
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div className="aspect-[4/3] relative rounded-md overflow-hidden bg-muted mb-4">
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-12 w-12 opacity-40" />
                          </div>
                        </div>
                        <div className="flex items-center justify-center mt-4 p-3 bg-green-500/10 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-green-500 font-medium">Hotovo!</span>
                        </div>
                      </div>
                    )}
                  </MagicCard>
                )
              })}
            </div>

            <div className="flex justify-center mt-10">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">{visualizationDetail.timeframe}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
