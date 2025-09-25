export interface MetricData {
  label: string;
  value: number | string;
  change?: number;
  unit?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  category?: string;
}

export interface ProcessData {
  id: string;
  nome: string;
  stato: 'completato' | 'in_corso' | 'in_attesa';
  progresso: number;
  tempoRimanente?: string;
}

export interface DocumentData {
  id: string;
  tipo: string;
  nome: string;
  dataProcessamento: Date;
  accuratezza: number;
  stato: 'processato' | 'in_elaborazione' | 'in_coda';
}

// Dati simulati per le metriche principali
export const metricsData: MetricData[] = [
  { label: 'Efficienza Operativa', value: 92.5, change: 5.2, unit: '%' },
  { label: 'Documenti Processati', value: 1847, change: 12.3, unit: 'oggi' },
  { label: 'Tempo Ciclo Medio', value: '3.2', change: -15.7, unit: 'ore' },
  { label: 'Qualità Prodotto', value: 98.7, change: 2.1, unit: '%' },
];

// Dati per il grafico delle performance
export const performanceData: ChartDataPoint[] = [
  { name: 'Gen', value: 85 },
  { name: 'Feb', value: 88 },
  { name: 'Mar', value: 87 },
  { name: 'Apr', value: 91 },
  { name: 'Mag', value: 89 },
  { name: 'Giu', value: 92 },
  { name: 'Lug', value: 94 },
  { name: 'Ago', value: 93 },
  { name: 'Set', value: 95 },
];

// Dati per produzione per categoria
export const productionByCategory = [
  { name: 'Valvole Industriali', value: 3456 },
  { name: 'Pompe Centrifughe', value: 2890 },
  { name: 'Compressori', value: 2145 },
  { name: 'Scambiatori di Calore', value: 1876 },
  { name: 'Filtri Speciali', value: 1234 },
];

// Processi in tempo reale
export const processesData: ProcessData[] = [
  { id: '1', nome: 'Ordine #ORD-2024-001', stato: 'in_corso', progresso: 75, tempoRimanente: '2h 15m' },
  { id: '2', nome: 'Configurazione Pompa PC-500', stato: 'in_corso', progresso: 45, tempoRimanente: '4h 30m' },
  { id: '3', nome: 'Analisi Qualità Lotto L-789', stato: 'completato', progresso: 100 },
  { id: '4', nome: 'Fatturazione Cliente Alfa SPA', stato: 'in_attesa', progresso: 0 },
  { id: '5', nome: 'Manutenzione Predittiva Linea 3', stato: 'in_corso', progresso: 60, tempoRimanente: '1h 45m' },
];

// Documenti recenti
export const documentsData: DocumentData[] = [
  {
    id: '1',
    tipo: 'Fattura',
    nome: 'FT-2024-0892',
    dataProcessamento: new Date('2024-09-24T10:30:00'),
    accuratezza: 99.2,
    stato: 'processato'
  },
  {
    id: '2',
    tipo: 'DDT',
    nome: 'DDT-2024-3421',
    dataProcessamento: new Date('2024-09-24T11:15:00'),
    accuratezza: 98.7,
    stato: 'processato'
  },
  {
    id: '3',
    tipo: 'Ordine',
    nome: 'ORD-2024-0156',
    dataProcessamento: new Date('2024-09-24T11:45:00'),
    accuratezza: 0,
    stato: 'in_elaborazione'
  },
  {
    id: '4',
    tipo: 'Contratto',
    nome: 'CTR-BETA-2024',
    dataProcessamento: new Date('2024-09-24T12:00:00'),
    accuratezza: 0,
    stato: 'in_coda'
  },
];

// Dati per il Knowledge Graph (Bleen)
export const knowledgeGraphData = {
  nodes: [
    { id: 1, label: 'Prodotti', group: 1 },
    { id: 2, label: 'Clienti', group: 2 },
    { id: 3, label: 'Fornitori', group: 3 },
    { id: 4, label: 'Processi', group: 4 },
    { id: 5, label: 'Documenti', group: 5 },
    { id: 6, label: 'Macchinari', group: 6 },
  ],
  links: [
    { source: 1, target: 2, value: 10 },
    { source: 1, target: 3, value: 8 },
    { source: 2, target: 4, value: 6 },
    { source: 3, target: 5, value: 7 },
    { source: 4, target: 6, value: 9 },
    { source: 5, target: 1, value: 5 },
  ]
};

// Simulazione di dati in tempo reale per il Data Fabric
export const dataFabricMetrics = {
  fontiCollegate: 24,
  volumeDatiGB: 856,
  queryAlSecondo: 1250,
  latenzaMedia: 45, // ms
  qualitaDati: 97.3, // %
};

// Configurazioni prodotto salvate (Declaro)
export const savedConfigurations = [
  {
    id: '1',
    nome: 'Pompa Centrifuga PC-500-CUSTOM',
    cliente: 'Alfa Manufacturing SPA',
    dataCreazione: new Date('2024-09-20'),
    prezzo: 45600,
    stato: 'approvato',
  },
  {
    id: '2',
    nome: 'Valvola Industriale VI-200-SPEC',
    cliente: 'Beta Industrie SRL',
    dataCreazione: new Date('2024-09-22'),
    prezzo: 12300,
    stato: 'in_revisione',
  },
  {
    id: '3',
    nome: 'Compressore CP-800-PRO',
    cliente: 'Gamma Tech SPA',
    dataCreazione: new Date('2024-09-23'),
    prezzo: 78900,
    stato: 'bozza',
  },
];

// Funzione per generare dati casuali in tempo reale
export function generateRealTimeData(): ChartDataPoint[] {
  return Array.from({ length: 10 }, (_, i) => ({
    name: `T-${i}`,
    value: Math.floor(Math.random() * 100) + 50,
  }));
}

// Funzione per simulare l'aggiornamento delle metriche
export function updateMetrics(metrics: MetricData[]): MetricData[] {
  return metrics.map(metric => ({
    ...metric,
    value: typeof metric.value === 'number'
      ? metric.value + (Math.random() - 0.5) * 2
      : metric.value,
    change: metric.change ? metric.change + (Math.random() - 0.5) : metric.change,
  }));
}