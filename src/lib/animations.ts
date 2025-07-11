import { Variants } from 'framer-motion';

// Common animation variants for service components
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const titleVariants: Variants = {
  hidden: { opacity: 0, x: -100, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Service-specific variants
export const facilitiesServiceVariants: Variants = {
  hidden: { opacity: 0, x: 100, rotateY: -15 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const managementServiceVariants: Variants = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const promotionServiceVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut"
    }
  }
};

export const liaisonServiceVariants: Variants = {
  hidden: { opacity: 0, x: -100, skewX: 15 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const consultationServiceVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: 180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

// Common viewport settings
export const viewportSettings = {
  once: true,
  amount: 0.3
};