import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, FileText, DollarSign, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { db } from '../lib/supabase'

export default function ServicesPage() {
  const { t, i18n } = useTranslation()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await db.services.getAll()
      if (error) throw error
      
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLocalizedText = (item, field) => {
    const currentLang = i18n.language
    return item[`${field}_${currentLang}`] || item[`${field}_la`] || item[`${field}_en`]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-8">
                  <div className="h-16 w-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative bg-gradient-to-br ${
                  index % 3 === 0 ? 'from-blue-50 to-blue-100 border-blue-200' :
                  index % 3 === 1 ? 'from-purple-50 to-purple-100 border-purple-200' :
                  'from-green-50 to-green-100 border-green-200'
                } border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                {/* Popular badge for featured services */}
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  {/* Service Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    index % 3 === 0 ? 'bg-blue-600' :
                    index % 3 === 1 ? 'bg-purple-600' :
                    'bg-green-600'
                  }`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>

                  {/* Service Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {getLocalizedText(service, 'name')}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">${service.price}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {getLocalizedText(service, 'description')}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8 text-left">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                      <span>{getLocalizedText(service, 'delivery_time')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                      <span>{getLocalizedText(service, 'file_formats')}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{getLocalizedText(service, 'included_items')}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={`/services/${service.id}`}>
                    <Button 
                      className={`w-full group ${
                        index % 3 === 1 ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' :
                        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      } text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {t('services.selectService')}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services available</h3>
              <p className="text-gray-600">
                We're working on adding new services. Please check back soon!
              </p>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg mb-8 opacity-90">
            Don't see exactly what you're looking for? We'd love to discuss your unique project requirements.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

