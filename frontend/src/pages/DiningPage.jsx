// DiningPage.jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const MENU_HIGHLIGHTS = [
  { cat: 'Breakfast', items: ['Poha & Jalebi', 'Paratha with Butter', 'Idli Sambar', 'Bread Toast & Eggs', 'Fresh Juice', 'Tea / Coffee'] },
  { cat: 'Lunch', items: ['Dal Baati Churma', 'Vegetable Curries', 'Roti & Rice', 'Salad & Raita', 'Regional MP Thali', 'Seasonal Vegetables'] },
  { cat: 'Dinner', items: ['Paneer Dishes', 'Non-Veg Curries', 'Tandoori Items', 'Dal Makhani', 'Biryani', 'Desserts & Sweets'] },
  { cat: 'Snacks', items: ['Samosa & Chaat', 'Pakoda', 'Sandwich', 'Maggi', 'Tea & Coffee', 'Cold Drinks'] },
]

export function DiningPage() {
  return (
    <>
      <Helmet>
        <title>Restaurant & Dining – Yashraj Palace | Indian Cuisine Maheshwar</title>
        <meta name="description" content="In-house restaurant at Yashraj Palace serving fresh Indian food, regional MP cuisine, and event catering. Full day dining — breakfast to dinner." />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Restaurant & Dining</p>
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
            <p className="text-charcoal-muted leading-relaxed mb-4">Our restaurant serves hotel guests throughout the day — from a warm breakfast before your Maheshwar sightseeing to a satisfying dinner after a long day of exploration. The menu draws heavily from regional Madhya Pradesh traditions — dal baati churma, laal maas, bafla, and fresh regional produce.</p>
            <p className="text-charcoal-muted leading-relaxed mb-6">For events, our catering team offers a 250+ dish menu with live counters, themed food stations, and full-service catering for 50 to 1,000 guests.</p>
            <div className="grid grid-cols-2 gap-3">
              {[['🕐','Open 7 AM – 11 PM'],['🍽','Veg & Non-Veg Menu'],['🎪','Live Counters for Events'],['🌿','Regional MP Specialties'],['🧑‍🍳','Trained In-House Chef'],['📦','Catering for Events']].map(([icon,text]) => (
                <div key={text} className="flex items-center gap-2 text-sm text-charcoal-muted">
                  <span>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>
          <div className="h-80 bg-gradient-to-br from-[#2A1008] to-[#4A1E0F] rounded-xl flex items-center justify-center">
            <span className="font-serif text-4xl text-gold/20 italic">Restaurant</span>
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
              <div key={m.cat} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-serif text-lg font-semibold text-maroon mb-4 pb-3 border-b border-gold/20">{m.cat}</h3>
                <ul className="space-y-2">
                  {m.items.map(item => (
                    <li key={item} className="text-sm text-charcoal-muted flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold inline-block shrink-0" /> {item}
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
            {[['🍛','250+ Dish Menu'],['🎪','Live Counters'],['🌿','Veg & Non-Veg'],['🍰','Dessert Stations'],['🥗','Salad & Raita Bar'],['☕','Tea/Coffee Station'],['🍢','Starters & Snacks'],['🎂','Custom Cake Orders']].map(([icon,text]) => (
              <div key={text} className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-sm font-medium text-charcoal">{text}</div>
              </div>
            ))}
          </div>
          <Link to="/events/book" className="btn-primary px-8 text-sm">Enquire for Event Catering</Link>
        </div>
      </section>
    </>
  )
}

export default DiningPage
