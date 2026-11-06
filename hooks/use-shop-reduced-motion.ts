"use client"

import { useSyncExternalStore } from "react"
import { useReducedMotion } from "motion/react"

const query = "(prefers-reduced-motion: reduce)"
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query)
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", notify)
    return () => media.removeEventListener("change", notify)
  }
  // Older iOS Safari implements only the legacy MediaQueryList methods.
  media.addListener(notify)
  return () => media.removeListener(notify)
}
const getSnapshot = () => window.matchMedia(query).matches

export function useShopReducedMotion() {
  const motionPreference = useReducedMotion()
  // This installed Motion version snapshots the preference at mount. Subscribe
  // as well so changing the system setting immediately cancels running motion.
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => motionPreference ?? true
  )
}
