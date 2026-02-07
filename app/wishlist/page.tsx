'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Trash2, Star, Share2, Eye, ArrowLeft, Package } from 'lucide-react'
import { getWishlist, removeFromWishlist, isInWishlist, addToCart } from '@/lib/storage'
import { showToast } from '@/components/Toast'
import { products } from '@/data/products'

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setWishlistIds(getWishlist())
    setLoading(false)

    const handleWishlistUpdate = () => {
      setWishlistIds(getWishlist())
    }

    window.addEventListener('wishlistUpdated', handleWishlistUpdate)
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
  }, [])

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id))

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId)
    setWishlistIds(getWishlist())
    showToast('Removed from wishlist', 'info')
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
    showToast('Added to cart!', 'success')
  }

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(product => {
      if (product.inStock) {
        addToCart(product)
      }
    })
    showToast(`${wishlistProducts.filter(p => p.inStock).length} items added to cart!`, 'success')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist - Nagina Auto',
        text: 'Check out my wishlist!',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast('Wishlist link copied!', 'success')
    }
  }

  if (loading) {
    return (
      <div className="section">
        <div className="container-custom flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-12">
              <div className="bg-gradient-to-br from-pink-100 to-red-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart size={64} className="text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
              <p className="text-slate-600 mb-8 text-lg">Save items you love to your wishlist and buy them later!</p>
              <Link href="/shop" className="btn-premium inline-block">
                <ShoppingCart size={20} className="mr-2 inline" />
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span>/</span>
              <span className="text-slate-900">Wishlist</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">My Wishlist</span>
            </h1>
            <p className="text-slate-600">{wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved</p>
          </div>
          
          <div className="flex gap-3">
            <button onClick={handleShare} className="btn-ghost">
              <Share2 size={20} className="mr-2" />
              Share Wishlist
            </button>
            {wishlistProducts.some(p => p.inStock) && (
              <button onClick={handleAddAllToCart} className="btn-premium">
                <ShoppingCart size={20} className="mr-2" />
                Add All to Cart
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <Package size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{wishlistProducts.length}</p>
                <p className="text-sm text-slate-600">Total Items</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <ShoppingCart size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{wishlistProducts.filter(p => p.inStock).length}</p>
                <p className="text-sm text-slate-600">In Stock</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <Star size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{wishlistProducts.filter(p => p.featured).length}</p>
                <p className="text-sm text-slate-600">Featured</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 text-red-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{wishlistProducts.reduce((sum, p) => sum + p.salePrice, 0).toLocaleString()}</p>
                <p className="text-sm text-slate-600">Total Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="product-card relative">
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(product.id)}
                className="absolute top-4 right-4 z-10 bg-white hover:bg-red-50 text-red-600 p-3 rounded-xl shadow-lg transition-all hover:scale-110"
              >
                <Trash2 size={20} />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.badge && (
                  <span className="badge badge-primary">{product.badge}</span>
                )}
                {product.discount > 0 && (
                  <span className="bg-primary-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm">
                    -{product.discount}%
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-slate-900 text-white px-3 py-1.5 rounded-xl font-bold text-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product Image */}
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="product-card-image"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-xs text-primary-600 font-semibold mb-2 uppercase">{product.category}</p>
                
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{product.salePrice.toLocaleString()}
                  </span>
                  {product.salePrice < product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {product.inStock ? (
                    <>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-primary-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                      <Link
                        href={`/product/${product.slug}`}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-xl transition-colors"
                      >
                        <Eye size={20} />
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={`/product/${product.slug}`}
                      className="flex-1 bg-slate-200 text-slate-600 text-center py-3 rounded-xl font-semibold cursor-not-allowed"
                    >
                      Out of Stock
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link href="/shop" className="btn-outline inline-flex items-center">
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
