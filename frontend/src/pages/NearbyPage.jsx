// NearbyPage.jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const ATTRACTIONS = [
  { name: 'Maheshwar Fort', dist: '12 km', time: '18 min', desc: 'A majestic fort on the banks of the Narmada river, built by Queen Ahilyabai Holkar. Explore the palace, temples, and riverside ghats within the fort complex.', tips: ['Best visited early morning or evening','Boats available for Narmada ride','Try handloom Maheshwari saris nearby'], color: 'from-blue-900 to-blue-700', icon: '🏯' },
  { name: 'Narmada Ghat', dist: '14 km', time: '20 min', desc: 'Sacred ghats along the Narmada river at Maheshwar. A serene spot for sunrise, sunset, and the evening aarti that draws pilgrims and travellers alike.', tips: ['Evening aarti at 7 PM is unmissable','Boat rides available on the river','Clean and well-maintained ghats'], color: 'from-teal-900 to-teal-700', icon: '🌊' },
  { name: 'Mandleshwar', dist: '2 km', time: '5 min', desc: 'The town adjacent to Yashraj Palace — a historic town with ancient temples, the Narmada river, and a vibrant local market. Perfect for an evening stroll.', tips: ['Mandleshwar Dam is worth visiting','Local bazaar for authentic MP goods','Several ancient temples in town'], color: 'from-purple-900 to-purple-700', icon: '🕌' },
  { name: 'Omkareshwar', dist: '38 km', time: '50 min', desc: 'One of the 12 Jyotirlingas of Lord Shiva — a sacred island temple on the Narmada. A deeply spiritual site that draws devotees from across India.', tips: ['Parikrama (circumambulation) is popular','Boat from the ghat to the island','Morning aarti is especially peaceful'], color: 'from-green-900 to-green-700', icon: '⛩' },
  { name: 'Maheshwari Saree Market', dist: '13 km', time: '20 min', desc: 'Maheshwar is the birthplace of the famous Maheshwari silk saris — handwoven by local craftspeople. Visit the weavers and buy directly.', tips: ['Visit Rehwa Society for authentic sarees','Handloom workshops open to visitors','Good for gifts and souvenirs'], color: 'from-pink-900 to-pink-700', icon: '🧵' },
  { name: 'Narmada Dam', dist: '3 km', time: '6 min', desc: 'The Mandleshwar Dam on the Narmada river, visible from the town. A popular spot for an evening walk and local viewpoint photography.', tips: ['Best at sunrise or sunset','Free entry','Nearby chai stalls open late'], color: 'from-cyan-900 to-cyan-700', icon: '🌉' },
]

export function NearbyPage() {
  return (
    <>
      <Helmet>
        <title>Nearby Attractions – Yashraj Palace | Maheshwar, Omkareshwar, Narmada</title>
        <meta name="description" content="Explore Maheshwar Fort, Narmada Ghats, Omkareshwar and Mandleshwar from Yashraj Palace. Centrally located for MP tourism." />
      </Helmet>
      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Explore the Region</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Nearby Attractions</h1>
          <p className="text-white/65 max-w-xl mx-auto">Stay at Yashraj Palace and explore the cultural, historical, and spiritual richness of the Narmada Valley.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        {ATTRACTIONS.map((a, i) => (
          <div key={a.name} className={`flex flex-col ${i%2===0?'md:flex-row':'md:flex-row-reverse'} gap-8 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm`}>
            <div className={`md:w-72 h-52 md:h-auto bg-gradient-to-br ${a.color} flex items-center justify-center shrink-0`}>
              <span className="text-6xl opacity-20">{a.icon}</span>
            </div>
            <div className="p-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-serif text-2xl font-semibold">{a.name}</h2>
                <span className="badge bg-gold/20 text-maroon text-xs">{a.dist} · {a.time} drive</span>
              </div>
              <p className="text-charcoal-muted leading-relaxed mb-4">{a.desc}</p>
              <div>
                <p className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Tips</p>
                <ul className="space-y-1">
                  {a.tips.map(t => (
                    <li key={t} className="text-sm text-charcoal-muted flex items-center gap-2">
                      <span className="text-gold">•</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-maroon-dark py-14 px-4 text-center">
        <h2 className="font-serif text-2xl text-white mb-3">Plan Your Stay Around the Sights</h2>
        <p className="text-white/65 mb-6 max-w-lg mx-auto">Book a room at Yashraj Palace and use it as your base to explore the entire Narmada Valley.</p>
        <Link to="/book-room" className="btn-gold text-sm px-8">Book Your Room</Link>
      </div>
    </>
  )
}

export default NearbyPage
