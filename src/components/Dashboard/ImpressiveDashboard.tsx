import React, { useState, useEffect } from 'react';
import {
  Activity, Database, Brain, Zap, TrendingUp, Users, Package,
  FileText, Settings, Bell, Search, Menu, ChevronRight,
  BarChart3, PieChart, Globe, Shield, Server, CheckCircle,
  AlertTriangle, Clock, Euro, Layers, Cpu, Cloud
} from 'lucide-react';

const ImpressiveDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    efficiency: 92.5,
    documents: 1847,
    cycleTime: 3.2,
    quality: 98.7,
    connections: 24,
    throughput: 1250
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        efficiency: Math.min(100, prev.efficiency + (Math.random() - 0.5) * 2),
        documents: prev.documents + Math.floor(Math.random() * 10),
        cycleTime: Math.max(1, prev.cycleTime + (Math.random() - 0.5) * 0.5),
        quality: Math.min(100, prev.quality + (Math.random() - 0.5)),
        connections: prev.connections,
        throughput: prev.throughput + Math.floor((Math.random() - 0.5) * 100)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      icon: TrendingUp,
      label: 'Efficienza Operativa',
      value: `${realTimeData.efficiency.toFixed(1)}%`,
      change: '+5.2%',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: FileText,
      label: 'Documenti Processati',
      value: realTimeData.documents.toLocaleString('it-IT'),
      change: '+12.3%',
      color: 'from-blue-400 to-indigo-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Clock,
      label: 'Tempo Ciclo Medio',
      value: `${realTimeData.cycleTime.toFixed(1)}h`,
      change: '-15.7%',
      color: 'from-purple-400 to-pink-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Shield,
      label: 'Qualità Prodotto',
      value: `${realTimeData.quality.toFixed(1)}%`,
      change: '+2.1%',
      color: 'from-yellow-400 to-orange-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const processes = [
    { name: 'Ordine #ORD-2024-001', status: 'in_corso', progress: 75 },
    { name: 'Configurazione Pompa PC-500', status: 'in_corso', progress: 45 },
    { name: 'Analisi Qualità Lotto L-789', status: 'completato', progress: 100 },
    { name: 'Fatturazione Cliente Alfa', status: 'in_attesa', progress: 0 },
    { name: 'Manutenzione Predittiva', status: 'in_corso', progress: 60 }
  ];

  const modules = [
    {
      icon: Database,
      name: 'Data Fabric',
      description: 'Unificazione dati in tempo reale',
      status: 'Operativo',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Brain,
      name: 'AI Engine',
      description: 'Elaborazione intelligente',
      status: 'Attivo',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Zap,
      name: 'Automazione',
      description: 'Processi ottimizzati',
      status: 'Online',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      name: 'Security',
      description: 'Protezione avanzata',
      status: 'Protetto',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Neosperience Enterprise Cloud</h1>
                <p className="text-sm text-blue-200">Piattaforma AI per la Trasformazione Digitale</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-xl border border-green-500/30">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-300 font-medium">Sistema Operativo</span>
              </div>

              <div className="flex items-center space-x-3">
                <button className="relative p-2 text-gray-300 hover:text-white transition">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="relative p-2 text-gray-300 hover:text-white transition">
                  <Search className="h-5 w-5" />
                </button>
                <button className="relative p-2 text-gray-300 hover:text-white transition">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    <span className={`text-sm font-semibold ${
                      metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.change}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-white">{metric.value}</p>

                  <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${metric.color} animate-pulse`}
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Modules Status */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Cpu className="mr-3 h-6 w-6 text-blue-400" />
                Moduli AI Intelligenti
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${module.color}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{module.name}</h3>
                            <p className="text-xs text-gray-400">{module.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-green-400 font-medium flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {module.status}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-white transition" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Real-time Graph */}
              <div className="mt-6 p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-300">Performance in Tempo Reale</h3>
                  <span className="text-xs text-blue-400">Ultimo aggiornamento: ora</span>
                </div>
                <div className="h-32 flex items-end space-x-2">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t opacity-70"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animation: `pulse ${2 + Math.random() * 2}s infinite`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Processes Monitor */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Activity className="mr-3 h-6 w-6 text-green-400" />
              Processi Attivi
            </h2>

            <div className="space-y-3">
              {processes.map((process, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">{process.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      process.status === 'completato' ? 'bg-green-500/20 text-green-300' :
                      process.status === 'in_corso' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {process.status === 'completato' ? 'Completato' :
                       process.status === 'in_corso' ? 'In Corso' : 'In Attesa'}
                    </span>
                  </div>
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

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Throughput Sistema</p>
                  <p className="text-2xl font-bold text-white">{realTimeData.throughput}/s</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Connessioni</p>
                  <p className="text-2xl font-bold text-white">{realTimeData.connections}/24</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
            <Cloud className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">856 GB</p>
            <p className="text-sm text-gray-300 mt-2">Volume Dati Gestiti</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
            <BarChart3 className="h-10 w-10 text-pink-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">€2.3M</p>
            <p className="text-sm text-gray-300 mt-2">Valore Generato</p>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
            <Users className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">156</p>
            <p className="text-sm text-gray-300 mt-2">Clienti Attivi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressiveDashboard;