import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

const ForgotPasswordPage: React.FC = () => {
  const { language } = useLanguage()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-glass rounded-xl p-8 border border-primary-400/20 text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          {language === 'lo' ? 'ລືມລະຫັດຜ່ານ' : 'Forgot Password'}
        </h1>
        <p className="text-gray-300">
          {language === 'lo' ? 'ກຳລັງພັດທະນາ...' : 'Coming Soon...'}
        </p>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage 