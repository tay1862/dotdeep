import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

const AdminPackages: React.FC = () => {
  const { language } = useLanguage()
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">
        {language === 'lo' ? 'ຈັດການແພັກເກັດ' : 'Manage Packages'}
      </h1>
      <div className="bg-glass rounded-xl p-8 border border-primary-400/20">
        <p className="text-gray-300">
          {language === 'lo' ? 'ກຳລັງພັດທະນາ...' : 'Coming Soon...'}
        </p>
      </div>
    </motion.div>
  )
}

export default AdminPackages 