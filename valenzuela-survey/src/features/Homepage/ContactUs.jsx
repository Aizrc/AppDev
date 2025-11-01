import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'MacArthur Highway, Valenzuela City, Metro Manila',
      color: 'bg-accent'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '(02) 8292-2222',
      color: 'bg-secondary'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@valenzuela.gov.ph',
      color: 'bg-primary'
    }
  ];
  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with us!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                hover={true}
                className="text-center"
              >
                <div className={`${info.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.content}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card padding="p-8">
            <Card.Header>
              <Card.Title className="text-2xl">City Government of Valenzuela</Card.Title>
              <Card.Description className="mt-4">
                Committed to providing quality service to all citizens through innovation and transparency.
              </Card.Description>
            </Card.Header>
            <Card.Content className="mt-6 space-y-6">
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-primary mb-3">ICTO Department</h4>
                <p className="text-gray-600 mb-2">Information and Communications Technology Office</p>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="text-sm">icto@valenzuela.gov.ph</span>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  For technical support and inquiries about the survey system
                </p>
              </div>
            </Card.Content>
          </Card>

          <Card padding="p-8">
            <Card.Header>
              <Card.Title className="text-2xl">Send us a Message</Card.Title>
            </Card.Header>
            <Card.Content className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    icon={Mail}
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  type="text"
                  placeholder="Message subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
                <Input.TextArea
                  label="Message"
                  rows={5}
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  iconPosition="right"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
