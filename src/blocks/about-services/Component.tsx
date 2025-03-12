'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Check,
  Star,
  Shield,
  Award,
  Zap,
  Heart,
  ThumbsUp,
  Settings,
  Wrench,
  Clock,
  MessageCircle,
  Layers,
  Image as ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { AboutServicesBlock as AboutServicesBlockProps } from '@/payload-types'
import {
  fadeIn,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/utilities/animations'

export const AboutServicesBlock: React.FC<AboutServicesBlockProps & { id?: string }> = (props) => {
  const { id, title, subtitle, description, image, features, cta, layout = 'imageLeft' } = props

  // Function to render icons based on name
  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'check':
        return <Check className="h-5 w-5 text-primary" />
      case 'star':
        return <Star className="h-5 w-5 text-primary" />
      case 'shield':
        return <Shield className="h-5 w-5 text-primary" />
      case 'award':
        return <Award className="h-5 w-5 text-primary" />
      case 'zap':
      case 'lightning':
        return <Zap className="h-5 w-5 text-primary" />
      case 'heart':
        return <Heart className="h-5 w-5 text-primary" />
      case 'thumbsup':
        return <ThumbsUp className="h-5 w-5 text-primary" />
      case 'settings':
      case 'gear':
        return <Settings className="h-5 w-5 text-primary" />
      case 'wrench':
        return <Wrench className="h-5 w-5 text-primary" />
      case 'clock':
        return <Clock className="h-5 w-5 text-primary" />
      case 'message-circle':
        return <MessageCircle className="h-5 w-5 text-primary" />
      case 'layers':
        return <Layers className="h-5 w-5 text-primary" />
      case 'image':
        return <ImageIcon className="h-5 w-5 text-primary" />
      default:
        return <Check className="h-5 w-5 text-primary" />
    }
  }

  // Determine the order of content based on layout
  const imageOrder = layout === 'imageLeft' ? 'lg:order-1' : 'lg:order-2'
  const contentOrder = layout === 'imageLeft' ? 'lg:order-2' : 'lg:order-1'

  // Animation variants based on layout
  const imageVariants = layout === 'imageLeft' ? fadeInLeft : fadeInRight
  const contentVariants = layout === 'imageLeft' ? fadeInRight : fadeInLeft

  return (
    <section className="py-24 relative overflow-hidden" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={imageVariants}
            className={`relative ${imageOrder}`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ">
              <Image
                src={typeof image === 'object' && image?.url ? image.url : ''}
                alt={title || 'Service image'}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Subtle image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={contentVariants}
            className={`${contentOrder}`}
          >
            <div className="rounded-2xl bg-card/80 backdrop-blur-md border  p-8 relative overflow-hidden">
              {subtitle && (
                <motion.p variants={fadeIn} className="text-sm font-medium text-primary mb-2">
                  {subtitle}
                </motion.p>
              )}

              <motion.h2
                variants={fadeIn}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                {title}
              </motion.h2>

              <motion.div variants={fadeIn} className="space-y-4 text-muted-foreground mb-8">
                {description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </motion.div>

              {features && features.length > 0 && (
                <motion.div variants={staggerContainer} className="space-y-3 mt-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={staggerItem}
                      className="flex gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                        {feature.icon ? (
                          renderIcon(feature.icon)
                        ) : (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-base font-medium mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {cta?.enabled && cta.text && cta.link && (
                <motion.div variants={fadeInUp} className="mt-8">
                  <Button size="lg" variant="default" className="group" href={cta.link}>
                    {cta.text}
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
