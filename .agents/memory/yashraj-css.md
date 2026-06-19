---
name: Yashraj Palace CSS System
description: Premium CSS utilities, animation classes, Tailwind color tokens, and palace design rules
---

## CRITICAL: CSS Import Order
`@import url(fonts)` MUST come BEFORE `@tailwind base/components/utilities` — otherwise Vite throws "import must precede all other statements".

## Tailwind Custom Colors (tailwind.config.js)
```
maroon:   { DEFAULT: '#6B1A2B', dark: '#4A0F1D', light: '#8B2238' }
gold:     { DEFAULT: '#C9A84C', light: '#E8C97A' }
ivory:    { DEFAULT: '#FAF7F2', dark: '#F2EDE4' }
charcoal: { DEFAULT: '#1C1C1E', muted: '#4A4A4F' }
```

## Palace Design Rules
- **Sharp corners everywhere**: `border-radius: 0` on ALL user-facing pages. No `rounded-*` Tailwind. Admin pages exempt.
- **Eyebrow text**: `.eyebrow` — 0.625rem, tracking-[0.3em], uppercase, `#C9A84C` gold
- **Section headings**: `.section-title` — Playfair Display, clamp(1.875rem, 4vw, 2.75rem)
- **Page heroes**: `.page-hero` — `#1E0610 → #3A0D1A → #6B1A2B → #7C2030` gradient + diagonal gold lattice (opacity 0.05)

## Luxury Minimal CSS Philosophy (current theme)
- More whitespace: `section-lg` = py-16 md:py-24 lg:py-32
- clamp() for all heading font sizes
- Thin subtle borders (#E8E0D8), no heavy shadows
- Gold used sparingly as an accent, not dominant
- Refined button hover: translateY(-1px) + maroon shadow

## Key CSS Classes (index.css @layer components)

### Buttons (all sharp, border-radius: 0)
- `.btn-primary` — `#6B1A2B` bg, hover `#8B2238` + translateY(-1px) + shadow
- `.btn-gold` — `#C9A84C` bg, maroon text
- `.btn-outline` — maroon border/text, fill on hover
- `.btn-outline-gold` — gold border/text, rgba(gold,0.12) hover
- `.btn-whatsapp` — `#25D366` green
- `.btn-sm` / `.btn-lg` — padding overrides

### Typography
- `.eyebrow` — gold, 0.625rem, tracking-[0.3em], uppercase
- `.section-title` — Playfair Display, clamp(1.875rem, 4vw, 2.75rem), `#1C1C1E`
- `.section-title-light` — same but `#FAF7F2`
- `.gold-divider` / `.gold-divider-center` — 3rem×1px gold gradient bar
- `.gold-shimmer-text` — animated gold gradient text clip

### Cards (all sharp)
- `.card` — white, stone-200 border, hover: translateY(-4px) + maroon shadow + gold border
- `.palace-card` — white, stone-200 border + CSS gold corner brackets (::before/::after 16×16px)
- `.glass-card` — white/7 + backdrop-blur-14 + white/14 border (for dark sections)
- `.info-card` — white, stone-200 border, hover translateY(-2px)
- `.usp-card` — `#F9F5EF` bg, hover: maroon bg + white text

### Forms
- `.input-field` — `#FAF7F2` bg, `#DDD5C8` border, maroon focus ring
- `.label` — 0.625rem, tracking-[0.2em], uppercase, `#6E5E52`

### Page Hero
- `.page-hero` — py-24 md:py-32, `#1E0610 → #7C2030` gradient, diagonal gold lattice overlay 5% opacity
- `.hero-pattern` — radial gold ellipse + repeating 45° gold lines, 28px tile

### Filter Pills (sharp)
- `.filter-pill` — base styles, tracking-[0.18em], uppercase
- `.filter-pill-active` — `#6B1A2B` bg, ivory text
- `.filter-pill-inactive` — `#F2EDE4` bg, stone-500 text, hover gold border

### Ornamental Elements
- `.ornamental-border` — border + gold corner brackets via ::before/::after (20×20px)
- `.ornament-divider` — flex row with gold line ::before/::after flanking icon

### Mobile Utilities
- `.container-palace` — max-w-1280, responsive px (1.25rem→2rem→2.5rem)
- `.hide-mobile` — `display:none` at ≤639px
- `.wa-float` — fixed bottom-right WhatsApp floating button, pulse animation

## Animation Classes
- `.reveal` / `.reveal.visible` — IntersectionObserver scroll reveal (opacity+translateY)
- `.reveal-delay-{1-4}` — stagger 0.08–0.32s
- `.animate-fade-in-up` / `.animate-fade-in` / `.animate-float` / `.animate-slide-down` / `.animate-scale-in`
- `.animation-delay-{100-400}` — explicit delay classes
- `.stagger` — nth-child animation delays 0.05–0.40s

## Room Image Gradients
- `.room-img-deluxe` — brown/taupe `#D5C4B0 → #B8A880`
- `.room-img-premium` — amber brown `#C4A882 → #8B6A3A`
- `.room-img-suite` — warm grey-brown `#B8A094 → #7A6050`
- `.room-img-default` — ivory `#D5C8B8 → #C0B0A0`
