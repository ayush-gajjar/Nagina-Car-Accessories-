import Link from 'next/link'
import Image from 'next/image'
import { Star, TrendingUp, Shield, Truck, Award } from 'lucide-react'
import { products, categories } from '@/data/products'

export default function Home() {
  const featuredProducts = products.filter(p => p.featured)
  const bestDeals = products.filter(p => p.discount >= 50).slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg">
              <TrendingUp className="text-primary-600" size={20} />
              <span className="font-semibold text-slate-700">#1 Premium Auto Accessories Store</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Premium Auto</span>
              <br />
              <span className="text-slate-900">Accessories Store</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Discover luxury car & bike accessories with up to <span className="font-bold text-primary-600">70% OFF</span>. Premium quality, trusted by 50,000+ customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-premium">
                Shop Now
              </Link>
              <Link href="/deals" className="btn-outline">
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 -mt-16 relative z-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected payments' },
              { icon: Award, title: 'Premium Quality', desc: 'Certified products' },
              { icon: Star, title: 'Top Rated', desc: '4.8/5 customer rating' },
            ].map((feature, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <feature.icon className="mx-auto mb-4 text-primary-600" size={48} />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured</span> Products
            </h2>
            <p className="text-slate-600 text-lg">Handpicked premium accessories for your vehicle</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="badge badge-primary">{product.badge}</span>
                  </div>
                )}
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 z-10 bg-primary-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm">
                    -{product.discount}%
                  </div>
                )}
                
                <div className="relative aspect-square overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="product-card-image" />
                </div>
                
                <div className="p-6">
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
                  
                  <Link href={`/product/${product.slug}`} className="block w-full bg-gradient-to-r from-primary-600 to-pink-600 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="glass-card rounded-[3rem] p-12 md:p-16 text-center bg-gradient-to-br from-primary-600 to-pink-600">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Up to 70% OFF</h2>
            <p className="text-xl text-white/90 mb-8">Limited time offer on all premium accessories</p>
            <Link href="/deals" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all">
              Shop Deals Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
