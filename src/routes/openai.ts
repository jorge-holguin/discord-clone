import { Router } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que esta clave esté en tu archivo .env
});

router.post('/openai', async (req, res) => {
  const { text } = req.body;

  try {
    const stream = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: text }],
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      res.write(`data: ${chunk.choices[0]?.delta?.content || ''}\n\n`);
    }

    res.end();

  } catch (error) {
    console.error('Error with OpenAI streaming:', error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
