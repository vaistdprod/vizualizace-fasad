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
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Přepnout motiv">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all data-[theme=dark]:-rotate-90 data-[theme=dark]:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all data-[theme=dark]:rotate-0 data-[theme=dark]:scale-100" />
    </Button>
  )
}
