import Image from "next/image"

const positions: Record<string, string> = {
  bunny: "top-left",
  flowers: "top-right",
  bag: "bottom-left",
  bear: "bottom-right",
}

export function ShopPhoto({
  item,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: {
  item: string
  alt: string
  className?: string
  sizes?: string
}) {
  return (
    <div className={`shop-photo ${className}`}>
      <Image
        src="/images/crochet-collection.png"
        alt={alt}
        fill
        sizes={sizes}
        className={`catalog-photo ${positions[item] || "top-left"}`}
      />
    </div>
  )
}
