---
name: Yashraj Palace CSS System
description: Premium CSS utilities, animation classes, Tailwind color tokens, and palace design rules
---

## Tailwind Custom Colors (tailwind.config.js)

```
maroon:   { DEFAULT: '#6B1A2B', dark: '#4A0F1D', light: '#8B2238' }
gold:     { DEFAULT: '#C9A84C', light: '#E8C97A' }
ivory:    { DEFAULT: '#FAF7F2', dark: '#F2EDE4' }
charcoal: { DEFAULT: '#1C1C1E', muted: '#4A4A4F' }
```

## Palace Design Rule — Sharp Corners Everywhere
All user-facing pages must use `border-radius: 0`. Never use `rounded-*` Tailwind classes on public pages.
Use `style={{ borderRadius: 0 }}` to override stray Tailwind. Admin pages are exempt.

**Why:** The homepage set the aesthetic standard with sharp palace-style corners and ornamental accents. Consistency requires all pages to match.

## Key CSS Classes (defined in index.css @layer components)

### Buttons (all sharp, border-radius: 0)
- `.btn-primary` — maroon gradient #8B2238→#4A0F1D, shine sweep on hover (::after pseudo)
- `.btn-gold` — gold gradient #E8C97A→#B8943C
- `.btn-outline` — maroon border fills on hover
- `.btn-whatsapp` — green-500

### Typography
- `.section-eyebrow` — gold, xs, tracking-widest, uppercase
- `.section-title` — Playfair Display, 3xl/4xl
- `.gold-divider` — 48×2px gradient gold bar
- `.gold-shimmer-text` — shimmer animation on gold gradient text clip

### Cards (all sharp, border-radius: 0)
- `.card` — white, hover lift + maroon shadow
- `.glass-card` — white/8 + backdrop-blur-12 (for dark sections)
- `.gold-badge` — E8C97A→C9A84C gradient
- `.palace-card` — white border + CSS gold corner brackets via ::before/::after
- `.info-card` — border card, hover border gold
- `.usp-card` — F2EDE4 bg, hover→maroon bg

### Forms (all sharp, border-radius: 0)
- `.input-field` — ivory bg, stone border, maroon focus ring

### Filter Tabs (sharp tab style)
- `.filter-pill` / `.filter-pill-active` / `.filter-pill-inactive`
- Active: `linear-gradient(135deg, #8B2238, #6B1A2B)`, white text
- Inactive: `bg-[#F2EDE4] border-[#E8E0D8]`, hover border-gold
- Filter bar wrapper: `bg-[#FAF7F2] border-b` with `borderColor: rgba(201,168,76,0.25)`

### Ornamental / Palace Elements
- `.page-hero` — `linear-gradient(135deg, #2E0912, #4A0F1D, #6B1A2B, #8B2238)` + diagonal gold lattice overlay via ::before
- `.ornamental-border` — 4-corner gold bracket via ::before/::after (22×22px)
- `.palace-card` — 4-corner bracket CSS pseudo-elements
- `.ornament-divider` — centred gold lines flanking an icon slot
- `.palace-section-header` — eyebrow + h2 + ornamental divider row
- `.section-accent` — 48px gold horizontal bar

### Background Pattern (hero sections + auth pages)
```
repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)
background-size: 28px 28px; opacity: ~0.06
```
**Why:** Matches the homepage's diagonal gold lattice — establishes the "palace" aesthetic consistently.

### Auth Pages (Login / Register)
Full-page: `linear-gradient(135deg, #2E0912, #4A0F1D, #6B1A2B)` + diagonal gold overlay.
Card: ivory `bg-[#FAF7F2]`, 4 gold corner `<span>` elements (React-compatible, not pseudo).
Crown icon (lucide-react), gold ornament divider with ✦ symbol.

## Animation Classes

- `.reveal` + `.visible` — scroll reveal via IntersectionObserver (opacity 0→1, translateY 32→0)
- `.reveal-delay-{1-4}` — stagger transition-delay 0.1–0.4s
- `.animate-fade-in-up` / `.animate-fade-in` / `.animate-float` / `.animate-slide-down` / `.animate-scale-in`
- `.stagger-children` — nth-child delays 0.05–0.40s

## Room Image Gradients

`.room-img-deluxe` `.room-img-premium` `.room-img-suite` `.room-img-default` — CSS gradient placeholders.

**Why:** No real photos available; warm brown/taupe CSS gradients create a premium visual.
