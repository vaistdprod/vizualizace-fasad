// Shared animation utilities for consistent animations across components

import { Variants } from 'framer-motion'

// Smooth fade in animation with subtle upward movement
// This is our primary animation for most content blocks
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth, elegant motion
    },
  },
}

// Simple fade in animation without movement
// Used for backgrounds, overlays, and elements where vertical movement isn't desired
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Staggered container animation
// Used to create cascading animations for child elements
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Slightly faster stagger for more elegance
      delayChildren: 0.1, // Small delay before children start animating
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Staggered item animation with subtle upward movement
// Used for items within a staggered container
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Subtle scale animation for hover effects
export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Animation for elements entering from the left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Animation for elements entering from the right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Default viewport configuration for all animations
export const defaultViewport = { once: true, margin: '-50px' }
