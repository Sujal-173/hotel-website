import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa'
import { inquiriesAPI } from '../utils/api'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm]         = useState({ name:'', email:'', phone:'', subject:'', message:'', inquiryType:'general' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.message) { toast.error('Please fill all required fields'); return }
    setSubmitting(true)
    try {
      await inquiriesAPI.create(form)
      setSubmitted(true)
      toast.success('Message sent! We\'ll contact you within 2 hours.')
    } catch { toast.error('Failed to send message. Please call us directly.') }
    setSubmitting(false)
  }

  return (
    <>
      <Helmet>
        <title>Contact Yashraj Palace – Hotel & Event Venue near Maheshwar</title>
        <meta name="description" content="Contact Yashraj Palace for room bookings, event inquiries and wedding planning. Call +91 70000 00000 or WhatsApp. Near Maheshwar and Mandleshwar, MP." />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Contact Us</h1>
          <p className="text-white/65 max-w-xl mx-auto">We're available on phone, WhatsApp, or email — 9 AM to 10 PM, every day. Reach out for bookings, queries, or to plan your visit.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Contact info */}
        <div>
          <p className="section-eyebrow">Reach Us</p>
          <div className="gold-divider" />
          <h2 className="section-title">We'd Love to Hear From You</h2>
          <p className="text-charcoal-muted leading-relaxed mb-8">Whether you want to check room availability, discuss wedding plans, or simply need directions — our team is here to help.</p>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-maroon rounded-lg flex items-center justify-center text-white shrink-0"><FiPhone size={18}/></div>
              <div>
                <div className="font-semibold text-charcoal mb-0.5">Phone</div>
                <a href="tel:+917000000000" className="text-charcoal-muted hover:text-maroon text-sm">+91 70000 00000</a>
                <div className="text-xs text-charcoal-muted mt-0.5">Available 9 AM – 10 PM daily</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white shrink-0"><FaWhatsapp size={18}/></div>
              <div>
                <div className="font-semibold text-charcoal mb-0.5">WhatsApp</div>
                <a href="https://wa.me/917000000000" className="text-charcoal-muted hover:text-maroon text-sm">+91 70000 00000</a>
                <div className="text-xs text-charcoal-muted mt-0.5">Get instant reply — bookings, inquiries, directions</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-maroon rounded-lg flex items-center justify-center text-white shrink-0"><FiMail size={18}/></div>
              <div>
                <div className="font-semibold text-charcoal mb-0.5">Email</div>
                <a href="mailto:info@yashrajpalace.com" className="text-charcoal-muted hover:text-maroon text-sm">info@yashrajpalace.com</a>
                <div className="text-xs text-charcoal-muted mt-0.5">We reply within 4 hours</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-maroon rounded-lg flex items-center justify-center text-white shrink-0"><FiMapPin size={18}/></div>
              <div>
                <div className="font-semibold text-charcoal mb-0.5">Address</div>
                <p className="text-charcoal-muted text-sm leading-relaxed">Yashraj Palace, Near Mandleshwar,<br/>Khargone District, Madhya Pradesh – 451221</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-maroon text-xs font-medium hover:underline mt-1 inline-block">Open in Google Maps →</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-maroon rounded-lg flex items-center justify-center text-white shrink-0"><FiClock size={18}/></div>
              <div>
                <div className="font-semibold text-charcoal mb-0.5">Hours</div>
                <p className="text-charcoal-muted text-sm">Front Desk: 24/7</p>
                <p className="text-charcoal-muted text-sm">Restaurant: 7 AM – 11 PM</p>
                <p className="text-charcoal-muted text-sm">Events Team: 9 AM – 10 PM</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <a href="https://wa.me/917000000000" className="btn-whatsapp text-sm px-5"><FaWhatsapp size={16}/> WhatsApp Now</a>
            <a href="tel:+917000000000" className="btn-primary text-sm px-5">📞 Call Now</a>
          </div>

          {/* Social */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-charcoal mb-3">Follow Us</p>
            <div className="flex gap-3">
              <a href="https://facebook.com" className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><FaFacebook size={16}/></a>
              <a href="https://instagram.com" className="w-9 h-9 bg-pink-600 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"><FaInstagram size={16}/></a>
            </div>
          </div>
        </div>

        {/* Contact form */}
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
                <div><label className="label">Name *</label><input className="input-field" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} placeholder="Your name" /></div>
                <div><label className="label">Phone *</label><input className="input-field" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} placeholder="+91 XXXXX XXXXX" /></div>
              </div>
              <div><label className="label">Email *</label><input type="email" className="input-field" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} placeholder="email@example.com" /></div>
              <div><label className="label">Subject</label><input className="input-field" value={form.subject} onChange={e => setForm(p=>({...p,subject:e.target.value}))} placeholder="e.g. Wedding inquiry for June 2026" /></div>
              <div>
                <label className="label">Message *</label>
                <textarea className="input-field resize-none" rows={5} value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} placeholder="Tell us about your requirement — dates, guest count, type of event, or questions..." />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-sm disabled:opacity-50">
                {submitting ? 'Sending...' : 'Send Message →'}
              </button>
              <p className="text-xs text-center text-charcoal-muted">Or reach us instantly on <a href="https://wa.me/917000000000" className="text-maroon font-medium hover:underline">WhatsApp</a></p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
