'use client'

import React, { MouseEvent, useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium cursor-pointer shadow-xs ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        rainbow:
          'group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2 font-medium text-primary-foreground border-0 [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(0.8*1rem))] bg-[linear-gradient(hsl(var(--primary)/0.9),hsl(var(--primary)/0.9)),linear-gradient(hsl(var(--primary)/0.9)_50%,hsla(var(--primary)/0.45)_80%,hsla(var(--primary)/0)),linear-gradient(90deg,transparent,transparent)]',
        ripple:
          'relative overflow-hidden border border-border bg-background hover:bg-card hover:text-accent-foreground',
      },
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3',
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
      rippleColor = 'hsl(var(--primary) / 0.2)',
      rippleDuration = '600ms',
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
                className="absolute animate-rippling rounded-full opacity-30"
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
