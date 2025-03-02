'use client'

import { cn } from '@/utilities/ui'
import * as React from 'react'

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[]
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = '#000000',
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          '--border-width': `${borderWidth}px`,
          '--duration': `${duration}s`,
          '--background-radial-gradient': `radial-gradient(transparent,transparent, ${Array.isArray(shineColor) ? shineColor.join(',') : shineColor},transparent,transparent)`,
          backgroundImage: 'var(--background-radial-gradient)',
          backgroundSize: '200% 200%', // Reduced for better visibility
          backgroundPosition: '0% 0%',
          backgroundRepeat: 'no-repeat',
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        'relative w-full h-full rounded-[inherit] p-[--border-width] will-change-[background-position] animate-shine',
        className,
      )}
      {...props}
    />
  )
}
