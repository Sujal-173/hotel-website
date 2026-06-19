import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaWhatsapp } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Calendar, Users, Star, ChevronDown, Check, ArrowRight, Quote,
  Plus, Minus, Crown, MapPin, Heart, Utensils, ShieldCheck, Music,
  Phone, Gift
} from 'lucide-react'
import { roomsAPI } from '../utils/api'
import toast from 'react-hot-toast'

const ROOM_TYPES = [
  { slug: 'deluxe-room',  name: 'Deluxe Room',  price: 1800, capacity: 2, bed: 'Queen Bed', size: '280 sq ft', imgClass: 'room-img-deluxe' },
  { slug: 'premium-room', name: 'Premium Room', price: 2500, capacity: 2, bed: 'King Bed',  size: '380 sq ft', imgClass: 'room-img-premium' },
  { slug: 'family-suite', name: 'Family Suite', price: 3800, capacity: 4, bed: '2 Beds',    size: '560 sq ft', imgClass: 'room-img-suite' },
]

const WHY_ITEMS = [
  { icon: <Crown size={28} />,      title: 'Heritage Architecture', desc: 'Inspired by traditional Indian havelis with intricate carvings and stately pillars.' },
  { icon: <MapPin size={28} />,     title: 'Prime Location',        desc: 'Conveniently located near Maheshwar Fort, easily accessible for all your guests.' },
  { icon: <Utensils size={28} />,   title: 'Culinary Excellence',   desc: 'Our master chefs prepare exquisite pure vegetarian delicacies for every occasion.' },
  { icon: <ShieldCheck size={28} />,title: 'Impeccable Service',    desc: 'Warm Indian hospitality where every guest is treated like royalty, every time.' },
  { icon: <Users size={28} />,      title: 'Vast Spaces',           desc: 'Multiple venues including grand lawns and AC banquet halls for any gathering size.' },
  { icon: <Heart size={28} />,      title: 'Custom Packages',       desc: 'Tailor-made solutions to fit your specific event requirements and budget.' },
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
  { name: 'Ramesh Verma',   initials: 'RV', rating: 5, occasion: 'Wedding Reception · March 2025', text: "We hosted my daughter's wedding reception here. The garden was beautifully lit, food was excellent, and the coordination team handled everything flawlessly. Highly recommended." },
  { name: 'Priya Sharma',   initials: 'PS', rating: 5, occasion: 'Room Stay · January 2025',        text: 'Stayed 3 nights while visiting Maheshwar. The room was spotless, staff were incredibly warm, and the food genuinely tasty. This place has a real character to it.' },
  { name: 'Ankit Kulkarni', initials: 'AK', rating: 4, occasion: 'Corporate Event · Nov 2024',      text: 'We held our annual function here for 300 people. Great AV setup, good parking, and catering was well organised. Will return for our next event without hesitation.' },
]

const EVENT_TYPES = [
  { icon: '💍', name: 'Wedding',        sub: 'Full ceremony & reception' },
  { icon: '🎊', name: 'Reception',      sub: 'Grand receptions, 1000 guests' },
  { icon: '💛', name: 'Engagement',     sub: 'Intimate to mid-size' },
  { icon: '🎂', name: 'Birthday Party', sub: 'Theme setups & catering' },
  { icon: '🏢', name: 'Corporate',      sub: 'Conferences & off-sites' },
  { icon: '🥂', name: 'Anniversary',    sub: 'Milestone celebrations' },
  { icon: '🏠', name: 'Family Function',sub: 'Griha pravesh, puja & more' },
  { icon: '🎭', name: 'Cultural Event', sub: 'Stage shows & gatherings' },
]

