'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Cuboid as Cube3d, Paintbrush, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ServiceCardsBlock as ServiceCardsBlockProps } from '@/payload-types'

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
    transition: {
      duration: 0.5,
    },
  },
}

const iconMap = {
  Building2,
  Cube3d,
  Paintbrush,
  Compass,
}

export const ServiceCardsBlock: React.FC<ServiceCardsBlockProps & { id?: string }> = (props) => {
  const { id, services } = props

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      id={`block-${id}`}
    >
      {services?.map((service, index) => {
        const Icon = iconMap[service.icon as keyof typeof iconMap]
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-lg bg-card/30 backdrop-blur-[2px] border shadow-lg"
          >
            <div className="relative h-48">
              <Image
                src={
                  typeof service.image === 'object' && service.image?.url ? service.image.url : ''
                }
                alt={service.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 dark:from-black/90 dark:to-black/20" />
              <div className="absolute bottom-4 left-4 flex items-center">
                {Icon && <Icon className="h-6 w-6 mr-2" />}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {service.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="mb-4 text-muted-foreground">{service.description}</p>
              <ul className="space-y-2">
                {service.features?.map((item, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    {item.feature} {/* Access the 'feature' property */}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="mt-6 group">
                Zjistit více
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
