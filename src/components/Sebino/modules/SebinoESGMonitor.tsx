import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle, Clock, TrendingUp, TrendingDown, Database, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { esrsCoverage, dataQualityBySource, materialityTopics, auditTrail } from '../../../data/sebino/sebinoMockData';

const SebinoESGMonitor: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'coverage' | 'quality' | 'materiality' | 'audit'>('coverage');
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Transform materiality data for radar chart
  const materialityRadarData = materialityTopics.map(topic => ({
    topic: topic.topic.split(' ')[0], // abbreviato per il grafico
    financial: topic.financial_impact,
    stakeholder: topic.stakeholder_impact
  }));

  const getAssuranceColor = (assurance: string) => {
    switch (assurance) {
      case 'Limited': return 'bg-green-100 text-green-700';
      case 'Reasonable': return 'bg-blue-100 text-blue-700';
      case 'None': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critico': return 'bg-red-100 text-red-700';
      case 'Alto': return 'bg-orange-100 text-orange-700';
      case 'Medio': return 'bg-yellow-100 text-yellow-700';
      case 'Basso': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Chiuso': return 'bg-green-100 text-green-700';
      case 'In corso': return 'bg-blue-100 text-blue-700';
      case 'Aperto': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Shield className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">ESG Monitor - ESRS Compliance</h2>
            </div>
            <p className="text-green-100">Monitoraggio continuo conformità European Sustainability Reporting Standards</p>
          </div>
          <div className={`transition-all ${animating ? 'scale-110' : ''}`}>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-green-100">Coverage ESRS</div>
            </div>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setSelectedView('coverage')}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedView === 'coverage'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Copertura ESRS
          </button>
          <button
            onClick={() => setSelectedView('quality')}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedView === 'quality'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Database className="h-4 w-4 mr-2" />
            Qualità Dati
          </button>
          <button
            onClick={() => setSelectedView('materiality')}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedView === 'materiality'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Activity className="h-4 w-4 mr-2" />
            Materialità
          </button>
          <button
            onClick={() => setSelectedView('audit')}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedView === 'audit'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Shield className="h-4 w-4 mr-2" />
            Audit Trail
          </button>
        </div>
      </div>

      {/* Coverage View */}
      {selectedView === 'coverage' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ESRS Standards Coverage */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Copertura Standard ESRS</h3>
              <div className="space-y-3">
                {esrsCoverage.map((standard, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{standard.standard}</p>
                        <p className="text-xs text-gray-500">{standard.indicators} indicatori monitorati</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAssuranceColor(standard.assurance)}`}>
                        {standard.assurance}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          standard.coverage === 100 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${standard.coverage}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Coverage</span>
                      <span className="text-xs font-medium text-gray-700">{standard.coverage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage by Category Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuzione Indicatori</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={esrsCoverage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="standard"
                    stroke="#9ca3af"
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="indicators" fill="#10b981" name="N. Indicatori" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">70</p>
              <p className="text-sm text-gray-600">Indicatori Totali</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">Con Limited Assurance</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-sm text-gray-600">Fonti Dati Integrate</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">Real-time</p>
              <p className="text-sm text-gray-600">Aggiornamento Dati</p>
            </div>
          </div>
        </div>
      )}

      {/* Data Quality View */}
      {selectedView === 'quality' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualità Dati per Fonte</h3>
            <div className="space-y-4">
              {dataQualityBySource.map((source, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{source.source}</p>
                      <p className="text-xs text-gray-500">{source.volume.toLocaleString()} record/mese</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{source.quality}%</p>
                      <p className="text-xs text-gray-500">Quality Score</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Latenza Media</p>
                      <p className="font-medium text-gray-900">{source.latency}ms</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Volume</p>
                      <p className="font-medium text-gray-900">{(source.volume / 1000).toFixed(1)}K</p>
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${source.quality}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Materiality View */}
      {selectedView === 'materiality' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Matrice Doppia Materialità</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={materialityRadarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="topic" stroke="#6b7280" fontSize={11} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#9ca3af" fontSize={10} />
                  <Radar name="Impatto Finanziario" dataKey="financial" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Radar name="Impatto Stakeholder" dataKey="stakeholder" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Topics List */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Temi Materiali</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {materialityTopics.map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{topic.topic}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(topic.priority)}`}>
                        {topic.priority}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between bg-blue-50 rounded px-2 py-1">
                        <span className="text-gray-600">Finanziario</span>
                        <span className="font-medium text-blue-700">{topic.financial_impact}/10</span>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 rounded px-2 py-1">
                        <span className="text-gray-600">Stakeholder</span>
                        <span className="font-medium text-green-700">{topic.stakeholder_impact}/10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit Trail View */}
      {selectedView === 'audit' && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Trail ESG</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scope</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NC Maggiori</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NC Minori</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stato</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditTrail.map((audit) => (
                  <tr key={audit.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{audit.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {audit.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{audit.scope}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`font-medium ${audit.findings_major > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {audit.findings_major}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`font-medium ${audit.findings_minor > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {audit.findings_minor}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(audit.status)}`}>
                        {audit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SebinoESGMonitor;
