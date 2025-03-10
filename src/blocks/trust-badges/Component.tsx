'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { TrustBadgesBlock as TrustBadgesBlockProps } from '@/payload-types'

export const TrustBadgesBlock: React.FC<TrustBadgesBlockProps & { id?: string }> = (props) => {
  const { id, stats } = props

  return (
    <section className="py-12 bg-muted/30" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
