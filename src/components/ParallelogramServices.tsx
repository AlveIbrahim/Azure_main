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
    <section ref={sectionRef} className="my-20 max-w-7xl mx-auto px-4">
      <div className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 text-center">
          Facility Management Services
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mb-12 mx-auto text-center leading-relaxed">
          Managing a commercial or residence space is not easy, the critical management problems that comes with management of these spaces can be solved with Azure Facility Management Support Service where we take care of the following
        </p>
      </div>
      
      <div className={`flex flex-wrap gap-0 justify-center transition-all duration-1000 ease-out delay-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {services.map((service, idx) => (
          <div
            key={idx}
            style={{
              background: service.bg,
              color: service.color,
              transform: 'skew(-15deg)',
              minWidth: 200,
              minHeight: 240,
              marginRight: idx !== services.length - 1 ? -20 : 0,
              marginLeft: idx !== 0 ? 20 : 0,
              zIndex: 10 - idx,
              boxShadow: '8px 8px 20px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            className={`parallelogram-service px-8 py-12 flex-shrink-0 transition-all duration-700 ease-out hover:scale-105 hover:shadow-lg`}
          >
            <span
              style={{
                transform: 'skew(15deg)',
                display: 'block',
                whiteSpace: 'pre-line',
                fontWeight: 700,
                fontSize: 22,
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {service.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParallelogramServices; 