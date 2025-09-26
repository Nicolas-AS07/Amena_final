interface SiteContext {
  chunks: string[];
  contacts: {
    whatsapp: string;
    email: string;
    phone: string;
  };
}

// Contexto enriquecido para o chatbot
export const chatbotContext = {
  faqs: [
    {
      question: 'Quais serviços vocês oferecem?',
      answer: 'Oferecemos uma variedade de serviços personalizados para atender às suas necessidades. Quer saber mais sobre algum serviço específico? 😊'
    },
    {
      question: 'Como faço uma reserva rápida?',
      answer: 'Para reservar rapidamente, clique no botão "Reserva Rápida" ou me informe o serviço desejado. Estou aqui para facilitar sua experiência! ✨'
    },
    {
      question: 'Qual o horário de funcionamento?',
      answer: 'Atendemos de segunda a sábado, das 8h às 18h. Precisa de atendimento especial? Fale comigo! 🕗'
    },
    {
      question: 'Vocês atendem em finais de semana e feriados?',
      answer: 'Sim! Nossa equipe está disponível para atendimentos especiais em finais de semana e feriados. Consulte disponibilidade! 🎉'
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartão, Pix e transferência bancária. Qual opção você prefere? 💳'
    },
    {
      question: 'Como posso entrar em contato com a equipe?',
      answer: 'Você pode falar conosco pelo chat, telefone ou e-mail. Estamos sempre prontos para ajudar! 📞✉️'
    },
    {
      question: 'Vocês possuem portfólio de trabalhos anteriores?',
      answer: 'Sim! Confira nosso portfólio e veja como podemos transformar seu projeto em realidade! 🖼️'
    },
    {
      question: 'Quais são os diferenciais da empresa?',
      answer: 'Nosso maior diferencial é o atendimento personalizado e a dedicação em cada projeto. Sua satisfação é nossa prioridade! 🌟'
    },
    {
      question: 'Como funciona o atendimento online?',
      answer: 'O atendimento online é rápido, prático e seguro. Basta enviar sua dúvida ou solicitação aqui no chat! 💬'
    },
    {
      question: 'Vocês oferecem descontos ou promoções?',
      answer: 'Sim! Fique atento às nossas promoções especiais e descontos exclusivos. Quer saber das ofertas do momento? Pergunte aqui! 🎁'
    }
  ],
  greetings: [
    'Olá! 😊 Seja bem-vindo(a) ao nosso atendimento. Como posso ajudar você hoje?',
    'Oi! Que bom te ver por aqui. Precisa de alguma informação ou serviço?',
    'Bem-vindo(a)! Nossa equipe está pronta para tornar sua experiência incrível. Fique à vontade para perguntar!'
  ],
  closing: [
    'Foi um prazer atender você! Se precisar de mais alguma coisa, é só chamar. Tenha um ótimo dia! 🌷',
    'Agradecemos seu contato! Qualquer dúvida, estamos à disposição. Até breve! 😊',
    'Conte sempre conosco! Sua satisfação é nossa prioridade. Volte sempre! 💖'
  ]
};

export function extractSiteContext(): SiteContext {
  // Check if context is already cached
  if ((window as any).__AMENA_CONTEXT__) {
    return (window as any).__AMENA_CONTEXT__;
  }

  const chunks: string[] = [];
  const contacts = {
    whatsapp: '(11) 99999-9999',
    email: 'contato@amenasalon.com.br',
    phone: '(11) 3456-7890'
  };

  try {
    // Extract meta description
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    if (metaDesc) {
      chunks.push(`Descrição: ${metaDesc}`);
    }

    // Extract main content sections
    const sections = document.querySelectorAll('section, main');
    
    sections.forEach((section) => {
      const sectionId = section.id;
      let sectionText = '';

      // Get section title
      const title = section.querySelector('h1, h2, h3');
      if (title) {
        sectionText += `${title.textContent?.trim()}\n`;
      }

      // Get section content
      const paragraphs = section.querySelectorAll('p, li');
      paragraphs.forEach((p) => {
        const text = p.textContent?.trim();
        if (text && text.length > 20) {
          sectionText += `${text}\n`;
        }
      });

      // Get service prices and details
      const serviceCards = section.querySelectorAll('[class*="card"], [class*="service"]');
      serviceCards.forEach((card) => {
        const serviceText = card.textContent?.trim();
        if (serviceText && serviceText.length > 30) {
          sectionText += `${serviceText}\n`;
        }
      });

      if (sectionText.trim()) {
        // Create chunks of manageable size
        const cleanText = sectionText
          .replace(/\s+/g, ' ')
          .replace(/\n+/g, '\n')
          .trim();

        if (cleanText.length > 1200) {
          // Split large sections into smaller chunks
          const sentences = cleanText.split(/[.!?]\s+/);
          let currentChunk = '';
          
          sentences.forEach((sentence) => {
            if (currentChunk.length + sentence.length < 1000) {
              currentChunk += sentence + '. ';
            } else {
              if (currentChunk.trim()) {
                chunks.push(`${sectionId ? `[${sectionId}] ` : ''}${currentChunk.trim()}`);
              }
              currentChunk = sentence + '. ';
            }
          });
          
          if (currentChunk.trim()) {
            chunks.push(`${sectionId ? `[${sectionId}] ` : ''}${currentChunk.trim()}`);
          }
        } else {
          chunks.push(`${sectionId ? `[${sectionId}] ` : ''}${cleanText}`);
        }
      }
    });

    // Extract specific information
    extractSpecificInfo(chunks);

    // Remove duplicates and empty chunks
    const uniqueChunks = [...new Set(chunks)].filter(chunk => chunk.length > 50);

    const context: SiteContext = {
      chunks: uniqueChunks.slice(0, 15), // Limit to prevent token overflow
      contacts
    };

    // Cache the context
    (window as any).__AMENA_CONTEXT__ = context;
    
    return context;

  } catch (error) {
    console.error('Error extracting site context:', error);
    return {
      chunks: ['Salão de beleza AMENA - Beleza que acalma. Serviços de design de sobrancelhas, limpeza de pele e massagem relaxante.'],
      contacts
    };
  }
}

function extractSpecificInfo(chunks: string[]) {
  // Extract business hours
  const hoursElements = document.querySelectorAll('[class*="hour"], [class*="time"]');
  hoursElements.forEach((el) => {
    const text = el.textContent?.trim();
    if (text && (text.includes('h') || text.includes(':'))) {
      chunks.push(`Horários: ${text}`);
    }
  });

  // Extract address
  const addressElements = document.querySelectorAll('[class*="address"], [class*="location"]');
  addressElements.forEach((el) => {
    const text = el.textContent?.trim();
    if (text && text.length > 20) {
      chunks.push(`Endereço: ${text}`);
    }
  });

  // Extract prices
  const priceElements = document.querySelectorAll('[class*="price"], [class*="valor"]');
  priceElements.forEach((el) => {
    const text = el.textContent?.trim();
    if (text && text.includes('R$')) {
      chunks.push(`Preço: ${text}`);
    }
  });

  // Extract team information
  const teamElements = document.querySelectorAll('[class*="team"], [class*="professional"]');
  teamElements.forEach((el) => {
    const text = el.textContent?.trim();
    if (text && text.length > 30) {
      chunks.push(`Equipe: ${text}`);
    }
  });
}