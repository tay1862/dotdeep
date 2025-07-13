import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, FileText, DollarSign, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { services } from '../../data/services'

export default function ServicesPreview() {
  const { t, i18n } = useTranslation()
  const [displayServices, setDisplayServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and get featured services
    setTimeout(() => {
      const featuredServices = services.filter(s => s.featured).slice(0, 3)
      setDisplayServices(featuredServices)
      setLoading(false)
    }, 500)
  }, [])

  const getLocalizedText = (item, field) => {
    const currentLang = i18n.language
    return item[field]?.[currentLang] || item[field]?.['en'] || ''
  }

  const getLocalizedArray = (item, field) => {
    const currentLang = i18n.language
    return item[field]?.[currentLang] || item[field]?.['en'] || []
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        {displayServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {displayServices.map((service, index) => (
              <div
                key={service.id}
                className={`group relative bg-gradient-to-br ${
                  index === 0 ? 'from-yellow-50 to-yellow-100 border-yellow-200' :
                  index === 1 ? 'from-yellow-100 to-orange-100 border-orange-200' :
                  'from-orange-50 to-yellow-50 border-yellow-200'
                } border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                {/* Popular badge for middle service */}
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  {/* Service Image */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-xl overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={getLocalizedText(service, 'title')}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Service Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {getLocalizedText(service, 'title')}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-yellow-600">
                      {getLocalizedText(service, 'price')}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {getLocalizedText(service, 'description')}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                      <span>{getLocalizedText(service, 'deliveryTime')}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2 text-yellow-600" />
                      <span>{service.fileFormats.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8">
                    <ul className="text-sm text-gray-600 space-y-2">
                      {getLocalizedArray(service, 'included').slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link to={`/services/${service.id}`}>
                    <Button 
                      className={`w-full group ${
                        index === 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' :
                        'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600'
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
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services available yet.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link to="/services">
            <Button size="lg" className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
              {t('services.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

