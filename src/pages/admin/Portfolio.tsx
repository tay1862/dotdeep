import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, Search, Star } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { PortfolioItem, SAMPLE_PORTFOLIO } from '../../utils/portfolioData'


const AdminPortfolio: React.FC = () => {
  const { language } = useLanguage()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(SAMPLE_PORTFOLIO)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Form state
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    titleLao: '',
    category: 'logo',
    client: '',
    year: new Date().getFullYear(),
    tags: [],
    description: '',
    descriptionLao: '',
    featured: false
  })

  const filteredItems = portfolioItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.client.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: PortfolioItem = {
      ...formData,
      id: editingItem?.id || Date.now().toString(),
      image: '/images/portfolio/placeholder.jpg',
      images: ['/images/portfolio/placeholder.jpg'],
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as PortfolioItem

    if (editingItem) {
      setPortfolioItems(prev => prev.map(item => 
        item.id === editingItem.id ? newItem : item
      ))
    } else {
      setPortfolioItems(prev => [newItem, ...prev])
    }
    setShowForm(false)
    setEditingItem(null)
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setFormData(item)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this portfolio item?')) {
      setPortfolioItems(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {language === 'en' ? 'Portfolio Management' : 'ຈັດການຜົນງານ'}
          </h1>
          <p className="text-gray-400">
            {language === 'en' ? 'Manage your design portfolio' : 'ຈັດການຜົນງານການອອກແບບ'}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus size={20} />
          {language === 'en' ? 'Add Project' : 'ເພີ່ມໂປຣເຈັກ'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: language === 'en' ? 'Total' : 'ທັງໝົດ', value: portfolioItems.length, color: 'bg-blue-500' },
          { label: language === 'en' ? 'Featured' : 'ເດັ່ນ', value: portfolioItems.filter(i => i.featured).length, color: 'bg-primary-500' },
          { label: language === 'en' ? 'This Year' : 'ປີນີ້', value: portfolioItems.filter(i => i.year === 2024).length, color: 'bg-green-500' },
          { label: language === 'en' ? 'Categories' : 'ປະເພດ', value: 4, color: 'bg-purple-500' }
        ].map((stat, index) => (
          <motion.div key={index} className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl`}></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="glass-card p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={language === 'en' ? 'Search projects...' : 'ຄົ້ນຫາໂປຣເຈັກ...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
          />
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card overflow-hidden group"
          >
            <div className="relative h-48 bg-gray-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.featured && (
                <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                  <Star size={12} />
                  {language === 'en' ? 'Featured' : 'ເດັ່ນ'}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-primary-600 text-white rounded-lg">
                  <Eye size={16} />
                </button>
                <button 
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-blue-600 text-white rounded-lg"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-600 text-white rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {language === 'en' ? item.title : item.titleLao}
              </h3>
              <p className="text-gray-400 text-sm">{item.client} • {item.year}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingItem ? 'Edit Project' : 'Add New Project'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Title (English)"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Project Title (Lao)"
                    value={formData.titleLao}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleLao: e.target.value }))}
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
                    required
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
                  >
                    <option value="logo">Logo Design</option>
                    <option value="branding">Branding</option>
                    <option value="web">Web Design</option>
                    <option value="print">Print Design</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Client Name"
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="featured" className="text-gray-300">
                    Featured Project
                  </label>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-gray-700 text-white rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPortfolio 