"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ShopPhoto } from "@/components/shop-photo"
import { ProductDetails, SaveProduct } from "@/components/shop-interactions"
import { categories, products } from "@/lib/shop"

export function ProductCollections() {
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  )
  const visibleProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory.id)
    : products.slice(0, 4)

  function selectCategory(id: string | null, scrollToCollection = false) {
    setCategoryId(id)
    if (scrollToCollection) {
      document.getElementById("collection")?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      })
    }
  }

  return (
    <>
      <section
        className="category-section container"
        aria-labelledby="category-title"
      >
        <div className="center-heading">
          <span className="eyebrow">FIND YOUR LITTLE JOY</span>
          <h2 id="category-title">A lovely little world of crochet.</h2>
          <p>For the cuddles, the everyday, and the just-because moments.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className="category-item"
              onClick={() => selectCategory(category.id, true)}
            >
              <div className={`category-image category-${index}`}>
                <ShopPhoto
                  item={category.image}
                  alt={`Handmade crochet ${category.subtitle.toLowerCase()}`}
                  sizes="(max-width: 640px) 60vw, 30vw"
                />
              </div>
              <h3>{category.name}</h3>
              <span>
                {category.subtitle}{" "}
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </section>
      <section
        id="collection"
        className="collection-section"
        aria-labelledby="collection-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FROM OUR HANDS TO YOUR HEART</span>
              <h2 id="collection-title">
                {selectedCategory
                  ? selectedCategory.name
                  : "Meet your new favorites."}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => selectCategory(selectedCategory ? null : "gifts")}
              className="text-link"
            >
              {selectedCategory ? "View all favorites" : "Find a personal gift"}{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
          <div className="filter-row" aria-label="Filter collection">
            <button
              type="button"
              onClick={() => selectCategory(null)}
              aria-pressed={!selectedCategory}
            >
              All the lovely things
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => selectCategory(category.id)}
                aria-pressed={selectedCategory?.id === category.id}
              >
                {category.subtitle}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-image tone-${product.color}`}>
                  <ShopPhoto
                    item={product.image}
                    alt={product.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="product-tag">
                    {product.id === "bunny"
                      ? "Much-loved little one"
                      : product.id === "flowers"
                        ? "Forever in bloom"
                        : "Handmade with love"}
                  </span>
                  <SaveProduct name={product.name} />
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-note">{product.note}</p>
                    <h3>{product.name}</h3>
                    <p className="product-price">{product.price}</p>
                  </div>
                  <ProductDetails product={product} />
                </div>
              </article>
            ))}
          </div>
          <p className="sample-note">
            A peek at what’s possible — illustrative products, imagery, and
            prices. Each piece is made to order.
          </p>
        </div>
      </section>
    </>
  )
}
