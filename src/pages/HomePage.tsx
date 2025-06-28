import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Award, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ROUTES, PACKAGES } from '@/utils/constants'
import { formatCurrency } from '@/utils/helpers'

export default function HomePage() {
  const { t, isLao } = useLanguage()

  const stats = [
    { 
      icon: Users, 
      number: '500+', 
      label: isLao ? 'ລູກຄ້າທີ່ພໍໃຈ' : 'Happy Clients' 
    },
    { 
      icon: Award, 
      number: '1000+', 
      label: isLao ? 'ໂປຣເຈັກສຳເລັດ' : 'Projects Completed' 
    },
    { 
      icon: Star, 
      number: '5.0', 
      label: isLao ? 'ຄະແນນທີ່ໄດ້ຮັບ' : 'Average Rating' 
    },
    { 
      icon: Zap, 
      number: '3', 
      label: isLao ? 'ວັນສຳລັບ DOT1' : 'Days for DOT1' 
    }
  ]

  const featuredPackages = [PACKAGES.DOT1, PACKAGES.DOT2, PACKAGES.DOT3]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${isLao ? 'text-lao' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-white">Professional</span>
                <br />
                <span className="text-gradient animate-gradient">
                  Logo Design
                </span>
                <br />
                <span className="text-white">& Branding</span>
              </motion.h1>

              <motion.p
                className={`text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-2xl ${isLao ? 'text-lao' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {t('home.hero.subtitle')}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link to={ROUTES.packages} className="btn-primary group">
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link to={ROUTES.portfolio} className="btn-secondary">
                  {t('home.hero.portfolio')}
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="h-8 w-8 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className={`text-white/70 text-sm ${isLao ? 'text-lao' : ''}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image/Logo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative z-10">
                <motion.img
                  src="/Dotdeep logo.png"
                  alt="Dotdeep Design"
                  className="w-full max-w-md mx-auto filter drop-shadow-2xl"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-1/4 -left-4 w-20 h-20 bg-primary-400/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-4 w-16 h-16 bg-primary-400/30 rounded-full blur-lg"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Preview Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${isLao ? 'text-lao' : ''}`}>
              {t('home.packages.title')}
            </h2>
            <p className={`text-xl text-white/70 max-w-2xl mx-auto ${isLao ? 'text-lao' : ''}`}>
              {isLao 
                ? 'ເລືອກແພັກເກັດທີ່ເໝາະສົມກັບທຸລະກິດຂອງທ່ານ'
                : 'Choose the perfect package for your business needs'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`glass-card card-hover relative ${pkg.popular ? 'border-primary-400/50' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      {isLao ? 'ນິຍົມທີ່ສຸດ' : 'Most Popular'}
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className={`text-2xl font-bold text-white mb-2 ${isLao ? 'text-lao' : ''}`}>
                    {isLao ? `DOT${pkg.code.slice(-1)} - ${pkg.code === 'DOT1' ? 'ພື້ນຖານ' : pkg.code === 'DOT2' ? 'ມືອາຊີບ' : 'ພຣີເມ້ຍົມ'}` : pkg.name}
                  </h3>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gradient">
                      {formatCurrency(pkg.price, pkg.currency)}
                    </span>
                  </div>

                  <p className={`text-white/70 mb-6 ${isLao ? 'text-lao' : ''}`}>
                    {pkg.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-white/80">
                        <Star className="h-4 w-4 text-primary-400 mr-3 flex-shrink-0" />
                        <span className={`text-sm ${isLao ? 'text-lao' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={ROUTES.packages}
                    className={`w-full ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {isLao ? 'ເລືອກແພັກເກັດ' : 'Choose Package'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to={ROUTES.packages} className="btn-primary">
              {isLao ? 'ເບິ່ງແພັກເກັດທັງໝົດ' : 'View All Packages'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${isLao ? 'text-lao' : ''}`}>
              {t('home.contact.title')}
            </h2>
            <p className={`text-xl text-white/70 mb-8 ${isLao ? 'text-lao' : ''}`}>
              {isLao 
                ? 'ລົມກັນກ່ຽວກັບໂປຣເຈັກຂອງທ່ານ ແລະເລີ່ມສ້າງແບຼນທີ່ໂດດເດັ່ນ'
                : "Let's discuss your project and start building an amazing brand together"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.contact} className="btn-primary">
                {isLao ? 'ຕິດຕໍ່ເຮົາ' : 'Get In Touch'}
              </Link>
              <Link to={ROUTES.portfolio} className="btn-secondary">
                {isLao ? 'ເບິ່ງຜົນງານ' : 'View Our Work'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 