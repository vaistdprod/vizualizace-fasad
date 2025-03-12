'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { FeaturedProjectsBlock as FeaturedProjectsBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

export const FeaturedProjectsBlock: React.FC<FeaturedProjectsBlockProps & { id?: string }> = (
  props,
) => {
  const { id, title, description, projects } = props

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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{description}</p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects?.map((project, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted/30"
            >
              <Image
                src={
                  typeof project.image === 'object' && project.image?.url ? project.image.url : ''
                }
                alt={project.title}
                fill
                className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
