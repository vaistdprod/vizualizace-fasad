'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Newspaper } from 'lucide-react'
import Image from 'next/image'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import type { NewsSectionBlock as NewsSectionBlockProps, Post } from '@/payload-types'

export const NewsSectionBlock: React.FC<
  NewsSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, posts } = props

  // Filter out numbers, ensure only Post objects are processed
  const validPosts = posts?.filter((post): post is Post => typeof post !== 'number') || []

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
            <Newspaper className="w-8 h-8 mr-2" />
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center pb-4 -mb-4"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {validPosts.map((post, index) => (
            <motion.article
              key={post.slug || `post-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card rounded-xl overflow-hidden flex flex-col"
            >
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src={
                    typeof post.heroImage === 'object' && post.heroImage?.url
                      ? post.heroImage.url
                      : '/media/news-placeholder.jpg'
                  }
                  alt={
                    typeof post.heroImage === 'object' && post.heroImage?.alt
                      ? post.heroImage.alt
                      : 'News image'
                  }
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1">
                <time className="text-sm text-primary font-medium">
                  {post.publishedAt && typeof post.publishedAt === 'string'
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : 'Date not available'}
                </time>
                <h3 className="mt-2 text-xl font-semibold leading-tight">{post.title}</h3>
                <p className="mt-3 text-muted-foreground">
                  {post.meta?.description || 'No description available'}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
