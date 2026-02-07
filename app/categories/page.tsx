'use client'
import Link from 'next/link'
import { categories } from '@/data/products'

export default function CategoriesPage() {
  return (
    <div className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Browse</span> Categories
          </h1>
          <p className="text-xl text-slate-600">Find exactly what you need</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="glass-card rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-lg`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-slate-600">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
