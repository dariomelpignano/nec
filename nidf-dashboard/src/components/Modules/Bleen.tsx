import React, { useState } from 'react';
import { Brain, Search, Send, MessageSquare, Sparkles, Info } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Bleen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Ciao! Sono Bleen, il tuo assistente AI aziendale. Posso aiutarti a trovare informazioni su prodotti, clienti, processi e molto altro. Come posso assisterti oggi?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'Qual è lo stato dell\'ordine ORD-2024-001?',
    'Mostrami le specifiche della pompa PC-500',
    'Analisi vendite ultimo trimestre',
    'Documenti contratto Beta SPA',
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        'Ho trovato le informazioni richieste. L\'ordine ORD-2024-001 è attualmente in fase di produzione con un avanzamento del 75%. La consegna è prevista per il 30 settembre 2024.',
        'La pompa centrifuga PC-500 ha le seguenti caratteristiche: Portata max 500 m³/h, Prevalenza 80m, Potenza 75kW. Il manuale tecnico completo è disponibile nel sistema documentale.',
        'Le vendite dell\'ultimo trimestre mostrano un incremento del 12% rispetto al periodo precedente, con particolare crescita nel segmento valvole industriali (+18%).',
        'Ho identificato 3 documenti relativi al contratto con Beta SPA: contratto principale, allegato tecnico e ultima revisione prezzi del 15/09/2024.',
      ];

      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="card p-6 flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-indigo-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Bleen - AI Insight Engine</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-gray-600">Powered by AI</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Domande suggerite:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Chiedi qualsiasi cosa sui tuoi dati aziendali..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-start space-x-2">
        <Info className="h-4 w-4 text-blue-600 mt-0.5" />
        <p className="text-xs text-blue-700">
          Bleen accede in modo sicuro a tutti i dati aziendali: documenti, email, database, manuali tecnici.
          Le risposte sono generate analizzando le informazioni più rilevanti e aggiornate.
        </p>
      </div>
    </div>
  );
};

export default Bleen;