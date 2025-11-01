import { ClipboardList, BarChart3, Shield, Smartphone, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';

const Services = () => {
  const services = [
    {
      title: "Customer Satisfaction Survey",
      description: "Share your experience with government services through our ARTA-compliant survey platform.",
      icon: ClipboardList,
      features: ["Quick & Easy", "Mobile Friendly", "Offline Mode"],
      color: "bg-accent"
    },
    {
      title: "Real-time Analytics",
      description: "Access comprehensive dashboards showing citizen satisfaction trends and service performance.",
      icon: BarChart3,
      features: ["Live Data", "Visual Reports", "Export Options"],
      color: "bg-secondary"
    },
    {
      title: "Data Privacy & Security",
      description: "Your information is protected with industry-standard encryption and compliance measures.",
      icon: Shield,
      features: ["Encrypted Data", "DPA Compliant", "Secure Storage"],
      color: "bg-primary"
    },
    {
      title: "Multi-Platform Access",
      description: "Complete surveys on any device - desktop, mobile, tablet, or kiosk.",
      icon: Smartphone,
      features: ["Responsive Design", "QR Code Access", "Kiosk Mode"],
      color: "bg-highlight"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions for citizen feedback and service improvement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                hover={true}
                padding="p-8"
                className="border-t-4 border-primary"
              >
                <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <Card.Header>
                  <Card.Title className="text-2xl mb-3">{service.title}</Card.Title>
                  <Card.Description className="text-base leading-relaxed">
                    {service.description}
                  </Card.Description>
                </Card.Header>
                <Card.Content className="mt-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 group/item">
                        <CheckCircle className="w-5 h-5 text-accent mr-3 group-hover/item:scale-110 transition-transform" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
