import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaWhatsapp, FaStar } from 'react-icons/fa'
import { FiArrowRight, FiCheck, FiChevronDown } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { roomsAPI } from '../utils/api'
import toast from 'react-hot-toast'

const ROOM_TYPES = [
  { slug: 'deluxe-room',  name: 'Deluxe Room',  price: 1800, capacity: 2, bed: 'Queen Bed',  size: '280 sq ft', badge: 'Popular',    imgClass: 'room-img-deluxe' },
  { slug: 'premium-room', name: 'Premium Room', price: 2500, capacity: 2, bed: 'King Bed',   size: '380 sq ft', badge: 'Best Value', imgClass: 'room-img-premium' },
  { slug: 'family-suite', name: 'Family Suite', price: 3800, capacity: 4, bed: '2 Beds',     size: '560 sq ft', badge: 'Spacious',   imgClass: 'room-img-suite' },
]

const EVENT_TYPES = [
  { icon: '💍', name: 'Wedding',         sub: 'Full ceremony & reception' },
  { icon: '🎊', name: 'Reception',       sub: 'Grand receptions, 1000 guests' },
  { icon: '💛', name: 'Engagement',      sub: 'Intimate to mid-size' },
  { icon: '🎂', name: 'Birthday Party',  sub: 'Theme setups & catering' },
  { icon: '🏢', name: 'Corporate Event', sub: 'Conferences & off-sites' },
  { icon: '🥂', name: 'Anniversary',     sub: 'Milestone celebrations' },
  { icon: '🏠', name: 'Family Function', sub: 'Griha pravesh, puja & more' },
  { icon: '🎭', name: 'Cultural Event',  sub: 'Stage shows & gatherings' },
]

const PACKAGES = [
  {
    name: 'Silver Celebration', capacity: '200 guests · 6 hrs', price: '₹45,000',
    note: 'Venue + basic setup · Catering extra', featured: false,
    features: ['Banquet hall access', 'Basic floral decoration', 'Sound system & mic', 'Parking for 40 vehicles', '1 coordination staff'],
  },
  {
    name: 'Royal Wedding', capacity: '600 guests · Full day', price: '₹1,80,000',
    note: 'Venue + full decor + 300-plate catering', featured: true, badge: 'Most Popular',
    features: ['Full garden + hall access', 'Premium floral & mandap decor', 'DJ, lighting & sound', '300-plate in-house catering', '4 rooms for family', 'Dedicated wedding coordinator'],
  },
  {
    name: 'Grand Palace', capacity: '1000 guests · 2 days', price: '₹4,50,000',
    note: 'All-inclusive · Custom quote available', featured: false,
    features: ['Full property — garden + hall + lawn', 'Custom stage & luxury decor', 'Unlimited catering, live counters', '10 rooms for 2 nights', '2-day event team'],
  },
]

const REVIEWS = [
  { name: 'Ramesh Verma',   initials: 'RV', rating: 5, occasion: 'Wedding Reception · March 2025',  text: 'We hosted my daughter\'s wedding reception here. The garden was beautifully lit, food was excellent, and the coordination team handled everything flawlessly. Highly recommended.' },
  { name: 'Priya Sharma',   initials: 'PS', rating: 5, occasion: 'Room Stay · January 2025',         text: 'Stayed 3 nights while visiting Maheshwar. The room was spotless, staff were incredibly warm, and the food genuinely tasty. This place has a real character to it.' },
  { name: 'Ankit Kulkarni', initials: 'AK', rating: 4, occasion: 'Corporate Event · Nov 2024',       text: 'We held our annual function here for 300 people. Great AV setup, good parking, and catering was well organised. Will return for our next event without hesitation.' },
]

const ATTRACTIONS = [
  { name: 'Maheshwar Fort',  dist: '12 km · 18 min', color: 'from-blue-950 to-blue-800',    icon: '🏯' },
  { name: 'Narmada Ghat',   dist: '14 km · 20 min', color: 'from-teal-950 to-teal-700',    icon: '🌊' },
  { name: 'Mandleshwar',    dist: '2 km · 5 min',   color: 'from-purple-950 to-purple-700', icon: '🕌' },
  { name: 'Omkareshwar',    dist: '38 km · 50 min', color: 'from-green-950 to-green-700',   icon: '⛩' },
]

