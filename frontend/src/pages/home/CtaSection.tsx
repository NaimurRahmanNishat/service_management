import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const CtaSection = () => {
  return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-purple-600 rounded-3xl p-12 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust ServiceHub for their service needs
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={"/contact"} className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
                  Find a Vendor
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300">
                  Become a Vendor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CtaSection;