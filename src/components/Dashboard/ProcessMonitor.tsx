import React from 'react';
import { Play, Pause, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { processesData } from '../../data/mockData';

const ProcessMonitor: React.FC = () => {
  const getStatusIcon = (stato: string) => {
    switch (stato) {
      case 'completato':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_corso':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'in_attesa':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (stato: string) => {
    switch (stato) {
      case 'completato':
        return 'bg-green-100 text-green-800';
      case 'in_corso':
        return 'bg-blue-100 text-blue-800';
      case 'in_attesa':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getProgressColor = (progresso: number) => {
    if (progresso === 100) return 'bg-green-500';
    if (progresso >= 50) return 'bg-blue-500';
    if (progresso >= 25) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Monitor Processi in Tempo Reale</h2>
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm text-gray-600">Live</span>
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {processesData.map(process => (
          <div key={process.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(process.stato)}
                <div>
                  <p className="font-medium text-gray-900">{process.nome}</p>
                  {process.tempoRimanente && (
                    <p className="text-sm text-gray-500">Tempo rimanente: {process.tempoRimanente}</p>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(process.stato)}`}>
                {process.stato === 'completato' ? 'Completato' :
                 process.stato === 'in_corso' ? 'In Corso' : 'In Attesa'}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${getProgressColor(process.progresso)} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${process.progresso}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">Progresso</span>
              <span className="text-xs font-medium text-gray-700">{process.progresso}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">5</p>
            <p className="text-xs text-gray-600">Processi Attivi</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-xs text-gray-600">Completati Oggi</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">2</p>
            <p className="text-xs text-gray-600">In Coda</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessMonitor;