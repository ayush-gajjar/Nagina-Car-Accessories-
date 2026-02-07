'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CreditCard, Truck, MapPin, Phone, Mail, User, Check, ShieldCheck } from 'lucide-react'
import { getCart, getCartTotal, clearCart, saveOrder, generateOrderNumber, saveUserData } from '@/lib/storage'
import { showToast } from '@/components/Toast'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('COD')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  useEffect(() => {
    const cartItems = getCart()
    if (cartItems.length === 0) {
      router.push('/cart')
    }
    setCart(cartItems)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      showToast('Please fill all required fields', 'error')
      setLoading(false)
      return
    }

    // Simulate order processing
    setTimeout(() => {
      const orderNumber = generateOrderNumber()
      const order = {
        id: Date.now().toString(),
        orderNumber,
        date: new Date().toISOString(),
        items: cart,
        total: getCartTotal(),
        userData: formData,
        status: 'pending' as const,
        paymentMethod,
      }

      saveOrder(order)
      saveUserData(formData)
      clearCart()
      
      showToast('Order placed successfully!', 'success')
      router.push(`/order-success?order=${orderNumber}`)
      setLoading(false)
    }, 2000)
  }

  const subtotal = getCartTotal()
  const shipping = subtotal >= 1000 ? 0 : 50
  const total = subtotal + shipping

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="section">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Checkout</h1>
            <p className="text-slate-600">Complete your order in just a few steps</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                      1
                    </div>
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input-premium pl-10"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input-premium pl-10"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="input-premium pl-10"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                      2
                    </div>
                    <h2 className="text-2xl font-bold">Shipping Address</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Street Address *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="input-premium pl-10 min-h-[100px]"
                          placeholder="House/Flat No., Building Name, Street"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input-premium"
                          placeholder="Mumbai"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">State *</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="input-premium"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="input-premium"
                          placeholder="400001"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-primary-600 to-pink-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                      3
                    </div>
                    <h2 className="text-2xl font-bold">Payment Method</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-primary-600 bg-primary-50' : 'border-slate-200 hover:border-primary-300'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-primary-600"
                      />
                      <Truck className="text-primary-600" size={24} />
                      <div className="flex-1">
                        <div className="font-bold">Cash on Delivery</div>
                        <div className="text-sm text-slate-600">Pay when you receive</div>
                      </div>
                      {paymentMethod === 'COD' && (
                        <Check className="text-primary-600" size={24} />
                      )}
                    </label>
                    
                    <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'ONLINE' ? 'border-primary-600 bg-primary-50' : 'border-slate-200 hover:border-primary-300'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="ONLINE"
                        checked={paymentMethod === 'ONLINE'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-primary-600"
                      />
                      <CreditCard className="text-primary-600" size={24} />
                      <div className="flex-1">
                        <div className="font-bold">Online Payment</div>
                        <div className="text-sm text-slate-600">UPI, Card, Net Banking</div>
                      </div>
                      {paymentMethod === 'ONLINE' && (
                        <Check className="text-primary-600" size={24} />
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Side - Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card rounded-2xl p-6 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  
                  {/* Products */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.name}</h4>
                          <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{(item.salePrice * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-2xl font-bold mb-6">
                    <span>Total</span>
                    <span className="gradient-text">₹{total.toLocaleString()}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </span>
                    ) : (
                      `Place Order • ₹${total.toLocaleString()}`
                    )}
                  </button>

                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-600">
                    <ShieldCheck className="text-green-600" size={20} />
                    <span>Secure checkout powered by SSL</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
