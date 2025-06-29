import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  isConnected: boolean;
  onSendMessage: (message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  isConnected,
  onSendMessage
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] lg:h-[700px] bg-white/[0.02] border border-white/[0.08] rounded-2xl backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gray-900/90 border-b border-gray-700 flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-black">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <div className="text-lg font-bold text-white">AI Transaction Assistant</div>
          <div className="text-sm text-gray-400">Natural language XRP transactions</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed animate-[messageSlide_0.4s_ease-out] ${
              message.type === 'user'
                ? 'bg-gradient-to-br from-green-400 to-green-600 text-black ml-auto rounded-br-md font-medium'
                : 'bg-white/5 text-white mr-auto rounded-bl-md border border-white/10'
            }`}
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 bg-gray-900/90 border-t border-gray-700 flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isConnected
              ? "Type your transaction request... (e.g., \"Send 10 XRP to rN7n7...\")"
              : "Connect your wallet to start sending XRP..."
          }
          disabled={!isConnected || isLoading}
          className="flex-1 px-6 py-4 border border-gray-600 rounded-2xl bg-white/[0.03] text-white placeholder-gray-500 outline-none transition-all duration-300 focus:bg-white/[0.06] focus:border-green-400 focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!isConnected || isLoading || !input.trim()}
          className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-black rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;