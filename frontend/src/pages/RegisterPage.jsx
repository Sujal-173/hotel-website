import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate     = useNavigate()
  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error('All fields are required'); return
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match'); return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters'); return
    }
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      toast.success('Account created! Welcome to Yashraj Palace.')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
    setLoading(false)
  }

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <>
      <Helmet>
        <title>Create Account – Yashraj Palace</title>
      </Helmet>

      <div className="min-h-screen bg-ivory-dark flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link to="/" className="font-serif text-2xl font-semibold text-maroon">Yashraj Palace</Link>
            <p className="text-xs text-gold tracking-widest uppercase mt-1">Hotel · Wedding Garden · Events</p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
            <h1 className="font-serif text-xl font-semibold mb-1 text-center">Create Account</h1>
            <p className="text-sm text-charcoal-muted text-center mb-6">Manage your bookings easily</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Full Name *</label>
                <input className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" required />
              </div>
              <div>
                <label className="label">Email Address *</label>
                <input type="email" className="input-field" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" required />
              </div>
              <div>
                <label className="label">Phone Number *</label>
                <input className="input-field" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" required />
              </div>
              <div>
                <label className="label">Password *</label>
                <input type="password" className="input-field" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min. 6 characters" required />
              </div>
              <div>
                <label className="label">Confirm Password *</label>
                <input type="password" className="input-field" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} placeholder="Repeat password" required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm disabled:opacity-60">
                {loading ? 'Creating Account…' : 'Create Account →'}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-sm text-charcoal-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-maroon font-semibold hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
