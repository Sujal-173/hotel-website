import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'

const MILESTONES = [
  { year: '2005', title: 'Founded',           desc: 'Yashraj Palace opened its doors as a boutique hotel near Mandleshwar.' },
  { year: '2010', title: 'Wedding Garden',     desc: 'Expanded with a dedicated wedding garden — now hosting 100+ events per year.' },
  { year: '2015', title: 'Banquet Hall Added', desc: 'State-of-the-art banquet hall for 1,000 guests inaugurated.' },
  { year: '2020', title: 'Restaurant Launch',  desc: 'Full-service in-house restaurant with regional MP cuisine launched.' },
  { year: '2024', title: 'Premium Rooms',      desc: 'Complete renovation of all rooms to premium standard completed.' },
]

const VALUES = [
  { icon: '👑', title: 'Royal Hospitality',   desc: 'Every guest is treated with the warmth and care of a palace household.' },
  { icon: '🏡', title: 'Family-Friendly',     desc: 'Built for families — from spacious rooms to safe, clean, welcoming spaces.' },
  { icon: '✨', title: 'Premium Quality',      desc: 'Clean rooms, quality food, reliable service. No compromises.' },
  { icon: '🤝', title: 'Trust-First',          desc: 'Transparent pricing, honest policies, and always reachable on call or WhatsApp.' },
]

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Yashraj Palace',
  url: 'https://www.yashrajpalace.com/',
  logo: 'https://www.yashrajpalace.com/favicon.svg',
  foundingDate: '2005',
  description: 'Yashraj Palace is a premier hotel, wedding garden and event venue near Maheshwar and Mandleshwar, Madhya Pradesh, serving guests with royal hospitality since 2005.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Mandleshwar',
    addressLocality: 'Mandleshwar',
    addressRegion: 'Madhya Pradesh',
    postalCode: '451221',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-70000-00000',
    contactType: 'customer service',
    availableLanguage: ['Hindi', 'English'],
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      opens: '09:00',
      closes: '22:00',
    },
  },
  sameAs: [
    'https://www.facebook.com/yashrajpalace',
    'https://www.instagram.com/yashrajpalace',
  ],
}

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Yashraj Palace – Hotel &amp; Wedding Venue near Maheshwar | Est. 2005</title>
        <meta name="description" content="Learn about Yashraj Palace — a premier hotel, wedding garden and event venue near Maheshwar and Mandleshwar, Madhya Pradesh. Serving guests with royal hospitality since 2005." />
        <link rel="canonical" href="https://www.yashrajpalace.com/about" />
        <meta property="og:title" content="About Yashraj Palace – Hotel &amp; Wedding Venue near Maheshwar" />
        <meta property="og:description" content="Premier hotel, wedding garden and event venue near Maheshwar, MP. Est. 2005. 500+ events hosted, 4.8★ rating." />
        <meta property="og:url" content="https://www.yashrajpalace.com/about" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yashrajpalace.com/' },
            { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.yashrajpalace.com/about' },
          ],
        })}</script>
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-eyebrow text-gold">Our Story</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">About Yashraj Palace</h1>
          <p className="text-white/65 max-w-xl mx-auto">Two decades of hospitality, hundreds of celebrations, and thousands of guests who left with memories they cherish.</p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-80 rounded-2xl relative overflow-hidden flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #4A0F1D, #6B1A2B)' }}>
            <div className="text-center">
              <p className="font-serif text-7xl font-semibold" style={{ color: 'rgba(201,168,76,0.3)' }}>Est.</p>
              <p className="font-serif text-6xl font-semibold" style={{ color: 'rgba(201,168,76,0.5)' }}>2005</p>
            </div>
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/30 rounded-tl" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold/30 rounded-tr" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold/30 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/30 rounded-br" />
          </div>
          <div>
            <p className="section-eyebrow">Who We Are</p>
            <div className="gold-divider" />
            <h2 className="section-title">A Palace Built on Hospitality</h2>
            <p className="text-charcoal-muted leading-relaxed mb-4">
              Yashraj Palace was established with a single vision: to offer the people of Madhya Pradesh and visitors from across India a destination that combines premium accommodation, grand celebration spaces, and genuine hospitality — all under one roof.
            </p>
            <p className="text-charcoal-muted leading-relaxed mb-4">
              Located near Mandleshwar in the Khargone district, we are perfectly positioned as a base for travellers exploring Maheshwar Fort, the Narmada Ghats, and Omkareshwar temple. For families hosting weddings, receptions, and special events, our garden and banquet hall have become one of the most trusted names in the region.
            </p>
            <p className="text-charcoal-muted leading-relaxed mb-6">
              We believe hospitality is not a service — it is an attitude. Every team member at Yashraj Palace is trained to make guests feel genuinely welcomed, cared for, and valued.
            </p>
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
              <div key={v.title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
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
            <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />
            <div className="space-y-10">
              {MILESTONES.map(m => (
                <div key={m.year} className="flex gap-8 items-start">
                  <div className="w-32 shrink-0 text-right">
                    <span className="font-serif text-2xl font-semibold text-maroon">{m.year}</span>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full border-4 border-white shadow-md absolute -left-10 top-1"
                      style={{ background: 'linear-gradient(135deg, #E8C97A, #C9A84C)' }} />
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
      <section className="py-20 px-4 text-center" style={{ background: 'linear-gradient(135deg, #3A0A18, #6B1A2B)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-white mb-4">Come Experience It Yourself</h2>
          <p className="text-white/65 mb-8">Whether you're planning a stay, a wedding, or a corporate event — we'd love to host you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/book-room" className="btn-gold text-sm px-7">Book a Room</Link>
            <Link to="/contact" className="border-2 border-white/40 text-white px-7 py-3 rounded-lg font-semibold text-sm hover:bg-white/10 transition-all">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
