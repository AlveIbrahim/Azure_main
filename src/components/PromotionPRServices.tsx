import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, titleVariants, promotionServiceVariants, viewportSettings } from '../lib/animations';

const services = [
  {
    text: 'Creative\nSupport',
    bg: '#23235c',
    color: '#fff',
  },
  {
    text: 'Promotional\nSupport',
    bg: '#2d3570',
    color: '#fff',
  },
  {
    text: 'PR\nManagement',
    bg: '#2e7bbd',
    color: '#fff',
  },
  {
    text: 'Digital\nMarketing',
    bg: '#3bb3e6',
    color: '#fff',
  },
  {
    text: 'Go to Market\nService',
    bg: '#b3e0ef',
    color: '#fff',
  },
];

const hexClip = 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)';

const PromotionPRServices: React.FC = () => {

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
            Promotion & PR
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left leading-relaxed">
            Whatever the business, letting people know about your business is very important to generate business. Promotion and PR gives the leverage for the business to reach out to their respective Target Groups. A customize Strategy and execution for respective clients as per their objectives and goals.
          </p>
        </motion.div>
        
        {/* Shapes on the right */}
        <motion.div 
          className="flex flex-row items-center justify-center md:justify-end gap-8"
          variants={promotionServiceVariants}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              style={{
                background: service.bg,
                color: service.color,
                width: 160,
                height: 180,
                clipPath: hexClip,
                WebkitClipPath: hexClip,
                zIndex: 10 - idx,
                boxShadow: '8px 8px 20px rgba(0,0,0,0.15)',
                display: 'flex' as const,
                alignItems: 'center' as const,
                justifyContent: 'center' as const,
                position: 'relative' as const,
              }}
              className="flex-shrink-0"
              whileHover={{ 
                scale: 1.1,
                y: -10,
                boxShadow: "12px 12px 30px rgba(0,0,0,0.25)"
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
      </motion.div>
    </motion.section>
  );
};

export default PromotionPRServices;