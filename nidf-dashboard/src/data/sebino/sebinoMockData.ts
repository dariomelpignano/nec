// Mock data per Sebino Valvole - Dashboard ESG basata su ESRS
// Fonte: SebinoValvole_ESG_100_indicatori.csv

export interface ESRSIndicator {
  id: string;
  macrocategoria: string;
  categoria_specifica: string;
  valori_2024: string;
  fonte_dato: string;
  sistema_esterno?: string;
}

// KPI principali ESG
export const sebinoESGKPIs = {
  climate: {
    scope1_2_reduction_target: 36.8, // % riduzione al 2030 vs 2020
    scope3_reduction_target: 21.5, // % riduzione al 2035 vs 2020
    energy_intensity_mechanical: 39.8, // kWh/pezzo
    gas_consumption_painting: 1211, // MWh
    scope3_transport: 1445, // tCO2e
    scope3_product_use: 1429, // tCO2e
    scope3_materials: 17027 // tCO2e acciaio/ghisa
  },
  pollution: {
    svhc_substances: 3, // numero sostanze SVHC
    voc_emissions: 13, // t/anno
    exceedance_events: 2, // eventi superamento limiti
    sludge_production: 170, // t/anno totale
    cod_discharge: 110 // mg/L media
  },
  water: {
    total_withdrawal: 31652, // m³ fonderia
    consumption_foundry: 17716, // m³
    consumption_mechanical: 9201, // m³
    consumption_painting: 9043, // m³
    recycling_rate: 39.9, // % assemblaggio
    intensity_mechanical: 0.22 // m³/pezzo
  },
  circular: {
    recycling_rate_steel: 52.6, // % contenuto riciclato acciaio
    internal_scrap_recovery: 76.2, // % recupero rottami
    hazardous_waste_recovery: 75.0, // % avviati a recupero
    non_hazardous_waste_recovery: 93.4, // % avviati a recupero
    packaging_recycled: 64.0, // %
    mtbf: 50361, // ore
    takeback_program: 78 // t recuperate
  },
  workforce: {
    trir_foundry: 2.5,
    trir_warehouse: 1.7,
    near_miss_warehouse: 17,
    permanent_contracts_painting: 96.8, // %
    turnover_mechanical: 4.3, // %
    training_hours_mechanical: 41.8, // ore/FTE
    gender_balance_assembly: 28.0, // % donne
    gender_pay_gap_office: 2.8 // %
  },
  governance: {
    whistleblowing_closed: 3,
    anticorruption_training: 92.7, // % copertura
    policy_updated: 97.5, // %
    sanctions: 1,
    sanctions_amount: 3496, // €
    data_breach: 1,
    conflicts_of_interest: 2
  },
  supply_chain: {
    non_conformities: 24,
    avg_closure_days: 44,
    hse_training_participants: 148
  },
  community: {
    complaints: 0,
    avg_response_days: 10,
    public_consultations: 3,
    community_investment: 174963 // €
  },
  customers: {
    product_recalls: 1,
    safety_incidents: 2,
    complaints: 52,
    mttr_complaints: 6, // giorni
    ped_atex_compliance: 99.1 // %
  }
};

// Time series data per grafici clima/energia
export const climateTimeSeriesData = [
  { month: 'Gen', scope1_2: 245, scope3: 1650, target_s1_2: 250, target_s3: 1680 },
  { month: 'Feb', scope1_2: 238, scope3: 1620, target_s1_2: 248, target_s3: 1670 },
  { month: 'Mar', scope1_2: 242, scope3: 1640, target_s1_2: 246, target_s3: 1660 },
  { month: 'Apr', scope1_2: 235, scope3: 1610, target_s1_2: 244, target_s3: 1650 },
  { month: 'Mag', scope1_2: 230, scope3: 1590, target_s1_2: 242, target_s3: 1640 },
  { month: 'Giu', scope1_2: 228, scope3: 1580, target_s1_2: 240, target_s3: 1630 },
  { month: 'Lug', scope1_2: 225, scope3: 1570, target_s1_2: 238, target_s3: 1620 },
  { month: 'Ago', scope1_2: 220, scope3: 1550, target_s1_2: 236, target_s3: 1610 }
];

// Energy intensity per processo
export const energyIntensityByProcess = [
  { process: 'Fonderia', intensity: 45.2, benchmark: 48.0, unit: 'kWh/pezzo' },
  { process: 'Lavorazioni Meccaniche', intensity: 39.8, benchmark: 42.0, unit: 'kWh/pezzo' },
  { process: 'Verniciatura', intensity: 28.5, benchmark: 30.0, unit: 'kWh/pezzo' },
  { process: 'Assemblaggio', intensity: 12.3, benchmark: 15.0, unit: 'kWh/pezzo' },
  { process: 'Collaudo', intensity: 8.7, benchmark: 10.0, unit: 'kWh/pezzo' }
];

