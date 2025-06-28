import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  FileText,
  MessageSquare,
  Download,
  Eye,
  Calendar,
  AlertCircle,
  Plus,
  Package
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

interface ProjectStatus {
  id: string
  name: string
  status: 'pending' | 'in_progress' | 'review' | 'completed'
  progress: number
  dueDate: string
  type: string
}

interface DashboardStats {
  totalProjects: number
  completedProjects: number
  pendingInvoices: number
  totalSpent: number
}

interface RecentActivity {
  id: string
  type: 'project_update' | 'message' | 'invoice' | 'file'
  title: string
  description: string
  timestamp: string
  read: boolean
}

const ClientDashboard: React.FC = () => {
  const { language } = useLanguage()
  const { user, profile } = useAuth()
  
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    completedProjects: 0,
    pendingInvoices: 0,
    totalSpent: 0
  })
  
  const [projects, setProjects] = useState<ProjectStatus[]>([])
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Sample data - In real app, this would come from API
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStats({
        totalProjects: 8,
        completedProjects: 5,
        pendingInvoices: 2,
        totalSpent: 15670000 // LAK
      })
      
      setProjects([
        {
          id: '1',
          name: language === 'lo' ? 'ໂລໂກ້ ຮ້ານກາເຟ Vientiane' : 'Vientiane Coffee Shop Logo',
          status: 'in_progress',
          progress: 75,
          dueDate: '2024-01-15',
          type: 'logo'
        },
        {
          id: '2',
          name: language === 'lo' ? 'Branding ບໍລິສັດ Tech Lao' : 'Tech Lao Company Branding',
          status: 'review',
          progress: 90,
          dueDate: '2024-01-10',
          type: 'branding'
        },
        {
          id: '3',
          name: language === 'lo' ? 'ໂລໂກ້ ຮ້ານອາຫານ Mekong' : 'Mekong Restaurant Logo',
          status: 'completed',
          progress: 100,
          dueDate: '2023-12-20',
          type: 'logo'
        }
      ])
      
      setActivities([
        {
          id: '1',
          type: 'project_update',
          title: language === 'lo' ? 'ອັບເດດໂຄງການ' : 'Project Update',
          description: language === 'lo' 
            ? 'ໂລໂກ້ Vientiane Coffee ເຂົ້າສູ່ຂັ້ນຕອນ Review'
            : 'Vientiane Coffee logo entered Review stage',
          timestamp: '2024-01-08T10:30:00Z',
          read: false
        },
        {
          id: '2',
          type: 'message',
          title: language === 'lo' ? 'ຂໍ້ຄວາມໃໝ່' : 'New Message',
          description: language === 'lo'
            ? 'ທີມງານ Dotdeep ໄດ້ສົ່ງຂໍ້ຄວາມໃຫ້ທ່ານ'
            : 'Dotdeep team sent you a message',
          timestamp: '2024-01-07T15:45:00Z',
          read: false
        },
        {
          id: '3',
          type: 'file',
          title: language === 'lo' ? 'ໄຟລ໌ໃໝ່' : 'New File',
          description: language === 'lo'
            ? 'ໄຟລ໌ໂລໂກ້ສຳເລັດແລ້ວພ້ອມດາວໂຫລດ'
            : 'Final logo files ready for download',
          timestamp: '2024-01-06T09:15:00Z',
          read: true
        }
      ])
      
      setIsLoading(false)
    }
    
    loadDashboardData()
  }, [language])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'in_progress': return 'text-blue-400 bg-blue-400/10'
      case 'review': return 'text-orange-400 bg-orange-400/10'
      case 'completed': return 'text-green-400 bg-green-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusText = (status: string) => {
    if (language === 'lo') {
      switch (status) {
        case 'pending': return 'ລໍຖ້າ'
        case 'in_progress': return 'ກຳລັງເຮັດ'
        case 'review': return 'ກວດສອບ'
        case 'completed': return 'ສຳເລັດ'
        default: return 'ບໍ່ຮູ້'
      }
    } else {
      switch (status) {
        case 'pending': return 'Pending'
        case 'in_progress': return 'In Progress'
        case 'review': return 'Review'
        case 'completed': return 'Completed'
        default: return 'Unknown'
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project_update': return <TrendingUp size={16} />
      case 'message': return <MessageSquare size={16} />
      case 'invoice': return <DollarSign size={16} />
      case 'file': return <FileText size={16} />
      default: return <AlertCircle size={16} />
    }
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
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">
            {language === 'lo' 
              ? `ສະບາຍດີ, ${profile?.name || user?.email}`
              : `Welcome back, ${profile?.name || user?.email}`
            }
          </h1>
          <p className="text-gray-400 mt-2">
            {language === 'lo' 
              ? 'ນີ້ແມ່ນພາບລວມຂອງໂຄງການທ່ານ'
              : 'Here\'s an overview of your projects'
            }
          </p>
        </div>
        
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-colors"
        >
          <Plus size={20} />
          <span>{language === 'lo' ? 'ໂຄງການໃໝ່' : 'New Project'}</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Package className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ໂຄງການທັງໝົດ' : 'Total Projects'}
              </p>
              <p className="text-2xl font-bold text-white">{stats.totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ສຳເລັດແລ້ວ' : 'Completed'}
              </p>
              <p className="text-2xl font-bold text-white">{stats.completedProjects}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Clock className="text-yellow-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ໃບແຈ້ງໜີ້ຄ້າງ' : 'Pending Invoices'}
              </p>
              <p className="text-2xl font-bold text-white">{stats.pendingInvoices}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-500/10 rounded-lg">
              <DollarSign className="text-primary-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ຈ່າຍທັງໝົດ' : 'Total Spent'}
              </p>
              <p className="text-lg font-bold text-white">{formatCurrency(stats.totalSpent)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {language === 'lo' ? 'ໂຄງການຫຼ້າສຸດ' : 'Recent Projects'}
            </h2>
            <button className="text-primary-400 hover:text-primary-300 text-sm">
              {language === 'lo' ? 'ເບິ່ງທັງໝົດ' : 'View All'}
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{project.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>{language === 'lo' ? 'ປະເພດ:' : 'Type:'} {project.type}</span>
                  <span>{language === 'lo' ? 'ກຳໜົດ:' : 'Due:'} {formatDate(project.dueDate)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-white text-sm font-medium">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            {language === 'lo' ? 'ການເຄື່ອນໄຫວ' : 'Recent Activity'}
          </h2>

          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className={`p-3 rounded-lg border-l-4 ${
                activity.read 
                  ? 'bg-gray-800/30 border-gray-600' 
                  : 'bg-primary-500/10 border-primary-400'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded ${activity.read ? 'text-gray-400' : 'text-primary-400'}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${activity.read ? 'text-gray-300' : 'text-white'}`}>
                      {activity.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {activity.description}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 text-center text-primary-400 hover:text-primary-300 text-sm py-2">
            {language === 'lo' ? 'ເບິ່ງທັງໝົດ' : 'View All Activities'}
          </button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          {language === 'lo' ? 'ການປະຕິບັດໄວ' : 'Quick Actions'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center space-y-3 p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors">
            <MessageSquare className="text-primary-400" size={24} />
            <span className="text-white text-sm">{language === 'lo' ? 'ສົ່ງຂໍ້ຄວາມ' : 'Send Message'}</span>
          </button>

          <button className="flex flex-col items-center space-y-3 p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors">
            <Download className="text-primary-400" size={24} />
            <span className="text-white text-sm">{language === 'lo' ? 'ດາວໂຫລດໄຟລ໌' : 'Download Files'}</span>
          </button>

          <button className="flex flex-col items-center space-y-3 p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors">
            <Eye className="text-primary-400" size={24} />
            <span className="text-white text-sm">{language === 'lo' ? 'ເບິ່ງໃບແຈ້ງໜີ້' : 'View Invoices'}</span>
          </button>

          <button className="flex flex-col items-center space-y-3 p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors">
            <Calendar className="text-primary-400" size={24} />
            <span className="text-white text-sm">{language === 'lo' ? 'ກຳໜົດເວລາ' : 'Schedule Meeting'}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ClientDashboard 