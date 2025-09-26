require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const config = {
  port: 3000,
  cors: {
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
  },
  genAI: new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY)
};

module.exports = config;