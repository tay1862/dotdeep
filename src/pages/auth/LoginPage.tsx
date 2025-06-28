import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

const LoginPage: React.FC = () => {
  const { language } = useLanguage()
  const { signIn } = useAuth()
  const navigate = useNavigate()
  
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        setError(error.message || (language === 'lo' ? 'ເກີດຂໍ້ຜິດພາດ' : 'An error occurred'))
        return
      }
      
      // Redirect to dashboard or home
      navigate('/client/dashboard')
    } catch (err: any) {
      setError(err.message || (language === 'lo' ? 'ເກີດຂໍ້ຜິດພາດ' : 'An error occurred'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-primary-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            {language === 'lo' ? 'ກັບໄປໜ້າຫຼັກ' : 'Back to Home'}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {language === 'lo' ? 'ເຂົ້າສູ່ລະບົບ' : 'Welcome Back'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400"
            >
              {language === 'lo' ? 'ເຂົ້າສູ່ບັນຊີຂອງທ່ານ' : 'Sign in to your account'}
            </motion.p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'lo' ? 'ອີເມລ' : 'Email'} *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === 'lo' ? 'ອີເມລຂອງທ່ານ' : 'Your email address'}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'lo' ? 'ລະຫັດຜ່ານ' : 'Password'} *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={language === 'lo' ? 'ລະຫັດຜ່ານຂອງທ່ານ' : 'Your password'}
                  className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isLoading 
                ? (language === 'lo' ? 'ກຳລັງເຂົ້າສູ່ລະບົບ...' : 'Signing In...') 
                : (language === 'lo' ? 'ເຂົ້າສູ່ລະບົບ' : 'Sign In')
              }
            </motion.button>
          </form>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 space-y-4 text-center"
          >
            <Link
              to="/forgot-password"
              className="block text-primary-400 hover:text-primary-300 transition-colors"
            >
              {language === 'lo' ? 'ລືມລະຫັດຜ່ານ?' : 'Forgot your password?'}
            </Link>
            
            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400">
                {language === 'lo' ? 'ບໍ່ມີບັນຊີ?' : "Don't have an account?"}{' '}
                <Link
                  to="/register"
                  className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                >
                  {language === 'lo' ? 'ສ້າງບັນຊີໃໝ່' : 'Create Account'}
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage 