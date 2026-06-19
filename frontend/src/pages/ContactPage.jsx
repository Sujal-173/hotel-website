import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi'
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { inquiriesAPI } from '../utils/api'
import toast from 'react-hot-toast'

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Yashraj Palace',
  url: 'https://www.yashrajpalace.com/',
  telephone: '+91-70000-00000',
  email: 'info@yashrajpalace.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Mandleshwar',
    addressLocality: 'Mandleshwar',
    addressRegion: 'Madhya Pradesh',
    postalCode: '451221',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '22.1740', longitude: '75.6560' },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '09:00', closes: '22:00', description: 'Events Team & Reservations' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59', description: 'Front Desk' },
  ],
  hasMap: 'https://maps.google.com/?q=Yashraj+Palace+Mandleshwar+Madhya+Pradesh',
}

const INFO_CARDS = [
  {
    icon: <FiPhone size={20} />,
    label: 'Phone',
    primary: '+91 70000 00000',
    secondary: 'Available 9 AM – 10 PM daily',
    href: 'tel:+917000000000',
    accent: 'bg-maroon',
  },
  {
    icon: <FaWhatsapp size={20} />,
    label: 'WhatsApp',
    primary: '+91 70000 00000',
    secondary: 'Instant reply — bookings & directions',
    href: 'https://wa.me/917000000000',
    accent: 'bg-green-600',
  },
  {
    icon: <FiMail size={20} />,
    label: 'Email',
    primary: 'info@yashrajpalace.com',
    secondary: 'We reply within 4 hours',
    href: 'mailto:info@yashrajpalace.com',
    accent: 'bg-maroon',
  },
  {
    icon: <FiMapPin size={20} />,
    label: 'Address',
    primary: 'Near Mandleshwar, Khargone Dist.',
    secondary: 'Madhya Pradesh – 451221',
    href: 'https://maps.google.com/?q=Yashraj+Palace+Mandleshwar+Madhya+Pradesh',
    accent: 'bg-maroon',
    linkLabel: 'Open in Google Maps →',
  },
]

