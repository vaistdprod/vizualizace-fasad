'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import type { TeamSectionBlock as TeamSectionBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

export const TeamSectionBlock: React.FC<TeamSectionBlockProps & { id?: string }> = (props) => {
  const { id, title, description, team } = props

  return (
    <section className="py-24" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {team?.map((member, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="rounded-2xl bg-card/30 backdrop-blur-xs border p-8 "
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={
                      typeof member.image === 'object' && member.image?.url ? member.image.url : ''
                    }
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{member.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
