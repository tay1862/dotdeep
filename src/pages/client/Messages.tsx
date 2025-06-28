import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  Search, 
  Plus,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  Archive,
  Trash2,
  Check,
  CheckCheck,
  Clock,
  FileText,
  Download,
  MessageCircle,
  ChevronLeft
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  senderRole: 'client' | 'admin' | 'designer'
  timestamp: string
  status: 'sending' | 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file'
  fileUrl?: string
  fileName?: string
  fileSize?: string
  replyTo?: string
}

interface Conversation {
  id: string
  title: string
  participants: {
    id: string
    name: string
    role: 'client' | 'admin' | 'designer'
    avatar?: string
    isOnline: boolean
  }[]
  lastMessage?: Message
  unreadCount: number
  projectId?: string
  projectName?: string
  createdAt: string
  updatedAt: string
}

const ClientMessages: React.FC = () => {
  const { language } = useLanguage()
  const { profile } = useAuth()
  
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sample data - In real app, this would come from API
  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const sampleConversations: Conversation[] = [
        {
          id: '1',
          title: language === 'lo' ? 'ໂຄງການໂລໂກ້ Vientiane Coffee' : 'Vientiane Coffee Logo Project',
          participants: [
            { 
              id: 'user1', 
              name: profile?.name || 'You', 
              role: 'client',
              isOnline: true
            },
            { 
              id: 'designer1', 
              name: 'Somchai', 
              role: 'designer',
              avatar: '/images/team/designer1.jpg',
              isOnline: true
            },
            { 
              id: 'admin1', 
              name: 'Ms. Layla', 
              role: 'admin',
              avatar: '/images/team/admin1.jpg',
              isOnline: false
            }
          ],
          unreadCount: 2,
          projectId: '1',
          projectName: language === 'lo' ? 'ໂລໂກ້ ຮ້ານກາເຟ Vientiane' : 'Vientiane Coffee Shop Logo',
          createdAt: '2024-01-01T08:00:00Z',
          updatedAt: '2024-01-08T10:30:00Z',
          lastMessage: {
            id: 'msg1',
            content: language === 'lo' 
              ? 'ເຮົາໄດ້ອັບເດດໂລໂກ້ຕາມຄວາມຄິດເຫັນຂອງທ່ານແລ້ວ ກະລຸນາກວດເບິ່ງ'
              : 'We\'ve updated the logo based on your feedback. Please review.',
            senderId: 'designer1',
            senderName: 'Somchai',
            senderRole: 'designer',
            timestamp: '2024-01-08T10:30:00Z',
            status: 'delivered',
            type: 'text'
          }
        },
        {
          id: '2',
          title: language === 'lo' ? 'Branding Tech Lao' : 'Tech Lao Branding',
          participants: [
            { 
              id: 'user1', 
              name: profile?.name || 'You', 
              role: 'client',
              isOnline: true
            },
            { 
              id: 'designer2', 
              name: 'Phongsavanh', 
              role: 'designer',
              avatar: '/images/team/designer2.jpg',
              isOnline: false
            }
          ],
          unreadCount: 0,
          projectId: '2',
          projectName: language === 'lo' ? 'Branding ບໍລິສັດ Tech Lao' : 'Tech Lao Company Branding',
          createdAt: '2023-11-15T09:00:00Z',
          updatedAt: '2024-01-07T15:45:00Z',
          lastMessage: {
            id: 'msg2',
            content: language === 'lo' 
              ? 'ຂອບໃຈສຳລັບການຮ່ວມມື ໂຄງການເສັດສິ້ນແລ້ວ'
              : 'Thank you for the collaboration. Project completed!',
            senderId: 'user1',
            senderName: profile?.name || 'You',
            senderRole: 'client',
            timestamp: '2024-01-07T15:45:00Z',
            status: 'read',
            type: 'text'
          }
        },
        {
          id: '3',
          title: language === 'lo' ? 'ການສະໜັບສະໜູນທົ່ວໄປ' : 'General Support',
          participants: [
            { 
              id: 'user1', 
              name: profile?.name || 'You', 
              role: 'client',
              isOnline: true
            },
            { 
              id: 'admin1', 
              name: 'Ms. Layla', 
              role: 'admin',
              avatar: '/images/team/admin1.jpg',
              isOnline: false
            }
          ],
          unreadCount: 1,
          createdAt: '2024-01-05T14:20:00Z',
          updatedAt: '2024-01-06T09:15:00Z',
          lastMessage: {
            id: 'msg3',
            content: language === 'lo' 
              ? 'ສະບາຍດີ ມີຫຍັງໃຫ້ຊ່ວຍບໍ?'
              : 'Hello! How can we help you today?',
            senderId: 'admin1',
            senderName: 'Ms. Layla',
            senderRole: 'admin',
            timestamp: '2024-01-06T09:15:00Z',
            status: 'delivered',
            type: 'text'
          }
        }
      ]
      
      setConversations(sampleConversations)
      setIsLoading(false)
    }
    
    loadConversations()
  }, [language, profile])

  // Load messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const loadMessages = async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const sampleMessages: Message[] = [
          {
            id: '1',
            content: language === 'lo' 
              ? 'ສະບາຍດີ ຂ້ອຍຕ້ອງການສອບຖາມກ່ຽວກັບໂຄງການໂລໂກ້'
              : 'Hello! I have some questions about the logo project.',
            senderId: 'user1',
            senderName: profile?.name || 'You',
            senderRole: 'client',
            timestamp: '2024-01-08T09:00:00Z',
            status: 'read',
            type: 'text'
          },
          {
            id: '2',
            content: language === 'lo' 
              ? 'ສະບາຍດີ! ແນ່ນອນ ມີຫຍັງໃຫ້ຊ່ວຍບໍ?'
              : 'Hello! Of course, what can I help you with?',
            senderId: 'designer1',
            senderName: 'Somchai',
            senderRole: 'designer',
            timestamp: '2024-01-08T09:15:00Z',
            status: 'read',
            type: 'text'
          },
          {
            id: '3',
            content: language === 'lo' 
              ? 'ຂ້ອຍຢາກໃຫ້ປ່ຽນສີໃຫ້ເຂັ້ມກວ່ານີ້ແດ່'
              : 'I would like to make the colors a bit darker.',
            senderId: 'user1',
            senderName: profile?.name || 'You',
            senderRole: 'client',
            timestamp: '2024-01-08T09:30:00Z',
            status: 'read',
            type: 'text'
          },
          {
            id: '4',
            content: language === 'lo' 
              ? 'ເຂົ້າໃຈແລ້ວ ຂ້ອຍຈະສົ່ງໄຟລ໌ແກ້ໄຂໃຫ້ທ່ານເບິ່ງ'
              : 'Understood! I\'ll send you the revised version.',
            senderId: 'designer1',
            senderName: 'Somchai',
            senderRole: 'designer',
            timestamp: '2024-01-08T10:00:00Z',
            status: 'read',
            type: 'text'
          },
          {
            id: '5',
            content: 'vientiane-coffee-logo-v2.ai',
            senderId: 'designer1',
            senderName: 'Somchai',
            senderRole: 'designer',
            timestamp: '2024-01-08T10:15:00Z',
            status: 'read',
            type: 'file',
            fileName: 'vientiane-coffee-logo-v2.ai',
            fileSize: '15.2 MB'
          },
          {
            id: '6',
            content: language === 'lo' 
              ? 'ເຮົາໄດ້ອັບເດດໂລໂກ້ຕາມຄວາມຄິດເຫັນຂອງທ່ານແລ້ວ ກະລຸນາກວດເບິ່ງ'
              : 'We\'ve updated the logo based on your feedback. Please review.',
            senderId: 'designer1',
            senderName: 'Somchai',
            senderRole: 'designer',
            timestamp: '2024-01-08T10:30:00Z',
            status: 'delivered',
            type: 'text'
          }
        ]
        
        setMessages(sampleMessages)
        
        // Mark conversation as read
        setConversations(prev =>
          prev.map(conv =>
            conv.id === selectedConversation.id
              ? { ...conv, unreadCount: 0 }
              : conv
          )
        )
      }
      
      loadMessages()
    }
  }, [selectedConversation, language, profile])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || isSending) return
    
    setIsSending(true)
    
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      senderId: 'user1',
      senderName: profile?.name || 'You',
      senderRole: 'client',
      timestamp: new Date().toISOString(),
      status: 'sending',
      type: 'text'
    }
    
    setMessages(prev => [...prev, message])
    setNewMessage('')
    
    // Simulate sending
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: 'sent' } : msg
        )
      )
    }, 1000)
    
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        )
      )
    }, 2000)
    
    setIsSending(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedConversation) return
    
    const message: Message = {
      id: Date.now().toString(),
      content: file.name,
      senderId: 'user1',
      senderName: profile?.name || 'You',
      senderRole: 'client',
      timestamp: new Date().toISOString(),
      status: 'sending',
      type: 'file',
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    }
    
    setMessages(prev => [...prev, message])
    
    // Simulate upload
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: 'sent' } : msg
        )
      )
    }, 2000)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString(language === 'lo' ? 'lo-LA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else if (diffInDays === 1) {
      return language === 'lo' ? 'ມື້ວານນີ້' : 'Yesterday'
    } else if (diffInDays < 7) {
      return date.toLocaleDateString(language === 'lo' ? 'lo-LA' : 'en-US', {
        weekday: 'short'
      })
    } else {
      return date.toLocaleDateString(language === 'lo' ? 'lo-LA' : 'en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  const getMessageStatus = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="text-gray-400" size={12} />
      case 'sent':
        return <Check className="text-gray-400" size={12} />
      case 'delivered':
        return <CheckCheck className="text-gray-400" size={12} />
      case 'read':
        return <CheckCheck className="text-primary-400" size={12} />
      default:
        return null
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-400'
      case 'designer': return 'text-blue-400'
      case 'client': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getRoleText = (role: string) => {
    if (language === 'lo') {
      switch (role) {
        case 'admin': return 'ຜູ້ຄຸ້ມຄອງ'
        case 'designer': return 'ນັກອອກແບບ'
        case 'client': return 'ລູກຄ້າ'
        default: return 'ຜູ້ໃຊ້'
      }
    } else {
      switch (role) {
        case 'admin': return 'Admin'
        case 'designer': return 'Designer'
        case 'client': return 'Client'
        default: return 'User'
      }
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

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
      className="h-[calc(100vh-12rem)] flex bg-gray-900 rounded-xl overflow-hidden"
    >
      {/* Conversations Sidebar */}
      <div className={`${
        isMobile && selectedConversation ? 'hidden' : 'flex'
      } flex-col w-full md:w-80 border-r border-gray-700`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              {language === 'lo' ? 'ຂໍ້ຄວາມ' : 'Messages'}
            </h2>
            <button className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Plus size={20} />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder={language === 'lo' ? 'ຄົ້ນຫາການສົນທະນາ...' : 'Search conversations...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <motion.button
              key={conversation.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setSelectedConversation(conversation)
                setShowDetails(false)
              }}
              className={`w-full p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors text-left ${
                selectedConversation?.id === conversation.id ? 'bg-gray-800/50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {conversation.participants.find(p => p.role !== 'client')?.name.charAt(0) || 'D'}
                  </div>
                  {conversation.participants.some(p => p.isOnline && p.role !== 'client') && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium truncate">
                      {conversation.title}
                    </h3>
                    <span className="text-gray-400 text-xs">
                      {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  
                  {conversation.projectName && (
                    <p className="text-gray-400 text-xs mb-1 truncate">
                      {conversation.projectName}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm truncate">
                      {conversation.lastMessage?.content || (language === 'lo' ? 'ບໍ່ມີຂໍ້ຄວາມ' : 'No messages')}
                    </p>
                    
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full min-w-[1.25rem] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className={`${
          isMobile && selectedConversation ? 'flex' : 'hidden md:flex'
        } flex-col flex-1`}>
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700 bg-gray-800/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isMobile && (
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                
                <div className="relative">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedConversation.participants.find(p => p.role !== 'client')?.name.charAt(0) || 'D'}
                  </div>
                  {selectedConversation.participants.some(p => p.isOnline && p.role !== 'client') && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-white font-medium">{selectedConversation.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {selectedConversation.participants
                      .filter(p => p.role !== 'client')
                      .map(p => p.name)
                      .join(', ')
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Video size={20} />
                </button>
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Info size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${
                  message.senderId === 'user1' ? 'order-2' : 'order-1'
                }`}>
                  {message.senderId !== 'user1' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-white">{message.senderName}</span>
                      <span className={`text-xs ${getRoleColor(message.senderRole)}`}>
                        {getRoleText(message.senderRole)}
                      </span>
                    </div>
                  )}
                  
                  <div className={`rounded-lg p-3 ${
                    message.senderId === 'user1'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}>
                    {message.type === 'text' ? (
                      <p>{message.content}</p>
                    ) : message.type === 'file' ? (
                      <div className="flex items-center space-x-3">
                        <FileText className="text-gray-300" size={20} />
                        <div>
                          <p className="font-medium">{message.fileName}</p>
                          <p className="text-xs opacity-75">{message.fileSize}</p>
                        </div>
                        <button className="p-1 hover:bg-white/10 rounded">
                          <Download size={16} />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  
                  <div className={`flex items-center space-x-1 mt-1 ${
                    message.senderId === 'user1' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-gray-400">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.senderId === 'user1' && getMessageStatus(message.status)}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-800/30">
            <div className="flex items-end space-x-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.ai,.psd"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 text-gray-400 hover:text-white transition-colors"
              >
                <Paperclip size={20} />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={language === 'lo' ? 'ພິມຂໍ້ຄວາມ...' : 'Type a message...'}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 pr-12"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors">
                  <Smile size={20} />
                </button>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isSending}
                className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* No Conversation Selected */
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <MessageCircle className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-white mb-2">
              {language === 'lo' ? 'ເລືອກການສົນທະນາ' : 'Select a Conversation'}
            </h3>
            <p className="text-gray-400">
              {language === 'lo' 
                ? 'ເລືອກການສົນທະນາຈາກລາຍການທາງຊ້າຍເພື່ອເລີ່ມແຊັດ'
                : 'Choose a conversation from the list to start messaging'
              }
            </p>
          </div>
        </div>
      )}

      {/* Conversation Details Sidebar */}
      {showDetails && selectedConversation && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 border-l border-gray-700 bg-gray-800/30 p-4"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {language === 'lo' ? 'ລາຍລະອຽດ' : 'Details'}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Project Info */}
            {selectedConversation.projectName && (
              <div>
                <h4 className="text-white font-medium mb-2">
                  {language === 'lo' ? 'ໂຄງການ' : 'Project'}
                </h4>
                <p className="text-gray-300 text-sm">{selectedConversation.projectName}</p>
              </div>
            )}

            {/* Participants */}
            <div>
              <h4 className="text-white font-medium mb-3">
                {language === 'lo' ? 'ຜູ້ເຂົ້າຮ່ວມ' : 'Participants'} ({selectedConversation.participants.length})
              </h4>
              <div className="space-y-3">
                {selectedConversation.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {participant.name.charAt(0)}
                      </div>
                      {participant.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{participant.name}</p>
                      <p className={`text-xs ${getRoleColor(participant.role)}`}>
                        {getRoleText(participant.role)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors">
                <Archive size={16} />
                <span>{language === 'lo' ? 'ເກັບກ່ອງ' : 'Archive Chat'}</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                <Trash2 size={16} />
                <span>{language === 'lo' ? 'ລົບການສົນທະນາ' : 'Delete Chat'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ClientMessages 