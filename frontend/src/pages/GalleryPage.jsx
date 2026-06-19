import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { galleryAPI } from '../utils/api'
import { FiCamera, FiGrid, FiX } from 'react-icons/fi'

const CATEGORIES = ['all','rooms','weddings','garden','banquet','food','property','events']

const CATEGORY_LABELS = {
  all: 'All', rooms: 'Rooms', weddings: 'Weddings', garden: 'Garden',
  banquet: 'Banquet', food: 'Cuisine', property: 'Property', events: 'Events'
}

const CATEGORY_COLORS = {
  rooms:    'from-[#3A0D1A] to-[#6B1A2B]',
  weddings: 'from-[#4A0F1D] to-[#8B2238]',
  garden:   'from-[#2A1A0A] to-[#5C3A1A]',
  banquet:  'from-[#1A0A2A] to-[#4A1A6B]',
  food:     'from-[#1A0E06] to-[#6B3A1A]',
  property: 'from-[#0D1A1A] to-[#1A4A4A]',
  events:   'from-[#1A1A0D] to-[#4A4A1A]',
}

const PLACEHOLDER = [
  ...['rooms','weddings','garden','banquet','food','property','events'].flatMap(cat =>
    Array.from({ length: 6 }, (_, i) => ({
      _id: `${cat}-${i}`, category: cat,
      title: `${CATEGORY_LABELS[cat]} — ${i + 1}`,
      url: '', alt: `Yashraj Palace ${cat}`,
      color: CATEGORY_COLORS[cat]
    }))
  )
]

const STATS = [
  { num: '7+', label: 'Venue Spaces' },
  { num: '500+', label: 'Events Hosted' },
  { num: '3', label: 'Room Categories' },
  { num: '1000+', label: 'Happy Guests' },
]

export default function GalleryPage() {
  const [images, setImages]     = useState([])
  const [filter, setFilter]     = useState('all')
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)
  const [selectedIdx, setSelectedIdx] = useState(null)

  useEffect(() => {
    galleryAPI.getAll()
      .then(r => setImages(r.data.images.length ? r.data.images : PLACEHOLDER))
      .catch(() => setImages(PLACEHOLDER))
      .finally(() => setLoading(false))
  }, [])

  const shown = filter === 'all' ? images : images.filter(i => i.category === filter)

  const openLightbox = (img, idx) => { setSelected(img); setSelectedIdx(idx) }
  const closeLightbox = () => { setSelected(null); setSelectedIdx(null) }
  const goNext = (e) => { e.stopPropagation(); const next = (selectedIdx + 1) % shown.length; setSelected(shown[next]); setSelectedIdx(next) }
  const goPrev = (e) => { e.stopPropagation(); const prev = (selectedIdx - 1 + shown.length) % shown.length; setSelected(shown[prev]); setSelectedIdx(prev) }

  return (
    <>
      <Helmet>
        <title>Gallery – Yashraj Palace | Rooms, Weddings, Garden &amp; Events | Maheshwar</title>
        <meta name="description" content="View photos of rooms, wedding garden, banquet hall, restaurant, and events at Yashraj Palace near Maheshwar and Mandleshwar, Madhya Pradesh." />
        <link rel="canonical" href="https://www.yashrajpalace.com/gallery" />
        <meta property="og:title" content="Gallery – Yashraj Palace | Rooms, Weddings, Garden &amp; Events" />
        <meta property="og:description" content="Browse photos of rooms, wedding garden, banquet hall, food, and events at Yashraj Palace near Maheshwar, MP." />
        <meta property="og:url" content="https://www.yashrajpalace.com/gallery" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yashrajpalace.com/' },
            { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://www.yashrajpalace.com/gallery' },
          ],
        })}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ background: '#1A0709' }}>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop')", opacity: 0.16 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,7,9,0.98) 0%, rgba(107,26,43,0.80) 50%, rgba(26,7,9,0.92) 100%)' }} />
        <div className="absolute inset-0 hero-pattern pointer-events-none" style={{ opacity: 0.06 }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left: Headline */}
            <div className="w-full lg:w-[52%] text-white">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px bg-gold/60 w-8" />
                <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em]">Our Story in Photos</span>
                <span className="h-px bg-gold/60 w-8" />
              </div>
              <h1 className="font-serif font-bold leading-[1.12] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                Every Frame,<br />
                <span style={{ background: 'linear-gradient(90deg,#C9A84C,#E8C97A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  A Memory
                </span>
              </h1>
              <p className="text-white/65 leading-relaxed mb-8 max-w-lg" style={{ fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)' }}>
                Rooms, weddings, events, garden, banquet hall, and cuisine — every frame a memory at Yashraj Palace, near Maheshwar.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <button onClick={() => { setFilter('weddings'); document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="btn-gold btn-lg text-[0.625rem]">View Weddings</button>
                <button onClick={() => { setFilter('rooms'); document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="btn-outline-gold btn-lg text-[0.625rem]">View Rooms</button>
              </div>
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/10 max-w-sm">
                {[['7+','Venues'],['500+','Events'],['3','Room Types'],['1000+','Guests']].map(([n,l]) => (
                  <div key={l} className="text-center">
                    <div className="font-serif text-gold font-bold text-base">{n}</div>
                    <div className="text-white/45 text-[9px] uppercase tracking-widest mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Category preview mosaic */}
            <div className="w-full lg:w-[44%] max-w-md mx-auto lg:mx-0">
              <div className="grid grid-cols-3 grid-rows-2 gap-2" style={{ height: '340px' }}>
                {[
                  { cat: 'Weddings',  color: 'from-[#4A0F1D] to-[#8B2238]',  span: 'col-span-2 row-span-1' },
                  { cat: 'Rooms',     color: 'from-[#2A1A0A] to-[#5C3A1A]',  span: 'col-span-1 row-span-2' },
                  { cat: 'Garden',    color: 'from-[#0D1A1A] to-[#1A4A4A]',  span: 'col-span-1 row-span-1' },
                  { cat: 'Banquet',   color: 'from-[#1A0A2A] to-[#4A1A6B]',  span: 'col-span-1 row-span-1' },
                  { cat: 'Cuisine',   color: 'from-[#1A0E06] to-[#6B3A1A]',  span: 'col-span-1 row-span-1' },
                ].map(({ cat, color, span }) => (
                  <div key={cat}
                    onClick={() => { setFilter(cat.toLowerCase()); document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className={`${span} bg-gradient-to-br ${color} cursor-pointer group relative overflow-hidden border border-gold/15 hover:border-gold/50 transition-all duration-300`}
                    style={{ borderRadius: 0 }}>
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '10px 10px' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/70 group-hover:text-gold text-xs font-bold uppercase tracking-widest transition-colors">{cat}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-white/35 text-xs text-center mt-3 tracking-wider uppercase">Click a category to explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#1E0610] border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/15">
          {STATS.map(s => (
            <div key={s.label} className="py-5 text-center">
              <div className="font-serif text-2xl font-bold gold-shimmer-text">{s.num}</div>
              <div className="text-white/50 text-xs uppercase tracking-widest mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-[#FAF7F2] border-b py-4 px-4 sticky top-16 z-30 overflow-x-auto" style={{ borderColor: 'rgba(201,168,76,0.25)' }}>
        <div className="flex gap-2 max-w-7xl mx-auto min-w-max items-center">
          <FiGrid size={14} className="text-gold shrink-0 mr-1" />
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                filter === c
                  ? 'text-white border-maroon'
                  : 'bg-white text-stone-600 border-[#E8E0D8] hover:text-maroon hover:border-gold'
              }`}
              style={{ borderRadius: 0, background: filter === c ? 'linear-gradient(135deg,#6B1A2B,#8B2238)' : undefined }}>
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div id="gallery-grid" className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-24"><div className="spinner" /></div>
        ) : shown.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FiCamera size={40} className="text-gold/40 mb-4" />
            <p className="font-serif text-xl text-charcoal mb-1">No images yet</p>
            <p className="text-charcoal-muted text-sm">Photos in this category are coming soon.</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {shown.map((img, i) => (
              <div key={img._id}
                onClick={() => openLightbox(img, i)}
                className={`break-inside-avoid overflow-hidden cursor-zoom-in group relative bg-gradient-to-br ${img.color || CATEGORY_COLORS[img.category] || 'from-[#3A0D1A] to-[#6B1A2B]'} ${
                  i % 7 === 0 ? 'h-64' : i % 4 === 0 ? 'h-44' : 'h-52'
                } border border-transparent hover:border-gold/40 transition-all duration-300`}
                style={{ borderRadius: 0 }}>
                {img.url ? (
                  <>
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <FiCamera size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-end justify-end p-3 relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)', backgroundSize: '14px 14px' }} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <span className="relative text-gold/70 text-xs capitalize font-semibold tracking-wider">{CATEGORY_LABELS[img.category] || img.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && shown.length > 0 && (
          <div className="mt-16 text-center border-t border-gold/15 pt-12">
            <p className="section-eyebrow text-center">Book a Visit</p>
            <div className="gold-divider-center mb-4" />
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-3">Experience Yashraj Palace in Person</h2>
            <p className="text-charcoal-muted mb-6 max-w-lg mx-auto">Photos tell part of the story — visit us to see the grandeur for yourself. Schedule a site tour or book a room today.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="/rooms" className="btn-primary">Book a Room</a>
              <a href="/contact" className="btn-outline">Schedule a Tour</a>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            style={{ borderRadius: 0 }}>
            <FiX size={20} />
          </button>

          {/* Prev */}
          <button onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors"
            style={{ borderRadius: 0 }}>‹</button>

          {/* Next */}
          <button onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors"
            style={{ borderRadius: 0 }}>›</button>

          <div className="max-w-3xl w-full max-h-[80vh] overflow-hidden border border-gold/20" style={{ borderRadius: 0 }} onClick={e => e.stopPropagation()}>
            {selected.url ? (
              <img src={selected.url} alt={selected.alt} className="w-full max-h-[75vh] object-contain" />
            ) : (
              <div className={`w-full h-64 bg-gradient-to-br ${selected.color || 'from-[#3A0D1A] to-[#6B1A2B]'} flex items-center justify-center`}>
                <span className="text-gold/40 font-serif text-2xl capitalize">{CATEGORY_LABELS[selected.category] || selected.category}</span>
              </div>
            )}
            {selected.title && (
              <div className="bg-[#1E0610] text-white/80 text-sm p-3 text-center border-t border-gold/20">
                {selected.title}
                <span className="ml-2 text-gold/50 text-xs">· {selectedIdx + 1} / {shown.length}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
