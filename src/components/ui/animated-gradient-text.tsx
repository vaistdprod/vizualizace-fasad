import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/utilities/ui'

// Define the props interface without extending ComponentPropsWithoutRef directly
export interface AnimatedGradientTextProps<T extends ElementType = 'div'> {
  as?: T // Optional prop to specify the HTML element type
  children: ReactNode
  className?: string // Explicitly define className as an optional prop
}

// Function component with generic type T
export function AnimatedGradientText<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...restProps // Capture remaining props to spread onto the component
}: AnimatedGradientTextProps<T> & ComponentPropsWithoutRef<T>) {
  const Component = as || 'div' // Default to "div" if no `as` prop is provided

  return (
    <Component
      className={cn(
        'inline-flex items-center [--bg-size:300%] animate-gradient bg-linear-to-r from-[#ff4080] via-[#7a1f3d] to-[#ff4080] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent',
        className,
      )}
      {...restProps} // Spread remaining props
    >
      {children}
    </Component>
  )
}
