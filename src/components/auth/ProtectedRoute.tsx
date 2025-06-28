import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { ROUTES } from '@/utils/constants'

interface ProtectedRouteProps {
  children: ReactNode
  role?: 'admin' | 'client'
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, profile, isLoading } = useAuth()
  const location = useLocation()

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />
  }

  // Redirect to login if not authenticated
  if (!user || !profile) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  // Check role-based access
  if (role && profile.role !== role) {
    // If user is trying to access admin routes but is not admin
    if (role === 'admin' && profile.role === 'client') {
      return <Navigate to={ROUTES.dashboard} replace />
    }
    
    // If user is trying to access client routes but is admin
    if (role === 'client' && profile.role === 'admin') {
      return <Navigate to={ROUTES.admin} replace />
    }
    
    // For any other role mismatch, redirect to home
    return <Navigate to={ROUTES.home} replace />
  }

  // If all checks pass, render the protected content
  return <>{children}</>
} 