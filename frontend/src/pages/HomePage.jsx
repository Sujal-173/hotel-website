import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaWhatsapp, FaStar } from 'react-icons/fa'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { roomsAPI } from '../utils/api'
import toast from 'react-hot-toast'

const ROOM_TYPES = [
  { slug: 'deluxe-room',  name: 'Deluxe Room',  price: 1800, capacity: 2, bed: 'Queen Bed',  size: '280 sq ft', badge: 'Popular', img: '🏨' },
  { slug: 'premium-room', name: 'Premium Room', price: 2500, capacity: 2, bed: 'King Bed',   size: '380 sq ft', badge: 'Best Value', img: '🛏' },
  { slug: 'family-suite', name: 'Family Suite', price: 3800, capacity: 4, bed: '2 Beds',     size: '560 sq ft', badge: 'Spacious', img: '🏰' },
]

const EVENT_TYPES = [
  { icon: '💍', name: 'Wedding',         sub: 'Full ceremony & reception' },
  { icon: '🎊', name: 'Reception',       sub: 'Grand receptions, 1000 guests' },
  { icon: '💛', name: 'Engagement',      sub: 'Intimate to mid-size' },
  { icon: '🎂', name: 'Birthday Party',  sub: 'Theme setups & catering' },
  { icon: '🏢', name: 'Corporate Event', sub: 'Conferences & off-sites' },
  { icon: '🥂', name: 'Anniversary',     sub: 'Milestone celebrations' },
  { icon: '👨‍👩‍👧‍👦', name: 'Family Function', sub: 'Griha pravesh, puja & more' },
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
    features: ['Full property - garden + hall + lawn', 'Custom stage & luxury decor', 'Unlimited catering, live counters', '10 rooms for 2 nights', '2-day event team'],
  },
]

const REVIEWS = [
  { name: 'Ramesh Verma',  initials: 'RV', rating: 5, occasion: 'Wedding Reception · March 2025', text: 'We hosted my daughter\'s wedding reception here. The garden was beautifully lit, food was excellent, and the coordination team handled everything flawlessly. Highly recommended.' },
  { name: 'Priya Sharma',  initials: 'PS', rating: 5, occasion: 'Room Stay · January 2025',      text: 'Stayed 3 nights while visiting Maheshwar. The room was spotless, staff were incredibly warm, and the food genuinely tasty. This place has a real character to it.' },
  { name: 'Ankit Kulkarni',initials: 'AK', rating: 4, occasion: 'Corporate Event · Nov 2024',    text: 'We held our annual function here for 300 people. Great AV setup, good parking, and catering was well organised. Will return for our next event without hesitation.' },
]

const ATTRACTIONS = [
  { name: 'Maheshwar Fort',  dist: '12 km · 18 min', color: 'from-blue-900 to-blue-700',    icon: '🏯' },
  { name: 'Narmada Ghat',   dist: '14 km · 20 min', color: 'from-teal-900 to-teal-700',    icon: '🌊' },
  { name: 'Mandleshwar',    dist: '2 km · 5 min',   color: 'from-purple-900 to-purple-700', icon: '🕌' },
  { name: 'Omkareshwar',    dist: '38 km · 50 min', color: 'from-green-900 to-green-700',   icon: '⛩' },
]

