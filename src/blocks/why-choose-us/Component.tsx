'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, Settings, Cpu, PiggyBank, Users } from 'lucide-react'
import type { WhyChooseUsBlock as WhyChooseUsBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

const iconMap = {
  Star,
  Clock,
  Settings,
  Cpu,
  PiggyBank,
  Users,
}

export const WhyChooseUsBlock: React.FC<WhyChooseUsBlockProps & { id?: string }> = (props) => {
  const { id, badgeText, title, description, features } = props

  return (
    <section
      className="py-28 relative overflow-hidden"
      id={`block-${id}`}
      style={{
        background: 'linear-gradient(to bottom, var(--muted) 0%, transparent 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center mb-20"
        >
          <div className="inline-block mb-6">
            <span className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {badgeText}
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features?.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative group overflow-hidden rounded-2xl bg-card/40 backdrop-blur-md border border-muted p-8 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary ring-4 ring-primary/5">
                  {Icon && <Icon className="h-8 w-8" strokeWidth={1.5} />}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
