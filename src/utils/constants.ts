// App Configuration
export const APP_NAME = 'Dotdeep Design'
export const APP_DESCRIPTION = 'Professional Logo Design & Branding Services'
export const APP_URL = 'https://dotdeep.com'

// Contact Information
export const CONTACT = {
  phone: '+856-20-XXXXXXXX',
  email: 'info@dotdeep.com',
  whatsapp: '+856XXXXXXXXX',
  facebook: 'dotdeepdesign',
  address: 'Vientiane, Lao PDR',
  hours: 'Mon-Fri: 9AM-6PM, Sat: 9AM-4PM'
}

// WhatsApp & Messenger Links
export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`
export const MESSENGER_URL = `https://m.me/${CONTACT.facebook}`
export const FACEBOOK_URL = `https://facebook.com/${CONTACT.facebook}`

// Design Packages
export const PACKAGES = {
  DOT1: {
    name: 'DOT1 - Essential',
    code: 'DOT1' as const,
    price: 2390,
    currency: 'LAK' as const,
    deliveryTime: 3,
    revisions: 2,
    features: [
      'Logo Concept Development',
      'Basic Brand Guidelines',
      'High-Resolution Files',
      'Social Media Formats',
      'Email Support'
    ],
    description: 'Perfect for startups and small businesses looking for professional logo design.',
    popular: false
  },
  DOT2: {
    name: 'DOT2 - Professional',
    code: 'DOT2' as const,
    price: 3990,
    currency: 'LAK' as const,
    deliveryTime: 5,
    revisions: 3,
    features: [
      'Multiple Logo Concepts',
      'Complete Brand Guidelines',
      'High-Resolution Files',
      'Social Media Kit',
      'Business Card Design',
      'Letterhead Design',
      'Priority Support'
    ],
    description: 'Comprehensive branding solution for established businesses.',
    popular: true
  },
  DOT3: {
    name: 'DOT3 - Premium',
    code: 'DOT3' as const,
    price: 5500,
    currency: 'LAK' as const,
    deliveryTime: 7,
    revisions: 5,
    features: [
      'Premium Logo Concepts',
      'Complete Brand Identity',
      'High-Resolution Files',
      'Complete Marketing Kit',
      'Business Stationery Set',
      'Website Design Mockup',
      'Package Design Template',
      'Dedicated Support',
      '1-Year Brand Maintenance'
    ],
    description: 'Ultimate branding package for businesses ready to make a statement.',
    popular: false
  }
}

// Portfolio Categories
export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'All Work', labelLao: 'ທັງໝົດ' },
  { id: 'logo', label: 'Logo Design', labelLao: 'ອອກແບບໂລໂກ້' },
  { id: 'branding', label: 'Branding', labelLao: 'ແບຼນດິ້ງ' },
  { id: 'graphic', label: 'Graphic Design', labelLao: 'ອອກແບບກຣາຟິກ' },
  { id: 'artboard', label: 'Artboard', labelLao: 'ອາດບອດ' },
  { id: 'web', label: 'Web Design', labelLao: 'ອອກແບບເວັບ' },
  { id: 'print', label: 'Print Design', labelLao: 'ອອກແບບສິ່ງພິມ' }
] as const

// Project Status
export const PROJECT_STATUS = {
  pending: { label: 'Pending', labelLao: 'ລໍຖ້າ', color: 'yellow' },
  in_progress: { label: 'In Progress', labelLao: 'ກຳລັງດຳເນີນ', color: 'blue' },
  review: { label: 'Under Review', labelLao: 'ກຳລັງກວດສອບ', color: 'purple' },
  revision: { label: 'Needs Revision', labelLao: 'ຕ້ອງແກ້ໄຂ', color: 'orange' },
  completed: { label: 'Completed', labelLao: 'ສຳເລັດ', color: 'green' },
  cancelled: { label: 'Cancelled', labelLao: 'ຍົກເລີກ', color: 'red' }
} as const

// User Roles
export const USER_ROLES = {
  admin: { label: 'Administrator', labelLao: 'ຜູ້ບໍລິຫານ' },
  client: { label: 'Client', labelLao: 'ລູກຄ້າ' },
  visitor: { label: 'Visitor', labelLao: 'ຜູ້ເຂົ້າຊົມ' }
} as const

// File Upload Limits
export const FILE_UPLOAD = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.pdf']
}

// Animation Durations (in seconds)
export const ANIMATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  page: 0.5
}

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

// Routes
export const ROUTES = {
  // Public routes
  home: '/',
  portfolio: '/portfolio',
  services: '/services',
  packages: '/packages',
  about: '/about',
  contact: '/contact',
  
  // Auth routes
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  
  // Client dashboard routes
  dashboard: '/client/dashboard',
  clientProjects: '/client/projects',
  clientMessages: '/client/messages',
  clientFiles: '/client/files',
  clientInvoices: '/client/invoices',
  clientSettings: '/client/settings',
  
  // Admin routes
  admin: '/admin',
  adminClients: '/admin/clients',
  adminProjects: '/admin/projects',
  adminPortfolio: '/admin/portfolio',
  adminPackages: '/admin/packages',
  adminAnalytics: '/admin/analytics',
  adminSettings: '/admin/settings'
} as const

// Currency formatting
export const CURRENCY_FORMAT = {
  LAK: { symbol: '₭', position: 'after' },
  USD: { symbol: '$', position: 'before' },
  THB: { symbol: '฿', position: 'after' }
} as const

// Date formats
export const DATE_FORMATS = {
  short: 'MMM dd, yyyy',
  long: 'MMMM dd, yyyy',
  full: 'EEEE, MMMM dd, yyyy',
  time: 'HH:mm',
  datetime: 'MMM dd, yyyy HH:mm'
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'dotdeep-theme',
  language: 'dotdeep-language',
  authToken: 'dotdeep-auth-token',
  userPreferences: 'dotdeep-user-preferences'
} as const

// API Endpoints (for external services)
export const API_ENDPOINTS = {
  emailJS: 'https://api.emailjs.com/api/v1.0/email/send',
  whatsappAPI: 'https://api.whatsapp.com/send',
  facebookAPI: 'https://graph.facebook.com'
} as const

// Social Media Sharing
export const SOCIAL_SHARE = {
  facebook: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  twitter: (url: string, text: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  linkedin: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  whatsapp: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`
} as const

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  validationError: 'Please check your input and try again.',
  fileUploadError: 'Failed to upload file. Please try again.',
  paymentError: 'Payment processing failed. Please try again.'
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  profileUpdated: 'Profile updated successfully!',
  messagesent: 'Message sent successfully!',
  fileUploaded: 'File uploaded successfully!',
  projectCreated: 'Project created successfully!',
  paymentSuccess: 'Payment completed successfully!',
  accountCreated: 'Account created successfully!',
  passwordReset: 'Password reset email sent!'
} as const 