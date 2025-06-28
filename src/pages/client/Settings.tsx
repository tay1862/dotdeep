import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Globe, Bell, Save, Eye, EyeOff, Check } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

const ClientSettings: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const { user, profile } = useAuth()
  
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: profile?.name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    address: '',
    company: ''
  })
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    projectUpdates: true,
    invoiceReminders: true,
    marketingEmails: false
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotifications(prev => ({ ...prev, [name]: checked }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage(language === 'lo' 
        ? 'ບັນທຶກຂໍ້ມູນສຳເລັດ!' 
        : 'Profile updated successfully!'
      )
      
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(language === 'lo' ? 'ລະຫັດຜ່ານບໍ່ຕົງກັນ' : 'Passwords do not match')
      setIsLoading(false)
      return
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage(language === 'lo' 
        ? 'ເປຍີ່ນລະຫັດຜ່ານສຳເລັດ!' 
        : 'Password changed successfully!'
      )
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error changing password:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: language === 'lo' ? 'ຂໍ້ມູນສ່ວນຕົວ' : 'Profile', icon: User },
    { id: 'password', label: language === 'lo' ? 'ລະຫັດຜ່ານ' : 'Password', icon: Lock },
    { id: 'language', label: language === 'lo' ? 'ພາສາ' : 'Language', icon: Globe },
    { id: 'notifications', label: language === 'lo' ? 'ການແຈ້ງເຕືອນ' : 'Notifications', icon: Bell }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          {language === 'lo' ? 'ການຕັ້ງຄ່າ' : 'Settings'}
        </h1>
        
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-lg border border-green-500/20"
          >
            <Check size={16} />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 space-y-2"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 glass-card p-8"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                {language === 'lo' ? 'ຂໍ້ມູນສ່ວນຕົວ' : 'Profile Information'}
              </h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {language === 'lo' ? 'ຊື່ເຕັມ' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {language === 'lo' ? 'ອີເມລ' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {language === 'lo' ? 'ເບີໂທລະສັບ' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {language === 'lo' ? 'ບໍລິສັດ' : 'Company'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={profileData.company}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {language === 'lo' ? 'ທີ່ຢູ່' : 'Address'}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  <Save size={20} />
                  <span>
                    {isLoading 
                      ? (language === 'lo' ? 'ກຳລັງບັນທຶກ...' : 'Saving...') 
                      : (language === 'lo' ? 'ບັນທຶກ' : 'Save Changes')
                    }
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                {language === 'lo' ? 'ເປຍີ່ນລະຫັດຜ່ານ' : 'Change Password'}
              </h2>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'lo' ? 'ລະຫັດຜ່ານປັດຈຸບັນ' : 'Current Password'} *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'lo' ? 'ລະຫັດຜ່ານໃໝ່' : 'New Password'} *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'lo' ? 'ຢືນຢັນລະຫັດຜ່ານໃໝ່' : 'Confirm New Password'} *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  <Lock size={20} />
                  <span>
                    {isLoading 
                      ? (language === 'lo' ? 'ກຳລັງປ່ຽນ...' : 'Changing...') 
                      : (language === 'lo' ? 'ປ່ຽນລະຫັດຜ່ານ' : 'Change Password')
                    }
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* Language Tab */}
          {activeTab === 'language' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                {language === 'lo' ? 'ການຕັ້ງຄ່າພາສາ' : 'Language Settings'}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="lang-en"
                    name="language"
                    value="en"
                    checked={language === 'en'}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'lo')}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="lang-en" className="text-gray-300 text-lg">
                    🇺🇸 English
                  </label>
                </div>
                
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="lang-lo"
                    name="language"
                    value="lo"
                    checked={language === 'lo'}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'lo')}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="lang-lo" className="text-gray-300 text-lg">
                    🇱🇦 ພາສາລາວ
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                {language === 'lo' ? 'ການຕັ້ງຄ່າການແຈ້ງເຕືອນ' : 'Notification Settings'}
              </h2>
              
              <div className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">
                        {key === 'emailNotifications' && (language === 'lo' ? 'ການແຈ້ງເຕືອນທາງອີເມລ' : 'Email Notifications')}
                        {key === 'projectUpdates' && (language === 'lo' ? 'ອັບເດດໂຄງການ' : 'Project Updates')}
                        {key === 'invoiceReminders' && (language === 'lo' ? 'ແຈ້ງເຕືອນໃບແຈ້ງໜີ້' : 'Invoice Reminders')}
                        {key === 'marketingEmails' && (language === 'lo' ? 'ອີເມລການຕະຫຼາດ' : 'Marketing Emails')}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {key === 'emailNotifications' && (language === 'lo' ? 'ຮັບການແຈ້ງເຕືອນທາງອີເມລ' : 'Receive email notifications')}
                        {key === 'projectUpdates' && (language === 'lo' ? 'ແຈ້ງເຕືອນເມື່ອໂຄງການມີການອັບເດດ' : 'Get notified about project updates')}
                        {key === 'invoiceReminders' && (language === 'lo' ? 'ແຈ້ງເຕືອນກ່ຽວກັບໃບແຈ້ງໜີ້' : 'Reminders about invoices')}
                        {key === 'marketingEmails' && (language === 'lo' ? 'ຮັບຂ່າວສານການຕະຫຼາດ' : 'Receive marketing updates')}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name={key}
                        checked={value}
                        onChange={handleNotificationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ClientSettings 