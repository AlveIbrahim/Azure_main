import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Building, 
  Settings, 
  Megaphone, 
  Handshake,
  ChevronRight,
  CheckCircle,
  X,
  ZoomIn
} from 'lucide-react';

const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consultancy');
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const solutions = {
    facility: {
      icon: Settings,
      title: 'Facility Management',
      description: 'Complete facility management solutions for optimal workplace efficiency',
      services: [
        'Office/Residential Management',
        'Security & Cleaning Services',
        'Office Staff Support',
        'Hospitality Services',
        'Maintenance & Repairs',
        'Vendor Management'
      ]
    },
    consultancy: {
      icon: Briefcase,
      title: 'Consultancy Services',
      description: 'Strategic advisory services to guide your business decisions',
      services: [
        'Corporate Advisory',
        'Tax Advisory',
        'Catchup Compliance',
        'Strategic Planning',
        'Risk Management',
        'Business Restructuring'
      ]
    },
    management: {
      icon: Building,
      title: 'Management Support Services',
      description: 'Comprehensive operational support for seamless business operations',
      services: [
        'Company & Office Setup',
        'Legal & Tax Services',
        'HR Outsourcing & Payroll',
        'Accounting & Reporting',
        'Secretarial Compliance',
        'Tax Compliance'
      ]
    },
    promotion: {
      icon: Megaphone,
      title: 'Promotion & PR',
      description: 'Strategic marketing and public relations to elevate your brand',
      services: [
        'Creative & Promotional Support',
        'Public Relations',
        'Digital Marketing',
        'Go-to-Market Strategy',
        'Brand Development',
        'Content Creation'
      ]
    },
    liaison: {
      icon: Handshake,
      title: 'Liaison Services',
      description: 'Building strategic connections and partnerships for business growth',
      services: [
        'Networking',
        'Government Liaison',
        'Chamber & Association Support',
        'Stakeholder Management',
        'Partnership Development',
        'Regulatory Compliance'
      ]
    }
  };

  const tabVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "#ffffff"
    },
    active: { 
      scale: 1.02,
      backgroundColor: "#2076bc"
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const handleLearnMore = () => {
    setImageLoaded(false);
    setShowImageModal(true);
  };



  return (
    <section className="relative">
      {/* Solutions Content */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-azure-dark mb-6">Our Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive business solutions tailored to meet your unique needs and drive sustainable growth.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-3">
              {Object.entries(solutions).map(([key, solution]) => {
                const IconComponent = solution.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center space-x-3 shadow-md hover:shadow-lg ${
                      activeTab === key
                        ? 'bg-azure-dark text-white shadow-xl'
                        : 'bg-white hover:bg-azure-light text-gray-700 hover:text-azure-dark'
                    }`}
                    variants={tabVariants}
                    animate={activeTab === key ? "active" : "inactive"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{ rotate: activeTab === key ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.div>
                    <span className="font-semibold flex-1">{solution.title}</span>
                    <motion.div
                      animate={{ rotate: activeTab === key ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <AnimatePresence mode="wait">
                {Object.entries(solutions).map(([key, solution]) => {
                  const IconComponent = solution.icon;
                  return (
                    activeTab === key && (
                      <motion.div
                        key={key}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <div className="flex items-center space-x-4 mb-6">
                          <motion.div 
                            className="w-12 h-12 bg-azure-light rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <IconComponent className="w-6 h-6 text-azure-dark" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-azure-dark">{solution.title}</h3>
                            <p className="text-gray-600">{solution.description}</p>
                          </div>
                        </div>

                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, staggerChildren: 0.1 }}
                        >
                          {solution.services.map((service, index) => (
                            <motion.div 
                              key={index} 
                              className="flex items-center space-x-3 p-3 bg-azure-light/30 rounded-lg hover:bg-azure-light/50 transition-colors duration-300"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <CheckCircle className="w-5 h-5 text-azure-medium flex-shrink-0" />
                              <span className="text-gray-700">{service}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        <div className="flex space-x-4">
                          <motion.button 
                            onClick={handleLearnMore}
                            className="bg-azure-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-azure-medium transition-all duration-300 flex items-center space-x-2 relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-azure-medium to-azure-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <ZoomIn className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">Learn More</span>
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="relative z-10"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </motion.div>
                          </motion.button>
                        </div>
                      </motion.div>
                    )
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {showImageModal && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowImageModal(false)}
            >
              <motion.div
                className="relative bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold text-azure-dark"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {solutions[activeTab as keyof typeof solutions].title}
                  </motion.h3>
                  <motion.button
                    onClick={() => setShowImageModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>

                {/* Image Container */}
                <motion.div 
                  className="relative overflow-hidden rounded-xl bg-gray-100"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Loading Placeholder */}
                  {!imageLoaded && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-azure-light/20 to-azure-medium/20"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: imageLoaded ? 0 : 1 }}
                    >
                      <motion.div
                        className="w-8 h-8 border-3 border-azure-medium border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}

                  {/* Main Image */}
                  <motion.img
                    src="https://i.imgur.com/lHeIwlE.jpeg"
                    alt={`${solutions[activeTab as keyof typeof solutions].title} Details`}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    onLoad={() => setImageLoaded(true)}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: imageLoaded ? 1 : 0,
                      scale: imageLoaded ? 1 : 1.1
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ 
                      filter: imageLoaded ? 'none' : 'blur(10px)',
                      transition: 'filter 0.3s ease-out'
                    }}
                  />

                  {/* Image Overlay for Better UX */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>

                {/* Footer */}
                <motion.div 
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm text-gray-600">
                    Click anywhere outside to close
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Solutions;
