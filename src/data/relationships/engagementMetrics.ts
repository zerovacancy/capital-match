import { LP } from '../lps';

export interface EngagementMetric {
  lpId: string;
  responseRate: number; // percentage
  meetingsAttended: number; // count in last quarter
  communicationFrequency: number; // scale 1-10
  investmentVelocity: number; // scale 1-10
  overallEngagement: number; // scale 1-10
  trend: 'up' | 'down' | 'neutral';
}

export const engagementMetrics: EngagementMetric[] = [
  {
    lpId: "lp1",
    responseRate: 95,
    meetingsAttended: 4,
    communicationFrequency: 9,
    investmentVelocity: 8,
    overallEngagement: 9,
    trend: "up"
  },
  {
    lpId: "lp2",
    responseRate: 88,
    meetingsAttended: 3,
    communicationFrequency: 7,
    investmentVelocity: 6,
    overallEngagement: 7,
    trend: "neutral"
  },
  {
    lpId: "lp3",
    responseRate: 70,
    meetingsAttended: 2,
    communicationFrequency: 5,
    investmentVelocity: 3,
    overallEngagement: 4,
    trend: "down"
  },
  {
    lpId: "lp4",
    responseRate: 97,
    meetingsAttended: 5,
    communicationFrequency: 10,
    investmentVelocity: 9,
    overallEngagement: 10,
    trend: "up"
  },
  {
    lpId: "lp5",
    responseRate: 75,
    meetingsAttended: 2,
    communicationFrequency: 6,
    investmentVelocity: 5,
    overallEngagement: 6,
    trend: "neutral"
  },
  {
    lpId: "lp6",
    responseRate: 60,
    meetingsAttended: 1,
    communicationFrequency: 4,
    investmentVelocity: 2,
    overallEngagement: 3,
    trend: "down"
  },
  {
    lpId: "lp7",
    responseRate: 85,
    meetingsAttended: 3,
    communicationFrequency: 7,
    investmentVelocity: 8,
    overallEngagement: 8,
    trend: "up"
  },
  {
    lpId: "lp8",
    responseRate: 65,
    meetingsAttended: 1,
    communicationFrequency: 3,
    investmentVelocity: 3,
    overallEngagement: 3,
    trend: "down"
  },
  {
    lpId: "lp9",
    responseRate: 80,
    meetingsAttended: 2,
    communicationFrequency: 6,
    investmentVelocity: 5,
    overallEngagement: 6,
    trend: "neutral"
  },
  {
    lpId: "lp10",
    responseRate: 90,
    meetingsAttended: 4,
    communicationFrequency: 8,
    investmentVelocity: 7,
    overallEngagement: 8,
    trend: "up"
  }
];

// Note: We're including more LPs than are in the initial LP data to allow for future expansion

export const getEngagementMetricsByLpId = (lpId: string): EngagementMetric | undefined => {
  return engagementMetrics.find(metric => metric.lpId === lpId);
};

export const getTopEngagedLPs = (count: number = 5): EngagementMetric[] => {
  return [...engagementMetrics]
    .sort((a, b) => b.overallEngagement - a.overallEngagement)
    .slice(0, count);
};

export const getLPsNeedingAttention = (engagementThreshold: number = 5): EngagementMetric[] => {
  return engagementMetrics
    .filter(metric => metric.overallEngagement < engagementThreshold)
    .sort((a, b) => a.overallEngagement - b.overallEngagement);
};

export const getLPsByTrend = (trend: EngagementMetric['trend']): EngagementMetric[] => {
  return engagementMetrics.filter(metric => metric.trend === trend);
};

export const getAverageEngagement = (): number => {
  const total = engagementMetrics.reduce((sum, metric) => sum + metric.overallEngagement, 0);
  return total / engagementMetrics.length;
};