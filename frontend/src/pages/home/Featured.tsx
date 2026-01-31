import { AuroraText } from '@/components/ui/AuroraText';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';


  const featuredVendors = [
    {
      name: 'Elite Auto Detailing',
      category: 'Auto Services',
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
      specialty: 'Premium Car Detailing',
      responseTime: '< 1 hour'
    },
    {
      name: 'TechFix Solutions',
      category: 'Tech & IT',
      rating: 5.0,
      reviews: 512,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      specialty: 'Device Repair & Setup',
      responseTime: '< 30 min'
    },
    {
      name: 'Glow Studio',
      category: 'Beauty & Wellness',
      rating: 4.8,
      reviews: 389,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      specialty: 'Makeup & Styling',
      responseTime: '< 2 hours'
    },
    {
      name: 'HomeRevive Pro',
      category: 'Home Services',
      rating: 4.9,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      specialty: 'Renovation & Repair',
      responseTime: '< 1 hour'
    }
  ];


const Featured = () => {
  return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                <AuroraText>Top Rated Vendors</AuroraText>
              </h2>
              <p className="text-lg text-slate-600">Handpicked professionals with proven track records</p>
            </div>
            <Link to={"/services"} className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVendors.map((vendor, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {vendor.rating}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{vendor.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{vendor.specialty}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-slate-600">{vendor.reviews} reviews</span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                      {vendor.responseTime}
                    </span>
                  </div>

                  <Link to={"/services"} className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Featured;