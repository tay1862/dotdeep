import { ReactNode } from 'react'
import Header from '@/components/navigation/Header'
import Footer from '@/components/navigation/Footer'
import FloatingContact from '@/components/ui/FloatingContact'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      
      {/* Floating Contact Buttons */}
      <FloatingContact />
    </div>
  )
} 