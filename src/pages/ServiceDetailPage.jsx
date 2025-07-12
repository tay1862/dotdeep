import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Clock, FileText, CheckCircle, DollarSign, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { db, storage } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [orderLoading, setOrderLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: user?.email || '',
    customer_phone: '',
    customer_whatsapp: '',
    customer_contact_preference: 'email',
    brief_description: ''
  })

  useEffect(() => {
    fetchService()
  }, [id])

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customer_email: user.email
      }))
    }
  }, [user])

  const fetchService = async () => {
    try {
      const { data, error } = await db.services.getById(id)
      if (error) throw error
      
      setService(data)
    } catch (error) {
      console.error('Error fetching service:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getLocalizedText = (item, field) => {
    if (!item) return ''
    const currentLang = i18n.language
    return item[`${field}_${currentLang}`] || item[`${field}_la`] || item[`${field}_en`]
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      setSelectedFile(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    // Reset file input
    const fileInput = document.getElementById('sample-file')
    if (fileInput) fileInput.value = ''
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setOrderLoading(true)

    try {
      let sampleFileUrl = null

      // Upload file if selected
      if (selectedFile) {
        const fileName = `${Date.now()}-${selectedFile.name}`
        const { data: uploadData, error: uploadError } = await storage.sampleFiles.upload(selectedFile, fileName)
        
        if (uploadError) throw uploadError
        sampleFileUrl = uploadData.path
      }

      // Create order
      const orderData = {
        ...formData,
        service_id: service.id,
        user_id: user?.id || null,
        sample_file_url: sampleFileUrl,
        status: 'pending'
      }

      const { error: orderError } = await db.orders.create(orderData)
      if (orderError) throw orderError

      setOrderSuccess(true)
      setShowOrderForm(false)
      
      // Reset form
      setFormData({
        customer_name: '',
        customer_email: user?.email || '',
        customer_phone: '',
        customer_whatsapp: '',
        customer_contact_preference: 'email',
        brief_description: ''
      })
      setSelectedFile(null)

    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Error submitting order. Please try again.')
    } finally {
      setOrderLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
              <div className="h-64 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Service not found</h3>
            <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
            <Link to="/services">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Submitted Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We'll review your requirements and get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button variant="outline">
                  View More Services
                </Button>
              </Link>
              {user && (
                <Link to="/dashboard">
                  <Button>
                    View My Orders
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/services"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          {t('common.back')} to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {getLocalizedText(service, 'name')}
              </h1>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-3xl font-bold text-blue-600">
                  <DollarSign className="w-8 h-8 mr-1" />
                  {service.price}
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {getLocalizedText(service, 'description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">{t('services.deliveryTime')}</h3>
                  </div>
                  <p className="text-gray-600">{getLocalizedText(service, 'delivery_time')}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">{t('services.fileFormats')}</h3>
                  </div>
                  <p className="text-gray-600">{getLocalizedText(service, 'file_formats')}</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">{t('services.included')}</h3>
                </div>
                <p className="text-gray-600">{getLocalizedText(service, 'included_items')}</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Order Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {!showOrderForm ? (
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to get started?</h3>
                  <p className="text-gray-600 mb-6">
                    Click below to place your order and we'll get back to you within 24 hours.
                  </p>
                  <Button 
                    onClick={() => setShowOrderForm(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t('services.selectService')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('order.title')}</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('order.name')} *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('order.email')} *
                    </label>
                    <input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('order.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('order.whatsapp')}
                    </label>
                    <input
                      type="tel"
                      name="customer_whatsapp"
                      value={formData.customer_whatsapp}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('order.contactPreference')}
                    </label>
                    <select
                      name="customer_contact_preference"
                      value={formData.customer_contact_preference}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('order.briefDescription')} *
                    </label>
                    <textarea
                      name="brief_description"
                      value={formData.brief_description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Please describe your project requirements..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('order.sampleFile')}
                    </label>
                    <div className="mt-1">
                      {!selectedFile ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">Click to upload file</p>
                            <p className="text-xs text-gray-400">Max 10MB</p>
                          </div>
                          <input
                            id="sample-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*,.pdf,.doc,.docx,.txt"
                          />
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm text-blue-700 truncate">{selectedFile.name}</span>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowOrderForm(false)}
                      className="flex-1"
                    >
                      {t('common.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      disabled={orderLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {orderLoading ? t('common.loading') : t('order.submitOrder')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

