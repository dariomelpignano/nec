import React, { useEffect, useState } from 'react';
import { Database, Server, Shield, Zap, Globe, HardDrive } from 'lucide-react';
import { dataFabricMetrics } from '../../data/mockData';

const DataFabric: React.FC = () => {
  const [metrics, setMetrics] = useState(dataFabricMetrics);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        queryAlSecondo: Math.floor(prev.queryAlSecondo + (Math.random() - 0.5) * 100),
        latenzaMedia: Math.max(20, Math.floor(prev.latenzaMedia + (Math.random() - 0.5) * 10)),
      }));
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Data Fabric</h2>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          isAnimating ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        } transition-colors`}>
          {isAnimating ? 'Sincronizzazione' : 'Sincronizzato'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <Server className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">Fonti Collegate</p>
            <p className="text-lg font-semibold">{metrics.fontiCollegate}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <HardDrive className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">Volume Dati</p>
            <p className="text-lg font-semibold">{metrics.volumeDatiGB} GB</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Zap className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">Query/sec</p>
            <p className="text-lg font-semibold">{metrics.queryAlSecondo}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">Latenza</p>
            <p className="text-lg font-semibold">{metrics.latenzaMedia} ms</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Shield className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">Qualità Dati</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{metrics.qualitaDati}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
            style={{ width: `${metrics.qualitaDati}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600">ERP</p>
          <p className="text-sm font-semibold text-blue-600">Connesso</p>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600">MES</p>
          <p className="text-sm font-semibold text-blue-600">Connesso</p>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600">IoT</p>
          <p className="text-sm font-semibold text-blue-600">Attivo</p>
        </div>
      </div>
    </div>
  );
};

export default DataFabric;