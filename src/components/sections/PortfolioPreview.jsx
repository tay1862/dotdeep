import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { portfolios } from '../../data/portfolios'

export default function PortfolioPreview() {
  const { t, i18n } = useTranslation()
  const [displayPortfolios, setDisplayPortfolios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and get featured portfolios
    setTimeout(() => {
      const featuredPortfolios = portfolios.filter(p => p.featured).slice(0, 6)
      setDisplayPortfolios(featuredPortfolios)
      setLoading(false)
    }, 500)
  }, [])

  const getLocalizedText = (item, field) => {
    const currentLang = i18n.language
    return item[field]?.[currentLang] || item[field]?.['en'] || ''
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('portfolio.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Portfolio Grid */}
        {displayPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayPortfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={portfolio.image}
                    alt={getLocalizedText(portfolio, 'title')}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Link
                        to={`/portfolio/${portfolio.id}`}
                        className="inline-flex items-center text-white font-medium hover:text-yellow-300 transition-colors"
                      >
                        {t('portfolio.viewDetails')}
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                      {portfolio.category}
                    </span>
                    <span className="text-xs text-gray-500">{portfolio.year}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    {getLocalizedText(portfolio, 'title')}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {getLocalizedText(portfolio, 'description')}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{portfolio.client}</span>
                    <div className="flex gap-1">
                      {portfolio.technologies.slice(0, 2).map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No portfolios available yet.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link to="/portfolio">
            <Button size="lg" className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
              {t('portfolio.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

