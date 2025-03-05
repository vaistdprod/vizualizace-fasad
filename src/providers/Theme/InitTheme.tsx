'use client'

import { useEffect } from 'react'

// This component initializes the theme to light mode only
export const InitTheme = () => {
  useEffect(() => {
    // Always set light theme
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  return null
}