// Water consumption per area
export const waterConsumptionData = [
  { area: 'Fonderia', consumption: 17716, recycled: 6200, discharged: 9020 },
  { area: 'Lavorazioni Meccaniche', consumption: 9201, recycled: 3100, discharged: 5500 },
  { area: 'Verniciatura', consumption: 9043, recycled: 2800, discharged: 5800 },
  { area: 'Assemblaggio/Collaudo', consumption: 5600, recycled: 2234, discharged: 12437 }
];

// Circular economy metrics
export const circularEconomyMetrics = [
  { category: 'Recupero Trucioli', value: 76.2, unit: '%', trend: 'up' },
  { category: 'Contenuto Riciclato', value: 52.6, unit: '%', trend: 'up' },
  { category: 'Packaging Riciclato', value: 64.0, unit: '%', trend: 'stable' },
  { category: 'Rifiuti Non Pericolosi Recuperati', value: 93.4, unit: '%', trend: 'up' },
  { category: 'Rifiuti Pericolosi Recuperati', value: 75.0, unit: '%', trend: 'stable' }
];

// Waste production by type
export const wasteProductionData = [
  { type: 'Trucioli Tornitura', amount: 0.57, unit: 'kg/pezzo', category: 'Non pericoloso' },
  { type: 'Sfridi Taglio', amount: 1.43, unit: 'kg/pezzo', category: 'Non pericoloso' },
  { type: 'Fanghi/Emulsioni Fonderia', amount: 54, unit: 't/anno', category: 'Pericoloso' },
  { type: 'Fanghi/Emulsioni Meccanica', amount: 58, unit: 't/anno', category: 'Pericoloso' },
  { type: 'Fanghi/Emulsioni Assemblaggio', amount: 58, unit: 't/anno', category: 'Pericoloso' }
];

// H&S metrics per area
export const healthSafetyMetrics = [
  { area: 'Fonderia', trir: 2.5, near_miss: 8, exposure_noise: 8, exposure_dust: 12 },
  { area: 'Magazzino', trir: 1.7, near_miss: 17, exposure_noise: 3, exposure_dust: 15 },
  { area: 'Collaudo', trir: 1.2, near_miss: 5, exposure_noise: 2, exposure_dust: 7 },
  { area: 'Officina Meccanica', trir: 1.8, near_miss: 12, exposure_noise: 15, exposure_dust: 18 }
];

// ESRS Coverage per categoria
export const esrsCoverage = [
  { standard: 'ESRS E1 - Clima', indicators: 9, coverage: 100, assurance: 'Limited' },
  { standard: 'ESRS E2 - Inquinamento', indicators: 8, coverage: 100, assurance: 'Limited' },
  { standard: 'ESRS E3 - Acqua', indicators: 8, coverage: 100, assurance: 'Limited' },
  { standard: 'ESRS E4 - Biodiversità', indicators: 4, coverage: 95, assurance: 'None' },
  { standard: 'ESRS E5 - Economia Circolare', indicators: 8, coverage: 100, assurance: 'None' },
  { standard: 'ESRS S1 - Forza Lavoro', indicators: 12, coverage: 100, assurance: 'Limited' },
  { standard: 'ESRS S2 - Supply Chain', indicators: 3, coverage: 100, assurance: 'None' },
  { standard: 'ESRS S3 - Comunità', indicators: 4, coverage: 100, assurance: 'None' },
  { standard: 'ESRS S4 - Consumatori', indicators: 5, coverage: 100, assurance: 'None' },
  { standard: 'ESRS G1 - Governance', indicators: 7, coverage: 100, assurance: 'None' }
];

// Data quality score per fonte
export const dataQualityBySource = [
  { source: 'Pulse', quality: 98.5, volume: 45200, latency: 15 },
  { source: 'MES', quality: 96.8, volume: 38100, latency: 25 },
  { source: 'SAP', quality: 99.2, volume: 28400, latency: 10 },
  { source: 'Automate', quality: 97.3, volume: 15800, latency: 20 },
  { source: 'Bleen', quality: 94.5, volume: 8200, latency: 30 },
  { source: 'Sistemi Esterni', quality: 91.2, volume: 3400, latency: 120 }
];

// Materiality assessment
export const materialityTopics = [
  { topic: 'Clima ed Energia', financial_impact: 9, stakeholder_impact: 9, priority: 'Critico' },
  { topic: 'Acqua', financial_impact: 7, stakeholder_impact: 8, priority: 'Alto' },
  { topic: 'Economia Circolare', financial_impact: 8, stakeholder_impact: 7, priority: 'Alto' },
  { topic: 'Salute e Sicurezza', financial_impact: 8, stakeholder_impact: 9, priority: 'Critico' },
  { topic: 'Supply Chain', financial_impact: 7, stakeholder_impact: 7, priority: 'Alto' },
  { topic: 'Prodotto Sostenibile', financial_impact: 8, stakeholder_impact: 8, priority: 'Alto' },
  { topic: 'DEI (Diversity)', financial_impact: 6, stakeholder_impact: 7, priority: 'Medio' },
  { topic: 'Inquinamento', financial_impact: 7, stakeholder_impact: 8, priority: 'Alto' },
  { topic: 'Biodiversità', financial_impact: 5, stakeholder_impact: 6, priority: 'Medio' },
  { topic: 'Etica e Compliance', financial_impact: 8, stakeholder_impact: 8, priority: 'Alto' }
];

