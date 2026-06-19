import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { roomsAPI } from '../utils/api'
import toast from 'react-hot-toast'
import { FiCheck, FiUsers, FiMaximize2 } from 'react-icons/fi'

const AMENITIES = ['Free Wi-Fi','AC','Hot Water','24/7 Room Service','TV','Housekeeping','Parking','Power Backup']

export default function RoomsPage() {
  const [searchParams] = useSearchParams()
  const [rooms, setRooms]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [checkIn, setCheckIn]     = useState(searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')) : null)
  const [checkOut, setCheckOut]   = useState(searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')) : null)
  const [guests, setGuests]       = useState(searchParams.get('guests') || '2')
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '')

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await roomsAPI.getAll(typeFilter ? { type: typeFilter } : {})
        setRooms(data.rooms)
      } catch { toast.error('Failed to load rooms') }
      finally { setLoading(false) }
    }
    fetch()
  }, [typeFilter])

  return (
    <>
      <Helmet>
        <title>Rooms & Suites – Yashraj Palace | Hotel in Maheshwar</title>
        <meta name="description" content="Book Deluxe Rooms, Premium Rooms and Family Suites at Yashraj Palace near Maheshwar and Mandleshwar. Prices from ₹1800/night. Free parking, Wi-Fi, in-house dining." />
      </Helmet>

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Comfort & Elegance</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Rooms & Suites</h1>
          <p className="text-white/65 max-w-xl mx-auto">Premium accommodation near Maheshwar Fort and the Narmada Ghats. Every room crafted for comfort, quiet, and a genuine palace-style experience.</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b border-gray-100 py-5 px-4 sticky top-16 z-30 shadow-sm">
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
          <button className="btn-primary text-sm px-6 py-3">Search</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Amenities strip */}
        <div className="bg-ivory-dark rounded-xl p-5 mb-12 flex flex-wrap gap-3 justify-center">
          <span className="text-xs font-semibold text-maroon uppercase tracking-wider w-full text-center mb-1">All rooms include</span>
          {AMENITIES.map(a => (
            <div key={a} className="flex items-center gap-1.5 text-sm text-charcoal-muted bg-white px-3 py-1.5 rounded-full border border-gray-100">
              <FiCheck className="text-gold" size={12} /> {a}
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="spinner" /></div>
        ) : rooms.length === 0 ? (
          /* Fallback static rooms if DB empty */
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

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow">
      <div className="md:w-80 lg:w-96 h-56 md:h-auto bg-gradient-to-br from-ivory-dark to-[#D5C8B8] flex items-center justify-center shrink-0 relative">
        <span className="text-6xl opacity-15">🏨</span>
        {room.discountedPrice && (
          <div className="absolute top-3 left-3 badge bg-green-500 text-white">
            {Math.round(((room.price - room.discountedPrice) / room.price) * 100)}% OFF
          </div>
        )}
        <div className="absolute top-3 right-3 badge bg-maroon text-white capitalize">{room.type}</div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <h2 className="font-serif text-2xl font-semibold">{room.name}</h2>
            <div className="text-right">
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
            {room.size && <span><FiMaximize2 size={14} className="inline" /> {room.size} sq ft</span>}
          </div>
          {room.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 6).map(a => (
                <span key={a} className="text-xs bg-ivory-dark text-charcoal-muted px-2.5 py-1 rounded-full">{a}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-100">
          <div>
            {total && <div className="text-sm text-charcoal-muted">{nights} night{nights>1?'s':''} · Est. ₹{total.toLocaleString('en-IN')} + taxes</div>}
            <div className="text-xs text-green-600 font-medium mt-0.5">✓ Free cancellation up to 24 hrs</div>
          </div>
          <Link
            to={`/rooms/${room.slug}${checkIn ? `?checkIn=${checkIn.toISOString()}&checkOut=${checkOut?.toISOString()}&guests=${guests}` : ''}`}
            className="btn-primary text-sm px-6"
          >
            Book Now →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Static fallback when DB has no rooms yet
function StaticRooms({ checkIn, checkOut, guests }) {
  const rooms = [
    { slug: 'deluxe-room',  name: 'Deluxe Room',  price: 1800, type: 'deluxe',  capacity: 2, bedType: 'Queen Bed', size: 280, description: 'A well-appointed room with a queen bed, garden or courtyard view, premium linens, and all essentials for a restful stay.', amenities: ['Free Wi-Fi','AC','TV','Hot Water','Room Service','Housekeeping'] },
    { slug: 'premium-room', name: 'Premium Room', price: 2500, type: 'premium', capacity: 2, bedType: 'King Bed',  size: 380, description: 'Elevated comfort with a king-size bed, sitting area, designer bathroom with hot shower, and complimentary breakfast included.', amenities: ['Free Wi-Fi','AC','TV','Hot Water','Breakfast Included','Mini Fridge','Room Service'] },
    { slug: 'family-suite', name: 'Family Suite', price: 3800, type: 'suite',   capacity: 4, bedType: 'Twin Beds', size: 560, description: 'Spacious and warm — a separate living area, two beds, and thoughtful touches that make family stays truly memorable.', amenities: ['Free Wi-Fi','AC','TV','Hot Water','Living Area','Mini Kitchen','Room Service','Housekeeping'] },
  ]
  return (
    <div className="space-y-8">
      {rooms.map(room => <RoomCard key={room.slug} room={room} checkIn={checkIn} checkOut={checkOut} guests={guests} />)}
    </div>
  )
}