export default function ContactPage() {
  const [form, setForm]             = useState({ name:'', email:'', phone:'', subject:'', message:'', inquiryType:'general' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error('Please fill all required fields')
      return
    }
    setSubmitting(true)
    try {
      await inquiriesAPI.create(form)
      setSubmitted(true)
      toast.success("Message sent! We'll contact you within 2 hours.")
    } catch {
      toast.error('Failed to send message. Please call us directly.')
    }
    setSubmitting(false)
  }

  return (
    <>
      <Helmet>
        <title>Contact Yashraj Palace – Hotel &amp; Event Venue | Maheshwar | +91 70000 00000</title>
        <meta name="description" content="Contact Yashraj Palace for room bookings, wedding planning, and event inquiries. Call +91 70000 00000 or WhatsApp. Near Maheshwar and Mandleshwar, Madhya Pradesh. We reply within 2 hours." />
        <link rel="canonical" href="https://www.yashrajpalace.com/contact" />
        <meta property="og:title" content="Contact Yashraj Palace – Hotel &amp; Event Venue near Maheshwar" />
        <meta property="og:description" content="Reach Yashraj Palace on +91 70000 00000 or WhatsApp. Near Maheshwar &amp; Mandleshwar, MP. We reply within 2 hours." />
        <meta property="og:url" content="https://www.yashrajpalace.com/contact" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(CONTACT_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yashrajpalace.com/' },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.yashrajpalace.com/contact' },
          ],
        })}</script>
      </Helmet>

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">We'd Love to Hear From You</p>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white mb-4">Contact Us</h1>
          <p className="text-white/65 max-w-xl mx-auto text-lg">
            Available on phone, WhatsApp, or email — 9 AM to 10 PM, every day. Reach out for bookings, queries, or to plan your visit.
          </p>
        </div>
      </div>

      {/* Quick action bar */}
      <div className="bg-[#1E0610] border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gold/15">
          <a href="tel:+917000000000"
            className="flex items-center justify-center gap-3 py-4 text-white/80 hover:text-gold transition-colors group">
            <FiPhone size={16} className="text-gold" />
            <span className="text-sm font-semibold tracking-wide">+91 70000 00000</span>
          </a>
          <a href="https://wa.me/917000000000" target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-3 py-4 text-white/80 hover:text-green-400 transition-colors">
            <FaWhatsapp size={16} className="text-green-400" />
            <span className="text-sm font-semibold tracking-wide">WhatsApp Now</span>
          </a>
          <a href="mailto:info@yashrajpalace.com"
            className="flex items-center justify-center gap-3 py-4 text-white/80 hover:text-gold transition-colors">
            <FiMail size={16} className="text-gold" />
            <span className="text-sm font-semibold tracking-wide">info@yashrajpalace.com</span>
          </a>
        </div>
      </div>

      {/* Info cards */}
      <div className="bg-[#FAF7F2] border-b border-gold/10 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO_CARDS.map(card => (
            <div key={card.label} className="palace-card bg-white p-5">
              <div className={`w-10 h-10 ${card.accent} flex items-center justify-center text-white mb-4`} style={{ borderRadius: 0 }}>
                {card.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-gold mb-1">{card.label}</div>
              <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                className="block text-charcoal font-semibold text-sm hover:text-maroon transition-colors mb-0.5">
                {card.primary}
              </a>
              <p className="text-charcoal-muted text-xs">{card.secondary}</p>
              {card.linkLabel && (
                <a href={card.href} target="_blank" rel="noreferrer" className="text-maroon text-xs font-medium hover:underline mt-1 inline-block">
                  {card.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main section: form + details */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Left — details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="section-eyebrow">Opening Hours</p>
            <div className="gold-divider" />
            <h2 className="section-title text-2xl mb-5">When We're Here for You</h2>
            <div className="space-y-3">
              {[
                { label: 'Front Desk', hours: '24 / 7', icon: <FiClock size={14}/> },
                { label: 'Restaurant & Dining', hours: '7 AM – 11 PM', icon: <FiClock size={14}/> },
                { label: 'Events & Reservations', hours: '9 AM – 10 PM', icon: <FiClock size={14}/> },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-charcoal-muted text-sm">
                    <span className="text-gold">{row.icon}</span>
                    {row.label}
                  </div>
                  <span className="font-semibold text-charcoal text-sm">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            <a href="https://wa.me/917000000000" className="btn-whatsapp">
              <FaWhatsapp size={16} /> Chat on WhatsApp
            </a>
            <a href="tel:+917000000000" className="btn-primary">
              <FiPhone size={14} /> Call Now
            </a>
          </div>

          {/* Social */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">Follow Yashraj Palace</p>
            <div className="flex gap-2">
              {[
                { href: 'https://facebook.com/yashrajpalace', icon: <FaFacebook size={15}/>, bg: 'bg-[#1877F2]', label: 'Facebook' },
                { href: 'https://instagram.com/yashrajpalace', icon: <FaInstagram size={15}/>, bg: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]', label: 'Instagram' },
                { href: 'https://youtube.com/', icon: <FaYoutube size={15}/>, bg: 'bg-[#FF0000]', label: 'YouTube' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className={`w-9 h-9 ${s.bg} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                  style={{ borderRadius: 0 }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="palace-card bg-white p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <FiCheckCircle size={52} className="text-green-500 mb-5" />
              <h3 className="font-serif text-2xl font-semibold mb-3 text-charcoal">Message Sent!</h3>
              <p className="text-charcoal-muted mb-6">
                Our team will contact you at <strong>{form.phone}</strong> within 2 hours.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="palace-card bg-white p-8">
              <p className="section-eyebrow">Enquire Now</p>
              <div className="gold-divider" />
              <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Inquiry Type</label>
                  <select className="input-field" value={form.inquiryType} onChange={set('inquiryType')}>
                    <option value="general">General Inquiry</option>
                    <option value="room">Room Booking</option>
                    <option value="wedding">Wedding / Event</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Full Name *</label>
                    <input className="input-field" value={form.name} onChange={set('name')} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="label">Phone Number *</label>
                    <input className="input-field" value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input type="email" className="input-field" value={form.email} onChange={set('email')} placeholder="email@example.com" />
                </div>
                <div>
                  <label className="label">Subject</label>
                  <input className="input-field" value={form.subject} onChange={set('subject')} placeholder="e.g. Wedding inquiry for December 2025" />
                </div>
                <div>
                  <label className="label">Your Message *</label>
                  <textarea className="input-field resize-none" rows={5} value={form.message} onChange={set('message')}
                    placeholder="Tell us about your requirement — dates, guest count, type of event, or any questions..." />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-sm disabled:opacity-50">
                  {submitting ? 'Sending...' : <><FiSend size={14} /> Send Message</>}
                </button>
                <p className="text-xs text-center text-charcoal-muted">
                  Prefer instant reply? Reach us on{' '}
                  <a href="https://wa.me/917000000000" className="text-maroon font-semibold hover:underline">WhatsApp</a>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Map section */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-6">
            <p className="section-eyebrow">Find Us</p>
            <div className="gold-divider-center" />
            <h2 className="font-serif text-2xl font-semibold text-charcoal">Near Mandleshwar, Madhya Pradesh</h2>
            <p className="text-charcoal-muted text-sm mt-1">90 km from Indore · 12 km from Maheshwar Fort</p>
          </div>
          <div className="w-full overflow-hidden border border-gold/20" style={{ borderRadius: 0, height: '380px' }}>
            <iframe
              title="Yashraj Palace Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.5!2d75.656!3d22.174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE0JzI3LjIiTiA3NcKwMzknMjEuNiJF!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="100%" style={{ border: 0, filter: 'grayscale(20%) sepia(10%)' }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center mt-4">
            <a href="https://maps.google.com/?q=Yashraj+Palace+Mandleshwar+Madhya+Pradesh" target="_blank" rel="noreferrer"
              className="btn-outline text-sm inline-flex">
              <FiMapPin size={13} /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
