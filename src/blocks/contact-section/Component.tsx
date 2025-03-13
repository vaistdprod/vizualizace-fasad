'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Building } from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import { Form as PluginForm } from '@payloadcms/plugin-form-builder/types'
import { fadeInUp, staggerItem, defaultViewport } from '@/utilities/animations'
import { getClientSideURL } from '@/utilities/getURL'
import { MagicCard } from '@/components/ui/magic-card'

const iconMap = {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building,
}

export const ContactSectionBlock: React.FC<{
  id?: string
  badgeText?: string | null
  heading: string
  description?: string | null
  contactTitle?: string | null
  contactItems?: Array<{
    icon: keyof typeof iconMap
    label: string
    value: string
    id?: string | null
  }> | null
  form: number | PluginForm // Use PluginForm directly
  enableIntro?: boolean | null
  introContent?: any
}> = (props) => {
  const {
    id,
    badgeText,
    heading,
    description,
    contactTitle,
    contactItems = [],
    form,
    enableIntro = false,
    introContent,
  } = props

  // Set initial formData as PluginForm
  const [formData, setFormData] = useState<PluginForm | null>(
    typeof form !== 'number'
      ? {
          ...form,
          id: form.id, // Already number, no cast needed
          confirmationType: (form.confirmationType || 'message') as 'message' | 'redirect', // Ensure PluginForm type
          emails: form.emails ?? [],
        }
      : null,
  )

  // Fetch only if form is a number
  useEffect(() => {
    if (typeof form === 'number') {
      fetch(`${getClientSideURL()}/api/forms/${form}?depth=1`)
        .then((res) => res.json())
        .then((data) =>
          setFormData({
            ...data,
            id: data.id, // Already number, no cast needed
            confirmationType: (data.confirmationType || 'message') as 'message' | 'redirect',
            emails: data.emails ?? [],
          }),
        )
        .catch((err) => console.error('Failed to fetch form:', err))
    }
  }, [form])

  // Render nothing until formData is ready
  if (!formData) return null

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeInUp}
      className="mx-auto max-w-7xl px-4 md:px-6"
      id={`block-${id}`}
    >
      <div className="text-center mb-12">
        {badgeText && (
          <div className="inline-block mb-6">
            <span className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {badgeText}
            </span>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          {heading}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MagicCard className="p-8 bg-card/30 backdrop-blur-xs">
          <h2 className="text-3xl font-semibold mb-6">{contactTitle || 'Kontaktní informace'}</h2>
          <div className="space-y-6">
            {contactItems?.map((item, index) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div key={index} variants={staggerItem} className="flex items-center gap-4">
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
        </MagicCard>
        <MagicCard className="p-8 bg-card/30 backdrop-blur-xs">
          <FormBlock form={formData} enableIntro={enableIntro} introContent={introContent} />
        </MagicCard>
      </div>
    </motion.section>
  )
}
