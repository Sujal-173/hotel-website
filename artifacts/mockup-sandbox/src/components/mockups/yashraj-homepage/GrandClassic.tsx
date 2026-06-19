import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Users, Star, ChevronDown, Check, ArrowRight, Quote, Plus, Minus, Search, Menu, X, Facebook, Instagram, Twitter, Utensils, Music, Wine, Gift, Clock, ShieldCheck, Heart, Crown } from 'lucide-react';

export function GrandClassic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-stone-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .bg-maroon { background-color: #6B1A2B; }
        .text-maroon { color: #6B1A2B; }
        .border-maroon { border-color: #6B1A2B; }
        
        .bg-gold { background-color: #C9A84C; }
        .text-gold { color: #C9A84C; }
        .border-gold { border-color: #C9A84C; }
        
        .bg-ivory { background-color: #FAF7F2; }
        .text-ivory { color: #FAF7F2; }
        
        .ornamental-border {
          position: relative;
          border: 1px solid #C9A84C;
          padding: 2rem;
        }
        .ornamental-border::before, .ornamental-border::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #C9A84C;
        }
        .ornamental-border::before {
          top: -4px; left: -4px;
          border-right: none; border-bottom: none;
        }
        .ornamental-border::after {
          bottom: -4px; right: -4px;
          border-left: none; border-top: none;
        }
        
        .divider-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem 0;
        }
        .divider-ornament::before, .divider-ornament::after {
          content: '';
          height: 1px;
          background: #C9A84C;
          flex-grow: 1;
          max-width: 100px;
        }
        .divider-ornament svg {
          margin: 0 1rem;
          color: #C9A84C;
        }
        
        .hover-gold:hover {
          color: #C9A84C;
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Top Strip */}
      <div className="bg-maroon text-ivory text-sm py-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center hidden md:flex">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><Phone size={14} className="mr-2 text-gold" /> +91 98765 43210</span>
          <span className="flex items-center"><Mail size={14} className="mr-2 text-gold" /> bookings@yashrajpalace.com</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center"><MapPin size={14} className="mr-2 text-gold" /> Near Maheshwar Fort, MP</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-gold/30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl md:text-3xl text-maroon font-bold tracking-wide">YASHRAJ PALACE</h1>
            <span className="text-gold text-xs tracking-[0.2em] uppercase mt-1">Heritage Meets Luxury</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-stone-700 hover:text-maroon font-medium uppercase tracking-wider text-sm transition-colors">Stay</a>
            <a href="#" className="text-stone-700 hover:text-maroon font-medium uppercase tracking-wider text-sm transition-colors">Weddings</a>
            <a href="#" className="text-stone-700 hover:text-maroon font-medium uppercase tracking-wider text-sm transition-colors">Events</a>
            <a href="#" className="text-stone-700 hover:text-maroon font-medium uppercase tracking-wider text-sm transition-colors">Dining</a>
            <a href="#" className="text-stone-700 hover:text-maroon font-medium uppercase tracking-wider text-sm transition-colors">Gallery</a>
          </div>
          
          <div className="hidden lg:block">
            <button className="bg-maroon hover:bg-[#8A243A] text-ivory px-6 py-3 uppercase tracking-wider text-sm font-medium transition-colors border border-maroon">
              Book Room
            </button>
          </div>

          <button className="lg:hidden text-maroon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-ivory border-b border-gold/30 p-4 flex flex-col space-y-4 shadow-lg">
            <a href="#" className="text-stone-700 font-medium p-2 border-b border-stone-200">Stay</a>
            <a href="#" className="text-stone-700 font-medium p-2 border-b border-stone-200">Weddings</a>
            <a href="#" className="text-stone-700 font-medium p-2 border-b border-stone-200">Events</a>
            <a href="#" className="text-stone-700 font-medium p-2 border-b border-stone-200">Dining</a>
            <a href="#" className="text-stone-700 font-medium p-2 border-b border-stone-200">Gallery</a>
            <button className="bg-maroon text-ivory px-6 py-3 uppercase tracking-wider text-sm font-medium mt-4">
              Book Room
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d142104d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-ivory pt-16 lg:pt-0">
            <div className="border border-gold/40 p-8 md:p-12 relative backdrop-blur-sm bg-maroon/30">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold -translate-x-2 -translate-y-2"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold translate-x-2 -translate-y-2"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold -translate-x-2 translate-y-2"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold translate-x-2 translate-y-2"></div>
              
              <div className="flex items-center mb-6">
                <span className="h-px bg-gold w-12 mr-4"></span>
                <span className="text-gold uppercase tracking-widest text-sm font-medium">Welcome to Royalty</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
                A Palace for Grand Stays & Grander Celebrations
              </h2>
              <p className="text-lg md:text-xl text-ivory/80 mb-8 font-light leading-relaxed">
                Experience the timeless elegance of royal heritage combined with modern luxury at Maheshwar's premier estate.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gold text-maroon hover:bg-ivory px-8 py-4 uppercase tracking-wider text-sm font-semibold transition-colors">
                  Explore Rooms
                </button>
                <button className="border border-gold text-gold hover:bg-gold/10 px-8 py-4 uppercase tracking-wider text-sm font-semibold transition-colors">
                  Plan a Wedding
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-md mx-auto lg:ml-auto">
            <div className="bg-ivory p-8 rounded-sm shadow-2xl relative border border-gold/20">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl text-maroon">Reserve Your Stay</h3>
                <div className="divider-ornament !my-4"><Crown size={16} /></div>
              </div>
              
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-stone-500 font-medium">Check-in</label>
                    <div className="flex items-center border-b border-stone-300 pb-2">
                      <Calendar size={18} className="text-gold mr-2" />
                      <input type="date" className="w-full bg-transparent outline-none text-stone-800" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-stone-500 font-medium">Check-out</label>
                    <div className="flex items-center border-b border-stone-300 pb-2">
                      <Calendar size={18} className="text-gold mr-2" />
                      <input type="date" className="w-full bg-transparent outline-none text-stone-800" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-stone-500 font-medium">Guests</label>
                  <div className="flex items-center border-b border-stone-300 pb-2">
                    <Users size={18} className="text-gold mr-2" />
                    <select className="w-full bg-transparent outline-none text-stone-800 appearance-none">
                      <option>2 Adults, 1 Room</option>
                      <option>2 Adults, 1 Child</option>
                      <option>4 Adults, 2 Rooms</option>
                    </select>
                    <ChevronDown size={16} className="text-stone-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-stone-500 font-medium">Room Type</label>
                  <div className="flex items-center border-b border-stone-300 pb-2">
                    <Heart size={18} className="text-gold mr-2" />
                    <select className="w-full bg-transparent outline-none text-stone-800 appearance-none">
                      <option>Deluxe Room (₹1,800)</option>
                      <option>Premium Room (₹2,500)</option>
                      <option>Family Suite (₹3,800)</option>
                    </select>
                    <ChevronDown size={16} className="text-stone-400" />
                  </div>
                </div>
                
                <button className="w-full bg-maroon text-ivory py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#8A243A] transition-colors mt-6 flex items-center justify-center">
                  Check Availability <ArrowRight size={16} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-ivory border-y border-gold/30 py-8 relative z-20 -mt-10 mx-4 md:mx-12 lg:mx-24 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-3">
                <Star className="text-gold" size={20} fill="currentColor" />
              </div>
              <span className="font-serif text-maroon font-bold text-lg">4.8/5</span>
              <span className="text-xs text-stone-500 uppercase tracking-wide">Guest Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-3">
                <Users className="text-gold" size={20} />
              </div>
              <span className="font-serif text-maroon font-bold text-lg">1,000+</span>
              <span className="text-xs text-stone-500 uppercase tracking-wide">Wedding Capacity</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-3">
                <Music className="text-gold" size={20} />
              </div>
              <span className="font-serif text-maroon font-bold text-lg">500+</span>
              <span className="text-xs text-stone-500 uppercase tracking-wide">Events Hosted</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-3">
                <Utensils className="text-gold" size={20} />
              </div>
              <span className="font-serif text-maroon font-bold text-lg">Pure Veg</span>
              <span className="text-xs text-stone-500 uppercase tracking-wide">Royal Dining</span>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-3">
                <MapPin className="text-gold" size={20} />
              </div>
              <span className="font-serif text-maroon font-bold text-lg">Prime</span>
              <span className="text-xs text-stone-500 uppercase tracking-wide">Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <section className="py-20 container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-gold uppercase tracking-widest text-sm font-semibold">Accommodation</span>
          <h2 className="font-serif text-4xl md:text-5xl text-maroon mt-4 mb-4">Royal Chambers</h2>
          <div className="divider-ornament"><Crown size={24} /></div>
          <p className="text-stone-600">Rest in the lap of luxury. Each room is meticulously designed with heritage aesthetics and modern comforts.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Deluxe Room', price: '1,800', size: '250 sq.ft', bed: 'Queen Bed', img: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=800&auto=format&fit=crop' },
            { name: 'Premium Room', price: '2,500', size: '350 sq.ft', bed: 'King Bed', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop' },
            { name: 'Family Suite', price: '3,800', size: '550 sq.ft', bed: '2 King Beds', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop' },
          ].map((room, i) => (
            <div key={i} className="group bg-white border border-stone-200 overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
              <div className="absolute top-4 right-4 bg-maroon text-ivory text-sm font-serif px-3 py-1 z-10 shadow-md">
                ₹{room.price} / night
              </div>
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-maroon/20 group-hover:bg-transparent transition-colors z-0"></div>
                <img src={room.img} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 relative">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold mt-2 ml-2"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold mt-2 mr-2"></div>
                
                <h3 className="font-serif text-2xl text-maroon mb-2">{room.name}</h3>
                <div className="flex gap-4 text-sm text-stone-500 mb-6 pb-6 border-b border-stone-100">
                  <span className="flex items-center"><MapPin size={14} className="mr-1 text-gold" /> {room.size}</span>
                  <span className="flex items-center"><Heart size={14} className="mr-1 text-gold" /> {room.bed}</span>
                </div>
                <ul className="space-y-2 mb-8 text-sm text-stone-600">
                  <li className="flex items-center"><Check size={14} className="text-gold mr-2" /> Complimentary Breakfast</li>
                  <li className="flex items-center"><Check size={14} className="text-gold mr-2" /> Free Wi-Fi</li>
                  <li className="flex items-center"><Check size={14} className="text-gold mr-2" /> 24/7 Room Service</li>
                </ul>
                <button className="w-full border border-maroon text-maroon py-3 uppercase tracking-wider text-xs font-semibold group-hover:bg-maroon group-hover:text-ivory transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wedding Section */}
      <section className="bg-maroon text-ivory relative py-24 overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative p-4 border-2 border-gold/40">
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-maroon border border-gold transform rotate-45"></div>
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-maroon border border-gold transform rotate-45"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-maroon border border-gold transform rotate-45"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-maroon border border-gold transform rotate-45"></div>
                
                <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop" alt="Royal Indian Wedding" className="w-full h-[500px] object-cover" />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <span className="text-gold uppercase tracking-widest text-sm font-semibold">Grand Celebrations</span>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 leading-tight">The Perfect Setting for Your Royal Wedding</h2>
              <div className="w-24 h-1 bg-gold mb-8"></div>
              
              <p className="text-ivory/80 text-lg mb-8 font-light leading-relaxed">
                Our magnificent wedding garden and regal banquet halls provide a breathtaking backdrop for your special day. From intimate ceremonies to grand receptions, we bring your dream wedding to life with unparalleled hospitality.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="flex items-start">
                  <div className="bg-gold/20 p-3 rounded-sm mr-4">
                    <Users className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1">1000+ Guests</h4>
                    <p className="text-sm text-ivory/60">Sprawling lush lawns</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold/20 p-3 rounded-sm mr-4">
                    <Utensils className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1">Royal Catering</h4>
                    <p className="text-sm text-ivory/60">Authentic vegetarian feasts</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold/20 p-3 rounded-sm mr-4">
                    <ShieldCheck className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1">Event Planning</h4>
                    <p className="text-sm text-ivory/60">End-to-end management</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold/20 p-3 rounded-sm mr-4">
                    <Heart className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1">Bridal Suites</h4>
                    <p className="text-sm text-ivory/60">Dedicated luxury spaces</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-gold text-maroon hover:bg-ivory px-8 py-4 uppercase tracking-wider text-sm font-semibold transition-colors shadow-lg">
                Download Wedding Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 container mx-auto px-4 md:px-8 bg-ivory">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-sm font-semibold">The Yashraj Experience</span>
          <h2 className="font-serif text-4xl md:text-5xl text-maroon mt-4 mb-4">Why Choose Us</h2>
          <div className="divider-ornament"><Star size={24} /></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Crown size={32} />, title: 'Heritage Architecture', desc: 'Inspired by traditional Indian havelis with intricate carvings and stately pillars.' },
            { icon: <MapPin size={32} />, title: 'Prime Location', desc: 'Conveniently located near Maheshwar Fort, easily accessible for all your guests.' },
            { icon: <Utensils size={32} />, title: 'Culinary Excellence', desc: 'Our master chefs prepare exquisite pure vegetarian delicacies for every occasion.' },
            { icon: <ShieldCheck size={32} />, title: 'Impeccable Service', desc: 'Warm Indian hospitality where every guest is treated like royalty.' },
            { icon: <Users size={32} />, title: 'Vast Spaces', desc: 'Multiple venues including grand lawns and AC banquet halls for any size of gathering.' },
            { icon: <Heart size={32} />, title: 'Custom Packages', desc: 'Tailor-made solutions to fit your specific event requirements and budget.' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 border border-stone-200 text-center hover:border-gold transition-colors duration-300 relative group">
              <div className="w-16 h-16 mx-auto bg-stone-50 rounded-full flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-maroon transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl text-maroon mb-3">{item.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-stone-50 border-t border-stone-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm font-semibold">Event Pricing</span>
            <h2 className="font-serif text-4xl md:text-5xl text-maroon mt-4 mb-4">Curated Packages</h2>
            <div className="divider-ornament"><Gift size={24} /></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
            {/* Standard Package */}
            <div className="bg-white p-8 border border-stone-200 w-full lg:w-1/3 text-center shadow-sm">
              <h3 className="font-serif text-2xl text-maroon mb-2">Classic Event</h3>
              <p className="text-sm text-stone-500 mb-6">For intimate gatherings</p>
              <div className="text-3xl font-serif text-maroon mb-6">₹45,000<span className="text-sm font-sans text-stone-500 font-normal"> / start</span></div>
              <div className="h-px w-full bg-stone-100 mb-6"></div>
              <ul className="text-sm text-stone-600 space-y-4 mb-8 text-left">
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> AC Banquet Hall Access</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Up to 200 Guests</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Standard Decoration</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Basic Catering (Veg)</li>
              </ul>
              <button className="w-full border border-maroon text-maroon py-3 uppercase tracking-wider text-xs font-semibold hover:bg-maroon hover:text-ivory transition-colors">
                Enquire Now
              </button>
            </div>

            {/* Premium Package */}
            <div className="bg-maroon text-ivory p-10 border-2 border-gold w-full lg:w-1/3 text-center shadow-2xl relative transform lg:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-maroon px-4 py-1 text-xs uppercase tracking-widest font-bold">
                Most Popular
              </div>
              <h3 className="font-serif text-3xl mb-2">Royal Wedding</h3>
              <p className="text-sm text-ivory/70 mb-6">The grand celebration</p>
              <div className="text-4xl font-serif text-gold mb-6">₹1,80,000<span className="text-sm font-sans text-ivory/70 font-normal"> / start</span></div>
              <div className="h-px w-full bg-gold/30 mb-6"></div>
              <ul className="text-sm text-ivory/90 space-y-4 mb-8 text-left">
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Grand Lawn + Banquet</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Up to 1000 Guests</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Premium Theme Decor</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Royal Feast Menu</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> 2 Bridal Suites Included</li>
              </ul>
              <button className="w-full bg-gold text-maroon py-4 uppercase tracking-wider text-sm font-bold hover:bg-ivory transition-colors">
                Book Package
              </button>
            </div>

            {/* Corporate Package */}
            <div className="bg-white p-8 border border-stone-200 w-full lg:w-1/3 text-center shadow-sm">
              <h3 className="font-serif text-2xl text-maroon mb-2">Corporate Meet</h3>
              <p className="text-sm text-stone-500 mb-6">Professional excellence</p>
              <div className="text-3xl font-serif text-maroon mb-6">₹25,000<span className="text-sm font-sans text-stone-500 font-normal"> / start</span></div>
              <div className="h-px w-full bg-stone-100 mb-6"></div>
              <ul className="text-sm text-stone-600 space-y-4 mb-8 text-left">
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Executive Conference Room</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> Up to 100 Guests</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> High-Tea & Snacks</li>
                <li className="flex items-start"><Check size={16} className="text-gold mr-2 mt-0.5 shrink-0" /> AV Equipment Included</li>
              </ul>
              <button className="w-full border border-maroon text-maroon py-3 uppercase tracking-wider text-xs font-semibold hover:bg-maroon hover:text-ivory transition-colors">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm font-semibold">Guest Book</span>
            <h2 className="font-serif text-4xl md:text-5xl text-maroon mt-4 mb-4">Royal Testimonials</h2>
            <div className="divider-ornament"><Quote size={24} /></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "We hosted our daughter's wedding here. The arrangements were grand, food was excellent, and the staff treated us like family. Truly a memorable experience.", author: "Rajesh Sharma", role: "Wedding Guest" },
              { text: "A beautiful property with heritage vibes. The rooms are spacious and very well maintained. Perfect place for a weekend getaway near Maheshwar.", author: "Priya Patel", role: "Hotel Guest" },
              { text: "The grand lawn is massive and perfect for large gatherings. Their event management team took care of every single detail flawlessly.", author: "Amit Verma", role: "Corporate Client" }
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 relative border-t-4 border-gold shadow-md">
                <Quote size={40} className="text-gold/20 absolute top-4 right-4" />
                <div className="flex text-gold mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-stone-600 mb-6 italic leading-relaxed text-sm">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center text-ivory font-serif text-xl mr-3">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-maroon text-sm">{review.author}</h4>
                    <span className="text-xs text-stone-500 uppercase">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-maroon mb-4">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is the capacity of your wedding garden?", a: "Our grand wedding lawn can comfortably accommodate up to 1,000+ guests, making it ideal for large weddings and receptions. We also have smaller banquet halls for intimate ceremonies of 100-200 guests." },
              { q: "Do you provide catering services?", a: "Yes, we have an expert in-house culinary team that provides premium pure vegetarian catering services. We offer custom menus ranging from traditional Indian to continental cuisines." },
              { q: "Can we bring our own decorators?", a: "While we have our own empanelled premium decorators who understand the venue best, you are welcome to bring your own decorators subject to our management's approval and guidelines." },
              { q: "Are rooms included in the wedding packages?", a: "Our premium wedding packages typically include 2 complimentary bridal suites. Additional rooms can be booked at a special discounted tariff for your guests." }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-stone-200 overflow-hidden">
                <button 
                  className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="font-serif text-lg text-maroon">{faq.q}</span>
                  {openFaq === i ? <Minus className="text-gold" size={20} /> : <Plus className="text-gold" size={20} />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-stone-300 pt-20 pb-10 border-t-4 border-maroon">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h2 className="font-serif text-2xl text-ivory mb-2">YASHRAJ PALACE</h2>
              <p className="text-gold text-xs uppercase tracking-widest mb-6">Heritage Meets Luxury</p>
              <p className="text-sm text-stone-400 mb-6 leading-relaxed">
                A premium destination for royal stays and grand celebrations, bringing traditional Indian hospitality to modern luxury.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full border border-stone-600 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-maroon transition-all"><Facebook size={14} /></a>
                <a href="#" className="w-8 h-8 rounded-full border border-stone-600 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-maroon transition-all"><Instagram size={14} /></a>
                <a href="#" className="w-8 h-8 rounded-full border border-stone-600 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-maroon transition-all"><Twitter size={14} /></a>
              </div>
            </div>
            
            <div>
              <h3 className="text-ivory font-serif text-lg mb-6 flex items-center"><span className="w-4 h-px bg-gold mr-2"></span> Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors">Our Rooms</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Wedding Venues</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Corporate Events</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Dining</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Gallery</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-ivory font-serif text-lg mb-6 flex items-center"><span className="w-4 h-px bg-gold mr-2"></span> Information</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Cancellation Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-ivory font-serif text-lg mb-6 flex items-center"><span className="w-4 h-px bg-gold mr-2"></span> Contact Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <MapPin className="text-gold mr-3 mt-1 shrink-0" size={16} />
                  <span>Yashraj Palace, Near Maheshwar Fort, Madhya Pradesh, India</span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-gold mr-3 shrink-0" size={16} />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <Mail className="text-gold mr-3 shrink-0" size={16} />
                  <span>bookings@yashrajpalace.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
            <p>&copy; {new Date().getFullYear()} Yashraj Palace. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed with regal elegance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
