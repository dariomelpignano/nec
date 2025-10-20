import React from 'react';
import { Users, Shield, TrendingDown, AlertTriangle, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { sebinoESGKPIs, healthSafetyMetrics } from '../../../data/sebino/sebinoMockData';

const SebinoWorkforce: React.FC = () => {
  const workforce = sebinoESGKPIs.workforce;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Users className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">ESRS S1 - Forza Lavoro Propria</h2>
            </div>
            <p className="text-indigo-100">Salute, sicurezza e condizioni di lavoro</p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm text-indigo-100">Contratti Permanenti</div>
              <div className="text-3xl font-bold">{workforce.permanent_contracts_painting}%</div>
              <div className="text-xs text-indigo-100">Verniciatura</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">TRIR Fonderia</p>
          <p className="text-2xl font-bold text-gray-900">{workforce.trir_foundry}</p>
          <p className="text-xs text-gray-500 mt-1">Infortuni ogni 200K ore</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">TRIR Magazzino</p>
          <p className="text-2xl font-bold text-gray-900">{workforce.trir_warehouse}</p>
          <p className="text-xs text-gray-500 mt-1">Miglior performance</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Formazione</p>
          <p className="text-2xl font-bold text-gray-900">{workforce.training_hours_mechanical}</p>
          <p className="text-xs text-gray-500 mt-1">ore/FTE (meccanica)</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Turnover</p>
          <p className="text-2xl font-bold text-gray-900">{workforce.turnover_mechanical}%</p>
          <p className="text-xs text-gray-500 mt-1">Officina meccanica</p>
        </div>
      </div>

      {/* Health & Safety Metrics by Area */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Metriche Salute e Sicurezza per Area</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={healthSafetyMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="area" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="trir" fill="#ef4444" name="TRIR" />
            <Bar dataKey="near_miss" fill="#fbbf24" name="Near-Miss" />
            <Bar dataKey="exposure_noise" fill="#3b82f6" name="Esposti Rumore" />
            <Bar dataKey="exposure_dust" fill="#8b5cf6" name="Esposti Polveri" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Diversity & Inclusion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Diversity & Inclusion</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Gender Balance Assemblaggio</span>
                <span className="text-lg font-bold text-purple-600">{workforce.gender_balance_assembly}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${workforce.gender_balance_assembly}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Percentuale donne</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Gender Pay Gap Uffici</span>
                <span className="text-lg font-bold text-green-600">{workforce.gender_pay_gap_office}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(10 - workforce.gender_pay_gap_office) * 10}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Obiettivo: &lt;3%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contratti e Stabilità</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Tempo Indeterminato - Verniciatura</span>
                <span className="text-lg font-bold text-blue-600">{workforce.permanent_contracts_painting}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${workforce.permanent_contracts_painting}%` }}
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Turnover Officina Meccanica</span>
                <span className="text-lg font-bold text-green-600">{workforce.turnover_mechanical}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${100 - workforce.turnover_mechanical * 10}%` }}
                />
              </div>
              <p className="text-xs text-green-600 mt-2">Basso turnover = stabilità</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exposure Risks */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Esposizioni a Rischio</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
              <h4 className="font-semibold text-orange-900">Rumore &gt;85 dB</h4>
            </div>
            <p className="text-3xl font-bold text-orange-700">8</p>
            <p className="text-sm text-orange-700 mt-1">lavoratori esposti (Fonderia)</p>
            <p className="text-xs text-orange-600 mt-2">DPI obbligatori forniti</p>
          </div>

          <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-6 w-6 text-purple-600 mr-2" />
              <h4 className="font-semibold text-purple-900">Polveri/Sostanze</h4>
            </div>
            <p className="text-3xl font-bold text-purple-700">22</p>
            <p className="text-sm text-purple-700 mt-1">lavoratori esposti (Collaudo + Magazzino)</p>
            <p className="text-xs text-purple-600 mt-2">Monitoraggio biologico attivo</p>
          </div>

          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Shield className="h-6 w-6 text-yellow-600 mr-2" />
              <h4 className="font-semibold text-yellow-900">Near-Miss</h4>
            </div>
            <p className="text-3xl font-bold text-yellow-700">{workforce.near_miss_warehouse}</p>
            <p className="text-sm text-yellow-700 mt-1">segnalazioni (Magazzino)</p>
            <p className="text-xs text-yellow-600 mt-2">Cultura proattiva della sicurezza</p>
          </div>
        </div>
      </div>

      {/* Training & Development */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Formazione e Sviluppo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Ore Formazione 2024</h4>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Officina Meccanica</span>
                <span className="font-bold text-blue-600">{workforce.training_hours_mechanical} h/FTE</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Salute e Sicurezza</span>
                <span className="font-bold text-red-600">18.2 h/FTE</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Competenze Tecniche</span>
                <span className="font-bold text-green-600">32.5 h/FTE</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Programmi Attivi</h4>
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <Award className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Upskilling Digitale</p>
                <p className="text-xs text-gray-600">Formazione su MES e sistemi Industry 4.0</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Certificazioni Sicurezza</p>
                <p className="text-xs text-gray-600">100% lavoratori certificati per area di competenza</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-purple-50 rounded-lg">
              <Users className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Leadership Development</p>
                <p className="text-xs text-gray-600">Programma per capi reparto e team leader</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SebinoWorkforce;
