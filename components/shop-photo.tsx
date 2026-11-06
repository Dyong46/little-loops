import Image from "next/image"

export function ShopPhoto({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: {
  src?: string | null
  alt: string
  className?: string
  sizes?: string
}) {
  return (
    <div className={`shop-photo ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <span
          role="img"
          aria-label={alt}
          className="absolute inset-0 bg-secondary"
        />
      )}
    </div>
  )
}
