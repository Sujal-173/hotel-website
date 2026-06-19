import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { eventsAPI } from '../utils/api'
import { FiCheck } from 'react-icons/fi'

const STATIC_PACKAGES = [
  { _id:'s1', name:'Silver Celebration', category:'all',        price:45000,  capacity:{min:50,max:200},   duration:1, badge:'',             venue:'banquet',  inclusions:['Banquet hall access (6 hours)','Basic floral decoration','Sound system & mic setup','Parking for 40 vehicles','1 event coordination staff','Welcome banner'], exclusions:['Catering (priced separately)','Photography','Decoration beyond basics'] },
  { _id:'s2', name:'Royal Wedding',      category:'wedding',    price:180000, capacity:{min:200,max:600},  duration:1, badge:'Most Popular',   venue:'combined', inclusions:['Full garden + hall access (full day)','Premium floral & mandap decor','DJ, lighting & sound system','300-plate in-house catering','4 rooms for family (1 night)','Dedicated wedding coordinator','Welcome gate setup','Bride & groom seating arrangement'], exclusions:['Photography','Mehendi artist','Additional catering beyond 300 plates'] },
  { _id:'s3', name:'Grand Palace',       category:'wedding',    price:450000, capacity:{min:500,max:1000}, duration:2, badge:'All Inclusive',   venue:'combined', inclusions:['Full property — garden + hall + lawn (2 days)','Custom luxury stage & decor','Unlimited catering — all meals + live counters','10 rooms for 2 nights','2-day event coordination team','Baraat welcome setup','Custom lighting rig','Photography & videography coordination'], exclusions:['External entertainment','Legal/govt permissions'] },
  { _id:'s4', name:'Birthday Bash',      category:'birthday',   price:25000,  capacity:{min:30,max:150},  duration:1, badge:'',             venue:'banquet',  inclusions:['Banquet hall (4 hours)','Balloon & ribbon decoration','Birthday cake coordination','Basic sound system','Parking for 30 vehicles'], exclusions:['Catering','Photography','Custom theme decor'] },
  { _id:'s5', name:'Corporate Off-Site', category:'corporate',  price:55000,  capacity:{min:50,max:300},  duration:1, badge:'',             venue:'banquet',  inclusions:['Banquet hall + AV setup','Projector, screen, mics','High-speed Wi-Fi','Welcome snacks & lunch buffet (included)','Tea/coffee station','Coordination support'], exclusions:['Team activities','Outdoor setup'] },
  { _id:'s6', name:'Engagement Garden',  category:'engagement', price:35000,  capacity:{min:50,max:200},  duration:1, badge:'',             venue:'garden',  inclusions:['Garden access (5 hours)','Floral stage setup','Sound system','200 guests capacity','Basic catering coordination'], exclusions:['Full catering','Photography','DJ'] },
]

const PACKAGES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: 'Yashraj Palace',
  url: 'https://www.yashrajpalace.com/events/packages',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Mandleshwar',
    addressLocality: 'Mandleshwar',
    addressRegion: 'Madhya Pradesh',
    postalCode: '451221',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.1740',
    longitude: '75.6560',
  },
  maximumAttendeeCapacity: 1000,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', 'name': 'Wedding Garden', value: true },
    { '@type': 'LocationFeatureSpecification', 'name': 'Banquet Hall', value: true },
    { '@type': 'LocationFeatureSpecification', 'name': 'In-House Catering', value: true },
    { '@type': 'LocationFeatureSpecification', 'name': 'Free Parking', value: true },
    { '@type': 'LocationFeatureSpecification', 'name': 'DJ & Sound', value: true },
    { '@type': 'LocationFeatureSpecification', 'name': 'Decoration Services', value: true },
  ],
}

const FAQ_PACKAGES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the cheapest event package at Yashraj Palace?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Birthday Bash package starts at ₹25,000 for up to 150 guests (4 hours). For corporate events, the Corporate Off-Site package starts at ₹55,000 for up to 300 guests with AV setup and lunch buffet included.' },
    },
    {
      '@type': 'Question',
      name: 'What is included in the Royal Wedding package?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Royal Wedding package (₹1,80,000) includes: full garden + hall access for the full day, premium floral & mandap decor, DJ, lighting & sound system, 300-plate in-house catering, 4 family rooms for 1 night, and a dedicated wedding coordinator.' },
    },
    {
      '@type': 'Question',
      name: 'Can Yashraj Palace accommodate 1,000 wedding guests?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Grand Palace package accommodates up to 1,000 guests and includes full use of the garden, banquet hall, and lawn for 2 days with unlimited catering, custom stage, luxury decor, and 10 rooms for 2 nights.' },
    },
    {
      '@type': 'Question',
      name: 'Is catering included in event packages?',
      acceptedAnswer: { '@type': 'Answer', text: 'Catering is included in the Royal Wedding (300 plates), Corporate Off-Site (snacks + lunch), and Grand Palace (unlimited catering with live counters) packages. The Silver Celebration, Birthday Bash, and Engagement Garden packages can be customised with catering add-ons.' },
    },
  ],
}

