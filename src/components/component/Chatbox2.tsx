'use client';
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useUser } from "../hooks/useUser";
import { Header } from "./Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageInput } from "./MessageInput";

const socket = io("http://localhost:3001");

export function Chatbox2() {
  const user = useUser();
  const [messages, setMessages] = useState<{ user: string; text: string; id: string }[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("chat history", (msgs: { user: string; text: string; id: string }[]) => {
      setMessages(msgs);
    });

    socket.on("chat message", (msg: { user: string; text: string; id: string }) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("chat message start", (msg: { user: string; text: string; id: string }) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("chat message update", (msg: { user: string; text: string; id: string }) => {
      setMessages((prevMessages) =>
        prevMessages.map((m) =>
          m.id === msg.id ? { ...m, text: m.text + msg.text } : m
        )
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat history");
      socket.off("chat message");
      socket.off("chat message start");
      socket.off("chat message update");
    };
  }, []);

  const handleSendMessage = (message: string) => {
    if (user) {
      const newMessage = { user: user, text: message, id: `msg-${Date.now()}` };
      socket.emit("chat message", newMessage);
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className={`flex-1 p-6 overflow-auto ${isDarkMode ? "bg-[#36393f] text-white" : "bg-white text-black"}`}>
        <div className="mb-4">
          {messages.map((message, index) => (
            <div key={message.id || index} className="flex items-start mb-4">
              <Avatar>
                <AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <span className="font-bold">{message.user}</span>
                <p className={`${isDarkMode ? "text-white" : "text-gray-700"}`}>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full">
        <MessageInput onSendMessage={handleSendMessage} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
