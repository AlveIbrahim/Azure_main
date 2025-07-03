import React, { useEffect, useRef, useState } from 'react';

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
        {/* Title/Description on the left */}
        <div className="flex-1 flex flex-col justify-center md:justify-start md:pr-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 text-left">
            Promotion & PR
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-left leading-relaxed">
            Whatever the business, letting people know about your business is very important to generate business. Promotion and PR gives the leverage for the business to reach out to their respective Target Groups. A customize Strategy and execution for respective clients as per their objectives and goals.
          </p>
        </div>
        {/* Shapes on the right */}
        <div className="flex flex-row items-center justify-center md:justify-end gap-8">
          {services.map((service, idx) => (
            <div
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)',
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
      </div>
    </section>
  );
};

export default PromotionPRServices; 