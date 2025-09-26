import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Agendar', href: '#quick-booking' },
    { label: 'Resultados', href: '#portfolio' },
    { label: 'Serviços', href: '#services' },
    { label: 'Profissionais', href: '#team' },
    { label: 'Depoimentos', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glassmorphism border-b border-primary-light/20 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-max mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
              <img
              src="/src/imagens/Amena.png"
              alt="Logo AMENA"
              className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-accent">AMENA</h1>
              <p className="text-xs text-secondary font-light">Beleza que acalma</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-accent hover:text-primary-light transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleNavClick('#quick-booking')}
              className="btn-primary flex items-center space-x-2"
              data-cta="agendar"
            >
              <Calendar size={18} />
              <span>Agendar agora</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-primary-light/20 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-6 glassmorphism rounded-2xl border border-primary-light/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-accent hover:text-primary-light transition-colors duration-300 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#quick-booking')}
                className="btn-primary flex items-center justify-center space-x-2 mt-4"
                data-cta="agendar"
              >
                <Calendar size={18} />
                <span>Agendar agora</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;