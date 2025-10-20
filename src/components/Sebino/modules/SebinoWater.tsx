import React from 'react';
import { Droplet, TrendingDown, Recycle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { sebinoESGKPIs, waterConsumptionData } from '../../../data/sebino/sebinoMockData';

const SebinoWater: React.FC = () => {
  const water = sebinoESGKPIs.water;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Droplet className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">ESRS E3 - Risorse Idriche</h2>
            </div>
            <p className="text-cyan-100">Gestione sostenibile dell'acqua e monitoraggio scarichi</p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm text-cyan-100">Tasso Ricircolo</div>
              <div className="text-3xl font-bold">{water.recycling_rate}%</div>
              <div className="text-xs text-cyan-100">Assemblaggio/Collaudo</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Droplet className="h-6 w-6 text-blue-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Prelievi Totali</p>
          <p className="text-2xl font-bold text-gray-900">{water.total_withdrawal.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">m³/anno (fonderia)</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Droplet className="h-6 w-6 text-cyan-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Consumo Fonderia</p>
          <p className="text-2xl font-bold text-gray-900">{water.consumption_foundry.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">m³/anno</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Recycle className="h-6 w-6 text-green-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Intensità Idrica</p>
          <p className="text-2xl font-bold text-gray-900">{water.intensity_mechanical}</p>
          <p className="text-xs text-gray-500 mt-1">m³/pezzo (meccanica)</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Droplet className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Consumo Verniciatura</p>
          <p className="text-2xl font-bold text-gray-900">{water.consumption_painting.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">m³/anno</p>
        </div>
      </div>

      {/* Water Balance Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bilancio Idrico per Area</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={waterConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="area" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} label={{ value: 'm³', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="consumption" fill="#3b82f6" name="Consumo" />
            <Bar dataKey="recycled" fill="#10b981" name="Ricircolato" />
            <Bar dataKey="discharged" fill="#6366f1" name="Scaricato" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Water Quality & Discharge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualità Scarichi</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">pH</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Conforme
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">7.3</p>
              <p className="text-xs text-gray-500 mt-1">Media (range 6.9-7.8)</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">COD</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Conforme
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">110 mg/L</p>
              <p className="text-xs text-gray-500 mt-1">Media (picco 150 mg/L)</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Scarichi Totali</span>
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">30,477 m³</p>
              <p className="text-xs text-gray-500 mt-1">Tutti i siti - anno 2024</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficienza Idrica</h3>
          <div className="space-y-4">
            {waterConsumptionData.map((area, index) => {
              const recyclingRate = ((area.recycled / area.consumption) * 100).toFixed(1);
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">{area.area}</p>
                    <p className="text-sm font-bold text-green-600">{recyclingRate}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${recyclingRate}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Tasso ricircolo</span>
                    <span>{area.recycled.toLocaleString()} m³ ricircolati</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Water Risk Assessment */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Risk Assessment (WRI Aqueduct)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Stress Idrico</h4>
            <p className="text-2xl font-bold text-green-700">Basso-Medio</p>
            <p className="text-xs text-green-700 mt-2">Bacino Po: stress moderato in estate</p>
          </div>

          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Qualità Acque</h4>
            <p className="text-2xl font-bold text-blue-700">Buona</p>
            <p className="text-xs text-blue-700 mt-2">Monitoraggio ARPA continuo</p>
          </div>

          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Rischio Siccità</h4>
            <p className="text-2xl font-bold text-yellow-700">Medio</p>
            <p className="text-xs text-yellow-700 mt-2">Piani di contingency attivi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SebinoWater;
