import React, { useState, useEffect } from 'react';
import {
  Activity, Database, Brain, Zap, TrendingUp, Users, Package,
  FileText, Settings, Bell, Search, Menu, ChevronRight,
  BarChart3, PieChart, Globe, Shield, Server, CheckCircle,
  AlertTriangle, Clock, Euro, Layers, Cpu, Cloud, MessageSquare,
  ArrowUp, ArrowDown, Minus, X, Info, ChevronDown, User, LogOut
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AIAssistant from '../Chat/AIAssistant';
import ConfigurationPane from '../Config/ConfigurationPane';
import NotificationsPanel from '../Notifications/NotificationsPanel';

const UltimateDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showChat, setShowChat] = useState(true); // Always visible
  const [showConfig, setShowConfig] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [realTimeData, setRealTimeData] = useState({
    efficiency: 92.5,
    documents: 1847,
    cycleTime: 3.2,
    quality: 98.7,
    connections: 24,
    throughput: 1250,
    revenue: 127500
  });

  // Generate 12-hour performance data
  const generatePerformanceData = () => {
    const data = [];
    const now = new Date();
    const startHour = now.getHours() - 11; // Start from 11 hours ago

    for (let i = 0; i < 12; i++) {
      const hour = (startHour + i + 24) % 24; // Handle negative hours
      data.push({
        time: `${String(hour).padStart(2, '0')}:00`,
        efficienza: 88 + Math.random() * 8,
        qualità: 95 + Math.random() * 4,
        produzione: 80 + Math.random() * 12
      });
    }

    return data;
  };

  // Performance data for line chart (12-hour period)
  const [performanceData, setPerformanceData] = useState(generatePerformanceData());

  // Production by category for pie chart
  const productionData = [
    { name: 'Pompe Centrifughe', value: 3456, percentage: 28 },
    { name: 'Valvole Industriali', value: 2890, percentage: 23 },
    { name: 'Compressori', value: 2145, percentage: 17 },
    { name: 'Scambiatori', value: 1876, percentage: 15 },
    { name: 'Filtri Speciali', value: 2133, percentage: 17 }
  ];

  // Revenue trend for area chart
  const revenueTrend = [
    { mese: 'Gen', fatturato: 980000, target: 950000 },
    { mese: 'Feb', fatturato: 1120000, target: 1050000 },
    { mese: 'Mar', fatturato: 1350000, target: 1200000 },
    { mese: 'Apr', fatturato: 1480000, target: 1400000 },
    { mese: 'Mag', fatturato: 1520000, target: 1450000 },
    { mese: 'Giu', fatturato: 1680000, target: 1500000 },
    { mese: 'Lug', fatturato: 1450000, target: 1550000 },
    { mese: 'Ago', fatturato: 1380000, target: 1400000 },
    { mese: 'Set', fatturato: 1750000, target: 1600000 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        efficiency: Math.min(100, Math.max(85, prev.efficiency + (Math.random() - 0.5) * 2)),
        documents: prev.documents + Math.floor(Math.random() * 10),
        cycleTime: Math.max(1, prev.cycleTime + (Math.random() - 0.5) * 0.5),
        quality: Math.min(100, Math.max(95, prev.quality + (Math.random() - 0.5))),
        connections: prev.connections,
        throughput: Math.max(800, prev.throughput + Math.floor((Math.random() - 0.5) * 100)),
        revenue: prev.revenue + Math.floor(Math.random() * 5000)
      }));

      // Update performance data - add new data point every minute
      setPerformanceData(prev => {
        const newData = [...prev];
        const lastEntry = prev[prev.length - 1];
        const now = new Date();
        const currentMinutes = now.getMinutes();

        // Only update on the hour (when minutes = 0) for cleaner display
        if (currentMinutes % 10 === 0) {
          // Remove oldest data point and add new one to maintain 12-hour window
          newData.shift();
          newData.push({
            time: `${String(now.getHours()).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`,
            efficienza: Math.min(100, Math.max(85, lastEntry.efficienza + (Math.random() - 0.5) * 3)),
            qualità: Math.min(100, Math.max(94, lastEntry.qualità + (Math.random() - 0.5) * 2)),
            produzione: Math.min(100, Math.max(80, lastEntry.produzione + (Math.random() - 0.5) * 4))
          });
        } else {
          // Update the last entry with new values for smooth animation
          newData[newData.length - 1] = {
            ...lastEntry,
            efficienza: Math.min(100, Math.max(85, lastEntry.efficienza + (Math.random() - 0.5) * 1)),
            qualità: Math.min(100, Math.max(94, lastEntry.qualità + (Math.random() - 0.5) * 0.5)),
            produzione: Math.min(100, Math.max(80, lastEntry.produzione + (Math.random() - 0.5) * 2))
          };
        }
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      icon: TrendingUp,
      label: 'Efficienza Operativa',
      value: `${realTimeData.efficiency.toFixed(1)}%`,
      change: '+5.2%',
      trend: 'up',
      color: 'from-green-400 to-emerald-600',
      description: 'OEE complessivo linee produzione'
    },
    {
      icon: FileText,
      label: 'Documenti Processati',
      value: realTimeData.documents.toLocaleString('it-IT'),
      change: '+12.3%',
      trend: 'up',
      color: 'from-blue-400 to-indigo-600',
      description: 'Fatture, DDT, ordini elaborati oggi'
    },
    {
      icon: Clock,
      label: 'Tempo Ciclo Medio',
      value: `${realTimeData.cycleTime.toFixed(1)}h`,
      change: '-15.7%',
      trend: 'down',
      color: 'from-purple-400 to-pink-600',
      description: 'Lead time produzione ordini'
    },
    {
      icon: Shield,
      label: 'Qualità Prodotto',
      value: `${realTimeData.quality.toFixed(1)}%`,
      change: '+2.1%',
      trend: 'up',
      color: 'from-yellow-400 to-orange-600',
      description: 'First Pass Yield produzione'
    }
  ];

  const processes = [
    { name: 'Ordine #ORD-2024-001', cliente: 'Alfa Manufacturing', status: 'in_corso', progress: 75, valore: '€127,500' },
    { name: 'Configurazione Pompa PC-500', cliente: 'Beta Industries', status: 'in_corso', progress: 45, valore: '€89,300' },
    { name: 'Analisi Qualità Lotto L-789', cliente: 'Interno', status: 'completato', progress: 100, valore: 'N/A' },
    { name: 'Fatturazione Cliente Alfa', cliente: 'Alfa Manufacturing', status: 'in_attesa', progress: 0, valore: '€45,200' },
    { name: 'Manutenzione Predittiva', cliente: 'Interno', status: 'in_corso', progress: 60, valore: 'N/A' }
  ];

  const modules = [
    {
      icon: Database,
      name: 'Data Fabric',
      description: 'Unificazione dati in tempo reale',
      status: 'Operativo',
      metrics: '24 connessioni attive',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Brain,
      name: 'AI Engine',
      description: 'Elaborazione intelligente',
      status: 'Attivo',
      metrics: '1,250 query/sec',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Zap,
      name: 'Automazione',
      description: 'Processi ottimizzati',
      status: 'Online',
      metrics: '847 task completati',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      name: 'Security',
      description: 'Protezione avanzata',
      status: 'Protetto',
      metrics: '0 minacce rilevate',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 relative z-50">
        <div className="px-4 sm:px-6 py-4 lg:mr-96"> {/* Responsive padding and margin */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition bg-black/20 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Layers className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-2xl font-bold text-white">Neosperience Enterprise Cloud</h1>
                <p className="text-xs sm:text-sm text-blue-200 hidden md:block">Piattaforma AI per la Trasformazione Digitale delle PMI</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-bold text-white">NEC</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-xl border border-green-500/30">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-300 font-medium">Sistema Operativo</span>
              </div>

              {/* Mobile chat toggle */}
              <button
                onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition bg-black/20 rounded-lg"
              >
                <MessageSquare className="h-5 w-5" />
              </button>

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-300 hover:text-white transition bg-black/20 rounded-lg"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <button
                onClick={() => setShowConfig(true)}
                className="hidden sm:block relative p-2 text-gray-300 hover:text-white transition bg-black/20 rounded-lg"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 transition-all lg:mr-96">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 hover:scale-105 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity"
                       style={{ background: `linear-gradient(135deg, ${metric.color.split(' ')[1]}, ${metric.color.split(' ')[3]})` }}></div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1">
                        {metric.trend === 'up' ? (
                          <ArrowUp className="h-4 w-4 text-green-400" />
                        ) : metric.trend === 'down' ? (
                          <ArrowDown className="h-4 w-4 text-green-400" />
                        ) : (
                          <Minus className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={`text-sm font-semibold ${
                          metric.change.startsWith('+') ? 'text-green-400' :
                          metric.change.startsWith('-') && metric.label.includes('Tempo') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-1">{metric.label}</p>
                    <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
                    <p className="text-xs text-gray-400">{metric.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Performance Chart */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 sm:p-6">
              <h2 className="text-base sm:text-xl font-bold text-white mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="flex items-center">
                  <BarChart3 className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 text-blue-400" />
                  <span className="text-sm sm:text-base">Performance KPI</span>
                </span>
                <span className="text-xs text-gray-400">Aggiornamento: 3 sec</span>
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} domain={[80, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#e5e7eb' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="efficienza" stroke="#10b981" strokeWidth={2} dot={false} name="Efficienza OEE" />
                  <Line type="monotone" dataKey="qualità" stroke="#3b82f6" strokeWidth={2} dot={false} name="Qualità FPY" />
                  <Line type="monotone" dataKey="produzione" stroke="#f59e0b" strokeWidth={2} dot={false} name="Output Produttivo" />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Monitoraggio continuo degli indicatori chiave di performance produttiva
              </p>
            </div>

            {/* Production Distribution */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <PieChart className="mr-3 h-6 w-6 text-purple-400" />
                Mix Produzione
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <RePieChart>
                  <Pie
                    data={productionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {productionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                      <span className="text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Trend and Modules */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend Chart */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="mr-3 h-6 w-6 text-green-400" />
                Andamento Fatturato vs Target
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="colorFatturato" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="mese" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `€${(value/1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value: any) => `€${(value/1000).toFixed(0)}K`}
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#e5e7eb' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="fatturato" stroke="#10b981" fillOpacity={1} fill="url(#colorFatturato)" name="Fatturato Effettivo" />
                  <Area type="monotone" dataKey="target" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTarget)" name="Target Mensile" />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Performance commerciale: superato il target in 7 mesi su 9 (+12% YTD)
              </p>
            </div>

            {/* Processes Monitor */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Activity className="mr-3 h-6 w-6 text-green-400" />
                Processi Attivi
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {processes.map((process, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-white truncate">{process.name}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        process.status === 'completato' ? 'bg-green-500/20 text-green-300' :
                        process.status === 'in_corso' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {process.status === 'completato' ? 'Completato' :
                         process.status === 'in_corso' ? 'In Corso' : 'In Attesa'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{process.cliente} • {process.valore}</p>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          process.progress === 100 ? 'bg-green-500' :
                          process.progress > 50 ? 'bg-blue-500' :
                          process.progress > 0 ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${process.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <Package className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-white">12,450</p>
              <p className="text-sm text-gray-300 mt-2">Pezzi Prodotti Oggi</p>
              <p className="text-xs text-gray-400 mt-1">+8.2% rispetto a ieri</p>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <Euro className="h-10 w-10 text-pink-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-white">€{realTimeData.revenue.toLocaleString('it-IT')}</p>
              <p className="text-sm text-gray-300 mt-2">Fatturato Oggi</p>
              <p className="text-xs text-gray-400 mt-1">+18% vs ieri</p>
            </div>

            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <Users className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-white">156</p>
              <p className="text-sm text-gray-300 mt-2">Clienti Attivi</p>
              <p className="text-xs text-gray-400 mt-1">12 nuovi questo mese</p>
            </div>
          </div>
        </div>

        {/* User Profile Section - Desktop Only */}
        <div className="hidden lg:block fixed right-0 top-0 w-96 h-20 bg-black/60 backdrop-blur-xl border-l border-b border-white/10 z-50">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Marco Bianchi</p>
                <p className="text-xs text-gray-400">Direttore Operativo</p>
              </div>
            </div>
            <button
              onClick={() => alert('Logout simulato')}
              className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all group"
            >
              <LogOut className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Esci</span>
            </button>
          </div>
        </div>

        {/* Chat Sidebar - Desktop Always Visible */}
        <div className="hidden lg:block fixed right-0 top-20 h-[calc(100vh-5rem)] w-96 bg-black/40 backdrop-blur-xl border-l border-white/10">
          <AIAssistant />
        </div>

        {/* Mobile Chat Overlay */}
        {isMobileChatOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-l border-white/10">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
                <button
                  onClick={() => setIsMobileChatOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="h-[calc(100%-4rem)]">
                <AIAssistant />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Configuration Pane */}
      <ConfigurationPane isOpen={showConfig} onClose={() => setShowConfig(false)} />

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </div>
  );
};

export default UltimateDashboard;