import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FiGrid, FiBookOpen, FiCalendar, FiHome, FiImage,
  FiStar, FiMessageSquare, FiTag, FiPackage, FiSettings,
  FiMenu, FiX, FiLogOut, FiExternalLink, FiBell
} from 'react-icons/fi'

const NAV_ITEMS = [
  { to: '/admin',               label: 'Dashboard',      icon: FiGrid,         exact: true },
  { to: '/admin/bookings',      label: 'Room Bookings',  icon: FiBookOpen },
  { to: '/admin/event-bookings',label: 'Event Bookings', icon: FiCalendar },
  { to: '/admin/rooms',         label: 'Rooms',          icon: FiHome },
  { to: '/admin/packages',      label: 'Packages',       icon: FiPackage },
  { to: '/admin/gallery',       label: 'Gallery',        icon: FiImage },
  { to: '/admin/reviews',       label: 'Reviews',        icon: FiStar },
  { to: '/admin/inquiries',     label: 'Inquiries',      icon: FiMessageSquare },
  { to: '/admin/offers',        label: 'Offers',         icon: FiTag },
  { to: '/admin/settings',      label: 'Settings',       icon: FiSettings },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="font-serif text-lg text-white font-semibold">Yashraj Palace</div>
        <div className="text-xs text-white/40 tracking-wider uppercase mt-0.5">Admin Panel</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/55 hover:text-white hover:bg-white/8'
              }`
            }
          >
            <item.icon size={16} className="shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User + actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <FiExternalLink size={13} /> View Live Site
        </a>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{user?.name}</div>
            <div className="text-xs text-white/40 capitalize">{user?.role}</div>
          </div>
          <button onClick={handleLogout} className="text-white/40 hover:text-red-400 transition-colors" title="Logout">
            <FiLogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-56 bg-maroon-dark flex-col shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-maroon-dark flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-4 shrink-0">
          <button
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={20} />
          </button>
          <div className="flex-1" />
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 relative">
            <FiBell size={18} />
          </button>
          <div className="text-sm text-gray-600 font-medium hidden sm:block">{user?.name}</div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
