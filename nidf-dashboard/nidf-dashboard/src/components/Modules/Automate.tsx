import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, AlertCircle, Upload } from 'lucide-react';
import { documentsData } from '../../data/mockData';

const Automate: React.FC = () => {
  const [documents, setDocuments] = useState(documentsData);
  const [isProcessing, setIsProcessing] = useState(false);

  const getStatusIcon = (stato: string) => {
    switch (stato) {
      case 'processato':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_elaborazione':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'in_coda':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (stato: string) => {
    switch (stato) {
      case 'processato':
        return 'bg-green-100 text-green-800';
      case 'in_elaborazione':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_coda':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleProcessDocument = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => {
        if (doc.stato === 'in_coda') {
          return { ...doc, stato: 'in_elaborazione' };
        }
        if (doc.stato === 'in_elaborazione') {
          return {
            ...doc,
            stato: 'processato',
            accuratezza: 95 + Math.random() * 4,
            dataProcessamento: new Date()
          };
        }
        return doc;
      }));
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-indigo-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Automate - Elaborazione Documenti</h2>
        </div>
        <button
          onClick={handleProcessDocument}
          disabled={isProcessing}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isProcessing ? 'Elaborazione...' : 'Elabora Documenti'}
        </button>
      </div>

      <div className="space-y-3">
        {documents.slice(0, 4).map(doc => (
          <div key={doc.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(doc.stato)}
                <div>
                  <p className="font-medium text-gray-900">{doc.nome}</p>
                  <p className="text-sm text-gray-500">{doc.tipo}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.stato)}`}>
                {doc.stato === 'processato' ? 'Processato' :
                 doc.stato === 'in_elaborazione' ? 'In Elaborazione' : 'In Coda'}
              </span>
            </div>

            {doc.stato === 'processato' && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Accuratezza</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
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

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">1,847</p>
            <p className="text-sm text-gray-600">Documenti Oggi</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">98.7%</p>
            <p className="text-sm text-gray-600">Accuratezza Media</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">3.2s</p>
            <p className="text-sm text-gray-600">Tempo Medio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automate;