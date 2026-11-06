# Little Loops — homepage design system

Generated before implementation using the local UI/UX Pro Max search and Design System token architecture skills. The search returned generic Swiss/black/pink guidance after one narrower retry; that palette was rejected. The following product-specific direction follows the user's brief, using the skill's verified general accessibility, layout, and performance guidance.

## Identity and composition
Temporary identity: Little Loops, a warm crochet studio. Editorial, tactile, light and quietly playful. Asymmetric two-column hero, rounded photography, circular category thumbnails, four-column product collection, alternating story and custom-order compositions. No checkout.

## Tokens
Primitives: cream #fbf8f2, ink #493d35, rose #9a5662, blush #f3e5e4, beige #f0e9de, sage #e7ecdf, muted ink #75665c, border #e5ddd2.
Semantic: background=cream, foreground=ink, primary=rose, primary-foreground=white, secondary=beige, accent=sage, muted-foreground=muted ink. Map to existing shadcn variables. Keep compatible dark tokens.
Components: CTA pill with 48px minimum height; product card 20px radius; photography 24px radius; shadow 0 6px 24px rgba(73,61,53,.05).
Typography: Georgia editorial serif headings with italic accents; self-hosted Inter body via next/font/local. Hero fluid 44–76px; section headings 32–46px; body 16px/1.7; labels 12px uppercase with .14em tracking.
Layout: 1200px content maximum, 24px mobile / 48px desktop gutters; 80–104px desktop section rhythm; mobile 56–64px. Grids 1/2/4 columns; categories 2/3/5. No horizontal overflow.

## Interaction and accessibility
Existing Base UI Button, Dialog and Badge; native details navigation for mobile. Product and custom-order enquiry dialogs, channel selector and floating contact dialog. No fabricated contact destinations: enable supplied public environment URLs, explain unavailable channels in preview. Category navigation filters the product collection using URL query state, rendered on the server.
Focus-visible rings; 44px touch targets; skip link; heading hierarchy; semantic landmarks; descriptive image alternatives; dialogs trap focus and close with Escape. Motion only for the contact interaction; respect prefers-reduced-motion in Motion and CSS. No hidden-on-load content.

## Content and media
Sample catalog, prices, testimonials and AI imagery explicitly marked preview content. Real shop accounts, products, customer permissions and copy must replace samples before launch. Local images optimized with next/image; preload hero only, responsive sizes, lazy loading below fold. Metadata and social preview included without inventing a production domain or reviews schema.
