
import React, { useEffect } from 'react';

const jotformScriptUrl = 'https://cdn.jotfor.ms/agent/embedjs/01998302a60c70629deefd91c457245494c5/embed.js';

const Chatbot: React.FC = () => {
  useEffect(() => {
    // Limpa possíveis dados do Jotform para evitar histórico
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.toLowerCase().includes('jotform')) localStorage.removeItem(k);
      });
      Object.keys(sessionStorage).forEach((k) => {
        if (k.toLowerCase().includes('jotform')) sessionStorage.removeItem(k);
      });
    } catch (e) {}

    // Adiciona o script do Jotform normalmente
    const script = document.createElement('script');
    script.src = jotformScriptUrl;
    script.async = true;
    script.id = 'jotform-chatbot-embed';
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById('jotform-chatbot-embed');
      if (s) s.remove();
    };
  }, []);

  return null;
};

export default Chatbot;