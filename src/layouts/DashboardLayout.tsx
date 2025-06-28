import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../contexts/LanguageContext'
import { motion } from 'framer-motion'
import { 
  User, 
  FolderOpen, 
  MessageCircle, 
  Download, 
  Receipt, 
  Settings,
  LogOut,
  Home
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth()
  const { language } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard', labelLao: 'ໜ້າຫຼັກ' },
    { path: '/dashboard/projects', icon: FolderOpen, label: 'Projects', labelLao: 'ໂຄງການ' },
    { path: '/dashboard/messages', icon: MessageCircle, label: 'Messages', labelLao: 'ຂໍ້ຄວາມ' },
    { path: '/dashboard/files', icon: Download, label: 'Files', labelLao: 'ໄຟລ໌' },
    { path: '/dashboard/invoices', icon: Receipt, label: 'Invoices', labelLao: 'ໃບແຈ້ງໜີ້' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings', labelLao: 'ການຕັ້ງຄ່າ' },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-glass border-r border-primary-400/20 backdrop-blur-lg"
      >
        <div className="p-6 border-b border-primary-400/20">
          <h2 className="text-xl font-bold text-primary-400">
            {language === 'lo' ? 'ແຜງຄວບຄຸມ' : 'Client Dashboard'}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {language === 'lo' ? `ສະບາຍດີ ${user?.email}` : `Welcome ${user?.email}`}
          </p>
        </div>

        <nav className="p-4">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-400/20 text-primary-400 border-l-4 border-primary-400' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-primary-400'
                }`}
              >
                <Icon size={20} />
                <span>{language === 'lo' ? item.labelLao : item.label}</span>
              </Link>
            )
          })}
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 p-3 rounded-lg mt-6 text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <LogOut size={20} />
            <span>{language === 'lo' ? 'ອອກຈາກລະບົບ' : 'Sign Out'}</span>
          </button>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-glass border-b border-primary-400/20 backdrop-blur-lg p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-400">
              {navigationItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
                <User size={16} className="text-black" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout 