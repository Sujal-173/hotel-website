import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { galleryAPI } from '../utils/api'

const CATEGORIES = ['all','rooms','weddings','garden','banquet','food','property','events']

// Placeholder gallery items for when DB is empty
const PLACEHOLDER = [
  ...['rooms','weddings','garden','banquet','food','property','events'].flatMap(cat =>
    Array.from({ length: 6 }, (_, i) => ({
      _id: `${cat}-${i}`, category: cat, title: `${cat} ${i+1}`,
      url: '', alt: `Yashraj Palace ${cat}`,
      color: { rooms:'from-blue-900 to-blue-700', weddings:'from-pink-900 to-pink-700', garden:'from-green-900 to-green-700', banquet:'from-purple-900 to-purple-700', food:'from-orange-900 to-orange-700', property:'from-maroon-dark to-maroon', events:'from-teal-900 to-teal-700' }[cat]
    }))
  )
]

export default function GalleryPage() {
  const [images, setImages]   = useState([])
  const [filter, setFilter]   = useState('all')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    galleryAPI.getAll()
      .then(r => setImages(r.data.images.length ? r.data.images : PLACEHOLDER))
      .catch(() => setImages(PLACEHOLDER))
      .finally(() => setLoading(false))
  }, [])

  const shown = filter === 'all' ? images : images.filter(i => i.category === filter)

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

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Gallery</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">See Yashraj Palace</h1>
          <p className="text-white/65 max-w-xl mx-auto">Rooms, weddings, events, garden, banquet hall, and cuisine — captured as they are.</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sticky top-16 z-30 overflow-x-auto">
        <div className="flex gap-2 max-w-7xl mx-auto min-w-max">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize ${filter === c ? 'text-white' : 'bg-ivory-dark text-charcoal-muted hover:text-maroon'}`}
              style={filter === c ? { background: 'linear-gradient(135deg, #8B2238, #6B1A2B)' } : {}}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20"><div className="spinner"/></div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {shown.map((img, i) => (
              <div key={img._id} onClick={() => setSelected(img)}
                className={`break-inside-avoid rounded-xl overflow-hidden cursor-zoom-in group relative bg-gradient-to-br ${img.color || 'from-maroon-dark to-maroon'} ${i % 5 === 0 ? 'h-56' : i % 3 === 0 ? 'h-40' : 'h-48'}`}>
                {img.url ? (
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-end p-3">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <span className="relative text-white/70 text-xs capitalize font-medium">{img.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-gold" onClick={() => setSelected(null)}>×</button>
          <div className="max-w-3xl max-h-[80vh] rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {selected.url ? (
              <img src={selected.url} alt={selected.alt} className="w-full h-full object-contain" />
            ) : (
              <div className={`w-96 h-64 bg-gradient-to-br ${selected.color || 'from-maroon-dark to-maroon'} flex items-center justify-center rounded-xl`}>
                <span className="text-white/40 font-serif text-2xl capitalize">{selected.category}</span>
              </div>
            )}
            {selected.title && <div className="bg-black/60 text-white text-sm p-3 text-center">{selected.title}</div>}
          </div>
        </div>
      )}
    </>
  )
}
