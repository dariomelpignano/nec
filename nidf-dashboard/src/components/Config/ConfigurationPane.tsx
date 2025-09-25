import React, { useState } from 'react';
import {
  Settings, Server, Database, Cloud, Shield, Check, X,
  Globe, Link, Cpu, HardDrive, Activity, Lock,
  AlertTriangle, CheckCircle, Info, Zap, Package, Users
} from 'lucide-react';

interface MCPServer {
  id: string;
  name: string;
  type: string;
  icon: any;
  status: 'connected' | 'disconnected' | 'connecting';
  endpoint: string;
  description: string;
  lastSync?: Date;
}

interface ConfigurationPaneProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfigurationPane: React.FC<ConfigurationPaneProps> = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('servers');

  const [mcpServers, setMcpServers] = useState<MCPServer[]>([
    {
      id: '1',
      name: 'SAP ERP Central',
      type: 'ERP',
      icon: Database,
      status: 'connected',
      endpoint: 'mcp://erp.company.internal:8443',
      description: 'Sistema ERP principale - Finanza, Contabilità, Ordini',
      lastSync: new Date()
    },
    {
      id: '2',
      name: 'Oracle SCM Suite',
      type: 'SCM',
      icon: Package,
      status: 'connected',
      endpoint: 'mcp://scm.company.internal:8444',
      description: 'Supply Chain Management - Inventario, Logistica',
      lastSync: new Date()
    },
    {
      id: '3',
      name: 'Salesforce CRM',
      type: 'CRM',
      icon: Users,
      status: 'connected',
      endpoint: 'mcp://crm.salesforce.com:443',
      description: 'Customer Relationship Management',
      lastSync: new Date()
    },
    {
      id: '4',
      name: 'MES Siemens',
      type: 'MES',
      icon: Cpu,
      status: 'disconnected',
      endpoint: 'mcp://mes.factory.local:9001',
      description: 'Manufacturing Execution System',
    },
    {
      id: '5',
      name: 'Azure IoT Hub',
      type: 'IoT',
      icon: Cloud,
      status: 'connected',
      endpoint: 'mcp://iot.azure.com:8883',
      description: 'Sensori e telemetria macchine',
      lastSync: new Date()
    },
    {
      id: '6',
      name: 'QMS Quality System',
      type: 'QMS',
      icon: Shield,
      status: 'connecting',
      endpoint: 'mcp://qms.company.internal:7443',
      description: 'Sistema Gestione Qualità',
    },
    {
      id: '7',
      name: 'PLM Windchill',
      type: 'PLM',
      icon: HardDrive,
      status: 'connected',
      endpoint: 'mcp://plm.ptc.com:8080',
      description: 'Product Lifecycle Management',
      lastSync: new Date()
    },
    {
      id: '8',
      name: 'BI Tableau Server',
      type: 'Analytics',
      icon: Activity,
      status: 'connected',
      endpoint: 'mcp://bi.tableau.local:8850',
      description: 'Business Intelligence e Reporting',
      lastSync: new Date()
    }
  ]);

  const handleToggleConnection = (serverId: string) => {
    setMcpServers(prev => prev.map(server => {
      if (server.id === serverId) {
        if (server.status === 'connected') {
          return { ...server, status: 'disconnected', lastSync: undefined };
        } else if (server.status === 'disconnected') {
          return { ...server, status: 'connecting' };
        } else {
          return { ...server, status: 'connected', lastSync: new Date() };
        }
      }
      return server;
    }));

    // Simulate connection process
    if (mcpServers.find(s => s.id === serverId)?.status === 'disconnected') {
      setTimeout(() => {
        setMcpServers(prev => prev.map(server => {
          if (server.id === serverId && server.status === 'connecting') {
            return { ...server, status: 'connected', lastSync: new Date() };
          }
          return server;
        }));
      }, 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-400 bg-green-500/20';
      case 'disconnected':
        return 'text-red-400 bg-red-500/20';
      case 'connecting':
        return 'text-yellow-400 bg-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return CheckCircle;
      case 'disconnected':
        return X;
      case 'connecting':
        return Activity;
      default:
        return Info;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-[95%] sm:w-full max-w-4xl h-[90vh] sm:max-h-[80vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/20 shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Settings className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Configurazione Sistema</h2>
                <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Gestione connessioni MCP e integrazioni</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mt-4">
            {['servers', 'security', 'performance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTab === tab
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab === 'servers' ? 'MCP Servers' :
                 tab === 'security' ? 'Sicurezza' : 'Performance'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {selectedTab === 'servers' && (
            <div>
              <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-300 font-medium">Model Context Protocol (MCP)</p>
                    <p className="text-xs text-gray-400 mt-1">
                      I server MCP permettono l'integrazione sicura e standardizzata con i sistemi aziendali.
                      Ogni connessione utilizza protocolli crittografati e autenticazione multi-fattore.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {mcpServers.map((server) => {
                  const Icon = server.icon;
                  const StatusIcon = getStatusIcon(server.status);

                  return (
                    <div
                      key={server.id}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                            <Icon className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-sm font-semibold text-white">{server.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(server.status)}`}>
                                <StatusIcon className="h-3 w-3" />
                                <span>
                                  {server.status === 'connected' ? 'Connesso' :
                                   server.status === 'disconnected' ? 'Disconnesso' : 'Connessione...'}
                                </span>
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{server.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <code className="text-xs text-purple-400 bg-black/30 px-2 py-1 rounded">
                                {server.endpoint}
                              </code>
                              {server.lastSync && (
                                <span className="text-xs text-gray-500">
                                  Ultimo sync: {server.lastSync.toLocaleTimeString('it-IT')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggleConnection(server.id)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            server.status === 'connected'
                              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                              : server.status === 'connecting'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          }`}
                          disabled={server.status === 'connecting'}
                        >
                          {server.status === 'connected' ? 'Disconnetti' :
                           server.status === 'connecting' ? 'Connessione...' : 'Connetti'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-400">
                    {mcpServers.filter(s => s.status === 'connected').length}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Sistemi Connessi</p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-400">1.2TB</p>
                  <p className="text-xs text-gray-400 mt-1">Dati Sincronizzati</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-center">
                  <p className="text-2xl font-bold text-purple-400">99.9%</p>
                  <p className="text-xs text-gray-400 mt-1">Uptime Sistema</p>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'security' && (
            <div className="space-y-6">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Stato Sicurezza</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                    Protetto
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Crittografia End-to-End</span>
                    <span className="text-green-400 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> Attiva
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Autenticazione Multi-Fattore</span>
                    <span className="text-green-400 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> Abilitata
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Audit Log</span>
                    <span className="text-green-400 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> Registrazione Attiva
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-3">Certificati SSL/TLS</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                    <span className="text-xs text-gray-400">*.company.internal</span>
                    <span className="text-xs text-green-400">Valido fino: 31/12/2025</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                    <span className="text-xs text-gray-400">api.nec.cloud</span>
                    <span className="text-xs text-green-400">Valido fino: 15/06/2025</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">CPU Usage</span>
                    <span className="text-sm font-semibold text-white">42%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Memory</span>
                    <span className="text-sm font-semibold text-white">68%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-3">Metriche di Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Query al secondo</span>
                    <span className="text-white">1,250</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Latenza media</span>
                    <span className="text-white">45ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Throughput dati</span>
                    <span className="text-white">125 MB/s</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPane;