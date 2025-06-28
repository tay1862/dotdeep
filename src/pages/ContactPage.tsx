import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send
} from 'lucide-react'

const ContactPage: React.FC = () => {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
            <span className="text-white">Contact </span>
            <span className="text-primary-400">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'lo' 
              ? 'ພ້ອມທີ່ຈະເລີ່ມຕົ້ນໂຄງການຂອງທ່ານບໍ? ຕິດຕໍ່ພວກເຮົາມື້ນີ້!'
              : 'Ready to start your project? Get in touch with us today!'
            }
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-glass rounded-xl p-8 border border-primary-400/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {language === 'lo' ? 'ສົ່ງຂໍ້ຄວາມຫາພວກເຮົາ' : 'Send us a Message'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">
                    {language === 'lo' ? 'ຊື່' : 'Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-primary-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                    placeholder={language === 'lo' ? 'ຊື່ຂອງທ່ານ' : 'Your Name'}
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">
                    {language === 'lo' ? 'ອີເມລ' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-primary-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                    placeholder={language === 'lo' ? 'ອີເມລຂອງທ່ານ' : 'Your Email'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">
                  {language === 'lo' ? 'ໂທລະສັບ' : 'Phone'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/20 border border-primary-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                  placeholder={language === 'lo' ? 'ເບີໂທຂອງທ່ານ' : 'Your Phone Number'}
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  {language === 'lo' ? 'ຫົວຂໍ້' : 'Subject'} *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/20 border border-primary-400/20 rounded-lg text-white focus:outline-none focus:border-primary-400"
                >
                  <option value="">
                    {language === 'lo' ? 'ເລືອກຫົວຂໍ້' : 'Select Subject'}
                  </option>
                  <option value="logo-design">
                    {language === 'lo' ? 'ອອກແບບໂລໂກ້' : 'Logo Design'}
                  </option>
                  <option value="branding">
                    {language === 'lo' ? 'ແບຼນດິ້ງ' : 'Branding'}
                  </option>
                  <option value="web-design">
                    {language === 'lo' ? 'ອອກແບບເວັບໄຊທ໌' : 'Web Design'}
                  </option>
                  <option value="other">
                    {language === 'lo' ? 'ອື່ນໆ' : 'Other'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">
                  {language === 'lo' ? 'ຂໍ້ຄວາມ' : 'Message'} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black/20 border border-primary-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 resize-none"
                  placeholder={language === 'lo' ? 'ບອກພວກເຮົາກ່ຽວກັບໂຄງການຂອງທ່ານ...' : 'Tell us about your project...'}
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary-400 text-black font-semibold rounded-lg hover:bg-primary-500 transition-colors duration-300 flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                {language === 'lo' ? 'ສົ່ງຂໍ້ຄວາມ' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-glass rounded-xl p-8 border border-primary-400/20">
              <h3 className="text-xl font-bold text-white mb-6">
                {language === 'lo' ? 'ຂໍ້ມູນຕິດຕໍ່' : 'Contact Information'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-primary-400 mr-4" size={24} />
                  <div>
                    <div className="text-white font-medium">+856-20-59814656</div>
                    <div className="text-gray-400 text-sm">
                      {language === 'lo' ? 'ໂທຫາພວກເຮົາ' : 'Call us anytime'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="text-primary-400 mr-4" size={24} />
                  <div>
                    <div className="text-white font-medium">info@dotdeep.com</div>
                    <div className="text-gray-400 text-sm">
                      {language === 'lo' ? 'ສົ່ງອີເມລຫາພວກເຮົາ' : 'Email us anytime'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="text-primary-400 mr-4" size={24} />
                  <div>
                    <div className="text-white font-medium">Vientiane, Lao PDR</div>
                    <div className="text-gray-400 text-sm">
                      {language === 'lo' ? 'ທີ່ຕັ້ງຂອງພວກເຮົາ' : 'Our location'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="text-primary-400 mr-4" size={24} />
                  <div>
                    <div className="text-white font-medium">
                      {language === 'lo' ? 'ຈັນ-ຢູ່: 9:00-18:00' : 'Mon-Fri: 9:00-18:00'}
                    </div>
                    <div className="text-white font-medium">
                      {language === 'lo' ? 'ເສົາ: 9:00-16:00' : 'Sat: 9:00-16:00'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {language === 'lo' ? 'ເວລາເຮັດວຽກ' : 'Business Hours'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-glass rounded-xl p-8 border border-primary-400/20">
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'lo' ? 'ຕິດຕໍ່ດ່ວນ' : 'Quick Contact'}
              </h3>
              
              <div className="space-y-4">
                <a
                  href="https://wa.me/8562059814656"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-green-600/20 border border-green-400/20 rounded-lg hover:bg-green-600/30 transition-colors duration-300"
                >
                  <MessageSquare className="text-green-400 mr-3" size={24} />
                  <div>
                    <div className="text-white font-medium">WhatsApp</div>
                    <div className="text-gray-400 text-sm">
                      {language === 'lo' ? 'ສົນທະນາກັບພວກເຮົາ' : 'Chat with us'}
                    </div>
                  </div>
                </a>

                <a
                  href="https://m.me/DotDeepDesign"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-blue-600/20 border border-blue-400/20 rounded-lg hover:bg-blue-600/30 transition-colors duration-300"
                >
                  <MessageSquare className="text-blue-400 mr-3" size={24} />
                  <div>
                    <div className="text-white font-medium">Messenger</div>
                    <div className="text-gray-400 text-sm">
                      {language === 'lo' ? 'ສົ່ງຂໍ້ຄວາມຫາພວກເຮົາ' : 'Message us on Facebook'}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage 