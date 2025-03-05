import React from 'react'

// Simple providers component that just renders children
// No theme providers needed as we only use light theme
export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <>{children}</>
}
