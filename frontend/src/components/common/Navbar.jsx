import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiPhone, FiUser, FiLogOut } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { label: 'Stay',       to: '/rooms' },
  { label: 'Weddings',   to: '/events/wedding' },
  { label: 'Events',     to: '/events' },
  { label: 'Dining',     to: '/dining' },
  { label: 'Gallery',    to: '/gallery' },
  { label: 'Nearby',     to: '/nearby-attractions' },
  { label: 'Contact',    to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-lg border-b border-gold/15'
          : 'border-b border-gold/10'
      }`}
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.96)'
          : '#ffffff',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      {/* Top strip */}
      <div className="bg-maroon text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center text-xs">
          <span className="text-gold/80 flex items-center gap-1.5">
            <span>📍</span>
            Near Mandleshwar, Khargone District, Madhya Pradesh
          </span>
          <div className="flex items-center gap-5">
            <a href="tel:+917000000000" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <FiPhone size={11} /> +91 70000 00000
            </a>
            <a href="https://wa.me/917000000000" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <FaWhatsapp size={12} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl font-semibold text-maroon transition-colors group-hover:text-maroon-light">
              Yashraj Palace
            </span>
            <span className="text-[10px] text-gold font-medium tracking-[0.2em] uppercase">
              Hotel · Wedding Garden · Events
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors relative ${
                      isActive
                        ? 'text-maroon after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-gold after:rounded-full'
                        : 'text-charcoal-muted hover:text-maroon'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin" className="text-xs font-semibold text-maroon hover:underline px-2">
                    Admin
                  </Link>
                )}
                <Link to="/my-bookings" className="flex items-center gap-1.5 text-sm text-charcoal-muted hover:text-maroon transition-colors">
                  <FiUser size={15} /> {user.name.split(' ')[0]}
                </Link>
                <button onClick={logout} className="text-charcoal-muted hover:text-maroon transition-colors p-1" title="Logout">
                  <FiLogOut size={15} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm text-charcoal-muted hover:text-maroon font-medium transition-colors">
                Login
              </Link>
            )}
            <Link to="/events/book" className="btn-outline text-xs px-4 py-2">Book Event</Link>
            <Link to="/book-room" className="btn-primary text-xs px-4 py-2">Book Room</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-charcoal hover:text-maroon transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-gray-100 pb-4 animate-slide-down">
            <ul className="flex flex-col">
              {navLinks.map(l => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-medium border-b border-gray-50 transition-colors ${
                        isActive ? 'text-maroon bg-ivory' : 'text-charcoal-muted hover:text-maroon hover:bg-ivory'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 px-4 pt-4">
              <Link to="/book-room" onClick={() => setOpen(false)} className="btn-primary text-center text-sm">
                Book Room
              </Link>
              <Link to="/events/book" onClick={() => setOpen(false)} className="btn-outline text-center text-sm">
                Book Event
              </Link>
              <a href="https://wa.me/917000000000" className="btn-whatsapp justify-center text-sm">
                <FaWhatsapp size={16} /> WhatsApp Now
              </a>
              <a href="tel:+917000000000" className="text-center text-sm text-charcoal-muted py-2 hover:text-maroon transition-colors">
                📞 +91 70000 00000
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
