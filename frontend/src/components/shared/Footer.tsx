// src/components/shared/Footer.tsx
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center transform rotate-3">
                  <Zap className="w-5 h-5 text-white transform -rotate-3" />
                </div>
                <span className="text-2xl font-bold text-white">Zenmo</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Connecting customers with trusted vendors who deliver premium services using their own quality products.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <Link 
                    key={social}
                    to="#" 
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                {['Browse All', 'Top Rated', 'New Vendors', 'Categories'].map((item) => (
                  <li key={item}>
                    <Link to="#" className="hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link to="#" className="hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Safety', 'Terms', 'Privacy'].map((item) => (
                  <li key={item}>
                    <Link to="#" className="hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              <span>&copy; {new Date().getFullYear()}</span> Zenmo. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer;