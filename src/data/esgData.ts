export interface ESGMetric {
  id: string;
  category: 'energia' | 'emissioni' | 'acqua' | 'rifiuti' | 'materiali';
  label: string;
  value: number;
  unit: string;
  target?: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  scope?: 1 | 2 | 3;
}

export interface EnergyConsumption {
  timestamp: Date;
  total: number;
  renewable: number;
  nonRenewable: number;
  sources: {
    solar: number;
    wind: number;
    grid: number;
    gas: number;
    diesel: number;
  };
}

export interface EmissionsData {
  timestamp: Date;
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
  bySource: {
    combustion: number;
    electricity: number;
    transport: number;
    waste: number;
    supply_chain: number;
  };
}

export interface WaterMetrics {
  timestamp: Date;
  consumption: number;
  recycled: number;
  discharged: number;
  efficiency: number;
  bySite: {
    production: number;
    offices: number;
    cooling: number;
  };
}

export interface WasteMetrics {
  timestamp: Date;
  total: number;
  recycled: number;
  landfill: number;
  incinerated: number;
  byType: {
    paper: number;
    plastic: number;
    metal: number;
    organic: number;
    hazardous: number;
    electronic: number;
  };
}

export interface MaterialFlow {
  id: string;
  name: string;
  type: 'renewable' | 'non-renewable';
  quantity: number;
  unit: string;
  recycledContent: number;
  endOfLifeRecycling: number;
}

export const currentESGMetrics: ESGMetric[] = [
  {
    id: 'renewable-energy-ratio',
    category: 'energia',
    label: 'Energia Rinnovabile',
    value: 78.5,
    unit: '%',
    target: 85,
    trend: 'up',
    change: 12.3
  },
  {
    id: 'energy-intensity',
    category: 'energia',
    label: 'Intensità Energetica',
    value: 245.6,
    unit: 'kWh/ton',
    target: 220,
    trend: 'down',
    change: -8.5
  },
  {
    id: 'total-emissions',
    category: 'emissioni',
    label: 'Emissioni Totali',
    value: 2450,
    unit: 'ton CO₂e',
    target: 2000,
    trend: 'down',
    change: -18.5
  },
  {
    id: 'scope1-emissions',
    category: 'emissioni',
    label: 'Emissioni Scope 1',
    value: 850,
    unit: 'ton CO₂e',
    scope: 1,
    trend: 'down',
    change: -22.1
  },
  {
    id: 'scope2-emissions',
    category: 'emissioni',
    label: 'Emissioni Scope 2',
    value: 1100,
    unit: 'ton CO₂e',
    scope: 2,
    trend: 'down',
    change: -15.8
  },
  {
    id: 'scope3-emissions',
    category: 'emissioni',
    label: 'Emissioni Scope 3',
    value: 500,
    unit: 'ton CO₂e',
    scope: 3,
    trend: 'down',
    change: -12.3
  },
  {
    id: 'water-consumption',
    category: 'acqua',
    label: 'Consumo Idrico',
    value: 3450,
    unit: 'm³/mese',
    target: 3000,
    trend: 'down',
    change: -8.9
  },
  {
    id: 'water-recycling-rate',
    category: 'acqua',
    label: 'Tasso Riciclo Acqua',
    value: 65.3,
    unit: '%',
    target: 75,
    trend: 'up',
    change: 8.7
  },
  {
    id: 'waste-recycling-rate',
    category: 'rifiuti',
    label: 'Tasso Riciclo Rifiuti',
    value: 89.2,
    unit: '%',
    target: 95,
    trend: 'up',
    change: 15.2
  },
  {
    id: 'hazardous-waste',
    category: 'rifiuti',
    label: 'Rifiuti Pericolosi',
    value: 12.5,
    unit: 'ton/mese',
    target: 10,
    trend: 'down',
    change: -5.6
  },
  {
    id: 'renewable-materials',
    category: 'materiali',
    label: 'Materiali Rinnovabili',
    value: 45.6,
    unit: '%',
    target: 60,
    trend: 'up',
    change: 6.8
  },
  {
    id: 'circular-economy-index',
    category: 'materiali',
    label: 'Indice Economia Circolare',
    value: 72.3,
    unit: '%',
    target: 80,
    trend: 'up',
    change: 9.2
  }
];