export default function HomePage() {
  const navigate   = useNavigate()
  const [tab, setTab]         = useState('room')
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [roomType, setRoomType] = useState('')
  const [guests, setGuests]     = useState('2')
  const [eventType, setEventType]   = useState('wedding')
  const [eventDate, setEventDate]   = useState(null)
  const [guestCount, setGuestCount] = useState('')
  const [checkingAvail, setCheckingAvail] = useState(false)

  const handleCheckAvailability = async () => {
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
        <title>Yashraj Palace – Hotel, Wedding Garden & Events | Maheshwar | Mandleshwar</title>
        <meta name="description" content="Premium hotel, wedding garden and event venue near Maheshwar and Mandleshwar, MP. Book rooms from ₹1800/night. Wedding garden for 1000+ guests. Call +91 70000 00000." />
      </Helmet>

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-maroon-dark via-maroon to-maroon-dark flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div>
            <p className="section-eyebrow text-gold mb-4">Maheshwar · Mandleshwar · Narmada Valley</p>
            <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-semibold text-white leading-tight mb-4">
              A Palace for <em className="text-gold-light">Grand Stays</em> and <em className="text-gold-light">Grander Celebrations</em>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Premium rooms, a majestic wedding garden, and banquet halls for weddings, receptions, corporate events, and family celebrations — all in one address near Maheshwar Fort and the Narmada Ghats.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/book-room" className="btn-gold text-sm px-7 py-3.5">Book a Room</Link>
              <Link to="/events/book" className="btn-outline-white border-2 border-white/40 text-white px-6 py-3 rounded font-semibold text-sm hover:border-white hover:bg-white/10 transition-all">Plan a Wedding</Link>
              <a href="https://wa.me/917000000000" className="btn-whatsapp text-sm px-5 py-3">
                <FaWhatsapp size={16} /> WhatsApp Us
              </a>
            </div>
            {/* Trust stats */}
            <div className="flex gap-8">
              {[['500+','Events Hosted'],['4.8★','Guest Rating'],['20+','Rooms'],['1000','Max Guests']].map(([n,l]) => (
                <div key={l}>
                  <div className="font-serif text-2xl font-semibold text-gold-light">{n}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Widget */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-maroon font-bold text-center mb-4 tracking-wide">Check Availability</h3>
            {/* Tabs */}
            <div className="flex bg-ivory rounded-lg p-1 mb-5 gap-1">
              {[['room','Room Stay'],['event','Wedding / Event']].map(([v,l]) => (
                <button key={v} onClick={() => setTab(v)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${tab === v ? 'bg-maroon text-white' : 'text-charcoal-muted hover:text-maroon'}`}>
                  {l}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {tab === 'room' ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Check-In</label>
                      <DatePicker selected={checkIn} onChange={setCheckIn} minDate={new Date()} placeholderText="Select date" className="input-field" />
                    </div>
                    <div>
                      <label className="label">Check-Out</label>
                      <DatePicker selected={checkOut} onChange={setCheckOut} minDate={checkIn || new Date()} placeholderText="Select date" className="input-field" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Room Type</label>
                      <select className="input-field" value={roomType} onChange={e => setRoomType(e.target.value)}>
                        <option value="">Any Room</option>
                        <option value="deluxe">Deluxe Room</option>
                        <option value="premium">Premium Room</option>
                        <option value="suite">Family Suite</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Guests</label>
                      <select className="input-field" value={guests} onChange={e => setGuests(e.target.value)}>
                        {['1','2','3','4','5','6+'].map(g => <option key={g} value={g}>{g} Guest{g !== '1' ? 's' : ''}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="label">Event Type</label>
                    <select className="input-field" value={eventType} onChange={e => setEventType(e.target.value)}>
                      {['wedding','reception','engagement','birthday','anniversary','corporate','family','cultural'].map(t => (
                        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Event Date</label>
                      <DatePicker selected={eventDate} onChange={setEventDate} minDate={new Date()} placeholderText="Select date" className="input-field" />
                    </div>
                    <div>
                      <label className="label">Guest Count</label>
                      <input type="number" placeholder="No. of guests" className="input-field" value={guestCount} onChange={e => setGuestCount(e.target.value)} />
                    </div>
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

      {/* ─── TRUST BAR ────────────────────────────────────────────────── */}
      <div className="bg-ivory-dark border-b border-gold/20 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between gap-4">
          {[['🅿️','Free Parking 100+ Vehicles'],['🍽️','In-House Catering & Restaurant'],['💒','Dedicated Wedding Manager'],['📶','High-Speed Wi-Fi'],['✅','Instant WhatsApp Confirmation']].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-2 text-sm text-charcoal-muted font-medium">
              <div className="w-7 h-7 bg-maroon rounded-full flex items-center justify-center text-white text-xs">{icon}</div>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ─── ROOMS ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-eyebrow">Stay at Yashraj Palace</p>
            <div className="gold-divider" />
            <h2 className="section-title max-w-xl">Rooms Designed for Comfort & Elegance</h2>
            <p className="text-charcoal-muted max-w-xl leading-relaxed">Every room is appointed with warm interiors, modern amenities, and the quiet comfort of a palace-style retreat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROOM_TYPES.map(room => (
              <div key={room.slug} className="card group">
                <div className="relative h-52 bg-gradient-to-br from-ivory-dark to-[#D5C8B8] flex items-center justify-center">
                  <span className="text-6xl opacity-20">{room.img}</span>
                  <div className="absolute top-3 right-3 badge bg-maroon text-white">From ₹{room.price.toLocaleString('en-IN')}/night</div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold mb-2">{room.name}</h3>
                  <div className="flex gap-4 text-xs text-charcoal-muted mb-4 flex-wrap">
                    <span>🛏 {room.bed}</span>
                    <span>👥 {room.capacity} Guests</span>
                    <span>📐 {room.size}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-serif text-2xl font-semibold text-maroon">₹{room.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-charcoal-muted">per night + taxes</span>
                  </div>
                  <Link to={`/rooms/${room.slug}`} className="btn-outline block text-center text-sm py-2">
                    View Room & Book →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/rooms" className="btn-primary px-8">View All Rooms & Amenities</Link>
          </div>
        </div>
      </section>

      {/* ─── WEDDING SECTION ─────────────────────────────────────────── */}
      <section className="bg-maroon-dark py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-xl h-96 lg:h-[480px] bg-white/5 border border-gold/20 flex items-center justify-center">
            <span className="font-serif text-5xl text-gold/20 italic">Wedding Garden</span>
          </div>
          <div>
            <p className="section-eyebrow text-gold">Wedding & Event Garden</p>
            <div className="gold-divider" />
            <h2 className="font-serif text-4xl font-semibold text-white leading-tight mb-4">Make Every Celebration a Memory They'll Never Forget</h2>
            <p className="text-white/65 leading-relaxed mb-8">Yashraj Palace's wedding garden and banquet hall have hosted hundreds of weddings, receptions, and milestone celebrations. With space for up to 1,000 guests, in-house catering, full decoration support, and dedicated event management — your celebration is in the best hands.</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                ['Garden Capacity','Up to 1,000 guests, flexible seating'],
                ['Decoration Support','Floral, lighting, stage & mandap'],
                ['In-House Catering','250+ dish menu, live counters'],
                ['Room Bundle','Block rooms for wedding family'],
                ['Parking','Free parking for 100+ vehicles'],
                ['AV & Lighting','DJ, sound system, lighting rig'],
              ].map(([t,d]) => (
                <div key={t} className="bg-white/6 border border-gold/15 rounded-lg p-3">
                  <div className="text-gold-light text-sm font-semibold mb-1">{t}</div>
                  <div className="text-white/55 text-xs">{d}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/events/book?type=wedding" className="btn-gold text-sm">Book Wedding / Event</Link>
              <Link to="/events/packages" className="border-2 border-white/40 text-white px-6 py-3 rounded font-semibold text-sm hover:border-white hover:bg-white/10 transition-all">View Packages</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EVENT TYPES ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-ivory-dark">
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
                className="bg-white rounded-xl p-5 text-center border border-black/5 hover:border-maroon hover:shadow-md transition-all group">
                <div className="text-4xl mb-3">{e.icon}</div>
                <div className="font-semibold text-sm text-charcoal mb-1 group-hover:text-maroon">{e.name}</div>
                <div className="text-xs text-charcoal-muted">{e.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Event Packages</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Choose Your Celebration Package</h2>
            <p className="text-charcoal-muted max-w-lg mx-auto">Transparent pricing, no hidden costs. Catering & decor can be bundled or priced separately.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className={`bg-white rounded-xl p-7 relative ${pkg.featured ? 'border-2 border-gold shadow-lg' : 'border border-black/6 shadow-sm'}`}>
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-gold text-charcoal px-4">{pkg.badge}</div>
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
                <Link to="/events/book" className={`block text-center py-2.5 rounded font-semibold text-sm transition-all ${pkg.featured ? 'btn-primary' : 'btn-outline'}`}>
                  {pkg.featured ? 'Book This Package' : 'Request Quote'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DINING ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-ivory-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-80 rounded-xl bg-gradient-to-br from-[#2A1008] to-[#4A1E0F] flex items-center justify-center">
            <span className="font-serif text-4xl text-gold/25 italic">Restaurant & Catering</span>
          </div>
          <div>
            <p className="section-eyebrow">Restaurant & Dining</p>
            <div className="gold-divider" />
            <h2 className="section-title">Food That Completes the Experience</h2>
            <p className="text-charcoal-muted leading-relaxed mb-6">Fresh home-style Indian meals, regional MP cuisine, and an à la carte menu for hotel guests at any hour. For events, our catering team manages everything from buffets to full-scale wedding meals.</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[['🍱','Full-Day Dining','Breakfast, lunch, dinner & snacks'],['🍛','Regional Specialties','Authentic MP cuisine & local flavors'],['🎪','Live Counters','Chaat, dessert & BBQ stations'],['🌿','250+ Dish Menu','Veg & non-veg for all occasions']].map(([icon,t,d]) => (
                <div key={t} className="flex gap-3">
                  <div className="w-9 h-9 bg-maroon/10 rounded-lg flex items-center justify-center text-lg shrink-0">{icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{t}</div>
                    <div className="text-xs text-charcoal-muted">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/dining" className="btn-primary text-sm">View Restaurant & Menu</Link>
          </div>
        </div>
      </section>

      {/* ─── ATTRACTIONS ─────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Nearby Attractions</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Gateway to Narmada Valley</h2>
            <p className="text-charcoal-muted max-w-lg mx-auto">Yashraj Palace places you at the heart of one of Madhya Pradesh's most historically and spiritually rich regions.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ATTRACTIONS.map(a => (
              <Link key={a.name} to="/nearby-attractions" className={`relative h-56 rounded-xl overflow-hidden bg-gradient-to-br ${a.color} group`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-15 group-hover:opacity-25 transition-opacity">{a.icon}</div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-serif text-white text-lg font-semibold">{a.name}</div>
                  <div className="text-white/65 text-xs">{a.dist}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-ivory-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Guest Reviews</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-white rounded-xl p-6 shadow-sm border border-black/5">
                <div className="flex text-gold mb-4">
                  {[...Array(r.rating)].map((_,i) => <FaStar key={i} size={14} />)}
                  {[...Array(5 - r.rating)].map((_,i) => <FaStar key={i} size={14} className="text-gray-200" />)}
                </div>
                <p className="text-sm text-charcoal-muted leading-relaxed italic mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-maroon text-white flex items-center justify-center text-xs font-bold">{r.initials}</div>
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

      {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-maroon-dark via-maroon to-maroon-dark py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="section-eyebrow text-gold">Ready to Book?</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Your Palace Awaits</h2>
          <p className="text-white/65 mb-10 text-lg">Book a room for tonight or plan the wedding of the decade. Our team is available on call and WhatsApp.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/book-room" className="btn-gold px-8 py-3.5 text-sm">Book a Room Now</Link>
            <Link to="/events/book" className="border-2 border-white/40 text-white px-7 py-3.5 rounded font-semibold text-sm hover:bg-white/10 transition-all">Enquire for Wedding</Link>
            <a href="https://wa.me/917000000000" className="btn-whatsapp px-6 py-3.5 text-sm">
              <FaWhatsapp size={16} /> WhatsApp Now
            </a>
          </div>
          <p className="text-white/40 text-sm mt-8">📞 +91 70000 00000 · Open 9 AM – 10 PM daily</p>
        </div>
      </section>
    </>
  )
}
