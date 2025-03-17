'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'
import type { TeamSectionBlock as TeamSectionBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

export const TeamSectionBlock: React.FC<TeamSectionBlockProps & { id?: string }> = (props) => {
  const { id, title, description, team } = props

  return (
    <section className="py-24" id={`block-${id}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
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
            <motion.div key={index} variants={staggerItem} className="h-full">
              <MagicCard className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  {typeof member.image === 'object' && member.image?.url ? (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={member.image.url}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : null}
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, '')}`}
                      className="hover:text-primary transition-colors"
                    >
                      {member.phone}
                    </a>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
