import React, { useEffect, useState } from 'react';
import { Calendar, X, Filter } from 'lucide-react';
import RelaxamentoTotalImg from '../imagens/Relaxamento Total.png';
import LimpezaDePeleImg from '../imagens/Limpeza de Pele.png';
import DesignSobranselhaImg from '../imagens/Design de Sobranselha.png';
import MicropigmmentacaoImg from '../imagens/Micropigmmentacao.png';
import HidratacaoIntensaImg from '../imagens/hidratacao intensa.png';
import EquilibrioZenImg from '../imagens/equilibrio zen.png';

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  professional: string;
}

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('portfolio');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      image: DesignSobranselhaImg,
      title: 'Design Natural',
      category: 'sobrancelhas',
      description: 'Modelagem que valoriza a expressão natural do rosto',
      professional: 'Marina Silva'
    },
    {
      id: 2,
      image: LimpezaDePeleImg,
      title: 'Pele Radiante',
      category: 'facial',
      description: 'Resultado após tratamento de limpeza profunda premium',
      professional: 'Ana Costa'
    },
    {
      id: 3,
      image: RelaxamentoTotalImg,
      title: 'Relaxamento Total',
      category: 'corporal',
      description: 'Técnica de massagem oriental para bem-estar completo',
      professional: 'Yuki Tanaka'
    },
    {
      id: 4,
      image: MicropigmmentacaoImg,
      title: 'Formato Perfeito',
      category: 'sobrancelhas',
      description: 'Design personalizado com técnica de micropigmentação',
      professional: 'Marina Silva'
    },
    {
      id: 5,
      image: HidratacaoIntensaImg,
      title: 'Hidratação Intensa',
      category: 'facial',
      description: 'Tratamento japonês para rejuvenescimento facial',
      professional: 'Ana Costa'
    },
    {
      id: 6,
      image: EquilibrioZenImg,
      title: 'Equilíbrio Zen',
      category: 'corporal',
      description: 'Terapia holística com pedras quentes',
      professional: 'Yuki Tanaka'
    }
  ];

  const categories = [
    { key: 'todos', label: 'Todos' },
    { key: 'sobrancelhas', label: 'Sobrancelhas' },
    { key: 'facial', label: 'Facial' },
    { key: 'corporal', label: 'Corporal' }
  ];

  const filteredItems = selectedCategory === 'todos' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const handleBookSame = (professional: string) => {
    // Implementar lógica de agendamento com profissional específico
    document.querySelector('#quick-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="portfolio" className="section-padding bg-primary">
        <div className="container-max">
          <div className={`text-center mb-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
              Resultados Reais
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto font-light">
              Veja a transformação que nossos cuidados proporcionam
            </p>
          </div>

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center mb-12 gap-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-primary-light text-accent shadow-lg'
                    : 'bg-white border border-secondary/20 text-secondary hover:bg-primary-light/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`card-hover group cursor-pointer ${isVisible ? 'fade-in visible' : 'fade-in'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-secondary/10">
                  <div className="aspect-w-4 aspect-h-5 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-serif font-bold text-xl mb-1">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.description}</p>
                      <p className="text-white/80 text-xs mt-2">Por: {item.professional}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-accent/90 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <X size={20} className="text-accent" />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-96 lg:h-full object-cover"
                  />
                </div>
                
                <div className="p-8 space-y-6">
                  <div>
                    <p className="text-sm text-secondary font-medium uppercase tracking-wide">
                      {categories.find(c => c.key === selectedItem.category)?.label}
                    </p>
                    <h3 className="text-3xl font-serif font-bold text-accent mt-2">
                      {selectedItem.title}
                    </h3>
                  </div>
                  
                  <p className="text-secondary font-light leading-relaxed text-lg">
                    {selectedItem.description}
                  </p>
                  
                  <div className="border-t border-secondary/20 pt-6">
                    <p className="text-secondary mb-4">
                      <span className="font-medium">Profissional:</span> {selectedItem.professional}
                    </p>
                    
                    <button
                      onClick={() => handleBookSame(selectedItem.professional)}
                      className="btn-primary flex items-center space-x-2"
                      data-cta="agendar"
                    >
                      <Calendar size={18} />
                      <span>Agendar igual</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;