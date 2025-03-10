'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Building } from 'lucide-react'
import type { ContactInfoBlock as ContactInfoBlockProps } from '@/payload-types'

const iconMap = {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building,
}

export const ContactInfoBlock: React.FC<ContactInfoBlockProps & { id?: string }> = (props) => {
  const { id, title, items } = props

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6" id={`block-${id}`}>
      <div className="rounded-2xl bg-card/30 backdrop-blur-[2px] border p-8">
        <h2 className="text-2xl font-semibold mb-6">{title || 'Kontaktní informace'}</h2>
        <div className="space-y-6">
          {items?.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
