export type ContactChannel = {
  name: "Zalo" | "Messenger" | "Instagram"
  url?: string
}

export type Category = {
  id: string
  kind: "plushies" | "flowers" | "bags" | "keychains" | "gifts"
  name: string
  image: string | null
  imageAlt: string
}

export type CatalogProduct = {
  id: string
  category: string
  image: string | null
  imageAlt: string
  name: string
  description: string
  note: string
  amount: number | null
  featured: boolean
  isSample: boolean
  availability: "madeToOrder" | "ready" | "unavailable"
}

export type Product = CatalogProduct & { price: string }
