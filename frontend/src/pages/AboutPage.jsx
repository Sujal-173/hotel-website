import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'

const MILESTONES = [
  { year: '2005', title: 'Founded', desc: 'Yashraj Palace opened its doors as a boutique hotel near Mandleshwar.' },
  { year: '2010', title: 'Wedding Garden', desc: 'Expanded with a dedicated wedding garden — now hosting 100+ events per year.' },
  { year: '2015', title: 'Banquet Hall Added', desc: 'State-of-the-art banquet hall for 1,000 guests inaugurated.' },
  { year: '2020', title: 'Restaurant Launch', desc: 'Full-service in-house restaurant with regional MP cuisine launched.' },
  { year: '2024', title: 'Premium Rooms', desc: 'Renovation of all rooms to premium standard completed.' },
]

const VALUES = [
  { icon: '👑', title: 'Royal Hospitality', desc: 'Every guest is treated with the warmth and care of a palace household.' },
  { icon: '🏡', title: 'Family-Friendly', desc: 'Built for families — from spacious rooms to safe, clean, welcoming spaces.' },
  { icon: '✨', title: 'Premium Quality', desc: 'Clean rooms, quality food, reliable service. No compromises.' },
  { icon: '🤝', title: 'Trust-First', desc: 'Transparent pricing, honest policies, and always reachable on call or WhatsApp.' },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Yashraj Palace – Hotel & Wedding Venue near Maheshwar</title>
        <meta name="description" content="Learn about Yashraj Palace — a premier hotel, wedding garden and event venue near Maheshwar and Mandleshwar. Serving guests since 2005 with royal hospitality." />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Our Story</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">About Yashraj Palace</h1>
          <p className="text-white/65 max-w-xl mx-auto">Two decades of hospitality, hundreds of celebrations, and thousands of guests who left with memories they cherish.</p>
        </div>
      </div>

      {/* Story section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-80 bg-gradient-to-br from-maroon-dark to-maroon rounded-xl flex items-center justify-center">
            <span className="font-serif text-5xl text-gold/20 italic">Est. 2005</span>
          </div>
          <div>
            <p className="section-eyebrow">Who We Are</p>
            <div className="gold-divider" />
            <h2 className="section-title">A Palace Built on Hospitality</h2>
            <p className="text-charcoal-muted leading-relaxed mb-4">Yashraj Palace was established with a single vision: to offer the people of Madhya Pradesh and visitors from across India a destination that combines premium accommodation, grand celebration spaces, and genuine hospitality — all under one roof.</p>
            <p className="text-charcoal-muted leading-relaxed mb-4">Located near Mandleshwar in the Khargone district, we are perfectly positioned as a base for travellers exploring Maheshwar Fort, the Narmada Ghats, and the Omkareshwar temple. For families hosting weddings, receptions, and special events, our garden and banquet hall have become one of the most trusted names in the region.</p>
            <p className="text-charcoal-muted leading-relaxed mb-6">We believe hospitality is not a service — it is an attitude. Every team member at Yashraj Palace is trained to make guests feel genuinely welcomed, cared for, and valued.</p>
            <div className="grid grid-cols-2 gap-3">
              {['20+ years of experience','500+ events hosted','4.8★ average rating','1000-guest garden capacity','In-house catering team','24/7 guest support'].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-charcoal-muted">
                  <FiCheck className="text-gold shrink-0" size={14} /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-ivory-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">What We Stand For</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white rounded-xl p-6 text-center shadow-sm border border-black/5">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-serif text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Our Journey</p>
            <div className="gold-divider mx-auto" />
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gold/30" />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex gap-8 items-start">
                  <div className="w-32 shrink-0 text-right">
                    <span className="font-serif text-2xl font-semibold text-maroon">{m.year}</span>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-gold border-4 border-white shadow-md absolute -left-10 top-1" />
                    <h3 className="font-semibold text-charcoal mb-1">{m.title}</h3>
                    <p className="text-sm text-charcoal-muted">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-maroon-dark py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-white mb-4">Come Experience It Yourself</h2>
          <p className="text-white/65 mb-8">Whether you're planning a stay, a wedding, or a corporate event — we'd love to host you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/book-room" className="btn-gold text-sm px-7">Book a Room</Link>
            <Link to="/contact" className="border-2 border-white/40 text-white px-7 py-3 rounded font-semibold text-sm hover:bg-white/10 transition-all">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
