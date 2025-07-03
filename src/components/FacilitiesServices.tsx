import React, { useEffect, useRef, useState } from 'react';

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
  position: 'relative',
  transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)',
};

const ParallelogramServices: React.FC = () => {
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
        rootMargin: '0px 0px -100px 0px',
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
        {/* Title/Description on the left */}
        <div className="flex-1 flex flex-col justify-center md:justify-start md:pr-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 text-left">
            Facility Management Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left leading-relaxed">
            Managing a commercial or residence space is not easy, the critical management problems that comes with management of these spaces can be solved with Azure Facility Management Support Service where we take care of the following
          </p>
        </div>
        {/* Shapes on the right */}
        <div className="flex flex-row items-center justify-center md:justify-end gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{
                ...parallelogramStyle,
                background: service.bg,
                color: service.color,
              }}
              className={`flex-shrink-0 hover:scale-105 hover:shadow-lg`}
            >
              <span
                style={{
                  transform: 'skew(15deg)',
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
      </div>
    </section>
  );
};

export default ParallelogramServices; 