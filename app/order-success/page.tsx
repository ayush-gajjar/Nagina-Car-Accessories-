'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Home } from 'lucide-react'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')

  return (
    <div className="section min-h-screen flex items-center">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center glass-card rounded-3xl p-12">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Placed!</h1>
          <p className="text-xl text-slate-600 mb-6">Thank you for shopping with us</p>
          <div className="glass-card rounded-2xl p-4 mb-8">
            <p className="text-sm text-slate-600 mb-1">Order Number</p>
            <p className="text-2xl font-bold gradient-text">{orderNumber}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="btn-premium"><Home size={20} className="mr-2" />Home</Link>
            <Link href="/orders" className="btn-outline"><Package size={20} className="mr-2" />Orders</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="section min-h-screen flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
