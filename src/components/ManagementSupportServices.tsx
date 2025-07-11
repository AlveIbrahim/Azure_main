import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, titleVariants, managementServiceVariants, viewportSettings } from '../lib/animations';

const services = [
  {
    text: 'Company\nSetup',
    bg: '#23235c',
    color: '#fff',
  },
  {
    text: 'Office Setup &\nMaintenance',
    bg: '#2d3570',
    color: '#fff',
  },
  {
    text: 'Legal Services',
    bg: '#2e7bbd',
    color: '#fff',
  },
  {
    text: 'Accounts and\nTax Services',
    bg: '#3bb3e6',
    color: '#fff',
  },
  {
    text: 'HR Outsourcing &\nPayroll Management',
    bg: '#b3e0ef',
    color: '#fff',
  },
];

const rectStyle = {
  width: 160,
  height: 180,
  borderRadius: 32,
  boxShadow: '8px 8px 20px rgba(0,0,0,0.15)',
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  position: 'relative' as const,
  transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)',
};

const ManagementSupportServices: React.FC = () => {

  return (
    <motion.section 
      className="my-32 max-w-7xl mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
        variants={containerVariants}
      > 
        {/* Shapes on the left */}
        <motion.div 
          className="flex flex-row items-center justify-center md:justify-start gap-8"
          variants={managementServiceVariants}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              style={{
                ...rectStyle,
                background: service.bg,
                color: service.color,
              }}
              className="flex-shrink-0"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "12px 12px 25px rgba(0,0,0,0.25)"
              }}
              transition={{ duration: 0.3 }}
            >
              <span
                style={{
                  display: 'block',
                  whiteSpace: 'pre-line',
                  fontWeight: 700,
                  fontSize: 18,
                  textAlign: 'center',
                  lineHeight: 1.3,
                  width: '90%',
                  color: '#fff',
                }}
              >
                {service.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Title/Description on the right */}
        <motion.div 
          className="flex-1 flex flex-col justify-center md:justify-start md:pl-12"
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 text-left">
            Management Support System
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left leading-relaxed">
            We believe, our partners should focus in their business to escalate growth and hassle of support systems will be taken care by us. Furthermore with local knowledge and global expertise we provide the following service
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ManagementSupportServices;