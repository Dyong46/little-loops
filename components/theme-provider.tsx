"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = Exclude<Theme, "system">

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  enableSystem?: boolean
  storageKey?: string
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)
const themeChangeEvent = "little-loops-theme-change"
const sessionThemes = new Map<string, Theme>()

function systemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function storedTheme(
  storageKey: string,
  defaultTheme: Theme,
  enableSystem: boolean
): Theme {
  try {
    const savedTheme = window.localStorage.getItem(storageKey)
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme
    if (enableSystem && savedTheme === "system") return savedTheme
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
  return sessionThemes.get(storageKey) ?? defaultTheme
}

function ThemeProvider({
  children,
  defaultTheme = "light",
  enableSystem = false,
  storageKey = "little-loops-theme",
}: ThemeProviderProps) {
  const subscribeToTheme = React.useCallback(
    (onStoreChange: () => void) => {
      function onStorage(event: StorageEvent) {
        if (event.key === storageKey) onStoreChange()
      }
      window.addEventListener("storage", onStorage)
      window.addEventListener(themeChangeEvent, onStoreChange)
      return () => {
        window.removeEventListener("storage", onStorage)
        window.removeEventListener(themeChangeEvent, onStoreChange)
      }
    },
    [storageKey]
  )
  const getTheme = React.useCallback(
    () => storedTheme(storageKey, defaultTheme, enableSystem),
    [defaultTheme, enableSystem, storageKey]
  )
  const theme = React.useSyncExternalStore(
    subscribeToTheme,
    getTheme,
    () => defaultTheme
  )
  const subscribeToSystem = React.useCallback((onStoreChange: () => void) => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", onStoreChange)
    return () => media.removeEventListener("change", onStoreChange)
  }, [])
  const currentSystemTheme = React.useSyncExternalStore(
    subscribeToSystem,
    systemTheme,
    (): ResolvedTheme => "light"
  )
  const resolvedTheme = theme === "system" ? currentSystemTheme : theme

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      if (nextTheme === "system" && !enableSystem) return
      sessionThemes.set(storageKey, nextTheme)
      try {
        window.localStorage.setItem(storageKey, nextTheme)
      } catch {
        // The selected theme still applies for this session.
      }
      window.dispatchEvent(new Event(themeChangeEvent))
    },
    [enableSystem, storageKey]
  )

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <ThemeHotkey />
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.key.toLowerCase() !== "d" ||
        isTypingTarget(event.target)
      ) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider, useTheme }
