import { useState } from 'react';
import { Users, LogIn } from 'lucide-react';
import Button from '../../components/ui/Button';

const UserType = ({ onSelectUserType, onClose }) => {
  const [selectedType, setSelectedType] = useState(null);

  const userTypes = [
    {
      id: 'survey',
      title: 'Survey',
      description: 'I want to participate in the customer satisfaction survey',
      icon: Users,
      color: 'from-accent to-secondary',
      iconBg: 'bg-accent',
    },
    {
      id: 'signin',
      title: 'Sign In',
      description: 'Access your account and dashboard',
      icon: LogIn,
      color: 'from-primary to-secondary',
      iconBg: 'bg-primary',
    },
  ];

  const handleContinue = () => {
    if (selectedType) {
      onSelectUserType(selectedType);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Select User Type
            </h2>
            <p className="text-gray-600">
              Choose your role to continue
            </p>
          </div>

          {/* User Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
            {userTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all duration-300
                    hover:shadow-lg hover:-translate-y-1
                    ${isSelected 
                      ? 'border-primary shadow-xl scale-105' 
                      : 'border-gray-200 hover:border-primary/50'
                    }
                  `}
                  aria-pressed={isSelected}
                  aria-label={`Select ${type.title} user type`}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`${type.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              variant="primary"
              size="lg"
              disabled={!selectedType}
              className={!selectedType ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserType;
