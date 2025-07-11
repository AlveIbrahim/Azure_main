import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, titleVariants, itemVariants, facilitiesServiceVariants, viewportSettings } from '../lib/animations';
const services = [
  {
    text: 'Office/\nResidence\nUtility &\nOverall\nmanagement',
    bg: '#2d3570',
    color: '#fff',
  },
  {
    text: 'Security',
    bg: '#313e8c',
    color: '#fff',
  },
  {
    text: 'Cleaning',
    bg: '#2e7bbd',
    color: '#fff',
  },
  {
    text: 'Office Staff',
    bg: '#3bb3e6',
    color: '#fff',
  },
  {
    text: 'Hospitality\nService',
    bg: '#b3e0ef',
    color: '#fff',
  },
];

const parallelogramStyle = {
  transform: 'skew(-15deg)',
  minWidth: 160,
  minHeight: 180,
  boxShadow: '8px 8px 20px rgba(0,0,0,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative' as const,
  transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)',
};

const ParallelogramServices: React.FC = () => {

  return (
    <motion.section 
      className="my-32 max-w-7xl mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={containerVariants}
    >
      {/* Our Solutions Heading */}
      <motion.div
        className="text-center mb-16"
        variants={itemVariants}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">Our Solutions</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive business solutions to help your company grow and succeed.
        </p>
      </motion.div>

      <motion.div 
        className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
        variants={containerVariants}
      >
        {/* Title/Description on the left */}
        <motion.div 
          className="flex-1 flex flex-col justify-center md:justify-start md:pr-32"
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 text-left">
            Facility Management Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left leading-relaxed">
            Managing a commercial or residence space is not easy, the critical management problems that comes with management of these spaces can be solved with Azure Facility Management Support Service where we take care of the following
          </p>
        </motion.div>
        
        {/* Shapes on the right */}
        <motion.div 
          className="flex flex-row items-center justify-center md:justify-end gap-8"
          variants={facilitiesServiceVariants}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              style={{
                ...parallelogramStyle,
                background: service.bg,
                color: service.color,
              }}
              className="flex-shrink-0"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "12px 12px 25px rgba(0,0,0,0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  transform: 'skew(15deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    whiteSpace: 'pre-line',
                    fontWeight: 700,
                    fontSize: 16,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    color: '#fff',
                    fontStyle: 'normal',
                  }}
                >
                  {service.text}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ParallelogramServices;