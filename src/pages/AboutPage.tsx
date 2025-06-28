import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Users, 
  Target, 
  Heart, 
  Award, 
  Clock, 
  Smile,
  MapPin,
  Mail,
  Phone
} from 'lucide-react'

const AboutPage: React.FC = () => {
  const { language } = useLanguage()

  const stats = [
    { icon: Users, number: '100+', label: 'Happy Clients', labelLao: 'ລູກຄ້າພໍໃຈ' },
    { icon: Award, number: '250+', label: 'Projects Completed', labelLao: 'ໂຄງການສຳເລັດ' },
    { icon: Clock, number: '3+', label: 'Years Experience', labelLao: 'ປີປະສົບການ' },
    { icon: Smile, number: '100%', label: 'Satisfaction Rate', labelLao: 'ອັດຕາຄວາມພໍໃຈ' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      titleLao: 'ຄວາມເປັນເລີດ',
      description: 'We strive for perfection in every design we create.',
      descriptionLao: 'ພວກເຮົາພະຍາຍາມສໍາລັບຄວາມສົມບູນແບບໃນທຸກການອອກແບບທີ່ພວກເຮົາສ້າງ'
    },
    {
      icon: Heart,
      title: 'Passion',
      titleLao: 'ຄວາມມັກ',
      description: 'Design is not just our job, it\'s our passion and calling.',
      descriptionLao: 'ການອອກແບບບໍ່ແມ່ນພຽງແຕ່ວຽກຂອງພວກເຮົາ, ມັນແມ່ນຄວາມຮັກແລະການເອີ້ນຂອງພວກເຮົາ'
    },
    {
      icon: Users,
      title: 'Collaboration',
      titleLao: 'ການຮ່ວມມື',
      description: 'We work closely with clients to bring their vision to life.',
      descriptionLao: 'ພວກເຮົາເຮັດວຽກຢ່າງໃກ້ຊິດກັບລູກຄ້າເພື່ອນໍາວິໄສທັດຂອງເຂົາເຈົ້າມາສູ່ຊີວິດ'
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
            <span className="text-white">About </span>
            <span className="text-primary-400">Dotdeep Design</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'lo' 
              ? 'ເຮົາເປັນອົງການອອກແບບມືອາຊີບໃນນະຄອນຫຼວງວຽງຈັນ ທີ່ອຸທິດຕົນເພື່ອສ້າງແບຼນດ໌ທີ່ໂດດເດັ່ນ'
              : 'We are a professional design agency in Vientiane, Lao PDR, dedicated to creating outstanding brands and visual identities.'
            }
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-glass rounded-xl p-6 border border-primary-400/20"
              >
                <Icon className="text-primary-400 mx-auto mb-4" size={40} />
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">
                  {language === 'lo' ? stat.labelLao : stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {language === 'lo' ? 'ເລື່ອງລາວຂອງພວກເຮົາ' : 'Our Story'}
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                {language === 'lo' 
                  ? 'Dotdeep Design ກໍ່ຕັ້ງຂຶ້ນດ້ວຍຄວາມຝັນທີ່ຈະນໍາເອົາການອອກແບບທີ່ມີຄຸນນະພາບສູງມາສູ່ທຸລະກິດໃນລາວ.'
                  : 'Dotdeep Design was founded with a dream to bring high-quality design to businesses in Laos.'
                }
              </p>
              <p>
                {language === 'lo'
                  ? 'ພວກເຮົາເລີ່ມຕົ້ນຈາກການອອກແບບໂລໂກ້ງ່າຍໆ ແລະຫຼັງຈາກນັ້ນໄດ້ຂະຫຍາຍໄປສູ່ການບໍລິການອອກແບບຄົບຖ້ວນ.'
                  : 'We started with simple logo designs and have since expanded to offer comprehensive branding and design services.'
                }
              </p>
              <p>
                {language === 'lo'
                  ? 'ວັນນີ້ ພວກເຮົາພູມໃຈທີ່ເປັນນຶ່ງໃນອົງການອອກແບບຊັ້ນນໍາໃນນະຄອນຫຼວງວຽງຈັນ.'
                  : 'Today, we are proud to be one of the leading design agencies in Vientiane, serving clients across various industries.'
                }
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-xl flex items-center justify-center border border-primary-400/20">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary-400 mb-4">DD</div>
                <div className="text-xl text-white font-semibold">Dotdeep Design</div>
                <div className="text-gray-300">Est. 2021</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {language === 'lo' ? 'ຄຸນຄ່າຂອງພວກເຮົາ' : 'Our Values'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'lo' 
              ? 'ຄຸນຄ່າທີ່ນໍາທາງການເຮັດວຽກແລະການຕັດສິນໃຈຂອງພວກເຮົາທຸກມື້'
              : 'The principles that guide our work and decisions every day.'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center bg-glass rounded-xl p-8 border border-primary-400/20 hover:border-primary-400/40 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-400/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Icon className="text-primary-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {language === 'lo' ? value.titleLao : value.title}
                </h3>
                <p className="text-gray-300">
                  {language === 'lo' ? value.descriptionLao : value.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-glass rounded-xl p-8 border border-primary-400/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="text-primary-400 mx-auto mb-4" size={32} />
              <h4 className="text-lg font-semibold text-white mb-2">
                {language === 'lo' ? 'ທີ່ຕັ້ງ' : 'Location'}
              </h4>
              <p className="text-gray-300">Vientiane, Lao PDR</p>
            </div>
            
            <div>
              <Phone className="text-primary-400 mx-auto mb-4" size={32} />
              <h4 className="text-lg font-semibold text-white mb-2">
                {language === 'lo' ? 'ໂທລະສັບ' : 'Phone'}
              </h4>
              <p className="text-gray-300">+856-20-59814656</p>
            </div>
            
            <div>
              <Mail className="text-primary-400 mx-auto mb-4" size={32} />
              <h4 className="text-lg font-semibold text-white mb-2">
                {language === 'lo' ? 'ອີເມລ' : 'Email'}
              </h4>
              <p className="text-gray-300">info@dotdeep.com</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default AboutPage 