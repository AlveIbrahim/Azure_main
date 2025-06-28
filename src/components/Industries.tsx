import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Landmark,
  TrendingUp
} from 'lucide-react';

const Industries: React.FC = () => {
  const industries = [
    {
      icon: Building2,
      title: 'Real Estate',
      description: 'Comprehensive solutions for property development, management, and investment strategies.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Landmark,
      title: 'Financial Services',
      description: 'Regulatory compliance and operational support for financial institutions and fintech companies.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: TrendingUp,
      title: 'Startups & SMEs',
      description: 'Growth-focused solutions for emerging businesses and small to medium enterprises.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-azure-dark mb-6">Industries We Serve</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our expertise spans across key industries, delivering tailored solutions 
          that address sector-specific challenges and opportunities.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {industries.map((industry, index) => {
          const IconComponent = industry.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-azure-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <motion.div 
                className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mb-6 relative z-10`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-azure-dark mb-4 group-hover:text-azure-medium transition-colors duration-300 relative z-10">
                {industry.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed relative z-10">
                {industry.description}
              </p>

              <motion.div 
                className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <span className="text-azure-medium font-semibold flex items-center">
                  Learn more 
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-azure-light to-white rounded-2xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-azure-dark mb-4">Don't See Your Industry?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We work with businesses across all sectors. Our adaptable solutions can be customized 
          to meet the unique requirements of any industry.
        </p>
        <motion.button 
          className="bg-azure-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-azure-medium transition-all duration-300 relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-azure-medium to-azure-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="relative z-10">Contact Us Today</span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Industries;
