// ReviewsPage.jsx
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { reviewsAPI } from '../utils/api'
import { FaStar } from 'react-icons/fa'
import toast from 'react-hot-toast'

const STATIC_REVIEWS = [
  { _id:'r1', name:'Ramesh Verma',   initials:'RV', rating:5, occasion:'Wedding Reception · March 2025',   comment:'We hosted my daughter\'s wedding here. The garden was beautifully lit, food was excellent, and the event coordinator handled everything flawlessly. Highly recommended for any big celebration.' },
  { _id:'r2', name:'Priya Sharma',   initials:'PS', rating:5, occasion:'Room Stay · January 2025',          comment:'Stayed 3 nights while visiting Maheshwar. Room was spotless, staff incredibly warm, and the food genuinely tasty. The hotel has real character.' },
  { _id:'r3', name:'Ankit Kulkarni', initials:'AK', rating:4, occasion:'Corporate Event · November 2024',  comment:'Held our annual function here for 300 people. Great AV, good parking, well-organised catering. Will return for future events.' },
  { _id:'r4', name:'Sunita Patel',   initials:'SP', rating:5, occasion:'Family Stay · December 2024',       comment:'A family of 6 stayed in two rooms. Rooms were spacious, kids were comfortable, and the restaurant served amazing home-style food. Very reasonably priced too.' },
  { _id:'r5', name:'Mohit Singh',    initials:'MS', rating:5, occasion:'Engagement Ceremony · Oct 2024',   comment:'Our engagement function was handled so professionally. The garden setup was beautiful, guests loved the food, and the staff was attentive throughout.' },
  { _id:'r6', name:'Deepika Joshi',  initials:'DJ', rating:4, occasion:'Tourist Stay · September 2024',    comment:'Perfect base for Maheshwar and Omkareshwar. Clean rooms, hot water, good food. The hotel helped arrange an auto for sightseeing too. Very helpful team.' },
]

export function ReviewsPage() {
  const [reviews, setReviews]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [form, setForm]         = useState({ name:'', email:'', rating:5, occasion:'', comment:'' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  useEffect(() => {
    reviewsAPI.getAll()
      .then(r => setReviews(r.data.reviews.length ? r.data.reviews : STATIC_REVIEWS))
      .catch(() => setReviews(STATIC_REVIEWS))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.comment) { toast.error('Please fill required fields'); return }
    setSubmitting(true)
    try {
      await reviewsAPI.create(form)
      setSubmitted(true)
      toast.success('Review submitted! It will appear after moderation.')
    } catch { toast.error('Failed to submit review') }
    setSubmitting(false)
  }

  const avgRating = reviews.length ? (reviews.reduce((s,r) => s + (r.rating||5), 0) / reviews.length).toFixed(1) : '4.8'

  return (
    <>
      <Helmet>
        <title>Guest Reviews – Yashraj Palace | Hotel & Wedding Venue Maheshwar</title>
        <meta name="description" content={`Yashraj Palace rated ${avgRating}/5 by guests. Read reviews from room stays, weddings, and events. Leave your own review.`} />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">What Our Guests Say</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Guest Reviews</h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex text-gold text-2xl">{[...Array(5)].map((_,i) => <FaStar key={i}/>)}</div>
            <span className="font-serif text-4xl font-semibold text-white">{avgRating}</span>
            <span className="text-white/65">/5 · {reviews.length}+ reviews</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center py-20"><div className="spinner"/></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map(r => (
              <div key={r._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex text-gold mb-3">
                  {[...Array(r.rating||5)].map((_,i) => <FaStar key={i} size={14}/>)}
                  {[...Array(5-(r.rating||5))].map((_,i) => <FaStar key={i} size={14} className="text-gray-200"/>)}
                </div>
                <p className="text-sm text-charcoal-muted italic leading-relaxed mb-4">"{r.comment}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-maroon text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {r.initials || r.name?.slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{r.name}</div>
                    <div className="text-xs text-charcoal-muted">{r.occasion || r.stayDate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Write a review */}
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <p className="section-eyebrow">Share Your Experience</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Write a Review</h2>
          </div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">🙏</div>
              <h3 className="font-semibold text-charcoal mb-2">Thank you for your review!</h3>
              <p className="text-sm text-charcoal-muted">Your review will appear here after moderation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Name *</label><input className="input-field" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} placeholder="Your name" /></div>
                <div><label className="label">Email *</label><input type="email" className="input-field" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} placeholder="email@example.com" /></div>
              </div>
              <div>
                <label className="label">Occasion</label>
                <input className="input-field" value={form.occasion} onChange={e => setForm(p=>({...p,occasion:e.target.value}))} placeholder="e.g. Room Stay, Wedding, Corporate Event" />
              </div>
              <div>
                <label className="label">Rating *</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setForm(p=>({...p,rating:n}))}
                      className={`text-2xl transition-colors ${n <= form.rating ? 'text-gold' : 'text-gray-200'}`}>★</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Your Review *</label>
                <textarea className="input-field resize-none" rows={4} value={form.comment} onChange={e => setForm(p=>({...p,comment:e.target.value}))} placeholder="Tell us about your experience at Yashraj Palace..." />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full py-3 text-sm disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
-e 
export default ReviewsPage
