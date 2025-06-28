import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import ServicesPage from './pages/ServicesPage'
import PackagesPage from './pages/PackagesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'

// Client Dashboard Pages
import ClientDashboard from './pages/client/Dashboard'
import ClientProjects from './pages/client/Projects'
import ClientMessages from './pages/client/Messages'
import ClientFiles from './pages/client/Files'
import ClientInvoices from './pages/client/Invoices'
import ClientSettings from './pages/client/Settings'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminClients from './pages/admin/Clients'
import AdminProjects from './pages/admin/Projects'
import AdminPortfolio from './pages/admin/Portfolio'
import AdminPackages from './pages/admin/Packages'
import AdminSettings from './pages/admin/Settings'
import AdminAnalytics from './pages/admin/Analytics'

// Utility Components
import LoadingScreen from './components/ui/LoadingScreen'
import ErrorBoundary from './components/ui/ErrorBoundary'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ScrollToTop from './components/ui/ScrollToTop'

// Hooks
import { useAuth } from './contexts/AuthContext'

// Page Transition Variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
}

function App() {
  const { isLoading } = useAuth()
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <Helmet>
        <html lang="en" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <ScrollToTop />
      
      <div className="min-h-screen bg-black text-white">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={
              <MainLayout>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <HomePage />
                </motion.div>
              </MainLayout>
            } />
            
            <Route path="/portfolio" element={
              <MainLayout>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PortfolioPage />
                </motion.div>
              </MainLayout>
            } />
            
            <Route path="/services" element={
              <MainLayout>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ServicesPage />
                </motion.div>
              </MainLayout>
            } />
            
            <Route path="/packages" element={
              <MainLayout>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PackagesPage />
                </motion.div>
              </MainLayout>
            } />
            
            <Route path="/about" element={
              <MainLayout>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <AboutPage />
                </motion.div>
              </MainLayout>
            } />
            
            <Route path="/contact" element={
              <MainLayout>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ContactPage />
                </motion.div>
              </MainLayout>
            } />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Client Dashboard Routes */}
            <Route path="/client/dashboard" element={
              <ProtectedRoute role="client">
                <DashboardLayout>
                  <ClientDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/client/projects" element={
              <ProtectedRoute role="client">
                <DashboardLayout>
                  <ClientProjects />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/client/messages" element={
              <ProtectedRoute role="client">
                <DashboardLayout>
                  <ClientMessages />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/client/files" element={
              <ProtectedRoute role="client">
                <DashboardLayout>
                  <ClientFiles />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/client/invoices" element={
              <ProtectedRoute role="client">
                <DashboardLayout>
                  <ClientInvoices />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/client/settings" element={
              <ProtectedRoute role="client">
                <DashboardLayout>
                  <ClientSettings />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/clients" element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminClients />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/projects" element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminProjects />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/portfolio" element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminPortfolio />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/packages" element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminPackages />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/analytics" element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminAnalytics />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/settings" element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={
              <MainLayout>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="min-h-screen flex items-center justify-center"
                >
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
                    <p className="text-xl text-white/70 mb-8">Page not found</p>
                    <a href="/" className="btn-primary">Back to Home</a>
                  </div>
                </motion.div>
              </MainLayout>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  )
}

export default App 