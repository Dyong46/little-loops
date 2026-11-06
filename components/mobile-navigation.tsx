"use client"

import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useIsPresent } from "motion/react"
import { useShopReducedMotion } from "@/hooks/use-shop-reduced-motion"
import { useTranslations } from "next-intl"
import { Menu } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function MobileNavigation({ children }: { children: ReactNode }) {
  const t = useTranslations("Navigation")
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setOpen(false)
    }
    document.addEventListener("pointerdown", dismiss)
    return () => document.removeEventListener("pointerdown", dismiss)
  }, [open])

  return (
    <div
      ref={root}
      className="mobile-nav"
      data-open={open}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault()
          setOpen(false)
          trigger.current?.focus()
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={`${buttonVariants({ variant: "ghost" })} mobile-nav-toggle`}
        aria-label={t(open ? "close" : "open")}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
      >
        <Menu aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <NavigationPanel id={id} close={() => setOpen(false)}>
            {children}
          </NavigationPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavigationPanel({
  id,
  close,
  children,
}: {
  id: string
  close: () => void
  children: ReactNode
}) {
  const t = useTranslations("Navigation")
  const present = useIsPresent()
  const reducedMotion = useShopReducedMotion()
  return (
    <motion.nav
      id={id}
      aria-label={t("label")}
      inert={!present}
      initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
      transition={{
        duration: reducedMotion ? 0 : 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a"))
          close()
      }}
    >
      {children}
    </motion.nav>
  )
}
