import { Link } from 'react-router-dom'
import { FaWhatsapp, FaFacebook, FaInstagram, FaGoogle } from 'react-icons/fa'
import { FiPhone, FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi'

const footerLinks = {
  Stay: [
    { label: 'Deluxe Room',    to: '/rooms/deluxe-room' },
    { label: 'Premium Room',   to: '/rooms/premium-room' },
    { label: 'Family Suite',   to: '/rooms/family-suite' },
    { label: 'Room Amenities', to: '/rooms#amenities' },
    { label: 'Book a Room',    to: '/book-room' },
  ],
  Events: [
    { label: 'Wedding Garden',    to: '/events/wedding' },
    { label: 'Reception Venue',   to: '/events/reception' },
    { label: 'Birthday Parties',  to: '/events/birthday' },
    { label: 'Corporate Events',  to: '/events/corporate' },
    { label: 'Event Packages',    to: '/events/packages' },
    { label: 'Book an Event',     to: '/events/book' },
  ],
  Explore: [
    { label: 'About Us',              to: '/about' },
    { label: 'Restaurant & Dining',   to: '/dining' },
    { label: 'Gallery',               to: '/gallery' },
    { label: 'Nearby Attractions',    to: '/nearby-attractions' },
    { label: 'Guest Reviews',         to: '/reviews' },
    { label: 'Contact Us',            to: '/contact' },
  ],
}

const seoLinks = [
  { label: 'Hotel in Maheshwar',              to: '/hotel-in-maheshwar' },
  { label: 'Hotel in Mandleshwar',            to: '/hotel-in-mandleshwar' },
  { label: 'Wedding Garden in Maheshwar',     to: '/wedding-garden-in-maheshwar' },
  { label: 'Marriage Garden Mandleshwar',     to: '/marriage-garden-in-mandleshwar' },
  { label: 'Hotel near Maheshwar Fort',       to: '/hotel-near-maheshwar-fort' },
  { label: 'Hotel near Narmada Ghat',         to: '/hotel-near-narmada-ghat' },
  { label: 'Event Venue in Maheshwar',        to: '/event-venue-in-maheshwar' },
  { label: 'Luxury Hotel Khargone',           to: '/luxury-hotel-in-khargone' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white" aria-label="Site footer">

      {/* WhatsApp CTA strip */}
      <div className="bg-maroon py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-serif text-lg font-semibold text-white">Ready to Book? Let's Talk.</p>
            <p className="text-white/65 text-sm">Call or WhatsApp us — we reply within minutes.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="https://wa.me/917000000000" className="btn-whatsapp text-sm px-5">
              <FaWhatsapp size={16} /> WhatsApp Now
            </a>
            <a href="tel:+917000000000" className="border-2 border-white/40 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all">
              📞 Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="font-serif text-2xl font-semibold text-white mb-1">Yashraj Palace</div>
          <div className="text-xs tracking-widest uppercase mb-5" style={{ color: '#C9A84C' }}>
            Hotel · Wedding Garden · Events
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
            A premier hospitality destination near Maheshwar and Mandleshwar, MP — offering premium rooms, a majestic wedding garden, and event spaces for every celebration since 2005.
          </p>

          <div className="space-y-3 text-sm text-white/60">
            <div className="flex items-start gap-2.5">
              <FiMapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#C9A84C' }} />
              <span>Near Mandleshwar, Khargone District,<br/>Madhya Pradesh – 451221</span>
            </div>
            <a href="tel:+917000000000" className="flex items-center gap-2.5 hover:text-white transition-colors">
              <FiPhone size={14} style={{ color: '#C9A84C' }} /> +91 70000 00000
            </a>
            <a href="mailto:info@yashrajpalace.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
              <FiMail size={14} style={{ color: '#C9A84C' }} /> info@yashrajpalace.com
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-3 mt-6">
            {[
              { href: 'https://wa.me/917000000000',           icon: <FaWhatsapp size={16}/>,  hover: 'hover:bg-green-500',  label: 'WhatsApp' },
              { href: 'https://facebook.com/yashrajpalace',   icon: <FaFacebook size={16}/>,  hover: 'hover:bg-blue-600',   label: 'Facebook' },
              { href: 'https://instagram.com/yashrajpalace',  icon: <FaInstagram size={16}/>, hover: 'hover:bg-pink-600',   label: 'Instagram' },
              { href: 'https://g.page/yashrajpalace',         icon: <FaGoogle size={16}/>,    hover: 'hover:bg-red-500',    label: 'Google' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className={`w-9 h-9 bg-white/10 rounded-full flex items-center justify-center transition-all duration-200 ${s.hover} hover:scale-110`}
                aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['20+ Yrs Experience', '500+ Events', '4.8★ Rating', '1000-Guest Venue'].map(b => (
              <span key={b} className="text-xs px-2.5 py-1 rounded-full border border-white/15 text-white/50">{b}</span>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <FiArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SEO links */}
      <div className="border-t border-white/8 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-white/20 mb-2 text-center">Also find us as:</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {seoLinks.map(l => (
              <Link key={l.to} to={l.to} className="text-xs text-white/25 hover:text-white/55 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Yashraj Palace, Mandleshwar, Madhya Pradesh. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white/60 transition-colors">Terms &amp; Conditions</Link>
            <Link to="/cancellation-policy" className="hover:text-white/60 transition-colors">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
