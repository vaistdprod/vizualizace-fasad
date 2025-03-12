'use client'

import React, { MouseEvent, useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link, { LinkProps as NextLinkProps } from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline:
          'border border-border bg-background hover:bg-card hover:text-accent-foreground dark:hover:text-primary relative overflow-hidden',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
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
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: NextLinkProps['href']
  rippleColor?: string // Optional override for ripple color
  rippleDuration?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      variant,
      size,
      href,
      rippleColor, // Allow custom ripple color, otherwise we'll set defaults per variant
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

    const removeRipple = (rippleKey: number) => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.key !== rippleKey))
    }

    const createRipple = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      const element = event.currentTarget
      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.5
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = { x, y, size, key: Date.now() }
      setRipples((prevRipples) => [...prevRipples, newRipple])
    }

    const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (variant === 'default' || variant === 'outline') {
        createRipple(event)
      }
      onClick?.(event)
    }

    useEffect(() => {
      if (ripples.length > 0 && (variant === 'default' || variant === 'outline')) {
        const lastRipple = ripples[ripples.length - 1]
        if (lastRipple) {
          const timeout = setTimeout(() => removeRipple(lastRipple.key), parseInt(rippleDuration))
          return () => clearTimeout(timeout)
        }
      }
    }, [ripples, rippleDuration, variant])

    // Determine ripple color based on variant, with override option
    const effectiveRippleColor =
      rippleColor ||
      (variant === 'default'
        ? 'hsl(var(--primary) / 0.3)' // Slightly opaque primary for default
        : variant === 'outline'
          ? 'hsl(var(--border) / 0.4)' // Border-tinted for outline
          : 'transparent') // No ripple for other variants

    // Common ripple JSX to avoid duplication
    const rippleElements =
      (variant === 'default' || variant === 'outline') && ripples.length > 0 ? (
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
                backgroundColor: effectiveRippleColor,
                transform: `scale(0)`,
                ['--duration' as string]: rippleDuration,
              }}
            />
          ))}
        </span>
      ) : null

    // If href is provided, render as a Next.js Link
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          onClick={handleClick}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span className="relative z-10 inline-flex items-center">{children}</span>
          {rippleElements}
        </Link>
      )
    }

    // Otherwise, use the original button or asChild logic
    const Comp = asChild ? Slot : 'button'

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={handleClick}
          {...props}
        >
          {children}
          {rippleElements}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center">{children}</span>
        {rippleElements}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