export default function EventPackagesPage() {
  const [packages, setPackages] = useState([])
  const [filter, setFilter]     = useState('all')
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    eventsAPI.getPackages()
      .then(r => setPackages(r.data.packages?.length ? r.data.packages : STATIC_PACKAGES))
      .catch(() => setPackages(STATIC_PACKAGES))
      .finally(() => setLoading(false))
  }, [])

  const cats = ['all','wedding','reception','engagement','birthday','corporate','family','cultural']
  const filtered = filter === 'all' ? packages : packages.filter(p => p.category === filter)

  return (
    <>
      <Helmet>
        <title>Event Packages &amp; Pricing – Yashraj Palace | Wedding Venue Maheshwar</title>
        <meta name="description" content="View wedding, reception, birthday and corporate event packages at Yashraj Palace. Transparent pricing from ₹25,000. Garden for 1,000+ guests. In-house catering included. Book now." />
        <link rel="canonical" href="https://www.yashrajpalace.com/events/packages" />
        <meta property="og:title" content="Event Packages – Yashraj Palace | Wedding Venue Maheshwar from ₹25,000" />
        <meta property="og:description" content="Wedding, birthday, corporate &amp; reception packages at Yashraj Palace. Transparent pricing from ₹25,000. Garden for 1,000+ guests." />
        <meta property="og:url" content="https://www.yashrajpalace.com/events/packages" />
        <script type="application/ld+json">{JSON.stringify(PACKAGES_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_PACKAGES_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yashrajpalace.com/' },
            { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://www.yashrajpalace.com/events' },
            { '@type': 'ListItem', position: 3, name: 'Event Packages', item: 'https://www.yashrajpalace.com/events/packages' },
          ],
        })}</script>
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Packages &amp; Pricing</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Event Packages</h1>
          <p className="text-white/65 max-w-xl mx-auto">Transparent, all-inclusive packages designed for every budget and occasion. No hidden costs, no surprises.</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="bg-[#FAF7F2] border-b py-4 px-4 sticky top-16 z-30 overflow-x-auto" style={{ borderColor: 'rgba(201,168,76,0.25)' }}>
        <div className="flex gap-1.5 max-w-7xl mx-auto min-w-max">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                filter === c ? 'text-white border-maroon' : 'bg-[#F2EDE4] text-stone-600 border-[#E8E0D8] hover:text-maroon hover:border-gold'
              }`}
              style={{ borderRadius: 0, background: filter === c ? 'linear-gradient(135deg, #8B2238, #6B1A2B)' : undefined }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center py-20"><div className="spinner" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(pkg => (
              <div key={pkg._id}
                className={`bg-white overflow-hidden relative transition-all duration-300 hover:-translate-y-2 ${
                  pkg.badge === 'Most Popular'
                    ? 'border-2 border-gold shadow-xl hover:shadow-2xl'
                    : 'border border-gray-100 shadow-sm hover:shadow-lg'
                }`}>
                {pkg.badge && (
                  <div className="py-1.5 text-center text-xs font-bold tracking-wide"
                    style={{ background: 'linear-gradient(135deg, #E8C97A, #C9A84C)', color: '#1C1C1E' }}>
                    {pkg.badge}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-1">{pkg.name}</h3>
                  <p className="text-xs text-charcoal-muted mb-1 capitalize">
                    {pkg.category} · Up to {pkg.capacity?.max} guests · {pkg.duration} day{pkg.duration > 1 ? 's' : ''}
                  </p>
                  <div className="font-serif text-3xl font-semibold text-maroon mt-3 mb-1">
                    ₹{pkg.price?.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-charcoal-muted mb-5">Starting price · Custom quote available</p>

                  {pkg.inclusions?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Includes</p>
                      <ul className="space-y-1.5">
                        {pkg.inclusions.map(inc => (
                          <li key={inc} className="flex items-start gap-2 text-sm text-charcoal-muted">
                            <FiCheck className="text-gold shrink-0 mt-0.5" size={13} /> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.exclusions?.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Not Included</p>
                      <ul className="space-y-1">
                        {pkg.exclusions.map(ex => (
                          <li key={ex} className="text-xs text-charcoal-muted">× {ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link
                    to={`/events/book?package=${pkg._id}`}
                    className={`block text-center text-xs py-3 uppercase tracking-wider font-bold transition-all ${
                      pkg.badge === 'Most Popular' ? 'btn-primary' : 'btn-outline'
                    }`}>
                    Book This Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom quote */}
        <div className="mt-14 p-8 text-center text-white" style={{ borderRadius: 0, background: 'linear-gradient(135deg, #4A0F1D, #6B1A2B)' }}>
          <h2 className="font-serif text-2xl mb-3">Need a Custom Package?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">
            Our events team can build a custom package tailored to your exact guest count, budget, venue preferences, and catering requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/events/book" className="btn-gold text-sm px-7">Request Custom Quote</Link>
            <a href="tel:+917000000000" className="border-2 border-white/40 text-white px-6 py-3 font-semibold text-sm hover:bg-white/10 transition-all" style={{ borderRadius: 0 }}>
              📞 Call Now
            </a>
          </div>
        </div>

        {/* FAQ section for AEO */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6 text-center">Package FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              ['What is the cheapest event package?', 'Birthday Bash starts at ₹25,000 for 150 guests. Silver Celebration is ₹45,000 for 200 guests.'],
              ['Is catering included?', 'Catering is bundled in Royal Wedding (300 plates), Corporate Off-Site (snacks + lunch), and Grand Palace (unlimited). Other packages allow catering add-ons.'],
              ['Can I customise a package?', 'Absolutely. Contact our events team to build a package tailored to your guest count, venue, budget, and catering needs.'],
              ['How far in advance should I book?', 'We recommend booking 3–6 months ahead for weddings (peak Oct–Feb) and 1–2 months for other events. Call or WhatsApp to check your date.'],
            ].map(([q, a]) => (
              <div key={q} className="p-5 border border-stone-200" style={{ background: '#F2EDE4', borderRadius: 0 }}>
                <p className="font-semibold text-charcoal text-sm mb-2">{q}</p>
                <p className="text-sm text-charcoal-muted">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
