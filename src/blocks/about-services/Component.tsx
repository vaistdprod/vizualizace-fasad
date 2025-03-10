'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { AboutServicesBlock as AboutServicesBlockProps } from '@/payload-types'

export const AboutServicesBlock: React.FC<AboutServicesBlockProps & { id?: string }> = (props) => {
  const { id, title, description, image } = props

  return (
    <section className="py-24" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <Image
              src={typeof image === 'object' && image?.url ? image.url : ''}
              alt="Modern building facade"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-card/30 backdrop-blur-[2px] border p-8"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">{title}</h2>
            <div className="space-y-4 text-muted-foreground">
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
