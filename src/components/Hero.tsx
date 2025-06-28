import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, TrendingUp, CheckCircle } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import FloatingElements from './FloatingElements';

interface HeroProps {
  setActiveSection?: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    {
      icon: Globe,
      number: "50+",
      title: "Countries Served",
      description: "Global reach across continents"
    },
    {
      icon: Users,
      number: "500+",
      title: "Expert Team",
      description: "Experienced professionals"
    },
    {
      icon: TrendingUp,
      number: "98%",
      title: "Success Rate",
      description: "Proven business results"
    }
  ];

  const features = [
    "Comprehensive end-to-end business solutions",
    "Global expertise with local market knowledge",
    "24/7 dedicated support and consultation",
    "Proven track record of delivering results"
  ];

  const handleGetStarted = () => {
    if (setActiveSection) {
      setActiveSection('contact');
    }
  };

  const handleLearnMore = () => {
    if (setActiveSection) {
      setActiveSection('about');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <ParticleBackground />
      <FloatingElements count={15} className="opacity-30" />
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Information */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-azure-dark leading-tight"
              variants={itemVariants}
            >
              Your Global
              <motion.span 
                className="block text-azure-medium"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Business Partner
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              Empowering businesses worldwide with comprehensive solutions in consultancy, 
              management support, and strategic growth initiatives. Transform your vision into reality.
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-azure-medium flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button 
                onClick={handleGetStarted}
                className="group bg-azure-dark text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-azure-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-azure-medium to-azure-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">Get Started</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <motion.button 
                onClick={handleLearnMore}
                className="border-2 border-azure-medium text-azure-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-azure-light transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-azure-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">Learn More</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 pt-8"
              variants={containerVariants}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center group"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-azure-medium mx-auto mb-2" />
                    </motion.div>
                    <div className="text-2xl font-bold text-azure-dark group-hover:text-azure-medium transition-colors">
                      {stat.number}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">{stat.title}</div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Professional Image */}
          <motion.div 
            className="relative"
            variants={itemVariants}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Container */}
              <div className="relative">
                <img
                  src="https://i.imgur.com/kN9Hsyh.png"
                  alt="Professional Business Solutions"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '600px' }}
                />
                
                {/* Overlay for better text readability */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-azure-dark/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-azure-dark">Available 24/7</span>
                </div>
              </motion.div>

              {/* Bottom Info Card */}
              <motion.div
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-sm">
                  <div className="font-semibold text-azure-dark mb-1">Trusted by 1000+ Companies</div>
                  <div className="text-gray-600">Join the success story</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-azure-light/30 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-azure-medium/20 rounded-full blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
