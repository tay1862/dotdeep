import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { PACKAGES } from '../utils/constants'
import { formatCurrency } from '../utils/helpers'
import { Check, Star, ArrowRight, MessageCircle } from 'lucide-react'

const PackagesPage: React.FC = () => {
  const { language } = useLanguage()

  const packagesArray = Object.values(PACKAGES)

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-primary-400">Packages</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'lo' 
              ? 'ເລືອກແພັກເກັດທີ່ເໝາະສົມກັບຄວາມຕ້ອງການແລະງົບປະມານຂອງທ່ານ'
              : 'Choose the perfect package that fits your needs and budget for professional design services.'
            }
          </p>
        </motion.div>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packagesArray.map((pkg, index) => (
            <motion.div
              key={pkg.code}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-glass rounded-xl p-8 border transition-all duration-300 ${
                pkg.popular 
                  ? 'border-primary-400 ring-2 ring-primary-400/20 scale-105' 
                  : 'border-primary-400/20 hover:border-primary-400/40'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-400 text-black px-6 py-2 rounded-full font-semibold flex items-center">
                    <Star size={16} className="mr-2" />
                    {language === 'lo' ? 'ແນະນຳ' : 'Most Popular'}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-primary-400 mb-2">
                  {formatCurrency(pkg.price, pkg.currency)}
                </div>
                <p className="text-gray-300">
                  {language === 'lo' 
                    ? `${pkg.deliveryTime} ມື້ • ${pkg.revisions} ຄັ້ງແກ້ໄຂ`
                    : `${pkg.deliveryTime} Days • ${pkg.revisions} Revisions`
                  }
                </p>
              </div>

              <div className="mb-8">
                <p className="text-gray-300 text-center mb-6">{pkg.description}</p>
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="text-primary-400 mr-3" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <button 
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                    pkg.popular
                      ? 'bg-primary-400 text-black hover:bg-primary-500'
                      : 'border border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-black'
                  }`}
                >
                  {language === 'lo' ? 'ເລືອກແພັກເກັດນີ້' : 'Choose This Package'}
                  <ArrowRight className="ml-2" size={16} />
                </button>
                
                <button className="w-full py-3 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-500/10 transition-all duration-300 flex items-center justify-center">
                  <MessageCircle className="mr-2" size={16} />
                  {language === 'lo' ? 'ສອບຖາມເພີ່ມເຕີມ' : 'Ask Questions'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {language === 'lo' ? 'ຄຳຖາມທີ່ພົບເລື້ອຍ' : 'Frequently Asked Questions'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              question: 'What\'s included in each package?',
              questionLao: 'ແຕ່ລະແພັກເກັດມີອັນໃດແດ່?',
              answer: 'Each package includes different levels of design work, file formats, and support.',
              answerLao: 'ແຕ່ລະແພັກເກັດປະກອບມີລະດັບການອອກແບບ, ຮູບແບບໄຟລ໌, ແລະການສະໜັບສະໜູນທີ່ແຕກຕ່າງກັນ'
            },
            {
              question: 'Can I upgrade my package later?',
              questionLao: 'ຂ້ອຍສາມາດອັບເກຣດແພັກເກັດພາຍຫຼັງບໍ?',
              answer: 'Yes, you can upgrade to a higher package at any time during the project.',
              answerLao: 'ແມ່ນແລ້ວ, ທ່ານສາມາດອັບເກຣດໄປຫາແພັກເກັດທີ່ສູງກວ່າໄດ້ທຸກເວລາລະຫວ່າງໂຄງການ'
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-glass rounded-xl p-6 border border-primary-400/20"
            >
              <h4 className="text-lg font-semibold text-white mb-3">
                {language === 'lo' ? faq.questionLao : faq.question}
              </h4>
              <p className="text-gray-300">
                {language === 'lo' ? faq.answerLao : faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-xl p-12 border border-primary-400/20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'lo' 
              ? 'ຍັງບໍ່ແນ່ໃຈວ່າຈະເລືອກແພັກເກັດໃດ?'
              : 'Not Sure Which Package to Choose?'
            }
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'lo'
              ? 'ຕິດຕໍ່ພວກເຮົາເພື່ອປຶກສາຟຣີ ພວກເຮົາຈະຊ່ວຍທ່ານເລືອກແພັກເກັດທີ່ເໝາະສົມທີ່ສຸດ'
              : 'Contact us for a free consultation. We\'ll help you choose the perfect package for your needs.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary-400 text-black font-semibold rounded-lg hover:bg-primary-500 transition-colors duration-300">
              {language === 'lo' ? 'ປຶກສາຟຣີ' : 'Free Consultation'}
            </button>
            <button className="px-8 py-4 border border-primary-400 text-primary-400 font-semibold rounded-lg hover:bg-primary-400/10 transition-colors duration-300">
              {language === 'lo' ? 'ເບິ່ງຜົນງານ' : 'View Portfolio'}
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default PackagesPage 