export const shop = {
  name: "Little Loops",
  channels: [
    { name: "Zalo", url: process.env.NEXT_PUBLIC_ZALO_URL },
    { name: "Messenger", url: process.env.NEXT_PUBLIC_MESSENGER_URL },
    { name: "Instagram", url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  ],
}

export const categories = [
  {
    id: "plushies",
    image: "bunny",
  },
  {
    id: "flowers",
    image: "flowers",
  },
  {
    id: "bags",
    image: "bag",
  },
  {
    id: "keychains",
    image: "bear",
  },
  {
    id: "gifts",
    image: "flowers",
  },
]

export const products = [
  {
    id: "bunny",
    category: "plushies",
    image: "bunny",
    color: "blush",
    amount: 280000,
  },
  {
    id: "flowers",
    category: "flowers",
    image: "flowers",
    color: "sage",
    amount: 180000,
  },
  {
    id: "bag",
    category: "bags",
    image: "bag",
    color: "beige",
    amount: 350000,
  },
  {
    id: "bear",
    category: "keychains",
    image: "bear",
    color: "blush",
    amount: 95000,
  },
  {
    id: "gift",
    category: "gifts",
    image: "flowers",
    color: "sage",
    amount: null,
  },
]

export type Product = {
  id: string
  category: string
  image: string
  color: string
  name: string
  description: string
  note: string
  price: string
}
