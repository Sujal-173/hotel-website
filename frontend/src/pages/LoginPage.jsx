import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { login }  = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()
  const from       = location.state?.from?.pathname || '/'
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
      navigate(user.role !== 'user' ? '/admin' : from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Sign In – Yashraj Palace</title>
      </Helmet>

      <div className="min-h-screen bg-ivory-dark flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          {/* Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="font-serif text-2xl font-semibold text-maroon">Yashraj Palace</Link>
            <p className="text-xs text-gold tracking-widest uppercase mt-1">Hotel · Wedding Garden · Events</p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
            <h1 className="font-serif text-xl font-semibold mb-1 text-center">Welcome Back</h1>
            <p className="text-sm text-charcoal-muted text-center mb-6">Sign in to view your bookings</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In…' : 'Sign In →'}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center space-y-2">
              <p className="text-sm text-charcoal-muted">
                Don't have an account?{' '}
                <Link to="/register" className="text-maroon font-semibold hover:underline">Create one</Link>
              </p>
              <Link to="/" className="text-xs text-charcoal-muted hover:text-maroon block">← Back to Home</Link>
            </div>
          </div>

          {/* Admin hint */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <p className="text-xs text-amber-700">
              <strong>Admin?</strong> Use credentials from your <code>.env</code> file.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
