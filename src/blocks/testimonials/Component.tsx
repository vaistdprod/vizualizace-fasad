'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Award } from 'lucide-react'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps & { id?: string }> = (props) => {
  const { id, title, description, testimonials } = props

  return (
    <section className="py-24 bg-muted/30" id={`block-${id}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground">{description}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative overflow-hidden rounded-2xl bg-card/30 backdrop-blur-[2px] border p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={
                    typeof testimonial.image === 'object' && testimonial.image?.url
                      ? testimonial.image.url
                      : '/placeholder-avatar.jpg'
                  }
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
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
        </div>
      </div>
    </section>
  )
}
