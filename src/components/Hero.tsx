import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Users, TrendingUp, CheckCircle, ChevronLeft, ChevronRight, Settings, Briefcase, Building, Megaphone, Handshake } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import FloatingElements from './FloatingElements';

interface HeroProps {
  setActiveSection?: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isSliderActive, setIsSliderActive] = useState(false);
  const [sliderPhase, setSliderPhase] = useState<'inactive' | 'active' | 'completed'>('inactive');
  const serviceSliderRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastWheelTime = useRef(0);
  const emergencyEscapeCount = useRef(0);

  // Check if device is mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Solutions data
  const solutions = [
    {
      id: 'facility',
      icon: Settings,
      title: 'Facility Management',
      description: 'Complete facility management solutions for optimal workplace efficiency',
      services: [
        'Office/Residential Management',
        'Security & Cleaning Services',
        'Office Staff Support',
        'Hospitality Services',
        'Maintenance & Repairs',
        'Vendor Management'
      ]
    },
    {
      id: 'consultancy',
      icon: Briefcase,
      title: 'Consultancy Services',
      description: 'Strategic advisory services to guide your business decisions',
      services: [
        'Corporate Advisory',
        'Tax Advisory',
        'Catchup Compliance',
        'Strategic Planning',
        'Risk Management',
        'Business Restructuring'
      ]
    },
    {
      id: 'management',
      icon: Building,
      title: 'Management Support Services',
      description: 'Comprehensive operational support for seamless business operations',
      services: [
        'Company & Office Setup',
        'Legal & Tax Services',
        'HR Outsourcing & Payroll',
        'Accounting & Reporting',
        'Secretarial Compliance',
        'Tax Compliance'
      ]
    },
    {
      id: 'promotion',
      icon: Megaphone,
      title: 'Promotion & PR',
      description: 'Strategic marketing and public relations to elevate your brand',
      services: [
        'Creative & Promotional Support',
        'Public Relations',
        'Digital Marketing',
        'Go-to-Market Strategy',
        'Brand Development',
        'Content Creation'
      ]
    },
    {
      id: 'liaison',
      icon: Handshake,
      title: 'Liaison Services',
      description: 'Building strategic connections and partnerships for business growth',
      services: [
        'Networking',
        'Government Liaison',
        'Chamber & Association Support',
        'Stakeholder Management',
        'Partnership Development',
        'Regulatory Compliance'
      ]
    }
  ];

  // Scroll lock management with auto-timeout
  useEffect(() => {
    if (isSliderActive) {
      document.body.style.overflow = 'hidden';

      // Auto-exit mechanism - if slider is active for too long without interaction
      const autoExitTimer = setTimeout(() => {
        setSliderPhase('inactive');
        setIsSliderActive(false);
        setCurrentServiceIndex(0);
      }, 20000); // 20 seconds timeout

      return () => {
        clearTimeout(autoExitTimer);
      };
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSliderActive]);

  // Main scroll handler for the service slider
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!serviceSliderRef.current) return;

      const rect = serviceSliderRef.current.getBoundingClientRect();
      const isInSliderArea = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      const now = Date.now();
      const direction = e.deltaY > 0 ? 'down' : 'up';

      // If we're in slider area and slider is active, always handle the event
      if (isInSliderArea && sliderPhase === 'active') {
        e.preventDefault();
        e.stopPropagation();

        // Emergency escape mechanism - if user scrolls rapidly in same direction multiple times
        if (now - lastWheelTime.current < 100) {
          emergencyEscapeCount.current++;
          if (emergencyEscapeCount.current > 3) {
            // Force exit slider
            setSliderPhase('inactive');
            setIsSliderActive(false);
            setCurrentServiceIndex(0);
            emergencyEscapeCount.current = 0;
            isScrolling.current = false;
            return;
          }
        } else {
          emergencyEscapeCount.current = 0;
        }

        // Throttle wheel events
        if (now - lastWheelTime.current < 200) return;
        lastWheelTime.current = now;

        if (isScrolling.current) return;
        isScrolling.current = true;

        if (direction === 'down') {
          if (currentServiceIndex < solutions.length - 1) {
            // Navigate to next service
            setCurrentServiceIndex(prev => prev + 1);
            setTimeout(() => {
              isScrolling.current = false;
            }, 300);
          } else {
            // At last service, exit slider completely
            setSliderPhase('completed');
            setIsSliderActive(false);
            setTimeout(() => {
              isScrolling.current = false;
            }, 100);
          }
        } else {
          if (currentServiceIndex > 0) {
            // Navigate to previous service
            setCurrentServiceIndex(prev => prev - 1);
            setTimeout(() => {
              isScrolling.current = false;
            }, 300);
          } else {
            // At first service, exit slider completely
            setSliderPhase('inactive');
            setIsSliderActive(false);
            setCurrentServiceIndex(0);
            setTimeout(() => {
              isScrolling.current = false;
            }, 100);
          }
        }
        return;
      }

      // If not in slider area, don't interfere with normal scrolling
      if (!isInSliderArea) {
        return;
      }

      // Throttle wheel events for activation
      if (now - lastWheelTime.current < 200) return;
      lastWheelTime.current = now;

      // Handle slider activation
      if (sliderPhase === 'inactive') {
        e.preventDefault();
        e.stopPropagation();
        setSliderPhase('active');
        setIsSliderActive(true);
        setCurrentServiceIndex(0);
        return;
      }

      // Handle re-entry from completed state
      if (sliderPhase === 'completed' && direction === 'up') {
        e.preventDefault();
        e.stopPropagation();
        setSliderPhase('active');
        setIsSliderActive(true);
        setCurrentServiceIndex(solutions.length - 1);
        return;
      }
    };
    
    // Touch and scroll event handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (!serviceSliderRef.current) return;
      const rect = serviceSliderRef.current.getBoundingClientRect();
      const isInSliderArea = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (isInSliderArea && isSliderActive) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!serviceSliderRef.current) return;
      const rect = serviceSliderRef.current.getBoundingClientRect();
      const isInSliderArea = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (isInSliderArea && isSliderActive) {
        e.preventDefault();
      }
    };

    const handleScroll = (e: Event) => {
      if (!serviceSliderRef.current) return;
      const rect = serviceSliderRef.current.getBoundingClientRect();
      const isInSliderArea = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (isInSliderArea && isSliderActive) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sliderPhase !== 'active') return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentServiceIndex < solutions.length - 1) {
          setCurrentServiceIndex(prev => prev + 1);
        } else {
          setSliderPhase('completed');
          setIsSliderActive(false);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentServiceIndex > 0) {
          setCurrentServiceIndex(prev => prev - 1);
        } else {
          setSliderPhase('inactive');
          setIsSliderActive(false);
          setCurrentServiceIndex(0);
        }
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [currentServiceIndex, sliderPhase, isSliderActive, solutions.length]);

  // Reset slider state when scrolling away from slider area
  useEffect(() => {
    const handleGlobalScroll = () => {
      if (!serviceSliderRef.current || isSliderActive) return;

      const rect = serviceSliderRef.current.getBoundingClientRect();
      const isInSliderArea = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      // If we're not in slider area and slider is completed, reset to inactive
      if (!isInSliderArea && sliderPhase === 'completed') {
        setSliderPhase('inactive');
        setCurrentServiceIndex(0);
      }
    };

    window.addEventListener('scroll', handleGlobalScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleGlobalScroll);
  }, [isSliderActive, sliderPhase]);

  // Slider images
  const sliderImages = [
    {
      desktop: "https://i.imgur.com/2iWaPBf.jpeg",
      mobile: "https://i.imgur.com/zDE3NVU.jpeg",
      title: "Your Global Business Partner",
      subtitle: "Empowering businesses worldwide with comprehensive solutions"
    },
    {
      desktop: "https://i.imgur.com/2iWaPBf.jpeg",
      mobile: "https://i.imgur.com/zDE3NVU.jpeg",
      title: "Strategic Excellence",
      subtitle: "Transform your vision into reality with expert guidance"
    },
    {
      desktop: "https://i.imgur.com/2iWaPBf.jpeg",
      mobile: "https://i.imgur.com/zDE3NVU.jpeg",
      title: "Comprehensive Solutions",
      subtitle: "End-to-end business support for sustainable growth"
    },
    {
      desktop: "https://i.imgur.com/2iWaPBf.jpeg",
      mobile: "https://i.imgur.com/zDE3NVU.jpeg",
      title: "Global Reach",
      subtitle: "Worldwide expertise with local market knowledge"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

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

  // PNG Images mapping for testing
  const getPngImage = (solutionId: string) => {
    switch (solutionId) {
      case 'facility':
        return 'https://i.imgur.com/qfVAeiK.png';
      case 'consultancy':
        return 'https://i.imgur.com/BUfTE9U.png';
      case 'management':
        return 'https://i.imgur.com/TwDoqF5.png';
      case 'promotion':
        return 'https://i.imgur.com/Uaa5NZb.png';
      case 'liaison':
        return 'https://i.imgur.com/WDYPihp.png';
      default:
        return 'https://i.imgur.com/qfVAeiK.png';
    }
  };

  const renderPngComponent = (solutionId: string) => {
    const imageUrl = getPngImage(solutionId);
    return (
      <img 
        src={imageUrl} 
        alt={`${solutionId} icon`}
        className="w-full h-full object-contain"
        style={{ 
          filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))'
        }}
      />
    );
  };

  return (
    <div className="relative">
      {/* Background Effects */}
      <ParticleBackground className="absolute inset-0 z-0" />
      <FloatingElements className="absolute inset-0 z-0" />


      
      {/* Photo Slider at the top */}
      <div className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={isMobile ? sliderImages[currentSlide].mobile : sliderImages[currentSlide].desktop}
              alt={sliderImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
            
            {/* Shadow overlay covering entire screen */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center text-white max-w-4xl px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {sliderImages[currentSlide].title}
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl mb-8 opacity-90"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {sliderImages[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  className="flex justify-center space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  {sliderImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll-Triggered Service Slider */}
      <div
        ref={serviceSliderRef}
        className={`relative overflow-hidden transition-all duration-500 ${
          isSliderActive
            ? 'h-screen flex items-center justify-center fixed inset-0 z-20 bg-white'
            : 'h-screen flex items-center justify-center bg-white'
        }`}
        style={{
          top: isSliderActive ? '0' : 'auto'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-azure-dark mb-6">Our Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scroll to explore our comprehensive business solutions.
            </p>
          </motion.div>

          {/* Service Slider Container */}
          <div className="relative h-96 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentServiceIndex}
                className="flex flex-col lg:flex-row items-center gap-12 w-full"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeInOut",
                  scale: { duration: 0.4 }
                }}
              >
                {/* Service Visual */}
                <motion.div 
                  className="lg:w-1/2 flex justify-center"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-80 h-80 relative overflow-hidden">
                    {renderPngComponent(solutions[currentServiceIndex].id)}
                  </div>
                </motion.div>

                {/* Service Details */}
                <motion.div 
                  className="lg:w-1/2 space-y-6"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div 
                      className="w-12 h-12 bg-azure-light rounded-full flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                    >
                      {React.createElement(solutions[currentServiceIndex].icon, { className: "w-6 h-6 text-azure-dark" })}
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-3xl font-bold text-azure-dark"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        {solutions[currentServiceIndex].title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                      >
                        {solutions[currentServiceIndex].description}
                      </motion.p>
                    </div>
                  </div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {solutions[currentServiceIndex].services.map((service, serviceIndex) => (
                      <motion.div 
                        key={serviceIndex} 
                        className="flex items-center space-x-3 p-3 bg-azure-light/30 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + serviceIndex * 0.1, duration: 0.3 }}
                      >
                        <CheckCircle className="w-5 h-5 text-azure-medium flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <motion.div 
            className="flex justify-center mt-8 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {solutions.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentServiceIndex 
                    ? 'w-8 bg-azure-dark' 
                    : index < currentServiceIndex 
                    ? 'w-4 bg-azure-medium' 
                    : 'w-4 bg-gray-300'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
              />
            ))}
          </motion.div>

          {/* Scroll Hint */}
          {sliderPhase !== 'completed' && (
            <motion.div
              className="text-center mt-8 text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.p
                className="text-sm mb-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {sliderPhase === 'active'
                  ? `Scroll to navigate • ${currentServiceIndex + 1} of ${solutions.length}${currentServiceIndex === solutions.length - 1 ? ' • Scroll down to continue' : ''}`
                  : 'Scroll down to explore our solutions'
                }
              </motion.p>
              <motion.div
                className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <motion.div
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Completion message */}
          {sliderPhase === 'completed' && (
            <motion.div
              className="text-center mt-8 text-green-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm">
                ✓ All solutions explored • Continue scrolling for more content
              </p>
            </motion.div>
          )}
        </div>
      </div>


    </div>
  );
};

export default Hero;
