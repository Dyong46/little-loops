"use client"

import { useState } from "react"
import { useFormatter, useTranslations } from "next-intl"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ShopPhoto } from "@/components/shop-photo"
import { ProductDetails, SaveProduct } from "@/components/shop-interactions"
import type { CatalogProduct, Category } from "@/lib/shop"

export function ProductCollections({
  categories,
  products: productData,
}: {
  categories: Category[]
  products: CatalogProduct[]
}) {
  const t = useTranslations("Catalog")
  const format = useFormatter()
  const products = productData.map((product) => ({
    ...product,
    price:
      product.amount === null
        ? t("quote")
        : format.number(product.amount, {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
          }),
  }))
  const giftCategory = categories.find((category) => category.kind === "gifts")
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  )
  const visibleProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory.id)
    : products.filter((product) => product.featured).slice(0, 4)

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
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 id="category-title">{t("title")}</h2>
          <p>{t("description")}</p>
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
                  src={category.image}
                  alt={category.imageAlt}
                  sizes="(max-width: 640px) 60vw, 30vw"
                />
              </div>
              <h3>{category.name}</h3>
              <span>
                {t(`kinds.${category.kind}`)}{" "}
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
              <span className="eyebrow">{t("collectionEyebrow")}</span>
              <h2 id="collection-title">
                {selectedCategory
                  ? selectedCategory.name
                  : t("collectionTitle")}
              </h2>
            </div>
            {(selectedCategory || giftCategory) && (
              <button
                type="button"
                onClick={() =>
                  selectCategory(
                    selectedCategory ? null : (giftCategory?.id ?? null)
                  )
                }
                className="text-link"
              >
                {selectedCategory ? t("viewAll") : t("gift")}{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="filter-row" aria-label={t("filter")}>
            <button
              type="button"
              onClick={() => selectCategory(null)}
              aria-pressed={!selectedCategory}
            >
              {t("all")}
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => selectCategory(category.id)}
                aria-pressed={selectedCategory?.id === category.id}
              >
                {t(`kinds.${category.kind}`)}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className={`product-image tone-${["blush", "sage", "beige"][categories.findIndex((category) => category.id === product.category) % 3] || "beige"}`}
                >
                  <ShopPhoto
                    src={product.image}
                    alt={product.imageAlt}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="product-tag">
                    {product.availability === "unavailable"
                      ? t("unavailable")
                      : t("handmadeTag")}
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
          {!visibleProducts.length && (
            <p className="sample-note" role="status">
              {t("empty")}
            </p>
          )}
          <p className="sample-note">
            {t(
              visibleProducts.some((product) => product.isSample)
                ? "sample"
                : "orderNote"
            )}
          </p>
        </div>
      </section>
    </>
  )
}
