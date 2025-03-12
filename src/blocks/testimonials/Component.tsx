'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Award } from 'lucide-react'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps & { id?: string }> = (props) => {
  const { id, title, description, testimonials } = props

  return (
    <section className="py-24 bg-muted/30" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground">{description}</p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="relative overflow-hidden rounded-2xl bg-card/30 backdrop-blur-xs border p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                {testimonial.image &&
                  typeof testimonial.image === 'object' &&
                  testimonial.image?.url && (
                    <Image
                      src={testimonial.image.url}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-muted-foreground mb-4">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">{testimonial.result}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
