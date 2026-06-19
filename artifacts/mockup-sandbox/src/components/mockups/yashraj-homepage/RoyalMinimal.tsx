import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  Star, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Menu, 
  X,
  ChevronDown,
  Wind,
  Wifi,
  Coffee,
  Shield,
  Utensils,
  Car
} from "lucide-react";

export function RoyalMinimal() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-[#FAF7F2] min-h-screen selection:bg-[#6B1A2B] selection:text-[#FAF7F2]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.5), transparent);
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 1. Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 z-50">
            <span className={`font-serif text-2xl font-semibold tracking-tight ${isScrolled ? 'text-[#6B1A2B]' : 'text-[#6B1A2B]'}`}>
              Yashraj Palace
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {['Stay', 'Weddings', 'Events', 'Dining', 'Gallery'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-widest text-gray-800 hover:text-[#C9A84C] transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="bg-[#6B1A2B] text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#521220] transition-colors">
              Reserve
            </button>
          </div>

          <button 
            className="md:hidden z-50 text-[#6B1A2B]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#FAF7F2] z-40 transition-transform duration-500 flex items-center justify-center ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex flex-col items-center space-y-8 text-xl font-serif text-[#6B1A2B]">
            {['Stay', 'Weddings', 'Events', 'Dining', 'Gallery'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#C9A84C] transition-colors">
                {item}
              </a>
            ))}
            <button className="mt-8 border border-[#6B1A2B] px-10 py-3 text-sm uppercase tracking-widest font-sans hover:bg-[#6B1A2B] hover:text-white transition-colors">
              Reserve Now
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#FAF7F2]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6B1A2B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 text-[30rem] font-serif text-[#6B1A2B]/5 leading-none select-none pointer-events-none -translate-x-1/4 translate-y-1/4">Y</div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8 fade-in-up">
            <p className="text-[#C9A84C] uppercase tracking-[0.2em] text-sm font-medium">Maheshwar, Madhya Pradesh</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#6B1A2B] leading-[1.1]">
              Timeless <br />
              <span className="italic font-light">elegance,</span> <br />
              modern luxury.
            </h1>
            <p className="text-gray-600 max-w-lg text-lg leading-relaxed font-light">
              Experience the grandeur of a premium hotel and events venue near the historic Maheshwar Fort. A sanctuary of peace and celebration.
            </p>
          </div>

          <div className="lg:col-span-5 fade-in-up delay-200">
            <div className="bg-white p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#6B1A2B]"></div>
              <h3 className="font-serif text-2xl text-[#6B1A2B] mb-6">Plan your stay</h3>
              
              <div className="space-y-5">
                <div className="border-b border-gray-200 pb-3">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Check in / Check out</label>
                  <div className="flex items-center gap-3 text-gray-800">
                    <Calendar size={18} className="text-[#C9A84C]" />
                    <span className="text-sm font-medium">Select dates</span>
                    <ChevronDown size={16} className="ml-auto text-gray-400" />
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Guests</label>
                  <div className="flex items-center gap-3 text-gray-800">
                    <Users size={18} className="text-[#C9A84C]" />
                    <span className="text-sm font-medium">2 Adults, 1 Room</span>
                    <ChevronDown size={16} className="ml-auto text-gray-400" />
                  </div>
                </div>
                
                <button className="w-full bg-[#6B1A2B] text-white py-4 text-sm uppercase tracking-widest hover:bg-[#521220] transition-colors mt-4 flex items-center justify-center gap-2">
                  Check Availability
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust Bar */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:flex justify-between items-center gap-8 lg:gap-4">
            {[
              { num: "500+", label: "Events Hosted" },
              { num: "4.8", icon: <Star size={16} className="inline text-[#C9A84C] ml-1 fill-[#C9A84C]" />, label: "Guest Rating" },
              { num: "20+", label: "Luxury Rooms" },
              { num: "1000", label: "Guest Capacity" },
              { num: "24/7", label: "Concierge Service", className: "hidden lg:block" }
            ].map((stat, i) => (
              <div key={i} className={`text-center ${stat.className || ''}`}>
                <div className="font-serif text-3xl text-[#6B1A2B] mb-1">
                  {stat.num}{stat.icon}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Rooms */}
      <section id="stay" className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <p className="text-[#C9A84C] uppercase tracking-[0.2em] text-sm font-medium mb-3">Accommodations</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#6B1A2B]">Rest in luxury</h2>
          </div>
          <button className="text-sm uppercase tracking-widest text-gray-800 border-b border-[#6B1A2B] pb-1 hover:text-[#6B1A2B] transition-colors">
            View all rooms
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-8 pb-8 snap-x snap-mandatory">
            {[
              { name: "Executive Suite", price: "4,500", img: "bg-[url('https://images.unsplash.com/photo-1590490360182-c33d5773342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')]", size: "450 sq ft", bed: "King Bed" },
              { name: "Premium Room", price: "2,800", img: "bg-[url('https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')]", size: "320 sq ft", bed: "Queen Bed" },
              { name: "Deluxe Room", price: "1,800", img: "bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')]", size: "280 sq ft", bed: "Twin Beds" }
            ].map((room, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-start group cursor-pointer bg-white border border-gray-100 p-4 transition-transform hover:-translate-y-1">
                <div className={`h-64 w-full bg-cover bg-center mb-6 ${room.img}`}></div>
                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl text-gray-900 group-hover:text-[#6B1A2B] transition-colors">{room.name}</h3>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500 mb-6 font-light">
                    <span>{room.size}</span>
                    <span>•</span>
                    <span>{room.bed}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">From</span>
                      <span className="font-serif text-xl text-[#6B1A2B]">₹{room.price}</span>
                      <span className="text-sm text-gray-500"> / night</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#6B1A2B] group-hover:bg-[#6B1A2B] group-hover:text-white transition-all">
                      <ChevronRight size={18} strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Wedding Section */}
      <section id="weddings" className="py-24 bg-white overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="font-serif text-[12rem] leading-none text-[#6B1A2B]/5 absolute -top-20 -left-10 select-none">1000</div>
              <div className="relative z-10 pt-10">
                <p className="text-[#C9A84C] uppercase tracking-[0.2em] text-sm font-medium mb-4">The Grand Garden</p>
                <h2 className="font-serif text-4xl md:text-5xl text-[#6B1A2B] mb-8 leading-tight">
                  A canvas for your <br />
                  <span className="italic">grandest</span> celebrations.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed font-light mb-10 max-w-md">
                  Our expansive wedding garden accommodates over 1,000 guests, offering a majestic setting under the stars. Perfectly manicured landscapes meet impeccable service for a day you'll never forget.
                </p>
                <button className="border-b border-[#6B1A2B] pb-1 text-sm uppercase tracking-widest text-[#6B1A2B] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors inline-flex items-center gap-2">
                  Explore Venues <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {[
                { label: "Lush Lawns", desc: "Manicured green spaces for outdoor ceremonies" },
                { label: "Bridal Suites", desc: "Luxurious preparation rooms for the bridal party" },
                { label: "Catering", desc: "Exquisite culinary experiences tailored to you" },
                { label: "Decor", desc: "Preferred vendor list for premium aesthetics" }
              ].map((feature, i) => (
                <div key={i}>
                  <div className="w-8 h-[1px] bg-[#C9A84C] mb-4"></div>
                  <h4 className="font-serif text-xl text-[#6B1A2B] mb-2">{feature.label}</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-[#6B1A2B]">The Yashraj Standard</h2>
            <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: <Wind size={24} strokeWidth={1} />, label: "AC Rooms" },
              { icon: <Wifi size={24} strokeWidth={1} />, label: "Free Wi-Fi" },
              { icon: <Coffee size={24} strokeWidth={1} />, label: "Room Service" },
              { icon: <Shield size={24} strokeWidth={1} />, label: "24/7 Security" },
              { icon: <Utensils size={24} strokeWidth={1} />, label: "Fine Dining" },
              { icon: <Car size={24} strokeWidth={1} />, label: "Valet Parking" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#6B1A2B] mb-4 group-hover:bg-[#6B1A2B] group-hover:text-white group-hover:border-[#6B1A2B] transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-sm uppercase tracking-widest text-gray-600 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Event Types */}
      <section id="events" className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-[#6B1A2B] mb-12">Spaces for every occasion</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Weddings', 'Receptions', 'Corporate Retreats', 'Birthdays', 'Anniversaries', 'Pre-wedding Shoots', 'Exhibitions', 'Cultural Events'].map((type, i) => (
              <span key={i} className="px-6 py-3 border border-gray-200 text-sm tracking-wide text-gray-700 hover:border-[#6B1A2B] hover:text-[#6B1A2B] cursor-pointer transition-colors">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Packages */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C9A84C] uppercase tracking-[0.2em] text-sm font-medium mb-4">Curated Experiences</p>
            <h2 className="font-serif text-4xl text-[#6B1A2B]">Event Packages</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Silver", desc: "Perfect for intimate gatherings", price: "Consultation", features: ["Venue Access (8 hours)", "Basic Lighting & Sound", "Standard Decor Setup", "Dedicated Coordinator"] },
              { name: "Gold", desc: "Our most popular wedding choice", price: "Consultation", features: ["Venue Access (12 hours)", "Premium Lighting Setup", "Floral Decor Options", "Catering Service Access", "2 Complimentary Rooms"], featured: true },
              { name: "Platinum", desc: "The ultimate luxury experience", price: "Consultation", features: ["Full Property Access (24h)", "Luxury Decor Package", "Premium Catering Integration", "Valet Service", "Bridal Suite + 4 Rooms"] }
            ].map((pkg, i) => (
              <div key={i} className={`bg-white p-10 flex flex-col relative ${pkg.featured ? 'border border-[#C9A84C] shadow-lg -translate-y-4' : 'border border-gray-100'}`}>
                {pkg.featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C9A84C] text-white text-xs uppercase tracking-widest px-4 py-1">Signature</div>}
                
                <h3 className="font-serif text-2xl text-[#6B1A2B] mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-500 font-light mb-8">{pkg.desc}</p>
                
                <div className="text-xl font-serif text-gray-900 mb-8 border-b border-gray-100 pb-8">{pkg.price}</div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                      <Check size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 text-sm uppercase tracking-widest transition-colors ${pkg.featured ? 'bg-[#6B1A2B] text-white hover:bg-[#521220]' : 'border border-[#6B1A2B] text-[#6B1A2B] hover:bg-[#FAF7F2]'}`}>
                  Enquire Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Reviews */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="text-[#C9A84C] flex justify-center gap-1 mb-8">
            {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-[#C9A84C]" />)}
          </div>
          <p className="font-serif text-2xl md:text-4xl text-[#6B1A2B] leading-relaxed italic mb-10">
            "We hosted our daughter's wedding here. The garden was breathtaking, and the rooms were immaculate. It truly felt like living in a palace for those three days. Exceptional hospitality."
          </p>
          <div className="uppercase tracking-widest text-sm text-gray-500 font-medium">
            — Rajesh Sharma, Mumbai
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-[#6B1A2B] text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="space-y-0 border-t border-[#6B1A2B]/20">
            {[
              { q: "What is the capacity of the wedding garden?", a: "Our expansive wedding garden can comfortably host over 1,000 guests, making it ideal for grand weddings and large-scale events." },
              { q: "Do you have in-house catering services?", a: "Yes, we offer premium in-house catering with a diverse menu ranging from traditional Indian cuisine to continental options, fully customizable to your preferences." },
              { q: "Are outside decorators allowed?", a: "We have a curated list of premium empaneled decorators who understand our venue best, but we are open to discussing outside decorators subject to specific terms." },
              { q: "What are the check-in and check-out timings for rooms?", a: "Standard check-in time is 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be requested and is subject to availability." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#6B1A2B]/20">
                <button 
                  className="w-full text-left py-6 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-serif text-lg text-gray-900">{faq.q}</span>
                  <ChevronDown size={20} className={`text-[#C9A84C] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 font-light leading-relaxed pr-8">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <h3 className="font-serif text-2xl text-[#6B1A2B] mb-6">Yashraj Palace</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
                A premium destination for stays, weddings, and events in the heart of Madhya Pradesh.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-[#C9A84C] transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-[#C9A84C] transition-colors"><Facebook size={20} /></a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-900 font-medium mb-6">Contact</h4>
                <ul className="space-y-4 text-sm text-gray-500 font-light">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 text-[#C9A84C] flex-shrink-0" />
                    <span>Near Maheshwar Fort, Madhya Pradesh, India</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={16} className="text-[#C9A84C]" />
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={16} className="text-[#C9A84C]" />
                    <span>reservations@yashrajpalace.com</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-900 font-medium mb-6">Explore</h4>
                <ul className="space-y-3 text-sm text-gray-500 font-light">
                  <li><a href="#" className="hover:text-[#6B1A2B] transition-colors">Our Rooms</a></li>
                  <li><a href="#" className="hover:text-[#6B1A2B] transition-colors">Weddings</a></li>
                  <li><a href="#" className="hover:text-[#6B1A2B] transition-colors">Events</a></li>
                  <li><a href="#" className="hover:text-[#6B1A2B] transition-colors">Dining</a></li>
                  <li><a href="#" className="hover:text-[#6B1A2B] transition-colors">Gallery</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-900 font-medium mb-6">Legal</h4>
                <ul className="space-y-3 text-sm text-gray-500 font-light">
                  <li><a href="#" className="hover:text-[#6B1A2B] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#6B1A2B] transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#6B1A2B] transition-colors">Cancellation Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-light">
            <p>&copy; {new Date().getFullYear()} Yashraj Palace. All rights reserved.</p>
            <p>Designed with restraint.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
