'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Info, Camera, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import type { PricingPlansBlock as PricingPlansBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

export const PricingPlansBlock: React.FC<PricingPlansBlockProps & { id?: string }> = (props) => {
  const {
    id,
    heading,
    badgeText,
    description,
    buttonText,
    buttonHref,
    options,
    tableHeaders,
    labels,
    note,
    afterPricingText,
    primaryButton,
    secondaryButton,
  } = props

  return (
    <section className="py-24" id={`block-${id}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="mx-auto max-w-3xl text-center mb-16"
      >
        {badgeText && (
          <div className="inline-block mb-6">
            <span className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-primary/10 backdrop-blur-xs text-primary">
              {badgeText}
            </span>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          {heading || 'Ceník'}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>

      {/* Desktop pricing table (hidden on mobile) */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="max-w-5xl mx-auto px-4 md:px-6 mb-12 hidden md:block"
      >
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 px-6 text-left font-medium text-foreground">
                  {tableHeaders?.service || 'Služba'}
                </th>
                <th className="py-4 px-6 text-center font-medium text-foreground">
                  {options[0]?.concepts || 10}{' '}
                  {tableHeaders?.concepts || 'variant v úvodních konceptech'}
                </th>
                <th className="py-4 px-6 text-center font-medium text-foreground">
                  {options[0]?.series || 6} {tableHeaders?.series || 'variant ve 2. sérii'}
                </th>
                <th className="py-4 px-6 text-center font-medium text-foreground">
                  {options[0]?.adjust || 1} {tableHeaders?.adjust || 'finální úprava'}
                </th>
                <th className="py-4 px-6 text-center font-medium text-foreground">
                  {tableHeaders?.fee || 'Příplatek za obkladové materiály'}
                </th>
              </tr>
            </thead>
            <tbody>
              {options?.map((option, index) => (
                <tr
                  key={index}
                  className={index !== options.length - 1 ? 'border-b border-border' : ''}
                >
                  <td className="py-4 px-6 font-medium">
                    {option.count}{' '}
                    {option.count === 1
                      ? labels?.photo || 'fotografie'
                      : labels?.photos || 'fotografie'}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="line-through text-muted-foreground">
                        {option.base} {labels?.currency || 'Kč'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-red-500">
                          {labels?.discount || 'SLEVA'} {option.discount}%
                        </span>
                        <span className="font-bold">
                          {labels?.from || 'od'} {option.final} {labels?.currency || 'Kč'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center font-bold">
                    {option.fee} {labels?.currency || 'Kč'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>{note}</p>
        </div>
      </motion.div>

      {/* Mobile pricing cards (hidden on desktop) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="max-w-md mx-auto px-4 md:hidden"
      >
        {options?.map((option, index) => (
          <motion.div key={index} variants={staggerItem} className="mb-8">
            <MagicCard className="overflow-hidden p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Camera className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {option.count}{' '}
                  {option.count === 1
                    ? labels?.photo || 'fotografie'
                    : labels?.photos || 'fotografie'}
                </h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="line-through text-muted-foreground text-sm">
                    {option.base} {labels?.currency || 'Kč'}
                  </span>
                  <span className="text-red-500 font-medium">
                    {labels?.discount || 'SLEVA'} {option.discount}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">
                    {option.final} {labels?.currency || 'Kč'}
                  </span>
                  <span className="text-muted-foreground">
                    + {option.fee} {labels?.currency || 'Kč'} {labels?.for || 'za'}{' '}
                    {tableHeaders?.fee?.toLowerCase() || 'obkladové materiály'}
                  </span>
                </div>
              </div>

              <ul className="mb-6 space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {option.concepts} {tableHeaders?.concepts || 'variant v úvodních konceptech'}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {option.series} {tableHeaders?.series || 'variant ve 2. sérii'}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {option.adjust} {tableHeaders?.adjust || 'finální úprava'}
                </li>
              </ul>

              <Button className="w-full group" variant="default" href={buttonHref || '#'}>
                {buttonText || 'Objednat'}
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </MagicCard>
          </motion.div>
        ))}

        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>{note}</p>
        </div>
      </motion.div>

      {/* After pricing text and buttons */}
      {afterPricingText && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center mt-16 mb-10 px-4"
        >
          <p className="text-lg leading-8 text-muted-foreground">{afterPricingText}</p>
        </motion.div>
      )}

      {(primaryButton?.enabled || secondaryButton?.enabled) && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-4 mt-8 px-4"
        >
          {primaryButton?.enabled && primaryButton.text && primaryButton.link && (
            <Button
              size="lg"
              variant="default"
              className="group relative overflow-hidden"
              href={primaryButton.link}
            >
              <span className="relative z-10">{primaryButton.text}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            </Button>
          )}

          {secondaryButton?.enabled && secondaryButton.text && secondaryButton.link && (
            <Button
              size="lg"
              variant="outline"
              className="group relative overflow-hidden"
              href={secondaryButton.link}
            >
              <span className="relative z-10">{secondaryButton.text}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            </Button>
          )}
        </motion.div>
      )}
    </section>
  )
}