const FAQS = [
  { q: 'Where is Yashraj Palace located?', a: 'Yashraj Palace is located near Mandleshwar in the Khargone District of Madhya Pradesh — approximately 12 km from Maheshwar Fort, 14 km from the Narmada Ghats, and 2 km from Mandleshwar town. Easily accessible from Indore (90 km) and Bhopal (230 km) by road.' },
  { q: 'What is the capacity of your wedding garden?', a: 'Our grand wedding lawn can comfortably accommodate up to 1,000+ guests, making it ideal for large weddings and receptions. We also have AC banquet halls for intimate ceremonies of 100–300 guests.' },
  { q: 'What are the room rates at Yashraj Palace?', a: 'Rooms start at ₹1,800 per night for the Deluxe Room. The Premium Room is ₹2,500/night (King Bed, complimentary breakfast) and the Family Suite is ₹3,800/night (2 beds, up to 4 guests). All prices are + applicable taxes.' },
  { q: 'Do you provide in-house catering?', a: 'Yes. Our in-house culinary team provides a 250+ dish menu covering regional MP cuisine, North Indian, and continental options. For events we offer live counters (chaat, desserts, tandoor) and full buffet setups.' },
  { q: 'Can we bring our own decorators?', a: 'While we have our own empanelled premium decorators who understand the venue best, you are welcome to bring your own decorators subject to management approval and venue guidelines.' },
  { q: 'Are rooms included in wedding packages?', a: 'Our Royal Wedding package includes 4 complimentary rooms (1 night) and the Grand Palace package includes 10 rooms (2 nights). Additional rooms can be booked at a special discounted tariff for your guests.' },
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
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function OrnamentDivider({ icon }) {
  return (
    <div className="flex items-center justify-center my-5">
      <span className="h-px bg-gold flex-grow max-w-[80px]" />
      <span className="mx-4 text-gold">{icon || <Crown size={18} />}</span>
      <span className="h-px bg-gold flex-grow max-w-[80px]" />
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [tab, setTab]               = useState('room')
  const [checkIn, setCheckIn]       = useState(null)
  const [checkOut, setCheckOut]     = useState(null)
  const [roomType, setRoomType]     = useState('')
  const [guests, setGuests]         = useState('2')
  const [eventType, setEventType]   = useState('wedding')
  const [eventDate, setEventDate]   = useState(null)
  const [guestCount, setGuestCount] = useState('')
  const [openFaq, setOpenFaq]       = useState(0)

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

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center bg-stone-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c6a4d142104d?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(107,26,43,0.92) 0%, rgba(107,26,43,0.6) 55%, transparent 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col lg:flex-row items-center gap-12">
          {/* Left: headline with ornamental frame */}
          <div className="lg:w-1/2 text-white animate-fade-in-up">
            <div className="relative border border-gold/40 p-8 md:p-12 backdrop-blur-sm bg-maroon/20">
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-gold -translate-x-2 -translate-y-2" />
              <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-gold translate-x-2 -translate-y-2" />
              <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-gold -translate-x-2 translate-y-2" />
              <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-gold translate-x-2 translate-y-2" />

              <div className="flex items-center gap-3 mb-5">
                <span className="h-px bg-gold w-10" />
                <span className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">Welcome to Royalty</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-5">
                A Palace for Grand Stays &amp; Grander Celebrations
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Experience the timeless elegance of royal heritage combined with modern luxury at Maheshwar's premier estate — near Mandleshwar, Madhya Pradesh.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/book-room"
                  className="bg-gold text-maroon text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-white transition-colors">
                  Explore Rooms
                </Link>
                <Link to="/events/book?type=wedding"
                  className="border border-gold text-gold text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-gold/10 transition-colors">
                  Plan a Wedding
                </Link>
                <a href="https://wa.me/917000000000"
                  className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors">
                  <FaWhatsapp size={15} /> WhatsApp
                </a>
              </div>

              {/* Trust stats */}
              <div className="flex gap-8">
                {[['500+','Events'],['4.8★','Rating'],['1000','Max Guests'],['20+','Years']].map(([n,l]) => (
                  <div key={l}>
                    <div className="font-serif text-xl font-bold text-gold">{n}</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking widget */}
          <div className="lg:w-1/2 w-full max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="bg-[#FAF7F2] shadow-2xl border border-gold/20 p-8">
              <div className="text-center mb-5">
                <h2 className="font-serif text-2xl text-maroon">Reserve Your Stay</h2>
                <OrnamentDivider />
              </div>

              {/* Tab switcher */}
              <div className="flex gap-0 mb-6 border border-stone-200">
                {[['room','Room Stay'],['event','Wedding / Event']].map(([v,l]) => (
                  <button key={v} onClick={() => setTab(v)}
                    className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      tab === v ? 'bg-maroon text-white' : 'text-stone-500 hover:text-maroon bg-white'
                    }`}>
                    {l}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                {tab === 'room' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">Check-In</label>
                        <div className="flex items-center border-b border-stone-300 pb-2 gap-2">
                          <Calendar size={16} className="text-gold shrink-0" />
                          <DatePicker selected={checkIn} onChange={setCheckIn} minDate={new Date()} placeholderText="Select date"
                            className="w-full bg-transparent outline-none text-sm text-stone-800" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">Check-Out</label>
                        <div className="flex items-center border-b border-stone-300 pb-2 gap-2">
                          <Calendar size={16} className="text-gold shrink-0" />
                          <DatePicker selected={checkOut} onChange={setCheckOut} minDate={checkIn || new Date()} placeholderText="Select date"
                            className="w-full bg-transparent outline-none text-sm text-stone-800" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">Guests</label>
                      <div className="flex items-center border-b border-stone-300 pb-2 gap-2">
                        <Users size={16} className="text-gold shrink-0" />
                        <select className="w-full bg-transparent outline-none text-sm text-stone-800 appearance-none"
                          value={guests} onChange={e => setGuests(e.target.value)}>
                          {['1','2','3','4','5','6+'].map(g => <option key={g} value={g}>{g} Guest{g !== '1' ? 's' : ''}</option>)}
                        </select>
                        <ChevronDown size={14} className="text-stone-400 shrink-0" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">Room Type</label>
                      <div className="flex items-center border-b border-stone-300 pb-2 gap-2">
                        <Heart size={16} className="text-gold shrink-0" />
                        <select className="w-full bg-transparent outline-none text-sm text-stone-800 appearance-none"
                          value={roomType} onChange={e => setRoomType(e.target.value)}>
                          <option value="">Any Room</option>
                          <option value="deluxe">Deluxe Room (₹1,800)</option>
                          <option value="premium">Premium Room (₹2,500)</option>
                          <option value="suite">Family Suite (₹3,800)</option>
                        </select>
                        <ChevronDown size={14} className="text-stone-400 shrink-0" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">Event Type</label>
                      <div className="flex items-center border-b border-stone-300 pb-2 gap-2">
                        <Gift size={16} className="text-gold shrink-0" />
                        <select className="w-full bg-transparent outline-none text-sm text-stone-800 appearance-none"
                          value={eventType} onChange={e => setEventType(e.target.value)}>
                          {['wedding','reception','engagement','birthday','anniversary','corporate','family','cultural'].map(t => (
                            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="text-stone-400 shrink-0" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">Event Date</label>
                        <div className="flex items-center border-b border-stone-300 pb-2 gap-2">
                          <Calendar size={16} className="text-gold shrink-0" />
                          <DatePicker selected={eventDate} onChange={setEventDate} minDate={new Date()} placeholderText="Select date"
                            className="w-full bg-transparent outline-none text-sm text-stone-800" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">Guest Count</label>
                        <div className="flex items-center border-b border-stone-300 pb-2 gap-2">
                          <Users size={16} className="text-gold shrink-0" />
                          <input type="number" placeholder="No. of guests"
                            className="w-full bg-transparent outline-none text-sm text-stone-800"
                            value={guestCount} onChange={e => setGuestCount(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button onClick={handleCheckAvailability}
                  className="w-full bg-maroon text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8A243A] transition-colors flex items-center justify-center gap-2 mt-4">
                  Check Availability <ArrowRight size={15} />
                </button>
                <p className="text-center text-[11px] text-stone-400">Free cancellation · Instant confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
      <div className="relative z-20 -mt-8 mx-4 md:mx-12 lg:mx-24 bg-[#FAF7F2] border border-gold/30 shadow-2xl py-7">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { icon: <Star size={20} fill="currentColor" />, val: '4.8/5',   sub: 'Guest Rating' },
              { icon: <Users size={20} />,                    val: '1,000+', sub: 'Wedding Capacity' },
              { icon: <Music size={20} />,                    val: '500+',   sub: 'Events Hosted' },
              { icon: <Utensils size={20} />,                 val: 'Pure Veg',sub: 'Royal Dining' },
              { icon: <MapPin size={20} />,                   val: 'Prime',  sub: 'Location', span: true },
            ].map((t, i) => (
              <div key={i} className={`flex flex-col items-center ${t.span ? 'col-span-2 md:col-span-1' : ''}`}>
                <div className="w-11 h-11 rounded-full border border-gold flex items-center justify-center text-gold mb-2">
                  {t.icon}
                </div>
                <span className="font-serif text-maroon font-bold text-base">{t.val}</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROOMS ─────────────────────────────────────────────────── */}
      <section ref={r1} className="reveal py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-bold">Accommodation</span>
            <h2 className="font-serif text-4xl md:text-5xl text-maroon mt-4">Royal Chambers</h2>
            <OrnamentDivider />
            <p className="text-stone-600 leading-relaxed">Rest in the lap of luxury. Each room is meticulously designed with heritage aesthetics and modern comforts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ROOM_TYPES.map(room => (
              <div key={room.slug} className="group bg-white border border-stone-200 overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
                <div className="absolute top-4 right-4 bg-maroon text-white text-xs font-serif px-3 py-1 z-10 shadow-md">
                  ₹{room.price.toLocaleString('en-IN')} / night
                </div>
                <div className={`h-60 ${room.imgClass} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-maroon/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-7 relative">
                  {/* Decorative corners */}
                  <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold mt-2 ml-2" />
                  <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-gold mt-2 mr-2" />

                  <h3 className="font-serif text-2xl text-maroon mb-2">{room.name}</h3>
                  <div className="flex gap-4 text-xs text-stone-500 mb-5 pb-5 border-b border-stone-100">
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-gold" /> {room.size}</span>
                    <span className="flex items-center gap-1"><Users size={12} className="text-gold" /> {room.capacity} Guests</span>
                    <span className="flex items-center gap-1"><Heart size={12} className="text-gold" /> {room.bed}</span>
                  </div>
                  <ul className="space-y-1.5 mb-7 text-sm text-stone-600">
                    <li className="flex items-center gap-2"><Check size={13} className="text-gold" /> Complimentary Breakfast</li>
                    <li className="flex items-center gap-2"><Check size={13} className="text-gold" /> Free Wi-Fi</li>
                    <li className="flex items-center gap-2"><Check size={13} className="text-gold" /> 24/7 Room Service</li>
                  </ul>
                  <Link to={`/rooms/${room.slug}`}
                    className="block w-full text-center border border-maroon text-maroon py-3 text-xs font-bold uppercase tracking-wider group-hover:bg-maroon group-hover:text-white transition-colors">
                    View Details &amp; Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/rooms"
              className="bg-maroon text-white text-xs font-bold uppercase tracking-[0.15em] px-10 py-4 hover:bg-[#8A243A] transition-colors inline-block">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* ── WEDDING SECTION ───────────────────────────────────────── */}
      <section ref={r2} className="reveal relative py-24 overflow-hidden" style={{ background: '#6B1A2B' }}>
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image with diamond corners */}
            <div className="lg:w-1/2">
              <div className="relative p-3 border-2 border-gold/40">
                <span className="absolute -top-3 -left-3 w-6 h-6 bg-maroon border border-gold rotate-45 block" />
                <span className="absolute -top-3 -right-3 w-6 h-6 bg-maroon border border-gold rotate-45 block" />
                <span className="absolute -bottom-3 -left-3 w-6 h-6 bg-maroon border border-gold rotate-45 block" />
                <span className="absolute -bottom-3 -right-3 w-6 h-6 bg-maroon border border-gold rotate-45 block" />
                <div className="h-[420px] lg:h-[500px] bg-gradient-to-br from-maroon-light/30 to-stone-900/60 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <div className="text-8xl mb-4 animate-float">💍</div>
                    <p className="font-serif text-2xl text-gold/70 italic">Wedding Garden</p>
                    <p className="text-white/40 text-sm mt-1">Up to 1,000 Guests</p>
                  </div>
                  <span className="absolute top-4 left-4 w-8 h-8 border-l border-t border-gold/30" />
                  <span className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-gold/30" />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="lg:w-1/2 text-white">
              <span className="text-gold text-xs uppercase tracking-[0.25em] font-bold">Grand Celebrations</span>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4 leading-tight">
                The Perfect Setting for Your Royal Wedding
              </h2>
              <div className="w-20 h-0.5 bg-gold mb-7" />
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Our magnificent wedding garden and regal banquet halls provide a breathtaking backdrop for your special day. From intimate ceremonies to grand receptions for 1,000+ guests — with in-house catering, full decoration, and dedicated coordination.
              </p>
              <div className="grid grid-cols-2 gap-7 mb-10">
                {[
                  { Icon: Users,       title: '1000+ Guests',    sub: 'Sprawling lush lawns' },
                  { Icon: Utensils,    title: 'Royal Catering',  sub: 'Authentic veg feasts' },
                  { Icon: ShieldCheck, title: 'Event Planning',  sub: 'End-to-end management' },
                  { Icon: Heart,       title: 'Bridal Suites',   sub: 'Dedicated luxury spaces' },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-gold/15 p-2.5 shrink-0 text-gold"><f.Icon size={22} className="text-gold" /></div>
                    <div>
                      <h4 className="font-serif text-lg">{f.title}</h4>
                      <p className="text-white/55 text-sm">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/events/book?type=wedding"
                  className="bg-gold text-maroon text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-white transition-colors">
                  Book Wedding / Event
                </Link>
                <Link to="/events/packages"
                  className="border border-gold/60 text-gold text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-gold/10 transition-colors">
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
      <section ref={r3} className="reveal py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-bold">The Yashraj Experience</span>
            <h2 className="font-serif text-4xl md:text-5xl text-maroon mt-4">Why Choose Us</h2>
            <OrnamentDivider icon={<Star size={18} />} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="group bg-stone-50 border border-stone-200 p-8 text-center hover:border-gold transition-all duration-300">
                <div className="w-16 h-16 mx-auto rounded-full border border-gold/40 flex items-center justify-center text-gold mb-5 group-hover:bg-maroon group-hover:border-maroon group-hover:text-gold group-hover:scale-110 transition-all duration-300 bg-white">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-maroon mb-2 group-hover:text-maroon">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT TYPES ───────────────────────────────────────────── */}
      <section ref={r4} className="reveal py-20 px-6 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-bold">Every Occasion</span>
            <h2 className="font-serif text-3xl md:text-4xl text-maroon mt-4">Events We Host</h2>
            <OrnamentDivider icon={<Gift size={18} />} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EVENT_TYPES.map(ev => (
              <Link key={ev.name} to={`/events/${ev.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white border border-stone-200 p-5 text-center hover:border-gold hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-3">{ev.icon}</div>
                <h3 className="font-serif text-maroon text-base mb-1 group-hover:text-maroon">{ev.name}</h3>
                <p className="text-stone-500 text-xs">{ev.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ──────────────────────────────────────────────── */}
      <section ref={r5} className="reveal py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-bold">Event Pricing</span>
            <h2 className="font-serif text-4xl md:text-5xl text-maroon mt-4">Curated Packages</h2>
            <OrnamentDivider icon={<Gift size={18} />} />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
            {PACKAGES.map((pkg, i) => (
              <div key={i}
                className={`w-full lg:w-1/3 relative text-center border ${
                  pkg.featured
                    ? 'bg-maroon text-white border-gold shadow-2xl lg:-translate-y-5'
                    : 'bg-white text-stone-800 border-stone-200 shadow-sm'
                }`}
              >
                {pkg.featured && pkg.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-maroon px-4 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
                    {pkg.badge}
                  </div>
                )}
                <div className="p-8">
                  <h3 className={`font-serif text-2xl mb-1 ${pkg.featured ? '' : 'text-maroon'}`}>{pkg.name}</h3>
                  <p className={`text-xs mb-5 ${pkg.featured ? 'text-white/60' : 'text-stone-500'}`}>{pkg.capacity}</p>
                  <div className={`font-serif text-3xl mb-1 font-bold ${pkg.featured ? 'text-gold' : 'text-maroon'}`}>{pkg.price}</div>
                  <p className={`text-xs mb-6 ${pkg.featured ? 'text-white/55' : 'text-stone-400'}`}>{pkg.note}</p>
                  <div className={`h-px w-full mb-6 ${pkg.featured ? 'bg-gold/30' : 'bg-stone-100'}`} />
                  <ul className={`text-sm space-y-3 mb-8 text-left ${pkg.featured ? 'text-white/85' : 'text-stone-600'}`}>
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check size={14} className={`shrink-0 mt-0.5 ${pkg.featured ? 'text-gold' : 'text-gold'}`} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/events/book"
                    className={`block w-full py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                      pkg.featured
                        ? 'bg-gold text-maroon hover:bg-white'
                        : 'border border-maroon text-maroon hover:bg-maroon hover:text-white'
                    }`}>
                    {pkg.featured ? 'Book Package' : 'Enquire Now'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <section ref={r6} className="reveal py-24 bg-[#FAF7F2] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-xs uppercase tracking-[0.25em] font-bold">Guest Book</span>
            <h2 className="font-serif text-4xl md:text-5xl text-maroon mt-4">Royal Testimonials</h2>
            <OrnamentDivider icon={<Quote size={18} />} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white border-t-4 border-gold shadow-md p-8 relative">
                <Quote size={40} className="absolute top-4 right-4 text-gold/15" />
                <div className="flex gap-0.5 text-gold mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-stone-600 mb-6 italic leading-relaxed text-sm">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center text-white font-serif text-lg shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-maroon text-sm">{review.name}</h4>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">{review.occasion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/reviews"
              className="border border-maroon text-maroon text-xs font-bold uppercase tracking-[0.15em] px-10 py-4 hover:bg-maroon hover:text-white transition-colors inline-block">
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section ref={r7} className="reveal py-24 bg-stone-100 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-maroon">Frequently Asked Questions</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-stone-200 overflow-hidden">
                <button
                  className="w-full px-7 py-5 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-serif text-lg text-maroon pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <Minus className="text-gold shrink-0" size={20} />
                    : <Plus className="text-gold shrink-0" size={20} />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4 faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section ref={r8} className="reveal py-16 bg-maroon px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-3">Ready to Create Memories?</h2>
          <p className="text-white/70 mb-8 text-lg">Book your stay or plan your dream event at Yashraj Palace — Mandleshwar, MP.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book-room"
              className="bg-gold text-maroon text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-white transition-colors">
              Book a Room
            </Link>
            <Link to="/events/book"
              className="border border-gold text-gold text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-gold/10 transition-colors">
              Plan an Event
            </Link>
            <a href="https://wa.me/917000000000"
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-8 py-4 transition-colors">
              <FaWhatsapp size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