const USPS = [
  { icon: '🏰', title: 'Palace Setting',       sub: 'Grand ambience for every occasion' },
  { icon: '🍽️', title: 'In-House Catering',    sub: '250+ dish menu, live counters' },
  { icon: '🅿️', title: 'Free Parking',         sub: '100+ vehicles, buses welcome' },
  { icon: '💒', title: 'Wedding Experts',       sub: 'Dedicated coordinator, zero stress' },
  { icon: '📶', title: 'High-Speed Wi-Fi',      sub: 'Across rooms & event halls' },
  { icon: '📍', title: 'Prime Location',        sub: '12 km from Maheshwar Fort' },
]

const FAQS = [
  {
    q: 'Where is Yashraj Palace located?',
    a: 'Yashraj Palace is located near Mandleshwar in the Khargone District of Madhya Pradesh — approximately 12 km from Maheshwar Fort, 14 km from the Narmada Ghats, and 2 km from Mandleshwar town. It is easily accessible from Indore (90 km) and Bhopal (230 km) by road.',
  },
  {
    q: 'What are the room rates at Yashraj Palace?',
    a: 'Rooms start at ₹1,800 per night for the Deluxe Room (Queen Bed, up to 2 guests). The Premium Room is ₹2,500/night (King Bed, complimentary breakfast) and the Family Suite is ₹3,800/night (2 beds, up to 4 guests, separate living area). All prices are + applicable taxes. Free cancellation up to 24 hours before check-in.',
  },
  {
    q: 'How many guests can the wedding garden accommodate?',
    a: 'The Yashraj Palace wedding garden can accommodate up to 1,000 guests for an open garden reception. Our banquet hall handles 300–500 guests in a formal seated arrangement. The Royal Wedding package (from ₹1,80,000) covers 600 guests with full garden and hall access.',
  },
  {
    q: 'Does Yashraj Palace offer in-house catering?',
    a: 'Yes. Our in-house catering team provides a 250+ dish menu covering regional Madhya Pradesh cuisine, North Indian, South Indian, and continental options. For events, we offer live counters (chaat, desserts, BBQ, tandoor), and full buffet setups for 50 to 1,000 guests.',
  },
  {
    q: 'Is free parking available at Yashraj Palace?',
    a: 'Yes, free parking is available for 100+ vehicles including cars, SUVs, mini-buses, and buses. This is especially convenient for wedding and event guests arriving from Indore, Bhopal, or nearby towns.',
  },
  {
    q: 'What types of events does Yashraj Palace host?',
    a: 'Yashraj Palace hosts weddings, receptions, engagements, birthday parties, anniversaries, corporate conferences and off-sites, family functions (griha pravesh, puja, mundan), and cultural or stage events. Our event team handles decoration, catering, AV, lighting, and full coordination.',
  },
  {
    q: 'Can I book rooms for wedding guests at Yashraj Palace?',
    a: 'Yes. Our Royal Wedding and Grand Palace packages include room blocks for wedding families — 4 rooms (1 night) and 10 rooms (2 nights) respectively. Additional rooms can also be booked separately to give your family and out-of-town guests a complete palace-stay experience.',
  },
  {
    q: 'How far in advance should I book for a wedding?',
    a: 'We recommend booking at least 3–6 months in advance for wedding dates, especially for peak season (October–February and May–June). Rooms can typically be booked 30–60 days in advance. Contact us on WhatsApp to check availability for your date.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const REVIEW_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Yashraj Palace',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '200',
    bestRating: '5',
  },
  review: REVIEWS.map(r => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating },
    reviewBody: r.text,
    name: r.occasion,
  })),
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function HomePage() {
  const navigate = useNavigate()
  const [tab, setTab]             = useState('room')
  const [checkIn, setCheckIn]     = useState(null)
  const [checkOut, setCheckOut]   = useState(null)
  const [roomType, setRoomType]   = useState('')
  const [guests, setGuests]       = useState('2')
  const [eventType, setEventType] = useState('wedding')
  const [eventDate, setEventDate] = useState(null)
  const [guestCount, setGuestCount] = useState('')
  const [openFaq, setOpenFaq]     = useState(null)

  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal()
  const r4 = useReveal(), r5 = useReveal(), r6 = useReveal()
  const r7 = useReveal(), r8 = useReveal()

  const handleCheckAvailability = () => {
    if (tab === 'room') {
      if (!checkIn || !checkOut) { toast.error('Please select check-in and check-out dates'); return }
      navigate(`/rooms?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}&guests=${guests}${roomType ? `&type=${roomType}` : ''}`)
    } else {
      if (!eventDate) { toast.error('Please select your event date'); return }
      navigate(`/events/book?type=${eventType}&date=${eventDate.toISOString()}&guests=${guestCount}`)
    }
  }

  return (
    <>
      <Helmet>
        <title>Yashraj Palace – Hotel, Wedding Garden &amp; Events | Maheshwar | Mandleshwar</title>
        <meta name="description" content="Premium hotel, wedding garden and event venue near Maheshwar and Mandleshwar, MP. Book rooms from ₹1,800/night. Wedding garden for 1,000+ guests. In-house catering, free parking. Call +91 70000 00000." />
        <link rel="canonical" href="https://www.yashrajpalace.com/" />
        <meta property="og:title" content="Yashraj Palace – Hotel, Wedding Garden &amp; Events | Maheshwar" />
        <meta property="og:description" content="Premium hotel &amp; wedding venue near Maheshwar, MP. Rooms from ₹1,800/night. Garden for 1,000+ guests." />
        <meta property="og:url" content="https://www.yashrajpalace.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(REVIEW_SCHEMA)}</script>
      </Helmet>

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3A0A18 0%, #5A1422 35%, #6B1A2B 60%, #8B2238 100%)' }}>
        <div className="absolute inset-0 hero-pattern" />
        {/* Decorative gold arc */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div className="animate-fade-in-up">
            <p className="section-eyebrow text-gold mb-4 tracking-[0.3em]">Maheshwar · Mandleshwar · Narmada Valley</p>
            <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-semibold text-white leading-tight mb-5">
              A Palace for{' '}
              <em className="gold-shimmer-text not-italic">Grand Stays</em>{' '}
              and{' '}
              <em className="gold-shimmer-text not-italic">Grander Celebrations</em>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Premium rooms, a majestic wedding garden, and banquet halls for weddings, receptions, corporate events, and family celebrations — all in one address near Maheshwar Fort and the Narmada Ghats.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/book-room" className="btn-gold text-sm px-7 py-3.5">Book a Room</Link>
              <Link to="/events/book" className="border-2 border-white/40 text-white px-6 py-3.5 rounded-lg font-semibold text-sm hover:border-white hover:bg-white/10 transition-all">
                Plan a Wedding
              </Link>
              <a href="https://wa.me/917000000000" className="btn-whatsapp text-sm px-5 py-3.5">
                <FaWhatsapp size={16} /> WhatsApp Us
              </a>
            </div>
            {/* Trust stats */}
            <div className="flex gap-8">
              {[['500+','Events Hosted'],['4.8★','Guest Rating'],['20+','Rooms'],['1000','Max Guests']].map(([n,l]) => (
                <div key={l}>
                  <div className="font-serif text-2xl font-semibold" style={{ color: '#E8C97A' }}>{n}</div>
                  <div className="text-xs text-white/45 uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Widget */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gold/10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <h2 className="text-maroon font-bold text-center mb-4 tracking-wide font-serif text-lg">Check Availability</h2>
            <div className="flex bg-ivory rounded-xl p-1 mb-5 gap-1">
              {[['room','Room Stay'],['event','Wedding / Event']].map(([v,l]) => (
                <button key={v} onClick={() => setTab(v)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === v ? 'text-white shadow-sm' : 'text-charcoal-muted hover:text-maroon'}`}
                  style={tab === v ? { background: 'linear-gradient(135deg, #8B2238, #6B1A2B)' } : {}}>
                  {l}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {tab === 'room' ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="label">Check-In</label>
                      <DatePicker selected={checkIn} onChange={setCheckIn} minDate={new Date()} placeholderText="Select date" className="input-field" /></div>
                    <div><label className="label">Check-Out</label>
                      <DatePicker selected={checkOut} onChange={setCheckOut} minDate={checkIn || new Date()} placeholderText="Select date" className="input-field" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="label">Room Type</label>
                      <select className="input-field" value={roomType} onChange={e => setRoomType(e.target.value)}>
                        <option value="">Any Room</option>
                        <option value="deluxe">Deluxe Room</option>
                        <option value="premium">Premium Room</option>
                        <option value="suite">Family Suite</option>
                      </select></div>
                    <div><label className="label">Guests</label>
                      <select className="input-field" value={guests} onChange={e => setGuests(e.target.value)}>
                        {['1','2','3','4','5','6+'].map(g => <option key={g} value={g}>{g} Guest{g !== '1' ? 's' : ''}</option>)}
                      </select></div>
                  </div>
                </>
              ) : (
                <>
                  <div><label className="label">Event Type</label>
                    <select className="input-field" value={eventType} onChange={e => setEventType(e.target.value)}>
                      {['wedding','reception','engagement','birthday','anniversary','corporate','family','cultural'].map(t => (
                        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                      ))}
                    </select></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="label">Event Date</label>
                      <DatePicker selected={eventDate} onChange={setEventDate} minDate={new Date()} placeholderText="Select date" className="input-field" /></div>
                    <div><label className="label">Guest Count</label>
                      <input type="number" placeholder="No. of guests" className="input-field" value={guestCount} onChange={e => setGuestCount(e.target.value)} /></div>
                  </div>
                </>
              )}
              <button onClick={handleCheckAvailability} className="btn-primary w-full py-3.5 text-sm tracking-wide">
                Check Availability →
              </button>
              <p className="text-center text-xs text-charcoal-muted">Free cancellation · Instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─────────────────────────────────────────── */}
      <div className="bg-ivory-dark border-b border-gold/20 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between gap-4">
          {[['🅿️','Free Parking 100+ Vehicles'],['🍽️','In-House Catering & Restaurant'],['💒','Dedicated Wedding Manager'],['📶','High-Speed Wi-Fi'],['✅','Instant WhatsApp Confirmation']].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-2 text-sm text-charcoal-muted font-medium">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs"
                style={{ background: 'linear-gradient(135deg, #8B2238, #6B1A2B)' }}>{icon}</div>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ─── ROOMS ─────────────────────────────────────────────── */}
      <section ref={r1} className="reveal py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-eyebrow">Stay at Yashraj Palace</p>
            <div className="gold-divider" />
            <h2 className="section-title max-w-xl">Rooms Designed for Comfort &amp; Elegance</h2>
            <p className="text-charcoal-muted max-w-xl leading-relaxed">Every room is appointed with warm interiors, modern amenities, and the quiet comfort of a palace-style retreat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {ROOM_TYPES.map(room => (
              <div key={room.slug} className="card group animate-fade-in-up">
                <div className={`relative h-52 ${room.imgClass} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 right-3 gold-badge">{room.badge}</div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white font-serif text-lg font-semibold drop-shadow">{room.name}</div>
                    <div className="text-white/75 text-xs">{room.size} · {room.bed}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex gap-4 text-xs text-charcoal-muted mb-4 flex-wrap">
                    <span>🛏 {room.bed}</span>
                    <span>👥 {room.capacity} Guests</span>
                    <span>📐 {room.size}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-serif text-2xl font-semibold text-maroon">₹{room.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-charcoal-muted">per night + taxes</span>
                  </div>
                  <Link to={`/rooms/${room.slug}`} className="btn-outline block text-center text-sm py-2.5">
                    View Room &amp; Book →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/rooms" className="btn-primary px-8">View All Rooms &amp; Amenities</Link>
          </div>
        </div>
      </section>

      {/* ─── WEDDING SECTION ───────────────────────────────────── */}
      <section ref={r2} className="reveal py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #3A0A18 0%, #4A0F1D 50%, #5A1422 100%)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl h-96 lg:h-[480px] relative overflow-hidden border border-gold/20 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(255,255,255,0.04))' }}>
            <div className="text-center">
              <div className="text-7xl mb-4 animate-float">💍</div>
              <p className="font-serif text-2xl text-gold/60 italic">Wedding Garden</p>
              <p className="text-white/30 text-sm mt-1">Up to 1,000 Guests</p>
            </div>
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/30 rounded-tl" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold/30 rounded-tr" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold/30 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/30 rounded-br" />
          </div>
          <div>
            <p className="section-eyebrow text-gold">Wedding &amp; Event Garden</p>
            <div className="gold-divider" />
            <h2 className="font-serif text-4xl font-semibold text-white leading-tight mb-4">
              Make Every Celebration a Memory They'll Never Forget
            </h2>
            <p className="text-white/65 leading-relaxed mb-8">
              Yashraj Palace's wedding garden and banquet hall have hosted hundreds of weddings, receptions, and milestone celebrations. With space for up to 1,000 guests, in-house catering, full decoration support, and dedicated event management — your celebration is in the best hands.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                ['Garden Capacity','Up to 1,000 guests, flexible seating'],
                ['Decoration Support','Floral, lighting, stage &amp; mandap'],
                ['In-House Catering','250+ dish menu, live counters'],
                ['Room Bundle','Block rooms for wedding family'],
                ['Parking','Free parking for 100+ vehicles'],
                ['AV &amp; Lighting','DJ, sound system, lighting rig'],
              ].map(([t,d]) => (
                <div key={t} className="glass-card p-3">
                  <div className="text-xs font-semibold mb-1" style={{ color: '#E8C97A' }}>{t}</div>
                  <div className="text-white/55 text-xs" dangerouslySetInnerHTML={{ __html: d }} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/events/book?type=wedding" className="btn-gold text-sm">Book Wedding / Event</Link>
              <Link to="/events/packages" className="border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:border-white hover:bg-white/10 transition-all">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─────────────────────────────────────── */}
      <section ref={r3} className="reveal py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Why Yashraj Palace</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">One Venue. Every Occasion.</h2>
            <p className="text-charcoal-muted max-w-xl mx-auto">
              Everything under one roof — no coordination headaches, no third-party vendors. Just one trusted team that makes your event unforgettable.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
            {USPS.map(u => (
              <div key={u.title} className="usp-card group animate-fade-in-up">
                <div className="text-4xl mb-3">{u.icon}</div>
                <div className="usp-title text-sm font-semibold text-charcoal transition-colors duration-300 mb-1">{u.title}</div>
                <div className="usp-sub text-xs text-charcoal-muted transition-colors duration-300">{u.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVENT TYPES ───────────────────────────────────────── */}
      <section ref={r4} className="reveal py-20 px-4 bg-ivory-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">What We Host</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Every Occasion, One Venue</h2>
            <p className="text-charcoal-muted max-w-lg mx-auto">From intimate engagements to grand weddings, birthday milestones to corporate off-sites.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EVENT_TYPES.map(e => (
              <Link key={e.name} to={`/events/book?type=${e.name.toLowerCase().replace(' ','_')}`}
                className="bg-white rounded-2xl p-5 text-center border border-black/5 hover:border-maroon hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl mb-3">{e.icon}</div>
                <div className="font-semibold text-sm text-charcoal mb-1 group-hover:text-maroon transition-colors">{e.name}</div>
                <div className="text-xs text-charcoal-muted">{e.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ──────────────────────────────────────────── */}
      <section ref={r5} className="reveal py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Event Packages</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Choose Your Celebration Package</h2>
            <p className="text-charcoal-muted max-w-lg mx-auto">Transparent pricing, no hidden costs. Catering &amp; decor can be bundled or priced separately.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className={`bg-white rounded-2xl p-7 relative transition-all duration-300 hover:-translate-y-2 ${pkg.featured ? 'border-2 border-gold shadow-xl' : 'border border-black/6 shadow-sm hover:shadow-lg'}`}>
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-badge px-4">{pkg.badge}</div>
                )}
                <h3 className="font-serif text-xl font-semibold mb-1">{pkg.name}</h3>
                <p className="text-xs text-charcoal-muted mb-4">{pkg.capacity}</p>
                <div className="font-serif text-3xl font-semibold text-maroon mb-1">{pkg.price}</div>
                <p className="text-xs text-charcoal-muted mb-5">{pkg.note}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-charcoal-muted">
                      <FiCheck className="text-gold shrink-0" size={14} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/events/book" className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${pkg.featured ? 'btn-primary' : 'btn-outline'}`}>
                  {pkg.featured ? 'Book This Package' : 'Request Quote'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DINING ────────────────────────────────────────────── */}
      <section ref={r6} className="reveal py-20 px-4 bg-ivory-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-80 rounded-2xl relative overflow-hidden flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2A1008, #4A1E0F)' }}>
            <div className="text-center z-10">
              <div className="text-6xl mb-3 animate-float">🍛</div>
              <p className="font-serif text-xl text-gold/50 italic">Restaurant &amp; Catering</p>
              <p className="text-white/30 text-sm mt-1">250+ Dish Menu</p>
            </div>
          </div>
          <div>
            <p className="section-eyebrow">Restaurant &amp; Dining</p>
            <div className="gold-divider" />
            <h2 className="section-title">Food That Completes the Experience</h2>
            <p className="text-charcoal-muted leading-relaxed mb-6">
              Fresh home-style Indian meals, regional MP cuisine, and an à la carte menu for hotel guests at any hour. For events, our catering team manages everything from buffets to full-scale wedding meals with live counters.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[['🍱','Full-Day Dining','Breakfast, lunch, dinner &amp; snacks'],['🍛','Regional Specialties','Authentic MP cuisine &amp; local flavors'],['🎪','Live Counters','Chaat, dessert &amp; BBQ stations'],['🌿','250+ Dish Menu','Veg &amp; non-veg for all occasions']].map(([icon,t,d]) => (
                <div key={t} className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg shrink-0"
                    style={{ background: 'rgba(107,26,43,0.12)' }}>{icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{t}</div>
                    <div className="text-xs text-charcoal-muted" dangerouslySetInnerHTML={{ __html: d }} />
                  </div>
                </div>
              ))}
            </div>
            <Link to="/dining" className="btn-primary text-sm">View Restaurant &amp; Menu</Link>
          </div>
        </div>
      </section>

      {/* ─── ATTRACTIONS ───────────────────────────────────────── */}
      <section ref={r7} className="reveal py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Nearby Attractions</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Gateway to Narmada Valley</h2>
            <p className="text-charcoal-muted max-w-lg mx-auto">Yashraj Palace places you at the heart of one of Madhya Pradesh's most historically and spiritually rich regions.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ATTRACTIONS.map(a => (
              <Link key={a.name} to="/nearby-attractions"
                className={`relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br ${a.color} group`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-15 group-hover:opacity-30 transition-opacity">{a.icon}</div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-serif text-white text-lg font-semibold">{a.name}</div>
                  <div className="text-white/65 text-xs flex items-center gap-1 mt-0.5">
                    <FiArrowRight size={11} /> {a.dist}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-ivory-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Guest Reviews</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">What Our Guests Say</h2>
            <p className="text-charcoal-muted">Rated 4.8 out of 5 — based on 200+ guest reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex text-gold mb-4">
                  {[...Array(r.rating)].map((_,i) => <FaStar key={i} size={14} />)}
                  {[...Array(5 - r.rating)].map((_,i) => <FaStar key={i} size={14} className="text-gray-200" />)}
                </div>
                <p className="text-sm text-charcoal-muted leading-relaxed italic mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #8B2238, #6B1A2B)' }}>{r.initials}</div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{r.name}</div>
                    <div className="text-xs text-charcoal-muted">{r.occasion}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/reviews" className="text-maroon text-sm font-semibold hover:underline flex items-center justify-center gap-1">
              Read All Reviews <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ (AEO / AGO) ───────────────────────────────────── */}
      <section ref={r8} className="reveal py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Frequently Asked Questions</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Everything You Need to Know</h2>
            <p className="text-charcoal-muted">Quick answers to the most common questions about staying and celebrating at Yashraj Palace.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-charcoal text-sm leading-snug">{faq.q}</span>
                  <FiChevronDown
                    size={18}
                    className="shrink-0 transition-transform duration-300 text-gold"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {openFaq === i && (
                  <div className="faq-answer px-6 pb-5 text-sm text-charcoal-muted leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm text-charcoal-muted mb-4">Still have questions? We're one message away.</p>
            <a href="https://wa.me/917000000000" className="btn-whatsapp inline-flex text-sm px-6">
              <FaWhatsapp size={16} /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────── */}
      <section className="relative py-28 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3A0A18 0%, #5A1422 40%, #6B1A2B 70%, #8B2238 100%)' }}>
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="section-eyebrow text-gold">Ready to Book?</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-5">Your Palace Awaits</h2>
          <p className="text-white/65 mb-10 text-lg leading-relaxed">
            Book a room for tonight or plan the wedding of the decade. Our team is available on call and WhatsApp — 9 AM to 10 PM, every day.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link to="/book-room" className="btn-gold px-8 py-3.5 text-sm">Book a Room Now</Link>
            <Link to="/events/book" className="border-2 border-white/40 text-white px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-all">
              Enquire for Wedding
            </Link>
            <a href="https://wa.me/917000000000" className="btn-whatsapp px-6 py-3.5 text-sm">
              <FaWhatsapp size={16} /> WhatsApp Now
            </a>
          </div>
          <p className="text-white/35 text-sm">📞 +91 70000 00000 · Open 9 AM – 10 PM daily</p>
        </div>
      </section>
    </>
  )
}
