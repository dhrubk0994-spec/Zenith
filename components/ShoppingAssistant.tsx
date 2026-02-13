
import React, { useState, useRef, useEffect } from 'react';
import { getConciergeResponse } from '../services/geminiService';
import { CartItem } from '../types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface ShoppingAssistantProps {
  cartItems: CartItem[];
}

const ShoppingAssistant: React.FC<ShoppingAssistantProps> = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Greetings. I am the Zenith Concierge. How may I assist your style journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getConciergeResponse(userMsg, cartItems);
    setMessages(prev => [...prev, { role: 'assistant', text: response || '' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-dark border border-gold/30 shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-4 bg-navy border-b border-gold/20 flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Zenith Concierge</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 text-[12px] font-light leading-relaxed ${
                  m.role === 'user' ? 'bg-gold/10 text-gray-200 border-l border-gold/30' : 'text-gray-400 italic'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="text-[10px] text-gold uppercase tracking-widest animate-pulse italic">Thinking...</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gold/10 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inquire about styling..."
              className="flex-1 bg-transparent border-b border-gold/20 py-2 text-[12px] text-gray-300 focus:outline-none focus:border-gold transition-colors"
            />
            <button 
              onClick={handleSend}
              className="text-gold uppercase text-[10px] tracking-widest hover:text-white transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-dark border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-500 group shadow-lg"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.93.55 3.73 1.5 5.25l-1.5 4.75 4.75-1.5c1.52.95 3.32 1.5 5.25 1.5 5.52 0 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ShoppingAssistant;
