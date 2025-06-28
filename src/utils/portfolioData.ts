export interface PortfolioItem {
  id: string
  title: string
  titleLao: string
  category: string
  image: string
  images?: string[] // Multiple images for each project
  client: string
  year: number
  tags: string[]
  description: string
  descriptionLao: string
  featured?: boolean
  createdAt: string
  updatedAt: string
}

// Sample portfolio data with real design examples
export const SAMPLE_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Lao Coffee House Branding',
    titleLao: 'ແບຼນດິ້ງຮ້ານກາເຟລາວ',
    category: 'branding',
    image: '/images/portfolio/portfolio-sample-1.jpg',
    images: [
      '/images/portfolio/portfolio-sample-1.jpg',
      '/images/portfolio/portfolio-sample-2.jpg',
      '/images/portfolio/portfolio-sample-3.jpg',
      '/images/portfolio/portfolio-sample-4.jpg'
    ],
    client: 'Lao Coffee House',
    year: 2024,
    tags: ['Branding', 'Logo Design', 'Packaging', 'Print Design'],
    description: 'Complete branding solution for a premium coffee house in Vientiane, including logo design, business cards, and packaging.',
    descriptionLao: 'ການແກ້ໄຂແບຼນດິ້ງຄົບຖ້ວນສຳລັບຮ້ານກາເຟທີ່ມີຄຸນນະພາບໃນວຽງຈັນ, ລວມທັງການອອກແບບໂລໂກ້, ນາມບັດ, ແລະບັນຈຸພັນ.',
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Modern Restaurant Logo',
    titleLao: 'ໂລໂກ້ຮ້ານອາຫານທັນສະໄໝ',
    category: 'logo',
    image: '/images/portfolio/portfolio-sample-5.jpg',
    images: [
      '/images/portfolio/portfolio-sample-5.jpg',
      '/images/portfolio/portfolio-sample-6.jpg',
      '/images/portfolio/portfolio-sample-7.jpg'
    ],
    client: 'Sabaidee Restaurant',
    year: 2024,
    tags: ['Logo Design', 'Restaurant', 'Modern'],
    description: 'Modern logo design for a contemporary Lao restaurant featuring traditional elements with modern typography.',
    descriptionLao: 'ການອອກແບບໂລໂກ້ທັນສະໄໝສຳລັບຮ້ານອາຫານລາວທີ່ມີການປະສົມປະສານລະຫວ່າງອົງປະກອບພື້ນເມືອງແລະຕົວອັກສອນທັນສະໄໝ.',
    featured: false,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },
  {
    id: '3',
    title: 'Tech Startup Identity',
    titleLao: 'ເອກະລັກບໍລິສັດເທັກໂນໂລຍີ',
    category: 'branding',
    image: '/images/portfolio/portfolio-sample-8.jpg',
    images: [
      '/images/portfolio/portfolio-sample-8.jpg',
      '/images/portfolio/portfolio-sample-9.jpg',
      '/images/portfolio/portfolio-sample-10.jpg',
      '/images/portfolio/portfolio-sample-11.jpg'
    ],
    client: 'Lao Tech Solutions',
    year: 2024,
    tags: ['Branding', 'Tech', 'Modern', 'Digital'],
    description: 'Complete brand identity for a technology startup, including logo, website design, and digital assets.',
    descriptionLao: 'ເອກະລັກແບຼນດ໌ຄົບຖ້ວນສຳລັບບໍລິສັດເທັກໂນໂລຍີໃໝ່, ລວມທັງໂລໂກ້, ການອອກແບບເວັບໄຊທ໌, ແລະຊັບສິນດິຈິຕອນ.',
    featured: true,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15'
  },
  {
    id: '4',
    title: 'Traditional Textile Branding',
    titleLao: 'ແບຼນດິ້ງຜ້າແພທັ້ງເດີມ',
    category: 'branding',
    image: '/images/portfolio/portfolio-sample-12.jpg',
    images: [
      '/images/portfolio/portfolio-sample-12.jpg',
      '/images/portfolio/portfolio-sample-13.jpg',
      '/images/portfolio/portfolio-sample-14.jpg',
      '/images/portfolio/portfolio-sample-15.jpg'
    ],
    client: 'Lao Silk Heritage',
    year: 2023,
    tags: ['Traditional', 'Textile', 'Cultural', 'Packaging'],
    description: 'Branding for traditional Lao silk products, combining cultural heritage with modern presentation.',
    descriptionLao: 'ແບຼນດິ້ງສຳລັບຜະລິດຕະພັນໄໝລາວແບບດັ້ງເດີມ, ປະສົມປະສານມໍລະດົກວັດທະນະທໍາກັບການນໍາສະເໜີທີ່ທັນສະໄໝ.',
    featured: false,
    createdAt: '2023-12-01',
    updatedAt: '2023-12-01'
  },
  {
    id: '5',
    title: 'Fitness Center Brand',
    titleLao: 'ແບຼນດ໌ສູນຟິດເນດ',
    category: 'logo',
    image: '/images/portfolio/portfolio-sample-1.jpg',
    images: [
      '/images/portfolio/portfolio-sample-1.jpg',
      '/images/portfolio/portfolio-sample-2.jpg',
      '/images/portfolio/portfolio-sample-3.jpg'
    ],
    client: 'Strong Lao Fitness',
    year: 2024,
    tags: ['Fitness', 'Sports', 'Dynamic', 'Logo'],
    description: 'Dynamic logo design for a modern fitness center with bold typography and energetic color scheme.',
    descriptionLao: 'ການອອກແບບໂລໂກ້ທີ່ມີພະລັງສຳລັບສູນຟິດເນດທັນສະໄໝດ້ວຍຕົວອັກສອນທີ່ໂດດເດັ່ນແລະສີສັນທີ່ມີພະລັງ.',
    featured: false,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01'
  },
  {
    id: '6',
    title: 'Organic Farm Packaging',
    titleLao: 'ບັນຈຸພັນຟາມອໍແກນິກ',
    category: 'print',
    image: '/images/portfolio/portfolio-sample-4.jpg',
    images: [
      '/images/portfolio/portfolio-sample-4.jpg',
      '/images/portfolio/portfolio-sample-5.jpg',
      '/images/portfolio/portfolio-sample-6.jpg',
      '/images/portfolio/portfolio-sample-7.jpg'
    ],
    client: 'Green Valley Farm',
    year: 2024,
    tags: ['Packaging', 'Organic', 'Sustainable', 'Print'],
    description: 'Eco-friendly packaging design for organic farm products with sustainable materials and natural color palette.',
    descriptionLao: 'ການອອກແບບບັນຈຸພັນທີ່ເປັນມິດກັບສິ່ງແວດລ້ອມສຳລັບຜະລິດຕະພັນຟາມອໍແກນິກດ້ວຍວັດສະດຸແບບຍືນຍົງແລະສີທໍາມະຊາດ.',
    featured: true,
    createdAt: '2024-01-30',
    updatedAt: '2024-01-30'
  },
  {
    id: '7',
    title: 'Digital Marketing Agency',
    titleLao: 'ອົງການການຕະຫຼາດດິຈິຕອນ',
    category: 'web',
    image: '/images/portfolio/portfolio-sample-8.jpg',
    images: [
      '/images/portfolio/portfolio-sample-8.jpg',
      '/images/portfolio/portfolio-sample-9.jpg',
      '/images/portfolio/portfolio-sample-10.jpg',
      '/images/portfolio/portfolio-sample-11.jpg'
    ],
    client: 'Lao Digital Pro',
    year: 2024,
    tags: ['Web Design', 'Digital', 'Agency', 'Modern'],
    description: 'Modern website design for a digital marketing agency with focus on user experience and conversion optimization.',
    descriptionLao: 'ການອອກແບບເວັບໄຊທ໌ທັນສະໄໝສຳລັບອົງການການຕະຫຼາດດິຈິຕອນທີ່ເນັ້ນປະສົບການຜູ້ໃຊ້ແລະການປັບປຸງການປ່ຽນແປງ.',
    featured: false,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20'
  },
  {
    id: '8',
    title: 'Luxury Hotel Branding',
    titleLao: 'ແບຼນດິ້ງໂຮງແຮມຫຼູຫຼາ',
    category: 'branding',
    image: '/images/portfolio/portfolio-sample-12.jpg',
    images: [
      '/images/portfolio/portfolio-sample-12.jpg',
      '/images/portfolio/portfolio-sample-13.jpg',
      '/images/portfolio/portfolio-sample-14.jpg',
      '/images/portfolio/portfolio-sample-15.jpg',
      '/images/portfolio/portfolio-sample-1.jpg'
    ],
    client: 'Mekong Luxury Resort',
    year: 2023,
    tags: ['Luxury', 'Hospitality', 'Elegant', 'Premium'],
    description: 'Elegant branding for a luxury resort featuring sophisticated typography and premium finishes.',
    descriptionLao: 'ແບຼນດິ້ງທີ່ສະຫງ່າງາມສຳລັບຣີສອດຫຼູຫຼາທີ່ມີຕົວອັກສອນທີ່ຊັບຊ້ອນແລະການສຳເລັດແບບພຣີມຽມ.',
    featured: true,
    createdAt: '2023-11-15',
    updatedAt: '2023-11-15'
  }
]

