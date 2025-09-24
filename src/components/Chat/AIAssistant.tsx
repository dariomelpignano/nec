import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, Send, Sparkles, Database, Package, Users,
  TrendingUp, FileText, AlertCircle, CheckCircle, Clock,
  Brain, Zap, HelpCircle, ArrowRight, Loader
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  system?: 'ERP' | 'SCM' | 'CRM' | 'Analytics';
  typing?: boolean;
}

interface SuggestedQuestion {
  question: string;
  system: 'ERP' | 'SCM' | 'CRM';
  icon: any;
  category: string;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Ciao! Sono il tuo assistente AI aziendale. Posso interrogare in tempo reale i sistemi ERP, SCM e CRM per fornirti insights immediati. Come posso aiutarti oggi?",
      sender: 'ai',
      timestamp: new Date(),
      system: 'Analytics'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<'All' | 'ERP' | 'SCM' | 'CRM'>('All');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions: SuggestedQuestion[] = [
    {
      question: "Qual è lo stato dell'ordine cliente OC-2024-1847?",
      system: 'ERP',
      icon: FileText,
      category: 'Ordini'
    },
    {
      question: "Mostrami il livello scorte per i componenti critici",
      system: 'SCM',
      icon: Package,
      category: 'Inventario'
    },
    {
      question: "Analisi fatturato top 10 clienti ultimo trimestre",
      system: 'CRM',
      icon: Users,
      category: 'Clienti'
    },
    {
      question: "Previsione domanda pompe centrifughe prossimo mese",
      system: 'SCM',
      icon: TrendingUp,
      category: 'Previsioni'
    },
    {
      question: "Ritardi consegne fornitori ultima settimana",
      system: 'SCM',
      icon: AlertCircle,
      category: 'Fornitori'
    },
    {
      question: "Marginalità per linea prodotto YTD",
      system: 'ERP',
      icon: TrendingUp,
      category: 'Finance'
    },
    {
      question: "Cliente Beta SPA: storico ordini e pagamenti",
      system: 'CRM',
      icon: Users,
      category: 'Account'
    },
    {
      question: "Capacità produttiva disponibile prossime 2 settimane",
      system: 'ERP',
      icon: Clock,
      category: 'Produzione'
    }
  ];

