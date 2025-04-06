import { Deal, MarketComparison, MarketMetric } from "@/data";

export interface MarketComparisonChartProps {
  deal: Deal;
  marketComparison?: MarketComparison;
  marketMetrics: { [key: string]: MarketMetric };
  className?: string;
}

export interface RadarChartData {
  metric: string;
  name: string;
  value: number;
  normalizedValue: number;
  benchmark: number;
  fullMark: number;
}

export interface ChartDomain {
  name: string;
  domain: [number, number];
  unit: string;
}

export interface MetricDisplayItem {
  id: string;
  name: string;
  value: number;
  unit: string;
  benchmark: number;
  performance: 'above' | 'below' | 'average';
  description: string;
}
