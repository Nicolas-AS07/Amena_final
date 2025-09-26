import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, Zap, Scissors, Calendar } from 'lucide-react';

const Services: React.FC = () => {
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

    const element = document.getElementById('services');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const serviceCategories = [
    {
      category: 'Sobrancelhas & Design',
      icon: <Sparkles size={32} />,
      services: [
        { name: 'Design de Sobrancelhas', duration: '45 min', price: 'R$ 89', description: 'Modelagem personalizada que realça sua expressão natural' },
        { name: 'Micropigmentação', duration: '2h', price: 'R$ 350', description: 'Técnica de preenchimento semipermanente' },
        { name: 'Henna Natural', duration: '60 min', price: 'R$ 65', description: 'Tingimento natural com duração prolongada' }
      ]
    },
    {
      category: 'Cuidados Faciais',
      icon: <Heart size={32} />,
      services: [
        { name: 'Limpeza de Pele Premium', duration: '90 min', price: 'R$ 165', description: 'Ritual completo de purificação e hidratação' },
        { name: 'Peeling Químico', duration: '60 min', price: 'R$ 185', description: 'Renovação celular para pele radiante' },
        { name: 'Hidratação Profunda', duration: '75 min', price: 'R$ 125', description: 'Tratamento intensivo com ativos japoneses' }
      ]
    },
    {
      category: 'Bem-estar & Relaxamento',
      icon: <Zap size={32} />,
      services: [
        { name: 'Massagem Relaxante', duration: '60 min', price: 'R$ 125', description: 'Técnicas orientais para alívio de tensões' },
        { name: 'Hot Stones', duration: '90 min', price: 'R$ 165', description: 'Terapia com pedras quentes vulcânicas' },
        { name: 'Drenagem Linfática', duration: '75 min', price: 'R$ 145', description: 'Estimula circulação e reduz inchaços' }
      ]
    },
    {
      category: 'Estética Capilar',
      icon: <Scissors size={32} />,
      services: [
        { name: 'Tratamento Capilar', duration: '90 min', price: 'R$ 155', description: 'Reconstrução e nutrição profunda dos fios' },
        { name: 'Corte Terapêutico', duration: '60 min', price: 'R$ 95', description: 'Corte personalizado com técnicas japonesas' },
        { name: 'Spa Capilar', duration: '120 min', price: 'R$ 225', description: 'Experiência completa de renovação capilar' }
      ]
    }
  ];

  const handleBooking = (serviceName: string) => {
    // Implementar lógica de agendamento
    document.querySelector('#quick-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max">
        <div className={`text-center mb-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-light">
            Cuidados especializados para realçar sua beleza natural
          </p>
        </div>

        <div className="space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className={`${isVisible ? 'fade-in visible' : 'fade-in'}`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              {/* Category Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-4 bg-primary rounded-2xl px-6 py-3 border border-secondary/10">
                  <div className="text-accent">{category.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-accent">
                    {category.category}
                  </h3>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={service.name}
                    className={`card-hover bg-primary border border-secondary/10 rounded-2xl p-6 shadow-lg ${
                      isVisible ? 'fade-in visible' : 'fade-in'
                    }`}
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (serviceIndex * 0.1)}s` }}
                  >
                    <div className="space-y-4">
                      {/* Service Header */}
                      <div className="border-b border-secondary/10 pb-4">
                        <h4 className="text-xl font-serif font-bold text-accent mb-2">
                          {service.name}
                        </h4>
                        <p className="text-secondary font-light text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Service Details */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-secondary">Duração</p>
                          <p className="font-medium text-accent">{service.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-secondary">Preço</p>
                          <p className="text-2xl font-bold text-accent">{service.price}</p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleBooking(service.name)}
                        className="w-full btn-primary flex items-center justify-center space-x-2 mt-6"
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
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <div className="bg-primary rounded-3xl p-8 border border-secondary/10 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-accent mb-4">
              Não encontrou o que procura?
            </h3>
            <p className="text-secondary mb-6 font-light">
              Entre em contato conosco para consultas personalizadas
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Falar com especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;