import React, { useEffect, useState } from 'react';
import { Star, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  service: string;
  professional: string;
  rating: number;
  text: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Camila Santos',
      service: 'Design de Sobrancelhas',
      professional: 'Marina Silva',
      rating: 5,
      text: 'Experiência incrível! A Marina tem um olhar único para realçar a beleza natural. O ambiente é super aconchegante e relaxante.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 2,
      name: 'Julia Oliveira',
      service: 'Limpeza de Pele Premium',
      professional: 'Ana Costa',
      rating: 5,
      text: 'Minha pele nunca esteve tão bonita! O tratamento é um verdadeiro mimo, saí de lá me sentindo renovada.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 3,
      name: 'Renata Lima',
      service: 'Massagem Relaxante',
      professional: 'Yuki Tanaka',
      rating: 5,
      text: 'A Yuki é uma artista! As técnicas orientais dela são transformadoras. Saí completamente relaxada e revigorada.',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 4,
      name: 'Fernanda Costa',
      service: 'Tratamento Facial',
      professional: 'Ana Costa',
      rating: 5,
      text: 'O cuidado e atenção da equipe AMENA são únicos. Cada detalhe é pensado para nossa comodidade e bem-estar.',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleBookWithProfessional = (professional: string) => {
    // Implementar lógica de agendamento com profissional específico
    document.querySelector('#quick-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-max">
        <div className={`text-center mb-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            O que dizem sobre nós
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-light">
            Histórias reais de transformação e cuidado
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-primary border border-secondary/10 rounded-3xl p-8 md:p-12 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary-light/30"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Stars */}
                        <div className="flex justify-center md:justify-start items-center space-x-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} size={20} className="fill-primary-light text-primary-light" />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <blockquote className="text-lg md:text-xl text-accent font-light leading-relaxed mb-6 italic">
                          "{testimonial.text}"
                        </blockquote>

                        {/* Client Info */}
                        <div className="space-y-2 mb-6">
                          <h4 className="font-serif font-bold text-accent text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-secondary text-sm">
                            {testimonial.service} • com {testimonial.professional}
                          </p>
                        </div>

                        {/* CTA */}
                        <button
                          onClick={() => handleBookWithProfessional(testimonial.professional)}
                          className="btn-secondary flex items-center space-x-2 mx-auto md:mx-0"
                          data-cta="agendar"
                        >
                          <Calendar size={16} />
                          <span>Agendar com {testimonial.professional.split(' ')[0]}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-secondary/20 hover:bg-primary-light/20 transition-colors"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={20} className="text-accent" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary-light' : 'bg-secondary/30'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-secondary/20 hover:bg-primary-light/20 transition-colors"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={20} className="text-accent" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;