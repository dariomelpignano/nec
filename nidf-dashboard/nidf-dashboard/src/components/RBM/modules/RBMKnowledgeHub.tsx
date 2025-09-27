import React, { useState } from 'react';
import { Brain, Search, BookOpen, Lightbulb, Users, TrendingUp, MessageSquare, Sparkles } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  type: 'manuale' | 'scheda' | 'brevetto' | 'normativa' | 'test';
  titolo: string;
  contenuto: string;
  rilevanza: number;
  dataAggiornamento: Date;
  reparto: string[];
}

const RBMKnowledgeHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tutti');
  const [isSearching, setIsSearching] = useState(false);

  const knowledgeStats = {
    documentiTotali: 524000,
    brevetti: 12450,
    normative: 3200,
    schedeProdotto: 8900,
    manuali: 4500,
    reportTest: 15600
  };

  const recentQueries = [
    { query: 'Specifiche valvola termostatica VT-500', user: 'Ufficio Tecnico', time: '5 min fa' },
    { query: 'Normativa EN 215 radiatori', user: 'R&D', time: '12 min fa' },
    { query: 'Procedura collaudo impianto radiante', user: 'Produzione', time: '25 min fa' },
    { query: 'Brevetto EP2345678 scambiatore calore', user: 'Legal', time: '1 ora fa' }
  ];

  const suggestedTopics = [
    { topic: 'Nuova direttiva ErP 2025', relevance: 95 },
    { topic: 'Ottimizzazione ciclo termodinamico', relevance: 88 },
    { topic: 'Materiali compositi per valvole', relevance: 82 },
    { topic: 'Certificazione ISO 9001:2025', relevance: 78 }
  ];

  const trainingModules = [
    {
      id: '1',
      titolo: 'Onboarding Tecnico Prodotti RBM',
      completamenti: 145,
      durata: '2.5 ore',
      rating: 4.8
    },
    {
      id: '2',
      titolo: 'Configurazione Impianti Radianti',
      completamenti: 89,
      durata: '3 ore',
      rating: 4.6
    },
    {
      id: '3',
      titolo: 'Normative Europee HVAC',
      completamenti: 67,
      durata: '1.5 ore',
      rating: 4.7
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-purple-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">RBM-GPT Knowledge Hub</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-gray-600">Modello proprietario v2.4</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Cerca in schede prodotto, manuali, brevetti, normative..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
          >
            {isSearching ? 'Ricerca...' : 'Cerca'}
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 mt-3">
          {['tutti', 'prodotti', 'brevetti', 'normative', 'manuali', 'test'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-sm rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-purple-100 text-purple-700 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">524K</p>
          <p className="text-xs text-gray-600">Documenti totali</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">12.5K</p>
          <p className="text-xs text-gray-600">Brevetti</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">3.2K</p>
          <p className="text-xs text-gray-600">Normative</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
          <p className="text-2xl font-bold text-orange-600">8.9K</p>
          <p className="text-xs text-gray-600">Schede prodotto</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-indigo-600">4.5K</p>
          <p className="text-xs text-gray-600">Manuali</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg">
          <p className="text-2xl font-bold text-pink-600">15.6K</p>
          <p className="text-xs text-gray-600">Report test</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Queries */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <MessageSquare className="h-4 w-4 text-gray-600 mr-2" />
            <h3 className="text-sm font-semibold text-gray-800">Query Recenti</h3>
          </div>
          <div className="space-y-2">
            {recentQueries.map((query, idx) => (
              <div key={idx} className="text-xs">
                <p className="font-medium text-gray-700 truncate">{query.query}</p>
                <p className="text-gray-500">{query.user} • {query.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Topics */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Lightbulb className="h-4 w-4 text-blue-600 mr-2" />
            <h3 className="text-sm font-semibold text-gray-800">Argomenti Rilevanti</h3>
          </div>
          <div className="space-y-2">
            {suggestedTopics.map((topic, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-700">{topic.topic}</p>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {topic.relevance}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Training Modules */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Users className="h-4 w-4 text-green-600 mr-2" />
            <h3 className="text-sm font-semibold text-gray-800">Training & Onboarding</h3>
          </div>
          <div className="space-y-2">
            {trainingModules.map(module => (
              <div key={module.id} className="text-xs">
                <p className="font-medium text-gray-700">{module.titolo}</p>
                <div className="flex items-center justify-between text-gray-500">
                  <span>{module.completamenti} completati</span>
                  <span>⭐ {module.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Q&A Examples */}
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <p className="text-sm font-semibold text-gray-800 mb-2">Esempi di domande supportate:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>• "Quali sono le specifiche della valvola VT-500?"</div>
          <div>• "Mostra i brevetti su scambiatori di calore"</div>
          <div>• "Procedura collaudo impianto radiante"</div>
          <div>• "Normative ErP per radiatori 2025"</div>
        </div>
      </div>
    </div>
  );
};

export default RBMKnowledgeHub;