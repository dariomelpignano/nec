export type IndustryType = 'manufacturing' | 'esg' | 'healthcare' | 'retail' | 'finance';

export interface IndustryConfig {
  id: IndustryType;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  metrics: MetricConfig[];
  modules: ModuleConfig[];
  defaultView: string;
}

export interface MetricConfig {
  id: string;
  label: string;
  value: number | string;
  unit: string;
  change?: number;
  icon: string;
  color: string;
  category?: string;
}

export interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export const industries: Record<IndustryType, IndustryConfig> = {
  manufacturing: {
    id: 'manufacturing',
    name: 'Settore Manifatturiero',
    description: 'Ottimizzazione processi produttivi e supply chain',
    primaryColor: 'from-blue-600 to-purple-600',
    secondaryColor: 'from-purple-600 to-pink-600',
    metrics: [
      {
        id: 'efficiency',
        label: 'Efficienza Operativa',
        value: 92.5,
        unit: '%',
        change: 5.2,
        icon: 'TrendingUp',
        color: 'from-green-400 to-emerald-600'
      },
      {
        id: 'documents',
        label: 'Documenti Processati',
        value: 1847,
        unit: 'oggi',
        change: 12.3,
        icon: 'FileText',
        color: 'from-blue-400 to-indigo-600'
      },
      {
        id: 'cycle-time',
        label: 'Tempo Ciclo Medio',
        value: '3.2',
        unit: 'ore',
        change: -15.7,
        icon: 'Clock',
        color: 'from-yellow-400 to-orange-600'
      },
      {
        id: 'quality',
        label: 'Qualità Prodotto',
        value: 98.7,
        unit: '%',
        change: 2.1,
        icon: 'Shield',
        color: 'from-purple-400 to-pink-600'
      }
    ],
    modules: [
      { id: 'dataFabric', name: 'Data Fabric', description: 'Integrazione dati real-time', enabled: true, icon: 'Database' },
      { id: 'automate', name: 'Automate', description: 'Elaborazione documenti intelligente', enabled: true, icon: 'Brain' },
      { id: 'declaro', name: 'Declaro', description: 'Configuratore prodotti AI', enabled: true, icon: 'Package' },
      { id: 'pulse', name: 'Pulse', description: 'Analytics predittive', enabled: true, icon: 'Activity' },
      { id: 'bleen', name: 'Bleen', description: 'AI Assistant', enabled: true, icon: 'MessageSquare' }
    ],
    defaultView: 'overview'
  },

  esg: {
    id: 'esg',
    name: 'ESG & Sostenibilità',
    description: 'Monitoraggio e ottimizzazione impatto ambientale',
    primaryColor: 'from-green-600 to-emerald-600',
    secondaryColor: 'from-emerald-600 to-teal-600',
    metrics: [
      {
        id: 'renewable-energy',
        label: 'Energia Rinnovabile',
        value: 78.5,
        unit: '%',
        change: 12.3,
        icon: 'Zap',
        color: 'from-green-400 to-emerald-600',
        category: 'energia'
      },
      {
        id: 'co2-emissions',
        label: 'Emissioni CO₂',
        value: 2450,
        unit: 'ton CO₂e',
        change: -18.5,
        icon: 'Cloud',
        color: 'from-blue-400 to-cyan-600',
        category: 'emissioni'
      },
      {
        id: 'water-recycling',
        label: 'Acqua Riciclata',
        value: 65.3,
        unit: '%',
        change: 8.7,
        icon: 'Droplets',
        color: 'from-cyan-400 to-blue-600',
        category: 'acqua'
      },
      {
        id: 'waste-recycling',
        label: 'Rifiuti Riciclati',
        value: 89.2,
        unit: '%',
        change: 15.2,
        icon: 'Recycle',
        color: 'from-purple-400 to-indigo-600',
        category: 'rifiuti'
      },
      {
        id: 'renewable-materials',
        label: 'Materiali Rinnovabili',
        value: 45.6,
        unit: '%',
        change: 6.8,
        icon: 'Leaf',
        color: 'from-lime-400 to-green-600',
        category: 'materiali'
      },
      {
        id: 'energy-consumption',
        label: 'Consumo Energetico',
        value: 12450,
        unit: 'MWh',
        change: -5.3,
        icon: 'Battery',
        color: 'from-yellow-400 to-orange-600',
        category: 'energia'
      },
      {
        id: 'scope1-emissions',
        label: 'Emissioni Scope 1',
        value: 850,
        unit: 'ton CO₂e',
        change: -22.1,
        icon: 'Factory',
        color: 'from-red-400 to-orange-600',
        category: 'emissioni'
      },
      {
        id: 'water-consumption',
        label: 'Consumo Idrico',
        value: 3450,
        unit: 'm³',
        change: -8.9,
        icon: 'Waves',
        color: 'from-blue-400 to-indigo-600',
        category: 'acqua'
      }
    ],
    modules: [
      { id: 'energyMonitor', name: 'Energy Monitor', description: 'Monitoraggio consumi energetici', enabled: true, icon: 'Zap' },
      { id: 'carbonTracker', name: 'Carbon Tracker', description: 'Tracking emissioni CO₂', enabled: true, icon: 'Cloud' },
      { id: 'waterManagement', name: 'Water Management', description: 'Gestione risorse idriche', enabled: true, icon: 'Droplets' },
      { id: 'wasteAnalytics', name: 'Waste Analytics', description: 'Analisi gestione rifiuti', enabled: true, icon: 'Trash2' },
      { id: 'supplyChainESG', name: 'Supply Chain ESG', description: 'Sostenibilità catena fornitura', enabled: true, icon: 'Link' },
      { id: 'reporting', name: 'ESG Reporting', description: 'Report compliance ESG', enabled: true, icon: 'FileBarChart' }
    ],
    defaultView: 'esg-overview'
  },

  healthcare: {
    id: 'healthcare',
    name: 'Sanità',
    description: 'Gestione ospedaliera e assistenza sanitaria',
    primaryColor: 'from-red-600 to-pink-600',
    secondaryColor: 'from-pink-600 to-purple-600',
    metrics: [
      { id: 'patients', label: 'Pazienti Attivi', value: 1234, unit: 'totali', change: 5.2, icon: 'Users', color: 'from-blue-400 to-indigo-600' },
      { id: 'bed-occupancy', label: 'Occupazione Letti', value: 78.5, unit: '%', change: -2.3, icon: 'Bed', color: 'from-green-400 to-emerald-600' },
      { id: 'wait-time', label: 'Tempo Attesa Medio', value: '45', unit: 'min', change: -12.5, icon: 'Clock', color: 'from-yellow-400 to-orange-600' },
      { id: 'satisfaction', label: 'Soddisfazione', value: 4.5, unit: '/5', change: 8.1, icon: 'Heart', color: 'from-red-400 to-pink-600' }
    ],
    modules: [
      { id: 'patientCare', name: 'Patient Care', description: 'Gestione pazienti', enabled: true, icon: 'Heart' },
      { id: 'resourcePlanning', name: 'Resource Planning', description: 'Pianificazione risorse', enabled: true, icon: 'Calendar' },
      { id: 'medicalRecords', name: 'Medical Records', description: 'Cartelle cliniche digitali', enabled: true, icon: 'FileText' },
      { id: 'pharmacy', name: 'Pharmacy', description: 'Gestione farmaci', enabled: true, icon: 'Pill' },
      { id: 'diagnostics', name: 'Diagnostics', description: 'Analisi diagnostiche', enabled: true, icon: 'Activity' }
    ],
    defaultView: 'patient-overview'
  },

  retail: {
    id: 'retail',
    name: 'Retail',
    description: 'Gestione vendite e customer experience',
    primaryColor: 'from-orange-600 to-yellow-600',
    secondaryColor: 'from-yellow-600 to-green-600',
    metrics: [
      { id: 'revenue', label: 'Fatturato Giornaliero', value: 125000, unit: '€', change: 15.2, icon: 'Euro', color: 'from-green-400 to-emerald-600' },
      { id: 'transactions', label: 'Transazioni', value: 3456, unit: 'oggi', change: 8.7, icon: 'ShoppingCart', color: 'from-blue-400 to-indigo-600' },
      { id: 'conversion', label: 'Conversion Rate', value: 3.8, unit: '%', change: 12.1, icon: 'TrendingUp', color: 'from-purple-400 to-pink-600' },
      { id: 'inventory', label: 'Inventory Turnover', value: 8.2, unit: 'x', change: 5.4, icon: 'Package', color: 'from-yellow-400 to-orange-600' }
    ],
    modules: [
      { id: 'pos', name: 'POS System', description: 'Sistema punti vendita', enabled: true, icon: 'CreditCard' },
      { id: 'inventory', name: 'Inventory', description: 'Gestione magazzino', enabled: true, icon: 'Package' },
      { id: 'crm', name: 'Customer CRM', description: 'Gestione clienti', enabled: true, icon: 'Users' },
      { id: 'analytics', name: 'Sales Analytics', description: 'Analisi vendite', enabled: true, icon: 'BarChart3' },
      { id: 'loyalty', name: 'Loyalty Program', description: 'Programma fedeltà', enabled: true, icon: 'Gift' }
    ],
    defaultView: 'sales-overview'
  },

  finance: {
    id: 'finance',
    name: 'Servizi Finanziari',
    description: 'Banking e gestione investimenti',
    primaryColor: 'from-indigo-600 to-blue-600',
    secondaryColor: 'from-blue-600 to-cyan-600',
    metrics: [
      { id: 'aum', label: 'Assets Under Management', value: '2.5B', unit: '€', change: 8.3, icon: 'Wallet', color: 'from-green-400 to-emerald-600' },
      { id: 'transactions', label: 'Transazioni', value: 125000, unit: 'oggi', change: 12.5, icon: 'ArrowUpDown', color: 'from-blue-400 to-indigo-600' },
      { id: 'npl', label: 'NPL Ratio', value: 2.3, unit: '%', change: -15.2, icon: 'AlertTriangle', color: 'from-red-400 to-orange-600' },
      { id: 'roi', label: 'ROI Portfolio', value: 12.8, unit: '%', change: 3.2, icon: 'TrendingUp', color: 'from-purple-400 to-pink-600' }
    ],
    modules: [
      { id: 'trading', name: 'Trading Platform', description: 'Piattaforma trading', enabled: true, icon: 'LineChart' },
      { id: 'riskManagement', name: 'Risk Management', description: 'Gestione rischio', enabled: true, icon: 'Shield' },
      { id: 'compliance', name: 'Compliance', description: 'Conformità normativa', enabled: true, icon: 'CheckCircle' },
      { id: 'portfolio', name: 'Portfolio Manager', description: 'Gestione portafoglio', enabled: true, icon: 'Briefcase' },
      { id: 'kyc', name: 'KYC/AML', description: 'Verifica identità', enabled: true, icon: 'UserCheck' }
    ],
    defaultView: 'portfolio-overview'
  }
};

export function getIndustryFromURL(): IndustryType {
  const urlParams = new URLSearchParams(window.location.search);
  const industry = urlParams.get('industry') as IndustryType;

  if (industry && industries[industry]) {
    return industry;
  }

  return 'manufacturing';
}