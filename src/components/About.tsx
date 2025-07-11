import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedWords, setHighlightedWords] = useState<Set<number>>(new Set());
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollY = useMotionValue(0);

  const textContent = [
    "AZURE business solutions is a support catalyst company, that enables other companies (i.e. our clients) to maximize value by focusing on core business activities while AZURE takes care of the rest. ",
    "We at AZURE facilitate our clients’ entire back office support by providing end to end solution."
  ];

  const words = textContent.join(' ').split(' ');

  useEffect(() => {
    let scrollCounter = 0;
    const maxScrollSteps = words.length;
    let isAnimationComplete = false;
    
    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
      
      // Check if we're at the top of the About section and trying to scroll up
      if (isInView && e.deltaY < 0 && scrollCounter <= 0) {
        setIsScrollLocked(false);
        isAnimationComplete = false;
        return; // Allow normal scroll up to Hero section
      }
      
      // Check if animation is complete and trying to scroll down
      if (isInView && e.deltaY > 0 && scrollCounter >= maxScrollSteps) {
        isAnimationComplete = true;
        setIsScrollLocked(false);
        return; // Allow normal scroll down to next sections
      }
      
      if (isInView && !isAnimationComplete) {
        e.preventDefault();
        setIsScrollLocked(true);
        
        if (e.deltaY > 0 && scrollCounter < maxScrollSteps) {
          scrollCounter += 2; // Highlight 2 words per scroll for faster speed
          if (scrollCounter > maxScrollSteps) scrollCounter = maxScrollSteps;
        } else if (e.deltaY < 0 && scrollCounter > 0) {
          scrollCounter -= 2; // Dim 2 words per scroll for faster speed
          if (scrollCounter < 0) scrollCounter = 0;
        }
        
        const progress = scrollCounter / maxScrollSteps;
        setScrollProgress(progress);
        
        const wordsToHighlight = scrollCounter;
        const newHighlighted = new Set<number>();
        for (let i = 0; i < wordsToHighlight; i++) {
          newHighlighted.add(i);
        }
        setHighlightedWords(newHighlighted);
      } else {
        setIsScrollLocked(false);
        if (!isInView) {
          isAnimationComplete = false;
          scrollCounter = 0;
        }
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [words.length]);

  const backgroundOpacity = useTransform(scrollY, [0, 1], [0.8, 1]);

  return (
    <motion.section 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        position: isScrollLocked ? 'fixed' : 'relative',
        top: isScrollLocked ? 0 : 'auto',
        left: isScrollLocked ? 0 : 'auto',
        width: isScrollLocked ? '100vw' : 'auto',
        height: isScrollLocked ? '100vh' : 'auto',
        zIndex: isScrollLocked ? 1000 : 'auto'
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/90"
        style={{ opacity: backgroundOpacity }}
      />
      
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-12">
            {textContent.map((paragraph, paragraphIndex) => {
              const paragraphWords = paragraph.split(' ');
              const startWordIndex = paragraphIndex === 0 ? 0 : textContent.slice(0, paragraphIndex).join(' ').split(' ').length;
              
              return (
                <motion.div 
                  key={paragraphIndex}
                  className="text-left max-w-5xl mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: paragraphIndex * 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light">
                    {paragraphWords.map((word, wordIndex) => {
                      const globalWordIndex = startWordIndex + wordIndex;
                      const isHighlighted = highlightedWords.has(globalWordIndex);
                      
                      return (
                        <motion.span
                          key={wordIndex}
                          className={`transition-all duration-500 ${
                            isHighlighted 
                              ? 'text-white' 
                              : 'text-blue-300'
                          }`}
                          animate={{
                            textShadow: isHighlighted 
                              ? '0 0 20px rgba(255,255,255,0.3)' 
                              : '0 0 0px rgba(255,255,255,0)'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {word}{wordIndex < paragraphWords.length - 1 ? ' ' : ''}
                        </motion.span>
                      );
                    })}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default About;
