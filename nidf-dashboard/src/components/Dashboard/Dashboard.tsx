import React, { useState } from 'react';
import Header from './Header';
import MetricCard from './MetricCard';
import ProcessMonitor from './ProcessMonitor';
import DataFabric from '../Modules/DataFabric';
import Automate from '../Modules/Automate';
import Declaro from '../Modules/Declaro';
import Pulse from '../Modules/Pulse';
import Bleen from '../Modules/Bleen';
import ProductionChart from '../Charts/ProductionChart';
import WelcomeOverlay from './WelcomeOverlay';
import { metricsData } from '../../data/mockData';
import { Layers, Grid3x3, Brain, Activity, Database } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'modules' | 'analytics'>('overview');
  const [showWelcome, setShowWelcome] = useState(true);

  const navigationItems = [
    { id: 'overview', label: 'Panoramica', icon: Grid3x3 },
    { id: 'modules', label: 'Moduli AI', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {showWelcome && <WelcomeOverlay onClose={() => setShowWelcome(false)} />}
      <Header />

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-4">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Layers className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Navigazione</h3>
              </div>
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id as any)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition ${
                        activeView === item.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="border-t pt-4">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Database className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-xs font-semibold text-gray-700">Data Fabric Status</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Connessioni</span>
                    <span className="font-medium text-green-600">24/24</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Throughput</span>
                    <span className="font-medium text-blue-600">1.2K/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricsData.map((metric, index) => (
                  <MetricCard key={index} metric={metric} />
                ))}
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ProductionChart />
                </div>
                <DataFabric />
                <ProcessMonitor />
                <Pulse />
              </div>
            </div>
          )}

          {activeView === 'modules' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Moduli AI Intelligenti</h2>
                <p className="text-gray-600">Esplora le capacità AI della piattaforma NIDF</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Automate />
                <Declaro />
                <div className="xl:col-span-2">
                  <Bleen />
                </div>
              </div>
            </div>
          )}

          {activeView === 'analytics' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Insights</h2>
                <p className="text-gray-600">Monitoraggio in tempo reale e analisi predittive</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Pulse />
                <ProcessMonitor />
                <ProductionChart />
                <DataFabric />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;