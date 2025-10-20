import React, { useState, useEffect } from 'react';
import { Cloud, Zap, TrendingDown, Target, Flame, Factory, Truck, Leaf } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { sebinoESGKPIs, climateTimeSeriesData, energyIntensityByProcess, greenInvestments } from '../../../data/sebino/sebinoMockData';

const SebinoClimate: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'emissions' | 'energy' | 'targets' | 'investments'>('emissions');
  const [realTimeData, setRealTimeData] = useState(climateTimeSeriesData);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = [...prev];
        const lastPoint = newData[newData.length - 1];
        newData.push({
          month: 'Now',
          scope1_2: lastPoint.scope1_2 + (Math.random() - 0.5) * 5,
          scope3: lastPoint.scope3 + (Math.random() - 0.5) * 20,
          target_s1_2: lastPoint.target_s1_2 - 1,
          target_s3: lastPoint.target_s3 - 2
        });
        return newData.slice(-9);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const climate = sebinoESGKPIs.climate;

  // Scope 3 breakdown
  const scope3Breakdown = [
    { category: 'Trasporti Inbound', value: climate.scope3_transport, percentage: 7.2 },
    { category: 'Materie Prime (Acciaio)', value: climate.scope3_materials, percentage: 85.1 },
    { category: 'Uso del Prodotto', value: climate.scope3_product_use, percentage: 7.1 },
    { category: 'Altri', value: 107, percentage: 0.6 }
  ];

  const totalScope3 = scope3Breakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Cloud className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">ESRS E1 - Cambiamento Climatico</h2>
            </div>
            <p className="text-blue-100">Monitoraggio emissioni GHG, energia e target climatici</p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm text-blue-100">Target Riduzione 2030</div>
              <div className="text-3xl font-bold">-{climate.scope1_2_reduction_target}%</div>
              <div className="text-xs text-blue-100">Scope 1-2 vs 2020</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setSelectedMetric('emissions')}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedMetric === 'emissions'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Cloud className="h-4 w-4 mr-2" />
            Emissioni GHG
          </button>
          <button
            onClick={() => setSelectedMetric('energy')}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedMetric === 'energy'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Zap className="h-4 w-4 mr-2" />
            Energia
          </button>
          <button
            onClick={() => setSelectedMetric('targets')}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedMetric === 'targets'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Target className="h-4 w-4 mr-2" />
            Target SBTi
          </button>
          <button
            onClick={() => setSelectedMetric('investments')}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedMetric === 'investments'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Leaf className="h-4 w-4 mr-2" />
            Investimenti Green
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Factory className="h-6 w-6 text-blue-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Scope 1-2 (tCO2e)</p>
          <p className="text-2xl font-bold text-gray-900">228</p>
          <p className="text-xs text-green-600 mt-1">-8.5% vs target</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Truck className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Scope 3 (tCO2e)</p>
          <p className="text-2xl font-bold text-gray-900">{totalScope3.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">85% da materie prime</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <TrendingDown className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Intensità Energetica</p>
          <p className="text-2xl font-bold text-gray-900">{climate.energy_intensity_mechanical}</p>
          <p className="text-xs text-gray-500 mt-1">kWh/pezzo (meccanica)</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Flame className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Gas Naturale</p>
          <p className="text-2xl font-bold text-gray-900">{climate.gas_consumption_painting}</p>
          <p className="text-xs text-gray-500 mt-1">MWh (verniciatura)</p>
        </div>
      </div>

      {/* Emissions View */}
      {selectedMetric === 'emissions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time Series Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Emissioni GHG</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={realTimeData}>
                  <defs>
                    <linearGradient id="colorScope12" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorScope3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="scope1_2"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorScope12)"
                    name="Scope 1-2 (tCO2e)"
                  />
                  <Area
                    type="monotone"
                    dataKey="scope3"
                    stroke="#a855f7"
                    fillOpacity={1}
                    fill="url(#colorScope3)"
                    name="Scope 3 (tCO2e)"
                  />
                  <Line
                    type="monotone"
                    dataKey="target_s1_2"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Target S1-2"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Scope 3 Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown Scope 3</h3>
              <div className="space-y-3">
                {scope3Breakdown.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{item.category}</p>
                      <p className="text-sm font-bold text-purple-600">{item.value.toLocaleString()} tCO2e</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">% del totale</span>
                      <span className="text-xs font-medium text-gray-700">{item.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">Totale Scope 3</p>
                  <p className="text-xl font-bold text-purple-700">{totalScope3.toLocaleString()} tCO2e</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Energy View */}
      {selectedMetric === 'energy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Intensità Energetica per Processo</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={energyIntensityByProcess}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="process" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} label={{ value: 'kWh/pezzo', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="intensity" fill="#f97316" name="Consumo Attuale" />
                <Bar dataKey="benchmark" fill="#94a3b8" name="Benchmark Settore" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gas Naturale Totale</p>
                  <p className="text-xl font-bold text-gray-900">1,577 MWh</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Verniciatura: 77% • Assemblaggio: 23%</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Energia Elettrica</p>
                  <p className="text-xl font-bold text-gray-900">12,450 MWh</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">82% da fonti rinnovabili (GO)</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Autoproduzione PV</p>
                  <p className="text-xl font-bold text-gray-900">385 MWh</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">3.1% del fabbisogno totale</p>
            </div>
          </div>
        </div>
      )}

      {/* Targets View */}
      {selectedMetric === 'targets' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Science Based Targets Initiative (SBTi)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scope 1-2 Target */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Target Scope 1-2</h4>
                    <p className="text-sm text-gray-500">Riduzione al 2030 vs 2020</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">-{climate.scope1_2_reduction_target}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full" style={{ width: '68%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progresso: 68%</span>
                  <span className="text-green-600 font-medium">On track</span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Baseline 2020: 362 tCO2e</p>
                  <p className="text-xs text-gray-600 mb-1">Target 2030: 229 tCO2e</p>
                  <p className="text-xs font-medium text-blue-700">Attuale 2024: 228 tCO2e</p>
                </div>
              </div>

              {/* Scope 3 Target */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Target Scope 3</h4>
                    <p className="text-sm text-gray-500">Riduzione al 2035 vs 2020</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-600">-{climate.scope3_reduction_target}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full" style={{ width: '42%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progresso: 42%</span>
                  <span className="text-yellow-600 font-medium">Needs attention</span>
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Baseline 2020: 25,480 tCO2e</p>
                  <p className="text-xs text-gray-600 mb-1">Target 2035: 20,002 tCO2e</p>
                  <p className="text-xs font-medium text-purple-700">Attuale 2024: {totalScope3.toLocaleString()} tCO2e</p>
                </div>
              </div>
            </div>
          </div>

          {/* Climate Risk Assessment */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Analysis 1.5-3°C</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Cloud className="h-5 w-5 text-amber-600 mr-2" />
                  <h4 className="font-semibold text-amber-900">Rischio Fisico</h4>
                </div>
                <p className="text-sm text-amber-800 mb-2">Impatto su verniciatura: <strong>Medio</strong></p>
                <p className="text-xs text-amber-700">Ondate di calore possono ridurre efficienza raffreddamento</p>
              </div>

              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">Rischio Transizione</h4>
                </div>
                <p className="text-sm text-blue-800 mb-2">Carbon pricing: <strong>€65/tCO2 al 2030</strong></p>
                <p className="text-xs text-blue-700">Impatto stimato: €14.8K/anno aggiuntivi</p>
              </div>

              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-900">Opportunità</h4>
                </div>
                <p className="text-sm text-green-800 mb-2">Prodotti low-carbon: <strong>+€1.2M</strong></p>
                <p className="text-xs text-green-700">Nuova domanda valvole a basso impatto ambientale</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investments View */}
      {selectedMetric === 'investments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investimenti Green (CapEx/OpEx)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={greenInvestments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `€${(value / 1000).toFixed(0)}K`}
                />
                <Legend />
                <Bar dataKey="capex" fill="#10b981" name="CapEx Green" />
                <Bar dataKey="opex" fill="#6366f1" name="OpEx Green" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CapEx Green 2024</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-600">Fotovoltaico (450 kWp)</span>
                  <span className="font-medium">€680K</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-600">Efficientamento illuminazione LED</span>
                  <span className="font-medium">€320K</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-600">Pompe di calore industriali</span>
                  <span className="font-medium">€550K</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-600">Recupero calore di processo</span>
                  <span className="font-medium">€350K</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-gray-900">Totale CapEx Green</span>
                  <span className="text-xl font-bold text-green-600">€1.900K</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">OpEx Green 2024</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-600">Garanzie di Origine (GO)</span>
                  <span className="font-medium">€520K</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-600">Manutenzione impianti green</span>
                  <span className="font-medium">€280K</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-600">Consulenza energetica</span>
                  <span className="font-medium">€180K</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm text-gray-600">Certificazioni e audit</span>
                  <span className="font-medium">€170K</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-gray-900">Totale OpEx Green</span>
                  <span className="text-xl font-bold text-indigo-600">€1.150K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SebinoClimate;
