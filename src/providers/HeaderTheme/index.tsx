'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, useContext, useState } from 'react'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: 'light',
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Always use light theme
  const [headerTheme] = useState<Theme>('light')

  const setHeaderTheme = useCallback((_themeToSet: Theme | null) => {
    // Do nothing - we only support light theme
  }, [])

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export const useHeaderTheme = (): ContextType => useContext(HeaderThemeContext)
