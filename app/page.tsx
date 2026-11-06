import Image from "next/image"
import Link from "next/link"
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

const nav = [
  { label: "The collection", href: "#collection" },
  { label: "Our little story", href: "#story" },
  { label: "Made for you", href: "#custom" },
]

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="Little Loops home"
    >
      <span className="brand-mark" aria-hidden="true">
        <Flower2 strokeWidth={1.15} />
        <span />
      </span>
      <span>
        little loops<span className="brand-caption">HANDMADE WITH HEART</span>
      </span>
    </Link>
  )
}

export default function Page() {
  const instagram = shop.channels.find(
    (channel) => channel.name === "Instagram"
  )?.url

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="announcement">
        <Heart className="size-3" aria-hidden="true" /> Small stitches.
        Thoughtful gifts. A little everyday joy.{" "}
        <Heart className="size-3" aria-hidden="true" />
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <Logo />
          <nav aria-label="Main navigation" className="desktop-nav">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-contact">
            <ContactButton label="Say hello" className="header-hello" />
          </div>
          <MobileNavigation>
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#contact">
              Say hello <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </MobileNavigation>
        </div>
      </header>
      <main id="main">
        <ShopMotion />
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-line" /> A LITTLE YARN. A LOT OF LOVE.
            </span>
            <h1 id="hero-title" data-motion-hero>
              Little things,
              <br />
              made with{" "}
              <span className="hero-love">
                big love.
                <svg viewBox="0 0 300 16" aria-hidden="true">
                  <path d="M3 11 Q110 -2 294 7 M20 15 Q150 3 273 12" />
                </svg>
              </span>
            </h1>
            <p data-motion-hero>
              Soft stitches, sweet details, and a little bit of magic.
              <br className="hidden lg:block" /> Handmade crochet treasures to
              keep close
              <br className="hidden lg:block" /> or gift to someone special.
            </p>
            <div className="hero-actions" data-motion-hero>
              <a
                href="#collection"
                className={`${buttonVariants()} shop-button`}
              >
                Explore the collection <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="#custom" className="text-link">
                Something just for you{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="little-hearts" aria-hidden="true">
                <Heart />
                <Heart />
                <Heart />
              </span>
              <span>Made slowly. Loved for a long time.</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <Image
                src="/images/crochet-hero.png"
                alt="Cream crochet bunny in a rose scarf, with soft yarn and handmade tulips on warm linen"
                fill
                preload
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div
              className="handmade-seal"
              aria-label="One of a kind, always handmade"
            >
              <Heart aria-hidden="true" />
              <span>one of a kind</span>
              <strong>just like you</strong>
              <span className="seal-bottom">HANDMADE WITH LOVE</span>
            </div>
            <span className="hero-note">
              a hug, in handmade form{" "}
              <Heart aria-hidden="true" className="size-4" />
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
              Made by hand, with heart
            </span>
            <span>
              <Leaf aria-hidden="true" />
              Soft yarn, thoughtful details
            </span>
            <span>
              <Sparkles aria-hidden="true" />A little different. All yours.
            </span>
            <span>
              <Package aria-hidden="true" />
              Ready to make someone smile
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
                alt="Handcrafted crochet bunny and yarn, showing the detail in every stitch"
                fill
                sizes="(max-width: 767px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="story-caption">
              <Scissors aria-hidden="true" className="size-5" />
              <span>A slower kind of lovely.</span>
            </div>
          </div>
          <div className="story-copy" data-motion-reveal>
            <span className="eyebrow">HELLO FROM OUR LITTLE CORNER</span>
            <h2>
              A little yarn.
              <br />A little patience.
              <br />
              <em>A whole lot of heart.</em>
            </h2>
            <p>
              There’s something special about a thing made by hand. The tiny
              details. The personality in every stitch. The feeling that it was
              made just for you.
            </p>
            <p>
              That’s the heart of Little Loops. A small crochet shop making soft
              companions, forever flowers, and everyday keepsakes — one
              thoughtful stitch at a time.
            </p>
            <a href="#custom" className="text-link">
              Let’s create something meaningful{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <span className="story-signature">
              with love, Little Loops{" "}
              <Heart aria-hidden="true" className="size-5" />
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
              <span className="eyebrow">
                YOUR IDEA. OUR HAPPY LITTLE HANDS.
              </span>
              <h2 id="custom-title">
                Dream it. We’ll <em>stitch it.</em>
              </h2>
              <p>
                A favorite color, a tiny lookalike, a gift with their name on
                it. Let’s turn your little idea into something wonderfully
                personal.
              </p>
              <ContactButton
                subject="a custom crochet order"
                label="Let’s make it yours"
              />
              <span className="custom-fineprint">
                A conversation first. A keepsake to follow.
              </span>
            </div>
            <div className="custom-decoration">
              <Flower2
                aria-hidden="true"
                strokeWidth={1}
                className="custom-flower"
              />
              <ShopPhoto
                item="flowers"
                alt="Pink and ivory crochet tulips for a personalized handmade bouquet"
                sizes="(max-width: 767px) 100vw, 60vw"
              />
              <span className="custom-sticker">
                made for
                <br />
                <em>only you.</em>
              </span>
            </div>
          </div>
        </section>
        <section
          className="testimonial-section container"
          aria-labelledby="testimonial-title"
        >
          <div className="center-heading" data-motion-reveal>
            <span className="eyebrow">LITTLE NOTES, WARM HEARTS</span>
            <h2 id="testimonial-title">The sweetest part? Your smiles.</h2>
            <p className="sample-note">
              Sample notes to preview this space. Real customer stories coming
              soon.
            </p>
          </div>
          <div className="testimonial-grid" data-motion-grid>
            {[
              {
                quote:
                  "Even sweeter in person. The little details make it feel so special — my new favorite desk companion.",
                name: "A little desk-side joy",
                item: "Crochet plushie",
              },
              {
                quote:
                  "A bouquet that I can keep forever. Such a thoughtful way to say a little thank you.",
                name: "Flowers, with a little forever",
                item: "Crochet flowers",
              },
              {
                quote:
                  "From the colors to the tiny finishing touches, it feels like a gift made just for me.",
                name: "Something wonderfully personal",
                item: "Custom keepsake",
              },
            ].map((review) => (
              <figure className="testimonial" key={review.name}>
                <div
                  className="review-stars"
                  aria-label="Illustrative five-star rating"
                >
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
                    <span>{review.item} · sample story</span>
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
                <span className="eyebrow">A PEEK BEHIND THE STITCHES</span>
                <h2 id="instagram-title">Our little everyday.</h2>
              </div>
              {instagram ? (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  <Instagram aria-hidden="true" className="size-4" /> Find us on
                  Instagram{" "}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              ) : (
                <ContactButton
                  label="Follow our little journey"
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
                          "Soft pink handmade tulips",
                          "A crochet bunny waiting for a hug",
                          "A cream crochet bag for everyday adventures",
                          "A tiny bear keychain",
                          "Crochet blooms in soft spring colors",
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
            <p className="sample-note">
              A little inspiration board of our sample creations.
            </p>
          </div>
        </section>
        <section
          id="contact"
          className="closing-section container"
          data-motion-reveal
        >
          <Flower2 aria-hidden="true" strokeWidth={1} />
          <h2>Something lovely starts with hello.</h2>
          <p>Found a favorite? Have a little idea? We’d love to hear it.</p>
          <ContactButton label="Come say hello" />
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-main container">
          <div>
            <Logo footer />
            <p>
              Little handmade treasures.
              <br />
              For your favorite people, and you.
            </p>
          </div>
          <div>
            <h2>Wander a little</h2>
            <a href="#collection">The collection</a>
            <a href="#story">Our little story</a>
            <a href="#custom">Custom creations</a>
          </div>
          <div>
            <h2>Let’s be friends</h2>
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
                  {channel.name} <span>· coming soon</span>
                </span>
              )
            )}
          </div>
          <div className="footer-note">
            <Heart aria-hidden="true" strokeWidth={1.2} />
            <p>
              Every loop has a little love in it.
              <br />
              <em>Thank you for being here.</em>
            </p>
            <a href="#main" className="text-link">
              Back to the lovely things{" "}
              <ArrowDown className="size-3 rotate-180" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>
            © {new Date().getFullYear()} Little Loops. Made with heart.
          </span>
          <span>
            Concept storefront · sample content{" "}
            <Heart aria-hidden="true" className="size-3" />
          </span>
        </div>
      </footer>
      <ContactButton floating />
    </>
  )
}
