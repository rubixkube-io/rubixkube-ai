'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  resolvedTheme: 'light',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * Dark mode deferred — site ships warm light theme only.
 * Always applies `light` on html for consistent tokens.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme] = useState<Theme>('light')
  const [resolvedTheme] = useState<'light'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('dark')
    root.classList.add('light')
  }, [])

  const value = {
    theme,
    setTheme: () => {},
    resolvedTheme: resolvedTheme as 'light' | 'dark',
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
