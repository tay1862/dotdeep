import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import PortfolioGallery from '../components/ui/PortfolioGallery'

const PortfolioPage: React.FC = () => {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Portfolio Gallery */}
        <PortfolioGallery showHeader={true} />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? 'Ready to Start Your Project?' : 'ພ້ອມທີ່ຈະເລີ່ມໂປຣເຈັກຂອງທ່ານບໍ?'}
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Let's discuss your design needs and create something amazing together."
                : 'ມາປຶກສາຫາລືກ່ຽວກັບຄວາມຕ້ອງການການອອກແບບຂອງທ່ານແລະສ້າງສິ່ງທີ່ວິເສດຮ່ວມກັນ.'
              }
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-600/25">
              {language === 'en' ? 'Start Your Project' : 'ເລີ່ມໂປຣເຈັກຂອງທ່ານ'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioPage 