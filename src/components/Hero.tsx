import React, { useEffect, useState } from 'react';
import { Calendar, Eye, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScroll = () => {
    document.querySelector('#highlights')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = () => {
    document.querySelector('#quick-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePortfolio = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

return (
  <section className="relative min-h-screen flex items-center justify-center pt-24 section-padding">
    {/* Background Image */}
    <img
  src="/imagens/Amena Background.jpg"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
    />

    {/* Foreground Content */}
    <div className="container-max text-center relative z-10">
      <div className={`space-y-8 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-accent leading-tight">
            AMENA
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-secondary font-light">
            Beleza que acalma
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto font-light leading-relaxed">
          Cuidado estético com leveza, técnica e bem-estar.<br />
          Desperte sua beleza natural em um ambiente de paz e sofisticação.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
          <button
            onClick={handleBooking}
            className="btn-primary flex items-center space-x-3 text-lg px-10 py-4"
            data-cta="agendar"
          >
            <Calendar size={20} />
            <span>Agendar agora</span>
          </button>

          <button
            onClick={handlePortfolio}
            className="btn-secondary flex items-center space-x-3 text-lg px-10 py-4"
          >
            <Eye size={20} />
            <span>Ver resultados</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-16">
          <button
            onClick={handleScroll}
            className="animate-bounce-gentle p-2 rounded-full hover:bg-primary-light/20 transition-colors"
            aria-label="Rolar para baixo"
          >
            <ArrowDown size={24} className="text-secondary" />
          </button>
        </div>
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-light/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
    </div>
  </section>
);
};

export default Hero;