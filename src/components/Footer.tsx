import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  ArrowUp,
  Globe
} from 'lucide-react';
import Logo3D from './Logo3D';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  const quickLinks = [
    { label: 'Home', section: 'home' },
    { label: 'About Us', section: 'about' },
    { label: 'Solutions', section: 'solutions' },
    { label: 'Industries', section: 'industries' },
    { label: 'Experts', section: 'experts' },
    { label: 'Contact', section: 'contact' },
  ];

  const services = [
    'Consultancy Services',
    'Management Support',
    'Facility Management',
    'Promotion & PR',
    'Liaison Services'
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-gradient-to-br from-azure-dark to-azure-medium text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16">
                <Logo3D />
              </div>
              <div>
                <h3 className="text-xl font-bold">Azure Business Solution</h3>
                <p className="text-azure-light text-sm">Your Global Business Partner</p>
              </div>
            </div>
            <p className="text-azure-light leading-relaxed">
              Empowering businesses worldwide with comprehensive solutions that drive 
              growth and operational excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index}>
                  <button
                    onClick={() => setActiveSection(link.section)}
                    className="text-azure-light hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <motion.span
                      className="w-1 h-1 bg-azure-light rounded-full group-hover:bg-white transition-colors duration-300"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span>{link.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  className="text-azure-light hover:text-white transition-colors duration-300 flex items-center space-x-2 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="w-1 h-1 bg-azure-light rounded-full group-hover:bg-white transition-colors duration-300"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span>{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-azure-light mt-1 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-azure-light group-hover:text-white transition-colors">
                    Global City, GC 12345
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-azure-light group-hover:text-white transition-colors" />
                <a 
                  href="tel:+15551234567" 
                  className="text-azure-light hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-azure-light group-hover:text-white transition-colors" />
                <a 
                  href="mailto:info@azurebusinesssolution.com" 
                  className="text-azure-light hover:text-white transition-colors"
                >
                  info@azurebusinesssolution.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-azure-light text-sm mb-4 md:mb-0">
            © 2024 Azure Business Solution. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm">Back to top</span>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
