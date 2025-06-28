import React, { useState } from 'react';
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Solutions from './components/Solutions';
import Industries from './components/Industries';
import Experts from './components/Experts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero setActiveSection={setActiveSection} />;
      case 'about':
        return <About />;
      case 'solutions':
        return <Solutions />;
      case 'industries':
        return <Industries />;
      case 'experts':
        return <Experts />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative">
      {/* Three.js Background - only show on home section */}
      {activeSection === 'home' && <ThreeBackground />}
      
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative z-10">
        {renderSection()}
      </main>
      
      <Footer setActiveSection={setActiveSection} />
      <Toaster />
    </div>
  );
}
