"use client"

import { useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Languages } from "lucide-react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations("Language")
  const pathname = usePathname()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <label className="language-switcher" aria-busy={pending}>
      <Languages aria-hidden="true" className="size-4" />
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        disabled={pending}
        onChange={(event) => {
          const nextLocale = event.target
            .value as (typeof routing.locales)[number]
          startTransition(() => {
            router.replace(
              `${pathname}${window.location.search}${window.location.hash}`,
              { locale: nextLocale, scroll: false }
            )
          })
        }}
      >
        <option value="en" lang="en" label="EN">
          English
        </option>
        <option value="vi" lang="vi" label="VI">
          Tiếng Việt
        </option>
      </select>
      <span className="sr-only" role="status">
        {pending ? t("changing") : ""}
      </span>
    </label>
  )
}
