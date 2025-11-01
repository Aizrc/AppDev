import { Navigate } from 'react-router-dom';
import { useAuth, ROLES } from '../AuthContext';

/**
 * CustomerRoute component
 * Only allows access to Customer users
 * Redirects others to homepage
 */
const CustomerRoute = ({ children }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to homepage
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // If authenticated but not Customer, show unauthorized
  if (!hasRole(ROLES.CUSTOMER)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-6">
            This area is for customers/survey respondents only. 
            Please sign in with a customer account to access surveys.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  // User is Customer, allow access
  return children;
};

export default CustomerRoute;
