import React, { useState } from 'react';
import { Monitor, MessageSquare, Send, HelpCircle, Shield, Users, CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react';

interface Ticket {
  id: string;
  tipo: 'account' | 'vpn' | 'software' | 'hardware' | 'procedura';
  richiesta: string;
  utente: string;
  reparto: string;
  stato: 'risolto' | 'in_corso' | 'escalation' | 'nuovo';
  priorita: 'alta' | 'media' | 'bassa';
  tempoRisposta: string;
  risoluzione?: string;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

const RBMVirtualAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: 'Ciao! Sono l\'assistente virtuale ICT di RBM. Posso aiutarti con richieste VPN, account, procedure operative, problemi software/hardware. Come posso assisterti?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Ticket recenti
  const recentTickets: Ticket[] = [
    {
      id: 'T-2024-1823',
      tipo: 'vpn',
      richiesta: 'Accesso VPN non funzionante da casa',
      utente: 'Mario Rossi',
      reparto: 'Commerciale',
      stato: 'risolto',
      priorita: 'alta',
      tempoRisposta: '5 min',
      risoluzione: 'Reset credenziali automatico'
    },
    {
      id: 'T-2024-1824',
      tipo: 'account',
      richiesta: 'Nuovo account email per neoassunto',
      utente: 'Laura Bianchi',
      reparto: 'HR',
      stato: 'risolto',
      priorita: 'media',
      tempoRisposta: '8 min',
      risoluzione: 'Account creato automaticamente'
    },
    {
      id: 'T-2024-1825',
      tipo: 'software',
      richiesta: 'Installazione AutoCAD su workstation',
      utente: 'Giuseppe Verdi',
      reparto: 'Ufficio Tecnico',
      stato: 'escalation',
      priorita: 'alta',
      tempoRisposta: '15 min'
    },
    {
      id: 'T-2024-1826',
      tipo: 'procedura',
      richiesta: 'Come configurare firma email?',
      utente: 'Anna Russo',
      reparto: 'Marketing',
      stato: 'risolto',
      priorita: 'bassa',
      tempoRisposta: '2 min',
      risoluzione: 'Guida inviata automaticamente'
    }
  ];

  // Statistiche assistente
  const stats = {
    ticketOggi: 145,
    risoltiAutomaticamente: 128,
    tempoMedioRisposta: '3.2 min',
    soddisfazione: 94,
    escalation: 17,
    risparmiOre: 18
  };

  // Categorie richieste frequenti
  const frequentRequests = [
    { categoria: 'VPN/Accesso remoto', count: 42, automazione: 95 },
    { categoria: 'Reset password', count: 38, automazione: 100 },
    { categoria: 'Nuovi account', count: 25, automazione: 90 },
    { categoria: 'Procedure operative', count: 31, automazione: 85 },
    { categoria: 'Problemi stampa', count: 19, automazione: 70 }
  ];

  // Quick actions
  const quickActions = [
    'Reset password email',
    'Configurazione VPN',
    'Richiesta nuovo software',
    'Problema stampante',
    'Accesso cartelle condivise'
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simula risposta automatica
    setTimeout(() => {
      const responses = [
        'Ho verificato il tuo account. Le credenziali VPN sono state reimpostate e inviate alla tua email aziendale. Dovresti ricevere le nuove credenziali entro 2 minuti.',
        'Per configurare la VPN:\n1. Scarica il client VPN dal portale aziendale\n2. Inserisci server: vpn.rbm.it\n3. Usa le credenziali inviate via email\nVuoi che ti invii la guida dettagliata?',
        'Ho creato automaticamente il ticket T-2024-1827 per la tua richiesta. Un tecnico IT ti contatterà entro 30 minuti per l\'installazione del software richiesto.',
        'La procedura per la firma email è:\n1. Vai in Impostazioni > Email\n2. Clicca su "Firma"\n3. Inserisci il template aziendale\nTi ho inviato anche il video tutorial sulla tua email.'
      ];

      const assistantMessage: ChatMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getStatusColor = (stato: string) => {
    switch (stato) {
      case 'risolto': return 'bg-green-100 text-green-800';
      case 'in_corso': return 'bg-blue-100 text-blue-800';
      case 'escalation': return 'bg-yellow-100 text-yellow-800';
      case 'nuovo': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priorita: string) => {
    switch (priorita) {
      case 'alta': return 'text-red-600';
      case 'media': return 'text-yellow-600';
      case 'bassa': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'account': return '👤';
      case 'vpn': return '🔐';
      case 'software': return '💿';
      case 'hardware': return '🖥️';
      case 'procedura': return '📋';
      default: return '❓';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Monitor className="h-6 w-6 text-cyan-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Virtual Assistant ICT</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-gray-600">AI-Powered Helpdesk</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-6 gap-3 mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-cyan-600">{stats.ticketOggi}</p>
          <p className="text-xs text-gray-600">Ticket oggi</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.risoltiAutomaticamente}</p>
          <p className="text-xs text-gray-600">Risolti auto</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-blue-600">{stats.tempoMedioRisposta}</p>
          <p className="text-xs text-gray-600">Tempo medio</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.soddisfazione}%</p>
          <p className="text-xs text-gray-600">Soddisfazione</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.escalation}</p>
          <p className="text-xs text-gray-600">Escalation</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-600">{stats.risparmiOre}h</p>
          <p className="text-xs text-gray-600">Ore risparmiate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Interface */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Assistente Virtuale</h3>
            <span className="flex items-center text-xs text-green-600">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              Online
            </span>
          </div>

          <div className="h-64 overflow-y-auto mb-3 space-y-2 p-3 bg-white rounded-lg">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-cyan-200' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Richieste rapide:</p>
            <div className="flex flex-wrap gap-1">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(action)}
                  className="px-2 py-1 text-xs bg-white hover:bg-gray-100 text-gray-700 rounded border border-gray-300 transition"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Scrivi la tua richiesta..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Recent Tickets */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Ticket Recenti</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {recentTickets.map(ticket => (
              <div key={ticket.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{getTipoIcon(ticket.tipo)}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ticket.id}</p>
                      <p className="text-xs text-gray-600">{ticket.richiesta}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.stato)}`}>
                    {ticket.stato}
                  </span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>{ticket.utente} - {ticket.reparto}</span>
                    <span className={`font-medium ${getPriorityColor(ticket.priorita)}`}>
                      Priorità {ticket.priorita}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Tempo risposta: {ticket.tempoRisposta}</span>
                  </div>
                  {ticket.risoluzione && (
                    <div className="mt-1 p-2 bg-green-50 rounded text-green-700">
                      ✓ {ticket.risoluzione}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Frequent Requests */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Categorie Richieste Frequenti</h3>
        <div className="space-y-2">
          {frequentRequests.map((req, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <span className="text-sm text-gray-700">{req.categoria}</span>
                <span className="ml-2 text-xs text-gray-500">({req.count} oggi)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <span className="text-xs text-gray-600 mr-2">Automazione:</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        req.automazione >= 90 ? 'bg-green-500' :
                        req.automazione >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${req.automazione}%` }}
                    />
                  </div>
                  <span className="ml-2 text-xs font-medium">{req.automazione}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RBMVirtualAssistant;