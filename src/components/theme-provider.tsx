'use client'

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyDomClass(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

function readStoredTheme(storageKey: string, fallback: Theme): Theme {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw === 'dark' || raw === 'light') return raw
  } catch {
    /* private mode / blocked */
  }
  return fallback
}

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

/**
 * Class-based theme on <html> (pairs with html.dark / tokens in globals.css).
 * Avoids next-themes SSR undefined state where applyTheme never runs until a full navigation.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'rubixkube-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  useLayoutEffect(() => {
    const next = readStoredTheme(storageKey, defaultTheme)
    setThemeState(next)
    applyDomClass(next)
  }, [storageKey, defaultTheme])

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next)
      try {
        localStorage.setItem(storageKey, next)
      } catch {
        /* ignore */
      }
      applyDomClass(next)
    },
    [storageKey],
  )

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme: theme,
      setTheme,
    }),
    [theme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
