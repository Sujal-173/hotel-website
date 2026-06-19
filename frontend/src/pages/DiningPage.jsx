import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const MENU_HIGHLIGHTS = [
  { cat: 'Breakfast', items: ['Poha &amp; Jalebi', 'Paratha with Butter', 'Idli Sambar', 'Bread Toast &amp; Eggs', 'Fresh Juice', 'Tea / Coffee'] },
  { cat: 'Lunch',     items: ['Dal Baati Churma', 'Vegetable Curries', 'Roti &amp; Rice', 'Salad &amp; Raita', 'Regional MP Thali', 'Seasonal Vegetables'] },
  { cat: 'Dinner',    items: ['Paneer Dishes', 'Non-Veg Curries', 'Tandoori Items', 'Dal Makhani', 'Biryani', 'Desserts &amp; Sweets'] },
  { cat: 'Snacks',    items: ['Samosa &amp; Chaat', 'Pakoda', 'Sandwich', 'Maggi', 'Tea &amp; Coffee', 'Cold Drinks'] },
]

const RESTAURANT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Yashraj Palace Restaurant',
  servesCuisine: ['Indian', 'Madhya Pradesh', 'North Indian', 'South Indian'],
  priceRange: '₹₹',
  url: 'https://www.yashrajpalace.com/dining',
  telephone: '+91-70000-00000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Mandleshwar',
    addressLocality: 'Mandleshwar',
    addressRegion: 'Madhya Pradesh',
    postalCode: '451221',
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '07:00',
    closes: '23:00',
  },
  hasMenu: 'https://www.yashrajpalace.com/dining',
  acceptsReservations: true,
  currenciesAccepted: 'INR',
  paymentAccepted: ['Cash', 'UPI', 'Credit Card'],
}

export default function DiningPage() {
  return (
    <>
      <Helmet>
        <title>Restaurant &amp; Dining – Yashraj Palace | Indian Cuisine near Maheshwar</title>
        <meta name="description" content="In-house restaurant at Yashraj Palace serving fresh Indian food, regional MP cuisine (dal baati churma, laal maas), and event catering for 50–1,000 guests. Open 7 AM – 11 PM daily." />
        <link rel="canonical" href="https://www.yashrajpalace.com/dining" />
        <meta property="og:title" content="Restaurant &amp; Dining – Yashraj Palace | Indian Cuisine near Maheshwar" />
        <meta property="og:description" content="Fresh Indian meals, regional MP cuisine, and event catering at Yashraj Palace. Open 7 AM – 11 PM. 250+ dish menu." />
        <meta property="og:url" content="https://www.yashrajpalace.com/dining" />
        <script type="application/ld+json">{JSON.stringify(RESTAURANT_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yashrajpalace.com/' },
            { '@type': 'ListItem', position: 2, name: 'Restaurant & Dining', item: 'https://www.yashrajpalace.com/dining' },
          ],
        })}</script>
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Restaurant &amp; Dining</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Food That Feels Like Home</h1>
          <p className="text-white/65 max-w-xl mx-auto">Fresh Indian meals, regional Madhya Pradesh cuisine, and event catering that makes every celebration taste as good as it looks.</p>
        </div>
      </div>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="section-eyebrow">Our Restaurant</p>
            <div className="gold-divider" />
            <h2 className="section-title">In-House Dining at Yashraj Palace</h2>
            <p className="text-charcoal-muted leading-relaxed mb-4">
              Our restaurant serves hotel guests throughout the day — from a warm breakfast before your Maheshwar sightseeing to a satisfying dinner after a long day of exploration. The menu draws heavily from regional Madhya Pradesh traditions — dal baati churma, laal maas, bafla, and fresh regional produce.
            </p>
            <p className="text-charcoal-muted leading-relaxed mb-6">
              For events, our catering team offers a 250+ dish menu with live counters, themed food stations, and full-service catering for 50 to 1,000 guests.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[['🕐','Open 7 AM – 11 PM'],['🍽','Veg &amp; Non-Veg Menu'],['🎪','Live Counters for Events'],['🌿','Regional MP Specialties'],['🧑‍🍳','Trained In-House Chef'],['📦','Catering for 50–1,000']].map(([icon,text]) => (
                <div key={text} className="flex items-center gap-2 text-sm text-charcoal-muted">
                  <span>{icon}</span> <span dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              ))}
            </div>
            <Link to="/events/book" className="btn-primary text-sm">Enquire for Event Catering</Link>
          </div>
          <div className="h-80 rounded-2xl relative overflow-hidden flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2A1008, #4A1E0F)' }}>
            <div className="text-center">
              <div className="text-6xl mb-3 animate-float">🍛</div>
              <p className="font-serif text-xl italic" style={{ color: 'rgba(201,168,76,0.5)' }}>Restaurant &amp; Catering</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Open 7 AM – 11 PM Daily</p>
            </div>
          </div>
        </div>

        {/* Menu highlights */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-eyebrow">Menu Highlights</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">What We Serve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENU_HIGHLIGHTS.map(m => (
              <div key={m.cat} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <h3 className="font-serif text-lg font-semibold text-maroon mb-4 pb-3 border-b border-gold/20">{m.cat}</h3>
                <ul className="space-y-2">
                  {m.items.map(item => (
                    <li key={item} className="text-sm text-charcoal-muted flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#C9A84C' }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event catering */}
      <section className="py-20 px-4 bg-ivory-dark">
        <div className="max-w-7xl mx-auto text-center">
          <p className="section-eyebrow">Event Catering</p>
          <div className="gold-divider mx-auto" />
          <h2 className="section-title">Catering for 50 to 1,000 Guests</h2>
          <p className="text-charcoal-muted max-w-xl mx-auto mb-10">From simple lunch buffets to multi-course wedding feasts with live counters — our kitchen team handles it all.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[['🍛','250+ Dish Menu'],['🎪','Live Counters'],['🌿','Veg &amp; Non-Veg'],['🍰','Dessert Stations'],['🥗','Salad &amp; Raita Bar'],['☕','Tea/Coffee Station'],['🍢','Starters &amp; Snacks'],['🎂','Custom Cake Orders']].map(([icon,text]) => (
              <div key={text} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-sm font-medium text-charcoal" dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            ))}
          </div>
          <Link to="/events/book" className="btn-primary px-8 text-sm">Enquire for Event Catering</Link>
        </div>
      </section>
    </>
  )
}
