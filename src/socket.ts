import { Server as SocketIOServer } from 'socket.io';
import Message, { MessageDocument } from './models/Message';
import fetch from 'node-fetch';

export const setupSocket = (server: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    // Enviar el historial de mensajes al usuario conectado
    Message.find().sort({ time: 1 }).exec()
      .then((messages: MessageDocument[]) => {
        socket.emit('chat history', messages);
      })
      .catch((err) => {
        console.error(err);
      });

    // Manejar un mensaje nuevo enviado por un cliente
    socket.on('chat message', async (msg) => {
      const message = new Message({ user: msg.user, text: msg.text });
      await message.save();

      // Emitir el mensaje a todos los usuarios conectados
      io.emit('chat message', message);

      // Verificar si el mensaje comienza con /chat
      if (msg.text.startsWith('/chat')) {
        try {
          const response = await fetch('http://localhost:3001/api/openai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: msg.text }),
          });

          let botMessageId = `bot-${Date.now()}`; // ID único para el mensaje del bot
          let botMessageContent = ""; // Acumular contenido de respuesta del bot
          
          // Inicia el mensaje del bot
          socket.emit('chat message start', { user: 'GPT-4', text: '', id: botMessageId });
          socket.broadcast.emit('chat message', message);

          if (response.body) {
            response.body.on('data', (chunk) => {
              const content = chunk.toString().split('data: ')[1];
              if (content) {
                botMessageContent += content; // Acumular contenido
                io.emit('chat message update', { user: 'GPT-4', text: botMessageContent, id: botMessageId });
              }
            });

            // Guardar el mensaje del bot en la base de datos cuando se complete la respuesta
            response.body.on('end', async () => {
              const botMessage = new Message({ user: 'GPT-4', text: botMessageContent });
              await botMessage.save();
            });
          } else {
            console.error('Response body is null');
          }

        } catch (error) {
          console.error('Error handling /chat command:', error);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });

  return io;
};
