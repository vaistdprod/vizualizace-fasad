'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, Settings, Cpu, PiggyBank, Users } from 'lucide-react'
import type { WhyChooseUsBlock as WhyChooseUsBlockProps } from '@/payload-types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const iconMap = {
  Star,
  Clock,
  Settings,
  Cpu,
  PiggyBank,
  Users,
}

export const WhyChooseUsBlock: React.FC<WhyChooseUsBlockProps & { id?: string }> = (props) => {
  const { id, title, description, features } = props

  return (
    <section className="py-24 bg-muted/30" id={`block-${id}`}>
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features?.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-card/30 backdrop-blur-[2px] border p-8 shadow-lg"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
