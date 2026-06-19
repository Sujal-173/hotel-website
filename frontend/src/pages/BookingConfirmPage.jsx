// BookingConfirmPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { bookingsAPI, eventsAPI } from '../utils/api'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'

export default function BookingConfirmPage() {
  const { id }    = useParams()
  const [data, setData]   = useState(null)
  const [type, setType]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const r = await bookingsAPI.getById(id)
        setData(r.data.booking); setType('room')
      } catch {
        try {
          // Try event booking
          const r = await eventsAPI.getAll({ bookingId: id })
          if (r.data.bookings?.[0]) { setData(r.data.bookings[0]); setType('event') }
        } catch {}
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <div className="flex justify-center py-40"><div className="spinner"/></div>

  return (
    <>
      <Helmet><title>Booking Confirmed – Yashraj Palace</title></Helmet>
      <div className="min-h-screen bg-ivory-dark flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg text-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              {type === 'event' ? '🎊' : '✅'}
            </div>
            <h1 className="font-serif text-2xl font-semibold text-charcoal mb-2">
              {type === 'event' ? 'Event Inquiry Received!' : 'Booking Confirmed!'}
            </h1>
            <p className="text-charcoal-muted text-sm mb-1">Booking ID:</p>
            <p className="font-mono font-bold text-maroon text-xl mb-4">{id}</p>

            {data && type === 'room' && (
              <div className="bg-ivory-dark rounded-xl p-4 text-left space-y-2 text-sm mb-6">
                <div className="flex justify-between"><span className="text-charcoal-muted">Guest</span><span className="font-medium">{data.guestDetails?.name}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-muted">Room</span><span>{data.room?.name}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-muted">Check-In</span><span>{new Date(data.checkIn).toDateString()}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-muted">Check-Out</span><span>{new Date(data.checkOut).toDateString()}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-muted">Status</span>
                  <span className={`badge ${data.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{data.status}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                  <span>Total Amount</span><span className="text-maroon">₹{data.pricing?.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
                {data.pricing?.balanceDue > 0 && (
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Balance at Check-In</span><span>₹{data.pricing.balanceDue.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
            )}

            {data && type === 'event' && (
              <div className="bg-ivory-dark rounded-xl p-4 text-left space-y-2 text-sm mb-6">
                <div className="flex justify-between"><span className="text-charcoal-muted">Contact</span><span className="font-medium">{data.contactDetails?.name}</span></div>
                <div className="flex justify-between capitalize"><span className="text-charcoal-muted">Event</span><span>{data.eventType}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-muted">Date</span><span>{new Date(data.eventDetails?.eventDate).toDateString()}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-muted">Guests</span><span>{data.eventDetails?.guestCount}</span></div>
              </div>
            )}

            <p className="text-sm text-charcoal-muted mb-6">
              A confirmation has been sent to your email. Our team will reach you within 2 hours on your registered phone number.
            </p>

            <div className="flex gap-3 justify-center">
              <a href="https://wa.me/917000000000" className="btn-whatsapp text-sm px-5"><FaWhatsapp size={15}/> WhatsApp Us</a>
              <a href="tel:+917000000000" className="btn-outline text-sm px-5 flex items-center gap-1.5"><FiPhone size={14}/> Call</a>
            </div>
          </div>

          <div className="text-center">
            <Link to="/" className="text-sm text-charcoal-muted hover:text-maroon">← Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  )
}
