"use client"

import { useTransition } from "react"
import { hasLocale, useLocale, useTranslations } from "next-intl"
import { Languages } from "lucide-react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations("Language")
  const pathname = usePathname()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <div className="language-switcher" aria-busy={pending}>
      <Select
        value={locale}
        disabled={pending}
        onValueChange={(nextLocale) => {
          if (!hasLocale(routing.locales, nextLocale) || nextLocale === locale)
            return
          startTransition(() => {
            router.replace(
              `${pathname}${window.location.search}${window.location.hash}`,
              { locale: nextLocale, scroll: false }
            )
          })
        }}
      >
        <SelectTrigger
          aria-label={t("label")}
          className="min-h-11 cursor-pointer bg-background text-xs"
        >
          <Languages aria-hidden="true" className="size-4" />
          <SelectValue>{locale.toUpperCase()}</SelectValue>
        </SelectTrigger>
        <SelectContent
          align="end"
          alignItemWithTrigger={false}
          className="motion-reduce:animate-none"
        >
          <SelectItem value="en" lang="en">
            English
          </SelectItem>
          <SelectItem value="vi" lang="vi">
            Tiếng Việt
          </SelectItem>
        </SelectContent>
      </Select>
      <span className="sr-only" role="status">
        {pending ? t("changing") : ""}
      </span>
    </div>
  )
}
