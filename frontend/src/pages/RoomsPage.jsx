import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { roomsAPI } from '../utils/api'
import toast from 'react-hot-toast'
import { FiCheck, FiUsers, FiMaximize2 } from 'react-icons/fi'

const AMENITIES = ['Free Wi-Fi','AC','Hot Water','24/7 Room Service','TV','Housekeeping','Parking','Power Backup']

const ROOMS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Yashraj Palace',
  url: 'https://www.yashrajpalace.com/rooms',
  containsPlace: [
    {
      '@type': 'HotelRoom',
      name: 'Deluxe Room',
      description: 'A well-appointed room with a queen bed, garden or courtyard view, premium linens, and all essentials for a restful stay near Maheshwar.',
      url: 'https://www.yashrajpalace.com/rooms/deluxe-room',
      bed: [{ '@type': 'BedDetails', typeOfBed: 'Queen size bed', numberOfBeds: 1 }],
      occupancy: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2 },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Hot Water', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Room Service', value: true },
      ],
      offers: {
        '@type': 'Offer',
        price: '1800',
        priceCurrency: 'INR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '1800', priceCurrency: 'INR', unitText: 'night' },
      },
    },
    {
      '@type': 'HotelRoom',
      name: 'Premium Room',
      description: 'Elevated comfort with a king-size bed, sitting area, designer bathroom with hot shower, and complimentary breakfast near Mandleshwar.',
      url: 'https://www.yashrajpalace.com/rooms/premium-room',
      bed: [{ '@type': 'BedDetails', typeOfBed: 'King size bed', numberOfBeds: 1 }],
      occupancy: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2 },
      offers: {
        '@type': 'Offer',
        price: '2500',
        priceCurrency: 'INR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '2500', priceCurrency: 'INR', unitText: 'night' },
      },
    },
    {
      '@type': 'HotelRoom',
      name: 'Family Suite',
      description: 'Spacious suite with separate living area, two beds for up to 4 guests — ideal for families visiting Maheshwar Fort and Narmada Valley.',
      url: 'https://www.yashrajpalace.com/rooms/family-suite',
      bed: [{ '@type': 'BedDetails', typeOfBed: 'Double bed', numberOfBeds: 2 }],
      occupancy: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 4 },
      offers: {
        '@type': 'Offer',
        price: '3800',
        priceCurrency: 'INR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '3800', priceCurrency: 'INR', unitText: 'night' },
      },
    },
  ],
}

const IMG_CLASS = { deluxe: 'room-img-deluxe', premium: 'room-img-premium', suite: 'room-img-suite' }

