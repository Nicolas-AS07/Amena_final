const express = require('express');
const cors = require('cors');
const { handler: chatHandler } = require('./api/chat.js');

const app = express();
const port = 3000;

// Configuração CORS detalhada
app.use(cors({
  origin: 'http://localhost:5173', // URL do frontend Vite
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Rota para verificar se o servidor está funcionando
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rota principal do chat
app.post('/chat', async (req, res) => {
  try {
    await chatHandler(req, res);
  } catch (error) {
    console.error('Error in chat handler:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      success: false 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});