// CapEx/OpEx green investments
export const greenInvestments = [
  { year: 2022, capex: 1450000, opex: 980000 },
  { year: 2023, capex: 1720000, opex: 1050000 },
  { year: 2024, capex: 1900000, opex: 1150000 },
  { year: 2025, capex: 2200000, opex: 1280000, forecast: true }
];

// Real-time alerts/notifications
export const esgAlerts = [
  {
    id: 1,
    severity: 'high',
    category: 'E2 - Inquinamento',
    message: 'Superamento soglia VOC verniciatura',
    location: 'Lavorazioni Meccaniche',
    timestamp: '2024-10-20 14:32',
    status: 'open'
  },
  {
    id: 2,
    severity: 'medium',
    category: 'E3 - Acqua',
    message: 'Consumo idrico sopra media giornaliera',
    location: 'Fonderia',
    timestamp: '2024-10-20 12:15',
    status: 'acknowledged'
  },
  {
    id: 3,
    severity: 'low',
    category: 'S1 - H&S',
    message: 'Near-miss segnalato',
    location: 'Magazzino',
    timestamp: '2024-10-20 09:45',
    status: 'closed'
  },
  {
    id: 4,
    severity: 'high',
    category: 'E1 - Clima',
    message: 'Scope 1-2 fuori target mensile',
    location: 'Tutti i siti',
    timestamp: '2024-10-20 08:00',
    status: 'open'
  }
];

// Stakeholder engagement
export const stakeholderEngagement = [
  { stakeholder: 'Dipendenti', meetings: 12, surveys: 2, satisfaction: 78 },
  { stakeholder: 'Fornitori', meetings: 8, surveys: 1, satisfaction: 82 },
  { stakeholder: 'Clienti', meetings: 15, surveys: 3, satisfaction: 85 },
  { stakeholder: 'Comunità Locale', meetings: 3, surveys: 0, satisfaction: 71 },
  { stakeholder: 'Investitori', meetings: 6, surveys: 0, satisfaction: 88 },
  { stakeholder: 'Regolatori', meetings: 4, surveys: 0, satisfaction: 90 }
];

// Audit trail per compliance
export const auditTrail = [
  {
    id: 1,
    date: '2024-09-15',
    type: 'Interno',
    scope: 'ESRS E1-E2-E3',
    findings_major: 0,
    findings_minor: 3,
    status: 'Chiuso'
  },
  {
    id: 2,
    date: '2024-08-22',
    type: 'Interno',
    scope: 'ESRS S1',
    findings_major: 0,
    findings_minor: 2,
    status: 'Chiuso'
  },
  {
    id: 3,
    date: '2024-07-10',
    type: 'Limited Assurance',
    scope: 'ESRS E1-E2-E3-S1',
    findings_major: 0,
    findings_minor: 1,
    status: 'Chiuso'
  },
  {
    id: 4,
    date: '2024-06-05',
    type: 'Interno',
    scope: 'ESRS G1',
    findings_major: 0,
    findings_minor: 1,
    status: 'Chiuso'
  },
  {
    id: 5,
    date: '2024-10-18',
    type: 'Interno',
    scope: 'ESRS E5',
    findings_major: 0,
    findings_minor: 2,
    status: 'In corso'
  }
];

// Helper function per generare dati real-time
export const generateRealTimeESGData = () => {
  return {
    energy_intensity: 39.8 + (Math.random() - 0.5) * 2,
    water_consumption: 17716 + Math.floor((Math.random() - 0.5) * 1000),
    emissions_scope1_2: 228 + (Math.random() - 0.5) * 10,
    waste_recovery_rate: 93.4 + (Math.random() - 0.5) * 2,
    trir: 1.8 + (Math.random() - 0.5) * 0.4
  };
};

// Sites info
export const sebinoSites = [
  { id: 1, name: 'Sede Brescia', type: 'Fonderia + Uffici', employees: 145, area_m2: 12500 },
  { id: 2, name: 'Stabilimento Bergamo', type: 'Lavorazioni Meccaniche', employees: 98, area_m2: 8200 },
  { id: 3, name: 'Stabilimento Reggio Emilia', type: 'Assemblaggio + Collaudo', employees: 67, area_m2: 6800 },
  { id: 4, name: 'Hub Logistica', type: 'Magazzino', employees: 24, area_m2: 4500 }
];

export default {
  sebinoESGKPIs,
  climateTimeSeriesData,
  energyIntensityByProcess,
  waterConsumptionData,
  circularEconomyMetrics,
  wasteProductionData,
  healthSafetyMetrics,
  esrsCoverage,
  dataQualityBySource,
  materialityTopics,
  greenInvestments,
  esgAlerts,
  stakeholderEngagement,
  auditTrail,
  sebinoSites,
  generateRealTimeESGData
};
