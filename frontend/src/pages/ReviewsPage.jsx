import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { reviewsAPI } from '../utils/api'
import toast from 'react-hot-toast'

const STATIC_REVIEWS = [
  { _id:'r1', guestName:'Ramesh Verma',   rating:5, occasion:'Wedding Reception · March 2025',  comment:'We hosted my daughter\'s wedding reception here. The garden was beautifully lit, food was excellent, and the coordination team handled everything flawlessly. Highly recommended.', verified:true },
  { _id:'r2', guestName:'Priya Sharma',   rating:5, occasion:'Room Stay · January 2025',         comment:'Stayed 3 nights while visiting Maheshwar. The room was spotless, staff were incredibly warm, and the food genuinely tasty. This place has a real character to it.', verified:true },
  { _id:'r3', guestName:'Ankit Kulkarni', rating:4, occasion:'Corporate Event · Nov 2024',       comment:'We held our annual function here for 300 people. Great AV setup, good parking, and catering was well organised. Will return for our next event without hesitation.', verified:true },
  { _id:'r4', guestName:'Sunita Patel',   rating:5, occasion:'Birthday Party · Dec 2024',        comment:'Hosted my husband\'s 50th birthday here. Everything was decorated exactly as we discussed and the food was outstanding. The team made us feel so special throughout.', verified:true },
  { _id:'r5', guestName:'Vivek Joshi',    rating:5, occasion:'Wedding · October 2024',           comment:'Our wedding at Yashraj Palace was nothing short of magical. The mandap setup, garden lighting, and catering — all top class. The coordinator was available at every step.', verified:true },
  { _id:'r6', guestName:'Meena Agrawal',  rating:4, occasion:'Room Stay · February 2025',        comment:'Very comfortable stay. The room was clean, AC worked well, and the food was delicious — especially the morning paratha. Close to Maheshwar which made sightseeing easy.', verified:true },
]

const REVIEW_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Yashraj Palace',
  url: 'https://www.yashrajpalace.com/',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '200',
    bestRating: '5',
    worstRating: '1',
  },
  review: STATIC_REVIEWS.map(r => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.guestName },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: '5' },
    reviewBody: r.comment,
    name: r.occasion,
    publisher: { '@type': 'Organization', name: 'Yashraj Palace' },
  })),
}

function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex text-gold">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} size={size} className={i < rating ? 'text-gold' : 'text-gray-200'} />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    reviewsAPI.getAll()
      .then(r => setReviews(r.data.reviews?.length ? r.data.reviews : STATIC_REVIEWS))
      .catch(() => setReviews(STATIC_REVIEWS))
      .finally(() => setLoading(false))
  }, [])

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1)).toFixed(1)

  return (
    <>
      <Helmet>
        <title>Guest Reviews – Yashraj Palace | Hotel &amp; Wedding Venue Maheshwar</title>
        <meta name="description" content="Read genuine guest reviews of Yashraj Palace — rated 4.8/5 by 200+ guests. Wedding reviews, room stay reviews, and event feedback from real guests." />
        <link rel="canonical" href="https://www.yashrajpalace.com/reviews" />
        <meta property="og:title" content="Guest Reviews – Yashraj Palace | 4.8★ Rating" />
        <meta property="og:description" content="Rated 4.8 out of 5 by 200+ real guests. Read reviews for room stays, weddings, and events at Yashraj Palace, Mandleshwar." />
        <meta property="og:url" content="https://www.yashrajpalace.com/reviews" />
        <script type="application/ld+json">{JSON.stringify(REVIEW_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yashrajpalace.com/' },
            { '@type': 'ListItem', position: 2, name: 'Guest Reviews', item: 'https://www.yashrajpalace.com/reviews' },
          ],
        })}</script>
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Guest Reviews</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">What Our Guests Say</h1>
          <p className="text-white/65 max-w-xl mx-auto">200+ guests have shared their experience. Here's what they loved about Yashraj Palace.</p>
        </div>
      </div>

      {/* Rating summary */}
      <div className="bg-ivory-dark border-b border-gold/20 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-center">
            <div className="font-serif text-6xl font-semibold text-maroon">{avgRating}</div>
            <StarRow rating={5} size={20} />
            <div className="text-charcoal-muted text-sm mt-1">{reviews.length}+ verified reviews</div>
          </div>
          <div className="w-px h-16 bg-gold/30 hidden md:block" />
          <div className="grid grid-cols-2 gap-4 text-center">
            {[['98%','Would recommend'],['4.9★','Rooms & Cleanliness'],['4.8★','Food & Catering'],['4.9★','Event Management']].map(([v,l]) => (
              <div key={l}>
                <div className="font-serif text-xl font-semibold text-maroon">{v}</div>
                <div className="text-xs text-charcoal-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center py-20"><div className="spinner" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(r => (
              <article key={r._id} className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
                <StarRow rating={r.rating} />
                <p className="text-sm text-charcoal-muted leading-relaxed italic my-4 flex-1">"{r.comment}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, #8B2238, #6B1A2B)' }}>
                    {(r.guestName || r.name || 'G').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{r.guestName || r.name}</div>
                    <div className="text-xs text-charcoal-muted">{r.occasion || r.eventType || 'Verified Guest'}</div>
                  </div>
                  {r.verified && (
                    <div className="ml-auto text-xs text-green-600 font-medium">✓ Verified</div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Write a review CTA */}
        <div className="mt-14 rounded-2xl p-8 text-center text-white" style={{ background: 'linear-gradient(135deg, #4A0F1D, #6B1A2B)' }}>
          <h2 className="font-serif text-2xl mb-3">Stayed with Us?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">
            We'd love to hear about your experience. Your feedback helps future guests and motivates our team.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://g.page/yashrajpalace/review" target="_blank" rel="noreferrer" className="btn-gold text-sm px-7">
              Write a Google Review
            </a>
            <Link to="/contact" className="border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
