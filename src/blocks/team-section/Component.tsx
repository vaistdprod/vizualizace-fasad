'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import type { TeamSectionBlock as TeamSectionBlockProps } from '@/payload-types'

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

export const TeamSectionBlock: React.FC<TeamSectionBlockProps & { id?: string }> = (props) => {
  const { id, title, description, team } = props

  return (
    <section className="py-24" id={`block-${id}`}>
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
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {team?.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-2xl bg-card/30 backdrop-blur-[2px] border p-8 shadow-lg"
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
