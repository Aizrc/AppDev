import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Shield, FileText, Lock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary font-bold text-xl">V</span>
              </div>
              <h3 className="text-xl font-bold">City of Valenzuela</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Committed to providing quality service to all citizens through innovation and transparency.
              Building a progressive and sustainable city together.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-300 hover:text-highlight transition-colors group">
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>MacArthur Highway, Valenzuela City</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 hover:text-highlight transition-colors group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>(02) 8292-2222</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 hover:text-highlight transition-colors group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>info@valenzuela.gov.ph</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-highlight">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  → Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  → About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  → Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  → Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-highlight">Legal & Compliance</h3>
            <ul className="space-y-2">
              <li>
                <button className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors group">
                  <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors group">
                  <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors group">
                  <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Data Privacy Act</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              &copy; {currentYear} City Government of Valenzuela - ICTO. All rights reserved.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-highlight hover:scale-110 transition-all duration-300 shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-highlight hover:scale-110 transition-all duration-300 shadow-md"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-highlight hover:scale-110 transition-all duration-300 shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
