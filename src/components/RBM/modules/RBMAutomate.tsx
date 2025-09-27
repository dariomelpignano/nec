import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, AlertCircle, Upload, TrendingUp, FileSpreadsheet, Map, Package } from 'lucide-react';

interface Document {
  id: string;
  tipo: 'fattura' | 'ddt' | 'planimetria' | 'scheda_tecnica' | 'ordine' | 'contratto';
  nome: string;
  fornitore?: string;
  cliente?: string;
  dataProcessamento: Date;
  accuratezza: number;
  stato: 'processato' | 'in_elaborazione' | 'in_coda' | 'errore';
  integrazione: 'SME_Up' | 'Dynamics_CRM' | 'manuale';
}

const RBMAutomate: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const documents: Document[] = [
    {
      id: '1',
      tipo: 'fattura',
      nome: 'FT-2024-18923',
      fornitore: 'Acciai Speciali Srl',
      dataProcessamento: new Date('2024-09-24T10:30:00'),
      accuratezza: 99.2,
      stato: 'processato',
      integrazione: 'SME_Up'
    },
    {
      id: '2',
      tipo: 'ddt',
      nome: 'DDT-2024-45612',
      cliente: 'Termoidraulica Milano',
      dataProcessamento: new Date('2024-09-24T11:15:00'),
      accuratezza: 98.7,
      stato: 'processato',
      integrazione: 'SME_Up'
    },
    {
      id: '3',
      tipo: 'planimetria',
      nome: 'PLN-Villa-Rossi-DWG',
      cliente: 'Studio Arch. Verdi',
      dataProcessamento: new Date('2024-09-24T11:45:00'),
      accuratezza: 0,
      stato: 'in_elaborazione',
      integrazione: 'Dynamics_CRM'
    },
    {
      id: '4',
      tipo: 'scheda_tecnica',
      nome: 'ST-Valvola-VT500-Rev3',
      dataProcessamento: new Date('2024-09-24T12:00:00'),
      accuratezza: 0,
      stato: 'in_coda',
      integrazione: 'manuale'
    }
  ];

  const processingStats = {
    oggi: 2450,
    settimana: 12300,
    mese: 48500,
    accuratezzaMedia: 97.8,
    tempoMedio: '4.2s',
    erroriOggi: 3
  };

  const integrationStatus = {
    SME_Up: { status: 'online', lastSync: '2 min fa', records: 1847 },
    Dynamics_CRM: { status: 'online', lastSync: '5 min fa', records: 923 },
    SharePoint: { status: 'online', lastSync: '10 min fa', records: 456 }
  };

  const getStatusIcon = (stato: string) => {
    switch (stato) {
      case 'processato':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_elaborazione':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'in_coda':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      case 'errore':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (stato: string) => {
    switch (stato) {
      case 'processato': return 'bg-green-100 text-green-800';
      case 'in_elaborazione': return 'bg-yellow-100 text-yellow-800';
      case 'in_coda': return 'bg-gray-100 text-gray-600';
      case 'errore': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'fattura': return <FileSpreadsheet className="h-4 w-4 text-blue-500" />;
      case 'ddt': return <Package className="h-4 w-4 text-purple-500" />;
      case 'planimetria': return <Map className="h-4 w-4 text-green-500" />;
      case 'scheda_tecnica': return <FileText className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleProcessDocuments = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Automate - Elaborazione Documenti RBM</h2>
        </div>
        <button
          onClick={handleProcessDocuments}
          disabled={isProcessing}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isProcessing ? 'Elaborazione...' : 'Processa Batch'}
        </button>
      </div>

      {/* Processing Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{processingStats.oggi}</p>
          <p className="text-xs text-gray-600">Oggi</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-cyan-600">{processingStats.settimana}</p>
          <p className="text-xs text-gray-600">Settimana</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-teal-600">{processingStats.mese}</p>
          <p className="text-xs text-gray-600">Mese</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{processingStats.accuratezzaMedia}%</p>
          <p className="text-xs text-gray-600">Accuratezza</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-600">{processingStats.tempoMedio}</p>
          <p className="text-xs text-gray-600">Tempo Medio</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">{processingStats.erroriOggi}</p>
          <p className="text-xs text-gray-600">Errori</p>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3 mb-6">
        {documents.map(doc => (
          <div key={doc.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getTipoIcon(doc.tipo)}
                <div>
                  <p className="font-medium text-gray-900">{doc.nome}</p>
                  <p className="text-sm text-gray-500">
                    {doc.tipo.charAt(0).toUpperCase() + doc.tipo.slice(1).replace('_', ' ')}
                    {doc.fornitore && ` • Fornitore: ${doc.fornitore}`}
                    {doc.cliente && ` • Cliente: ${doc.cliente}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  doc.integrazione === 'SME_Up' ? 'bg-purple-100 text-purple-700' :
                  doc.integrazione === 'Dynamics_CRM' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {doc.integrazione.replace('_', ' ')}
                </span>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(doc.stato)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.stato)}`}>
                    {doc.stato === 'processato' ? 'Processato' :
                     doc.stato === 'in_elaborazione' ? 'In Elaborazione' :
                     doc.stato === 'in_coda' ? 'In Coda' : 'Errore'}
                  </span>
                </div>
              </div>
            </div>

            {doc.stato === 'processato' && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Accuratezza estrazione</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{ width: `${doc.accuratezza}%` }}
                      />
                    </div>
                    <span className="font-medium text-gray-900">{doc.accuratezza.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Integration Status */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Stato Integrazioni</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(integrationStatus).map(([system, status]) => (
            <div key={system} className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{system.replace('_', ' ')}</span>
                <span className={`h-2 w-2 rounded-full ${
                  status.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                } animate-pulse`}></span>
              </div>
              <p className="text-xs text-gray-500">Sync: {status.lastSync}</p>
              <p className="text-xs text-gray-600 font-medium">{status.records} record</p>
            </div>
          ))}
        </div>
      </div>

      {/* Document Types Distribution */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-800">Distribuzione Tipologie</p>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">890</p>
            <p className="text-gray-600">Fatture</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">650</p>
            <p className="text-gray-600">DDT</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">420</p>
            <p className="text-gray-600">Planimetrie</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-orange-600">490</p>
            <p className="text-gray-600">Schede Tecniche</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RBMAutomate;