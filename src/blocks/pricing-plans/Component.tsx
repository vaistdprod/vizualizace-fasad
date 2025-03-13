'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Building2, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import type { PricingPlansBlock as PricingPlansBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

const iconMap = {
  Building2,
  Building,
}

export const PricingPlansBlock: React.FC<PricingPlansBlockProps & { id?: string }> = (props) => {
  const {
    id,
    plans,
    priceSuffix,
    popularLabel,
    buttonText,
    buttonHref,
    heading,
    badgeText,
    description,
  } = props

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="mx-auto max-w-3xl text-center mb-20"
      >
        {badgeText && (
          <div className="inline-block mb-6">
            <span className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-primary/10 backdrop-blur-xs text-primary">
              {badgeText}
            </span>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          {heading}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        id={`block-${id}`}
        className="max-w-7xl mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-3"
      >
        {plans?.map((plan, index) => {
          const Icon = iconMap[plan.icon as keyof typeof iconMap]
          return (
            <motion.div key={index} variants={staggerItem} className="h-full">
              <MagicCard
                className={`overflow-hidden p-8 ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 translate-y-1/2">
                    <div className="bg-primary px-3 py-1 text-xs text-primary-foreground  rounded-l-lg">
                      {popularLabel}
                    </div>
                  </div>
                )}
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    {Icon && <Icon className="h-6 w-6 text-primary" />}
                  </div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{priceSuffix}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features?.map((item, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {item.feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full group"
                  variant={plan.popular ? 'default' : 'outline'}
                  href={plan.buttonHref || buttonHref || '#'}
                >
                  {buttonText}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </MagicCard>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
