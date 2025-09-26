import React, { useEffect, useState } from 'react';
import { Star, Calendar, Instagram, Award } from 'lucide-react';
import YukiTanakimg from '../imagens/Yuki Tanak.png';
import AnaCostaimg from '../imagens/Ana Costa.png';
import Marinasilvaimg from '../imagens/Marina Silva.jpg';

const Team: React.FC = () => {
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

    const element = document.getElementById('team');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: 'Marina Silva',
      role: 'Design de Sobrancelhas',
      specialty: 'Especialista em Design & Micropigmentação',
      experience: '8 anos de experiência',
      image: Marinasilvaimg,
      bio: 'Formada em estética com especialização em design de sobrancelhas. Certificada em técnicas japonesas de modelagem facial.',
      skills: ['Design de Sobrancelhas', 'Micropigmentação', 'Henna'],
      rating: 4.9,
      reviews: 127,
      instagram: '@marina.amenastudio'
    },
    {
      id: 2,
      name: 'Ana Costa',
      role: 'Esteticista Facial',
      specialty: 'Especialista em Cuidados Faciais',
      experience: '6 anos de experiência',
      image: AnaCostaimg,
      bio: 'Graduada em Estética e Cosmética com pós em Dermocosmética. Apaixonada por técnicas orientais de rejuvenescimento.',
      skills: ['Limpeza de Pele', 'Peeling', 'Anti-idade'],
      rating: 4.8,
      reviews: 94,
      instagram: '@ana.skincare'
    },
    {
      id: 3,
      name: 'Yuki Tanaka',
      role: 'Terapeuta Corporal',
      specialty: 'Especialista em Bem-estar',
      experience: '10 anos de experiência',
      image: YukiTanakimg,
      bio: 'Descendente japonesa formada em terapias orientais tradicionais. Certificada em Shiatsu e técnicas de relaxamento.',
      skills: ['Massagem Japonesa', 'Hot Stones', 'Drenagem'],
      rating: 5.0,
      reviews: 156,
      instagram: '@yuki.wellness'
    }
  ];

  const handleBooking = (professional: string) => {
    // Implementar lógica de agendamento com profissional específico
    document.querySelector('#quick-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePortfolio = (professional: string) => {
    // Implementar visualização do portfólio
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="team" className="section-padding bg-primary">
      <div className="container-max">
        <div className={`text-center mb-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Equipe AMENA
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-light">
            Profissionais especializadas em técnicas orientais de beleza e bem-estar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`card-hover bg-white rounded-3xl overflow-hidden shadow-xl border border-secondary/10 ${isVisible ? 'fade-in visible' : 'fade-in'
                }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Profile Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star size={14} className="fill-primary-light text-primary-light" />
                  <span className="text-accent font-bold text-sm">{member.rating}</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 bg-primary-light/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-accent text-sm font-medium">{member.experience}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="text-center border-b border-secondary/10 pb-4">
                  <h3 className="text-2xl font-serif font-bold text-accent mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-light font-medium">{member.role}</p>
                  <p className="text-secondary text-sm mt-1">{member.specialty}</p>
                </div>

                {/* Bio */}
                <p className="text-secondary font-light text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills */}
                <div>
                  <p className="text-accent font-medium text-sm mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary rounded-full text-secondary text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="fill-primary-light text-primary-light" />
                      <span className="text-sm font-bold text-accent">{member.rating}</span>
                    </div>
                    <span className="text-secondary text-sm">({member.reviews} avaliações)</span>
                  </div>
                  <a
                    href={`https://instagram.com/${member.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-light hover:text-secondary transition-colors"
                  >
                    <Instagram size={18} />
                  </a>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => handleBooking(member.name)}
                    className="flex-1 btn-primary text-sm py-2 px-4 flex items-center justify-center space-x-1"
                    data-cta="agendar"
                  >
                    <Calendar size={14} />
                    <span>Agendar</span>
                  </button>
                  <button
                    onClick={() => handlePortfolio(member.name)}
                    className="flex-1 btn-secondary text-sm py-2 px-4 flex items-center justify-center space-x-1"
                  >
                    <Award size={14} />
                    <span>Portfólio</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className={`mt-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-secondary/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-3xl font-serif font-bold text-accent mb-2">500+</h4>
                <p className="text-secondary font-light">Clientes atendidas</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-accent mb-2">4.9</h4>
                <p className="text-secondary font-light">Avaliação média</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-accent mb-2">3</h4>
                <p className="text-secondary font-light">Especialistas certificadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default Team;