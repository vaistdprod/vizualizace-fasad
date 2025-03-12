'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/types'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<string>('')

  // Load initial theme from local storage
  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  // Toggle between light and dark (ignoring auto for simplicity)
  const toggleTheme = () => {
    const newTheme = value === 'dark' ? 'light' : 'dark'
    setTheme(newTheme as Theme)
    setValue(newTheme)
    // Update localStorage to persist the theme preference
    window.localStorage.setItem(themeLocalStorageKey, newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Přepnout motiv"
      className="transition-colors shadow-none hover:bg-transparent hover:text-current"
      data-theme={value}
    >
      <div className="relative">
        <Sun
          className={`h-5 w-5 transition-all dark:text-gray-700 ${
            value === 'dark' ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`absolute top-0 left-0 h-5 w-5 transition-all dark:text-gray-300 ${
            value === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
          }`}
        />
      </div>
    </Button>
  )
}
