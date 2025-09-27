# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the Neosperience Intelligent Data Fabric (NIDF) demo application - a sophisticated dashboard showcasing the platform's AI-driven capabilities for Italian manufacturing SMEs. The project demonstrates NIDF's comprehensive approach to digital transformation through Data Fabric architecture and intelligent automation modules.

The demo is located in the `/nidf-dashboard` subdirectory and represents a fully functional React application with real-time data visualization and AI module demonstrations.

## Commands

```bash
# Navigate to the dashboard directory
cd nidf-dashboard

# Install dependencies
npm install

# Run development server (available at http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## Architecture

### High-Level Structure
The application is a single-page React application built with Vite and TypeScript. It features a main Dashboard component that orchestrates multiple AI module demonstrations, each operating independently but sharing a cohesive design system.

Key architectural decisions:
- **Component-based architecture**: Each NIDF module (Automate, Declaro, Pulse, Bleen) is a self-contained component with its own state management
- **Real-time simulation**: Uses React hooks (useEffect with intervals) to simulate live data updates
- **Responsive layout**: Three-panel layout with sidebar navigation, adaptable to different screen sizes
- **Data layer**: Mock data in `/src/data/mockData.ts` provides realistic Italian manufacturing scenarios

### Component Hierarchy
```
App.tsx
└── Dashboard.tsx (main orchestrator)
    ├── Header.tsx (top navigation bar)
    ├── WelcomeOverlay.tsx (animated intro with Framer Motion)
    ├── MetricCard.tsx (KPI display cards)
    ├── ProcessMonitor.tsx (real-time process tracking)
    └── Modules/
        ├── DataFabric.tsx (data connectivity monitor)
        ├── Automate.tsx (document processing simulator)
        ├── Declaro.tsx (product configurator)
        ├── Pulse.tsx (predictive analytics with Recharts)
        └── Bleen.tsx (AI chat interface)
```

### State Management Pattern
- Local component state via useState for UI interactions
- Simulated async updates via useEffect for real-time feel
- No global state management needed due to demo nature
- Each module maintains its own data lifecycle

### Styling Architecture
- Tailwind CSS utility classes for rapid development
- Custom gradient backgrounds for visual appeal
- Consistent color scheme: blue-600/purple-600 for primary actions
- Card-based layout with hover effects and transitions

## Key Features to Maintain

1. **Italian Language**: All UI text, labels, and content must be in Italian
2. **Real-time Updates**: Dashboard components should show live data changes
3. **Manufacturing Focus**: Data and scenarios should reflect Italian SME manufacturing context
4. **AI Showcases**: Each module should demonstrate concrete AI capabilities
5. **Professional Design**: Maintain a modern, enterprise-grade visual appearance
6. **Mobile Responsiveness**: Dashboard should work on tablets and large screens

## Key NIDF Modules

### Data Fabric (`/src/components/Modules/DataFabric.tsx`)
Displays real-time data connectivity metrics including connected sources, data volume, query throughput, and latency. Updates every 3 seconds to simulate live monitoring.

### Automate (`/src/components/Modules/Automate.tsx`)
Simulates intelligent document processing with state transitions (in_coda → in_elaborazione → processato). Shows accuracy metrics and processing status for invoices, DDTs, and contracts.

### Declaro (`/src/components/Modules/Declaro.tsx`)
Product configuration manager displaying saved configurations with pricing and approval status. Demonstrates the knowledge management aspect of complex product customization.

### Pulse (`/src/components/Modules/Pulse.tsx`)
Real-time analytics with predictive charts using Recharts. Features anomaly detection, efficiency tracking, and cost-saving recommendations. Updates chart data every 5 seconds.

### Bleen (`/src/components/Modules/Bleen.tsx`)
Interactive AI chat interface with suggested questions and simulated responses. Demonstrates natural language interaction with enterprise data.

## Data Simulation Details

The mock data (`/src/data/mockData.ts`) includes:
- **metricsData**: KPI metrics with trends (efficiency, documents processed, cycle time, quality)
- **performanceData**: Time-series data for charts
- **productionByCategory**: Manufacturing output by product type (valves, pumps, compressors)
- **processesData**: Real-time process monitoring with progress tracking
- **documentsData**: Document processing queue simulation
- **savedConfigurations**: Product configurations from Declaro
- **dataFabricMetrics**: System connectivity and performance metrics

Helper functions:
- `generateRealTimeData()`: Creates random time-series data
- `updateMetrics()`: Simulates metric fluctuations

## Important Context

This demo represents Neosperience's vision for bringing enterprise-grade AI capabilities to Italian SMEs. It showcases how the platform evolves from basic data harmonization through intelligent automation to a full AI-native platform. The three-phase evolution (Data Fabric → Process Automation → AI-Native Platform) should be clearly visible in the user experience.

The dashboard operates entirely on simulated data to demonstrate capabilities without requiring backend services. All text and labels are in Italian to align with the target market of Italian manufacturing SMEs.