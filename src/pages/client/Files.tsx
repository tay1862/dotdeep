import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Search, 
  Filter, 
  FileText, 
  Archive, 
  Eye,
  Calendar,
  Folder,
  Grid3X3,
  List,
  ArrowDownToLine,
  Star,
  CheckCircle,
  FileImage,
  FileCode,
  FileArchive,
  File as FileIcon,
  FolderOpen,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

interface FileItem {
  id: string
  name: string
  type: 'pdf' | 'image' | 'vector' | 'archive' | 'document' | 'other'
  extension: string
  size: string
  sizeBytes: number
  uploadDate: string
  downloadCount: number
  projectId: string
  projectName: string
  category: 'final' | 'draft' | 'source' | 'reference'
  isStarred: boolean
  description?: string
  tags: string[]
  previewUrl?: string
}

const ClientFiles: React.FC = () => {
  const { language } = useLanguage()
  
  const [files, setFiles] = useState<FileItem[]>([])
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'downloads'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  // Sample data - In real app, this would come from API
  useEffect(() => {
    const loadFiles = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const sampleFiles: FileItem[] = [
        {
          id: '1',
          name: 'Vientiane-Coffee-Logo-Final',
          type: 'vector',
          extension: 'ai',
          size: '15.2 MB',
          sizeBytes: 15939584,
          uploadDate: '2024-01-08T10:30:00Z',
          downloadCount: 5,
          projectId: '1',
          projectName: language === 'lo' ? 'ໂລໂກ້ ຮ້ານກາເຟ Vientiane' : 'Vientiane Coffee Shop Logo',
          category: 'final',
          isStarred: true,
          description: language === 'lo' 
            ? 'ໄຟລ໌ໂລໂກ້ສຳເລັດຮູບສຳລັບການນຳໃຊ້'
            : 'Final logo file ready for production use',
          tags: ['logo', 'vector', 'final', 'ai'],
          previewUrl: '/images/portfolio/vientiane-coffee.jpg'
        },
        {
          id: '2',
          name: 'Vientiane-Coffee-Brand-Guidelines',
          type: 'pdf',
          extension: 'pdf',
          size: '8.7 MB',
          sizeBytes: 9123840,
          uploadDate: '2024-01-08T10:25:00Z',
          downloadCount: 3,
          projectId: '1',
          projectName: language === 'lo' ? 'ໂລໂກ້ ຮ້ານກາເຟ Vientiane' : 'Vientiane Coffee Shop Logo',
          category: 'final',
          isStarred: false,
          description: language === 'lo'
            ? 'ຄູ່ມືການນຳໃຊ້ໂລໂກ້ ແລະ ແບຣນດິ້ງ'
            : 'Complete brand guidelines and logo usage instructions',
          tags: ['guidelines', 'brand', 'pdf']
        },
        {
          id: '3',
          name: 'Tech-Lao-Logo-Package',
          type: 'archive',
          extension: 'zip',
          size: '125.3 MB',
          sizeBytes: 131457280,
          uploadDate: '2024-01-07T15:45:00Z',
          downloadCount: 12,
          projectId: '2',
          projectName: language === 'lo' ? 'Branding ບໍລິສັດ Tech Lao' : 'Tech Lao Company Branding',
          category: 'final',
          isStarred: true,
          description: language === 'lo'
            ? 'ຊຸດໄຟລ໌ໂລໂກ້ທັງໝົດລວມທຸກຮູບແບບ'
            : 'Complete logo package with all formats and variations',
          tags: ['logo', 'package', 'branding', 'complete']
        },
        {
          id: '4',
          name: 'Mekong-Restaurant-Final-Logo',
          type: 'image',
          extension: 'png',
          size: '2.4 MB',
          sizeBytes: 2516582,
          uploadDate: '2023-12-18T14:20:00Z',
          downloadCount: 8,
          projectId: '3',
          projectName: language === 'lo' ? 'ໂລໂກ້ ຮ້ານອາຫານ Mekong' : 'Mekong Restaurant Logo',
          category: 'final',
          isStarred: false,
          description: language === 'lo'
            ? 'ໂລໂກ້ສຳເລັດຮູບ PNG ໂປ່ງໃສ'
            : 'Final logo in PNG format with transparent background',
          tags: ['logo', 'png', 'transparent', 'final'],
          previewUrl: '/images/portfolio/mekong-restaurant.jpg'
        },
        {
          id: '5',
          name: 'Startup-Lao-Wireframes',
          type: 'other',
          extension: 'fig',
          size: '12.4 MB',
          sizeBytes: 12998656,
          uploadDate: '2024-01-06T09:15:00Z',
          downloadCount: 2,
          projectId: '4',
          projectName: language === 'lo' ? 'ອອກແບບເວັບໄຊ Startup Lao' : 'Startup Lao Website Design',
          category: 'draft',
          isStarred: false,
          description: language === 'lo'
            ? 'ແຜນຜັງເວັບໄຊທ໌ສຳລັບການອອກແບບ'
            : 'Website wireframes and design mockups',
          tags: ['wireframes', 'design', 'web', 'figma']
        },
        {
          id: '6',
          name: 'Finance-Company-Brochure-Draft',
          type: 'document',
          extension: 'indd',
          size: '28.7 MB',
          sizeBytes: 30081024,
          uploadDate: '2023-12-16T11:30:00Z',
          downloadCount: 1,
          projectId: '5',
          projectName: language === 'lo' ? 'ໂບຣຊົວ ບໍລິສັດ ການເງິນ' : 'Finance Company Brochure',
          category: 'draft',
          isStarred: false,
          description: language === 'lo'
            ? 'ຮ່າງໂບຣຊົວບໍລິສັດການເງິນ'
            : 'Draft version of company brochure design',
          tags: ['brochure', 'draft', 'indesign']
        },
        {
          id: '7',
          name: 'Color-Palette-Reference',
          type: 'image',
          extension: 'jpg',
          size: '1.8 MB',
          sizeBytes: 1887436,
          uploadDate: '2024-01-05T16:20:00Z',
          downloadCount: 4,
          projectId: '1',
          projectName: language === 'lo' ? 'ໂລໂກ້ ຮ້ານກາເຟ Vientiane' : 'Vientiane Coffee Shop Logo',
          category: 'reference',
          isStarred: false,
          description: language === 'lo'
            ? 'ແປ້ງສີສຳລັບການອ້າງອີງ'
            : 'Color palette reference for brand consistency',
          tags: ['colors', 'reference', 'palette']
        },
        {
          id: '8',
          name: 'Logo-Concepts-Initial',
          type: 'pdf',
          extension: 'pdf',
          size: '5.2 MB',
          sizeBytes: 5452595,
          uploadDate: '2023-12-05T08:15:00Z',
          downloadCount: 6,
          projectId: '1',
          projectName: language === 'lo' ? 'ໂລໂກ້ ຮ້ານກາເຟ Vientiane' : 'Vientiane Coffee Shop Logo',
          category: 'source',
          isStarred: false,
          description: language === 'lo'
            ? 'ແນວຄິດເບື້ອງຕົ້ນຂອງໂລໂກ້'
            : 'Initial logo concepts and sketches',
          tags: ['concepts', 'sketches', 'initial']
        }
      ]
      
      setFiles(sampleFiles)
      setFilteredFiles(sampleFiles)
      setIsLoading(false)
    }
    
    loadFiles()
  }, [language])

  // Filter and search logic
  useEffect(() => {
    let filtered = files

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(file => file.type === typeFilter)
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(file => file.category === categoryFilter)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'date':
          comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
          break
        case 'size':
          comparison = a.sizeBytes - b.sizeBytes
          break
        case 'downloads':
          comparison = a.downloadCount - b.downloadCount
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    setFilteredFiles(filtered)
  }, [files, typeFilter, categoryFilter, searchTerm, sortBy, sortOrder])

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-400" size={24} />
      case 'image': return <FileImage className="text-green-400" size={24} />
      case 'vector': return <FileCode className="text-purple-400" size={24} />
      case 'archive': return <FileArchive className="text-yellow-400" size={24} />
      case 'document': return <FileText className="text-blue-400" size={24} />
      default: return <FileIcon className="text-gray-400" size={24} />
    }
  }

  const getFileIconSmall = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-400" size={16} />
      case 'image': return <FileImage className="text-green-400" size={16} />
      case 'vector': return <FileCode className="text-purple-400" size={16} />
      case 'archive': return <FileArchive className="text-yellow-400" size={16} />
      case 'document': return <FileText className="text-blue-400" size={16} />
      default: return <FileIcon className="text-gray-400" size={16} />
    }
  }

  const getCategoryText = (category: string) => {
    if (language === 'lo') {
      switch (category) {
        case 'final': return 'ສຳເລັດ'
        case 'draft': return 'ຮ່າງ'
        case 'source': return 'ຕົ້ນສະບັບ'
        case 'reference': return 'ອ້າງອີງ'
        default: return 'ອື່ນໆ'
      }
    } else {
      switch (category) {
        case 'final': return 'Final'
        case 'draft': return 'Draft'
        case 'source': return 'Source'
        case 'reference': return 'Reference'
        default: return 'Other'
      }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'final': return 'text-green-400 bg-green-400/10'
      case 'draft': return 'text-orange-400 bg-orange-400/10'
      case 'source': return 'text-blue-400 bg-blue-400/10'
      case 'reference': return 'text-purple-400 bg-purple-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === 'lo' ? 'lo-LA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const toggleStar = (fileId: string) => {
    setFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, isStarred: !file.isStarred } : file
      )
    )
  }

  const handleDownload = (file: FileItem) => {
    // In real app, this would trigger actual download
    console.log('Downloading file:', file.name)
    
    // Update download count
    setFiles(prevFiles =>
      prevFiles.map(f =>
        f.id === file.id ? { ...f, downloadCount: f.downloadCount + 1 } : f
      )
    )
  }

  const totalFiles = files.length
  const totalSize = files.reduce((sum, file) => sum + file.sizeBytes, 0)
  const formatTotalSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return mb > 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${mb.toFixed(1)} MB`
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
            {language === 'lo' ? 'ໄຟລ໌ຂອງຂ້ອຍ' : 'My Files'}
          </h1>
          <p className="text-gray-400 mt-2">
            {language === 'lo' 
              ? `ທ່ານມີ ${totalFiles} ໄຟລ໌ທັງໝົດ (${formatTotalSize(totalSize)})`
              : `You have ${totalFiles} files total (${formatTotalSize(totalSize)})`
            }
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Grid3X3 size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <FolderOpen className="text-primary-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ໄຟລ໌ທັງໝົດ' : 'Total Files'}
              </p>
              <p className="text-xl font-bold text-white">{totalFiles}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ໄຟລ໌ສຳເລັດ' : 'Final Files'}
              </p>
              <p className="text-xl font-bold text-white">
                {files.filter(f => f.category === 'final').length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <ArrowDownToLine className="text-blue-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ດາວໂຫລດ' : 'Downloads'}
              </p>
              <p className="text-xl font-bold text-white">
                {files.reduce((sum, f) => sum + f.downloadCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <Archive className="text-yellow-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ຂະໜາດລວມ' : 'Total Size'}
              </p>
              <p className="text-xl font-bold text-white">{formatTotalSize(totalSize)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'lo' ? 'ຄົ້ນຫາໄຟລ໌...' : 'Search files...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-400 appearance-none"
            >
              <option value="all">{language === 'lo' ? 'ປະເພດທັງໝົດ' : 'All Types'}</option>
              <option value="pdf">PDF</option>
              <option value="image">{language === 'lo' ? 'ຮູບພາບ' : 'Images'}</option>
              <option value="vector">{language === 'lo' ? 'Vector' : 'Vector'}</option>
              <option value="archive">{language === 'lo' ? 'ຟາຍອາຄີບ' : 'Archives'}</option>
              <option value="document">{language === 'lo' ? 'ເອກະສານ' : 'Documents'}</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-400 appearance-none"
            >
              <option value="all">{language === 'lo' ? 'ໝວດທັງໝົດ' : 'All Categories'}</option>
              <option value="final">{language === 'lo' ? 'ສຳເລັດ' : 'Final'}</option>
              <option value="draft">{language === 'lo' ? 'ຮ່າງ' : 'Draft'}</option>
              <option value="source">{language === 'lo' ? 'ຕົ້ນສະບັບ' : 'Source'}</option>
              <option value="reference">{language === 'lo' ? 'ອ້າງອີງ' : 'Reference'}</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-400 appearance-none"
            >
              <option value="date">{language === 'lo' ? 'ວັນທີ' : 'Date'}</option>
              <option value="name">{language === 'lo' ? 'ຊື່' : 'Name'}</option>
              <option value="size">{language === 'lo' ? 'ຂະໜາດ' : 'Size'}</option>
              <option value="downloads">{language === 'lo' ? 'ດາວໂຫລດ' : 'Downloads'}</option>
            </select>
          </div>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center justify-center bg-gray-800/50 border border-gray-700 rounded-xl text-white hover:bg-gray-700/50 transition-colors"
          >
            {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
          </button>
        </div>

        <div className="mt-4 text-center text-gray-400 text-sm">
          {language === 'lo' 
            ? `ພົບ ${filteredFiles.length} ໄຟລ໌`
            : `${filteredFiles.length} files found`
          }
        </div>
      </motion.div>

      {/* Files Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card p-6 hover:bg-gray-800/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedFile(file)}
              >
                {/* File Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate" title={file.name}>
                        {file.name}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {file.extension.toUpperCase()} • {file.size}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStar(file.id)
                    }}
                    className={`p-1 rounded transition-colors ${
                      file.isStarred 
                        ? 'text-yellow-400' 
                        : 'text-gray-400 hover:text-yellow-400'
                    }`}
                  >
                    <Star size={14} fill={file.isStarred ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(file.category)}`}>
                    {getCategoryText(file.category)}
                  </span>
                </div>

                {/* Project Info */}
                <div className="mb-3">
                  <p className="text-gray-400 text-xs mb-1">
                    {language === 'lo' ? 'ໂຄງການ:' : 'Project:'}
                  </p>
                  <p className="text-white text-xs truncate" title={file.projectName}>
                    {file.projectName.length > 30 ? file.projectName.substring(0, 30) + '...' : file.projectName}
                  </p>
                </div>

                {/* Date and Downloads */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>{formatDate(file.uploadDate)}</span>
                  <span>{file.downloadCount} {language === 'lo' ? 'ດາວໂຫລດ' : 'downloads'}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(file)
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 bg-primary-600/20 text-primary-400 py-2 px-3 rounded-lg hover:bg-primary-600/30 transition-colors text-sm"
                  >
                    <Download size={14} />
                    <span>{language === 'lo' ? 'ດາວໂຫລດ' : 'Download'}</span>
                  </button>
                  
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center bg-gray-600/20 text-gray-400 py-2 px-3 rounded-lg hover:bg-gray-600/30 transition-colors"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      {language === 'lo' ? 'ຊື່ໄຟລ໌' : 'File Name'}
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      {language === 'lo' ? 'ໂຄງການ' : 'Project'}
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      {language === 'lo' ? 'ໝວດໝູ່' : 'Category'}
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      {language === 'lo' ? 'ຂະໜາດ' : 'Size'}
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      {language === 'lo' ? 'ວັນທີ' : 'Date'}
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      {language === 'lo' ? 'ດາວໂຫລດ' : 'Downloads'}
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      {language === 'lo' ? 'ການປະຕິບັດ' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file, index) => (
                    <motion.tr
                      key={file.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          {getFileIconSmall(file.type)}
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-gray-400 text-sm">{file.extension.toUpperCase()}</p>
                          </div>
                          {file.isStarred && (
                            <Star size={12} className="text-yellow-400" fill="currentColor" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-white text-sm">{file.projectName}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(file.category)}`}>
                          {getCategoryText(file.category)}
                        </span>
                      </td>
                      <td className="p-4 text-gray-300 text-sm">{file.size}</td>
                      <td className="p-4 text-gray-300 text-sm">{formatDate(file.uploadDate)}</td>
                      <td className="p-4 text-gray-300 text-sm">{file.downloadCount}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleDownload(file)}
                            className="p-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600/30 transition-colors"
                          >
                            <Download size={14} />
                          </button>
                          <button 
                            onClick={() => setSelectedFile(file)}
                            className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
                          >
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FolderOpen className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-white mb-2">
            {language === 'lo' ? 'ບໍ່ພົບໄຟລ໌' : 'No Files Found'}
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
              setTypeFilter('all')
              setCategoryFilter('all')
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            {language === 'lo' ? 'ລ້າງການຄົ້ນຫາ' : 'Clear Filters'}
          </button>
        </motion.div>
      )}

      {/* File Detail Modal */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFile(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedFile.type)}
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedFile.name}</h2>
                  <p className="text-gray-400">{selectedFile.extension.toUpperCase()} • {selectedFile.size}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-white p-2"
              >
                ✕
              </button>
            </div>

            {/* File Details */}
            <div className="space-y-6">
              {/* Description */}
              {selectedFile.description && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {language === 'lo' ? 'ລາຍລະອຽດ' : 'Description'}
                  </h3>
                  <p className="text-gray-300">{selectedFile.description}</p>
                </div>
              )}

              {/* File Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {language === 'lo' ? 'ຂໍ້ມູນໄຟລ໌' : 'File Info'}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ໝວດໝູ່:' : 'Category:'}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(selectedFile.category)}`}>
                        {getCategoryText(selectedFile.category)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ຂະໜາດ:' : 'Size:'}</span>
                      <span className="text-white">{selectedFile.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ອັບໂຫລດ:' : 'Uploaded:'}</span>
                      <span className="text-white">{formatDate(selectedFile.uploadDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ດາວໂຫລດ:' : 'Downloads:'}</span>
                      <span className="text-white">{selectedFile.downloadCount}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {language === 'lo' ? 'ໂຄງການ' : 'Project'}
                  </h3>
                  <p className="text-gray-300 text-sm">{selectedFile.projectName}</p>
                  
                  {selectedFile.tags.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-white font-medium mb-2">
                        {language === 'lo' ? 'ແທັກ' : 'Tags'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
                <button 
                  onClick={() => handleDownload(selectedFile)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>{language === 'lo' ? 'ດາວໂຫລດ' : 'Download'}</span>
                </button>
                
                <button 
                  onClick={() => toggleStar(selectedFile.id)}
                  className={`p-3 rounded-lg transition-colors ${
                    selectedFile.isStarred 
                      ? 'bg-yellow-400/20 text-yellow-400' 
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Star size={16} fill={selectedFile.isStarred ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ClientFiles 