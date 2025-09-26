const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

// Função para buscar no Google Custom Search API
async function googleSearch(query) {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_SEARCH_CX;
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!data.items || !Array.isArray(data.items)) return [];
  return data.items.map(item => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet
  }));
}

async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Received request body:', req.body);
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      console.log('Invalid messages format:', messages);
      return res.status(400).json({ error: 'Messages array is required', success: false });
    }

    // Detecta se o usuário pediu uma busca na internet
    const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1].content : '';
    const searchTriggers = ['pesquise', 'busque', 'procure', 'google', 'buscar', 'pesquisa'];
    const isSearch = searchTriggers.some(trigger => lastMessage.toLowerCase().includes(trigger));

    if (isSearch) {
      // Extrai o termo de busca
      const searchTerm = lastMessage.replace(/(pesquise|busque|procure|google|buscar|pesquisa)/i, '').trim();
      if (!searchTerm) {
        return res.status(200).json({ text: 'Por favor, informe o termo que deseja pesquisar no Google.', success: true });
      }
      const results = await googleSearch(searchTerm);
      if (results.length === 0) {
        return res.status(200).json({ text: 'Não encontrei resultados para sua pesquisa no Google.', success: true });
      }
      // Sintetiza os resultados em um guia inteligente
      // Função para extrair temas, dicas, tendências e nomes relevantes dos snippets/títulos
      function extractKeywords(text) {
        const keywords = [];
        // Extrai palavras/frases entre aspas, depois palavras-chave comuns
        const quoteRegex = /"([^"]+)"|'([^']+)'/g;
        let match;
        while ((match = quoteRegex.exec(text)) !== null) {
          const kw = (match[1] || match[2]).trim();
          if (kw && !keywords.includes(kw)) keywords.push(kw);
        }
        // Palavras-chave comuns (pode ser expandido conforme o domínio)
        const commonRegex = /(tendência|dica|guia|moderno|popular|prático|rápido|fácil|segredo|truque|top|melhor|mais procurado|em alta|2025|2024|natural|texturizado|volume|manutenção|cuidados|passo a passo|como fazer|recomendado|especialista|profissional|favorito|relevante|importante|essencial|novidade|inovador|clássico|diferente|personalizado|sob medida|para você|ideal|recomendação|sugestão|lista|seleção|top 10|top 5|top 3)/gi;
        let m;
        while ((m = commonRegex.exec(text)) !== null) {
          const kw = m[0].trim();
          if (kw && !keywords.includes(kw)) keywords.push(kw);
        }
        // Palavras isoladas relevantes (exemplo: nomes de cortes, produtos, estilos)
        const wordRegex = /(bob|lob|franja|fade|pompadour|crop|shag|buzz|crew|halo|taper|long bob|mid taper|side-part|french crop|curtain|texturizado|camadas|reto|desfiado|cacheado|ondulado|curto|médio|longo|hidratação|finalização|shampoo|condicionador|óleo|creme|escova|secador|difusor|pente|tesoura|barba|pele|tratamento|massagem|relaxante|estética|maquiagem|sombra|base|batom|tendência|truque|dica|guia|passo a passo|recomendação|sugestão|profissional|especialista|favorito|top|melhor|em alta|2025|2024)/gi;
        let w;
        while ((w = wordRegex.exec(text)) !== null) {
          const kw = w[0].trim();
          if (kw && !keywords.includes(kw)) keywords.push(kw);
        }
        return keywords;
      }

      // Função para agrupar e formatar resultados em estilo de guia
      function formatGuiaFluido(results) {
        // Agrupamento temático
        const grupos = {
          Femininos: [],
          Masculinos: [],
          Cacheados: [],
          Dicas: [],
          "Como pedir ao cabeleireiro(a)": []
        };
        results.forEach(r => {
          const t = (r.title + ' ' + r.snippet).toLowerCase();
          if (/bob|lob|franja|halo|feminino|mulher|ondas|cachos|camadas|reto|desfiado/.test(t)) {
            grupos.Femininos.push(r);
          } else if (/fade|crop|pompadour|masculino|homem|taper|crew|side-part|degradê|barba/.test(t)) {
            grupos.Masculinos.push(r);
          } else if (/cacheado|ondulado|shag|volume|hidratação|definição/.test(t)) {
            grupos.Cacheados.push(r);
          } else if (/dica|escolher|manutenção|truque|textura|preferência|rosto|camadas|invisível|desbaste/.test(t)) {
            grupos.Dicas.push(r);
          } else if (/como pedir|cabeleireiro|quero|faz|franja|bob curto|fade|topo|acabamento|matte|brilhoso/.test(t)) {
            grupos["Como pedir ao cabeleireiro(a)"].push(r);
          }
        });

        let texto = 'Aqui vai um guia rápido dos cortes modernos que estão bombando agora:\n';
        Object.entries(grupos).forEach(([tema, arr]) => {
          if (arr.length) {
            texto += `\n### ${tema}\n`;
            arr.forEach(r => {
              // Frase explicativa conectando título e snippet
              let principal = r.title.split(/[-–—|]/)[0].trim();
              let frase = r.snippet.replace(/\s+/g, ' ').trim();
              // Tenta deixar a frase mais natural
              if (!frase.toLowerCase().includes(principal.toLowerCase())) {
                frase = principal + ' – ' + frase;
              }
              const fonte = r.link ? new URL(r.link).hostname.replace('www.', '') : '';
              texto += `- ${frase}`;
              if (fonte) texto += `\n  _Fonte: ${fonte}_`;
              texto += '\n';
            });
            // Conector entre categorias
            texto += '\n';
          }
        });
        return texto;
      }

      // Processa e organiza os resultados
      const processedResults = results.map(r => {
        const content = {
          title: r.title,
          snippet: r.snippet,
          link: r.link,
          keywords: extractKeywords(r.snippet + ' ' + r.title),
          category: ''
        };
        
        const s = r.snippet + ' ' + r.title;
        if (/tend[êe]ncia|em alta|2025|2024|novidade|inovador|moderno|popular|top|melhor|favorito/i.test(s)) {
          content.category = 'tendencia';
        } else if (/dica|truque|segredo|guia|passo a passo|como fazer|recomendado|especialista|profissional|cuidados|manutenção|prático|rápido|fácil/i.test(s)) {
          content.category = 'dica';
        } else if (/tratamento|produto|finalização|hidratação|massagem|relaxante|estética|maquiagem|pele|barba/i.test(s)) {
          content.category = 'produto';
        } else {
          content.category = 'outro';
        }
        return content;
      });

      // Agrupa resultados por categoria
      const resultsByCategory = {
        tendencia: [],
        dica: [],
        produto: [],
        outro: []
      };

      processedResults.forEach(result => {
        resultsByCategory[result.category].push(result);
      });

      // Monta uma resposta bem formatada e concisa
      let responseText = formatGuiaFluido(processedResults);

      // Se não encontrou resultados em nenhuma categoria, mostra resultados gerais
      if (!Object.values(resultsByCategory).some(arr => arr.length > 0)) {
        responseText = `� **Resultados da Pesquisa**\n\n`;
        results.slice(0, 3).forEach(r => {
          // Limita o título e snippet para manter a formatação
          const title = r.title.length > 80 ? r.title.substring(0, 77) + '...' : r.title;
          const snippet = r.snippet.length > 120 ? r.snippet.substring(0, 117) + '...' : r.snippet;
          
          responseText += `• ${title}\n`;
          responseText += `  ${snippet}\n`;
          responseText += `  [Ver mais ↗](${r.link})\n\n`;
        });
      }

      // Adiciona sugestão de interação de forma concisa
      responseText += `\n� Quer saber mais? Me pergunte!`;

      // Limita tamanho total da resposta para não ultrapassar a caixa de diálogo
      const maxLength = 700;
      if (responseText.length > maxLength) {
        responseText = responseText.slice(0, maxLength) + '\n\n...';
      }
      return res.status(200).json({ text: responseText, success: true });
    }

    if (!genAI) {
      console.error('Gemini API not initialized. Check API key.');
      return res.status(500).json({ error: 'Chat service not configured properly', success: false });
    }

    console.log('Initializing Gemini model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // System prompt
    const systemPrompt = `Você é o atendente virtual do salão de beleza AMENA.

INSTRUÇÕES IMPORTANTES:
- Use APENAS as informações disponíveis no conteúdo do site fornecido abaixo
- Tom: profissional, acolhedor e objetivo
- Respostas curtas e claras (máximo 3-4 frases)
- NUNCA invente dados, preços, horários ou informações
- Se a informação não estiver no site, diga isso claramente e ofereça contato humano
- Não revele que usa IA ou detalhes técnicos
- Foque em: serviços, horários, localização, preços, equipe, agendamentos

CONTEÚDO DO SITE AMENA:
${context ? context.slice(0, 10).join('\n\n') : 'Conteúdo não disponível'}

Se não conseguir responder com base no conteúdo acima, responda: "Não tenho essa informação específica no momento. Posso te conectar com um atendente pelo WhatsApp (11) 99999-9999 ou e-mail contato@amenasalon.com.br para te ajudar melhor!"`;

    try {
      // Prepare conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      console.log('Starting chat with history:', conversationHistory);

      // Start chat with system prompt
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          {
            role: 'model',
            parts: [{ text: 'Entendido! Sou o atendente virtual do AMENA e vou ajudar com informações sobre nossos serviços, horários e agendamentos com base apenas no conteúdo do site. Como posso ajudar você?' }]
          },
          ...conversationHistory.slice(0, -1) // All but the last message
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      // Send the latest user message
      console.log('Sending message to Gemini...');
      const lastMsg = messages[messages.length - 1];
      const result = await chat.sendMessage(lastMsg.content);
      console.log('Received result from Gemini');
      const response = await result.response;
      const responseText = await response.text();
      console.log('Gemini response:', responseText);

      // Se não houver resposta, retorna mensagem padrão
      const finalText = responseText && responseText.trim().length > 0
        ? responseText
        : 'Não tenho essa informação específica no momento. Posso te conectar com um atendente pelo WhatsApp (11) 99999-9999 ou e-mail contato@amenasalon.com.br para te ajudar melhor!';

      return res.status(200).json({ 
        text: finalText,
        success: true 
      });
    } catch (chatError) {
      console.error('Error in chat generation:', chatError);
      throw chatError;
    }

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage = error.message || 'Unknown error';
    console.error('Error details:', errorMessage);
    
    return res.status(500).json({ 
      error: 'Tive um problema ao processar sua mensagem. Tente novamente ou fale conosco pelo WhatsApp (11) 99999-9999.',
      details: errorMessage,
      success: false 
    });
  }
}
module.exports = { handler };