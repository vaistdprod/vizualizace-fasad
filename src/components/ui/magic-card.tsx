// src/components/ui/magic-card.tsx
'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import React, { useCallback, useEffect, useRef } from 'react'

import { cn } from '@/utilities/ui'

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = 'hsl(var(--foreground))',
  gradientOpacity = 0.03,
  gradientFrom = 'hsl(var(--primary) / 0.5)', // Primary color
  gradientTo = 'hsl(var(--accent) / 0.5)', // Accent color (gold)
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect()
        const clientX = e.clientX
        const clientY = e.clientY
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
      }
    },
    [mouseX, mouseY],
  )

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!e.relatedTarget) {
        document.removeEventListener('mousemove', handleMouseMove)
        mouseX.set(-gradientSize)
        mouseY.set(-gradientSize)
      }
    },
    [handleMouseMove, mouseX, gradientSize, mouseY],
  )

  const handleMouseEnter = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove)
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [handleMouseMove, mouseX, gradientSize, mouseY])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [handleMouseEnter, handleMouseMove, handleMouseOut])

  useEffect(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [gradientSize, mouseX, mouseY])

  return (
    <div ref={cardRef} className={cn('group relative flex size-full rounded-xl', className)}>
      <div className="absolute inset-px z-10 rounded-xl bg-background" />
      <div
        className={cn(
          'relative z-30 w-full',
          className?.includes('flex-col') && 'flex flex-col h-full',
        )}
      >
        {children}
      </div>
      <motion.div
        className="pointer-events-none absolute inset-px z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl bg-border duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientFrom}, 
              ${gradientTo}, 
              hsl(var(--border)) 100%
            )
          `,
        }}
      />
    </div>
  )
}
