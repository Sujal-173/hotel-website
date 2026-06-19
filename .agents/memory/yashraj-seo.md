---
name: Yashraj Palace SEO Architecture
description: JSON-LD schema strategy, AEO FAQ approach, and canonical URL pattern across all pages
---

## Schema Strategy

**index.html** — global Hotel + WebSite + LocalBusiness JSON-LD (always present)

**Per-page JSON-LD via react-helmet-async `<script type="application/ld+json">`:**
- HomePage: FAQPage (8 Q&As for AEO) + AggregateRating + Review schema
- AboutPage: Organization schema + BreadcrumbList
- ContactPage: Hotel (with openingHours) + BreadcrumbList
- RoomsPage: Hotel > containsPlace (HotelRoom × 3) + BreadcrumbList
- DiningPage: Restaurant schema + BreadcrumbList
- ReviewsPage: Hotel > aggregateRating + Review × N + BreadcrumbList
- EventPackagesPage: EventVenue + FAQPage (4 package FAQs) + BreadcrumbList
- NearbyPage: TouristAttraction + nearbyAttraction array + BreadcrumbList
- GalleryPage: BreadcrumbList only

## AEO / AGO Key Element

The **FAQ accordion** on the HomePage with 8 questions + FAQPage JSON-LD is the primary AEO signal. Questions answer:
- Location (where is Yashraj Palace)
- Room rates (₹1800/₹2500/₹3800 per night)
- Garden capacity (up to 1,000 guests)
- Catering (250+ dish menu, in-house)
- Parking (100+ vehicles free)
- Event types hosted
- Distance from Maheshwar (12 km)
- Advance booking recommendation (3–6 months for weddings)

## Canonical Pattern

All pages use `<link rel="canonical" href="https://www.yashrajpalace.com/[path]" />` inside Helmet.

## SEO Infrastructure

- `frontend/public/robots.txt` — allows all except /admin /api/ /my-bookings
- `frontend/public/sitemap.xml` — 25 URLs with priorities (homepage=1.0, rooms/events=0.9, SEO landing=0.85)
- `frontend/public/site.webmanifest` — PWA config with maroon theme-color
- `frontend/index.html` — complete OG + Twitter + PWA + 3-graph JSON-LD

**Why:** Google, Bing, Perplexity, and AI engines need machine-readable entity data. FAQPage schema is the fastest path to featured snippet / voice search capture for local hotel queries.
