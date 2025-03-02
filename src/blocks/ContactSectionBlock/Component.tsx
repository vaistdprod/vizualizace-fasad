'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { FormBlock } from '@/blocks/Form/Component'
import type { ContactSectionBlock as ContactSectionBlockProps } from '@/payload-types'
import type { Form as PluginForm } from '@payloadcms/plugin-form-builder/types'

export const ContactSectionBlock: React.FC<
  ContactSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const {
    id,
    heading,
    description,
    form,
    address,
    phone,
    email,
    mapEmbedUrl,
    navigationButtonText,
  } = props

  // Safely handle form as either number or Form object and convert id to string
  const pluginForm: PluginForm | null =
    typeof form === 'object' && form !== null
      ? ({
          ...form,
          id: String(form.id), // Convert number to string to match PluginForm
          confirmationType: form.confirmationType ?? 'message', // Default if null/undefined
        } as PluginForm)
      : null

  return (
    <section className="py-16" id={`block-${id}`}>
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <MapPin className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center pb-4 -mb-4"
            >
              {heading || 'Contact Us'}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">
            {description || 'We are here for you'}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {pluginForm && <FormBlock form={pluginForm} enableIntro={false} />}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-0 md:p-6 pt-0"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-primary transition-colors"
                >
                  {address || 'Office Address'}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a
                  href={`tel:${phone?.replace(/\s+/g, '') || ''}`}
                  className="text-lg hover:text-primary transition-colors"
                >
                  {phone || 'Phone Number'}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href={`mailto:${email || ''}`}
                  className="text-lg hover:text-primary transition-colors"
                >
                  {email || 'Email'}
                </a>
              </div>
              <div className="mt-6">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">{navigationButtonText || 'Navigate'}</Button>
                </a>
              </div>
            </div>
            <div className="mt-6 aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                src={
                  mapEmbedUrl ||
                  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2578.1107333571584!2d13.7726!3d49.8583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDUxJzI5LjkiTiAxM8KwNDYnMjEuNCJF!5e0!3m2!1scs!2scz!4v1614698988952!5m2!1scs!2scz'
                }
                allowFullScreen
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
