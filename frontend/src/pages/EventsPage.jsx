import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const EVENT_DETAILS = {
  wedding:   { title: 'Wedding', icon: '💍', desc: 'Your dream wedding, hosted with the grandeur it deserves. From the mandap to the feast, we handle every detail.' },
  reception: { title: 'Reception', icon: '🎊', desc: 'A grand reception for up to 1,000 guests with premium decor, lighting, and catering.' },
  engagement:{ title: 'Engagement', icon: '💛', desc: 'Intimate to mid-size engagement functions with a personal touch and thoughtful setup.' },
  birthday:  { title: 'Birthday Party', icon: '🎂', desc: 'Themed birthday celebrations with custom decor, live counters, and entertainment.' },
  corporate: { title: 'Corporate Event', icon: '🏢', desc: 'Professional venue for conferences, seminars, team off-sites and award nights.' },
  anniversary:{ title: 'Anniversary', icon: '🥂', desc: 'Mark your milestone with a private celebration or a grand party — we make it special.' },
  family:    { title: 'Family Function', icon: '👨‍👩‍👧‍👦', desc: 'Griha pravesh, naming ceremony, puja, or any family gathering — handled with care.' },
  cultural:  { title: 'Cultural Event', icon: '🎭', desc: 'Stage performances, community gatherings, religious programs — our halls welcome them all.' },
}

const GARDEN_FEATURES = [
  { icon: '🌿', title: 'Open Garden', val: '10,000 sq ft lush garden space' },
  { icon: '🏛', title: 'Banquet Hall', val: 'Air-conditioned hall, 500 seated' },
  { icon: '👥', title: 'Max Capacity', val: '1,000 guests (combined)' },
  { icon: '🎪', title: 'Stage Setup', val: 'Professional mandap/stage included' },
  { icon: '💡', title: 'Lighting', val: 'Full LED + decorative lighting rig' },
  { icon: '🎵', title: 'Sound System', val: 'Professional DJ + PA system' },
  { icon: '🍽', title: 'Catering', val: 'In-house — 250+ dish menu' },
  { icon: '🅿', title: 'Parking', val: 'Free, 100+ vehicles on-site' },
  { icon: '🏨', title: 'Room Bundle', val: 'Block rooms for wedding family' },
  { icon: '👔', title: 'Coordinator', val: 'Dedicated event manager assigned' },
  { icon: '🌸', title: 'Floral Decor', val: 'Fresh floral arrangements, garlands' },
  { icon: '📸', title: 'Photo Zones', val: 'Dedicated photography backdrop areas' },
]

const PACKAGES_PREVIEW = [
  { name: 'Silver Celebration', guests: '200 guests', price: '₹45,000', tag: null },
  { name: 'Royal Wedding',      guests: '600 guests', price: '₹1,80,000', tag: 'Most Popular' },
  { name: 'Grand Palace',       guests: '1,000 guests', price: '₹4,50,000', tag: 'All Inclusive' },
]

export default function EventsPage() {
  const { type } = useParams()
  const currentEvent = EVENT_DETAILS[type] || null

  const seoTitle = currentEvent
    ? `${currentEvent.title} Venue – Yashraj Palace | Maheshwar`
    : 'Events & Celebrations – Yashraj Palace | Wedding Garden Maheshwar'
  const seoDesc = currentEvent
    ? `Book ${currentEvent.title} at Yashraj Palace, near Maheshwar. Garden capacity 1000+, in-house catering, full decoration support. Call +91 70000 00000.`
    : 'Wedding garden, banquet hall, and event venue near Maheshwar and Mandleshwar. Capacity 1000+. Weddings, receptions, corporate events, birthdays. Book now.'

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
      </Helmet>

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {currentEvent ? (
            <>
              <div className="text-5xl mb-4">{currentEvent.icon}</div>
              <p className="section-eyebrow text-gold">Events & Celebrations</p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">{currentEvent.title} at Yashraj Palace</h1>
              <p className="text-white/65 max-w-xl mx-auto">{currentEvent.desc}</p>
            </>
          ) : (
            <>
              <p className="section-eyebrow text-gold">Events & Celebrations</p>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Wedding Garden & Event Venue</h1>
              <p className="text-white/65 max-w-xl mx-auto">One destination for weddings, receptions, corporate events, birthdays, and every occasion worth celebrating — near Maheshwar, Madhya Pradesh.</p>
            </>
          )}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/events/book" className="btn-gold text-sm px-7">Book This Venue</Link>
            <a href="https://wa.me/917000000000" className="btn-whatsapp text-sm px-5"><FaWhatsapp size={16}/> WhatsApp Us</a>
          </div>
        </div>
      </div>

      {/* Event type tabs */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sticky top-16 z-30 overflow-x-auto">
        <div className="flex gap-2 max-w-7xl mx-auto min-w-max">
          <Link to="/events" className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!type ? 'bg-maroon text-white' : 'text-charcoal-muted hover:text-maroon bg-ivory-dark'}`}>All Events</Link>
          {Object.entries(EVENT_DETAILS).map(([slug, ev]) => (
            <Link key={slug} to={`/events/${slug}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${type === slug ? 'bg-maroon text-white' : 'text-charcoal-muted hover:text-maroon bg-ivory-dark'}`}>
              {ev.icon} {ev.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Garden features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Venue Highlights</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Everything You Need, Right Here</h2>
            <p className="text-charcoal-muted max-w-lg mx-auto">Yashraj Palace is a full-service event venue. From stage to catering to overnight accommodation — we handle it all so you don't have to.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GARDEN_FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-maroon/30 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <div className="font-semibold text-sm text-charcoal mb-1">{f.title}</div>
                <div className="text-xs text-charcoal-muted leading-relaxed">{f.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages preview */}
      <section className="py-20 px-4 bg-ivory-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Packages & Pricing</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Transparent Packages, No Hidden Costs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {PACKAGES_PREVIEW.map(p => (
              <div key={p.name} className={`bg-white rounded-xl p-6 text-center relative ${p.tag === 'Most Popular' ? 'border-2 border-gold shadow-lg' : 'border border-gray-100 shadow-sm'}`}>
                {p.tag && <div className="badge bg-gold text-charcoal mb-3 inline-block">{p.tag}</div>}
                <h3 className="font-serif text-xl font-semibold mb-1">{p.name}</h3>
                <p className="text-xs text-charcoal-muted mb-4">{p.guests}</p>
                <div className="font-serif text-3xl font-semibold text-maroon mb-4">{p.price}</div>
                <Link to="/events/book" className={`block text-sm py-2.5 rounded font-semibold transition-all ${p.tag === 'Most Popular' ? 'btn-primary' : 'btn-outline'}`}>Book Now</Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/events/packages" className="btn-primary px-8 text-sm">View Full Package Details <FiArrowRight className="inline ml-1" /></Link>
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-eyebrow">See It to Believe It</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Events We've Hosted</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Wedding Garden','Reception Hall','Stage Setup','Floral Decor','Dining Setup','Night Lighting'].map((label, i) => (
              <div key={label} className={`rounded-xl overflow-hidden h-44 flex items-end relative bg-gradient-to-br ${
                ['from-maroon-dark to-maroon','from-blue-900 to-blue-700','from-purple-900 to-purple-700',
                 'from-green-900 to-green-700','from-orange-900 to-orange-700','from-gray-900 to-gray-700'][i]
              }`}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative p-4 text-white font-semibold text-sm">{label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery" className="btn-outline text-sm px-7">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-maroon-dark py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="absolute inset-0 hero-pattern pointer-events-none" />
          <h2 className="font-serif text-3xl text-white mb-3">Ready to Book the Venue?</h2>
          <p className="text-white/65 mb-8">Fill out our quick inquiry form and our event team will call you within 2 hours with availability and pricing.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/events/book" className="btn-gold text-sm px-7">Book This Venue Now</Link>
            <a href="tel:+917000000000" className="border-2 border-white/40 text-white px-6 py-3 rounded font-semibold text-sm hover:bg-white/10 transition-all">📞 Call Directly</a>
          </div>
        </div>
      </section>
    </>
  )
}
