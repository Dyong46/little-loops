import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"

import "../globals.css"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toast"
import { QueryProvider } from "@/providers/query-provider"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000")
  ),
  robots: {
    index: Boolean(
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL
    ),
    follow: true,
  },
}

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-semibold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sans",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()
  const clientMessages = Object.fromEntries(
    ["Catalog", "Contact", "Navigation", "Language", "NotFound"].map((key) => [
      key,
      messages[key],
    ])
  )
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("font-sans antialiased", inter.variable)}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <QueryProvider>
            <ThemeProvider forcedTheme="light">
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