export function generateEnergyConsumptionData(hours: number = 24): EnergyConsumption[] {
  const data: EnergyConsumption[] = [];
  const now = new Date();

  for (let i = hours - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseLoad = 500 + Math.sin(i * 0.26) * 100;
    const solar = Math.max(0, Math.sin((i - 6) * 0.26) * 200);
    const wind = 50 + Math.random() * 100;
    const grid = baseLoad - solar - wind + Math.random() * 50;
    const gas = Math.max(0, baseLoad * 0.2 + Math.random() * 50);

    data.push({
      timestamp,
      total: baseLoad + Math.random() * 100,
      renewable: solar + wind,
      nonRenewable: grid + gas,
      sources: {
        solar: Math.max(0, solar),
        wind: Math.max(0, wind),
        grid: Math.max(0, grid),
        gas: Math.max(0, gas),
        diesel: Math.random() * 10
      }
    });
  }

  return data;
}

export function generateEmissionsData(days: number = 30): EmissionsData[] {
  const data: EmissionsData[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const scope1 = 25 + Math.random() * 10;
    const scope2 = 35 + Math.random() * 15;
    const scope3 = 15 + Math.random() * 8;

    data.push({
      timestamp,
      scope1,
      scope2,
      scope3,
      total: scope1 + scope2 + scope3,
      bySource: {
        combustion: scope1 * 0.7,
        electricity: scope2 * 0.8,
        transport: scope1 * 0.3 + scope3 * 0.4,
        waste: scope3 * 0.3,
        supply_chain: scope3 * 0.3
      }
    });
  }

  return data;
}

export function generateWaterMetrics(days: number = 30): WaterMetrics[] {
  const data: WaterMetrics[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const consumption = 100 + Math.random() * 30;
    const recycled = consumption * (0.6 + Math.random() * 0.1);

    data.push({
      timestamp,
      consumption,
      recycled,
      discharged: consumption - recycled,
      efficiency: (recycled / consumption) * 100,
      bySite: {
        production: consumption * 0.7,
        offices: consumption * 0.1,
        cooling: consumption * 0.2
      }
    });
  }

  return data;
}

export function generateWasteMetrics(days: number = 30): WasteMetrics[] {
  const data: WasteMetrics[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const total = 500 + Math.random() * 100;
    const recycled = total * (0.85 + Math.random() * 0.05);
    const landfill = (total - recycled) * 0.6;

    data.push({
      timestamp,
      total,
      recycled,
      landfill,
      incinerated: total - recycled - landfill,
      byType: {
        paper: total * 0.25,
        plastic: total * 0.20,
        metal: total * 0.15,
        organic: total * 0.25,
        hazardous: total * 0.05,
        electronic: total * 0.10
      }
    });
  }

  return data;
}

export const materialFlows: MaterialFlow[] = [
  {
    id: 'wood-certified',
    name: 'Legno Certificato FSC',
    type: 'renewable',
    quantity: 450,
    unit: 'ton',
    recycledContent: 30,
    endOfLifeRecycling: 85
  },
  {
    id: 'bioplastic',
    name: 'Bioplastiche',
    type: 'renewable',
    quantity: 125,
    unit: 'ton',
    recycledContent: 15,
    endOfLifeRecycling: 60
  },
  {
    id: 'recycled-steel',
    name: 'Acciaio Riciclato',
    type: 'non-renewable',
    quantity: 680,
    unit: 'ton',
    recycledContent: 75,
    endOfLifeRecycling: 95
  },
  {
    id: 'virgin-plastic',
    name: 'Plastica Vergine',
    type: 'non-renewable',
    quantity: 230,
    unit: 'ton',
    recycledContent: 0,
    endOfLifeRecycling: 45
  },
  {
    id: 'aluminum',
    name: 'Alluminio',
    type: 'non-renewable',
    quantity: 150,
    unit: 'ton',
    recycledContent: 60,
    endOfLifeRecycling: 90
  },
  {
    id: 'natural-fibers',
    name: 'Fibre Naturali',
    type: 'renewable',
    quantity: 85,
    unit: 'ton',
    recycledContent: 20,
    endOfLifeRecycling: 70
  }
];

export const emissionFactors = {
  electricity: {
    grid: 0.385,
    solar: 0.048,
    wind: 0.011,
    hydro: 0.024
  },
  fuel: {
    naturalGas: 2.04,
    diesel: 2.68,
    gasoline: 2.31,
    lpg: 1.51
  },
  transport: {
    truck: 0.062,
    rail: 0.022,
    ship: 0.014,
    air: 0.500
  }
};

export const sustainabilityTargets = {
  2024: {
    renewableEnergy: 85,
    emissionsReduction: 25,
    waterEfficiency: 75,
    wasteRecycling: 95,
    renewableMaterials: 60
  },
  2030: {
    renewableEnergy: 100,
    emissionsReduction: 50,
    waterEfficiency: 90,
    wasteRecycling: 99,
    renewableMaterials: 80
  }
};