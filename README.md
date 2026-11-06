# Little Loops crochet storefront

A responsive, enquiry-only homepage built on the existing Next.js 16 App Router, React 19, Tailwind 4, shadcn/Base UI, Lucide, and Motion stack. No additional npm dependencies were added.

## Run locally

```sh
npm run dev
```

The homepage is a Server Component. The category and featured-product sections form a small Client Component (`ProductCollections`) with local selected-category state. Filtering updates only this island, without changing the URL or requesting a server navigation. Product enquiries and the floating contact dialog use the existing Base UI dialog and button components. The mobile navigation is an animated disclosure with Escape, outside-click dismissal, and focus restoration. Entrances and interaction feedback respect reduced motion.

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

The homepage returns HTTP 200 and renders its initial catalog on the server. Browser automation was unavailable during verification; responsive layouts, keyboard interaction, focus management, and reduced-motion behavior should receive visual QA before launch.

## Soft & Playful motion

Motion was added using the local `ui-ux-pro-max` skill's focused animation and accessibility guidance. Layout, typography, colors, copy, and category/contact flows are preserved.

- `components/shop-motion.tsx` progressively enhances existing server markup: 520ms/16px fade-up reveals, 80ms hero staggering, a 650ms/1.015 image reveal, and 70ms staggering within each grid row. Each card has its own viewport observer, so mobile rows wait until visible. Local category changes do not remount the homepage or restart its motion controller. Observers and animations are cleaned up on navigation, preference changes, and unmount.
- `components/mobile-navigation.tsx` provides a 180ms transform/opacity dropdown. Exiting links are inert; Escape returns focus to the trigger. Link activation and outside clicks dismiss it.
- `hooks/use-shop-reduced-motion.ts` combines Motion's reduced-motion preference with a live media-query subscription, because the installed Motion hook snapshots the initial preference.
- `app/globals.css` shares 200ms micro-interaction timing and restrained easing. Fine-pointer hover lifts cards 4px and zooms images 1.025; touch still gets press feedback and all actions work without hover. Keyboard focus indicators remain visible.
- `app/page.tsx` stays a Server Component and supplies lightweight data attributes to existing elements. `components/shop-interactions.tsx` marks the floating contact trigger for its one-time entrance and removes the old rotating label interaction.

There are no infinite loops, scroll listeners, layout-property animations, hidden server-rendered content, new dependencies, or page-transition routing hooks. Focusing a revealing element immediately finishes its entrance. Full visual mobile and reduced-motion QA remains limited by unavailable browser automation; server output, typecheck, scoped lint, and the Webpack production build are verified.

### Touch controls and calmer browsing

The category and featured-product headings/grids now remain static when scrolling, avoiding a late fade-up after their images are already visible. Other section entrances remain intact. The mobile menu uses a native button; contact actions use the Base UI dialog trigger directly rather than a composed second Button. Menu and floating-chat touch targets use `touch-action: manipulation` and remain stationary on coarse pointers. Floating-chat entrance is limited to fine pointers. The header has an explicit stacking layer above animated content and below dialog overlays. Actual iPhone Safari verification is still pending.

Category tiles and filter controls use local React state and `aria-pressed` buttons. Only category tiles explicitly scroll down to the collection; in-section filters keep the current position. Category changes do not update the URL or fetch another Server Component payload. The obsolete routing-link helper was removed.
