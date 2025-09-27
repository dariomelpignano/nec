import React, { useState } from 'react';
import {
  Server, Database, Cloud, Globe, Shield, Zap,
  CheckCircle, AlertCircle, Settings, Plus, Link,
  Activity, GitBranch, Key, Terminal, Cpu, HardDrive
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: 'MCP' | 'API' | 'Database' | 'Cloud';
  status: 'connected' | 'disconnected' | 'error';
  icon: any;
  description: string;
  endpoint?: string;
  lastSync?: Date;
  metrics?: {
    requests?: number;
    latency?: number;
    uptime?: number;
  };
}

const IntegrationsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'available'>('active');
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const activeIntegrations: Integration[] = [
    {
      id: 'mcp-erp',
      name: 'SAP ERP Server',
      type: 'MCP',
      status: 'connected',
      icon: Server,
      description: 'Sistema ERP principale per gestione ordini e fatturazione',
      endpoint: 'mcp://sap.company.local:8080',
      lastSync: new Date(Date.now() - 60000),
      metrics: {
        requests: 1247,
        latency: 45,
        uptime: 99.8
      }
    },
    {
      id: 'mcp-scm',
      name: 'Supply Chain MCP',
      type: 'MCP',
      status: 'connected',
      icon: GitBranch,
      description: 'Gestione catena di fornitura e logistica',
      endpoint: 'mcp://scm.company.local:8081',
      lastSync: new Date(Date.now() - 120000),
      metrics: {
        requests: 892,
        latency: 32,
        uptime: 99.9
      }
    },
    {
      id: 'mcp-analytics',
      name: 'Analytics Engine',
      type: 'MCP',
      status: 'connected',
      icon: Activity,
      description: 'Motore di analisi predittive e reporting',
      endpoint: 'mcp://analytics.company.local:8082',
      lastSync: new Date(Date.now() - 30000),
      metrics: {
        requests: 3456,
        latency: 28,
        uptime: 100
      }
    },
    {
      id: 'db-postgres',
      name: 'PostgreSQL Main',
      type: 'Database',
      status: 'connected',
      icon: Database,
      description: 'Database principale per dati transazionali',
      endpoint: 'postgres://db.company.local:5432',
      lastSync: new Date(Date.now() - 5000),
      metrics: {
        requests: 15678,
        latency: 12,
        uptime: 99.99
      }
    },
    {
      id: 'api-rest',
      name: 'REST API Gateway',
      type: 'API',
      status: 'connected',
      icon: Globe,
      description: 'Gateway API per servizi esterni',
      endpoint: 'https://api.company.com',
      lastSync: new Date(),
      metrics: {
        requests: 8921,
        latency: 156,
        uptime: 99.5
      }
    }
  ];

  const availableIntegrations: Integration[] = [
    {
      id: 'mcp-crm',
      name: 'Salesforce CRM',
      type: 'MCP',
      status: 'disconnected',
      icon: Cloud,
      description: 'Integrazione CRM per gestione clienti'
    },
    {
      id: 'mcp-iot',
      name: 'IoT Device Manager',
      type: 'MCP',
      status: 'disconnected',
      icon: Cpu,
      description: 'Gestione dispositivi IoT di fabbrica'
    },
    {
      id: 'mcp-document',
      name: 'Document Server',
      type: 'MCP',
      status: 'disconnected',
      icon: HardDrive,
      description: 'Server documenti e knowledge base'
    },
    {
      id: 'api-oauth',
      name: 'OAuth Provider',
      type: 'API',
      status: 'disconnected',
      icon: Key,
      description: 'Provider autenticazione OAuth2'
    },
    {
      id: 'db-mongodb',
      name: 'MongoDB Analytics',
      type: 'Database',
      status: 'disconnected',
      icon: Database,
      description: 'Database NoSQL per analytics'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return CheckCircle;
      case 'error':
        return AlertCircle;
      default:
        return Link;
    }
  };

  const formatLastSync = (date?: Date) => {
    if (!date) return 'Mai';
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'Ora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m fa`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h fa`;
    return `${Math.floor(diff / 86400000)}g fa`;
  };

  const integrationsList = activeTab === 'active' ? activeIntegrations : availableIntegrations;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <Server className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Integrazioni Sistema</h2>
              <p className="text-xs text-gray-400">Server MCP e connessioni</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <Plus className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'active'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Attive ({activeIntegrations.length})
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'available'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Disponibili ({availableIntegrations.length})
          </button>
        </div>
      </div>

      {/* Integrations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {integrationsList.map((integration) => {
          const Icon = integration.icon;
          const StatusIcon = getStatusIcon(integration.status);
          const isSelected = selectedIntegration === integration.id;

          return (
            <div
              key={integration.id}
              onClick={() => setSelectedIntegration(isSelected ? null : integration.id)}
              className={`bg-white/5 hover:bg-white/10 rounded-xl p-4 cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-white/20' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-gradient-to-r ${
                    integration.type === 'MCP' ? 'from-blue-500 to-indigo-600' :
                    integration.type === 'Database' ? 'from-purple-500 to-pink-600' :
                    integration.type === 'API' ? 'from-yellow-500 to-orange-600' :
                    'from-green-500 to-emerald-600'
                  } rounded-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{integration.name}</h3>
                    <p className="text-xs text-gray-400">{integration.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusIcon className={`h-4 w-4 ${getStatusColor(integration.status)}`} />
                  <span className={`text-xs ${getStatusColor(integration.status)}`}>
                    {integration.status === 'connected' ? 'Connesso' :
                     integration.status === 'error' ? 'Errore' : 'Disconnesso'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-3">{integration.description}</p>

              {integration.endpoint && (
                <div className="flex items-center space-x-2 mb-2">
                  <Terminal className="h-3 w-3 text-gray-500" />
                  <code className="text-xs text-gray-300 font-mono">{integration.endpoint}</code>
                </div>
              )}

              {integration.status === 'connected' && integration.metrics && (
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
                  <div>
                    <p className="text-xs text-gray-500">Richieste</p>
                    <p className="text-sm font-semibold text-white">
                      {integration.metrics.requests?.toLocaleString('it-IT')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Latenza</p>
                    <p className="text-sm font-semibold text-white">
                      {integration.metrics.latency}ms
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Uptime</p>
                    <p className="text-sm font-semibold text-white">
                      {integration.metrics.uptime}%
                    </p>
                  </div>
                </div>
              )}

              {integration.lastSync && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <span className="text-xs text-gray-500">Ultimo sync</span>
                  <span className="text-xs text-gray-400">
                    {formatLastSync(integration.lastSync)}
                  </span>
                </div>
              )}

              {isSelected && integration.status === 'disconnected' && (
                <button className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition">
                  Connetti
                </button>
              )}

              {isSelected && integration.status === 'connected' && (
                <div className="flex space-x-2 mt-3">
                  <button className="flex-1 px-3 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition">
                    Test
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/30 transition">
                    Disconnetti
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="p-4 bg-black/30 backdrop-blur-xl border-t border-white/10">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-lg font-bold text-white">
                {activeIntegrations.filter(i => i.status === 'connected').length}
              </span>
            </div>
            <p className="text-xs text-gray-400">Integrazioni Attive</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Activity className="h-4 w-4 text-green-400" />
              <span className="text-lg font-bold text-white">28.5K</span>
            </div>
            <p className="text-xs text-gray-400">Richieste/ora</p>
          </div>
        </div>
        <div className="mt-3 p-2 bg-green-500/10 rounded-lg">
          <p className="text-xs text-green-400 text-center">
            Tutti i sistemi operativi • Uptime 99.9%
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPanel;