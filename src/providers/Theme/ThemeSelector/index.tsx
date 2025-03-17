// src/providers/Theme/ThemeSelector/index.tsx
'use client'

import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/types'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)

  // Load initial theme from local storage after mounting
  useEffect(() => {
    setIsMounted(true)
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  // Toggle between light and dark (ignoring auto for simplicity)
  const toggleTheme = () => {
    const newTheme = value === 'dark' ? 'light' : 'dark'
    setTheme(newTheme as Theme)
    setValue(newTheme)
  }

  // Don't render until the component is mounted
  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Přepnout motiv"
        data-theme="light" // Default to light until mounted
      >
        <Sun className="h-5 w-5 rotate-0 scale-100" />
        <Moon className="absolute h-5 w-5 -rotate-90 scale-0" />
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Přepnout motiv">
      <Sun
        className={clsx(
          'h-5 w-5 transition-transform duration-200 ease-in-out',
          value === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100',
        )}
      />
      <Moon
        className={clsx(
          'absolute h-5 w-5 transition-transform duration-200 ease-in-out',
          value === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0',
        )}
      />
    </Button>
  )
}
