// EventPackagesPage.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { eventsAPI } from '../utils/api'
import { FiCheck } from 'react-icons/fi'

const STATIC_PACKAGES = [
  { _id:'s1', name:'Silver Celebration', category:'all', price:45000, capacity:{min:50,max:200}, duration:1, badge:'', venue:'banquet', inclusions:['Banquet hall access (6 hours)','Basic floral decoration','Sound system & mic setup','Parking for 40 vehicles','1 event coordination staff','Welcome banner'], exclusions:['Catering (priced separately)','Photography','Decoration beyond basics'] },
  { _id:'s2', name:'Royal Wedding', category:'wedding', price:180000, capacity:{min:200,max:600}, duration:1, badge:'Most Popular', venue:'combined', inclusions:['Full garden + hall access (full day)','Premium floral & mandap decor','DJ, lighting & sound system','300-plate in-house catering','4 rooms for family (1 night)','Dedicated wedding coordinator','Welcome gate setup','Bride & groom seating arrangement'], exclusions:['Photography','Mehendi artist','Additional catering beyond 300 plates'] },
  { _id:'s3', name:'Grand Palace', category:'wedding', price:450000, capacity:{min:500,max:1000}, duration:2, badge:'All Inclusive', venue:'combined', inclusions:['Full property — garden + hall + lawn (2 days)','Custom luxury stage & decor','Unlimited catering — all meals + live counters','10 rooms for 2 nights','2-day event coordination team','Baraat welcome setup','Custom lighting rig','Photography & videography coordination'], exclusions:['External entertainment','Legal/govt permissions'] },
  { _id:'s4', name:'Birthday Bash', category:'birthday', price:25000, capacity:{min:30,max:150}, duration:1, badge:'', venue:'banquet', inclusions:['Banquet hall (4 hours)','Balloon & ribbon decoration','Birthday cake coordination','Basic sound system','Parking for 30 vehicles'], exclusions:['Catering','Photography','Custom theme decor'] },
  { _id:'s5', name:'Corporate Off-Site', category:'corporate', price:55000, capacity:{min:50,max:300}, duration:1, badge:'', venue:'banquet', inclusions:['Banquet hall + AV setup','Projector, screen, mics','High-speed Wi-Fi','Welcome snacks & lunch buffet (included)','Tea/coffee station','Coordination support'], exclusions:['Team activities','Outdoor setup'] },
  { _id:'s6', name:'Engagement Function', category:'engagement', price:35000, capacity:{min:50,max:200}, duration:1, badge:'', venue:'garden', inclusions:['Garden access (5 hours)','Floral stage setup','Sound system','200 guests capacity','Basic catering coordination'], exclusions:['Full catering','Photography','DJ'] },
]

export function EventPackagesPage() {
  const [packages, setPackages]   = useState([])
  const [filter, setFilter]       = useState('all')
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    eventsAPI.getPackages()
      .then(r => setPackages(r.data.packages.length ? r.data.packages : STATIC_PACKAGES))
      .catch(() => setPackages(STATIC_PACKAGES))
      .finally(() => setLoading(false))
  }, [])

  const cats = ['all','wedding','reception','engagement','birthday','corporate','family','cultural']
  const filtered = filter === 'all' ? packages : packages.filter(p => p.category === filter)

  return (
    <>
      <Helmet>
        <title>Event Packages & Pricing – Yashraj Palace | Wedding Venue Maheshwar</title>
        <meta name="description" content="View wedding, reception, birthday and corporate event packages at Yashraj Palace. Transparent pricing from ₹25,000. Garden capacity 1000+." />
      </Helmet>
      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Packages & Pricing</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Event Packages</h1>
          <p className="text-white/65 max-w-xl mx-auto">Transparent, all-inclusive packages designed for every budget and occasion. No hidden costs, no surprises.</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sticky top-16 z-30 overflow-x-auto">
        <div className="flex gap-2 max-w-7xl mx-auto min-w-max">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize ${filter === c ? 'bg-maroon text-white' : 'bg-ivory-dark text-charcoal-muted hover:text-maroon'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? <div className="flex justify-center py-20"><div className="spinner"/></div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(pkg => (
              <div key={pkg._id} className={`bg-white rounded-2xl overflow-hidden relative ${pkg.badge === 'Most Popular' ? 'border-2 border-gold shadow-lg' : 'border border-gray-100 shadow-sm'}`}>
                {pkg.badge && <div className="bg-gold text-charcoal text-xs font-bold px-4 py-1.5 text-center">{pkg.badge}</div>}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-1">{pkg.name}</h3>
                  <p className="text-xs text-charcoal-muted mb-1 capitalize">{pkg.category} · Up to {pkg.capacity?.max} guests · {pkg.duration} day{pkg.duration>1?'s':''}</p>
                  <div className="font-serif text-3xl font-semibold text-maroon mt-3 mb-1">₹{pkg.price?.toLocaleString('en-IN')}</div>
                  <p className="text-xs text-charcoal-muted mb-5">Starting price · Custom quote available</p>

                  {pkg.inclusions?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Includes</p>
                      <ul className="space-y-1.5">
                        {pkg.inclusions.map(inc => (
                          <li key={inc} className="flex items-start gap-2 text-sm text-charcoal-muted">
                            <FiCheck className="text-gold shrink-0 mt-0.5" size={13} /> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.exclusions?.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">Not Included</p>
                      <ul className="space-y-1">
                        {pkg.exclusions.map(ex => (
                          <li key={ex} className="text-xs text-charcoal-muted">× {ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link to={`/events/book?package=${pkg._id}`} className={`block text-center text-sm py-2.5 rounded font-semibold transition-all ${pkg.badge === 'Most Popular' ? 'btn-primary' : 'btn-outline'}`}>
                    Book This Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom quote */}
        <div className="mt-14 bg-maroon rounded-2xl p-8 text-center text-white">
          <h2 className="font-serif text-2xl mb-3">Need a Custom Package?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">Our events team can build a custom package tailored to your exact guest count, budget, venue preferences, and catering requirements.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/events/book" className="btn-gold text-sm px-7">Request Custom Quote</Link>
            <a href="tel:+917000000000" className="border-2 border-white/40 text-white px-6 py-3 rounded font-semibold text-sm hover:bg-white/10 transition-all">📞 Call Now</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventPackagesPage
