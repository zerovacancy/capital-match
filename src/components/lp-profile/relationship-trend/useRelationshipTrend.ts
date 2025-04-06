import { useMemo } from 'react';
import { getRelationshipHistory } from '@/data/relationshipHistory';

export function useRelationshipTrend(lpId: string) {
  const relationshipHistory = useMemo(() => {
    return getRelationshipHistory(lpId);
  }, [lpId]);

  // Calculate a moving average for the trend line
  const trendData = useMemo(() => {
    if (!relationshipHistory.length) return [];
    
    // Sort by date
    const sortedHistory = [...relationshipHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Format dates for display
    return sortedHistory.map(point => ({
      ...point,
      formattedDate: new Date(point.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    }));
  }, [relationshipHistory]);

  // Calculate metrics
  const metrics = useMemo(() => {
    if (!trendData.length) return { 
      currentStrength: 0, 
      averageStrength: 0, 
      changeLastMonth: 0,
      trend: 'stable' as 'improving' | 'declining' | 'stable'
    };

    const currentStrength = trendData[trendData.length - 1].strength;
    const averageStrength = trendData.reduce((acc, point) => acc + point.strength, 0) / trendData.length;
    
    // Get first and last points to determine overall trend
    const firstPoint = trendData[0];
    const lastPoint = trendData[trendData.length - 1];
    
    // Calculate change last month (or period)
    let changeLastMonth = 0;
    if (trendData.length >= 2) {
      const previousPoint = trendData[trendData.length - 2];
      changeLastMonth = lastPoint.strength - previousPoint.strength;
    }
    
    // Determine trend
    let trend: 'improving' | 'declining' | 'stable';
    if (lastPoint.strength > firstPoint.strength) {
      trend = 'improving';
    } else if (lastPoint.strength < firstPoint.strength) {
      trend = 'declining';
    } else {
      trend = 'stable';
    }
    
    return {
      currentStrength,
      averageStrength: parseFloat(averageStrength.toFixed(1)),
      changeLastMonth,
      trend
    };
  }, [trendData]);

  return {
    trendData,
    metrics
  };
}