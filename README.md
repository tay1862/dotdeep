# 🎨 Dotdeep Design - Professional Logo Design & Branding Platform

A complete professional website for Dotdeep Design, a logo design and branding business based in Vientiane, Lao PDR. This modern web application features bilingual support (English/Lao), user authentication, project management, and a beautiful glassmorphism UI.

## 🚀 Features

### 🎯 **Business Features**
- **Service Packages**: DOT1 (Essential), DOT2 (Professional), DOT3 (Premium)
- **Bilingual Support**: Full English/Lao language support with proper fonts
- **User Roles**: Admin, Client, and Visitor with appropriate permissions
- **Project Management**: Complete client project tracking and management
- **Portfolio Showcase**: Beautiful portfolio display with categories
- **Contact Integration**: WhatsApp and Facebook Messenger integration

### 💻 **Technical Features**
- **Modern React Architecture**: TypeScript, Context API, Custom Hooks
- **Beautiful UI**: Glassmorphism design with Tailwind CSS
- **Animations**: Smooth transitions with Framer Motion
- **Authentication**: Supabase Auth with JWT tokens
- **Real-time Data**: Supabase database integration
- **Responsive Design**: Mobile-first approach
- **Performance**: Code splitting, lazy loading, optimized builds

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Glassmorphism
- **Animations**: Framer Motion
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **State Management**: React Context + Custom Hooks

## 📋 Prerequisites

- Node.js (version 18.0.0 or higher)
- npm or yarn package manager
- Supabase account (for database and authentication)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Copy the environment template
cp env.template .env

# Edit .env with your Supabase credentials
nano .env
```

### 3. Configure Supabase
Update the following variables in your `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your application!

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── navigation/     # Header, Footer, Navigation
│   └── ui/             # UI components (buttons, modals, etc.)
├── contexts/           # React Context providers
│   ├── AuthContext.tsx     # Authentication state
│   ├── LanguageContext.tsx # Bilingual support
│   └── ThemeContext.tsx    # Theme management
├── hooks/              # Custom React hooks
├── layouts/            # Page layouts
├── lib/                # External service configurations
│   └── supabase.ts     # Supabase client
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── App.tsx             # Main application component
```

## 🎨 Design System

### Colors
- **Primary Gold**: `#FFD700`
- **Secondary Black**: `#000000`
- **Background White**: `#FFFFFF`
- **Glassmorphism**: Custom rgba values with backdrop blur

### Typography
- **Primary**: Inter
- **Secondary**: Poppins
- **Lao Text**: Noto Sans Lao

## 📦 Service Packages

| Package | Price | Delivery | Revisions | Features |
|---------|-------|----------|-----------|----------|
| **DOT1 - Essential** | 2,390 LAK | 3 days | 2 | Logo + Basic Guidelines |
| **DOT2 - Professional** | 3,990 LAK | 5 days | 3 | Complete Branding Kit |
| **DOT3 - Premium** | 5,500 LAK | 7 days | 5 | Full Brand Identity |

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Quality Assurance
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
```

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Configure environment variables

## 📱 Contact Information

- **Phone**: +856-20-XXXXXXXX
- **Email**: info@dotdeep.com
- **WhatsApp**: +856XXXXXXXXX
- **Location**: Vientiane, Lao PDR
- **Hours**: Mon-Fri 9AM-6PM, Sat 9AM-4PM

## 🔐 User Roles

### Visitor
- Browse portfolio
- View service packages  
- Contact forms
- Basic information access

### Client
- Project dashboard
- Real-time project tracking
- File downloads
- Messaging system
- Invoice management

### Admin
- Complete management system
- Client management
- Project oversight
- Analytics dashboard
- Portfolio management

## 🌍 Internationalization

The application supports both English and Lao languages:
- Automatic language detection
- Manual language switching
- Proper Lao font rendering (Noto Sans Lao)
- Culturally appropriate content

## 🚨 Environment Variables

Create a `.env` file with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
VITE_APP_NAME="Dotdeep Design"
VITE_APP_URL=https://your-domain.com

# Contact Information
VITE_CONTACT_PHONE="+856-20-XXXXXXXX"
VITE_CONTACT_EMAIL="info@dotdeep.com"
VITE_WHATSAPP_NUMBER="+856XXXXXXXXX"

# Business Information
VITE_BUSINESS_ADDRESS="Vientiane, Lao PDR"
VITE_BUSINESS_HOURS="Mon-Fri: 9AM-6PM, Sat: 9AM-4PM"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for backend services
- **Tailwind CSS** for styling framework
- **Framer Motion** for animations
- **React Team** for the amazing framework
- **Vite** for lightning-fast development

---

**Built with ❤️ for Dotdeep Design**

*Professional Logo Design & Branding Services in Lao PDR* 