import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const { language } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-glass rounded-xl p-8 border border-primary-400/20"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {language === 'lo' ? 'ເຂົ້າສູ່ລະບົບ' : 'Sign In'}
          </h1>
          <p className="text-gray-300">
            {language === 'lo' ? 'ເຂົ້າສູ່ບັນຊີຂອງທ່ານ' : 'Access your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">
              {language === 'lo' ? 'ອີເມລ' : 'Email'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-primary-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                placeholder={language === 'lo' ? 'ອີເມລຂອງທ່ານ' : 'Your email'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">
              {language === 'lo' ? 'ລະຫັດຜ່ານ' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 bg-black/20 border border-primary-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                placeholder={language === 'lo' ? 'ລະຫັດຜ່ານຂອງທ່ານ' : 'Your password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-400 text-black font-semibold rounded-lg hover:bg-primary-500 transition-colors duration-300"
          >
            {language === 'lo' ? 'ເຂົ້າສູ່ລະບົບ' : 'Sign In'}
          </button>

          <div className="text-center space-y-4">
            <Link
              to="/forgot-password"
              className="text-primary-400 hover:text-primary-500 transition-colors duration-300"
            >
              {language === 'lo' ? 'ລືມລະຫັດຜ່ານ?' : 'Forgot Password?'}
            </Link>
            
            <p className="text-gray-400">
              {language === 'lo' ? 'ບໍ່ມີບັນຊີ?' : "Don't have an account?"}{' '}
              <Link
                to="/register"
                className="text-primary-400 hover:text-primary-500 transition-colors duration-300"
              >
                {language === 'lo' ? 'ສະໝັກສະມາຊິກ' : 'Sign Up'}
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default LoginPage 