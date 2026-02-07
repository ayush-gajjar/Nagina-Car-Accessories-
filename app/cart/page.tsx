'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Truck, Shield } from 'lucide-react'
import { getCart, updateCartQuantity, removeFromCart, getCartTotal } from '@/lib/storage'
import { showToast } from '@/components/Toast'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    setCart(getCart())
    setLoading(false)
  }, [])

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateCartQuantity(productId, newQuantity)
    setCart(getCart())
    showToast('Cart updated', 'success')
  }

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
    setCart(getCart())
    showToast('Item removed from cart', 'info')
  }

  const applyCoupon = () => {
    const validCoupons = {
      'NAGINA10': 10,
      'SAVE20': 20,
      'PREMIUM30': 30,
    }
    
    if (validCoupons[couponCode.toUpperCase()]) {
      setDiscount(validCoupons[couponCode.toUpperCase()])
      showToast(`Coupon applied! ${validCoupons[couponCode.toUpperCase()]}% off`, 'success')
    } else {
      showToast('Invalid coupon code', 'error')
    }
  }

  const subtotal = getCartTotal()
  const discountAmount = (subtotal * discount) / 100
  const shipping = subtotal > 0 ? (subtotal >= 1000 ? 0 : 50) : 0
  const total = subtotal - discountAmount + shipping

  if (loading) {
    return (
      <div className="section">
        <div className="container-custom">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-12">
              <div className="bg-gradient-to-br from-primary-100 to-pink-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag size={64} className="text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
              <p className="text-slate-600 mb-8 text-lg">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/" className="btn-premium inline-block">
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-slate-600 hover:text-primary-600">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Shopping Cart</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-slate-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Link href="/" className="btn-ghost">
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-primary-600 font-bold text-2xl mb-4">
                      ₹{item.salePrice.toLocaleString()}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-1">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-medium"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-2">Total</p>
                    <p className="font-bold text-2xl text-slate-900">
                      ₹{(item.salePrice * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Have a coupon?</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <button onClick={applyCoupon} className="btn-outline px-6">
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-sm text-green-600 mt-2 font-medium">✓ {discount}% discount applied!</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span className="font-semibold">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                
                {subtotal < 1000 && subtotal > 0 && (
                  <p className="text-sm text-amber-600 font-medium">
                    Add ₹{(1000 - subtotal).toLocaleString()} more for FREE shipping!
                  </p>
                )}
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span className="gradient-text">₹{total.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className="btn-premium w-full block text-center mb-4">
                Proceed to Checkout
              </Link>

              {/* Trust Badges */}
              <div className="space-y-3 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield className="text-green-600" size={20} />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Truck className="text-blue-600" size={20} />
                  <span>Free Delivery on ₹1000+</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Tag className="text-purple-600" size={20} />
                  <span>Best Price Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Coupons */}
        <div className="mt-12 glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Available Coupons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { code: 'NAGINA10', discount: '10% OFF', min: '₹500' },
              { code: 'SAVE20', discount: '20% OFF', min: '₹1000' },
              { code: 'PREMIUM30', discount: '30% OFF', min: '₹2000' },
            ].map((coupon) => (
              <div key={coupon.code} className="border-2 border-dashed border-primary-300 rounded-xl p-4 hover:border-primary-600 transition-colors cursor-pointer" onClick={() => setCouponCode(coupon.code)}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-primary-600">{coupon.code}</span>
                  <span className="badge badge-primary">{coupon.discount}</span>
                </div>
                <p className="text-sm text-slate-600">Min. order: {coupon.min}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
