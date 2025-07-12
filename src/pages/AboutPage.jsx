import { useTranslation } from 'react-i18next'
import { Users, Award, Clock, Heart } from 'lucide-react'

export default function AboutPage() {
  const { t } = useTranslation()

  const stats = [
    { icon: Users, label: 'Happy Clients', value: '50+' },
    { icon: Award, label: 'Projects Completed', value: '100+' },
    { icon: Clock, label: 'Years Experience', value: '5+' },
    { icon: Heart, label: 'Team Members', value: '10+' }
  ]

  const team = [
    {
      name: 'John Doe',
      role: 'Creative Director',
      image: '/api/placeholder/300/300',
      description: 'Leading creative vision with 8+ years of experience in design and branding.'
    },
    {
      name: 'Jane Smith',
      role: 'Senior Designer',
      image: '/api/placeholder/300/300',
      description: 'Specializing in UI/UX design and creating beautiful user experiences.'
    },
    {
      name: 'Mike Johnson',
      role: 'Brand Strategist',
      image: '/api/placeholder/300/300',
      description: 'Expert in brand development and marketing strategy for businesses.'
    }
  ]

  const values = [
    {
      icon: '🎨',
      title: 'Creativity',
      description: 'We believe in pushing creative boundaries to deliver unique and innovative solutions.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Working closely with our clients to understand their vision and bring it to life.'
    },
    {
      icon: '⚡',
      title: 'Excellence',
      description: 'Committed to delivering high-quality work that exceeds expectations every time.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Staying ahead of trends and using cutting-edge tools and techniques.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 py-20 lg:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2019, our creative studio began with a simple mission: to help businesses 
                  tell their stories through exceptional design and branding. What started as a small 
                  team of passionate designers has grown into a full-service creative agency.
                </p>
                <p>
                  We believe that great design has the power to transform businesses and connect with 
                  audiences on a deeper level. Our approach combines strategic thinking with creative 
                  execution to deliver results that not only look beautiful but also drive business growth.
                </p>
                <p>
                  Today, we're proud to have worked with over 50 clients across various industries, 
                  from startups to established enterprises, helping them build strong brand identities 
                  and create meaningful connections with their customers.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="Our team at work"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our approach to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The talented individuals behind our creative work and client success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your project and see how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

