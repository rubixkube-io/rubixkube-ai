'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

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
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  resolvedTheme: 'light',
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const THEME_STORAGE_KEY = 'rubixkube-theme'

/**
 * Runs in <head> before first paint, so a saved choice never flashes the other theme.
 * Without a saved choice the site is light.
 */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light')}catch(e){}`

function systemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * The theme lives on <html data-theme="system|light|dark">; the tokens for each are in globals.css.
 * Light by default; D or the header toggle switches, and the choice is kept in this browser.
 */
export function ThemeProvider({ children, defaultTheme = 'light', storageKey = THEME_STORAGE_KEY }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [system, setSystem] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('dark')
    const current = root.getAttribute('data-theme')
    if (current === 'light' || current === 'dark') setThemeState(current)
    setSystem(systemTheme())
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystem(systemTheme())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next)
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem(storageKey, next)
      } catch {}
    },
    [storageKey],
  )

  const resolvedTheme = theme === 'system' ? system : theme
  const toggleTheme = useCallback(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'), [resolvedTheme, setTheme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, resolvedTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
