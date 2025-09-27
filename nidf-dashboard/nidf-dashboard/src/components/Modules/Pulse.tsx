import React, { useEffect, useState } from 'react';
import { TrendingUp, Activity, AlertTriangle, BarChart3 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { performanceData } from '../../data/mockData';

const Pulse: React.FC = () => {
  const [data, setData] = useState(performanceData);
  const [prediction, setPrediction] = useState<number>(96);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        newData.push({
          name: `Set${newData.length - 8}`,
          value: 93 + Math.random() * 5
        });
        return newData.slice(-9);
      });
      setPrediction(95 + Math.random() * 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const anomalies = [
    { id: 1, processo: 'Linea Assemblaggio 3', tipo: 'Rallentamento', impatto: 'medio', tempo: '15 min fa' },
    { id: 2, processo: 'Controllo Qualità', tipo: 'Anomalia Statistica', impatto: 'basso', tempo: '1 ora fa' },
    { id: 3, processo: 'Magazzino Materie Prime', tipo: 'Scorte Basse', impatto: 'alto', tempo: '2 ore fa' },
  ];

  const getImpactColor = (impatto: string) => {
    switch (impatto) {
      case 'alto':
        return 'text-red-600 bg-red-100';
      case 'medio':
        return 'text-yellow-600 bg-yellow-100';
      case 'basso':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="h-6 w-6 text-green-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Pulse - Analytics Predittive</h2>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">Aggiornamento in tempo reale</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Efficienza Operativa</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Previsione:</span>
            <span className="text-sm font-semibold text-green-600">{prediction.toFixed(1)}%</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} domain={[80, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              labelStyle={{ color: '#111827', fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Anomalie Rilevate</h3>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </div>
        <div className="space-y-2">
          {anomalies.map(anomaly => (
            <div key={anomaly.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{anomaly.processo}</p>
                  <p className="text-xs text-gray-500">{anomaly.tipo} • {anomaly.tempo}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(anomaly.impatto)}`}>
                  Impatto {anomaly.impatto}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div>
          <div className="flex items-center mb-1">
            <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
            <p className="text-sm text-gray-600">Ottimizzazioni Suggerite</p>
          </div>
          <p className="text-xl font-bold text-gray-900">12</p>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <Activity className="h-4 w-4 text-blue-600 mr-2" />
            <p className="text-sm text-gray-600">Risparmio Previsto</p>
          </div>
          <p className="text-xl font-bold text-gray-900">€45K/mese</p>
        </div>
      </div>
    </div>
  );
};

export default Pulse;