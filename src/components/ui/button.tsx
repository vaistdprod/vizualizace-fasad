'use client'

import React, { MouseEvent, useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer shadow-xs ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ripple:
          'relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-b from-background to-background/90 text-primary hover:from-primary/5 hover:to-primary/10 hover:text-primary/90 hover:border-primary/30 shadow-sm hover:shadow transition-all duration-300 ease-out backdrop-blur-xs',
      },
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded-md px-8',
        sm: 'h-9 rounded-md px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  rippleColor?: string
  rippleDuration?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      variant,
      size,
      rippleColor = 'hsl(var(--primary) / 0.25)',
      rippleDuration = '800ms',
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([])

    // Function to remove a ripple by its key
    const removeRipple = (rippleKey: number) => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.key !== rippleKey))
    }

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.5
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = { x, y, size, key: Date.now() }
      setRipples((prevRipples) => [...prevRipples, newRipple])
    }

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (variant === 'ripple') {
        createRipple(event)
      }
      onClick?.(event)
    }

    useEffect(() => {
      if (ripples.length > 0 && variant === 'ripple') {
        const lastRipple = ripples[ripples.length - 1]
        if (lastRipple) {
          const timeout = setTimeout(() => removeRipple(lastRipple.key), parseInt(rippleDuration))
          return () => clearTimeout(timeout)
        }
      }
    }, [ripples, rippleDuration, variant])

    const Comp = asChild ? Slot : 'button'

    // When asChild is true, we need to handle the children differently
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    // Regular button with our custom styling
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'ripple' && (
          <span className="pointer-events-none absolute inset-0">
            {ripples.map((ripple) => (
              <span
                key={ripple.key}
                className="absolute animate-rippling rounded-full opacity-40"
                style={{
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  transform: `scale(0)`,
                  ['--duration' as string]: rippleDuration,
                }}
              />
            ))}
          </span>
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
