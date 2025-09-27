import React, { useState, useEffect } from 'react';
import {
  Zap, Cloud, Droplets, Trash2, Leaf, Battery, Factory, TrendingDown,
  BarChart3, PieChart, Activity, AlertTriangle, Target, Globe, Recycle, Waves
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart,
  Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  currentESGMetrics, generateEnergyConsumptionData, generateEmissionsData,
  generateWaterMetrics, generateWasteMetrics, materialFlows, sustainabilityTargets
} from '../../data/esgData';

const ESGDashboard: React.FC = () => {
  const [energyData, setEnergyData] = useState(generateEnergyConsumptionData(24));
  const [emissionsData, setEmissionsData] = useState(generateEmissionsData(30));
  const [waterData, setWaterData] = useState(generateWaterMetrics(30));
  const [wasteData, setWasteData] = useState(generateWasteMetrics(30));
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d' | '1y'>('30d');

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(generateEnergyConsumptionData(24));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const energyChartData = energyData.map(d => ({
    time: d.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit' }),
    rinnovabile: d.renewable,
    nonRinnovabile: d.nonRenewable,
    totale: d.total
  }));

  const emissionsChartData = emissionsData.map(d => ({
    giorno: d.timestamp.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
    scope1: d.scope1,
    scope2: d.scope2,
    scope3: d.scope3
  }));

  const wasteComposition = [
    { name: 'Carta', value: 25, color: '#10b981' },
    { name: 'Plastica', value: 20, color: '#3b82f6' },
    { name: 'Metalli', value: 15, color: '#8b5cf6' },
    { name: 'Organico', value: 25, color: '#f59e0b' },
    { name: 'Elettronico', value: 10, color: '#ef4444' },
    { name: 'Pericoloso', value: 5, color: '#dc2626' }
  ];

  const materialComposition = materialFlows.reduce((acc, flow) => {
    const type = flow.type === 'renewable' ? 'Rinnovabili' : 'Non Rinnovabili';
    const existing = acc.find(item => item.name === type);
    if (existing) {
      existing.value += flow.quantity;
    } else {
      acc.push({
        name: type,
        value: flow.quantity,
        color: flow.type === 'renewable' ? '#10b981' : '#ef4444'
      });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'energia': return Zap;
      case 'emissioni': return Cloud;
      case 'acqua': return Droplets;
      case 'rifiuti': return Trash2;
      case 'materiali': return Leaf;
      default: return Activity;
    }
  };

  const getMetricColor = (trend: 'up' | 'down' | 'stable', isPositive: boolean) => {
    if (trend === 'stable') return 'text-gray-400';
    if (trend === 'up') return isPositive ? 'text-green-400' : 'text-red-400';
    return isPositive ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard ESG & Sostenibilità</h1>
            <p className="text-gray-400">Monitoraggio real-time degli indicatori ambientali e di sostenibilità</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-lg">
              <Globe className="h-5 w-5 text-green-400" />
              <span className="text-white font-semibold">Carbon Neutral Target: 2030</span>
            </div>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value as any)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            >
              <option value="24h">Ultime 24 ore</option>
              <option value="7d">Ultimi 7 giorni</option>
              <option value="30d">Ultimi 30 giorni</option>
              <option value="1y">Ultimo anno</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {currentESGMetrics.slice(0, 8).map((metric) => {
          const Icon = getMetricIcon(metric.category);
          const isPositive = metric.category === 'emissioni' ||
                           metric.label.includes('Consumo') ||
                           metric.label.includes('Pericolosi') ?
                           metric.change < 0 : metric.change > 0;

          return (
            <div key={metric.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className={`text-sm font-semibold ${getMetricColor(metric.trend, isPositive)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-white">
                {typeof metric.value === 'number' ? metric.value.toLocaleString('it-IT') : metric.value}
                <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>
              </p>
              {metric.target && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Target</span>
                    <span>{metric.target} {metric.unit}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-600 h-1.5 rounded-full"
                      style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Energy Consumption Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Battery className="h-5 w-5 mr-2 text-yellow-400" />
              Consumo Energetico (MWh)
            </h3>
            <span className="text-xs text-gray-400">Ultime 24 ore</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={energyChartData}>
              <defs>
                <linearGradient id="colorRinnovabile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorNonRinnovabile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Area type="monotone" dataKey="rinnovabile" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#colorRinnovabile)" />
              <Area type="monotone" dataKey="nonRinnovabile" stackId="1" stroke="#ef4444" fillOpacity={1} fill="url(#colorNonRinnovabile)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Emissions by Scope */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Cloud className="h-5 w-5 mr-2 text-blue-400" />
              Emissioni per Scope (ton CO₂e)
            </h3>
            <span className="text-xs text-gray-400">Ultimi 30 giorni</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={emissionsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="giorno" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="scope1" stackId="a" fill="#ef4444" name="Scope 1 (Dirette)" />
              <Bar dataKey="scope2" stackId="a" fill="#f59e0b" name="Scope 2 (Energia)" />
              <Bar dataKey="scope3" stackId="a" fill="#3b82f6" name="Scope 3 (Catena)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Waste Composition */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Trash2 className="h-5 w-5 mr-2 text-purple-400" />
            Composizione Rifiuti
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={wasteComposition}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {wasteComposition.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {wasteComposition.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-400">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Material Flow */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-green-400" />
            Flusso Materiali
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={materialComposition}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {materialComposition.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {materialComposition.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-400">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-white">{item.value} ton</span>
              </div>
            ))}
          </div>
        </div>

        {/* Water Management */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Droplets className="h-5 w-5 mr-2 text-cyan-400" />
            Gestione Idrica
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Consumo Totale</span>
                <span className="text-white font-semibold">3,450 m³</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-600 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Acqua Riciclata</span>
                <span className="text-white font-semibold">2,252 m³</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-emerald-600 h-2 rounded-full" style={{ width: '65.3%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Scarichi Trattati</span>
                <span className="text-white font-semibold">1,198 m³</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-indigo-600 h-2 rounded-full" style={{ width: '34.7%' }} />
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Efficienza Idrica</span>
                <div className="flex items-center">
                  <TrendingDown className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-lg font-bold text-green-400">65.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Goals Progress */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Target className="h-6 w-6 mr-2 text-green-400" />
            Obiettivi di Sostenibilità 2030
          </h3>
          <span className="text-sm text-gray-400">Progressi rispetto ai target</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(sustainabilityTargets[2030]).map(([key, target]) => {
            const current = currentESGMetrics.find(m =>
              m.id.includes(key.toLowerCase()) ||
              (key === 'renewableEnergy' && m.id === 'renewable-energy-ratio') ||
              (key === 'wasteRecycling' && m.id === 'waste-recycling-rate')
            );
            const progress = current ? (current.value / target) * 100 : 0;

            return (
              <div key={key} className="text-center">
                <div className="relative inline-flex items-center justify-center mb-2">
                  <svg className="w-20 h-20">
                    <circle
                      className="text-gray-700"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="40"
                      cy="40"
                    />
                    <circle
                      className="text-green-400"
                      strokeWidth="4"
                      strokeDasharray={`${progress * 1.88} 188`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="40"
                      cy="40"
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <span className="absolute text-lg font-bold text-white">
                    {Math.round(progress)}%
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-xs text-gray-500">
                  Target: {target}{key.includes('Energy') || key.includes('Recycling') || key.includes('Materials') ? '%' : ''}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ESGDashboard;