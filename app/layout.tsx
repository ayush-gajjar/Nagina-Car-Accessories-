import './globals.css'
import { Inter } from 'next/font/google'
import ModernHeader from '@/components/ModernHeader'
import ModernFooter from '@/components/ModernFooter'
import Toast from '@/components/Toast'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Nagina Premium Auto Accessories | Luxury Car & Bike Accessories',
  description: 'Discover premium car and bike accessories. From luxury key covers to professional car care products. Free shipping across India.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <ModernHeader />
          <main className="flex-1">
            {children}
          </main>
          <ModernFooter />
        </div>
        <Toast />
      </body>
    </html>
  )
}
