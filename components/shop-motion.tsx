"use client"

import { useEffect } from "react"
import { animate, inView } from "motion/react"
import { useShopReducedMotion } from "@/hooks/use-shop-reduced-motion"

// One rhythm for entrances; micro-interactions share CSS tokens in globals.css.
const entrance = { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const }
const revealed = new WeakSet<Element>()

/** Progressive enhancement of server-rendered markup; no layout wrappers. */
export function ShopMotion() {
  const reducedMotion = useShopReducedMotion()

  useEffect(() => {
    const root = document.getElementById("main")
    if (!root || reducedMotion !== false) return

    const cleanups: (() => void)[] = []
    const pending = new Set<HTMLElement>()
    const active = new Map<HTMLElement, () => void>()

    function reveal(element: HTMLElement, delay = 0, image = false) {
      if (revealed.has(element) || active.has(element)) return
      pending.delete(element)
      const originalOpacity = element.style.opacity
      const originalTransform = element.style.transform
      const controls = animate(
        element,
        image
          ? { opacity: [0.65, 1], scale: [1.015, 1] }
          : { opacity: [0, 1], y: [16, 0] },
        { ...entrance, duration: image ? 0.65 : entrance.duration, delay }
      )
      // Restore authored styles so CSS hover transforms remain independent.
      const restore = () => {
        element.style.opacity = originalOpacity
        element.style.transform = originalTransform
      }
      let cancelled = false
      active.set(element, () => {
        controls.complete()
        revealed.add(element)
        restore()
      })
      void controls.then(() => {
        active.delete(element)
        if (!cancelled) {
          revealed.add(element)
          restore()
        }
      })
      cleanups.push(() => {
        cancelled = true
        controls.stop()
        restore()
      })
    }

    // The hero remains visible in the HTML, including when JavaScript is off.
    root
      .querySelectorAll<HTMLElement>("[data-motion-hero]")
      .forEach((element, index) => reveal(element, index * 0.08))
    const heroImage = root.querySelector<HTMLElement>(".hero-image")
    if (heroImage) reveal(heroImage, 0.08, true)

    function observe(element: HTMLElement, delay = 0) {
      if (revealed.has(element)) return
      const start = () => reveal(element, delay)
      pending.add(element)
      // No hidden initial styles: content cannot get stranded by delayed JS,
      // an unsupported observer, deep links, or a focus jump.
      cleanups.push(inView(element, start, { amount: 0.12 }))
    }

    root
      .querySelectorAll<HTMLElement>("[data-motion-reveal]")
      .forEach((element) => observe(element))
    root.querySelectorAll<HTMLElement>("[data-motion-grid]").forEach((grid) => {
      const columns =
        getComputedStyle(grid).gridTemplateColumns.split(" ").length
      Array.from(grid.children).forEach((child, index) => {
        if (child instanceof HTMLElement)
          observe(child, (index % columns) * 0.07)
      })
    })

    const floatingContact = document.querySelector<HTMLElement>(
      "[data-motion-contact]"
    )
    // Keep the actual touch target fixed on mobile Safari.
    if (
      floatingContact &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      reveal(floatingContact, 0.24)
    }

    // Focus is never held behind a reveal or its stagger delay.
    const showFocusedContent = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return
      for (const element of pending) {
        if (element.contains(event.target)) {
          revealed.add(element)
          pending.delete(element)
        }
      }
      for (const [element, complete] of active) {
        if (element.contains(event.target)) complete()
      }
    }
    root.addEventListener("focusin", showFocusedContent)
    return () => {
      root.removeEventListener("focusin", showFocusedContent)
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [reducedMotion])

  return null
}
