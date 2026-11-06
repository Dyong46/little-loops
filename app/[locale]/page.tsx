import type { Metadata } from "next"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Flower2,
  Heart,
  Camera as Instagram,
  Leaf,
  Package,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { ContactButton } from "@/components/shop-interactions"
import { ShopMotion } from "@/components/shop-motion"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ProductCollections } from "@/components/product-collections"
import { ShopPhoto } from "@/components/shop-photo"
import { shop } from "@/lib/shop"

async function Logo({ footer = false }: { footer?: boolean }) {
  const t = await getTranslations("Home")
  return (
    <Link
      href="/"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label={t("logoAlt")}
    >
      <span className="brand-mark" aria-hidden="true">
        <Flower2 strokeWidth={1.15} />
        <span />
      </span>
      <span>
        little loops<span className="brand-caption">{t("brandCaption")}</span>
      </span>
    </Link>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", vi: "/vi", "x-default": "/en" },
    },
    openGraph: {
      title: t("socialTitle"),
      description: t("description"),
      url: `/${locale}`,
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: [locale === "vi" ? "en_US" : "vi_VN"],
      images: [
        {
          url: "/images/crochet-hero.png",
          width: 1536,
          height: 1024,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/crochet-hero.png"],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations("Home")
  const nav = [
    { label: t("navCollection"), href: "#collection" },
    { label: t("navStory"), href: "#story" },
    { label: t("navCustom"), href: "#custom" },
  ]
  const instagram = shop.channels.find(
    (channel) => channel.name === "Instagram"
  )?.url

  return (
    <>
      <a href="#main" className="skip-link">
        {t("skip")}
      </a>
      <div className="announcement">
        <Heart className="size-3" aria-hidden="true" />
        {t("announcement")} <Heart className="size-3" aria-hidden="true" />
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <Logo />
          <nav aria-label={t("navLabel")} className="desktop-nav">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-contact">
            <ContactButton label={t("hello")} className="header-hello" />
          </div>
          <LanguageSwitcher />
          <MobileNavigation>
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#contact">
              {t("hello")}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </MobileNavigation>
        </div>
      </header>
      <main id="main">
        <ShopMotion />
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-line" />
              {t("heroEyebrow")}
            </span>
            <h1 id="hero-title" data-motion-hero>
              {t("heroStart")}
              <br />
              {t("heroMiddle")}{" "}
              <span className="hero-love">
                {t("heroEnd")}
                <svg viewBox="0 0 300 16" aria-hidden="true">
                  <path d="M3 11 Q110 -2 294 7 M20 15 Q150 3 273 12" />
                </svg>
              </span>
            </h1>
            <p data-motion-hero>
              {t("heroDescription1")}
              <br className="hidden lg:block" /> {t("heroDescription2")}
              <br className="hidden lg:block" /> {t("heroDescription3")}
            </p>
            <div className="hero-actions" data-motion-hero>
              <a
                href="#collection"
                className={`${buttonVariants()} shop-button`}
              >
                {t("explore")}
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="#custom" className="text-link">
                {t("personal")}{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="little-hearts" aria-hidden="true">
                <Heart />
                <Heart />
                <Heart />
              </span>
              <span>{t("heroFootnote")}</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <Image
                src="/images/crochet-hero.png"
                alt={t("heroAlt")}
                fill
                preload
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="handmade-seal" aria-label={t("sealAlt")}>
              <Heart aria-hidden="true" />
              <span>{t("sealTop")}</span>
              <strong>{t("sealMiddle")}</strong>
              <span className="seal-bottom">{t("sealBottom")}</span>
            </div>
            <span className="hero-note">
              {t("heroNote")} <Heart aria-hidden="true" className="size-4" />
            </span>
            <Sparkles
              className="hero-sparkle"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        </section>
        <div className="values-strip">
          <div className="values-inner container">
            <span>
              <Heart aria-hidden="true" />
              {t("value1")}
            </span>
            <span>
              <Leaf aria-hidden="true" />
              {t("value2")}
            </span>
            <span>
              <Sparkles aria-hidden="true" />
              {t("value3")}
            </span>
            <span>
              <Package aria-hidden="true" />
              {t("value4")}
            </span>
          </div>
        </div>
        <ProductCollections />
        <section
          id="story"
          className="story-section container"
          aria-labelledby="story-title"
        >
          <div className="story-visual" data-motion-reveal>
            <div className="story-photo">
              <Image
                src="/images/crochet-hero.png"
                alt={t("storyAlt")}
                fill
                sizes="(max-width: 767px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="story-caption">
              <Scissors aria-hidden="true" className="size-5" />
              <span>{t("storyCaption")}</span>
            </div>
          </div>
          <div className="story-copy" data-motion-reveal>
            <span className="eyebrow">{t("storyEyebrow")}</span>
            <h2 id="story-title">
              {t("storyLine1")}
              <br />
              {t("storyLine2")}
              <br />
              <em>{t("storyLine3")}</em>
            </h2>
            <p>{t("storyParagraph1")}</p>
            <p>{t("storyParagraph2")}</p>
            <a href="#custom" className="text-link">
              {t("storyCta")}{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <span className="story-signature">
              {t("signature")} <Heart aria-hidden="true" className="size-5" />
            </span>
          </div>
        </section>
        <section
          id="custom"
          className="custom-section container"
          aria-labelledby="custom-title"
        >
          <div className="custom-card" data-motion-reveal>
            <div className="custom-copy">
              <span className="eyebrow">{t("customEyebrow")}</span>
              <h2 id="custom-title">
                {t("customStart")} <em>{t("customEnd")}</em>
              </h2>
              <p>{t("customDescription")}</p>
              <ContactButton
                subject={t("customSubject")}
                label={t("customCta")}
              />
              <span className="custom-fineprint">{t("customNote")}</span>
            </div>
            <div className="custom-decoration">
              <Flower2
                aria-hidden="true"
                strokeWidth={1}
                className="custom-flower"
              />
              <ShopPhoto
                item="flowers"
                alt={t("customAlt")}
                sizes="(max-width: 767px) 100vw, 60vw"
              />
              <span className="custom-sticker">
                {t("stickerStart")}
                <br />
                <em>{t("stickerEnd")}</em>
              </span>
            </div>
          </div>
        </section>
        <section
          className="testimonial-section container"
          aria-labelledby="testimonial-title"
        >
          <div className="center-heading" data-motion-reveal>
            <span className="eyebrow">{t("reviewsEyebrow")}</span>
            <h2 id="testimonial-title">{t("reviewsTitle")}</h2>
            <p className="sample-note">{t("reviewsNote")}</p>
          </div>
          <div className="testimonial-grid" data-motion-grid>
            {[
              {
                quote: t("reviewQuote1"),
                name: t("reviewName1"),
                item: t("reviewItem1"),
              },
              {
                quote: t("reviewQuote2"),
                name: t("reviewName2"),
                item: t("reviewItem2"),
              },
              {
                quote: t("reviewQuote3"),
                name: t("reviewName3"),
                item: t("reviewItem3"),
              },
            ].map((review) => (
              <figure className="testimonial" key={review.name}>
                <div className="review-stars" aria-label={t("reviewRating")}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className="size-3.5 fill-current"
                    />
                  ))}
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <figcaption>
                  <span className="review-avatar" aria-hidden="true">
                    <Flower2 strokeWidth={1} />
                  </span>
                  <span>
                    <strong>{review.name}</strong>
                    <span>
                      {review.item}
                      {t("sampleStory")}
                    </span>
                  </span>
                  <Heart aria-hidden="true" className="review-heart size-4" />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section
          id="instagram"
          className="instagram-section"
          aria-labelledby="instagram-title"
        >
          <div className="container">
            <div className="section-heading" data-motion-reveal>
              <div>
                <span className="eyebrow">{t("instagramEyebrow")}</span>
                <h2 id="instagram-title">{t("instagramTitle")}</h2>
              </div>
              {instagram ? (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  <Instagram aria-hidden="true" className="size-4" />
                  {t("instagramCta")}{" "}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              ) : (
                <ContactButton
                  label={t("followCta")}
                  className="instagram-button"
                />
              )}
            </div>
            <div className="instagram-grid" data-motion-grid>
              {["flowers", "bunny", "bag", "bear", "flowers"].map(
                (item, index) => (
                  <div
                    className={`gallery-image gallery-${index}`}
                    key={`${item}-${index}`}
                  >
                    <ShopPhoto
                      item={item}
                      alt={
                        [
                          t("galleryAlt1"),
                          t("galleryAlt2"),
                          t("galleryAlt3"),
                          t("galleryAlt4"),
                          t("galleryAlt5"),
                        ][index]
                      }
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                    <span>
                      <Instagram aria-hidden="true" className="size-5" />
                    </span>
                  </div>
                )
              )}
            </div>
            <p className="sample-note">{t("instagramNote")}</p>
          </div>
        </section>
        <section
          id="contact"
          className="closing-section container"
          data-motion-reveal
        >
          <Flower2 aria-hidden="true" strokeWidth={1} />
          <h2>{t("closingTitle")}</h2>
          <p>{t("closingDescription")}</p>
          <ContactButton label={t("closingCta")} />
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-main container">
          <div>
            <Logo footer />
            <p>
              {t("footerLine1")}
              <br />
              {t("footerLine2")}
            </p>
          </div>
          <div>
            <h2>{t("footerExplore")}</h2>
            <a href="#collection">{t("navCollection")}</a>
            <a href="#story">{t("navStory")}</a>
            <a href="#custom">{t("footerCustom")}</a>
          </div>
          <div>
            <h2>{t("footerSocial")}</h2>
            {shop.channels.map((channel) =>
              channel.url ? (
                <a
                  href={channel.url}
                  key={channel.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {channel.name}{" "}
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              ) : (
                <span className="footer-channel" key={channel.name}>
                  {channel.name} <span>{t("comingSoon")}</span>
                </span>
              )
            )}
          </div>
          <div className="footer-note">
            <Heart aria-hidden="true" strokeWidth={1.2} />
            <p>
              {t("footerNote1")}
              <br />
              <em>{t("footerNote2")}</em>
            </p>
            <a href="#main" className="text-link">
              {t("backTop")}{" "}
              <ArrowDown className="size-3 rotate-180" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>
            © {new Date().getFullYear()} {t("copyright")}
          </span>
          <span>
            {t("preview")} <Heart aria-hidden="true" className="size-3" />
          </span>
        </div>
      </footer>
      <ContactButton floating />
    </>
  )
}
