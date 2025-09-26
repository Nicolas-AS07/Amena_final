import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import QuickBooking from './components/QuickBooking';
import Services from './components/Services';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SakuraPetals from './components/SakuraPetals';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-primary text-accent overflow-x-hidden">
      <SakuraPetals />
      <Navbar isScrolled={isScrolled} />
      
      <main>
        <Hero />
        <Highlights />
        <Portfolio />
        <Testimonials />
        <QuickBooking />
        <Services />
        <Team />
        <FAQ />
        <Contact />
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;