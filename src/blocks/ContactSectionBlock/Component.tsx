'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowRight, Navigation } from 'lucide-react'
import Link from 'next/link'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import { MagicBorderCard } from '@/components/ui/magic-border-card'
import { FormBlock } from '@/blocks/Form/Component'
import type { ContactSectionBlock as ContactSectionBlockProps } from '@/payload-types'
import type { Form as PluginForm } from '@payloadcms/plugin-form-builder/types'

// Map icon strings to Lucide components
const iconMap = {
  MapPin: <MapPin className="w-6 h-6" />,
  Phone: <Phone className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
}

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
    contactMethods,
    mapEmbedUrl,
    navigationButtonText,
    transportMethods,
  } = props

  const [activeTab, setActiveTab] = useState<'message' | 'map'>('message')

  // Safely handle form as either number or Form object and convert id to string
  const pluginForm: PluginForm | null =
    typeof form === 'object' && form !== null
      ? ({
          ...form,
          id: String(form.id),
          confirmationType: form.confirmationType ?? 'message',
        } as PluginForm)
      : null

  // Map contactMethods from props to component-ready format, with null check
  const dynamicContactMethods = (contactMethods ?? []).map((method) => ({
    icon: iconMap[method.icon as keyof typeof iconMap] || <MapPin className="w-6 h-6" />,
    label: method.label,
    value: method.value,
    href: method.href || '#',
    color: method.colorClass || 'bg-gray-100 text-gray-600',
  }))

  // Map transportMethods from props, with null check
  const dynamicTransportMethods = (transportMethods ?? []).map((method, index) => ({
    id: index + 1,
    title: method.title,
    description: method.description,
    icon: method.icon,
  }))

  // Use the first address-like value for navigation button fallback, if available
  const addressForNavigation =
    dynamicContactMethods.find((m) => m.label.toLowerCase().includes('adresa'))?.value || ''

  return (
    <section className="py-20 relative overflow-hidden" id={`block-${id}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div id="kontakty" className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <div className="relative">
              <MapPin className="w-10 h-10 mr-3 text-primary" />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md" />
            </div>
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-4 -mb-4"
              colorFrom="hsl(var(--primary))"
              colorTo="hsl(var(--secondary))"
            >
              {heading || 'Kontaktujte nás'}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">
            {description || 'Jsme tu pro vás. Neváhejte nás kontaktovat s jakýmkoliv dotazem.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {dynamicContactMethods.length > 0 ? (
              dynamicContactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <a
                    href={method.href}
                    target={method.label.toLowerCase().includes('adresa') ? '_blank' : undefined}
                    rel={
                      method.label.toLowerCase().includes('adresa')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="block"
                  >
                    <MagicCard
                      className="p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                      gradientColor="hsl(var(--muted))"
                      gradientFrom="hsl(var(--primary))"
                      gradientTo="hsl(var(--secondary))"
                      gradientOpacity={0.15}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${method.color}`}>{method.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-muted-foreground">
                            {method.label}
                          </h3>
                          <p className="text-base font-semibold">{method.value}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </MagicCard>
                  </a>
                </motion.div>
              ))
            ) : (
              <p className="text-muted-foreground">Žádné kontaktní informace nejsou k dispozici.</p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(addressForNavigation)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button
                  variant="ripple"
                  size="lg"
                  className="w-full bg-primary/10 text-primary hover:bg-primary/15 border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <Navigation className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>{navigationButtonText || 'Navigovat k nám'}</span>
                  </div>
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Form and Map tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <MagicBorderCard
              className="rounded-2xl shadow-md overflow-hidden"
              gradientColor="hsl(var(--muted))"
              gradientFrom="hsl(var(--primary))"
              gradientTo="hsl(var(--secondary))"
              gradientOpacity={0.3}
              gradientSize={300}
              borderBeamSize={100}
              borderBeamDuration={10}
              showBorderBeamOnHover={true}
            >
              {/* Tab navigation */}
              <div className="flex border-b border-muted">
                <button
                  onClick={() => setActiveTab('message')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium flex-1 justify-center transition-colors cursor-pointer ${
                    activeTab === 'message'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Napište nám
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium flex-1 justify-center transition-colors cursor-pointer ${
                    activeTab === 'map'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Mapa
                </button>
              </div>

              {/* Tab content */}
              <div className="p-6">
                {activeTab === 'message' && pluginForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <FormBlock form={pluginForm} enableIntro={false} />
                  </motion.div>
                )}

                {activeTab === 'map' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                      <iframe
                        src={
                          mapEmbedUrl ||
                          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2578.1107333571584!2d13.7726!3d49.8583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDUxJzI5LjkiTiAxM8KwNDYnMjEuNCJF!5e0!3m2!1scs!2scz!4v1614698988952!5m2!1scs!2scz'
                        }
                        allowFullScreen
                        loading="lazy"
                        title="Mapa s umístěním ordinace"
                        className="w-full h-full border-0"
                      />
                    </div>

                    {dynamicTransportMethods.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-medium text-lg mb-4">Jak se k nám dostanete:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {dynamicTransportMethods.map((method) => (
                            <MagicCard
                              key={method.id}
                              className="p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                              gradientColor="hsl(var(--muted))"
                              gradientFrom="hsl(var(--primary))"
                              gradientTo="hsl(var(--secondary))"
                              gradientOpacity={0.15}
                            >
                              <div className="flex flex-row items-center gap-3">
                                <div className="text-2xl p-2 bg-primary/5 rounded-full flex-shrink-0">
                                  {method.icon}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{method.title}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {method.description}
                                  </p>
                                </div>
                              </div>
                            </MagicCard>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </MagicBorderCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
