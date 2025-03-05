'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // Always use light theme
    setHeaderTheme('light')
  }, [setHeaderTheme])
  return <React.Fragment />
}

export default PageClient
