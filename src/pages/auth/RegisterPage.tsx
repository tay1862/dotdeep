import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

const RegisterPage: React.FC = () => {
  const { language } = useLanguage()
  const { signUp } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(language === 'lo' ? 'ລະຫັດຜ່ານບໍ່ຕົງກັນ' : 'Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError(language === 'lo' ? 'ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວອັກສອນ' : 'Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        formData.name, 
        formData.phone
      )
      
      if (error) {
        setError(error.message || (language === 'lo' ? 'ເກີດຂໍ້ຜິດພາດ' : 'An error occurred'))
        return
      }
      
      // Show success message and redirect
      alert(language === 'lo' 
        ? 'ສະໝັກສະມາຊິກສຳເລັດ! ກະລຸນາກວດສອບອີເມລເພື່ອຢືນຢັນບັນຊີ' 
        : 'Registration successful! Please check your email to verify your account'
      )
      navigate('/login')
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
              {language === 'lo' ? 'ສ້າງບັນຊີໃໝ່' : 'Create Account'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400"
            >
              {language === 'lo' ? 'ເຂົ້າຮ່ວມກັບ Dotdeep Design' : 'Join Dotdeep Design'}
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
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'lo' ? 'ຊື່ເຕັມ' : 'Full Name'} *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={language === 'lo' ? 'ຊື່ເຕັມຂອງທ່ານ' : 'Your full name'}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                  required
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
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

            {/* Phone Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'lo' ? 'ເບີໂທລະສັບ' : 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={language === 'lo' ? 'ເບີໂທຂອງທ່ານ' : 'Your phone number'}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
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

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'lo' ? 'ຢືນຢັນລະຫັດຜ່ານ' : 'Confirm Password'} *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={language === 'lo' ? 'ຢືນຢັນລະຫັດຜ່ານ' : 'Confirm your password'}
                  className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isLoading 
                ? (language === 'lo' ? 'ກຳລັງສ້າງບັນຊີ...' : 'Creating Account...') 
                : (language === 'lo' ? 'ສ້າງບັນຊີ' : 'Create Account')
              }
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400">
              {language === 'lo' ? 'ມີບັນຊີແລ້ວ?' : 'Already have an account?'}{' '}
              <Link 
                to="/login" 
                className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
              >
                {language === 'lo' ? 'ເຂົ້າສູ່ລະບົບ' : 'Sign In'}
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage 