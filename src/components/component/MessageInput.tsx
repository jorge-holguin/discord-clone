import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isDarkMode: boolean; // Acepta la prop isDarkMode
}

export function MessageInput({ onSendMessage, isDarkMode }: MessageInputProps) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    if (inputText.trim() !== "") {
      onSendMessage(inputText);
      setInputText(""); // Limpiar el campo de entrada después de enviar
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`p-4 rounded-lg flex items-center ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}>
      <Input
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className={`flex-1 border-none focus:ring-0 ${isDarkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-900"}`}
      />
      <Button variant="ghost" size="icon" className={`${isDarkMode ? "text-white" : "text-black"}`} onClick={handleSend}>
        <SendIcon className="w-6 h-6" />
      </Button>
    </div>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
