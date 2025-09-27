import React, { useState } from 'react';
import { Settings, Package, Euro, CheckCircle, Edit, Clock } from 'lucide-react';
import { savedConfigurations } from '../../data/mockData';

const Declaro: React.FC = () => {
  const [configurations] = useState(savedConfigurations);
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);

  const getStatusIcon = (stato: string) => {
    switch (stato) {
      case 'approvato':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_revisione':
        return <Edit className="h-4 w-4 text-yellow-500" />;
      case 'bozza':
        return <Clock className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (stato: string) => {
    switch (stato) {
      case 'approvato':
        return 'bg-green-100 text-green-800';
      case 'in_revisione':
        return 'bg-yellow-100 text-yellow-800';
      case 'bozza':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Settings className="h-6 w-6 text-purple-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Declaro - Configuratore Prodotti</h2>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          + Nuova Configurazione
        </button>
      </div>

      <div className="space-y-3">
        {configurations.map(config => (
          <div
            key={config.id}
            className={`p-4 border rounded-lg cursor-pointer transition ${
              selectedConfig === config.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            onClick={() => setSelectedConfig(config.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{config.nome}</p>
                  <p className="text-sm text-gray-500">{config.cliente}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(config.stato)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(config.stato)}`}>
                  {config.stato === 'approvato' ? 'Approvato' :
                   config.stato === 'in_revisione' ? 'In Revisione' : 'Bozza'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Euro className="h-4 w-4 mr-1" />
                  <span className="font-semibold text-gray-900">{formatPrice(config.prezzo)}</span>
                </div>
                <span className="text-sm text-gray-500">
                  Creato: {config.dataCreazione.toLocaleDateString('it-IT')}
                </span>
              </div>
              {selectedConfig === config.id && (
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
                    Modifica
                  </button>
                  <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                    Visualizza
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-600">156</p>
            <p className="text-sm text-gray-600">Config. Totali</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-600">€2.3M</p>
            <p className="text-sm text-gray-600">Valore Generato</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-600">94%</p>
            <p className="text-sm text-gray-600">Tasso Successo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Declaro;