'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Building2, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PricingPlansBlock as PricingPlansBlockProps } from '@/payload-types'

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
  Building,
}

export const PricingPlansBlock: React.FC<PricingPlansBlockProps & { id?: string }> = (props) => {
  const { id, plans } = props

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-3"
      id={`block-${id}`}
    >
      {plans?.map((plan, index) => {
        const Icon = iconMap[plan.icon as keyof typeof iconMap]
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`relative overflow-hidden rounded-2xl bg-card/30 backdrop-blur-[2px] border p-8 shadow-lg ${
              plan.popular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rotate-12">
                <div className="bg-primary px-3 py-1 text-xs text-primary-foreground shadow-lg">
                  Oblíbené
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
                <span className="text-muted-foreground">za projekt</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
            </div>
            <ul className="mb-8 space-y-3">
              {plan.features?.map((item, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {item.feature} {/* Access the 'feature' property */}
                </li>
              ))}
            </ul>
            <Button
              className="w-full group transition-transform hover:scale-[1.02]"
              variant={plan.popular ? 'default' : 'outline'}
            >
              Začít
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
