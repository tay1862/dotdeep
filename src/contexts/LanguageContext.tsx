import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'lo'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, fallback?: string) => string
  isLao: boolean
  isEnglish: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translation object
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Services',
    'nav.packages': 'Packages',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.open': 'Open',

    // Homepage
    'home.hero.title': 'Professional Logo Design & Branding Services',
    'home.hero.subtitle': 'Transform your business with stunning visual identity. From concept to completion, we create designs that make your brand unforgettable.',
    'home.hero.cta': 'Get Started',
    'home.hero.portfolio': 'View Portfolio',
    'home.services.title': 'Our Services',
    'home.packages.title': 'Design Packages',
    'home.testimonials.title': 'What Our Clients Say',
    'home.contact.title': 'Ready to Start Your Project?',

    // Packages
    'packages.dot1.name': 'DOT1 - Essential',
    'packages.dot1.price': '2,390 LAK',
    'packages.dot2.name': 'DOT2 - Professional',
    'packages.dot2.price': '3,990 LAK',
    'packages.dot3.name': 'DOT3 - Premium',
    'packages.dot3.price': '5,500 LAK',
    'packages.choose': 'Choose Package',
    'packages.popular': 'Most Popular',
    'packages.features': 'Features',
    'packages.delivery': 'Delivery Time',
    'packages.revisions': 'Revisions',

    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to your account',
    'auth.register.title': 'Create Account',
    'auth.register.subtitle': 'Join Dotdeep Design',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.login.button': 'Sign In',
    'auth.register.button': 'Create Account',
    'auth.forgot.password': 'Forgot Password?',
    'auth.remember.me': 'Remember me',

    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.projects': 'My Projects',
    'dashboard.messages': 'Messages',
    'dashboard.files': 'Files',
    'dashboard.invoices': 'Invoices',
    'dashboard.settings': 'Settings',
    'dashboard.recent.projects': 'Recent Projects',
    'dashboard.project.status': 'Project Status',
    'dashboard.total.projects': 'Total Projects',
    'dashboard.completed': 'Completed',
    'dashboard.in.progress': 'In Progress',

    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to bring your vision to life? Let\'s discuss your project.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Tell us about your project',
    'contact.form.send': 'Send Message',
    'contact.whatsapp': 'Chat on WhatsApp',
    'contact.messenger': 'Facebook Messenger',
    'contact.phone': 'Call Us',
    'contact.email': 'Email Us',

    // Footer
    'footer.about': 'About Dotdeep',
    'footer.services': 'Our Services',
    'footer.contact': 'Contact Info',
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service'
  },
  lo: {
    // Navigation
    'nav.home': 'ໜ້າຫຼັກ',
    'nav.portfolio': 'ຜົນງານ',
    'nav.services': 'ບໍລິການ',
    'nav.packages': 'ແພັກເກັດ',
    'nav.about': 'ກ່ຽວກັບເຮົາ',
    'nav.contact': 'ຕິດຕໍ່',
    'nav.login': 'ເຂົ້າສູ່ລະບົບ',
    'nav.register': 'ສະໝັກສະມາຊິກ',
    'nav.dashboard': 'ແດັສບອດ',
    'nav.logout': 'ອອກຈາກລະບົບ',

    // Common
    'common.loading': 'ກຳລັງໂຫຼດ...',
    'common.error': 'ຜິດພາດ',
    'common.success': 'ສຳເລັດ',
    'common.submit': 'ສົ່ງ',
    'common.cancel': 'ຍົກເລີກ',
    'common.save': 'ບັນທຶກ',
    'common.edit': 'ແກ້ໄຂ',
    'common.delete': 'ລຶບ',
    'common.view': 'ເບິ່ງ',
    'common.download': 'ດາວໂຫຼດ',
    'common.upload': 'ອັບໂຫຼດ',
    'common.search': 'ຄົ້ນຫາ',
    'common.filter': 'ກັ່ນຕອງ',
    'common.sort': 'ຈັດລຽງ',
    'common.back': 'ກັບຄືນ',
    'common.next': 'ຕໍ່ໄປ',
    'common.previous': 'ກ່ອນໜ້າ',
    'common.close': 'ປິດ',
    'common.open': 'ເປີດ',

    // Homepage
    'home.hero.title': 'ບໍລິການອອກແບບໂລໂກ້ແລະແບຼນດິ້ງແບບມືອາຊີບ',
    'home.hero.subtitle': 'ປ່ຽນໃຫ້ທຸລະກິດຂອງທ່ານມີເອກະລັກທາງສາຍຕາທີ່ໂດດເດັ່ນ. ຈາກແນວຄວາມຄິດໄປສູ່ການສຳເລັດ, ພວກເຮົາສ້າງສາວການອອກແບບທີ່ເຮັດໃຫ້ແບຼນຂອງທ່ານຖືກຈື່ຈັງ.',
    'home.hero.cta': 'ເລີ່ມຕົ້ນ',
    'home.hero.portfolio': 'ເບິ່ງຜົນງານ',
    'home.services.title': 'ບໍລິການຂອງເຮົາ',
    'home.packages.title': 'ແພັກເກັດການອອກແບບ',
    'home.testimonials.title': 'ຄວາມຄິດເຫັນຈາກລູກຄ້າ',
    'home.contact.title': 'ພ້ອມທີ່ຈະເລີ່ມໂປຣເຈັກຂອງທ່ານແລ້ວບໍ?',

    // Packages
    'packages.dot1.name': 'DOT1 - ພື້ນຖານ',
    'packages.dot1.price': '2,390 ກີບ',
    'packages.dot2.name': 'DOT2 - ມືອາຊີບ',
    'packages.dot2.price': '3,990 ກີບ',
    'packages.dot3.name': 'DOT3 - ພຣີເມ້ຍົມ',
    'packages.dot3.price': '5,500 ກີບ',
    'packages.choose': 'ເລືອກແພັກເກັດ',
    'packages.popular': 'ນິຍົມທີ່ສຸດ',
    'packages.features': 'ຄຸນສົມບັດ',
    'packages.delivery': 'ເວລາສົ່ງມອບ',
    'packages.revisions': 'ການແກ້ໄຂ',

    // Auth
    'auth.login.title': 'ຍິນດີຕ້ອນຮັບກັບຄືນ',
    'auth.login.subtitle': 'ເຂົ້າສູ່ບັນຊີຂອງທ່ານ',
    'auth.register.title': 'ສ້າງບັນຊີ',
    'auth.register.subtitle': 'ເຂົ້າຮ່ວມກັບ Dotdeep Design',
    'auth.email': 'ອີເມວ',
    'auth.password': 'ລະຫັດຜ່ານ',
    'auth.name': 'ຊື່ເຕັມ',
    'auth.phone': 'ເບີໂທລະສັບ',
    'auth.login.button': 'ເຂົ້າສູ່ລະບົບ',
    'auth.register.button': 'ສ້າງບັນຊີ',
    'auth.forgot.password': 'ລືມລະຫັດຜ່ານ?',
    'auth.remember.me': 'ຈື່ຂ້ອຍໄວ້',

    // Dashboard
    'dashboard.welcome': 'ຍິນດີຕ້ອນຮັບກັບຄືນ',
    'dashboard.projects': 'ໂປຣເຈັກຂອງຂ້ອຍ',
    'dashboard.messages': 'ຂໍ້ຄວາມ',
    'dashboard.files': 'ໄຟລ໌',
    'dashboard.invoices': 'ໃບແຈ້ງໜີ້',
    'dashboard.settings': 'ການຕັ້ງຄ່າ',
    'dashboard.recent.projects': 'ໂປຣເຈັກລ່າສຸດ',
    'dashboard.project.status': 'ສະຖານະໂປຣເຈັກ',
    'dashboard.total.projects': 'ໂປຣເຈັກທັງໝົດ',
    'dashboard.completed': 'ສຳເລັດແລ້ວ',
    'dashboard.in.progress': 'ກຳລັງດຳເນີນ',

    // Contact
    'contact.title': 'ຕິດຕໍ່ເຮົາ',
    'contact.subtitle': 'ພ້ອມທີ່ຈະເຮັດໃຫ້ວິໄສທັດຂອງທ່ານກາຍເປັນຄວາມຈິງແລ້ວບໍ? ມາລົມກັນກ່ຽວກັບໂປຣເຈັກຂອງທ່ານ.',
    'contact.form.name': 'ຊື່ຂອງທ່ານ',
    'contact.form.email': 'ທີ່ຢູ່ອີເມວ',
    'contact.form.phone': 'ເບີໂທລະສັບ',
    'contact.form.message': 'ບອກພວກເຮົາກ່ຽວກັບໂປຣເຈັກຂອງທ່ານ',
    'contact.form.send': 'ສົ່ງຂໍ້ຄວາມ',
    'contact.whatsapp': 'ແຊັດໃນ WhatsApp',
    'contact.messenger': 'Facebook Messenger',
    'contact.phone': 'ໂທຫາເຮົາ',
    'contact.email': 'ອີເມວຫາເຮົາ',

    // Footer
    'footer.about': 'ກ່ຽວກັບ Dotdeep',
    'footer.services': 'ບໍລິການຂອງເຮົາ',
    'footer.contact': 'ຂໍ້ມູນຕິດຕໍ່',
    'footer.follow': 'ຕິດຕາມເຮົາ',
    'footer.rights': 'ສະຫງວນລິຂະສິດທັງໝົດ',
    'footer.privacy': 'ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ',
    'footer.terms': 'ເງື່ອນໄຂການໃຫ້ບໍລິການ'
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en')

  // Translation function
  const t = (key: string, fallback?: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]]
    return translation || fallback || key
  }

  // Set language and persist to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('dotdeep-language', lang)
    
    // Update document lang attribute
    document.documentElement.lang = lang
    
    // Update document direction for Lao text
    document.documentElement.dir = lang === 'lo' ? 'ltr' : 'ltr'
  }

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('dotdeep-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'lo')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Computed values
  const isLao = language === 'lo'
  const isEnglish = language === 'en'

  const value = {
    language,
    setLanguage,
    t,
    isLao,
    isEnglish
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
} 