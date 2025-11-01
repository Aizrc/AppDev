import { Navigate } from 'react-router-dom';
import { useAuth, ROLES } from '../AuthContext';
import ProtectedRoute from './ProtectedRoute';

/**
 * SuperAdminRoute component
 * Only allows access to Super Admin users
 * Redirects others to Super Admin login page
 */
const SuperAdminRoute = ({ children }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#E8F4F8' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" 
               style={{ borderColor: '#003D5B', borderTopColor: 'transparent' }}></div>
          <p style={{ color: '#003D5B' }} className="font-semibold">Verifying Super Admin Access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to Super Admin login
  if (!isAuthenticated()) {
    return <Navigate to="/super-admin-login" replace />;
  }

  // If authenticated but not Super Admin, show unauthorized
  if (!hasRole(ROLES.SUPER_ADMIN)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the Super Admin dashboard. 
            This area is restricted to Super Administrators only.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  // User is Super Admin, allow access
  return children;
};

export default SuperAdminRoute;
