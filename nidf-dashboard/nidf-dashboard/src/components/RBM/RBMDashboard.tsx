import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  FileText,
  TrendingUp,
  Users,
  Package,
  AlertCircle,
  DollarSign,
  Clock,
  Shield,
  Activity,
  BarChart3,
  Layers,
  Settings,
  Search,
  ChevronRight,
  Briefcase,
  Cpu,
  FlaskConical,
  Factory,
  Banknote,
  Monitor
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const RBMDashboard: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('overview');
  const [animatingCards, setAnimatingCards] = useState<Set<string>>(new Set());

  // Simulated real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingCards(new Set([`card-${Math.floor(Math.random() * 6)}`]));
      setTimeout(() => setAnimatingCards(new Set()), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // KPI Data for RBM
  const kpiData = [
    {
      id: 'response-time',
      label: 'Customer Response Time',
      value: '3m 20s',
      change: -18,
      icon: Clock,
      color: 'blue',
      description: 'Tempo medio assistenza clienti'
    },
    {
      id: 'projects',
      label: 'Progetti Configurati',
      value: '327',
      subValue: '€4.8M pipeline',
      change: 12,
      icon: Package,
      color: 'purple',
      description: 'Configurazioni Declaro completate'
    },
    {
      id: 'documents',
      label: 'Documenti Processati',
      value: '2,450',
      subValue: '97.8% accuratezza',
      change: 15,
      icon: FileText,
      color: 'green',
      description: 'Documenti tecnici/mese'
    },
    {
      id: 'innovation',
      label: 'Innovazione R&D',
      value: '112',
      subValue: 'brevetti monitorati',
      change: 8,
      icon: FlaskConical,
      color: 'orange',
      description: 'Nuovi brevetti e normative'
    },
    {
      id: 'oee',
      label: 'Efficienza Produttiva',
      value: '84.6%',
      subValue: 'OEE Index',
      change: 3.2,
      icon: Factory,
      color: 'indigo',
      description: 'Overall Equipment Effectiveness'
    },
    {
      id: 'cashflow',
      label: 'Cash Flow Accuracy',
      value: '91%',
      subValue: '2 alert attivi',
      change: -2,
      icon: Banknote,
      color: 'pink',
      description: 'Accuratezza previsioni finanziarie'
    }
  ];

  // Department areas for RBM
  const departmentAreas = [
    { id: 'marketing', label: 'Marketing & Sales', icon: Briefcase, color: 'blue' },
    { id: 'rd', label: 'R&D', icon: FlaskConical, color: 'purple' },
    { id: 'production', label: 'Produzione', icon: Factory, color: 'green' },
    { id: 'finance', label: 'Finance', icon: Banknote, color: 'orange' },
    { id: 'ict', label: 'ICT', icon: Monitor, color: 'indigo' }
  ];

  // Production efficiency data
  const productionData = [
    { hour: '08:00', efficiency: 82, target: 85 },
    { hour: '09:00', efficiency: 85, target: 85 },
    { hour: '10:00', efficiency: 88, target: 85 },
    { hour: '11:00', efficiency: 84, target: 85 },
    { hour: '12:00', efficiency: 79, target: 85 },
    { hour: '13:00', efficiency: 81, target: 85 },
    { hour: '14:00', efficiency: 86, target: 85 },
    { hour: '15:00', efficiency: 87, target: 85 },
    { hour: '16:00', efficiency: 85, target: 85 }
  ];

  // Configuration pipeline data
  const pipelineData = [
    { stage: 'Bozze', value: 45, color: '#94a3b8' },
    { stage: 'In Revisione', value: 28, color: '#fbbf24' },
    { stage: 'Approvati', value: 32, color: '#10b981' },
    { stage: 'In Produzione', value: 18, color: '#3b82f6' }
  ];

  // Document processing stats
  const documentStats = [
    { type: 'Fatture', processed: 890, pending: 12 },
    { type: 'DDT', processed: 650, pending: 8 },
    { type: 'Planimetrie', processed: 420, pending: 15 },
    { type: 'Schede Tecniche', processed: 490, pending: 5 }
  ];

  // Active processes
  const activeProcesses = [
    {
      id: 1,
      name: 'Configurazione Impianto Radiante - Cliente Alfa',
      department: 'Sales',
      progress: 75,
      status: 'in_progress',
      eta: '2h 15m'
    },
    {
      id: 2,
      name: 'Analisi Brevettuale Nuova Valvola',
      department: 'R&D',
      progress: 45,
      status: 'in_progress',
      eta: '1 giorno'
    },
    {
      id: 3,
      name: 'Digital Twin Linea Produzione 3',
      department: 'Production',
      progress: 90,
      status: 'in_progress',
      eta: '30m'
    },
    {
      id: 4,
      name: 'Forecast Finanziario Q1 2025',
      department: 'Finance',
      progress: 60,
      status: 'in_progress',
      eta: '4h'
    }
  ];

  // Anomalies detected
  const anomalies = [
    {
      id: 1,
      system: 'Linea Assemblaggio 2',
      type: 'Vibrazione anomala',
      severity: 'high',
      detected: '15 min fa',
      impact: 'Riduzione efficienza -8%'
    },
    {
      id: 2,
      system: 'Magazzino Materie Prime',
      type: 'Scorte sotto soglia',
      severity: 'medium',
      detected: '1 ora fa',
      impact: 'Riordino necessario entro 48h'
    },
    {
      id: 3,
      system: 'CRM Dynamics',
      type: 'Sincronizzazione lenta',
      severity: 'low',
      detected: '3 ore fa',
      impact: 'Latenza +200ms'
    }
  ];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100',
      green: 'text-green-600 bg-green-100',
      orange: 'text-orange-600 bg-orange-100',
      indigo: 'text-indigo-600 bg-indigo-100',
      pink: 'text-pink-600 bg-pink-100'
    };
    return colors[color] || 'text-gray-600 bg-gray-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Cpu className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">RBM Intelligence Platform</h1>
                  <p className="text-sm text-gray-600">AI-Driven Business Optimization</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Tutti i sistemi operativi
              </div>
              <div className="text-sm text-gray-500">
                RBM-GPT v2.4
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
                Aree Aziendali
              </h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setSelectedArea('overview')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition ${
                    selectedArea === 'overview'
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Layers className="h-4 w-4 mr-3" />
                  Panoramica
                </button>
                {departmentAreas.map(area => {
                  const Icon = area.icon;
                  return (
                    <button
                      key={area.id}
                      onClick={() => setSelectedArea(area.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition ${
                        selectedArea === area.id
                          ? `bg-${area.color}-50 text-${area.color}-700 font-medium`
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {area.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* RBM-GPT Status */}
            <div className="border-t pt-4">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Brain className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="text-xs font-semibold text-gray-700">RBM-GPT Status</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Query/min</span>
                    <span className="font-medium text-purple-600">1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Knowledge Items</span>
                    <span className="font-medium text-blue-600">524K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy</span>
                    <span className="font-medium text-green-600">98.2%</span>
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
                        animatingCards.has(`card-${kpi.id}`) ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${getColorClass(kpi.color)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        {kpi.change && (
                          <div className={`flex items-center text-sm font-medium ${
                            kpi.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <TrendingUp className={`h-4 w-4 mr-1 ${kpi.change < 0 ? 'rotate-180' : ''}`} />
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
                {/* Production Efficiency Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Efficienza Produttiva</h3>
                    <span className="text-sm text-gray-500">Oggi</span>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} domain={[70, 95]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Efficienza"
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#ef4444"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        name="Target"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Media: 84.6%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Target: 85%</span>
                    </div>
                  </div>
                </div>

                {/* Configuration Pipeline */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pipeline Configurazioni</h3>
                    <Settings className="h-5 w-5 text-gray-400" />
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pipelineData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pipelineData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {pipelineData.map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-gray-600">{item.stage}:</span>
                        <span className="ml-auto font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Processes and Anomalies */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Processes */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Processi Attivi</h3>
                    <Activity className="h-5 w-5 text-blue-500 animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    {activeProcesses.map(process => (
                      <div key={process.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{process.name}</p>
                            <p className="text-xs text-gray-500">{process.department} • ETA: {process.eta}</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${process.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-gray-700">{process.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Anomalies Detected */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Anomalie Rilevate</h3>
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="space-y-3">
                    {anomalies.map(anomaly => (
                      <div key={anomaly.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{anomaly.system}</p>
                            <p className="text-xs text-gray-600">{anomaly.type}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(anomaly.severity)}`}>
                            {anomaly.severity === 'high' ? 'Alta' : anomaly.severity === 'medium' ? 'Media' : 'Bassa'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{anomaly.detected}</p>
                        <p className="text-xs text-gray-700 font-medium">{anomaly.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document Processing Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Elaborazione Documentale</h3>
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {documentStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600 mb-2">{stat.type}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.processed}</p>
                      <p className="text-xs text-gray-500 mt-1">Processati</p>
                      {stat.pending > 0 && (
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {stat.pending} in coda
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Department-specific views */}
          {selectedArea !== 'overview' && (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                {departmentAreas.find(d => d.id === selectedArea) && (
                  <>
                    {React.createElement(
                      departmentAreas.find(d => d.id === selectedArea)!.icon,
                      { className: "h-8 w-8 text-blue-600 mr-3" }
                    )}
                    <h2 className="text-2xl font-bold text-gray-900">
                      {departmentAreas.find(d => d.id === selectedArea)?.label} Dashboard
                    </h2>
                  </>
                )}
              </div>
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">Area specializzata {selectedArea.toUpperCase()}</p>
                <p className="text-sm">Moduli e analytics specifici per il dipartimento</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RBMDashboard;