export default function RoomsPage() {
  const [searchParams] = useSearchParams()
  const [rooms, setRooms]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [checkIn, setCheckIn]     = useState(searchParams.get('checkIn')  ? new Date(searchParams.get('checkIn'))  : null)
  const [checkOut, setCheckOut]   = useState(searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')) : null)
  const [guests, setGuests]       = useState(searchParams.get('guests') || '2')
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '')

  useEffect(() => {
    roomsAPI.getAll(typeFilter ? { type: typeFilter } : {})
      .then(r => setRooms(r.data.rooms))
      .catch(() => toast.error('Failed to load rooms'))
      .finally(() => setLoading(false))
  }, [typeFilter])

  return (
    <>
      <Helmet>
        <title>Rooms &amp; Suites – Yashraj Palace | Hotel in Maheshwar from ₹1,800/night</title>
        <meta name="description" content="Book Deluxe Rooms (from ₹1,800/night), Premium Rooms (from ₹2,500/night) and Family Suites (from ₹3,800/night) at Yashraj Palace near Maheshwar and Mandleshwar. Free parking, Wi-Fi, in-house dining." />
        <link rel="canonical" href="https://www.yashrajpalace.com/rooms" />
        <meta property="og:title" content="Rooms &amp; Suites – Yashraj Palace | Hotel near Maheshwar from ₹1,800" />
        <meta property="og:description" content="Deluxe, Premium &amp; Family Suite rooms at Yashraj Palace, Mandleshwar. From ₹1,800/night. Free Wi-Fi, parking, in-house catering." />
        <meta property="og:url" content="https://www.yashrajpalace.com/rooms" />
        <script type="application/ld+json">{JSON.stringify(ROOMS_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yashrajpalace.com/' },
            { '@type': 'ListItem', position: 2, name: 'Rooms & Suites', item: 'https://www.yashrajpalace.com/rooms' },
          ],
        })}</script>
      </Helmet>

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Comfort &amp; Elegance</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Rooms &amp; Suites</h1>
          <p className="text-white/65 max-w-xl mx-auto">Premium accommodation near Maheshwar Fort and the Narmada Ghats. Every room crafted for comfort, quiet, and a genuine palace-style experience.</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-[#FAF7F2] border-b py-5 px-4 sticky top-16 z-30 shadow-sm" style={{ borderColor: 'rgba(201,168,76,0.25)' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-end">
          <div>
            <label className="label">Check-In</label>
            <DatePicker selected={checkIn} onChange={setCheckIn} minDate={new Date()} placeholderText="Select date" className="input-field w-40" />
          </div>
          <div>
            <label className="label">Check-Out</label>
            <DatePicker selected={checkOut} onChange={setCheckOut} minDate={checkIn || new Date()} placeholderText="Select date" className="input-field w-40" />
          </div>
          <div>
            <label className="label">Guests</label>
            <select className="input-field w-32" value={guests} onChange={e => setGuests(e.target.value)}>
              {['1','2','3','4','5','6+'].map(g => <option key={g} value={g}>{g} Guest{g!=='1'?'s':''}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Room Type</label>
            <select className="input-field w-40" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="">All Rooms</option>
              <option value="deluxe">Deluxe</option>
              <option value="premium">Premium</option>
              <option value="suite">Family Suite</option>
            </select>
          </div>
          <button className="btn-primary text-xs px-6 py-3 uppercase tracking-wider">Search</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Amenities strip */}
        <div className="p-5 mb-12 flex flex-wrap gap-3 justify-center" style={{ background: '#F2EDE4', border: '1px solid rgba(201,168,76,0.2)' }}>
          <span className="text-xs font-semibold text-maroon uppercase tracking-wider w-full text-center mb-1">All rooms include</span>
          {AMENITIES.map(a => (
            <div key={a} className="flex items-center gap-1.5 text-sm text-charcoal-muted bg-white px-3 py-1.5 border border-stone-200" style={{ borderRadius: 0 }}>
              <FiCheck className="text-gold" size={12} /> {a}
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="spinner" /></div>
        ) : rooms.length === 0 ? (
          <StaticRooms checkIn={checkIn} checkOut={checkOut} guests={guests} />
        ) : (
          <div className="space-y-8">
            {rooms.map(room => (
              <RoomCard key={room._id} room={room} checkIn={checkIn} checkOut={checkOut} guests={guests} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function RoomCard({ room, checkIn, checkOut, guests }) {
  const nights = checkIn && checkOut ? Math.ceil((checkOut - checkIn) / 86400000) : null
  const total  = nights ? (room.discountedPrice || room.price) * nights : null
  const imgClass = IMG_CLASS[room.type] || 'room-img-default'

  return (
    <div className="bg-white border overflow-hidden flex flex-col md:flex-row group hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderColor: '#E8E0D8', borderRadius: 0 }}>
      <div className={`md:w-80 lg:w-96 h-56 md:h-auto ${imgClass} flex items-center justify-center shrink-0 relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {room.discountedPrice && (
          <div className="absolute top-3 left-3 badge bg-green-500 text-white">
            {Math.round(((room.price - room.discountedPrice) / room.price) * 100)}% OFF
          </div>
        )}
        <div className="absolute top-3 right-3 badge bg-maroon text-white capitalize">{room.type}</div>
        <div className="absolute bottom-3 left-3">
          <div className="font-serif text-white text-lg font-semibold drop-shadow">{room.name}</div>
          {room.size && <div className="text-white/70 text-xs">{room.size} sq ft</div>}
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="font-serif text-2xl font-semibold">{room.name}</h2>
              <div className="text-xs text-green-600 font-medium mt-0.5">✓ Free cancellation up to 24 hrs</div>
            </div>
            <div className="text-right shrink-0 ml-4">
              {room.discountedPrice ? (
                <>
                  <div className="text-sm text-gray-400 line-through">₹{room.price.toLocaleString('en-IN')}</div>
                  <div className="font-serif text-2xl font-semibold text-maroon">₹{room.discountedPrice.toLocaleString('en-IN')}</div>
                </>
              ) : (
                <div className="font-serif text-2xl font-semibold text-maroon">₹{room.price.toLocaleString('en-IN')}</div>
              )}
              <div className="text-xs text-charcoal-muted">per night + taxes</div>
            </div>
          </div>
          <p className="text-charcoal-muted text-sm leading-relaxed mb-4">{room.description || room.shortDesc}</p>
          <div className="flex flex-wrap gap-4 text-sm text-charcoal-muted mb-4">
            <span className="flex items-center gap-1"><FiUsers size={14} /> {room.capacity} Guests</span>
            <span>🛏 {room.bedType}</span>
            {room.size && <span className="flex items-center gap-1"><FiMaximize2 size={14} /> {room.size} sq ft</span>}
          </div>
          {room.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 6).map(a => (
                <span key={a} className="text-xs bg-ivory-dark text-charcoal-muted px-2.5 py-1">{a}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-100">
          <div>
            {total && <div className="text-sm text-charcoal-muted">{nights} night{nights>1?'s':''} · Est. ₹{total.toLocaleString('en-IN')} + taxes</div>}
          </div>
          <Link
            to={`/rooms/${room.slug}${checkIn ? `?checkIn=${checkIn.toISOString()}&checkOut=${checkOut?.toISOString()}&guests=${guests}` : ''}`}
            className="btn-primary text-sm px-6">
            Book Now →
          </Link>
        </div>
      </div>
    </div>
  )
}

function StaticRooms({ checkIn, checkOut, guests }) {
  const rooms = [
    { slug:'deluxe-room',  name:'Deluxe Room',  price:1800, type:'deluxe',  capacity:2, bedType:'Queen Bed', size:280, description:'A well-appointed room with a queen bed, garden or courtyard view, premium linens, and all essentials for a restful stay.', amenities:['Free Wi-Fi','AC','TV','Hot Water','Room Service','Housekeeping'] },
    { slug:'premium-room', name:'Premium Room', price:2500, type:'premium', capacity:2, bedType:'King Bed',  size:380, description:'Elevated comfort with a king-size bed, sitting area, designer bathroom with hot shower, and complimentary breakfast included.', amenities:['Free Wi-Fi','AC','TV','Hot Water','Breakfast Included','Mini Fridge','Room Service'] },
    { slug:'family-suite', name:'Family Suite', price:3800, type:'suite',   capacity:4, bedType:'Twin Beds', size:560, description:'Spacious and warm — a separate living area, two beds, and thoughtful touches that make family stays truly memorable.', amenities:['Free Wi-Fi','AC','TV','Hot Water','Living Area','Mini Kitchen','Room Service','Housekeeping'] },
  ]
  return (
    <div className="space-y-8">
      {rooms.map(room => <RoomCard key={room.slug} room={room} checkIn={checkIn} checkOut={checkOut} guests={guests} />)}
    </div>
  )
}
