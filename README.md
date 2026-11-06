# Little Loops crochet storefront

A responsive, enquiry-only homepage built on the existing Next.js 16 App Router, React 19, Tailwind 4, shadcn/Base UI, Lucide, and Motion stack. No additional npm dependencies were added.

## Run locally

```sh
npm run dev
```

The homepage is a Server Component. Category filters use the `category` search parameter and work as ordinary links. Product enquiries and the floating contact dialog use the existing Base UI dialog and button components. The mobile navigation uses a native disclosure. The floating contact control respects reduced motion.

## Shop configuration

Add the public variables listed in `shop.env.example` to your local or deployment environment. Do not overwrite an existing `.env` file. Set actual Zalo, Messenger, and Instagram URLs to enable those destinations; unset channels display an honest coming-soon state. A message can be copied from the enquiry dialog before opening a channel. Nothing is automatically sent.

Set `NEXT_PUBLIC_SITE_URL` to the absolute production origin for correct Open Graph URLs and search indexing. Indexing remains disabled until that value is configured. Rebuild after changing public variables.

Catalog content is centralized in `lib/shop.ts`. The Little Loops identity, products, prices, testimonials, and AI-generated imagery are illustrative; replace these with the shop's approved content before launch. The Instagram section is a static inspiration gallery, with no embedded feed or tracking scripts.

## Design system and assets

`design-system/little-loops/MASTER.md` records the pre-implementation design system, mapped onto the existing shadcn semantic theme tokens. The shop uses self-hosted Inter (license in `public/fonts/INTER-LICENSE.txt`) and a system serif heading stack. Images use `next/image`, responsive sizes, hero preloading, and below-fold lazy loading.

Generated with the built-in imagegen tool:
- `public/images/crochet-hero.png`: warm editorial photography of a cream crochet bunny, dusty-pink scarf, soft yarn, crochet tulips, and linen.
- `public/images/crochet-collection.png`: a four-quadrant product photography sheet of a bunny, tulips, market bag, and bear keychain; quadrants are framed with CSS.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
```

The repository-wide lint command currently reports pre-existing errors in `.agents/skills/**` CommonJS scripts and `components/ui/carousel.tsx` (`react-hooks/set-state-in-effect`). The homepage's files pass scoped ESLint:

```sh
npm run lint -- app/page.tsx app/layout.tsx components/shop-interactions.tsx components/shop-photo.tsx lib/shop.ts
```

The default Turbopack build encountered an environment helper-port permission error. The supported compiler fallback passes:

```sh
npm run build -- --webpack
```

The local homepage and category routes return HTTP 200. Browser automation was unavailable during verification; responsive layouts, keyboard interaction, focus management, and reduced-motion behavior should receive visual QA before launch.
