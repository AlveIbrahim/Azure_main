import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, titleVariants, consultationServiceVariants, viewportSettings } from '../lib/animations';

const services = [
  {
    text: 'Corporate\nAdvisory',
    bg: '#23235c',
    color: '#fff',
  },
  {
    text: 'TAX Advisory',
    bg: '#2e7bbd',
    color: '#fff',
  },
  {
    text: 'Catchup\nCompliance',
    bg: '#3bb3e6',
    color: '#fff',
  },
];

const circleStyle = {
  width: 140,
  height: 140,
  borderRadius: '50%',
  boxShadow: '8px 8px 20px rgba(0,0,0,0.15)',
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  position: 'relative' as const,
  transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)',
};

const ConsultationServices: React.FC = () => {

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
        {/* Title/Description on the left */}
        <motion.div 
          className="flex-1 flex flex-col justify-center md:justify-start md:pr-12"
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 text-left">
            Consultation Service
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left leading-relaxed">
            is providing direction and effective advice, so that our clients can take effective and cost efficient approach to business. We advice on the following
          </p>
        </motion.div>
        
        {/* Shapes on the right */}
        <motion.div 
          className="flex flex-row items-center justify-center md:justify-end gap-8"
          variants={consultationServiceVariants}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              style={{
                ...circleStyle,
                background: service.bg,
                color: service.color,
              }}
              className="flex-shrink-0"
              whileHover={{ 
                scale: 1.15,
                rotate: 360,
                boxShadow: "15px 15px 30px rgba(0,0,0,0.25)"
              }}
              transition={{ duration: 0.5 }}
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
      </motion.div>
    </motion.section>
  );
};

export default ConsultationServices;