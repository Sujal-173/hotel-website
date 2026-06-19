import { Link } from 'react-router-dom'
import { FaWhatsapp, FaFacebook, FaInstagram, FaGoogle } from 'react-icons/fa'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

const footerLinks = {
  Stay: [
    { label: 'Deluxe Room',   to: '/rooms/deluxe-room' },
    { label: 'Premium Room',  to: '/rooms/premium-room' },
    { label: 'Family Suite',  to: '/rooms/family-suite' },
    { label: 'Room Amenities',to: '/rooms#amenities' },
    { label: 'Book a Room',   to: '/book-room' },
  ],
  Events: [
    { label: 'Wedding Garden',   to: '/events/wedding' },
    { label: 'Reception Venue',  to: '/events/reception' },
    { label: 'Birthday Parties', to: '/events/birthday' },
    { label: 'Corporate Events', to: '/events/corporate' },
    { label: 'Event Packages',   to: '/events/packages' },
  ],
  Explore: [
    { label: 'About Us',           to: '/about' },
    { label: 'Restaurant & Dining',to: '/dining' },
    { label: 'Gallery',            to: '/gallery' },
    { label: 'Nearby Attractions', to: '/nearby-attractions' },
    { label: 'Reviews',            to: '/reviews' },
    { label: 'Contact Us',         to: '/contact' },
  ],
}

const seoLinks = [
  { label: 'Hotel in Maheshwar',            to: '/hotel-in-maheshwar' },
  { label: 'Hotel in Mandleshwar',          to: '/hotel-in-mandleshwar' },
  { label: 'Wedding Garden in Maheshwar',   to: '/wedding-garden-in-maheshwar' },
  { label: 'Marriage Garden Mandleshwar',   to: '/marriage-garden-in-mandleshwar' },
  { label: 'Hotel near Maheshwar Fort',     to: '/hotel-near-maheshwar-fort' },
  { label: 'Hotel near Narmada Ghat',       to: '/hotel-near-narmada-ghat' },
  { label: 'Event Venue in Maheshwar',      to: '/event-venue-in-maheshwar' },
  { label: 'Luxury Hotel Khargone',         to: '/luxury-hotel-in-khargone' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="font-serif text-2xl text-white mb-1">Yashraj Palace</div>
          <div className="text-gold text-xs tracking-widest uppercase mb-4">Hotel · Wedding Garden · Events</div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            A premier hospitality destination near Maheshwar and Mandleshwar, Madhya Pradesh — offering premium rooms, a majestic wedding garden, and banquet halls for every celebration.
          </p>
          <div className="space-y-2 text-sm text-white/60">
            <div className="flex items-start gap-2">
              <FiMapPin size={14} className="mt-0.5 text-gold shrink-0" />
              <span>Near Mandleshwar, Khargone District, Madhya Pradesh – 451221</span>
            </div>
            <a href="tel:+917000000000" className="flex items-center gap-2 hover:text-white transition-colors">
              <FiPhone size={14} className="text-gold" /> +91 70000 00000
            </a>
            <a href="mailto:info@yashrajpalace.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <FiMail size={14} className="text-gold" /> info@yashrajpalace.com
            </a>
          </div>
          <div className="flex gap-3 mt-6">
            <a href="https://wa.me/917000000000" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors" aria-label="WhatsApp">
              <FaWhatsapp size={16} />
            </a>
            <a href="https://facebook.com" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors" aria-label="Facebook">
              <FaFacebook size={16} />
            </a>
            <a href="https://instagram.com" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors" aria-label="Instagram">
              <FaInstagram size={16} />
            </a>
            <a href="https://g.page/yashrajpalace" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors" aria-label="Google">
              <FaGoogle size={16} />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/55 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SEO links */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-x-4 gap-y-1 justify-center">
          {seoLinks.map(l => (
            <Link key={l.to} to={l.to} className="text-xs text-white/30 hover:text-white/60 transition-colors">{l.label}</Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Yashraj Palace, Mandleshwar, Madhya Pradesh. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white/60">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white/60">Terms & Conditions</Link>
            <Link to="/cancellation-policy" className="hover:text-white/60">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
