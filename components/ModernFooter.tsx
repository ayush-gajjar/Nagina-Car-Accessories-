'use client'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function ModernFooter() {
  return (
    <footer className="relative overflow-hidden mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEY0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      <div className="relative z-10">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-primary-600 to-pink-600 p-3 rounded-2xl">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">NAGINA</div>
                  <div className="text-xs text-slate-400">Premium Auto Care</div>
                </div>
              </div>
              <p className="text-slate-400 mb-6">Your trusted partner for premium car and bike accessories. Quality products, exceptional service.</p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="bg-white/10 hover:bg-primary-600 p-3 rounded-xl transition-all duration-300 group">
                    <Icon size={20} className="text-white" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Shop', 'Categories', 'Deals', 'About Us', 'Contact'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-primary-500 transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                {['Track Order', 'Returns', 'Shipping Info', 'FAQs', 'Privacy Policy'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-primary-500 transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-400">
                  <MapPin size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Sahibabad, Ghaziabad, India</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone size={20} className="text-primary-500 flex-shrink-0" />
                  <span>+91 9069095689</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail size={20} className="text-primary-500 flex-shrink-0" />
                  <span>support@nagina.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm">© 2024 Nagina Premium Auto Accessories. All rights reserved.</p>
              <div className="flex gap-6 text-sm text-slate-400">
                <Link href="#" className="hover:text-primary-500 transition-colors">Terms</Link>
                <Link href="#" className="hover:text-primary-500 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-primary-500 transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
