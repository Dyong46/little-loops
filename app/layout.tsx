import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from '@vercel/analytics/next';

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toast"
import { QueryProvider } from "@/providers/query-provider"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Little Loops | Handmade Crochet, Thoughtful Gifts",
  description:
    "Discover handmade crochet plushies, forever flowers, bags, keychains, and personalized gifts. Thoughtfully stitched, made with heart. Enquire directly with our little shop.",
  openGraph: {
    title: "Little Loops — Little things, made with big love.",
    description:
      "Handmade crochet treasures to keep close or gift to someone special.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/crochet-hero.png",
        width: 1536,
        height: 1024,
        alt: "Handmade crochet bunny and tulips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Little Loops | Handmade with Heart",
    images: ["/images/crochet-hero.png"],
  },
  robots: {
    index: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    follow: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  },
}

const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/inter-semibold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans antialiased", inter.variable)}
    >
      <body>
        <QueryProvider>
          <ThemeProvider forcedTheme="light">
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
