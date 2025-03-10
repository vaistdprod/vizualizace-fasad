'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle2, Shield } from 'lucide-react'
import type { BenefitsBlock as BenefitsBlockProps } from '@/payload-types'

const iconMap = {
  Clock,
  CheckCircle2,
  Shield,
}

export const BenefitsBlock: React.FC<BenefitsBlockProps & { id?: string }> = (props) => {
  const { id, title, description, benefits } = props

  return (
    <section className="py-24" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground">{description}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits?.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative overflow-hidden rounded-2xl bg-card/30 backdrop-blur-[2px] border p-8"
              >
                <div className="mb-4">{Icon && <Icon className="h-8 w-8 text-primary" />}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
