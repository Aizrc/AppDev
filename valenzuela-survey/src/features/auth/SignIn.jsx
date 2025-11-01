import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth, ROLES } from './AuthContext';

const SignIn = ({ userType, onClose, onBack }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getUserTypeLabel = () => {
    const labels = {
      survey: 'Customer',
      signin: 'User', // Generic label for flexible login
      superadmin: 'Super Admin',
    };
    return labels[userType] || 'User';
  };

  const getUserRole = () => {
    const roleMap = {
      survey: ROLES.CUSTOMER,
      signin: null, // Allow any role for generic Sign In
      superadmin: ROLES.SUPER_ADMIN,
    };
    return roleMap[userType];
  };

  const getUserTypeRoute = (role) => {
    const routes = {
      [ROLES.SUPER_ADMIN]: '/super-admin-dashboard',
      [ROLES.ADMIN]: '/admin-dashboard',
      [ROLES.CUSTOMER]: '/survey/form',
    };
    return routes[role] || '/';
  };

  // Inline validation functions
  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthError('');
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Get expected role for this user type
      const expectedRole = getUserRole();

      // Attempt login with role validation
      const result = await login(formData.email, formData.password, expectedRole);

      if (result.success) {
        // Close modal
        if (onClose) onClose();

        // Navigate to appropriate dashboard
        const route = getUserTypeRoute(result.user.role);
        navigate(route);
      } else {
        setAuthError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setAuthError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    if (authError) {
      setAuthError('');
    }
  };

  // Check if this is a standalone page (no modal) or modal popup
  const isStandalone = !onClose && !onBack;

  return (
    <div className={isStandalone ? "flex items-center justify-center p-4" : "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Sign In
            </h2>
            <p className="text-gray-600">
              {getUserTypeLabel()} Login
            </p>
          </div>

          {/* Global Auth Error */}
          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{authError}</p>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-6" noValidate>
            <div>
              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                error={errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={Lock}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                  aria-label="Remember me"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button 
                type="button" 
                className="text-accent hover:text-secondary font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            {userType === 'survey' && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        if (onClose) onClose();
                      }}
                      className="text-accent hover:text-secondary font-semibold transition-colors"
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-between pt-4 border-t border-gray-200">
              {onBack && (
                <Button
                  type="button"
                  onClick={onBack}
                  variant="outline"
                  size="md"
                >
                  Back
                </Button>
              )}
              {onClose && (
                <Button
                  type="button"
                  onClick={onClose}
                  variant="ghost"
                  size="md"
                  className={!onBack ? 'w-full' : ''}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          {/* Demo Credentials Helper */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <details className="text-xs text-gray-500">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Demo Credentials
              </summary>
              <div className="space-y-2 mt-2 p-3 bg-gray-50 rounded">
                {userType === 'superadmin' && (
                  <p><strong>Super Admin:</strong> superadmin@valenzuela.gov.ph / SuperAdmin2025!</p>
                )}
                {userType === 'signin' && (
                  <div className="space-y-1">
                    <p><strong>Super Admin:</strong> superadmin@valenzuela.gov.ph / SuperAdmin2025!</p>
                    <p><strong>Admin:</strong> admin@valenzuela.gov.ph / Admin2025!</p>
                    <p><strong>Customer:</strong> john.doe@email.com / Customer2025!</p>
                  </div>
                )}
                {userType === 'survey' && (
                  <p><strong>Customer:</strong> john.doe@email.com / Customer2025!</p>
                )}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
