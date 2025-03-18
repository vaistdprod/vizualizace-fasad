'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { FeaturedProjectsBlock } from '@/payload-types'
import { fadeInUp, defaultViewport } from '@/utilities/animations'

type FeaturedProjectsBlockClientProps = Pick<
  FeaturedProjectsBlock,
  'afterProjectsText' | 'primaryButton' | 'secondaryButton'
>

export const FeaturedProjectsBlockClient: React.FC<FeaturedProjectsBlockClientProps> = ({
  afterProjectsText,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <>
      {afterProjectsText && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center mb-10"
        >
          <p className="text-lg leading-8 text-muted-foreground">{afterProjectsText}</p>
        </motion.div>
      )}

      {(primaryButton?.enabled || secondaryButton?.enabled) && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {primaryButton?.enabled && primaryButton.text && primaryButton.link && (
            <Button
              asChild
              href={primaryButton.link}
              size="lg"
              variant="default"
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">{primaryButton.text}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            </Button>
          )}
          {secondaryButton?.enabled && secondaryButton.text && secondaryButton.link && (
            <Button
              asChild
              href={secondaryButton.link}
              size="lg"
              variant="outline"
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">{secondaryButton.text}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            </Button>
          )}
        </motion.div>
      )}
    </>
  )
}

FeaturedProjectsBlockClient.displayName = 'FeaturedProjectsBlockClient'
