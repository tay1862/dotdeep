import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Eye, 
  Calendar, 
  User, 
  Star,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { PortfolioItem, portfolioUtils, SAMPLE_PORTFOLIO } from '../../utils/portfolioData'

interface PortfolioGalleryProps {
  showHeader?: boolean
  limit?: number
  featured?: boolean
  category?: string
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ 
  showHeader = true, 
  limit,
  featured = false,
  category 
}) => {
  const { language } = useLanguage()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Categories
  const categories = [
    { id: 'all', name: 'All Projects', nameLao: 'ທັງໝົດ' },
    { id: 'logo', name: 'Logo Design', nameLao: 'ໂລໂກ້' },
    { id: 'branding', name: 'Branding', nameLao: 'ແບຼນດິ້ງ' },
    { id: 'web', name: 'Web Design', nameLao: 'ເວັບ' },
    { id: 'print', name: 'Print Design', nameLao: 'ພິມ' }
  ]

  // Load portfolio items
  useEffect(() => {
    let items = SAMPLE_PORTFOLIO
    
    if (featured) {
      items = portfolioUtils.getFeatured()
    }
    
    if (limit) {
      items = items.slice(0, limit)
    }
    
    setPortfolioItems(items)
  }, [featured, limit])

  // Filter items
  useEffect(() => {
    let filtered = portfolioItems
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }
    
    if (searchQuery) {
      filtered = portfolioUtils.search(searchQuery).filter(item => 
        portfolioItems.some(pi => pi.id === item.id)
      )
    }
    
    setFilteredItems(filtered)
  }, [portfolioItems, selectedCategory, searchQuery])

  // Handle item view
  const handleViewItem = (item: PortfolioItem) => {
    setSelectedItem(item)
    setCurrentImageIndex(0)
    setShowModal(true)
  }

  // Navigate images
  const nextImage = () => {
    if (selectedItem?.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedItem.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedItem?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedItem.images!.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      {showHeader && (
        <div className="mb-8">
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {language === 'en' ? 'Our Portfolio' : 'ຜົນງານຂອງພວກເຮົາ'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              {language === 'en' 
                ? 'Explore our creative design solutions that have helped businesses build their brand identity'
                : 'ສຳຫຼວດການແກ້ໄຂການອອກແບບທີ່ສ້າງສັນທີ່ໄດ້ຊ່ວຍໃຫ້ธຸລະກິດສ້າງເອກະລັກຂອງແບຼນດ໌'
              }
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search projects...' : 'ຄົ້ນຫາໂປຣເຈັກ...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {language === 'en' ? cat.name : cat.nameLao}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => handleViewItem(item)}
            >
              {/* Image */}
              <div className="relative h-64 bg-gray-800 overflow-hidden">
                <img
                  src={item.image}
                  alt={language === 'en' ? item.title : item.titleLao}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/portfolio/placeholder.jpg'
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white">
                        <Eye size={20} />
                        <span className="font-medium">
                          {language === 'en' ? 'View Project' : 'ເບິ່ງໂປຣເຈັກ'}
                        </span>
                      </div>
                      {item.featured && (
                        <div className="flex items-center gap-1 bg-primary-600 px-2 py-1 rounded-lg">
                          <Star size={14} />
                          <span className="text-xs font-semibold text-white">
                            {language === 'en' ? 'Featured' : 'ເດັ່ນ'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                    {categories.find(cat => cat.id === item.category)?.[language === 'en' ? 'name' : 'nameLao']}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                  {language === 'en' ? item.title : item.titleLao}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {item.client}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {item.year}
                  </div>
                </div>

                <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                  {language === 'en' ? item.description : item.descriptionLao}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-lg">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === 'en' ? 'No projects found' : 'ບໍ່ພົບໂປຣເຈັກ'}
            </h3>
            <p>
              {language === 'en' 
                ? 'Try adjusting your search or filter criteria'
                : 'ລອງປັບການຄົ້ນຫາຫຼືເງື່ອນໄຂການກັ່ນຕອງ'
              }
            </p>
          </div>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {language === 'en' ? selectedItem.title : selectedItem.titleLao}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span>{selectedItem.client}</span>
                    <span>•</span>
                    <span>{selectedItem.year}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Images */}
                  <div>
                    {/* Main Image */}
                    <div className="relative mb-4">
                      <img
                        src={selectedItem.images?.[currentImageIndex] || selectedItem.image}
                        alt={`${selectedItem.title} ${currentImageIndex + 1}`}
                        className="w-full h-80 object-cover rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/portfolio/placeholder.jpg'
                        }}
                      />
                      
                      {/* Navigation */}
                      {selectedItem.images && selectedItem.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                          
                          {/* Image Counter */}
                          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                            {currentImageIndex + 1} / {selectedItem.images.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {selectedItem.images && selectedItem.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {selectedItem.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`relative h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                              currentImageIndex === index
                                ? 'border-primary-400'
                                : 'border-transparent hover:border-gray-600'
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${selectedItem.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/portfolio/placeholder.jpg'
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {language === 'en' ? 'Tags' : 'ແທັກ'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-lg text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {language === 'en' ? 'About This Project' : 'ກ່ຽວກັບໂປຣເຈັກນີ້'}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {language === 'en' ? selectedItem.description : selectedItem.descriptionLao}
                      </p>
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          {language === 'en' ? 'Client' : 'ລູກຄ້າ'}
                        </h4>
                        <p className="text-white font-medium">{selectedItem.client}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          {language === 'en' ? 'Year' : 'ປີ'}
                        </h4>
                        <p className="text-white font-medium">{selectedItem.year}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          {language === 'en' ? 'Category' : 'ປະເພດ'}
                        </h4>
                        <p className="text-white font-medium">
                          {categories.find(cat => cat.id === selectedItem.category)?.[language === 'en' ? 'name' : 'nameLao']}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">
                          {language === 'en' ? 'Status' : 'ສະຖານະ'}
                        </h4>
                        <div className="flex items-center gap-2">
                          {selectedItem.featured && (
                            <div className="flex items-center gap-1 text-primary-400">
                              <Star size={14} />
                              <span className="text-sm font-medium">
                                {language === 'en' ? 'Featured' : 'ເດັ່ນ'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PortfolioGallery 