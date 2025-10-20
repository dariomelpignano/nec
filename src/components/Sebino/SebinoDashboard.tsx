import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Cloud,
  Droplet,
  RefreshCw,
  Users,
  Shield,
  Factory,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Activity,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Import Sebino specific modules
import SebinoESGMonitor from './modules/SebinoESGMonitor';
import SebinoClimate from './modules/SebinoClimate';
import SebinoWater from './modules/SebinoWater';
import SebinoCircular from './modules/SebinoCircular';
import SebinoWorkforce from './modules/SebinoWorkforce';

import { sebinoESGKPIs, esrsCoverage, esgAlerts, sebinoSites, climateTimeSeriesData } from '../../data/sebino/sebinoMockData';

const SebinoDashboard: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('overview');
  const [selectedModule, setSelectedModule] = useState<string>('monitor');
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());

  // Simulated real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingCards(new Set([`card-${Math.floor(Math.random() * 6)}`]));
      setTimeout(() => setAnimatingCards(new Set()), 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // KPI Data for Sebino ESG
  const kpiData = [
    {
      id: 'climate',
      label: 'Target Clima 2030',
      value: `-${sebinoESGKPIs.climate.scope1_2_reduction_target}%`,
      subValue: 'Scope 1-2 vs 2020',
      change: 8.5,
      icon: Cloud,
      color: 'blue',
      description: 'Riduzione emissioni GHG'
    },
    {
      id: 'water',
      label: 'Ricircolo Acqua',
      value: `${sebinoESGKPIs.water.recycling_rate}%`,
      subValue: 'Assemblaggio/Collaudo',
      change: 5.2,
      icon: Droplet,
      color: 'cyan',
      description: 'Efficienza idrica'
    },
    {
      id: 'circular',
      label: 'Recupero Rifiuti',
      value: `${sebinoESGKPIs.circular.non_hazardous_waste_recovery}%`,
      subValue: 'Non pericolosi',
      change: 3.1,
      icon: RefreshCw,
      color: 'green',
      description: 'Economia circolare'
    },
    {
      id: 'safety',
      label: 'TRIR Medio',
      value: '1.83',
      subValue: '4 siti produttivi',
      change: -12,
      icon: Shield,
      color: 'red',
      description: 'Sicurezza sul lavoro'
    },
    {
      id: 'coverage',
      label: 'Copertura ESRS',
      value: '100%',
      subValue: '70 indicatori',
      change: 0,
      icon: CheckCircle,
      color: 'purple',
      description: 'Compliance completa'
    },
    {
      id: 'energy',
      label: 'Intensità Energetica',
      value: `${sebinoESGKPIs.climate.energy_intensity_mechanical}`,
      subValue: 'kWh/pezzo',
      change: -6.8,
      icon: Factory,
      color: 'orange',
      description: 'Efficienza produttiva'
    }
  ];

  // ESRS Categories
  const esrsCategories = [
    { id: 'e1', label: 'E1 - Clima', icon: Cloud, color: 'blue', count: 9 },
    { id: 'e2', label: 'E2 - Inquinamento', icon: AlertCircle, color: 'yellow', count: 8 },
    { id: 'e3', label: 'E3 - Acqua', icon: Droplet, color: 'cyan', count: 8 },
    { id: 'e5', label: 'E5 - Circolare', icon: RefreshCw, color: 'green', count: 8 },
    { id: 's1', label: 'S1 - Forza Lavoro', icon: Users, color: 'indigo', count: 12 },
    { id: 'g1', label: 'G1 - Governance', icon: Shield, color: 'purple', count: 7 }
  ];

  // Performance by standard
  const standardPerformance = esrsCoverage.slice(0, 5).map(std => ({
    name: std.standard.replace('ESRS ', ''),
    score: std.coverage,
    indicators: std.indicators
  }));

  // Alerts summary
  const alertsSummary = [
    { severity: 'high', count: esgAlerts.filter(a => a.severity === 'high' && a.status === 'open').length },
    { severity: 'medium', count: esgAlerts.filter(a => a.severity === 'medium' && a.status === 'open').length },
    { severity: 'low', count: esgAlerts.filter(a => a.severity === 'low' && a.status === 'open').length }
  ];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'text-blue-600 bg-blue-100',
      cyan: 'text-cyan-600 bg-cyan-100',
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      indigo: 'text-indigo-600 bg-indigo-100'
    };
    return colors[color] || 'text-gray-600 bg-gray-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Sebino Valvole - ESG Platform - Powered by Neosperience</h1>
                  <p className="text-sm text-gray-600">ESRS Compliance & Sustainability Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                100% ESRS Coverage
              </div>
              <div className="text-sm text-gray-500">
                4 siti operativi
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navigazione
              </h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setSelectedArea('overview')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition ${
                    selectedArea === 'overview'
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Dashboard ESG
                </button>
                <button
                  onClick={() => setSelectedArea('modules')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition ${
                    selectedArea === 'modules'
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Activity className="h-4 w-4 mr-3" />
                  Moduli ESRS
                </button>
              </nav>
            </div>

            <div className="mb-6 border-t pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Standard ESRS
              </h3>
              <nav className="space-y-1">
                {esrsCategories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedArea('modules');
                        if (category.id === 'e1') setSelectedModule('climate');
                        else if (category.id === 'e3') setSelectedModule('water');
                        else if (category.id === 'e5') setSelectedModule('circular');
                        else if (category.id === 's1') setSelectedModule('workforce');
                        else setSelectedModule('monitor');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-gray-600 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-3" />
                        <span className="text-sm">{category.label}</span>
                      </div>
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{category.count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* ESG Status */}
            <div className="border-t pt-4">
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Shield className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-xs font-semibold text-gray-700">ESG Status</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Indicatori</span>
                    <span className="font-medium text-green-600">70/70</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Quality</span>
                    <span className="font-medium text-blue-600">96.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alert Aperti</span>
                    <span className="font-medium text-red-600">{alertsSummary[0].count + alertsSummary[1].count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedArea === 'overview' && (
            <div className="space-y-6">
              {/* KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpiData.map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.id}
                      className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition ${
                        animatingCards.has(`card-${kpi.id}`) ? 'ring-2 ring-green-400 ring-opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${getColorClass(kpi.color)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        {kpi.change !== 0 && (
                          <div className={`flex items-center text-sm font-medium ${
                            kpi.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {kpi.change > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            {Math.abs(kpi.change)}%
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.label}</h3>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      {kpi.subValue && (
                        <p className="text-sm text-gray-500 mt-1">{kpi.subValue}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">{kpi.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Emissions Trend */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Trend Emissioni GHG</h3>
                    <span className="text-sm text-gray-500">2024</span>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={climateTimeSeriesData}>
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
                      <Line
                        type="monotone"
                        dataKey="scope1_2"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Scope 1-2"
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target_s1_2"
                        stroke="#ef4444"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        name="Target"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* ESRS Coverage */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Copertura ESRS</h3>
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={standardPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="score" fill="#10b981" name="Coverage %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sites and Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sites */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Siti Operativi</h3>
                    <Factory className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="space-y-3">
                    {sebinoSites.map(site => (
                      <div key={site.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{site.name}</p>
                            <p className="text-xs text-gray-500">{site.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-blue-600">{site.employees}</p>
                            <p className="text-xs text-gray-500">dipendenti</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Area: {site.area_m2.toLocaleString()} m²</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Alerts */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Alert Attivi ESG</h3>
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="space-y-3">
                    {esgAlerts.filter(a => a.status !== 'closed').map(alert => (
                      <div key={alert.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full mr-2 ${getSeverityColor(alert.severity)}`}>
                                {alert.severity === 'high' ? 'Alta' : alert.severity === 'medium' ? 'Media' : 'Bassa'}
                              </span>
                              <span className="text-xs text-gray-500">{alert.category}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{alert.location} • {alert.timestamp}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getAlertStatusColor(alert.status)}`}>
                            {alert.status === 'open' ? 'Aperto' : 'Acknowledged'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">70</p>
                  <p className="text-sm text-gray-600">Indicatori ESRS</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <Shield className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                  <p className="text-sm text-gray-600">Limited Assurance</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <Factory className="h-8 w-8 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">334</p>
                  <p className="text-sm text-gray-600">Dipendenti Totali</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                  <p className="text-sm text-gray-600">Fonti Dati Integrate</p>
                </div>
              </div>
            </div>
          )}

          {/* Modules View */}
          {selectedArea === 'modules' && (
            <div className="space-y-6">
              {/* Module Navigation */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-2 overflow-x-auto">
                  {[
                    { id: 'monitor', label: 'ESG Monitor', icon: Shield },
                    { id: 'climate', label: 'E1 - Clima', icon: Cloud },
                    { id: 'water', label: 'E3 - Acqua', icon: Droplet },
                    { id: 'circular', label: 'E5 - Circolare', icon: RefreshCw },
                    { id: 'workforce', label: 'S1 - Forza Lavoro', icon: Users }
                  ].map(module => {
                    const Icon = module.icon;
                    return (
                      <button
                        key={module.id}
                        onClick={() => setSelectedModule(module.id)}
                        className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
                          selectedModule === module.id
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {module.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Module Content */}
              {selectedModule === 'monitor' && <SebinoESGMonitor />}
              {selectedModule === 'climate' && <SebinoClimate />}
              {selectedModule === 'water' && <SebinoWater />}
              {selectedModule === 'circular' && <SebinoCircular />}
              {selectedModule === 'workforce' && <SebinoWorkforce />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SebinoDashboard;
