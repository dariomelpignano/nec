import React, { useState } from 'react';
import { Settings, Package, Euro, CheckCircle, Edit, Clock, Users, TrendingUp, FileText } from 'lucide-react';

interface Configuration {
  id: string;
  nome: string;
  tipo: 'impianto_radiante' | 'valvole' | 'collettori' | 'sistema_completo';
  cliente: string;
  tipoCliente: 'installatore' | 'progettista' | 'OEM' | 'interno';
  valore: number;
  stato: 'bozza' | 'revisione_tecnica' | 'approvato' | 'in_produzione';
  dataCreazione: Date;
  componenti: number;
  margine: number;
}

const RBMDeclaro: React.FC = () => {
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);

  const configurations: Configuration[] = [
    {
      id: '1',
      nome: 'Impianto Radiante Villa 250mq',
      tipo: 'impianto_radiante',
      cliente: 'Termoidraulica Rossi Srl',
      tipoCliente: 'installatore',
      valore: 18500,
      stato: 'approvato',
      dataCreazione: new Date('2024-09-20'),
      componenti: 45,
      margine: 32
    },
    {
      id: '2',
      nome: 'Kit Valvole Termostatiche Hotel',
      tipo: 'valvole',
      cliente: 'Studio Ing. Bianchi',
      tipoCliente: 'progettista',
      valore: 24300,
      stato: 'revisione_tecnica',
      dataCreazione: new Date('2024-09-22'),
      componenti: 120,
      margine: 28
    },
    {
      id: '3',
      nome: 'Collettori Modulari Condominio',
      tipo: 'collettori',
      cliente: 'Costruzioni Verdi SpA',
      tipoCliente: 'OEM',
      valore: 45600,
      stato: 'in_produzione',
      dataCreazione: new Date('2024-09-18'),
      componenti: 24,
      margine: 35
    },
    {
      id: '4',
      nome: 'Sistema Completo Uffici 1200mq',
      tipo: 'sistema_completo',
      cliente: 'Ufficio Tecnico RBM',
      tipoCliente: 'interno',
      valore: 78900,
      stato: 'bozza',
      dataCreazione: new Date('2024-09-23'),
      componenti: 180,
      margine: 30
    }
  ];

  const configStats = {
    totali: 327,
    questoMese: 42,
    valoreGenerato: 4800000,
    tempoMedio: '12 min',
    conversionRate: 68
  };

  const getStatusColor = (stato: string) => {
    switch (stato) {
      case 'approvato': return 'bg-green-100 text-green-800';
      case 'revisione_tecnica': return 'bg-yellow-100 text-yellow-800';
      case 'in_produzione': return 'bg-blue-100 text-blue-800';
      case 'bozza': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (stato: string) => {
    switch (stato) {
      case 'approvato': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'revisione_tecnica': return <Edit className="h-4 w-4 text-yellow-500" />;
      case 'in_produzione': return <Settings className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'bozza': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return null;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'impianto_radiante': return '🔥';
      case 'valvole': return '🔧';
      case 'collettori': return '📊';
      case 'sistema_completo': return '🏢';
      default: return '📦';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Settings className="h-6 w-6 text-indigo-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Declaro - Configuratore Prodotti RBM</h2>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
          <Package className="h-4 w-4 mr-2" />
          Nuova Configurazione
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-5 gap-4 mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-600">{configStats.totali}</p>
          <p className="text-xs text-gray-600">Config. Totali</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{configStats.questoMese}</p>
          <p className="text-xs text-gray-600">Questo Mese</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-green-600">{formatPrice(configStats.valoreGenerato)}</p>
          <p className="text-xs text-gray-600">Pipeline Totale</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{configStats.tempoMedio}</p>
          <p className="text-xs text-gray-600">Tempo Medio</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{configStats.conversionRate}%</p>
          <p className="text-xs text-gray-600">Conversion Rate</p>
        </div>
      </div>

      {/* Configurations List */}
      <div className="space-y-3">
        {configurations.map(config => (
          <div
            key={config.id}
            className={`p-4 border rounded-lg cursor-pointer transition ${
              selectedConfig === config.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            onClick={() => setSelectedConfig(config.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTipoIcon(config.tipo)}</span>
                <div>
                  <p className="font-medium text-gray-900">{config.nome}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>{config.cliente}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      {config.tipoCliente}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(config.stato)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(config.stato)}`}>
                  {config.stato.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Valore</p>
                <p className="font-semibold text-gray-900">{formatPrice(config.valore)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Componenti</p>
                <p className="font-semibold text-gray-900">{config.componenti}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Margine</p>
                <p className="font-semibold text-green-600">{config.margine}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Data</p>
                <p className="font-semibold text-gray-900">
                  {config.dataCreazione.toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>

            {selectedConfig === config.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      Distinta Base
                    </button>
                    <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
                      Scheda Tecnica
                    </button>
                    <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
                      Preventivo PDF
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                      Modifica
                    </button>
                    <button className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Converti in Ordine
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-semibold text-gray-800 mb-2">Azioni Rapide:</p>
        <div className="grid grid-cols-3 gap-2">
          <button className="px-3 py-2 text-xs bg-white rounded hover:bg-gray-50 transition">
            📋 Template Impianto Base
          </button>
          <button className="px-3 py-2 text-xs bg-white rounded hover:bg-gray-50 transition">
            🔄 Duplica Configurazione
          </button>
          <button className="px-3 py-2 text-xs bg-white rounded hover:bg-gray-50 transition">
            📊 Report Configurazioni
          </button>
        </div>
      </div>
    </div>
  );
};

export default RBMDeclaro;