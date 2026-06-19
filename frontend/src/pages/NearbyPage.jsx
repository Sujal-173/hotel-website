import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FiMapPin, FiClock } from 'react-icons/fi'

const ATTRACTIONS = [
  {
    name: 'Maheshwar Fort & Temple',
    dist: '12 km · 18 min drive',
    desc: 'The iconic Ahilya Fort on the Narmada bank — a must-visit landmark of Madhya Pradesh with stunning river views and historic temples.',
    tags: ['Historic Fort', 'River View', 'Temples', 'Photography'],
    color: 'from-blue-950 to-blue-800',
    icon: '🏯',
  },
  {
    name: 'Narmada Ghat, Maheshwar',
    dist: '14 km · 20 min drive',
    desc: 'Sacred ghats along the Narmada River — ideal for sunrise visits, boat rides, and witnessing the Ahilya Ghat aarti.',
    tags: ['Spiritual', 'Boat Ride', 'Sunrise', 'Aarti'],
    color: 'from-teal-950 to-teal-700',
    icon: '🌊',
  },
  {
    name: 'Mandleshwar Town',
    dist: '2 km · 5 min drive',
    desc: 'A historic town with the Mandleshwar temple complex, local markets, and the famous Narmada bridge with scenic views.',
    tags: ['Temple', 'Local Market', 'Scenic Bridge'],
    color: 'from-purple-950 to-purple-700',
    icon: '🕌',
  },
  {
    name: 'Omkareshwar Temple',
    dist: '38 km · 50 min drive',
    desc: 'One of the 12 Jyotirlingas of Lord Shiva — a major pilgrimage site on an island in the Narmada River. Day trips are highly popular.',
    tags: ['Jyotirlinga', 'Pilgrimage', 'Island Temple'],
    color: 'from-green-950 to-green-700',
    icon: '⛩',
  },
  {
    name: 'Mandu (Mandavgarh)',
    dist: '65 km · 90 min drive',
    desc: 'An ancient ruined city of Afghan architecture — palaces, mosques, and baolis spread across a hilltop plateau. Day trip from Yashraj Palace.',
    tags: ['Heritage', 'Architecture', 'Day Trip'],
    color: 'from-amber-950 to-amber-700',
    icon: '🏰',
  },
  {
    name: 'Indore City',
    dist: '90 km · 2 hr drive',
    desc: 'Madhya Pradesh\'s largest city — Rajwada Palace, Lal Bagh, Sarafa Bazaar night market, and Indore airport for onward connections.',
    tags: ['City', 'Shopping', 'Airport', 'Food'],
    color: 'from-rose-950 to-rose-700',
    icon: '🌆',
  },
]

const NEARBY_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  name: 'Yashraj Palace – Near Maheshwar and Narmada Valley',
  description: 'Yashraj Palace is ideally located for exploring Maheshwar Fort, Narmada Ghats, Omkareshwar, Mandleshwar and Mandu — all within 90 km.',
  url: 'https://www.yashrajpalace.com/nearby-attractions',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mandleshwar',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '22.1740', longitude: '75.6560' },
  nearbyAttraction: ATTRACTIONS.map(a => ({
    '@type': 'TouristAttraction',
    name: a.name,
    description: a.desc,
  })),
}

export default function NearbyPage() {
  return (
    <>
      <Helmet>
        <title>Nearby Attractions – Yashraj Palace | Maheshwar Fort, Narmada Ghat, Omkareshwar</title>
        <meta name="description" content="Yashraj Palace is perfectly located near Maheshwar Fort (12 km), Narmada Ghat (14 km), Omkareshwar (38 km), and Mandu (65 km). Explore Narmada Valley from our hotel." />
        <link rel="canonical" href="https://www.yashrajpalace.com/nearby-attractions" />
        <meta property="og:title" content="Nearby Attractions – Yashraj Palace | Maheshwar, Narmada Valley" />
        <meta property="og:description" content="Base yourself at Yashraj Palace to explore Maheshwar Fort, Narmada Ghat, Omkareshwar, and Mandu — all within 90 km." />
        <meta property="og:url" content="https://www.yashrajpalace.com/nearby-attractions" />
        <script type="application/ld+json">{JSON.stringify(NEARBY_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yashrajpalace.com/' },
            { '@type': 'ListItem', position: 2, name: 'Nearby Attractions', item: 'https://www.yashrajpalace.com/nearby-attractions' },
          ],
        })}</script>
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Explore the Region</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Nearby Attractions</h1>
          <p className="text-white/65 max-w-xl mx-auto">Yashraj Palace places you at the heart of one of Madhya Pradesh's most historic and spiritually rich regions — Narmada Valley.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Gateway to Narmada Valley</p>
          <div className="gold-divider mx-auto" />
          <h2 className="section-title">Places to Explore Near Yashraj Palace</h2>
          <p className="text-charcoal-muted max-w-xl mx-auto">All distances are from Yashraj Palace, Mandleshwar. Our front desk can help arrange day-trip transportation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATTRACTIONS.map(a => (
            <div key={a.name} className="bg-white overflow-hidden border border-stone-200 hover:-translate-y-2 hover:shadow-xl hover:border-gold/40 transition-all duration-300 group" style={{ borderRadius: 0 }}>
              <div className={`h-40 bg-gradient-to-br ${a.color} relative flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="text-5xl opacity-20 group-hover:opacity-35 transition-opacity">{a.icon}</div>
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="font-serif text-white text-lg font-semibold">{a.name}</div>
                  <div className="text-white/65 text-xs flex items-center gap-1 mt-0.5">
                    <FiMapPin size={11} /> {a.dist}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-charcoal-muted leading-relaxed mb-4">{a.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {a.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 bg-[#F2EDE4] text-charcoal-muted" style={{ borderRadius: 0 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map CTA */}
        <div className="mt-14 p-8 text-center text-white" style={{ borderRadius: 0, background: 'linear-gradient(135deg, #4A0F1D, #6B1A2B)' }}>
          <h2 className="font-serif text-2xl mb-3">Plan Your Stay Around These Attractions</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">
            Our front desk team can help arrange transportation, suggest itineraries, and make sure you don't miss a single highlight of the Narmada Valley.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/book-room" className="btn-gold text-sm px-7">Book Your Room</Link>
            <a href="https://wa.me/917000000000" className="btn-whatsapp text-sm px-5">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
