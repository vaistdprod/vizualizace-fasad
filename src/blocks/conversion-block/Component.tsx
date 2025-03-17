'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, ShieldCheck, CheckCircle, ChevronRight, Check, Info, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import type { ConversionBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'
import { cn } from '@/utilities/ui'

export const ConversionBlock: React.FC<ConversionBlockProps & { id?: string }> = (props) => {
  const {
    id,
    badgeText,
    headline,
    subheading,
    endDate,
    originalPrice,
    discountPrice,
    discountPercentage,
    currency,
    testimonial,
    trustBadges,
    primaryCTA,
    secondaryCTA,
    urgencyText,
    packageDetails,
  } = props

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!endDate) return

    const calculateTimeLeft = () => {
      const targetDate = new Date(endDate)
      const difference = +targetDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <section className="py-16" id={`block-${id}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-xl border border-border/5 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>

          <div className="relative z-10 p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left Column - Content */}
              <div className="flex flex-col justify-between space-y-6">
                {/* Badge */}
                {badgeText && (
                  <motion.div
                    variants={staggerItem}
                    className="inline-block self-start px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-xs text-primary"
                  >
                    {badgeText}
                  </motion.div>
                )}

                {/* Headline */}
                <motion.h2
                  variants={staggerItem}
                  className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl"
                >
                  {headline}
                </motion.h2>

                {/* Subheading */}
                <motion.p
                  variants={staggerItem}
                  className="text-xl text-foreground/80 leading-relaxed"
                >
                  {subheading}
                </motion.p>

                {/* Testimonial */}
                {testimonial && (
                  <motion.div
                    variants={staggerItem}
                    className="rounded-lg border border-border bg-background/50 p-4 backdrop-blur-sm"
                  >
                    <p className="mb-4 text-foreground/80 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      {testimonial.image &&
                        typeof testimonial.image === 'object' &&
                        testimonial.image.url && (
                          <div className="h-10 w-10 overflow-hidden rounded-full">
                            <img
                              src={testimonial.image.url}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      <div>
                        <p className="font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-foreground/70">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Trust Badges */}
                {trustBadges && trustBadges.length > 0 && (
                  <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
                    {trustBadges.map((badge, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {badge.icon === 'ShieldCheck' && (
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        )}
                        {badge.icon === 'CheckCircle' && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                        {badge.icon === 'Clock' && <Clock className="h-5 w-5 text-primary" />}
                        <span className="text-sm text-foreground/70">{badge.text}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Right Column - Pricing & CTA */}
              <motion.div variants={staggerItem}>
                <MagicCard className="flex flex-col justify-between h-full p-6">
                  <div className="space-y-8">
                    {/* Countdown Timer */}
                    {endDate && (
                      <div className="space-y-2 text-center">
                        <p className="text-sm font-medium text-foreground/70">
                          Tato nabídka vyprší za:
                        </p>
                        <div className="flex justify-center gap-2 text-foreground">
                          <div className="flex flex-col items-center rounded-md bg-primary/10 p-2">
                            <span className="text-2xl font-bold">{timeLeft.days}</span>
                            <span className="text-xs">Dní</span>
                          </div>
                          <div className="flex flex-col items-center rounded-md bg-primary/10 p-2">
                            <span className="text-2xl font-bold">{timeLeft.hours}</span>
                            <span className="text-xs">Hodin</span>
                          </div>
                          <div className="flex flex-col items-center rounded-md bg-primary/10 p-2">
                            <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                            <span className="text-xs">Minut</span>
                          </div>
                          <div className="flex flex-col items-center rounded-md bg-primary/10 p-2">
                            <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                            <span className="text-xs">Sekund</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pricing */}
                    {originalPrice && discountPrice && (
                      <div className="space-y-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg text-foreground/70 line-through">
                            {originalPrice} {currency || 'Kč'}
                          </span>
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {discountPercentage}% SLEVA
                          </span>
                        </div>
                        <div className="text-4xl font-bold text-foreground">
                          {discountPrice} {currency || 'Kč'}
                        </div>
                      </div>
                    )}

                    {/* Package Details */}
                    {packageDetails && (
                      <div className="mt-6 bg-background/50 rounded-lg border border-border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <Camera className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">{packageDetails.title}</h3>
                        </div>

                        <ul className="space-y-3">
                          {packageDetails.features &&
                            packageDetails.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-primary shrink-0" />
                                <span>{feature.text}</span>
                              </li>
                            ))}
                          {packageDetails.additionalFeeText && (
                            <li className="flex items-center gap-2 text-sm">
                              <Info className="h-4 w-4 text-primary shrink-0" />
                              <span>{packageDetails.additionalFeeText}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6 space-y-4">
                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      {primaryCTA && (
                        <Button
                          size="lg"
                          className="w-full text-lg group"
                          href={primaryCTA.href || '#'}
                        >
                          {primaryCTA.text}
                          <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      )}

                      {secondaryCTA && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full text-lg"
                          href={secondaryCTA.href || '#'}
                        >
                          {secondaryCTA.text}
                        </Button>
                      )}
                    </div>

                    {/* Urgency Text */}
                    {urgencyText && (
                      <div className="flex items-center justify-center gap-2 text-sm text-foreground/70">
                        <Clock className="h-4 w-4" />
                        <span>{urgencyText}</span>
                      </div>
                    )}
                  </div>
                </MagicCard>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
