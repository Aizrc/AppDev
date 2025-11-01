import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Shield, Zap, ArrowRight, Building2, Users, TrendingUp, Award } from 'lucide-react';
import PrivacyAndPolicy from '../../components/common/PrivacyAndPolicy';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import UserType from '../auth/UserType';
import SignIn from '../auth/SignIn';
import logo from '../../assets/logo.png';

const Homepage = () => {
  const navigate = useNavigate();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handlePrivacyAccept = () => {
    setHasAcceptedPrivacy(true);
    setIsPrivacyOpen(false);
    setIsUserTypeOpen(true);
  };

  const handleConnect = () => {
    if (!hasAcceptedPrivacy) {
      setIsPrivacyOpen(true);
    } else {
      setIsUserTypeOpen(true);
    }
  };

  const handleSelectUserType = (userType) => {
    setSelectedUserType(userType);
    setIsUserTypeOpen(false);
    
    if (userType === 'survey') {
      // Go directly to survey form
      navigate('/survey/form');
    } else if (userType === 'signin' || userType === 'superadmin') {
      // Show sign-in modal for admin or super admin
      setIsSignInOpen(true);
    }
  };

  const handleBackToUserType = () => {
    setIsSignInOpen(false);
    setIsUserTypeOpen(true);
  };

  const handleCloseSignIn = () => {
    setIsSignInOpen(false);
    setSelectedUserType(null);
  };

  const handleCloseUserType = () => {
    setIsUserTypeOpen(false);
  };

  const stats = [
    { icon: Users, label: 'Citizens Served', value: '100K+', color: 'bg-accent' },
    { icon: TrendingUp, label: 'Satisfaction Rate', value: '95%', color: 'bg-secondary' },
    { icon: Award, label: 'ARTA Compliant', value: '100%', color: 'bg-highlight' },
    { icon: Building2, label: 'Services Offered', value: '50+', color: 'bg-primary' },
  ];

  const features = [
    {
      icon: CheckCircle,
      title: 'ARTA Compliant',
      description: 'Following Anti-Red Tape Authority standards for transparent governance',
      color: 'bg-accent',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected under the Data Privacy Act of 2012',
      color: 'bg-secondary',
    },
    {
      icon: Zap,
      title: 'Quick & Easy',
      description: 'Complete the survey in minutes, online or offline',
      color: 'bg-highlight',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Two Column Layout */}
      <section className="flex-1 flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Sign In Section (30%) */}
        <div className="w-full lg:w-[30%] bg-white flex flex-col items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <img 
                src={logo} 
                alt="City Government of Valenzuela Logo" 
                className="h-24 w-24 object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Sign In Content */}
            <div className="text-center space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">
                  Sign in to access your survey dashboard
                </p>
              </div>

              {/* Connect Button */}
              <Button
                onClick={handleConnect}
                size="lg"
                className="w-full bg-primary hover:bg-secondary text-white shadow-lg hover:shadow-xl"
                icon={ArrowRight}
                iconPosition="right"
              >
                Connect
              </Button>

              {/* Privacy Link */}
              <div className="pt-4">
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-sm text-gray-500 hover:text-primary underline transition-colors duration-300"
                  aria-label="View Privacy Policy"
                >
                  Privacy & Policy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Banner Section (70%) */}
        <div className="w-full lg:w-[70%] bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Banner Content */}
          <div className="relative z-10 flex items-center justify-center h-full p-8 lg:p-16">
            <div className="max-w-3xl text-center space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                City Government of Valenzuela
              </h2>
              <h3 className="text-2xl md:text-3xl text-highlight font-semibold">
                Customer Satisfaction Survey
              </h3>
              <p className="text-lg md:text-xl text-white leading-relaxed opacity-90 max-w-2xl mx-auto">
                Your feedback matters! Help us improve our services by participating in our 
                ARTA-compliant satisfaction survey. Share your experience and contribute to 
                building a better Valenzuela.
              </p>

              {/* Stats Banner */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs opacity-90">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <PrivacyAndPolicy
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onAccept={handlePrivacyAccept}
      />

      {isUserTypeOpen && (
        <UserType
          onSelectUserType={handleSelectUserType}
          onClose={handleCloseUserType}
        />
      )}

      {isSignInOpen && (
        <SignIn
          userType={selectedUserType}
          onClose={handleCloseSignIn}
          onBack={handleBackToUserType}
        />
      )}
    </div>
  );
};

export default Homepage;