// Portfolio statistics
export const PORTFOLIO_STATS = {
  totalProjects: SAMPLE_PORTFOLIO.length,
  categories: {
    branding: SAMPLE_PORTFOLIO.filter(item => item.category === 'branding').length,
    logo: SAMPLE_PORTFOLIO.filter(item => item.category === 'logo').length,
    web: SAMPLE_PORTFOLIO.filter(item => item.category === 'web').length,
    print: SAMPLE_PORTFOLIO.filter(item => item.category === 'print').length
  },
  clients: [...new Set(SAMPLE_PORTFOLIO.map(item => item.client))].length,
  featuredProjects: SAMPLE_PORTFOLIO.filter(item => item.featured).length
}

// Portfolio management functions
export const portfolioUtils = {
  // Get all portfolio items
  getAll: (): PortfolioItem[] => SAMPLE_PORTFOLIO,
  
  // Get portfolio item by ID
  getById: (id: string): PortfolioItem | undefined => 
    SAMPLE_PORTFOLIO.find(item => item.id === id),
  
  // Get portfolio items by category
  getByCategory: (category: string): PortfolioItem[] => 
    category === 'all' 
      ? SAMPLE_PORTFOLIO 
      : SAMPLE_PORTFOLIO.filter(item => item.category === category),
  
  // Get featured portfolio items
  getFeatured: (): PortfolioItem[] => 
    SAMPLE_PORTFOLIO.filter(item => item.featured),
  
  // Search portfolio items
  search: (query: string): PortfolioItem[] => 
    SAMPLE_PORTFOLIO.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.titleLao.includes(query) ||
      item.client.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    ),
  
  // Get recent portfolio items
  getRecent: (limit: number = 6): PortfolioItem[] => 
    [...SAMPLE_PORTFOLIO]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
}

// Image paths for portfolio
export const createPortfolioImagePath = (filename: string): string => 
  `/images/portfolio/${filename}`

// Default placeholder image
export const DEFAULT_PORTFOLIO_IMAGE = '/images/portfolio/placeholder.jpg'

// Featured portfolio items for homepage
export const FEATURED_PORTFOLIO = SAMPLE_PORTFOLIO.filter(item => item.featured).slice(0, 6) 