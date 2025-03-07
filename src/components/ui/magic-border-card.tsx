'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import React, { useCallback, useEffect, useRef } from 'react'
import { BorderBeam } from './border-beam'
import { cn } from '@/utilities/ui'

interface MagicBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  borderBeamSize?: number
  borderBeamDuration?: number
  showBorderBeamOnHover?: boolean
}

export function MagicBorderCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = '#262626',
  gradientOpacity = 0.8,
  gradientFrom = '#74a9d6', // Baby blue
  gradientTo = '#8cd9b4', // Mint green
  borderBeamSize = 80,
  borderBeamDuration = 8,
  showBorderBeamOnHover = true,
  ...props
}: MagicBorderCardProps) {
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
    <div
      ref={cardRef}
      className={cn('group relative flex size-full rounded-2xl', className)}
      {...props}
    >
      <div className="absolute inset-px z-10 rounded-2xl bg-background" />
      <div className="relative z-30 w-full">{children}</div>

      {/* Magic Card gradient effect */}
      <motion.div
        className="pointer-events-none absolute inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-border duration-300 group-hover:opacity-100"
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

      {/* Border Beam effect */}
      <div className="absolute inset-0 z-20 overflow-hidden rounded-2xl">
        <BorderBeam
          size={borderBeamSize}
          duration={borderBeamDuration}
          colorFrom={gradientFrom}
          colorTo={gradientTo}
          className={cn(
            'absolute',
            showBorderBeamOnHover
              ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-500'
              : '',
          )}
        />
      </div>
    </div>
  )
}
