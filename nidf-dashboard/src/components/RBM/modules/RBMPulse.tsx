import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, TrendingUp, Cpu, Factory, Zap, Gauge, Banknote } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const RBMPulse: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState('linea3');
  const [liveData, setLiveData] = useState<any[]>([]);

  // Digital Twin data per linea produttiva
  const digitalTwinData = {
    linea3: {
      nome: 'Linea Assemblaggio Valvole',
      oee: 84.6,
      disponibilita: 92,
      performance: 88,
      qualita: 98.5,
      pezziOra: 245,
      target: 280,
      temperatura: 22.5,
      vibrazioni: 0.8,
      consumoEnergia: 125
    }
  };

  // Dati simulati manutenzione predittiva
  const maintenanceData = [
    { componente: 'Motore A1', salute: 85, prossimaManutenzione: '15 giorni', rischio: 'basso' },
    { componente: 'Cuscinetti B2', salute: 62, prossimaManutenzione: '3 giorni', rischio: 'medio' },
    { componente: 'Sensore Pressione', salute: 45, prossimaManutenzione: 'Immediata', rischio: 'alto' },
    { componente: 'PLC Controllo', salute: 95, prossimaManutenzione: '2 mesi', rischio: 'basso' },
    { componente: 'Nastro Trasportatore', salute: 78, prossimaManutenzione: '1 settimana', rischio: 'medio' }
  ];

  // Anomalie rilevate
  const anomalies = [
    {
      id: 1,
      macchina: 'Pressa Idraulica P-03',
      tipo: 'Pressione anomala',
      valore: '185 bar',
      normale: '150-170 bar',
      impatto: 'Qualità prodotto',
      severity: 'high'
    },
    {
      id: 2,
      macchina: 'Robot Saldatura RS-12',
      tipo: 'Deriva posizione',
      valore: '+2.3mm',
      normale: '±0.5mm',
      impatto: 'Precisione assemblaggio',
      severity: 'medium'
    },
    {
      id: 3,
      macchina: 'Forno Trattamento FT-01',
      tipo: 'Ciclo rallentato',
      valore: '47 min',
      normale: '40 min',
      impatto: 'Throughput -15%',
      severity: 'low'
    }
  ];

  // Simulazione scorte e forecast
  const inventoryForecast = [
    { materiale: 'Ottone CW617N', scorte: 2500, consumoGiorno: 180, giorniAutonomia: 14, riordino: false },
    { materiale: 'Guarnizioni EPDM', scorte: 8500, consumoGiorno: 650, giorniAutonomia: 13, riordino: false },
    { materiale: 'Viteria Inox A2', scorte: 1200, consumoGiorno: 450, giorniAutonomia: 3, riordino: true },
    { materiale: 'Molle Acciaio C70', scorte: 450, consumoGiorno: 85, giorniAutonomia: 5, riordino: true },
    { materiale: 'O-Ring Viton', scorte: 3200, consumoGiorno: 120, giorniAutonomia: 27, riordino: false }
  ];

  // OEE trend data
  const oeeData = [
    { ora: '08:00', oee: 82, disponibilita: 90, performance: 85, qualita: 97 },
    { ora: '09:00', oee: 85, disponibilita: 92, performance: 88, qualita: 98 },
    { ora: '10:00', oee: 88, disponibilita: 95, performance: 90, qualita: 98 },
    { ora: '11:00', oee: 84, disponibilita: 88, performance: 87, qualita: 99 },
    { ora: '12:00', oee: 79, disponibilita: 85, performance: 82, qualita: 98 },
    { ora: '13:00', oee: 81, disponibilita: 87, performance: 84, qualita: 99 },
    { ora: '14:00', oee: 86, disponibilita: 91, performance: 89, qualita: 98 },
    { ora: '15:00', oee: 87, disponibilita: 92, performance: 90, qualita: 98 }
  ];

  // Radar chart per performance multi-dimensionale
  const performanceRadar = [
    { metric: 'Velocità', A: 88, B: 92, target: 90 },
    { metric: 'Qualità', A: 98, B: 96, target: 98 },
    { metric: 'Efficienza', A: 85, B: 89, target: 85 },
    { metric: 'Disponibilità', A: 92, B: 88, target: 90 },
    { metric: 'Flessibilità', A: 78, B: 82, target: 80 },
    { metric: 'Sicurezza', A: 95, B: 97, target: 95 }
  ];

  useEffect(() => {
    // Simula aggiornamento real-time
    const interval = setInterval(() => {
      const newPoint = {
        time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        valore: 80 + Math.random() * 15,
        target: 85
      };
      setLiveData(prev => [...prev.slice(-19), newPoint]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'alto': return 'text-red-600 bg-red-100';
      case 'medio': return 'text-yellow-600 bg-yellow-100';
      case 'basso': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="h-6 w-6 text-green-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Pulse - Digital Twin & Analytics Predittive</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Cpu className="h-5 w-5 text-green-500 animate-pulse" />
          <span className="text-sm text-gray-600">Digital Twin Attivo</span>
        </div>
      </div>

      {/* Digital Twin Status */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800">
            Digital Twin - {digitalTwinData[selectedLine].nome}
          </h3>
          <select
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
            className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="linea3">Linea 3 - Valvole</option>
            <option value="linea4">Linea 4 - Collettori</option>
            <option value="linea5">Linea 5 - Componenti</option>
          </select>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <div className="text-center p-3 bg-white rounded-lg">
            <Gauge className="h-5 w-5 mx-auto mb-1 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900">{digitalTwinData[selectedLine].oee}%</p>
            <p className="text-xs text-gray-600">OEE</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-xl font-bold text-green-600">{digitalTwinData[selectedLine].disponibilita}%</p>
            <p className="text-xs text-gray-600">Disponibilità</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-xl font-bold text-blue-600">{digitalTwinData[selectedLine].performance}%</p>
            <p className="text-xs text-gray-600">Performance</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-xl font-bold text-purple-600">{digitalTwinData[selectedLine].qualita}%</p>
            <p className="text-xs text-gray-600">Qualità</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Zap className="h-5 w-5 mx-auto mb-1 text-orange-600" />
            <p className="text-xl font-bold text-orange-600">{digitalTwinData[selectedLine].consumoEnergia}</p>
            <p className="text-xs text-gray-600">kW/h</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* OEE Trend */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Trend OEE Giornaliero</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={oeeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="ora" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} domain={[70, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="oee" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Performance Multi-dimensionale</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={performanceRadar}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" fontSize={10} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
              <Radar name="Linea A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Linea B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Radar name="Target" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" fillOpacity={0} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Manutenzione Predittiva */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Manutenzione Predittiva</h3>
        <div className="space-y-2">
          {maintenanceData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Factory className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.componente}</p>
                  <p className="text-xs text-gray-500">Prossima manutenzione: {item.prossimaManutenzione}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <span className="text-xs text-gray-600 mr-2">Salute:</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.salute > 80 ? 'bg-green-500' :
                        item.salute > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.salute}%` }}
                    />
                  </div>
                  <span className="ml-2 text-xs font-medium">{item.salute}%</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(item.rischio)}`}>
                  Rischio {item.rischio}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anomalie Rilevate */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Anomalie Rilevate dal Digital Twin</h3>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </div>
        <div className="space-y-2">
          {anomalies.map(anomaly => (
            <div key={anomaly.id} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{anomaly.macchina}</p>
                  <p className="text-xs text-gray-600 mt-1">{anomaly.tipo}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="font-medium">Valore rilevato:</span> {anomaly.valore}
                    <span className="ml-2">(Normale: {anomaly.normale})</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">
                    <span className="font-medium">Impatto:</span> {anomaly.impatto}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  anomaly.severity === 'high' ? 'bg-red-100 text-red-700' :
                  anomaly.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {anomaly.severity === 'high' ? 'Alta' : anomaly.severity === 'medium' ? 'Media' : 'Bassa'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Scorte */}
      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Forecast Scorte Materie Prime</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-600">
                <th className="text-left pb-2">Materiale</th>
                <th className="text-center pb-2">Scorte (kg)</th>
                <th className="text-center pb-2">Consumo/giorno</th>
                <th className="text-center pb-2">Autonomia</th>
                <th className="text-center pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventoryForecast.map((item, idx) => (
                <tr key={idx} className="border-t border-orange-100">
                  <td className="py-2 font-medium text-gray-700">{item.materiale}</td>
                  <td className="text-center">{item.scorte}</td>
                  <td className="text-center">{item.consumoGiorno}</td>
                  <td className="text-center">
                    <span className={`font-medium ${
                      item.giorniAutonomia < 7 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {item.giorniAutonomia} giorni
                    </span>
                  </td>
                  <td className="text-center">
                    {item.riordino ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Riordinare
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Savings */}
      <div className="mt-4 grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
        <div>
          <div className="flex items-center mb-1">
            <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
            <p className="text-sm text-gray-600">Ottimizzazioni Suggerite</p>
          </div>
          <p className="text-xl font-bold text-gray-900">18 azioni</p>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <Banknote className="h-4 w-4 text-green-600 mr-2" />
            <p className="text-sm text-gray-600">Risparmio Previsto</p>
          </div>
          <p className="text-xl font-bold text-gray-900">€62K/mese</p>
        </div>
      </div>
    </div>
  );
};

export default RBMPulse;