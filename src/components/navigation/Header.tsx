import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, LogIn, User } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/utils/constants'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, language, setLanguage, isLao } = useLanguage()
  const { user, profile, signOut } = useAuth()
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const navigation = [
    { name: t('nav.home'), href: ROUTES.home },
    { name: t('nav.portfolio'), href: ROUTES.portfolio },
    { name: t('nav.services'), href: ROUTES.services },
    { name: t('nav.packages'), href: ROUTES.packages },
    { name: t('nav.about'), href: ROUTES.about },
    { name: t('nav.contact'), href: ROUTES.contact }
  ]

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'lo' : 'en')
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.home} className="flex items-center space-x-3 hover-glow">
            <img 
              src="/Dotdeep logo.png" 
              alt="Dotdeep Design" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gradient hidden sm:block">
              Dotdeep Design
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-400 ${
                  location.pathname === item.href
                    ? 'text-primary-400'
                    : 'text-white/80'
                } ${isLao ? 'text-lao' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="btn-ghost flex items-center space-x-2"
              title="Toggle Language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'ລາວ' : 'EN'}
              </span>
            </button>

            {/* User Authentication */}
            {user && profile ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to={profile.role === 'admin' ? ROUTES.admin : ROUTES.dashboard}
                  className="btn-ghost flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm">{profile.name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn-secondary text-sm"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to={ROUTES.login} className="btn-ghost flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm">{t('nav.login')}</span>
                </Link>
                <Link to={ROUTES.register} className="btn-primary text-sm">
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden btn-ghost p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 mt-2"
            >
              <div className="py-4 space-y-3">
                {/* Mobile Navigation Links */}
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block py-2 text-base font-medium transition-colors duration-200 hover:text-primary-400 ${
                      location.pathname === item.href
                        ? 'text-primary-400'
                        : 'text-white/80'
                    } ${isLao ? 'text-lao' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Language Toggle */}
                <button
                  onClick={handleLanguageToggle}
                  className="flex items-center space-x-2 py-2 text-white/80 hover:text-primary-400"
                >
                  <Globe className="h-5 w-5" />
                  <span>
                    {language === 'en' ? 'Switch to Lao' : 'Switch to English'}
                  </span>
                </button>

                {/* Mobile Auth Actions */}
                {user && profile ? (
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <Link 
                      to={profile.role === 'admin' ? ROUTES.admin : ROUTES.dashboard}
                      className="flex items-center space-x-2 py-2 text-white/80 hover:text-primary-400"
                    >
                      <User className="h-5 w-5" />
                      <span>{profile.name}</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left py-2 text-white/80 hover:text-primary-400"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <Link 
                      to={ROUTES.login}
                      className="flex items-center space-x-2 py-2 text-white/80 hover:text-primary-400"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>{t('nav.login')}</span>
                    </Link>
                    <Link 
                      to={ROUTES.register}
                      className="block w-full btn-primary text-center"
                    >
                      {t('nav.register')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
} 