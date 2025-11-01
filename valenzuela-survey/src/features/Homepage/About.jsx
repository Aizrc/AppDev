import { CheckCircle, Shield, Smartphone, BarChart3, Code, Database, Globe, Zap } from 'lucide-react';
import Card from '../../components/ui/Card';

const About = () => {
  const features = [
    { icon: CheckCircle, title: 'ARTA Compliant', description: 'Fully compliant with ARTA standards for transparent and efficient government service delivery.', color: 'bg-accent' },
    { icon: Shield, title: 'Data Privacy', description: 'Adheres to the Data Privacy Act of 2012 (RA 10173) with encrypted data transmission and storage.', color: 'bg-secondary' },
    { icon: Smartphone, title: 'Cross-Platform', description: 'Accessible via web, mobile, and kiosk modes with offline submission capability.', color: 'bg-highlight' },
    { icon: BarChart3, title: 'Analytics Dashboard', description: 'Real-time data analytics with comprehensive reporting and export capabilities.', color: 'bg-primary' },
  ];

  const techStack = [
    { icon: Code, name: 'Frontend', tech: 'React.js + Tailwind', color: 'text-accent' },
    { icon: Database, name: 'Backend', tech: 'Node.js + Express', color: 'text-secondary' },
    { icon: Globe, name: 'Database', tech: 'MySQL / Firebase', color: 'text-primary' },
    { icon: Zap, name: 'Hosting', tech: 'Cloud-based', color: 'text-highlight' },
  ];
  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">About This System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern, ARTA-compliant solution for citizen feedback and service improvement
          </p>
        </div>

        <Card className="mb-12" padding="p-10">
          <Card.Header>
            <Card.Title className="text-3xl text-center mb-6">
              ARTA Customer Satisfaction Survey System
            </Card.Title>
            <Card.Description className="text-lg leading-relaxed text-center">
              This system is designed to automate the Customer Satisfaction Survey process in compliance 
              with the Anti-Red Tape Authority (ARTA) Memorandum Circular No. 2020-001. It provides a 
              modern, cross-platform solution for gathering citizen feedback on government services.
            </Card.Description>
          </Card.Header>
        </Card>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover={true} padding="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card padding="p-10">
          <Card.Header>
            <Card.Title className="text-3xl text-center mb-8">Technology Stack</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 bg-background rounded-xl hover:bg-white transition-colors group"
                  >
                    <Icon className={`w-12 h-12 mx-auto mb-4 ${tech.color} group-hover:scale-110 transition-transform`} />
                    <p className="font-bold text-primary mb-1">{tech.name}</p>
                    <p className="text-sm text-gray-600">{tech.tech}</p>
                  </div>
                );
              })}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default About;
