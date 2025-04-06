# Deal Analyzer Market Comparison Component

## Overview

The Market Comparison Chart component is a new addition to the Capital Match AI Platform that enables users to visualize and analyze how a deal's market metrics compare to industry benchmarks. This component enhances the platform's deal analysis capabilities by providing deeper market insights using radar chart visualization and metric tables.

The implementation follows LG Development's visual identity with the specified color palette and component architecture patterns.

## Technical Implementation

### Directory Structure

The Market Comparison component follows the established modular component architecture:

```
/src/components/deal-analyzer/market-comparison/
├── MarketComparisonChart.tsx        # The main radar chart component
├── MarketComparisonChart.types.ts   # TypeScript interfaces
├── useMarketComparisonChart.ts      # Custom hook for data transformation
├── DealMarketAnalyzer.tsx           # Standalone analyzer component
└── index.ts                         # Export file
```

### Data Structure

A new data module has been added to the project:

```
/src/data/marketComparison.ts
```

This file contains:

1. Market metrics definitions with benchmarks
2. Market comparison data for each target market
3. Utility functions to map deal locations to market data

### Components

#### MarketComparisonChart

The primary component that renders the radar chart visualization and metrics table. Features include:

- Radar chart comparing market metrics against benchmarks
- Interactive tooltips with detailed metric information
- Tabbed interface switching between chart and table views
- Color-coded performance indicators
- Overall market strength score

#### DealMarketAnalyzer

A standalone component that provides:

- Deal selection dropdown
- Deal summary information
- Market comparison visualization
- Explanatory content

### Hooks

#### useMarketComparisonChart

Custom hook that:

1. Finds the appropriate market data for a given deal
2. Normalizes data for radar chart visualization
3. Calculates performance indicators (above/below/average)
4. Creates domain ranges for each metric
5. Provides formatted data for the UI components

## User Experience

The Market Comparison feature has been integrated in two places:

1. As a new tab in the Deal Detail component, accessible via the "Market Analysis" tab
2. As a standalone analyzer in a dedicated "Market Analyzer" tab in the Deal Analysis Engine

This provides users with multiple ways to access the market data depending on their workflow.

## Visual Design

The implementation follows LG Development's visual identity:

- Primary color (#275E91) for deal data in the radar chart
- Secondary color (#7A8D79) for benchmark data
- Performance indicators use green (#22c55e), yellow (#f59e0b), and red (#ef4444) to indicate strength
- Consistent spacing, typography, and component styling with the rest of the platform

## Animations and Interactivity

- Smooth tab transitions between chart and table views
- Interactive tooltips on hover for data points and information icons
- Responsive design that adapts to available space

## Next Steps

Future enhancements could include:

1. Historical market trend visualization
2. Competitor analysis in the same markets
3. AI-powered market forecasting
4. More detailed sub-market level data

## Technical Details for Developers

### Key TypeScript Interfaces

```typescript
// Main component props
export interface MarketComparisonChartProps {
  deal: Deal;
  marketComparison?: MarketComparison;
  marketMetrics: { [key: string]: MarketMetric };
  className?: string;
}

// Radar chart data structure
export interface RadarChartData {
  metric: string;
  name: string;
  value: number;
  normalizedValue: number;
  benchmark: number;
  fullMark: number;
}
```

### Data Normalization

The radar chart requires normalized data points for visualization. The data is normalized to a 0-100 scale through the following process:

1. For each metric, find an appropriate min-max range based on benchmarks and actual values
2. Calculate normalized values within this range
3. Create formatted display values with appropriate units

This approach ensures that all metrics can be visualized consistently regardless of their different units and scales.
