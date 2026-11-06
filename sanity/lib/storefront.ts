import "server-only"

import { cache } from "react"
import type { CatalogProduct, Category, ContactChannel } from "@/lib/shop"
import { client } from "./client"
import { urlFor } from "./image"
import { STOREFRONT_QUERY } from "./queries"

const storefrontClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
})

function contactUrl(value: string | null | undefined) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === "https:" ? url.href : undefined
  } catch {
    return undefined
  }
}

export const getStorefront = cache(async (locale: "vi" | "en") => {
  const data = await storefrontClient.fetch(
    STOREFRONT_QUERY,
    { locale },
    {
      perspective: "published",
      stega: false,
      next: { revalidate: 60, tags: ["storefront"] },
    }
  )
  const categories: Category[] = data.categories.map((category) => ({
    ...category,
    kind: category.kind ?? "gifts",
    image: category.image?.asset
      ? urlFor(category.image).width(900).auto("format").url()
      : null,
  }))
  const products: CatalogProduct[] = data.products.map((product) => ({
    ...product,
    image: product.image?.asset
      ? urlFor(product.image).width(1200).auto("format").url()
      : null,
  }))
  const channels: ContactChannel[] = [
    { name: "Zalo", url: contactUrl(data.settings?.zaloUrl) },
    { name: "Messenger", url: contactUrl(data.settings?.messengerUrl) },
    { name: "Instagram", url: contactUrl(data.settings?.instagramUrl) },
  ]
  return { categories, products, channels }
})
