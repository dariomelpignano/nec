import React from 'react';
import {
  Bell, AlertTriangle, CheckCircle, Info, Package,
  TrendingUp, Users, Clock, X, ArrowRight, AlertCircle,
  Zap, Database, Shield
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  icon: any;
  actionLabel?: string;
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Scorte Componente Critico',
      message: 'Le scorte di cuscinetti SKF-2024 sono sotto il livello minimo. Rimanenti: 12 unità. Si consiglia di emettere ordine urgente.',
      timestamp: new Date(Date.now() - 15 * 60000),
      icon: Package,
      actionLabel: 'Crea Ordine',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: 'Ordine Completato',
      message: 'L\'ordine OC-2024-1756 per Beta Manufacturing è stato completato con successo e spedito. Valore: €54,000',
      timestamp: new Date(Date.now() - 30 * 60000),
      icon: CheckCircle,
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Manutenzione Programmata',
      message: 'Manutenzione preventiva schedulata per Linea 2 domani alle 14:00. Durata stimata: 2 ore.',
      timestamp: new Date(Date.now() - 45 * 60000),
      icon: Clock,
      actionLabel: 'Visualizza Dettagli',
      read: false
    },
    {
      id: '4',
      type: 'error',
      title: 'Anomalia Qualità Rilevata',
      message: 'Il sistema AI ha rilevato un\'anomalia nel lotto L-892. Tasso di difetti: 4.2% (soglia: 2%). Richiesta ispezione immediata.',
      timestamp: new Date(Date.now() - 60 * 60000),
      icon: AlertTriangle,
      actionLabel: 'Avvia Ispezione',
      read: false
    },
    {
      id: '5',
      type: 'success',
      title: 'Target Mensile Raggiunto',
      message: 'Congratulazioni! Il fatturato di settembre ha superato il target del 15%. Totale: €1.75M',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      icon: TrendingUp,
      read: true
    },
    {
      id: '6',
      type: 'info',
      title: 'Nuovo Cliente Premium',
      message: 'NewTech Corp è stato aggiunto come cliente Premium. Potenziale fatturato annuo: €450K',
      timestamp: new Date(Date.now() - 3 * 60 * 60000),
      icon: Users,
      actionLabel: 'Vedi Profilo',
      read: true
    },
    {
      id: '7',
      type: 'warning',
      title: 'Backup Sistema Completato',
      message: 'Backup automatico dei dati completato con successo. 856 GB salvati nel cloud. Prossimo backup: 02:00',
      timestamp: new Date(Date.now() - 4 * 60 * 60000),
      icon: Database,
      read: true
    },
    {
      id: '8',
      type: 'info',
      title: 'Aggiornamento AI Model',
      message: 'Il modello di previsione della domanda è stato aggiornato. Accuratezza migliorata: 87% → 91%',
      timestamp: new Date(Date.now() - 5 * 60 * 60000),
      icon: Zap,
      read: true
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'from-yellow-500 to-orange-500';
      case 'success':
        return 'from-green-500 to-emerald-500';
      case 'info':
        return 'from-blue-500 to-indigo-500';
      case 'error':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30';
      case 'error':
        return 'bg-red-500/10 border-red-500/30';
      default:
        return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `${minutes} minuti fa`;
    } else if (hours < 24) {
      return `${hours} ore fa`;
    } else {
      return date.toLocaleDateString('it-IT');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed right-96 top-16 w-96 h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-l border-white/10 shadow-2xl z-50"
      style={{ animation: 'slideInLeft 0.3s ease-out' }}
    >
      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Notifiche</h3>
              <p className="text-xs text-gray-400">
                {notifications.filter(n => !n.read).length} non lette
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="flex space-x-2 mt-4">
          <button className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-medium">
            Tutte
          </button>
          <button className="px-3 py-1 bg-white/5 text-gray-400 hover:bg-white/10 rounded-lg text-xs font-medium transition">
            Non lette
          </button>
          <button className="px-3 py-1 bg-white/5 text-gray-400 hover:bg-white/10 rounded-lg text-xs font-medium transition">
            Importanti
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto h-[calc(100%-200px)]">
        <div className="p-4 space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`relative p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer ${
                  notification.read
                    ? 'bg-white/5 border-white/10'
                    : `${getTypeBgColor(notification.type)} bg-opacity-50`
                }`}
              >
                {!notification.read && (
                  <div className="absolute top-2 right-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(notification.type)}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-2">
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(notification.timestamp)}
                      </span>

                      {notification.actionLabel && (
                        <button className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 transition">
                          <span>{notification.actionLabel}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition">
          Segna tutte come lette
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;