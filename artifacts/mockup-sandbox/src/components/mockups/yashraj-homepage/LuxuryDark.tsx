import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Phone, Mail, Instagram, Facebook, Twitter,
  Calendar, Users, ChevronDown, CheckCircle2, Wifi, Car, Utensils,
  PartyPopper, Star, ChevronRight, Plus, Minus, ArrowRight, BedDouble, 
  MessageCircle, Coffee, ShieldCheck, Music, HeartHandshake, Mic2, Users2,
  Quote
} from 'lucide-react';

export function LuxuryDark() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#C9A84C] selection:text-[#0D0508] bg-[#0D0508] text-[#FAF7F2] overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        .glass-panel {
          background: rgba(26, 6, 16, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(201, 168, 76, 0.15);
        }
        
        .glass-panel-hover:hover {
          background: rgba(26, 6, 16, 0.6);
          border: 1px solid rgba(201, 168, 76, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 10px 40px -10px rgba(201, 168, 76, 0.15);
        }

        .gold-gradient-text {
          background: linear-gradient(to right, #C9A84C, #F3E5AB, #C9A84C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gold-glow {
          position: relative;
        }
        .gold-glow::after {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(45deg, transparent, rgba(201,168,76,0.3), transparent);
          z-index: -1;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gold-glow:hover::after {
          opacity: 1;
        }

        .pattern-bg {
          background-image: radial-gradient(rgba(201, 168, 76, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .radial-spotlight {
          background: radial-gradient(circle at 50% 0%, rgba(107, 26, 43, 0.2) 0%, rgba(13, 5, 8, 0) 50%);
        }

        .custom-date-input::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(340deg) opacity(0.7);
          cursor: pointer;
        }
      `}} />

      {/* Navbar */}
      <nav className={\`fixed top-0 w-full z-50 transition-all duration-500 \${isScrolled ? 'bg-[#0D0508]/90 backdrop-blur-md border-b border-[#C9A84C]/10 py-4' : 'bg-transparent py-6'}\`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-widest text-[#FAF7F2] uppercase">Yashraj</span>
            <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[#C9A84C] uppercase ml-1">Palace</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {['Stay', 'Weddings', 'Events', 'Dining', 'Gallery'].map((item) => (
              <a key={item} href="#" className="font-sans text-sm tracking-wider text-[#FAF7F2]/80 hover:text-[#C9A84C] transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="relative px-8 py-3 bg-transparent border border-[#C9A84C]/50 text-[#C9A84C] font-sans text-sm tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0D0508] transition-all duration-500 overflow-hidden group">
              <span className="relative z-10">Book Room</span>
              <div className="absolute inset-0 bg-[#C9A84C] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></div>
            </button>
          </div>

          <button 
            className="md:hidden text-[#FAF7F2]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#0D0508] z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(13,5,8,0.3),#0D0508)] z-10"></div>
          {/* Abstract geometric luxury pattern instead of image */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="lux-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#C9A84C" strokeWidth="0.5"/>
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#6B1A2B" strokeWidth="1"/>
                </pattern>
                <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6B1A2B" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#0D0508" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#lux-pattern)" />
              <rect width="100%" height="100%" fill="url(#hero-glow)" />
            </svg>
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center mt-[-10vh]">
          <span className="font-sans text-xs md:text-sm tracking-[0.4em] text-[#C9A84C] uppercase mb-6 text-center">Maheshwar, Madhya Pradesh</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-center leading-[1.1] mb-8 max-w-5xl">
            A Palace for Grand Stays and <span className="gold-gradient-text italic">Grander Celebrations</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-[#FAF7F2]/60 text-center max-w-2xl font-light mb-16">
            Experience the royal heritage of Nimar. From luxurious suites to a majestic wedding garden accommodating 1,000+ guests.
          </p>

          {/* Booking Widget */}
          <div className="glass-panel p-2 md:p-4 rounded-xl w-full max-w-5xl animate-[fade-in-up_1s_ease-out]">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="p-3 md:border-r border-[#C9A84C]/20">
                <label className="block font-sans text-xs tracking-widest text-[#FAF7F2]/50 uppercase mb-2">Check In</label>
                <input type="date" className="custom-date-input bg-transparent w-full text-[#FAF7F2] font-sans outline-none focus:text-[#C9A84C] transition-colors" />
              </div>
              <div className="p-3 md:border-r border-[#C9A84C]/20">
                <label className="block font-sans text-xs tracking-widest text-[#FAF7F2]/50 uppercase mb-2">Check Out</label>
                <input type="date" className="custom-date-input bg-transparent w-full text-[#FAF7F2] font-sans outline-none focus:text-[#C9A84C] transition-colors" />
              </div>
              <div className="p-3 md:border-r border-[#C9A84C]/20">
                <label className="block font-sans text-xs tracking-widest text-[#FAF7F2]/50 uppercase mb-2">Room Type</label>
                <select className="bg-transparent w-full text-[#FAF7F2] font-sans outline-none appearance-none cursor-pointer">
                  <option className="bg-[#0D0508] text-[#FAF7F2]">All Rooms</option>
                  <option className="bg-[#0D0508] text-[#FAF7F2]">Deluxe Room</option>
                  <option className="bg-[#0D0508] text-[#FAF7F2]">Premium Room</option>
                  <option className="bg-[#0D0508] text-[#FAF7F2]">Family Suite</option>
                </select>
              </div>
              <div className="p-3">
                <label className="block font-sans text-xs tracking-widest text-[#FAF7F2]/50 uppercase mb-2">Guests</label>
                <select className="bg-transparent w-full text-[#FAF7F2] font-sans outline-none appearance-none cursor-pointer">
                  <option className="bg-[#0D0508] text-[#FAF7F2]">2 Adults, 0 Children</option>
                  <option className="bg-[#0D0508] text-[#FAF7F2]">2 Adults, 1 Child</option>
                  <option className="bg-[#0D0508] text-[#FAF7F2]">4 Adults</option>
                </select>
              </div>
              <div className="p-2">
                <button className="w-full h-full min-h-[3rem] bg-[#C9A84C] text-[#0D0508] font-sans font-medium tracking-widest uppercase text-sm hover:bg-[#F3E5AB] transition-colors rounded-sm flex items-center justify-center gap-2">
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-[#C9A84C]/10 bg-[#1A0610]/50 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { icon: Car, label: "Free Parking" },
              { icon: Utensils, label: "In-House Catering" },
              { icon: HeartHandshake, label: "Wedding Manager" },
              { icon: Wifi, label: "High-Speed Wi-Fi" },
              { icon: MessageCircle, label: "WhatsApp Confirmation" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <item.icon size={24} className="text-[#C9A84C]" strokeWidth={1.5} />
                <span className="font-sans text-xs tracking-wider text-[#FAF7F2]/70 uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <section className="py-32 relative radial-spotlight">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-sans text-xs tracking-[0.3em] text-[#C9A84C] uppercase block mb-4">Luxurious Accommodations</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#FAF7F2]">Rest in <span className="italic text-[#C9A84C]">Royal Elegance</span></h2>
            </div>
            <a href="#" className="font-sans text-sm tracking-widest text-[#C9A84C] uppercase flex items-center gap-2 hover:gap-4 transition-all duration-300">
              View All Rooms <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Deluxe Room', price: '1,800', desc: 'Elegant comfort perfect for short stays. Featuring modern amenities and classic decor.', beds: '1 Queen Bed', size: '250 sq.ft' },
              { name: 'Premium Room', price: '2,500', desc: 'Spacious retreats with superior views, premium bedding, and enhanced sitting areas.', beds: '1 King Bed', size: '350 sq.ft' },
              { name: 'Family Suite', price: '3,800', desc: 'Expansive interconnected rooms designed for families. Includes a private lounge area.', beds: '2 King Beds', size: '550 sq.ft' },
            ].map((room, i) => (
              <div key={i} className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group transition-all duration-500">
                <div className="h-64 bg-[#1A0610] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0508] to-transparent z-10"></div>
                  {/* Abstract placeholder for room image */}
                  <div className="w-full h-full opacity-30 bg-[#6B1A2B]" style={{ backgroundImage: 'radial-gradient(circle at center, #C9A84C 0%, transparent 70%)' }}></div>
                  <div className="absolute bottom-4 left-4 z-20 flex gap-3">
                    <span className="bg-[#0D0508]/80 backdrop-blur text-[#FAF7F2] text-xs px-3 py-1.5 rounded-sm font-sans flex items-center gap-2"><BedDouble size={14} className="text-[#C9A84C]"/> {room.beds}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl mb-2">{room.name}</h3>
                  <p className="font-sans text-sm text-[#FAF7F2]/60 mb-6 line-clamp-2">{room.desc}</p>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <Wifi size={18} className="text-[#FAF7F2]/40" />
                    <Coffee size={18} className="text-[#FAF7F2]/40" />
                    <Car size={18} className="text-[#FAF7F2]/40" />
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-[#C9A84C]/10">
                    <div>
                      <span className="font-sans text-xs text-[#FAF7F2]/50 uppercase tracking-widest block mb-1">Starting from</span>
                      <span className="font-serif text-2xl text-[#C9A84C]">₹{room.price}<span className="text-sm text-[#FAF7F2]/40 font-sans">/night</span></span>
                    </div>
                    <button className="w-12 h-12 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0D0508] transition-colors">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weddings Hero */}
      <section className="relative py-40 border-y border-[#C9A84C]/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0D0508]/80 z-10 backdrop-blur-sm"></div>
          <div className="w-full h-full opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #6B1A2B 0, #6B1A2B 1px, transparent 0, transparent 50%)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <PartyPopper size={48} className="mx-auto text-[#C9A84C] mb-8" strokeWidth={1} />
          <h2 className="font-serif text-5xl md:text-7xl mb-6">The Perfect <span className="gold-gradient-text italic">Symphony</span></h2>
          <p className="font-sans text-xl text-[#FAF7F2]/70 max-w-2xl mx-auto font-light mb-16">
            Our sprawling wedding garden is designed for grandeur. Host up to 1,000 guests in a setting that blends natural beauty with palatial elegance.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { stat: "1,000+", label: "Guest Capacity" },
              { stat: "500+", label: "Events Hosted" },
              { stat: "20,000", label: "Sq.Ft Garden" },
              { stat: "4.8", label: "Star Rating", icon: Star }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="font-serif text-4xl md:text-5xl text-[#C9A84C] mb-2 flex items-center gap-2">
                  {item.stat}
                  {item.icon && <item.icon size={28} className="text-[#C9A84C] fill-[#C9A84C]" />}
                </div>
                <span className="font-sans text-xs tracking-widest text-[#FAF7F2]/60 uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-32 pattern-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <span className="font-sans text-xs tracking-[0.3em] text-[#C9A84C] uppercase block mb-4">Versatile Spaces</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#FAF7F2]">Every Occasion, <span className="italic text-[#C9A84C]">Elevated</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Weddings", icon: HeartHandshake },
              { name: "Receptions", icon: PartyPopper },
              { name: "Engagements", icon: Star },
              { name: "Corporate", icon: Users2 },
              { name: "Birthdays", icon: Music },
              { name: "Anniversaries", icon: Calendar },
              { name: "Family Meets", icon: Users },
              { name: "Cultural", icon: Mic2 },
            ].map((event, i) => (
              <div key={i} className="glass-panel p-8 rounded-xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-[#C9A84C]/10 transition-all duration-300">
                <event.icon size={32} className="text-[#C9A84C] mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1} />
                <h4 className="font-sans text-sm tracking-wider uppercase text-[#FAF7F2]">{event.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-32 relative bg-[#1A0610]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <span className="font-sans text-xs tracking-[0.3em] text-[#C9A84C] uppercase block mb-4">Event Packages</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#FAF7F2]">Curated for <span className="italic text-[#C9A84C]">Excellence</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Silver */}
            <div className="glass-panel p-10 rounded-2xl border border-[#C9A84C]/10">
              <h3 className="font-sans text-xl tracking-widest uppercase mb-2">Silver Event</h3>
              <p className="font-sans text-sm text-[#FAF7F2]/60 mb-8 h-10">Perfect for intimate gatherings and pre-wedding functions.</p>
              <div className="font-serif text-4xl text-[#C9A84C] mb-8">₹45,000</div>
              <ul className="space-y-4 mb-10">
                {['Up to 100 Guests', 'Standard Decoration', 'Basic Sound System', '4 Hours Duration'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-[#FAF7F2]/80">
                    <CheckCircle2 size={16} className="text-[#C9A84C]" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border border-[#C9A84C]/30 text-[#C9A84C] font-sans text-sm tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0D0508] transition-colors rounded-sm">
                Enquire Now
              </button>
            </div>

            {/* Featured */}
            <div className="glass-panel relative p-10 rounded-2xl border-2 border-[#C9A84C] transform md:-translate-y-4 shadow-[0_0_40px_rgba(201,168,76,0.15)] bg-[#1A0610]">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C9A84C] text-[#0D0508] px-6 py-1.5 rounded-full font-sans text-xs tracking-widest uppercase font-bold">
                Most Popular
              </div>
              <h3 className="font-sans text-xl tracking-widest uppercase mb-2 text-[#C9A84C]">Royal Wedding</h3>
              <p className="font-sans text-sm text-[#FAF7F2]/60 mb-8 h-10">The complete wedding experience with premium catering.</p>
              <div className="font-serif text-5xl text-[#FAF7F2] mb-8">₹1.8L</div>
              <ul className="space-y-4 mb-10">
                {['Up to 500 Guests', 'Premium Floral Decor', 'DJ & Lighting Setup', 'Bridal Room Included', 'Full Day Access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-[#FAF7F2]/90">
                    <CheckCircle2 size={16} className="text-[#C9A84C]" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-[#C9A84C] text-[#0D0508] font-sans text-sm tracking-widest uppercase font-semibold hover:bg-[#F3E5AB] transition-colors rounded-sm shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                Book Package
              </button>
            </div>

            {/* Grand */}
            <div className="glass-panel p-10 rounded-2xl border border-[#C9A84C]/10">
              <h3 className="font-sans text-xl tracking-widest uppercase mb-2">Grand Palace</h3>
              <p className="font-sans text-sm text-[#FAF7F2]/60 mb-8 h-10">An all-inclusive luxurious affair for massive celebrations.</p>
              <div className="font-serif text-4xl text-[#C9A84C] mb-8">₹4.5L</div>
              <ul className="space-y-4 mb-10">
                {['Up to 1000+ Guests', 'Elite Theme Decoration', 'Live Band Setup', 'All Rooms Blocked', '2 Days Access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-[#FAF7F2]/80">
                    <CheckCircle2 size={16} className="text-[#C9A84C]" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border border-[#C9A84C]/30 text-[#C9A84C] font-sans text-sm tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0D0508] transition-colors rounded-sm">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="font-serif text-4xl md:text-5xl text-[#FAF7F2]">Words from <br/><span className="italic text-[#C9A84C]">Our Guests</span></h2>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0508] transition-colors">
                <ArrowRight size={20} className="transform rotate-180" />
              </button>
              <button className="w-12 h-12 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0508] transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "We hosted our daughter's wedding here. The garden is breathtaking at night. The staff managed 800 guests effortlessly. Truly a palatial experience.", author: "Rajendra S.", type: "Wedding Guest" },
              { text: "Stayed in the Premium Room during a weekend getaway. The attention to detail is remarkable. The ivory and maroon decor feels incredibly royal.", author: "Anjali M.", type: "Hotel Guest" },
              { text: "Best venue in Maheshwar region. The catering was exceptional and the management took care of everything so we could just enjoy the engagement.", author: "Vikram P.", type: "Event Host" }
            ].map((review, i) => (
              <div key={i} className="glass-panel p-10 rounded-2xl relative">
                <Quote size={40} className="absolute top-6 right-6 text-[#C9A84C]/10" />
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-[#C9A84C] text-[#C9A84C]" />)}
                </div>
                <p className="font-sans text-base text-[#FAF7F2]/80 leading-relaxed mb-8 italic">"{review.text}"</p>
                <div>
                  <h4 className="font-sans font-semibold text-[#FAF7F2] uppercase tracking-wider text-sm">{review.author}</h4>
                  <span className="font-sans text-xs text-[#C9A84C]">{review.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 border-t border-[#C9A84C]/10 radial-spotlight">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#FAF7F2] mb-4">Questions & <span className="italic text-[#C9A84C]">Answers</span></h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is the check-in and check-out time?", a: "Standard check-in time is 2:00 PM and check-out is 11:00 AM. Early check-in and late check-out are subject to availability." },
              { q: "Is outside catering allowed for weddings?", a: "We have an excellent in-house catering team that specializes in various cuisines. Outside caterers are permitted only for specific regional specialties with prior approval." },
              { q: "Do you have parking facilities?", a: "Yes, we offer complimentary secure valet parking for all our staying guests and ample parking space for event attendees." },
              { q: "How far is the palace from Maheshwar Fort?", a: "We are located just a 15-minute drive from the historic Maheshwar Fort and the Narmada River Ghats." }
            ].map((faq, i) => (
              <div key={i} className="glass-panel rounded-xl overflow-hidden transition-all duration-300">
                <button 
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-sans text-lg text-[#FAF7F2] pr-8">{faq.q}</span>
                  <div className={\`flex-shrink-0 text-[#C9A84C] transition-transform duration-300 \${openFaq === i ? 'rotate-180' : ''}\`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <div className={\`px-8 overflow-hidden transition-all duration-300 ease-in-out \${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}\`}>
                  <p className="font-sans text-[#FAF7F2]/60 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0508] border-t border-[#C9A84C]/20 pt-24 pb-12 relative overflow-hidden">
        {/* Large BG Text */}
        <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none opacity-5">
          <span className="font-serif text-[15vw] whitespace-nowrap text-[#C9A84C] leading-none">YASHRAJ</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-20">
            <div className="md:col-span-2">
              <div className="flex flex-col mb-8">
                <span className="font-serif text-3xl tracking-widest text-[#FAF7F2] uppercase">Yashraj</span>
                <span className="font-sans text-xs tracking-[0.3em] text-[#C9A84C] uppercase ml-1">Palace</span>
              </div>
              <p className="font-sans text-[#FAF7F2]/60 max-w-sm mb-8 leading-relaxed">
                A premium destination for luxurious stays and grand celebrations in the heart of Nimar.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0508] transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-sans text-sm tracking-[0.2em] text-[#FAF7F2] uppercase mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {['Rooms & Suites', 'Wedding Garden', 'Event Packages', 'Dining', 'Gallery'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="font-sans text-[#FAF7F2]/60 hover:text-[#C9A84C] transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-sm tracking-[0.2em] text-[#FAF7F2] uppercase mb-8">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-[#C9A84C] flex-shrink-0 mt-1" />
                  <span className="font-sans text-[#FAF7F2]/60 text-sm leading-relaxed">Near Maheshwar Fort,<br/>Mandleshwar, MP 451224</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={20} className="text-[#C9A84C] flex-shrink-0" />
                  <span className="font-sans text-[#FAF7F2]/60 text-sm">+91 88270 39565</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail size={20} className="text-[#C9A84C] flex-shrink-0" />
                  <span className="font-sans text-[#FAF7F2]/60 text-sm">bookings@yashrajpalace.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#FAF7F2]/10 font-sans text-xs text-[#FAF7F2]/40 tracking-wider">
            <p>© {new Date().getFullYear()} Yashraj Palace. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#C9A84C]">Privacy Policy</a>
              <a href="#" className="hover:text-[#C9A84C]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
