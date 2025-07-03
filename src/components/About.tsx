import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users } from 'lucide-react';
import InteractiveOrb from './InteractiveOrb';
import ParallelogramServices from './ParallelogramServices';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower businesses with innovative solutions that drive sustainable growth and success.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the global leader in comprehensive business solutions and strategic partnerships.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, ensuring exceptional outcomes.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build lasting relationships based on trust, transparency, and mutual success.'
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
        duration: 0.6
      }
    }
  };

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Decorative 3D elements */}
        <div className="absolute top-10 right-10 hidden lg:block">
          <InteractiveOrb size={120} className="opacity-20" />
        </div>
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-azure-dark mb-6">About Azure Business Solution</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a global business solutions provider committed to empowering organizations 
            with comprehensive services that drive growth and operational excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-azure-dark">Our Story</h3>
            <p className="text-gray-600 leading-relaxed">
              Founded with a vision to bridge the gap between ambitious businesses and their goals, 
              Azure Business Solution has evolved into a trusted partner for organizations worldwide. 
              Our journey began with a simple belief: every business deserves access to world-class 
              advisory and support services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we serve clients across multiple industries, providing tailored solutions that 
              address unique challenges and unlock new opportunities for growth. Our multidisciplinary 
              approach ensures that every aspect of your business receives the attention it deserves.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-azure-light to-white rounded-2xl p-8 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Subtle 3D background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-azure-medium/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
              initial={{ scale: 0.8, rotate: -10 }}
              whileHover={{ scale: 1, rotate: 0 }}
            />
            
            <h3 className="text-2xl font-bold text-azure-dark mb-6 relative z-10">Why Choose Azure?</h3>
            <ul className="space-y-4 relative z-10">
              {[
                'Comprehensive end-to-end business solutions',
                'Global expertise with local market knowledge',
                'Proven track record of delivering results',
                'Dedicated support throughout your journey'
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <motion.div 
                    className="w-6 h-6 bg-azure-medium rounded-full flex items-center justify-center mt-1"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 180,
                      boxShadow: "0 0 20px rgba(32, 118, 188, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div 
                key={index}
                className="text-center group relative"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {/* 3D card effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-azure-light/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0.8, rotateX: -10 }}
                  whileHover={{ scale: 1, rotateX: 0 }}
                  style={{ transformStyle: 'preserve-3d' }}
                />
                
                <motion.div 
                  className="w-16 h-16 bg-azure-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-azure-medium transition-colors duration-300 relative z-10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 10px 30px rgba(32, 118, 188, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <IconComponent className="w-8 h-8 text-azure-dark" />
                </motion.div>
                <h4 className="text-xl font-bold text-azure-dark mb-2 group-hover:text-azure-medium transition-colors relative z-10">
                  {value.title}
                </h4>
                <p className="text-gray-600 relative z-10">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
      <ParallelogramServices />
    </>
  );
};

export default About;
