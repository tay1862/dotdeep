import { Link } from 'react-router-dom'
import { MessageCircle, Send, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { CONTACT, WHATSAPP_URL, MESSENGER_URL, FACEBOOK_URL, ROUTES } from '@/utils/constants'

export default function Footer() {
  const { t, isLao } = useLanguage()

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: t('nav.home'), href: ROUTES.home },
    { name: t('nav.portfolio'), href: ROUTES.portfolio },
    { name: t('nav.services'), href: ROUTES.services },
    { name: t('nav.packages'), href: ROUTES.packages },
    { name: t('nav.about'), href: ROUTES.about },
    { name: t('nav.contact'), href: ROUTES.contact }
  ]

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: WHATSAPP_URL,
      icon: MessageCircle,
      color: 'hover:text-green-400'
    },
    {
      name: 'Messenger',
      href: MESSENGER_URL,
      icon: Send,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      href: FACEBOOK_URL,
      icon: () => (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'hover:text-blue-600'
    }
  ]

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/Dotdeep logo.png" 
                alt="Dotdeep Design" 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-gradient">
                Dotdeep Design
              </span>
            </div>
            
            <p className={`text-white/70 text-sm leading-relaxed ${isLao ? 'text-lao' : ''}`}>
              {isLao 
                ? 'ບໍລິການອອກແບບໂລໂກ້ແລະແບຼນດິ້ງແບບມືອາຊີບ ທີ່ຈະເຮັດໃຫ້ທຸລະກິດຂອງທ່ານໂດດເດັ່ນ'
                : 'Professional logo design and branding services that make your business stand out from the competition.'
              }
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/60 ${social.color} transition-colors duration-200 hover-glow`}
                  title={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold text-white ${isLao ? 'text-lao' : ''}`}>
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-white/70 hover:text-primary-400 transition-colors duration-200 text-sm ${isLao ? 'text-lao' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold text-white ${isLao ? 'text-lao' : ''}`}>
              {t('footer.services')}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className={isLao ? 'text-lao' : ''}>
                {isLao ? 'ອອກແບບໂລໂກ້' : 'Logo Design'}
              </li>
              <li className={isLao ? 'text-lao' : ''}>
                {isLao ? 'ແບຼນດິ້ງ' : 'Brand Identity'}
              </li>
              <li className={isLao ? 'text-lao' : ''}>
                {isLao ? 'ອອກແບບກຣາຟິກ' : 'Graphic Design'}
              </li>
              <li className={isLao ? 'text-lao' : ''}>
                {isLao ? 'ອອກແບບສິ່ງພິມ' : 'Print Design'}
              </li>
              <li className={isLao ? 'text-lao' : ''}>
                {isLao ? 'ອອກແບບເວັບ' : 'Web Design'}
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold text-white ${isLao ? 'text-lao' : ''}`}>
              {t('footer.contact')}
            </h3>
            
            <div className="space-y-3">
              {/* Phone */}
              <a 
                href={`tel:${CONTACT.phone}`}
                className="flex items-center space-x-3 text-white/70 hover:text-primary-400 transition-colors duration-200 group"
              >
                <Phone className="h-4 w-4 group-hover:animate-pulse" />
                <span className="text-sm">{CONTACT.phone}</span>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${CONTACT.email}`}
                className="flex items-center space-x-3 text-white/70 hover:text-primary-400 transition-colors duration-200 group"
              >
                <Mail className="h-4 w-4 group-hover:animate-pulse" />
                <span className="text-sm">{CONTACT.email}</span>
              </a>

              {/* Address */}
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin className="h-4 w-4" />
                <span className={`text-sm ${isLao ? 'text-lao' : ''}`}>
                  {CONTACT.address}
                </span>
              </div>

              {/* Hours */}
              <div className="flex items-center space-x-3 text-white/70">
                <Clock className="h-4 w-4" />
                <span className={`text-sm ${isLao ? 'text-lao' : ''}`}>
                  {isLao ? 'ຈ-ສ: 9:00-18:00, ເສົາ: 9:00-16:00' : CONTACT.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="section-separator my-8"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className={`text-white/60 text-sm ${isLao ? 'text-lao' : ''}`}>
            © {currentYear} Dotdeep Design. {t('footer.rights')}.
          </p>
          
          <div className="flex space-x-6">
            <Link 
              to="/privacy" 
              className={`text-white/60 hover:text-primary-400 transition-colors duration-200 text-sm ${isLao ? 'text-lao' : ''}`}
            >
              {t('footer.privacy')}
            </Link>
            <Link 
              to="/terms" 
              className={`text-white/60 hover:text-primary-400 transition-colors duration-200 text-sm ${isLao ? 'text-lao' : ''}`}
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 