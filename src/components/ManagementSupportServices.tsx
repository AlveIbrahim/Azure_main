import React, { useEffect, useRef, useState } from 'react';

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
  transform: 'rotate(-8deg)',
  boxShadow: '8px 8px 20px rgba(0,0,0,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)',
};

const ManagementSupportServices: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="my-32 max-w-7xl mx-auto px-4">
      <div className={`flex flex-col md:flex-row items-center md:items-stretch gap-8 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
        {/* Shapes on the left */}
        <div className="flex flex-row items-center justify-center md:justify-start gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{
                ...rectStyle,
                background: service.bg,
                color: service.color,
              }}
              className={`flex-shrink-0 hover:scale-105 hover:shadow-lg`}
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
            </div>
          ))}
        </div>
        {/* Title/Description on the right */}
        <div className="flex-1 flex flex-col justify-center md:justify-start md:pl-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 text-left">
            Management Support System
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left leading-relaxed">
            We believe, our partners should focus in their business to escalate growth and hassle of support systems will be taken care by us. Furthermore with local knowledge and global expertise we provide the following service
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManagementSupportServices; 