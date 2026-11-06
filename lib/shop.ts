export const shop = {
  name: "Little Loops",
  channels: [
    {
      name: "Zalo",
      url: process.env.NEXT_PUBLIC_ZALO_URL,
      detail: "A little hello, a lovely new creation.",
    },
    {
      name: "Messenger",
      url: process.env.NEXT_PUBLIC_MESSENGER_URL,
      detail: "Tell us what you have in mind.",
    },
    {
      name: "Instagram",
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      detail: "Find inspiration and say hello.",
    },
  ],
}

export const categories = [
  {
    id: "plushies",
    name: "Cuddly friends",
    subtitle: "Plushies",
    image: "bunny",
  },
  {
    id: "flowers",
    name: "Forever flowers",
    subtitle: "Flowers",
    image: "flowers",
  },
  { id: "bags", name: "Everyday lovely", subtitle: "Bags", image: "bag" },
  {
    id: "keychains",
    name: "Little companions",
    subtitle: "Keychains",
    image: "bear",
  },
  {
    id: "gifts",
    name: "Just for you",
    subtitle: "Personalized gifts",
    image: "flowers",
  },
]

export const products = [
  {
    id: "bunny",
    name: "Rosie the little bunny",
    category: "plushies",
    description:
      "A soft little friend with floppy ears and a blush scarf. Choose a color to make Rosie your own.",
    price: "280,000₫",
    image: "bunny",
    note: "A little favorite",
    color: "blush",
  },
  {
    id: "flowers",
    name: "A pocketful of tulips",
    category: "flowers",
    description:
      "A bouquet of crochet tulips that stays lovely. Pick your favorite shades and the number of stems.",
    price: "180,000₫",
    image: "flowers",
    note: "Made to make them smile",
    color: "sage",
  },
  {
    id: "bag",
    name: "Sunday market bag",
    category: "bags",
    description:
      "An easygoing crochet companion for slow mornings and everyday adventures. Ask us about colors and sizing.",
    price: "350,000₫",
    image: "bag",
    note: "For your everyday",
    color: "beige",
  },
  {
    id: "bear",
    name: "Tiny bear, big heart",
    category: "keychains",
    description:
      "A tiny crochet bear to carry a little joy on your keys or bag. Personalize with your favorite color.",
    price: "95,000₫",
    image: "bear",
    note: "A thoughtful little gift",
    color: "blush",
  },
  {
    id: "gift",
    name: "Your own little keepsake",
    category: "gifts",
    description:
      "A personalized crochet keepsake inspired by your idea. Message us to discuss the design, timing, and quote.",
    price: "Quoted for you",
    image: "flowers",
    note: "One of a kind",
    color: "sage",
  },
]
export type Product = (typeof products)[number]
