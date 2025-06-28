import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Palette, 
  PenTool, 
  Monitor, 
  FileText, 
  Camera, 
  Sparkles,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const ServicesPage: React.FC = () => {
  const { language } = useLanguage()

  const services = [
    {
      icon: Palette,
      title: 'Logo Design',
      titleLao: 'ອອກແບບໂລໂກ້',
      description: 'Create unique and memorable logos that represent your brand identity.',
      descriptionLao: 'ສ້າງໂລໂກ້ທີ່ເປັນເອກະລັກແລະໜ້າຈື່ຈຳສຳລັບແບຼນດ໌ຂອງທ່ານ',
      features: ['Multiple Concepts', 'Vector Files', 'Brand Guidelines', 'Unlimited Revisions'],
      featuresLao: ['ແນວຄວາມຄິດຫຼາກຫຼາຍ', 'ໄຟລ໌ເວັກເຕີ', 'ຄູ່ມືແບຼນດ໌', 'ແກ້ໄຂບໍ່ຈຳກັດ']
    },
    {
      icon: PenTool,
      title: 'Brand Identity',
      titleLao: 'ເອກະລັກແບຼນດ໌',
      description: 'Complete branding solutions including colors, typography, and visual elements.',
      descriptionLao: 'ການແກ້ໄຂແບຼນດິ້ງຄົບຖ້ວນລວມທັງສີ, ຟອນ, ແລະອົງປະກອບທາງສາຍຕາ',
      features: ['Logo System', 'Color Palette', 'Typography', 'Business Cards'],
      featuresLao: ['ລະບົບໂລໂກ້', 'ຈານສີ', 'ອັກສອນ', 'ນາມບັດ']
    },
    {
      icon: Monitor,
      title: 'Web Design',
      titleLao: 'ອອກແບບເວັບໄຊທ໌',
      description: 'Modern and responsive website designs that engage your audience.',
      descriptionLao: 'ການອອກແບບເວັບໄຊທ໌ທີ່ທັນສະໄໝແລະຕອບສະໜອງກັບທຸກອຸປະກອນ',
      features: ['Responsive Design', 'User Experience', 'Modern Interface', 'Mobile Optimized'],
      featuresLao: ['ການອອກແບບຕອບສະໜອງ', 'ປະສົບການຜູ້ໃຊ້', 'ໜ້າຕ່າງທັນສະໄໝ', 'ເພີ່ມປະສິດທິພາບມືຖື']
    },
    {
      icon: FileText,
      title: 'Print Design',
      titleLao: 'ອອກແບບສິ່ງພິມ',
      description: 'Professional print materials including brochures, flyers, and business cards.',
      descriptionLao: 'ວັດສະດຸພິມອາຊີບລວມທັງໂບຣຊົວ, ແຜ່ນປິວ, ແລະນາມບັດ',
      features: ['High Resolution', 'Print Ready', 'Various Formats', 'Quality Materials'],
      featuresLao: ['ຄວາມລະອຽດສູງ', 'ພ້ອມພິມ', 'ຮູບແບບຫຼາກຫຼາຍ', 'ວັດສະດຸມີຄຸນນະພາບ']
    },
    {
      icon: Camera,
      title: 'Photography',
      titleLao: 'ການຖ່າຍຮູບ',
      description: 'Professional product and brand photography for your marketing needs.',
      descriptionLao: 'ການຖ່າຍຮູບຜະລິດຕະພັນແລະແບຼນດ໌ສຳລັບຄວາມຕ້ອງການທາງການຕະຫຼາດ',
      features: ['Product Photos', 'Brand Photography', 'Professional Editing', 'High Quality'],
      featuresLao: ['ຮູບຜະລິດຕະພັນ', 'ການຖ່າຍຮູບແບຼນດ໌', 'ການແກ້ໄຂມືອາຊີບ', 'ຄຸນນະພາບສູງ']
    },
    {
      icon: Sparkles,
      title: 'Creative Consultation',
      titleLao: 'ຄຳປຶກສາເຊີງສ້າງສັນ',
      description: 'Strategic creative guidance to help your brand stand out in the market.',
      descriptionLao: 'ຄຳແນະນຳເຊີງຍຸດທະສາດເພື່ອຊ່ວຍໃຫ້ແບຼນດ໌ຂອງທ່ານໂດດເດັ່ນໃນຕະຫຼາດ',
      features: ['Brand Strategy', 'Market Analysis', 'Creative Direction', 'Ongoing Support'],
      featuresLao: ['ຍຸດທະສາດແບຼນດ໌', 'ການວິເຄາະຕະຫຼາດ', 'ທິດທາງສ້າງສັນ', 'ການຊ່ວຍເຫຼືອຕໍ່ເນື່ອງ']
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      titleLao: 'ການປຶກສາ',
      description: 'We discuss your vision, goals, and requirements.',
      descriptionLao: 'ພວກເຮົາປຶກສາເລື່ອງວິໄສທັດ, ເປົ້າໝາຍ, ແລະຄວາມຕ້ອງການຂອງທ່ານ'
    },
    {
      step: '02',
      title: 'Research & Planning',
      titleLao: 'ການຄົ້ນຄວ້າ & ວາງແຜນ',
      description: 'Market research and strategic planning for your project.',
      descriptionLao: 'ການຄົ້ນຄວ້າຕະຫຼາດແລະການວາງແຜນເຊີງຍຸດທະສາດສຳລັບໂຄງການຂອງທ່ານ'
    },
    {
      step: '03',
      title: 'Design & Creation',
      titleLao: 'ການອອກແບບ & ສ້າງສັນ',
      description: 'Creating initial concepts and refining based on feedback.',
      descriptionLao: 'ສ້າງແນວຄວາມຄິດເບື້ອງຕົ້ນແລະປັບປຸງໂດຍອີງໃສ່ຄໍາຄິດເຫັນ'
    },
    {
      step: '04',
      title: 'Delivery & Support',
      titleLao: 'ການສົ່ງມອບ & ສະໜັບສະໜູນ',
      description: 'Final delivery with ongoing support and maintenance.',
      descriptionLao: 'ການສົ່ງມອບສຸດທ້າຍພ້ອມການສະໜັບສະໜູນແລະບຳລຸງຮັກສາຕໍ່ເນື່ອງ'
    }
  ]

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
            <span className="text-primary-400">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'lo' 
              ? 'ບໍລິການອອກແບບຄົບຖ້ວນເພື່ອຍົກລະດັບແບຼນດ໌ຂອງທ່ານໃຫ້ໂດດເດັ່ນ'
              : 'Comprehensive design services to elevate your brand and make it stand out in the market.'
            }
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-glass rounded-xl p-8 border border-primary-400/20 hover:border-primary-400/40 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary-400/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-400/30 transition-colors duration-300">
                  <Icon className="text-primary-400" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {language === 'lo' ? service.titleLao : service.title}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {language === 'lo' ? service.descriptionLao : service.description}
                </p>
                
                <ul className="space-y-2">
                  {(language === 'lo' ? service.featuresLao : service.features).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="text-primary-400 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full mt-6 px-6 py-3 border border-primary-400 text-primary-400 rounded-lg hover:bg-primary-400 hover:text-black transition-all duration-300 flex items-center justify-center group">
                  {language === 'lo' ? 'ເບິ່ງລາຍລະອຽດ' : 'Learn More'}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </button>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {language === 'lo' ? 'ຂັ້ນຕອນການເຮັດວຽກ' : 'Our Process'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'lo' 
              ? 'ຂັ້ນຕອນການເຮັດວຽກທີ່ມີປະສິດທິພາບເພື່ອຮັບປະກັນຜົນງານທີ່ດີທີ່ສຸດ'
              : 'Our proven process ensures exceptional results and client satisfaction every time.'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-400 text-black font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-6">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'lo' ? step.titleLao : step.title}
              </h3>
              <p className="text-gray-300">
                {language === 'lo' ? step.descriptionLao : step.description}
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-xl p-12 border border-primary-400/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {language === 'lo' 
              ? 'ພ້ອມເລີ່ມຕົ້ນໂຄງການຂອງທ່ານບໍ?'
              : 'Ready to Start Your Project?'
            }
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'lo'
              ? 'ຕິດຕໍ່ພວກເຮົາມື້ນີ້ເພື່ອປຶກສາຟຣີແລະຮັບໃບເສນີລາຄາ'
              : 'Contact us today for a free consultation and get a quote for your project.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary-400 text-black font-semibold rounded-lg hover:bg-primary-500 transition-colors duration-300">
              {language === 'lo' ? 'ປຶກສາຟຣີ' : 'Get Free Consultation'}
            </button>
            <button className="px-8 py-4 border border-primary-400 text-primary-400 font-semibold rounded-lg hover:bg-primary-400/10 transition-colors duration-300">
              {language === 'lo' ? 'ເບິ່ງແພັກເກັດ' : 'View Packages'}
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default ServicesPage 