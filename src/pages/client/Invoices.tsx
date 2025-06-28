import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Search, 
  Filter,
  Eye,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  CreditCard,
  FileText,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

interface Invoice {
  id: string
  number: string
  projectId: string
  projectName: string
  amount: number
  tax: number
  total: number
  currency: 'LAK' | 'USD'
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled'
  issueDate: string
  dueDate: string
  paidDate?: string
  description: string
  items: {
    id: string
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  paymentMethod?: string
  notes?: string
}

const ClientInvoices: React.FC = () => {
  const { language } = useLanguage()
  
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  // Sample data
  useEffect(() => {
    const loadInvoices = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const sampleInvoices: Invoice[] = [
        {
          id: '1',
          number: 'INV-2024-001',
          projectId: '1',
          projectName: language === 'lo' ? 'ໂລໂກ້ ຮ້ານກາເຟ Vientiane' : 'Vientiane Coffee Shop Logo',
          amount: 3990000,
          tax: 399000,
          total: 4389000,
          currency: 'LAK',
          status: 'paid',
          issueDate: '2024-01-01T00:00:00Z',
          dueDate: '2024-01-15T00:00:00Z',
          paidDate: '2024-01-10T00:00:00Z',
          description: language === 'lo' ? 'ອອກແບບໂລໂກ້ແລະຄູ່ມືການນຳໃຊ້' : 'Logo design and usage guidelines',
          items: [
            {
              id: '1',
              description: language === 'lo' ? 'ອອກແບບໂລໂກ້ DOT2' : 'Logo Design DOT2 Package',
              quantity: 1,
              unitPrice: 3990000,
              total: 3990000
            }
          ],
          paymentMethod: 'Bank Transfer',
          notes: language === 'lo' ? 'ຂອບໃຈສຳລັບການຮ່ວມມື' : 'Thank you for your business!'
        },
        {
          id: '2',
          number: 'INV-2024-002',
          projectId: '2',
          projectName: language === 'lo' ? 'Branding ບໍລິສັດ Tech Lao' : 'Tech Lao Company Branding',
          amount: 5500000,
          tax: 550000,
          total: 6050000,
          currency: 'LAK',
          status: 'sent',
          issueDate: '2024-01-05T00:00:00Z',
          dueDate: '2024-01-20T00:00:00Z',
          description: language === 'lo' ? 'ຊຸດອອກແບບຕະຫຼາດການຄ້າ' : 'Complete branding package',
          items: [
            {
              id: '1',
              description: language === 'lo' ? 'ອອກແບບຕະຫຼາດການຄ້າ DOT3' : 'Branding Design DOT3 Package',
              quantity: 1,
              unitPrice: 5500000,
              total: 5500000
            }
          ]
        },
        {
          id: '3',
          number: 'INV-2024-003',
          projectId: '5',
          projectName: language === 'lo' ? 'ໂບຣຊົວ ບໍລິສັດ ການເງິນ' : 'Finance Company Brochure',
          amount: 3990000,
          tax: 399000,
          total: 4389000,
          currency: 'LAK',
          status: 'overdue',
          issueDate: '2023-12-15T00:00:00Z',
          dueDate: '2023-12-30T00:00:00Z',
          description: language === 'lo' ? 'ອອກແບບໂບຣຊົວສຳລັບບໍລິສັດ' : 'Professional brochure design',
          items: [
            {
              id: '1',
              description: language === 'lo' ? 'ອອກແບບໂບຣຊົວ DOT2' : 'Brochure Design DOT2 Package',
              quantity: 1,
              unitPrice: 3990000,
              total: 3990000
            }
          ]
        }
      ]
      
      setInvoices(sampleInvoices)
      setFilteredInvoices(sampleInvoices)
      setIsLoading(false)
    }
    
    loadInvoices()
  }, [language])

