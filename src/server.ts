import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { setupSocket } from './socket';
import openaiRoute from './routes/openai';
import dotenv from 'dotenv';
import next from 'next';

dotenv.config();


const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

// Iniciar Next.js
nextApp.prepare().then(() => {
  // Rutas de la API
  app.use('/api', openaiRoute);

  // Configurar Socket.IO
  setupSocket(server);

  // Manejar todas las demás rutas con Next.js
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
