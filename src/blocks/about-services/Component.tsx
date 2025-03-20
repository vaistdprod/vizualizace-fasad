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
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, title, badgeText, description, image, features, cta, layout = 'imageLeft' } = props

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Image Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={imageVariants}
            className={`relative ${imageOrder}`}
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
              <Image
                src={typeof image === 'object' && image?.url ? image.url : ''}
                alt={title || 'Obrázek služby'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Enhanced image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={contentVariants}
            className={`${contentOrder}`}
          >
            <div className="relative">
              {/* Subtitle with enhanced styling */}

              {/* Title with enhanced styling */}
              <motion.h2
                variants={fadeIn}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
              >
                {title}
              </motion.h2>

              {/* Description with enhanced styling */}
              <motion.div
                variants={fadeIn}
                className="space-y-4 text-muted-foreground mb-10 max-w-xl"
              >
                {description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Features with enhanced styling */}
              {features && features.length > 0 && (
                <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-2 mt-10">
                  {features.map((feature, index) => (
                    <motion.div key={index} variants={staggerItem} className="group relative">
                      <MagicCard>
                        <div className="flex gap-4 p-4 h-full">
                          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                            {feature.icon ? (
                              renderIcon(feature.icon)
                            ) : (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-base font-medium mb-1 group-hover:text-primary transition-colors duration-300">
                              {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                          </div>
                        </div>
                      </MagicCard>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* CTA with enhanced styling */}
              {cta?.enabled && cta.text && cta.link && (
                <motion.div variants={fadeInUp} className="mt-10">
                  <Button
                    size="lg"
                    variant="default"
                    className="group relative overflow-hidden"
                    href={cta.link}
                  >
                    <span className="relative z-10">{cta.text}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
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
