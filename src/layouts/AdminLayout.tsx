import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../contexts/LanguageContext'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  Image, 
  Package, 
  BarChart3, 
  Settings,
  LogOut,
  Shield
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth()
  const { language } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navigationItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', labelLao: 'ໜ້າຫຼັກ' },
    { path: '/admin/clients', icon: Users, label: 'Clients', labelLao: 'ລູກຄ້າ' },
    { path: '/admin/projects', icon: FolderOpen, label: 'Projects', labelLao: 'ໂຄງການ' },
    { path: '/admin/portfolio', icon: Image, label: 'Portfolio', labelLao: 'ຜົນງານ' },
    { path: '/admin/packages', icon: Package, label: 'Packages', labelLao: 'ແພັກເກັດ' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics', labelLao: 'ການວິເຄາະ' },
    { path: '/admin/settings', icon: Settings, label: 'Settings', labelLao: 'ການຕັ້ງຄ່າ' },
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
          <div className="flex items-center space-x-2">
            <Shield className="text-red-400" size={24} />
            <div>
              <h2 className="text-xl font-bold text-primary-400">
                {language === 'lo' ? 'ຜູ້ບໍລິຫານ' : 'Admin Panel'}
              </h2>
              <p className="text-sm text-gray-400">
                {language === 'lo' ? `ສະບາຍດີ ${user?.email}` : `Welcome ${user?.email}`}
              </p>
            </div>
          </div>
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
          
          <div className="border-t border-gray-700 mt-6 pt-4">
            <Link
              to="/"
              className="flex items-center space-x-3 p-3 rounded-lg mb-2 text-gray-300 hover:bg-white/5 hover:text-primary-400 transition-all duration-200"
            >
              <LayoutDashboard size={20} />
              <span>{language === 'lo' ? 'ເວັບໄຊທ໌' : 'Website'}</span>
            </Link>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all duration-200"
            >
              <LogOut size={20} />
              <span>{language === 'lo' ? 'ອອກຈາກລະບົບ' : 'Sign Out'}</span>
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-glass border-b border-primary-400/20 backdrop-blur-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="text-red-400" size={24} />
              <h1 className="text-2xl font-bold text-primary-400">
                {navigationItems.find(item => item.path === location.pathname)?.label || 'Admin Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Administrator</p>
                <p className="text-sm font-medium">{user?.email}</p>
              </div>
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                <Shield size={16} className="text-black" />
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

export default AdminLayout 