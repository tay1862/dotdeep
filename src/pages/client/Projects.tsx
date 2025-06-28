import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Eye,
  Download,
  MessageSquare,
  FileText,
  Star,
  Package,
  Briefcase,
  Palette,
  Zap
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

interface Project {
  id: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'on_hold'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  progress: number
  startDate: string
  dueDate: string
  completedDate?: string
  type: 'logo' | 'branding' | 'web_design' | 'print_design'
  package: 'DOT1' | 'DOT2' | 'DOT3'
  price: number
  files: {
    id: string
    name: string
    type: string
    size: string
    uploadDate: string
  }[]
  lastActivity: string
  isStarred: boolean
}

const ClientProjects: React.FC = () => {
  const { language } = useLanguage()
  
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Sample data - In real app, this would come from API
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const sampleProjects: Project[] = [
        {
          id: '1',
          name: language === 'lo' ? 'ໂລໂກ້ ຮ້ານກາເຟ Vientiane' : 'Vientiane Coffee Shop Logo',
          description: language === 'lo' 
            ? 'ອອກແບບໂລໂກ້ສຳລັບຮ້ານກາເຟ ມີຄວາມທັນສະໄໝ ແລະ ມີເອກະລັກ'
            : 'Modern and unique logo design for coffee shop with warm, inviting aesthetics',
          status: 'in_progress',
          priority: 'high',
          progress: 75,
          startDate: '2023-12-01',
          dueDate: '2024-01-15',
          type: 'logo',
          package: 'DOT2',
          price: 3990000,
          files: [
            { id: '1', name: 'concept-sketches.pdf', type: 'PDF', size: '2.4 MB', uploadDate: '2023-12-05' },
            { id: '2', name: 'color-variations.ai', type: 'AI', size: '15.2 MB', uploadDate: '2023-12-08' }
          ],
          lastActivity: '2024-01-08T10:30:00Z',
          isStarred: true
        },
        {
          id: '2',
          name: language === 'lo' ? 'Branding ບໍລິສັດ Tech Lao' : 'Tech Lao Company Branding',
          description: language === 'lo'
            ? 'ສ້າງຕະຫຼາດການຄ້າທີ່ເຂັ້ມແຂງສຳລັບບໍລິສັດເທັກໂນໂລຊີ'
            : 'Complete branding package for technology company including logo, business cards, and guidelines',
          status: 'review',
          priority: 'urgent',
          progress: 90,
          startDate: '2023-11-15',
          dueDate: '2024-01-10',
          type: 'branding',
          package: 'DOT3',
          price: 5500000,
          files: [
            { id: '3', name: 'brand-guidelines.pdf', type: 'PDF', size: '8.7 MB', uploadDate: '2023-12-20' },
            { id: '4', name: 'logo-final.eps', type: 'EPS', size: '3.1 MB', uploadDate: '2023-12-22' },
            { id: '5', name: 'business-cards.psd', type: 'PSD', size: '45.8 MB', uploadDate: '2023-12-25' }
          ],
          lastActivity: '2024-01-07T15:45:00Z',
          isStarred: false
        },
        {
          id: '3',
          name: language === 'lo' ? 'ໂລໂກ້ ຮ້ານອາຫານ Mekong' : 'Mekong Restaurant Logo',
          description: language === 'lo'
            ? 'ໂລໂກ້ສະແດງວັດທະນະທຳລາວ ສຳລັບຮ້ານອາຫານດັ້ງເດີມ'
            : 'Traditional Lao culture-inspired logo for authentic restaurant',
          status: 'completed',
          priority: 'medium',
          progress: 100,
          startDate: '2023-11-01',
          dueDate: '2023-12-20',
          completedDate: '2023-12-18',
          type: 'logo',
          package: 'DOT1',
          price: 2390000,
          files: [
            { id: '6', name: 'final-logo-package.zip', type: 'ZIP', size: '25.3 MB', uploadDate: '2023-12-18' },
            { id: '7', name: 'usage-guidelines.pdf', type: 'PDF', size: '1.8 MB', uploadDate: '2023-12-18' }
          ],
          lastActivity: '2023-12-18T14:20:00Z',
          isStarred: true
        },
        {
          id: '4',
          name: language === 'lo' ? 'ອອກແບບເວັບໄຊ Startup Lao' : 'Startup Lao Website Design',
          description: language === 'lo'
            ? 'ອອກແບບເວັບໄຊທີ່ທັນສະໄໝສຳລັບ startup ໃໝ່'
            : 'Modern and responsive website design for emerging startup company',
          status: 'pending',
          priority: 'low',
          progress: 15,
          startDate: '2024-01-05',
          dueDate: '2024-02-28',
          type: 'web_design',
          package: 'DOT3',
          price: 5500000,
          files: [
            { id: '8', name: 'wireframes.fig', type: 'FIG', size: '12.4 MB', uploadDate: '2024-01-06' }
          ],
          lastActivity: '2024-01-06T09:15:00Z',
          isStarred: false
        },
        {
          id: '5',
          name: language === 'lo' ? 'ໂບຣຊົວ ບໍລິສັດ ການເງິນ' : 'Finance Company Brochure',
          description: language === 'lo'
            ? 'ອອກແບບໂບຣຊົວສຳລັບບໍລິສັດການເງິນ ດ້ວຍສີສັນທີ່ເໝາະສົມ'
            : 'Professional brochure design for financial services company',
          status: 'on_hold',
          priority: 'medium',
          progress: 45,
          startDate: '2023-12-10',
          dueDate: '2024-01-20',
          type: 'print_design',
          package: 'DOT2',
          price: 3990000,
          files: [
            { id: '9', name: 'brochure-draft.indd', type: 'INDD', size: '28.7 MB', uploadDate: '2023-12-15' }
          ],
          lastActivity: '2023-12-16T11:30:00Z',
          isStarred: false
        }
      ]
      
      setProjects(sampleProjects)
      setFilteredProjects(sampleProjects)
      setIsLoading(false)
    }
    
    loadProjects()
  }, [language])

  // Filter and search logic
  useEffect(() => {
    let filtered = projects

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter)
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(project => project.type === typeFilter)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProjects(filtered)
  }, [projects, statusFilter, typeFilter, searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'in_progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      case 'review': return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'on_hold': return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getStatusText = (status: string) => {
    if (language === 'lo') {
      switch (status) {
        case 'pending': return 'ລໍຖ້າ'
        case 'in_progress': return 'ກຳລັງເຮັດ'
        case 'review': return 'ກວດສອບ'
        case 'completed': return 'ສຳເລັດ'
        case 'on_hold': return 'ຢຸດຊົ່ວຄາວ'
        default: return 'ບໍ່ຮູ້'
      }
    } else {
      switch (status) {
        case 'pending': return 'Pending'
        case 'in_progress': return 'In Progress'
        case 'review': return 'Review'
        case 'completed': return 'Completed'
        case 'on_hold': return 'On Hold'
        default: return 'Unknown'
      }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-orange-400'
      case 'urgent': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getPriorityText = (priority: string) => {
    if (language === 'lo') {
      switch (priority) {
        case 'low': return 'ຕ່ຳ'
        case 'medium': return 'ປານກາງ'
        case 'high': return 'ສູງ'
        case 'urgent': return 'ດ່ວນ'
        default: return 'ບໍ່ຮູ້'
      }
    } else {
      switch (priority) {
        case 'low': return 'Low'
        case 'medium': return 'Medium'
        case 'high': return 'High'
        case 'urgent': return 'Urgent'
        default: return 'Unknown'
      }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'logo': return <Zap className="text-primary-400" size={20} />
      case 'branding': return <Briefcase className="text-blue-400" size={20} />
      case 'web_design': return <Package className="text-green-400" size={20} />
      case 'print_design': return <Palette className="text-purple-400" size={20} />
      default: return <FileText className="text-gray-400" size={20} />
    }
  }

  const getTypeText = (type: string) => {
    if (language === 'lo') {
      switch (type) {
        case 'logo': return 'ໂລໂກ້'
        case 'branding': return 'ຕະຫຼາດການຄ້າ'
        case 'web_design': return 'ອອກແບບເວັບ'
        case 'print_design': return 'ອອກແບບພິມ'
        default: return 'ອື່ນໆ'
      }
    } else {
      switch (type) {
        case 'logo': return 'Logo Design'
        case 'branding': return 'Branding'
        case 'web_design': return 'Web Design'
        case 'print_design': return 'Print Design'
        default: return 'Other'
      }
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lo-LA').format(amount) + ' ກີບ'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === 'lo' ? 'lo-LA' : 'en-US').format(date)
  }

  const formatFileSize = (size: string) => {
    return size
  }

  const toggleStar = (projectId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? { ...project, isStarred: !project.isStarred } : project
      )
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">
            {language === 'lo' ? 'ໂຄງການຂອງຂ້ອຍ' : 'My Projects'}
          </h1>
          <p className="text-gray-400 mt-2">
            {language === 'lo' 
              ? `ທ່ານມີ ${projects.length} ໂຄງການທັງໝົດ`
              : `You have ${projects.length} projects total`
            }
          </p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'lo' ? 'ຄົ້ນຫາໂຄງການ...' : 'Search projects...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-400 appearance-none"
            >
              <option value="all">{language === 'lo' ? 'ສະຖານະທັງໝົດ' : 'All Status'}</option>
              <option value="pending">{language === 'lo' ? 'ລໍຖ້າ' : 'Pending'}</option>
              <option value="in_progress">{language === 'lo' ? 'ກຳລັງເຮັດ' : 'In Progress'}</option>
              <option value="review">{language === 'lo' ? 'ກວດສອບ' : 'Review'}</option>
              <option value="completed">{language === 'lo' ? 'ສຳເລັດ' : 'Completed'}</option>
              <option value="on_hold">{language === 'lo' ? 'ຢຸດຊົ່ວຄາວ' : 'On Hold'}</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-400 appearance-none"
            >
              <option value="all">{language === 'lo' ? 'ປະເພດທັງໝົດ' : 'All Types'}</option>
              <option value="logo">{language === 'lo' ? 'ໂລໂກ້' : 'Logo Design'}</option>
              <option value="branding">{language === 'lo' ? 'ຕະຫຼາດການຄ້າ' : 'Branding'}</option>
              <option value="web_design">{language === 'lo' ? 'ອອກແບບເວັບ' : 'Web Design'}</option>
              <option value="print_design">{language === 'lo' ? 'ອອກແບບພິມ' : 'Print Design'}</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center text-gray-400">
            {language === 'lo' 
              ? `ພົບ ${filteredProjects.length} ໂຄງການ`
              : `${filteredProjects.length} projects found`
            }
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="glass-card p-6 hover:bg-gray-800/30 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getTypeIcon(project.type)}
                <div>
                  <h3 className="text-white font-semibold text-lg truncate" title={project.name}>
                    {project.name.length > 25 ? project.name.substring(0, 25) + '...' : project.name}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {getTypeText(project.type)} • {project.package}
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleStar(project.id)
                }}
                className={`p-2 rounded-lg transition-colors ${
                  project.isStarred 
                    ? 'text-yellow-400 bg-yellow-400/10' 
                    : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                }`}
              >
                <Star size={16} fill={project.isStarred ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Status and Priority */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
              <span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                {getPriorityText(project.priority)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">
                  {language === 'lo' ? 'ຄວາມຄືບໜ້າ' : 'Progress'}
                </span>
                <span className="text-white text-sm font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-400">
              <div>
                <span className="block">{language === 'lo' ? 'ເລີ່ມ:' : 'Start:'}</span>
                <span className="text-white">{formatDate(project.startDate)}</span>
              </div>
              <div>
                <span className="block">{language === 'lo' ? 'ກຳໜົດ:' : 'Due:'}</span>
                <span className={`${new Date(project.dueDate) < new Date() && project.status !== 'completed' ? 'text-red-400' : 'text-white'}`}>
                  {formatDate(project.dueDate)}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-primary-400 font-semibold">
                {formatCurrency(project.price)}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center space-x-2 bg-primary-600/20 text-primary-400 py-2 px-3 rounded-lg hover:bg-primary-600/30 transition-colors text-sm"
              >
                <Eye size={14} />
                <span>{language === 'lo' ? 'ເບິ່ງ' : 'View'}</span>
              </button>
              
              {project.files.length > 0 && (
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center space-x-2 bg-gray-600/20 text-gray-400 py-2 px-3 rounded-lg hover:bg-gray-600/30 transition-colors text-sm"
                >
                  <Download size={14} />
                  <span>{project.files.length}</span>
                </button>
              )}
              
              <button 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center bg-gray-600/20 text-gray-400 py-2 px-3 rounded-lg hover:bg-gray-600/30 transition-colors"
              >
                <MessageSquare size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-white mb-2">
            {language === 'lo' ? 'ບໍ່ພົບໂຄງການ' : 'No Projects Found'}
          </h3>
          <p className="text-gray-400 mb-6">
            {language === 'lo' 
              ? 'ລອງປ່ຽນການຄົ້ນຫາ ຫຼື ຕັ້ງຄ່າການກັ່ນຕອງ'
              : 'Try adjusting your search or filter settings'
            }
          </p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setStatusFilter('all')
              setTypeFilter('all')
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            {language === 'lo' ? 'ລ້າງການຄົ້ນຫາ' : 'Clear Filters'}
          </button>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                {getTypeIcon(selectedProject.type)}
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedProject.name}</h2>
                  <p className="text-gray-400">{getTypeText(selectedProject.type)} • {selectedProject.package}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white p-2"
              >
                ✕
              </button>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {language === 'lo' ? 'ລາຍລະອຽດ' : 'Description'}
                  </h3>
                  <p className="text-gray-300">{selectedProject.description}</p>
                </div>

                {/* Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {language === 'lo' ? 'ຄວາມຄືບໜ້າ' : 'Progress'}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">{selectedProject.progress}% {language === 'lo' ? 'ສຳເລັດ' : 'Complete'}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedProject.status)}`}>
                      {getStatusText(selectedProject.status)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-primary-400 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Files */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {language === 'lo' ? 'ໄຟລ໌' : 'Files'} ({selectedProject.files.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="text-gray-400" size={20} />
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-gray-400 text-sm">{file.type} • {formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button className="text-primary-400 hover:text-primary-300 p-2">
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {language === 'lo' ? 'ຂໍ້ມູນໂຄງການ' : 'Project Info'}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ຄວາມສຳຄັນ:' : 'Priority:'}</span>
                      <span className={`font-medium ${getPriorityColor(selectedProject.priority)}`}>
                        {getPriorityText(selectedProject.priority)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ລາຄາ:' : 'Price:'}</span>
                      <span className="text-primary-400 font-medium">{formatCurrency(selectedProject.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ເລີ່ມ:' : 'Start Date:'}</span>
                      <span className="text-white">{formatDate(selectedProject.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ກຳໜົດ:' : 'Due Date:'}</span>
                      <span className={`${new Date(selectedProject.dueDate) < new Date() && selectedProject.status !== 'completed' ? 'text-red-400' : 'text-white'}`}>
                        {formatDate(selectedProject.dueDate)}
                      </span>
                    </div>
                    {selectedProject.completedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{language === 'lo' ? 'ສຳເລັດ:' : 'Completed:'}</span>
                        <span className="text-green-400">{formatDate(selectedProject.completedDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition-colors">
                    <MessageSquare className="inline mr-2" size={16} />
                    {language === 'lo' ? 'ສົ່ງຂໍ້ຄວາມ' : 'Send Message'}
                  </button>
                  
                  {selectedProject.files.length > 0 && (
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors">
                      <Download className="inline mr-2" size={16} />
                      {language === 'lo' ? 'ດາວໂຫລດໄຟລ໌' : 'Download Files'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ClientProjects 