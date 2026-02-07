'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, SlidersHorizontal, Grid3x3, LayoutList, Star, Heart } from 'lucide-react'
import { products, categories } from '@/data/products'
import { addToCart, addToWishlist } from '@/lib/storage'
import { showToast } from '@/components/Toast'

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort products
  let filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || p.category === categories.find(c => c.slug === selectedCategory)?.name
    const matchesPrice = p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort
  filteredProducts = filteredProducts.sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.salePrice - b.salePrice
      case 'price-high': return b.salePrice - a.salePrice
      case 'rating': return b.rating - a.rating
      case 'newest': return b.id.localeCompare(a.id)
      default: return b.featured ? 1 : -1
    }
  })

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4"><span className="gradient-text">Shop</span> All Products</h1>
          <p className="text-xl text-slate-600">Discover {products.length}+ premium auto accessories</p>
        </div>

        {/* Filters Bar */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                <LayoutList size={20} />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> results
            </p>
            <button className="text-sm text-primary-600 hover:underline">Clear filters</button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredProducts.map(product => (
            <div key={product.id} className={viewMode === 'grid' ? 'product-card' : 'glass-card rounded-2xl p-4 flex gap-4'}>
              {product.badge && (
                <div className="absolute top-4 left-4 z-10"><span className="badge badge-primary">{product.badge}</span></div>
              )}
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-primary-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm">-{product.discount}%</div>
              )}
              
              <div className={viewMode === 'grid' ? 'relative aspect-square overflow-hidden' : 'relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl'}>
                <Image src={product.image} alt={product.name} fill className={viewMode === 'grid' ? 'product-card-image' : 'object-contain p-2'} />
              </div>
              
              <div className={viewMode === 'grid' ? 'p-6' : 'flex-1'}>
                <p className="text-xs text-primary-600 font-semibold mb-2 uppercase">{product.category}</p>
                <h3 className="font-bold text-lg mb-3 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary-600">₹{product.salePrice}</span>
                  <span className="text-sm text-slate-400 line-through">₹{product.price}</span>
                </div>
                <button onClick={() => { addToCart(product); showToast('Added to cart!', 'success') }} className="w-full bg-gradient-to-r from-primary-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-slate-400 mb-2">No products found</p>
            <p className="text-slate-600">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
