import React, { useEffect, useState } from 'react';
import { Sparkles, Clock, Heart, Calendar } from 'lucide-react';
import DesignSobranselhaImg from '../imagens/Design de Sobranselha.png';
import RelaxamentoTotalImg from '../imagens/Relaxamento Total.png';
import LimpezaDePeleImg from '../imagens/Limpeza de Pele.png';

const Highlights: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('highlights');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: <Sparkles size={32} />,
      title: 'Design de Sobrancelhas',
      subtitle: 'Técnica exclusiva',
      description: 'Modelagem personalizada que realça sua beleza natural com precisão milimétrica.',
      duration: '45 min',
      price: 'R$ 89',
      image: DesignSobranselhaImg
    },
    {
      icon: <Heart size={32} />,
      title: 'Limpeza de Pele Premium',
      subtitle: 'Tratamento completo',
      description: 'Ritual de cuidados que purifica, hidrata e revitaliza sua pele com produtos japoneses.',
      duration: '90 min',
      price: 'R$ 165',
      image: LimpezaDePeleImg
    },
    {
      icon: <Clock size={32} />,
      title: 'Massagem Relaxante',
      subtitle: 'Bem-estar total',
      description: 'Técnicas ancestrais orientais para aliviar tensões e restaurar o equilíbrio.',
      duration: '60 min',
      price: 'R$ 125',
      image: RelaxamentoTotalImg
    }
  ];

  const handleBooking = (service: string) => {
    // Implementar lógica de agendamento
    document.querySelector('#quick-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="highlights" className="section-padding bg-white relative">
      <div className="container-max">
        <div className={`text-center mb-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Serviços em Destaque
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-light">
            Experiências únicas que combinam técnica apurada com o cuidado que você merece
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {highlights.map((service, index) => (
            <div
              key={service.title}
              className={`card-hover bg-primary border border-secondary/20 rounded-3xl overflow-hidden shadow-lg ${
                isVisible ? 'fade-in visible' : 'fade-in'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-primary-light/90 backdrop-blur-sm rounded-full p-3">
                  <div className="text-accent">{service.icon}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-secondary font-medium uppercase tracking-wide">
                    {service.subtitle}
                  </p>
                  <h3 className="text-xl font-serif font-bold text-accent mt-1">
                    {service.title}
                  </h3>
                </div>

                <p className="text-secondary font-light leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between py-2 border-t border-secondary/20">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-secondary">
                      <Clock size={16} className="inline mr-1" />
                      {service.duration}
                    </span>
                    <span className="text-lg font-bold text-accent">
                      {service.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleBooking(service.title)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                  data-cta="agendar"
                >
                  <Calendar size={18} />
                  <span>Agendar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary-light/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl translate-x-1/2"></div>
    </section>
  );
};

export default Highlights;