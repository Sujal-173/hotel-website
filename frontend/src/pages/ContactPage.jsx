import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa'
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.1740',
    longitude: '75.6560',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '09:00', closes: '22:00', description: 'Events Team & Reservations' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59', description: 'Front Desk' },
  ],
  hasMap: 'https://maps.google.com/?q=Yashraj+Palace+Mandleshwar+Madhya+Pradesh',
}

export default function ContactPage() {
  const [form, setForm]           = useState({ name:'', email:'', phone:'', subject:'', message:'', inquiryType:'general' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.message) { toast.error('Please fill all required fields'); return }
    setSubmitting(true)
    try {
      await inquiriesAPI.create(form)
      setSubmitted(true)
      toast.success("Message sent! We'll contact you within 2 hours.")
    } catch { toast.error('Failed to send message. Please call us directly.') }
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

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Contact Us</h1>
          <p className="text-white/65 max-w-xl mx-auto">We're available on phone, WhatsApp, or email — 9 AM to 10 PM, every day. Reach out for bookings, queries, or to plan your visit.</p>
        </div>
      </div>

      {/* Quick contact bar */}
      <div className="bg-ivory-dark border-b border-gold/20 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
          <a href="tel:+917000000000" className="flex items-center gap-2 text-sm font-semibold text-maroon hover:text-maroon-dark transition-colors">
            <FiPhone size={16} /> +91 70000 00000
          </a>
          <a href="https://wa.me/917000000000" className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
            <FaWhatsapp size={16} /> WhatsApp Now
          </a>
          <a href="mailto:info@yashrajpalace.com" className="flex items-center gap-2 text-sm font-semibold text-charcoal-muted hover:text-maroon transition-colors">
            <FiMail size={16} /> info@yashrajpalace.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Contact info */}
        <div>
          <p className="section-eyebrow">Reach Us</p>
          <div className="gold-divider" />
          <h2 className="section-title">We'd Love to Hear From You</h2>
          <p className="text-charcoal-muted leading-relaxed mb-8">
            Whether you want to check room availability, discuss wedding plans, or simply need directions — our team is here to help.
          </p>

          <div className="space-y-5">
            {[
              { icon: <FiPhone size={18}/>, color: 'bg-maroon', label: 'Phone', content: (
                <><a href="tel:+917000000000" className="text-charcoal-muted hover:text-maroon text-sm">+91 70000 00000</a>
                <div className="text-xs text-charcoal-muted mt-0.5">Available 9 AM – 10 PM daily</div></>
              )},
              { icon: <FaWhatsapp size={18}/>, color: 'bg-green-500', label: 'WhatsApp', content: (
                <><a href="https://wa.me/917000000000" className="text-charcoal-muted hover:text-maroon text-sm">+91 70000 00000</a>
                <div className="text-xs text-charcoal-muted mt-0.5">Instant reply — bookings, inquiries, directions</div></>
              )},
              { icon: <FiMail size={18}/>, color: 'bg-maroon', label: 'Email', content: (
                <><a href="mailto:info@yashrajpalace.com" className="text-charcoal-muted hover:text-maroon text-sm">info@yashrajpalace.com</a>
                <div className="text-xs text-charcoal-muted mt-0.5">We reply within 4 hours</div></>
              )},
              { icon: <FiMapPin size={18}/>, color: 'bg-maroon', label: 'Address', content: (
                <><p className="text-charcoal-muted text-sm leading-relaxed">Yashraj Palace, Near Mandleshwar,<br/>Khargone District, Madhya Pradesh – 451221</p>
                <a href="https://maps.google.com/?q=Yashraj+Palace+Mandleshwar+Madhya+Pradesh" target="_blank" rel="noreferrer" className="text-maroon text-xs font-medium hover:underline mt-1 inline-block">Open in Google Maps →</a></>
              )},
              { icon: <FiClock size={18}/>, color: 'bg-maroon', label: 'Hours', content: (
                <><p className="text-charcoal-muted text-sm">Front Desk: 24/7</p>
                <p className="text-charcoal-muted text-sm">Restaurant: 7 AM – 11 PM</p>
                <p className="text-charcoal-muted text-sm">Events Team: 9 AM – 10 PM</p></>
              )},
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-charcoal mb-0.5">{item.label}</div>
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <a href="https://wa.me/917000000000" className="btn-whatsapp text-sm px-5"><FaWhatsapp size={16}/> WhatsApp Now</a>
            <a href="tel:+917000000000" className="btn-primary text-sm px-5">📞 Call Now</a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-charcoal mb-3">Follow Us</p>
            <div className="flex gap-3">
              <a href="https://facebook.com/yashrajpalace" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" aria-label="Facebook">
                <FaFacebook size={16}/>
              </a>
              <a href="https://instagram.com/yashrajpalace" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-pink-600 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" aria-label="Instagram">
                <FaInstagram size={16}/>
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center h-full">
              <div className="text-5xl mb-4">🙏</div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Message Sent!</h3>
              <p className="text-charcoal-muted">Our team will contact you at <strong>{form.phone}</strong> within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-semibold mb-2">Send Us a Message</h3>
              <div>
                <label className="label">Inquiry Type</label>
                <select className="input-field" value={form.inquiryType} onChange={e => setForm(p=>({...p,inquiryType:e.target.value}))}>
                  <option value="general">General Inquiry</option>
                  <option value="room">Room Booking</option>
                  <option value="wedding">Wedding / Event</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Name *</label>
                  <input className="input-field" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} placeholder="Your name" /></div>
                <div><label className="label">Phone *</label>
                  <input className="input-field" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} placeholder="+91 XXXXX XXXXX" /></div>
              </div>
              <div><label className="label">Email *</label>
                <input type="email" className="input-field" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} placeholder="email@example.com" /></div>
              <div><label className="label">Subject</label>
                <input className="input-field" value={form.subject} onChange={e => setForm(p=>({...p,subject:e.target.value}))} placeholder="e.g. Wedding inquiry for June 2026" /></div>
              <div>
                <label className="label">Message *</label>
                <textarea className="input-field resize-none" rows={5} value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} placeholder="Tell us about your requirement — dates, guest count, type of event, or questions..." />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-sm disabled:opacity-50">
                {submitting ? 'Sending...' : 'Send Message →'}
              </button>
              <p className="text-xs text-center text-charcoal-muted">
                Or reach us instantly on <a href="https://wa.me/917000000000" className="text-maroon font-medium hover:underline">WhatsApp</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
