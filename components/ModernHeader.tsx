'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, Search, Menu, X, User, Sparkles } from 'lucide-react'
import { getCartCount } from '@/lib/storage'

export default function ModernHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    setCartCount(getCartCount())

    const handleCartUpdate = () => setCartCount(getCartCount())
    window.addEventListener('cartUpdated', handleCartUpdate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 via-pink-600 to-purple-600 text-white py-2.5 text-sm font-medium">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2 animate-pulse-slow">
            <Sparkles size={16} className="animate-spin-slow" />
            <span className="hidden sm:inline">🎉 Limited Time Offer:</span>
            <span className="font-bold">FLAT 60% OFF</span>
            <span className="hidden md:inline">on All Products + Free Shipping!</span>
            <Sparkles size={16} className="animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-card shadow-2xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-primary-600 to-pink-600 p-3 rounded-2xl transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-2xl font-bold gradient-text">NAGINA</div>
                <div className="text-xs text-slate-600 font-medium">Premium Auto Care</div>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search for premium accessories..."
                  className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Icon - Mobile */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-3 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Search size={22} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors group"
              >
                <div className="relative">
                  <Heart size={22} className="group-hover:text-primary-600 transition-colors" />
                  <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    0
                  </span>
                </div>
                <span className="hidden xl:inline text-sm font-medium">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative px-4 py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary-600/30 transition-all duration-300 flex items-center gap-2 group"
              >
                <div className="relative">
                  <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-primary-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-semibold">Cart</span>
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-1 mt-6">
            {['Home', 'Shop', 'Categories', 'Deals', 'About'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="px-6 py-2.5 rounded-xl hover:bg-white/50 backdrop-blur-sm font-medium transition-all duration-300 hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 glass-card rounded-2xl p-6 animate-slide-down">
            <nav className="flex flex-col gap-2">
              {['Home', 'Shop', 'Categories', 'Deals', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="px-4 py-3 rounded-xl hover:bg-white/50 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="container-custom pt-20">
            <div className="glass-card rounded-3xl p-6 animate-slide-down">
              <div className="flex items-center gap-4 mb-4">
                <Search className="text-primary-600" size={24} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 bg-transparent focus:outline-none text-lg"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
