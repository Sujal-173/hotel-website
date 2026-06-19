---
name: Yashraj Palace CSS System
description: Premium CSS utilities, animation classes, and Tailwind color tokens used across the frontend
---

## Tailwind Custom Colors (tailwind.config.js)

```
maroon:   { DEFAULT: '#6B1A2B', dark: '#4A0F1D', light: '#8B2238' }
gold:     { DEFAULT: '#C9A84C', light: '#E8C97A' }
ivory:    { DEFAULT: '#FAF7F2', dark: '#F2EDE4' }
charcoal: { DEFAULT: '#1C1C1E', muted: '#4A4A4F' }
```

## Key CSS Classes (defined in index.css @layer components)

- `.btn-primary` — gradient #8B2238→#4A0F1D with shine sweep on hover (::after pseudo)
- `.btn-gold` — gradient #E8C97A→#B8943C, gold hover lift
- `.btn-outline` — maroon border, fills on hover
- `.btn-whatsapp` — green-500, lifts on hover
- `.section-eyebrow` — gold, xs, tracking-widest, uppercase
- `.section-title` — Playfair Display, 3xl/4xl
- `.gold-divider` — 48×2px gradient gold bar
- `.card` — white rounded-2xl, hover -translate-y-6 + maroon shadow
- `.glass-card` — white/8 + backdrop-blur-12 + white/15 border (for dark sections)
- `.gold-badge` — E8C97A→C9A84C gradient pill
- `.page-hero` — maroon gradient 135deg, white text, hero-pattern overlay
- `.input-field` — ivory bg, gray border, maroon focus ring
- `.usp-card` — F2EDE4 bg, hover→maroon bg, child .usp-title / .usp-sub change to white
- `.faq-item` — E8E0D8 border, gold on hover/open, faq-answer slideDown animation

## Animation Classes

- `.reveal` + `.visible` — scroll reveal via IntersectionObserver (opacity 0→1, translateY 32→0)
- `.reveal-delay-{1-4}` — stagger transition-delay 0.1–0.4s
- `.gold-shimmer-text` — shimmer animation on gold gradient text clip
- `.animate-fade-in-up` — 0.65s fadeInUp keyframe
- `.animate-float` — 3.5s float keyframe (for emoji icons in dark sections)
- `.animate-slide-down` — 0.3s slide for mobile nav and FAQ answers
- `.stagger-children` — nth-child delays 0.05–0.40s

## Room Image Gradients

`.room-img-deluxe` `.room-img-premium` `.room-img-suite` `.room-img-default` — CSS gradient placeholders for room cards

**Why:** No real photos available, so CSS gradients create a premium visual without image assets. The gradient colors are warm browns/taupes matching a real hotel palette.