  // Filter invoices
  useEffect(() => {
    let filtered = invoices

    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredInvoices(filtered)
  }, [invoices, statusFilter, searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
      case 'sent': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      case 'viewed': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'paid': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'overdue': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'cancelled': return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getStatusText = (status: string) => {
    if (language === 'lo') {
      switch (status) {
        case 'draft': return 'ຮ່າງ'
        case 'sent': return 'ສົ່ງແລ້ວ'
        case 'viewed': return 'ເບິ່ງແລ້ວ'
        case 'paid': return 'ຈ່າຍແລ້ວ'
        case 'overdue': return 'ເກີນກຳໜົດ'
        case 'cancelled': return 'ຍົກເລີກ'
        default: return 'ບໍ່ຮູ້'
      }
    } else {
      switch (status) {
        case 'draft': return 'Draft'
        case 'sent': return 'Sent'
        case 'viewed': return 'Viewed'
        case 'paid': return 'Paid'
        case 'overdue': return 'Overdue'
        case 'cancelled': return 'Cancelled'
        default: return 'Unknown'
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="text-gray-400" size={16} />
      case 'sent': return <ArrowRight className="text-blue-400" size={16} />
      case 'viewed': return <Eye className="text-yellow-400" size={16} />
      case 'paid': return <CheckCircle className="text-green-400" size={16} />
      case 'overdue': return <AlertCircle className="text-red-400" size={16} />
      case 'cancelled': return <XCircle className="text-gray-400" size={16} />
      default: return <Clock className="text-gray-400" size={16} />
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'LAK') {
      return new Intl.NumberFormat('lo-LA').format(amount) + ' ກີບ'
    } else {
      return '$' + new Intl.NumberFormat('en-US').format(amount)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === 'lo' ? 'lo-LA' : 'en-US').format(date)
  }

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0)
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.total, 0)
  const pendingAmount = invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'cancelled').reduce((sum, invoice) => sum + invoice.total, 0)

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
            {language === 'lo' ? 'ໃບແຈ້ງໜີ້' : 'Invoices'}
          </h1>
          <p className="text-gray-400 mt-2">
            {language === 'lo' 
              ? `ທ່ານມີ ${invoices.length} ໃບແຈ້ງໜີ້ທັງໝົດ`
              : `You have ${invoices.length} invoices total`
            }
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3">
            <DollarSign className="text-blue-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ລວມທັງໝົດ' : 'Total Amount'}
              </p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalAmount, 'LAK')}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ຈ່າຍແລ້ວ' : 'Paid'}
              </p>
              <p className="text-xl font-bold text-white">{formatCurrency(paidAmount, 'LAK')}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-3">
            <Clock className="text-orange-400" size={24} />
            <div>
              <p className="text-gray-400 text-sm">
                {language === 'lo' ? 'ລໍຖ້າຈ່າຍ' : 'Pending'}
              </p>
              <p className="text-xl font-bold text-white">{formatCurrency(pendingAmount, 'LAK')}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'lo' ? 'ຄົ້ນຫາໃບແຈ້ງໜີ້...' : 'Search invoices...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-400 appearance-none"
            >
              <option value="all">{language === 'lo' ? 'ສະຖານະທັງໝົດ' : 'All Status'}</option>
              <option value="draft">{language === 'lo' ? 'ຮ່າງ' : 'Draft'}</option>
              <option value="sent">{language === 'lo' ? 'ສົ່ງແລ້ວ' : 'Sent'}</option>
              <option value="viewed">{language === 'lo' ? 'ເບິ່ງແລ້ວ' : 'Viewed'}</option>
              <option value="paid">{language === 'lo' ? 'ຈ່າຍແລ້ວ' : 'Paid'}</option>
              <option value="overdue">{language === 'lo' ? 'ເກີນກຳໜົດ' : 'Overdue'}</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-400 text-sm">
          {language === 'lo' 
            ? `ພົບ ${filteredInvoices.length} ໃບແຈ້ງໜີ້`
            : `${filteredInvoices.length} invoices found`
          }
        </div>
      </motion.div>

      {/* Invoices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">
                  {language === 'lo' ? 'ເລກທີ' : 'Invoice #'}
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  {language === 'lo' ? 'ໂຄງການ' : 'Project'}
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  {language === 'lo' ? 'ຈຳນວນເງິນ' : 'Amount'}
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  {language === 'lo' ? 'ສະຖານະ' : 'Status'}
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  {language === 'lo' ? 'ວັນທີກຳໜົດ' : 'Due Date'}
                </th>
                <th className="text-left p-4 text-gray-300 font-medium">
                  {language === 'lo' ? 'ການປະຕິບັດ' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                  className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="text-white font-medium">{invoice.number}</p>
                      <p className="text-gray-400 text-sm">{formatDate(invoice.issueDate)}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white">{invoice.projectName}</p>
                    <p className="text-gray-400 text-sm">{invoice.description}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-semibold">{formatCurrency(invoice.total, invoice.currency)}</p>
                    <p className="text-gray-400 text-sm">
                      {language === 'lo' ? 'ບໍ່ລວມພາສີ:' : 'Excl. tax:'} {formatCurrency(invoice.amount, invoice.currency)}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(invoice.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm ${
                      new Date(invoice.dueDate) < new Date() && invoice.status !== 'paid' 
                        ? 'text-red-400' 
                        : 'text-gray-300'
                    }`}>
                      {formatDate(invoice.dueDate)}
                    </p>
                    {invoice.paidDate && (
                      <p className="text-green-400 text-xs">
                        {language === 'lo' ? 'ຈ່າຍ:' : 'Paid:'} {formatDate(invoice.paidDate)}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedInvoice(invoice)}
                        className="p-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600/30 transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
                      >
                        <Download size={14} />
                      </button>
                      {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                        <button 
                          className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                        >
                          <CreditCard size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInvoice(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedInvoice.number}</h2>
                <p className="text-gray-400">{selectedInvoice.projectName}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-white p-2"
              >
                ✕
              </button>
            </div>

            {/* Invoice Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {language === 'lo' ? 'ຂໍ້ມູນໃບແຈ້ງໜີ້' : 'Invoice Details'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'lo' ? 'ວັນທີອອກ:' : 'Issue Date:'}</span>
                    <span className="text-white">{formatDate(selectedInvoice.issueDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'lo' ? 'ກຳໜົດຈ່າຍ:' : 'Due Date:'}</span>
                    <span className="text-white">{formatDate(selectedInvoice.dueDate)}</span>
                  </div>
                  {selectedInvoice.paidDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'lo' ? 'ວັນທີຈ່າຍ:' : 'Paid Date:'}</span>
                      <span className="text-green-400">{formatDate(selectedInvoice.paidDate)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'lo' ? 'ສະຖານະ:' : 'Status:'}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedInvoice.status)}`}>
                      {getStatusText(selectedInvoice.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {language === 'lo' ? 'ສະຫຼຸບຈຳນວນເງິນ' : 'Amount Summary'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'lo' ? 'ຍອດເງິນ:' : 'Subtotal:'}</span>
                    <span className="text-white">{formatCurrency(selectedInvoice.amount, selectedInvoice.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'lo' ? 'ພາສີ (10%):' : 'Tax (10%):'}</span>
                    <span className="text-white">{formatCurrency(selectedInvoice.tax, selectedInvoice.currency)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-700">
                    <span className="text-white font-semibold">{language === 'lo' ? 'ລວມທັງໝົດ:' : 'Total:'}</span>
                    <span className="text-primary-400 font-bold text-lg">{formatCurrency(selectedInvoice.total, selectedInvoice.currency)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'lo' ? 'ລາຍການ' : 'Items'}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-gray-400">{language === 'lo' ? 'ລາຍລະອຽດ' : 'Description'}</th>
                      <th className="text-right py-2 text-gray-400">{language === 'lo' ? 'ຈຳນວນ' : 'Qty'}</th>
                      <th className="text-right py-2 text-gray-400">{language === 'lo' ? 'ລາຄາ' : 'Price'}</th>
                      <th className="text-right py-2 text-gray-400">{language === 'lo' ? 'ລວມ' : 'Total'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-800">
                        <td className="py-3 text-white">{item.description}</td>
                        <td className="py-3 text-right text-gray-300">{item.quantity}</td>
                        <td className="py-3 text-right text-gray-300">{formatCurrency(item.unitPrice, selectedInvoice.currency)}</td>
                        <td className="py-3 text-right text-white font-medium">{formatCurrency(item.total, selectedInvoice.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
              <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Download size={16} />
                <span>{language === 'lo' ? 'ດາວໂຫລດ PDF' : 'Download PDF'}</span>
              </button>
              
              {selectedInvoice.status !== 'paid' && selectedInvoice.status !== 'cancelled' && (
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <CreditCard size={16} />
                  <span>{language === 'lo' ? 'ຈ່າຍເງິນ' : 'Pay Now'}</span>
                </button>
              )}
              
              <button className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>

            {selectedInvoice.notes && (
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">
                  {language === 'lo' ? 'ໝາຍເຫດ' : 'Notes'}
                </h4>
                <p className="text-gray-300 text-sm">{selectedInvoice.notes}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ClientInvoices 