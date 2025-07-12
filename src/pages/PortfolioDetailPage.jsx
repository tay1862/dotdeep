import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { db } from '../lib/supabase'

export default function PortfolioDetailPage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPortfolio()
  }, [id])

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await db.portfolios.getById(id)
      if (error) throw error
      
      setPortfolio(data)
    } catch (error) {
      console.error('Error fetching portfolio:', error)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-300 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Portfolio not found</h3>
            <p className="text-gray-600 mb-6">The portfolio you're looking for doesn't exist or has been removed.</p>
            <Link to="/portfolio">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/portfolio"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          {t('common.back')} to Portfolio
        </Link>

        {/* Portfolio Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={portfolio.main_image_url || '/api/placeholder/800/400'}
              alt={getLocalizedText(portfolio, 'title')}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-600 rounded-full">
                  {getLocalizedText(portfolio.portfolio_categories, 'name')}
                </span>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(portfolio.created_at).toLocaleDateString()}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {getLocalizedText(portfolio, 'title')}
              </h1>
            </div>
          </div>
        </div>

        {/* Portfolio Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {getLocalizedText(portfolio, 'description')}
                </p>
              </div>

              {/* Additional Images */}
              {portfolio.portfolio_images && portfolio.portfolio_images.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolio.portfolio_images
                      .sort((a, b) => a.order - b.order)
                      .map((image, index) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.image_url}
                            alt={`${getLocalizedText(portfolio, 'title')} - Image ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Tag className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="font-medium text-gray-900">
                      {getLocalizedText(portfolio.portfolio_categories, 'name')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Completed</div>
                    <div className="font-medium text-gray-900">
                      {new Date(portfolio.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Interested in similar work?</h4>
                <Link to="/services">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <ExternalLink className="mr-2 w-4 h-4" />
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

