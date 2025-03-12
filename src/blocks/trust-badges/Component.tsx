'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { TrustBadgesBlock as TrustBadgesBlockProps } from '@/payload-types'
import { staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

export const TrustBadgesBlock: React.FC<TrustBadgesBlockProps & { id?: string }> = (props) => {
  const { id, stats } = props

  return (
    <section className="py-12 bg-muted/30" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
        >
          {stats?.map((stat, index) => (
            <motion.div key={index} variants={staggerItem} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
