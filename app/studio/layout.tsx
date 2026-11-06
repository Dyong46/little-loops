import type { ReactNode } from "react"

// Studio has its own root layout, outside the localized storefront.
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
