import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

// Create Auth Context
const AuthContext = createContext(null);

// Use mock data when backend is not available
const USE_MOCK_AUTH = false; // Set to true for development without backend

// User roles
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};

// Mock user database (in production, this would be from backend API)
const USERS_DB = {
  // Super Admin
  'superadmin@valenzuela.gov.ph': {
    password: 'SuperAdmin2025!',
    role: ROLES.SUPER_ADMIN,
    name: 'Super Administrator',
    email: 'superadmin@valenzuela.gov.ph',
  },
  // Admin
  'admin@valenzuela.gov.ph': {
    password: 'Admin2025!',
    role: ROLES.ADMIN,
    name: 'Admin User',
    email: 'admin@valenzuela.gov.ph',
  },
  'john.admin@valenzuela.gov.ph': {
    password: 'Admin2025!',
    role: ROLES.ADMIN,
    name: 'John Admin',
    email: 'john.admin@valenzuela.gov.ph',
  },
  // Customers
  'john.doe@email.com': {
    password: 'Customer2025!',
    role: ROLES.CUSTOMER,
    name: 'John Doe',
    email: 'john.doe@email.com',
  },
  'jane.smith@email.com': {
    password: 'Customer2025!',
    role: ROLES.CUSTOMER,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
  },
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    const savedToken = sessionStorage.getItem('authToken');
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        sessionStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password, userType = null) => {
    try {
      // Validate input
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      let result;

      if (USE_MOCK_AUTH) {
        // Mock authentication (for development)
        const userData = USERS_DB[email.toLowerCase()];
        
        if (!userData) {
          return { success: false, error: 'Invalid email or password' };
        }

        if (userData.password !== password) {
          return { success: false, error: 'Invalid email or password' };
        }

        if (userType && userData.role !== userType) {
          return { success: false, error: `This account is not registered as ${userType}` };
        }

        const userSession = {
          email: userData.email,
          name: userData.name,
          role: userData.role,
          loginTime: new Date().toISOString(),
        };

        const token = btoa(JSON.stringify({ email, timestamp: Date.now() }));
        sessionStorage.setItem('user', JSON.stringify(userSession));
        sessionStorage.setItem('authToken', token);

        if (userData.role === ROLES.SUPER_ADMIN) {
          sessionStorage.setItem('superAdminAuth', 'true');
          sessionStorage.setItem('superAdminEmail', userData.email);
        }

        setUser(userSession);
        result = { success: true, user: userSession };
      } else {
        // Real API authentication
        result = await authService.login(email, password);
        
        if (result.success) {
          // Validate role if specified
          if (userType && result.user.role !== userType) {
            sessionStorage.clear();
            return { success: false, error: `This account is not registered as ${userType}` };
          }

          // Create user session for compatibility
          const userSession = {
            user_id: result.user.user_id,
            email: result.user.email,
            name: `${result.user.first_name} ${result.user.last_name}`,
            username: result.user.username,
            role: result.user.role,
            loginTime: new Date().toISOString(),
          };

          // Legacy support
          if (result.user.role === ROLES.SUPER_ADMIN) {
            sessionStorage.setItem('superAdminAuth', 'true');
            sessionStorage.setItem('superAdminEmail', result.user.email);
          }

          setUser(userSession);
          result = { success: true, user: userSession };
        }
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    sessionStorage.clear();
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!sessionStorage.getItem('authToken');
  };

  // Get user info
  const getUserInfo = () => {
    return user;
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    isAuthenticated,
    getUserInfo,
    loading,
    ROLES,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for protected components
export const withAuth = (Component, requiredRole = null) => {
  return (props) => {
    const { user, isAuthenticated, hasRole } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate('/');
      } else if (requiredRole && !hasRole(requiredRole)) {
        navigate('/unauthorized');
      }
    }, [user, navigate]);

    if (!isAuthenticated()) {
      return null;
    }

    if (requiredRole && !hasRole(requiredRole)) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default AuthContext;