  const systemResponses = {
    ERP: [
      "Accesso al sistema ERP SAP in corso... Recupero dati dall'ordine cliente OC-2024-1847:\n\n📊 **Stato Ordine**: In produzione\n📅 **Data inserimento**: 15/09/2024\n🏭 **Avanzamento produzione**: 65%\n📦 **Quantità**: 250 unità\n💰 **Valore**: €127,500\n🚚 **Data consegna prevista**: 30/09/2024\n\n✅ Tutti i materiali sono disponibili\n⚠️ Nota: Leggero ritardo sulla fase di assemblaggio (-2 giorni)",

      "Sistema ERP - Analisi marginalità per linea prodotto (YTD):\n\n**Pompe Centrifughe**: 42% margine (€1.2M)\n**Valvole Industriali**: 38% margine (€890K)\n**Compressori**: 35% margine (€650K)\n**Scambiatori**: 31% margine (€420K)\n\n📈 Trend positivo: +3.5% vs anno precedente",

      "Capacità produttiva prossime 2 settimane:\n\n**Settimana 39**: 78% utilizzata (440h/560h)\n**Settimana 40**: 65% utilizzata (364h/560h)\n\n🟢 Linea 1: Disponibile per ordini urgenti\n🟡 Linea 2: Quasi satura (90%)\n🟢 Linea 3: 45% disponibilità"
    ],
    SCM: [
      "Connessione a Supply Chain Management... Analisi scorte componenti critici:\n\n🔴 **Cuscinetti SKF-2024**: 12 unità (sotto minimo)\n🟡 **Guarnizioni OR-156**: 45 unità (scorta 2 settimane)\n🟢 **Motori elettrici ME-75**: 28 unità (ottimale)\n🔴 **Valvole di sicurezza VS-8**: 5 unità (CRITICO)\n\n⚠️ **Azione richiesta**: Emettere ordini urgenti per 2 componenti critici",

      "Analisi ritardi fornitori ultima settimana:\n\n❌ **TechnoSupply Srl**: -5 giorni su ordine PO-8745\n❌ **MetalParts SpA**: -3 giorni su ordine PO-8801\n✅ **GlobalComponents**: Puntuale\n✅ **ItalMeccanica**: Consegna anticipata +1 giorno\n\n📊 Performance complessiva: 67% puntualità",

      "Previsione domanda pompe centrifughe (Ottobre 2024):\n\n📈 **Domanda prevista**: 320 unità (+15% vs Settembre)\n🎯 **Confidence level**: 87%\n📊 **Driver principali**: Stagionalità + nuovi contratti\n\n💡 Raccomandazione: Aumentare produzione del 20% per buffer sicurezza"
    ],
    CRM: [
      "Accesso CRM Salesforce... Report cliente Beta SPA:\n\n👤 **Ragione sociale**: Beta Manufacturing SPA\n📍 **Sede**: Milano\n💼 **Settore**: Automotive\n📈 **Fatturato 2024**: €485,000\n💳 **Pagamenti**: Regolari (DSO: 45gg)\n\n**Ultimi 5 ordini**:\n• OC-2024-1823: €67,000 (Consegnato)\n• OC-2024-1756: €54,000 (Consegnato)\n• OC-2024-1698: €89,000 (In produzione)\n• OC-2024-1634: €43,000 (Consegnato)\n• OC-2024-1589: €71,000 (Consegnato)\n\n🌟 Cliente strategico - Categoria: GOLD",

      "Analisi fatturato Top 10 clienti (Q3 2024):\n\n1. **Alfa Industries**: €1,250,000 (+12%)\n2. **Beta SPA**: €485,000 (+8%)\n3. **Gamma Tech**: €420,000 (+15%)\n4. **Delta Motors**: €380,000 (-5%)\n5. **Epsilon Group**: €350,000 (+22%)\n6. **Zeta Automation**: €325,000 (+10%)\n7. **Eta Systems**: €310,000 (+3%)\n8. **Theta Mechanics**: €295,000 (+18%)\n9. **Iota Industrial**: €280,000 (-2%)\n10. **Kappa Solutions**: €265,000 (+7%)\n\n💰 **Totale Top 10**: €4,360,000\n📊 **% su fatturato totale**: 68%",

      "Pipeline commerciale - Opportunità aperte:\n\n🎯 **Valore totale pipeline**: €2.8M\n📊 **Numero opportunità**: 47\n🏆 **Win rate previsto**: 35%\n\n**Top 3 opportunità**:\n1. NewTech Corp - €450K (Probabilità: 75%)\n2. Industrial Plus - €380K (Probabilità: 60%)\n3. Meccanica Moderna - €290K (Probabilità: 80%)"
    ]
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (message?: string) => {
    const textToSend = message || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing and response
    setTimeout(() => {
      // Determine which system to query based on keywords
      let system: 'ERP' | 'SCM' | 'CRM' = 'ERP';
      let responsePool = systemResponses.ERP;

      if (textToSend.toLowerCase().includes('scorte') ||
          textToSend.toLowerCase().includes('fornitor') ||
          textToSend.toLowerCase().includes('supply') ||
          textToSend.toLowerCase().includes('previsione domanda')) {
        system = 'SCM';
        responsePool = systemResponses.SCM;
      } else if (textToSend.toLowerCase().includes('client') ||
                 textToSend.toLowerCase().includes('fatturato') ||
                 textToSend.toLowerCase().includes('crm')) {
        system = 'CRM';
        responsePool = systemResponses.CRM;
      }

      const randomResponse = responsePool[Math.floor(Math.random() * responsePool.length)];

      const aiMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
        system: system
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const getSystemColor = (system?: string) => {
    switch (system) {
      case 'ERP':
        return 'from-blue-500 to-indigo-600';
      case 'SCM':
        return 'from-green-500 to-emerald-600';
      case 'CRM':
        return 'from-purple-500 to-pink-600';
      case 'Analytics':
        return 'from-yellow-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getSystemIcon = (system?: string) => {
    switch (system) {
      case 'ERP':
        return Database;
      case 'SCM':
        return Package;
      case 'CRM':
        return Users;
      case 'Analytics':
        return Brain;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Business Assistant</h2>
              <p className="text-xs text-gray-400">Connesso a ERP, SCM, CRM</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-xs text-green-400">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Online
            </span>
          </div>
        </div>

        {/* System Filter */}
        <div className="flex space-x-2 mt-4">
          {['All', 'ERP', 'SCM', 'CRM'].map((system) => (
            <button
              key={system}
              onClick={() => setSelectedSystem(system as any)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedSystem === system
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {system}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const SystemIcon = getSystemIcon(message.system);
          return (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender === 'ai' && message.system && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-1 bg-gradient-to-r ${getSystemColor(message.system)} rounded-lg`}>
                      <SystemIcon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">{message.system} System</span>
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/10 backdrop-blur-lg border border-white/20 text-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start animate-slide-up">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Loader className="h-4 w-4 text-blue-400 animate-spin" />
                <span className="text-sm text-gray-400">L'assistente sta elaborando...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="p-4 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400 font-medium">Domande suggerite</p>
          <HelpCircle className="h-3 w-3 text-gray-500" />
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {suggestedQuestions
            .filter(q => selectedSystem === 'All' || q.system === selectedSystem)
            .slice(0, 4)
            .map((sq, index) => {
              const Icon = sq.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(sq.question)}
                  className="flex items-center space-x-2 p-2 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-all group"
                >
                  <div className={`p-1.5 bg-gradient-to-r ${getSystemColor(sq.system)} rounded-lg`}>
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300 truncate">{sq.question}</p>
                    <p className="text-xs text-gray-500">{sq.system} • {sq.category}</p>
                  </div>
                  <ArrowRight className="h-3 w-3 text-gray-500 group-hover:text-white transition opacity-0 group-hover:opacity-100" />
                </button>
              );
            })}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/30 backdrop-blur-xl border-t border-white/10">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Interroga ERP, SCM o CRM..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
            />
          </div>
          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span className="text-sm font-medium">Invia</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by NEC AI • Dati in tempo reale da sistemi aziendali
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;