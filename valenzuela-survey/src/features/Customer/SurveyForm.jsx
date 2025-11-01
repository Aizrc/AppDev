import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipboardList, Star, ThumbsUp, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SurveyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCategory = location.state?.category || 'general';
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    birthday: '',
    phone: '',
    address: '',
    // Survey Information
    category: selectedCategory,
    serviceName: '',
    dateReceived: '',
    rating: 0,
    feedback: '',
    suggestions: '',
  });

  const totalSteps = 4;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        // Save credentials (email and birthday will be the password)
        const credentials = {
          email: formData.email,
          password: formData.birthday,
          fullName: formData.fullName,
        };
        // TODO: Send to backend API
        alert(`Survey submitted successfully! Thank you, ${formData.fullName}!\n\nYour credentials:\nEmail: ${formData.email}\nPassword: ${formData.birthday}`);
        navigate('/');
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const RatingStars = ({ rating, onRate }) => {
    return (
      <div className="flex items-center justify-center space-x-3 my-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className="group transition-transform hover:scale-125 focus:outline-none"
          >
            <Star
              className={`w-12 h-12 transition-all ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 group-hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ClipboardList className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Customer Satisfaction Survey</h1>
          <p className="text-gray-600">Help us improve our services through your valuable feedback</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card padding="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold text-primary">Basic Information</h2>
                </div>
                
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Juan Dela Cruz"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="juan.delacruz@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <Input
                  label="Birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  required
                  helperText="This will be used as your password"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="09XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />

                <Input
                  label="Address"
                  type="text"
                  placeholder="Barangay, City"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your email and birthday will be your login credentials for future access.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <ThumbsUp className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold text-primary">Service Information</h2>
                </div>
                
                <Input
                  label="Service Name"
                  type="text"
                  placeholder="e.g., Business Permit Renewal"
                  value={formData.serviceName}
                  onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                  required
                />

                <Input
                  label="Date Service Received"
                  type="date"
                  value={formData.dateReceived}
                  onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                  required
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your responses will help us maintain quality service delivery in compliance with ARTA standards.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Star className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold text-primary">Rate Your Experience</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    How satisfied are you with the service you received?
                  </label>
                  <RatingStars
                    rating={formData.rating}
                    onRate={(rating) => setFormData({ ...formData, rating })}
                  />
                  <div className="flex justify-between text-xs text-gray-500 px-4">
                    <span>Very Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2 mt-8">
                  {['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'].map((label, index) => (
                    <div
                      key={index}
                      className={`text-center px-3 py-2 rounded-full text-xs font-medium ${
                        formData.rating === index + 1 
                          ? 'bg-accent text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {formData.rating > 0 && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-800 font-medium">
                      Thank you for rating! Your feedback matters to us.
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold text-primary">Your Feedback</h2>
                </div>

                <Input.TextArea
                  label="What did you like about our service?"
                  rows={4}
                  placeholder="Share your positive experience..."
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  required
                />

                <Input.TextArea
                  label="How can we improve? (Optional)"
                  rows={4}
                  placeholder="Your suggestions are valuable to us..."
                  value={formData.suggestions}
                  onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
                />

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Privacy Notice:</strong> Your personal information is protected under the Data Privacy Act of 2012.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              <Button
                type="submit"
                variant="primary"
                icon={currentStep === totalSteps ? Send : undefined}
                iconPosition="right"
                isLoading={isSubmitting}
              >
                {currentStep === totalSteps ? 'Submit Survey' : 'Next Step'}
              </Button>
            </div>
          </form>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          Need assistance? Contact us at <span className="text-accent font-medium">icto@valenzuela.gov.ph</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
