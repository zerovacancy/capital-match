import { useMemo } from 'react';
import { getMarketComparisonForDeal, MarketComparison, marketMetrics } from '@/data';
import { Deal } from '@/data';
import { ChartDomain, MetricDisplayItem, RadarChartData } from './MarketComparisonChart.types';

export function useMarketComparisonChart(deal: Deal) {
  // Get market comparison data for the deal
  const marketComparison = useMemo(() => 
    getMarketComparisonForDeal(deal.location), 
    [deal.location]
  );

  // Create normalized data for radar chart
  const radarData: RadarChartData[] = useMemo(() => {
    if (!marketComparison) return [];

    return Object.entries(marketMetrics).map(([key, metric]) => {
      const value = marketComparison.metrics[key];
      const benchmark = metric.benchmarks.average;
      
      // Normalize to 0-100 scale for radar chart
      const min = Math.min(metric.benchmarks.low * 0.8, value * 0.8);
      const max = Math.max(metric.benchmarks.high * 1.2, value * 1.2);
      const range = max - min;
      const normalizedValue = ((value - min) / range) * 100;
      const normalizedBenchmark = ((benchmark - min) / range) * 100;
      
      return {
        metric: key,
        name: metric.name,
        value,
        normalizedValue,
        benchmark: normalizedBenchmark,
        fullMark: 100
      };
    });
  }, [marketComparison]);

  // Create domains for each metric
  const chartDomains: ChartDomain[] = useMemo(() => {
    return Object.entries(marketMetrics).map(([key, metric]) => {
      // Create a reasonable domain based on benchmarks
      const min = Math.min(metric.benchmarks.low * 0.8, 
                          marketComparison?.metrics[key] ? marketComparison.metrics[key] * 0.8 : 0);
      const max = Math.max(metric.benchmarks.high * 1.2, 
                          marketComparison?.metrics[key] ? marketComparison.metrics[key] * 1.2 : 0);
      
      return {
        name: key,
        domain: [min, max] as [number, number],
        unit: metric.unit
      };
    });
  }, [marketComparison]);

  // Create display items for the metrics table
  const metricItems: MetricDisplayItem[] = useMemo(() => {
    if (!marketComparison) return [];

    return Object.entries(marketMetrics).map(([key, metric]) => {
      const value = marketComparison.metrics[key];
      const benchmark = metric.benchmarks.average;
      
      // Determine if performance is above or below benchmark
      let performance: 'above' | 'below' | 'average' = 'average';
      
      // For supply pipeline, lower is better
      if (key === 'supplyPipeline') {
        performance = value < benchmark * 0.95 ? 'above' : 
                     value > benchmark * 1.05 ? 'below' : 'average';
      } else {
        // For everything else, higher is better
        performance = value > benchmark * 1.05 ? 'above' : 
                     value < benchmark * 0.95 ? 'below' : 'average';
      }
      
      return {
        id: key,
        name: metric.name,
        value,
        unit: metric.unit,
        benchmark,
        performance,
        description: metric.description
      };
    });
  }, [marketComparison]);

  // Overall market strength assessment
  const marketStrength = marketComparison?.relativeStrength || 0;
  const marketStrengthLabel = 
    marketStrength >= 8 ? 'Strong' :
    marketStrength >= 6 ? 'Moderate' : 'Weak';

  return {
    marketComparison,
    radarData,
    chartDomains,
    metricItems,
    marketStrength,
    marketStrengthLabel
  };
}
