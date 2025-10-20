import React from 'react';
import { RefreshCw, Trash2, Package, TrendingUp, Leaf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { sebinoESGKPIs, circularEconomyMetrics, wasteProductionData } from '../../../data/sebino/sebinoMockData';

const SebinoCircular: React.FC = () => {
  const circular = sebinoESGKPIs.circular;

  const wasteRecoveryData = [
    { name: 'Recuperati', value: circular.non_hazardous_waste_recovery, color: '#10b981' },
    { name: 'Smaltiti', value: 100 - circular.non_hazardous_waste_recovery, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <RefreshCw className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">ESRS E5 - Economia Circolare</h2>
            </div>
            <p className="text-green-100">Gestione risorse, rifiuti e circolarità dei materiali</p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm text-green-100">Recupero Rottami</div>
              <div className="text-3xl font-bold">{circular.internal_scrap_recovery}%</div>
              <div className="text-xs text-green-100">Interno</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <RefreshCw className="h-6 w-6 text-green-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Contenuto Riciclato</p>
          <p className="text-2xl font-bold text-gray-900">{circular.recycling_rate_steel}%</p>
          <p className="text-xs text-gray-500 mt-1">Acciaio/ghisa</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Trash2 className="h-6 w-6 text-blue-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Recupero Non Pericolosi</p>
          <p className="text-2xl font-bold text-gray-900">{circular.non_hazardous_waste_recovery}%</p>
          <p className="text-xs text-gray-500 mt-1">Avviati a recupero</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Packaging Riciclato</p>
          <p className="text-2xl font-bold text-gray-900">{circular.packaging_recycled}%</p>
          <p className="text-xs text-gray-500 mt-1">Imballaggi sostenibili</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Leaf className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">MTBF Prodotto</p>
          <p className="text-2xl font-bold text-gray-900">{circular.mtbf.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">ore in esercizio</p>
        </div>
      </div>

      {/* Circular Economy Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Metriche Circolarità</h3>
          <div className="space-y-3">
            {circularEconomyMetrics.map((metric, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{metric.category}</p>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-green-600 mr-2">
                      {metric.value}{metric.unit}
                    </span>
                    {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasso Recupero Rifiuti Non Pericolosi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={wasteRecoveryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {wasteRecoveryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Recuperati</p>
              <p className="text-xl font-bold text-green-700">{circular.non_hazardous_waste_recovery}%</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Pericolosi Recuperati</p>
              <p className="text-xl font-bold text-orange-700">{circular.hazardous_waste_recovery}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Waste Production Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Produzione Rifiuti per Tipologia</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipologia</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantità</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unità</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wasteProductionData.map((waste, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{waste.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{waste.amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{waste.unit}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      waste.category === 'Pericoloso'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {waste.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Circularity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Durabilità Prodotto</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">MTBF (Mean Time Between Failures)</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{circular.mtbf.toLocaleString()} ore</p>
              <p className="text-xs text-gray-500 mt-2">~5.7 anni di funzionamento continuo</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Programma Take-Back</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{circular.takeback_program} t</p>
              <p className="text-xs text-gray-500 mt-2">Valvole recuperate per ricondizionamento</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Iniziative Economia Circolare</h3>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <RefreshCw className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Design for Disassembly</p>
                <p className="text-xs text-gray-600">Nuove valvole progettate per facile smontaggio e riparazione</p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <Package className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Refurbishment Program</p>
                <p className="text-xs text-gray-600">Ricondizionamento valvole usate con garanzia estesa</p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-purple-50 rounded-lg">
              <Leaf className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Materiali Sostenibili</p>
                <p className="text-xs text-gray-600">52.6% contenuto riciclato in acciaio/ghisa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SebinoCircular;
