import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, titleVariants, liaisonServiceVariants, viewportSettings } from '../lib/animations';

const services = [
  {
    text: 'Networking',
    bg: '#23235c',
    color: '#fff',
  },
  {
    text: 'Gov. Liaison',
    bg: '#2d3570',
    color: '#fff',
  },
  {
    text: 'Chamber and\nAssociation\nLiaison',
    bg: '#2e7bbd',
    color: '#fff',
  },
];

// Trapezoid: top narrower than bottom
const trapezoidClip = 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)';

const LiaisonServices: React.FC = () => {

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
          variants={liaisonServiceVariants}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              style={{
                background: service.bg,
                color: service.color,
                width: 180,
                height: 200,
                clipPath: trapezoidClip,
                WebkitClipPath: trapezoidClip,
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
                y: -15,
                rotateX: 10,
                boxShadow: "15px 15px 35px rgba(0,0,0,0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <span
                style={{
                  display: 'block',
                  whiteSpace: 'pre-line',
                  fontWeight: 700,
                  fontSize: 20,
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
            Liaison Service
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left leading-relaxed">
            Networking in Business is crucial for growth and expansion, we connect our clients with our robust network to enhance their Network leading to business. Furthermore Network will our clients' businesses to facilitate.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LiaisonServices;