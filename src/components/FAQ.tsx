import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('faq');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: 'Agendamento',
      question: 'Como faço para agendar um horário?',
      answer: 'Você pode agendar através do nosso sistema online nesta página, pelo WhatsApp (11) 99999-9999 ou ligando diretamente para o salão. Recomendamos agendar com antecedência para garantir o horário desejado.'
    },
    {
      id: 2,
      category: 'Agendamento',
      question: 'Posso escolher a profissional?',
      answer: 'Sim! No momento do agendamento você pode escolher a profissional de sua preferência. Cada uma tem especialidades diferentes: Marina (sobrancelhas), Ana (facial) e Yuki (corporal).'
    },
    {
      id: 3,
      category: 'Serviços',
      question: 'Quais são os cuidados pré-procedimento?',
      answer: 'Para sobrancelhas: evite retirar pelos 1 semana antes. Para limpeza de pele: não use ácidos 3 dias antes. Para massagem: evite refeições pesadas 2h antes. Sempre chegue com a pele limpa, sem maquiagem.'
    },
    {
      id: 4,
      category: 'Serviços',
      question: 'Qual a duração dos resultados?',
      answer: 'Varia por serviço: Design de sobrancelhas (4-6 semanas), Micropigmentação (1-2 anos), Limpeza facial (resultados imediatos e duradouros com manutenção mensal), Massagem (bem-estar imediato).'
    },
    {
      id: 5,
      category: 'Pagamento',
      question: 'Quais formas de pagamento vocês aceitam?',
      answer: 'Aceitamos dinheiro, cartões de débito e crédito (Visa, Mastercard, Elo), PIX e transferências bancárias. Para pacotes de tratamentos, oferecemos condições especiais de parcelamento.'
    },
    {
      id: 6,
      category: 'Política',
      question: 'Qual a política de cancelamento?',
      answer: 'Cancelamentos devem ser feitos com pelo menos 24h de antecedência. Cancelamentos em menos de 24h ou faltas são cobrados 50% do valor do serviço. Remarcações são gratuitas com 12h de antecedência.'
    },
    {
      id: 7,
      category: 'Produtos',
      question: 'Posso comprar os produtos utilizados?',
      answer: 'Sim! Trabalhamos com produtos japoneses premium e oferecemos linha para venda. Nossas profissionais podem recomendar os produtos ideais para sua rotina de cuidados em casa.'
    },
    {
      id: 8,
      category: 'Segurança',
      question: 'Quais são os protocolos de higiene?',
      answer: 'Seguimos rigorosos protocolos de biossegurança: esterilização de todos os instrumentos, uso de materiais descartáveis, higienização completa do ambiente entre atendimentos e uso de produtos certificados pela ANVISA.'
    }
  ];

  const categories = [...new Set(faqItems.map(item => item.category))];

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-max">
        <div className={`text-center mb-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-light">
            Encontre respostas para as perguntas mais comuns sobre nossos serviços
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div
              key={category}
              className={`mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <HelpCircle size={24} className="text-primary-light" />
                <h3 className="text-2xl font-serif font-bold text-accent">
                  {category}
                </h3>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqItems
                  .filter(item => item.category === category)
                  .map((item, index) => (
                    <div
                      key={item.id}
                      className={`bg-primary border border-secondary/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                        activeItem === item.id ? 'shadow-xl' : ''
                      } ${isVisible ? 'fade-in visible' : 'fade-in'}`}
                      style={{ animationDelay: `${categoryIndex * 0.1 + index * 0.05}s` }}
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-primary-light/10 transition-colors"
                      >
                        <h4 className="font-serif font-bold text-accent text-lg pr-4">
                          {item.question}
                        </h4>
                        <div className="flex-shrink-0 text-primary-light">
                          {activeItem === item.id ? (
                            <ChevronUp size={24} />
                          ) : (
                            <ChevronDown size={24} />
                          )}
                        </div>
                      </button>

                      {/* Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          activeItem === item.id 
                            ? 'max-h-96 opacity-100' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 border-t border-secondary/10">
                          <p className="text-secondary font-light leading-relaxed pt-4">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <div className="bg-primary rounded-3xl p-8 border border-secondary/10 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-accent mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-secondary mb-6 font-light">
              Entre em contato conosco! Estamos aqui para esclarecer todas as suas dúvidas
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Falar conosco
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;