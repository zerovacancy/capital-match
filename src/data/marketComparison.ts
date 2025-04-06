export interface MarketMetric {
  name: string;
  description: string;
  unit: string;
  benchmarks: {
    low: number;
    average: number;
    high: number;
  };
}

export interface MarketComparison {
  marketId: string;
  marketName: string;
  metrics: {
    [key: string]: number;
  };
  relativeStrength: number; // 1-10 scale
}

// Define the market metrics
export const marketMetrics: { [key: string]: MarketMetric } = {
  rentalGrowth: {
    name: "Rental Growth",
    description: "Annual projected rental growth rate",
    unit: "%",
    benchmarks: {
      low: 2,
      average: 3.5,
      high: 5.5
    }
  },
  occupancyRate: {
    name: "Occupancy Rate",
    description: "Average occupancy rate in market",
    unit: "%",
    benchmarks: {
      low: 92,
      average: 95,
      high: 98
    }
  },
  jobGrowth: {
    name: "Job Growth",
    description: "Annual job growth rate in market",
    unit: "%",
    benchmarks: {
      low: 1,
      average: 2.5,
      high: 4
    }
  },
  populationGrowth: {
    name: "Population Growth",
    description: "Annual population growth in market",
    unit: "%",
    benchmarks: {
      low: 0.5,
      average: 1.5,
      high: 3
    }
  },
  incomeGrowth: {
    name: "Income Growth",
    description: "Annual median income growth",
    unit: "%",
    benchmarks: {
      low: 1.5,
      average: 2.8,
      high: 4.5
    }
  },
  supplyPipeline: {
    name: "Supply Pipeline",
    description: "New units as % of existing inventory",
    unit: "%",
    benchmarks: {
      low: 1,
      average: 2.5,
      high: 5
    }
  }
};

// Market comparison data
export const marketComparisons: MarketComparison[] = [
  {
    marketId: "chicago",
    marketName: "Chicago, IL",
    metrics: {
      rentalGrowth: 3.2,
      occupancyRate: 94.5,
      jobGrowth: 2.1,
      populationGrowth: 0.8,
      incomeGrowth: 2.6,
      supplyPipeline: 1.9
    },
    relativeStrength: 7.2
  },
  {
    marketId: "denver",
    marketName: "Denver, CO",
    metrics: {
      rentalGrowth: 4.8,
      occupancyRate: 95.8,
      jobGrowth: 3.5,
      populationGrowth: 2.7,
      incomeGrowth: 3.9,
      supplyPipeline: 3.2
    },
    relativeStrength: 8.5
  },
  {
    marketId: "charlotte",
    marketName: "Charlotte, NC",
    metrics: {
      rentalGrowth: 4.5,
      occupancyRate: 96.2,
      jobGrowth: 3.3,
      populationGrowth: 2.4,
      incomeGrowth: 3.1,
      supplyPipeline: 3.8
    },
    relativeStrength: 8.1
  },
  {
    marketId: "nashville",
    marketName: "Nashville, TN",
    metrics: {
      rentalGrowth: 5.1,
      occupancyRate: 97.1,
      jobGrowth: 3.8,
      populationGrowth: 2.9,
      incomeGrowth: 3.7,
      supplyPipeline: 4.2
    },
    relativeStrength: 8.8
  },
  {
    marketId: "raleigh",
    marketName: "Raleigh, NC",
    metrics: {
      rentalGrowth: 4.2,
      occupancyRate: 95.9,
      jobGrowth: 3.4,
      populationGrowth: 2.5,
      incomeGrowth: 3.2,
      supplyPipeline: 2.9
    },
    relativeStrength: 8.0
  }
];

// Get market comparison for a specific deal location
export const getMarketComparisonForDeal = (dealLocation: string): MarketComparison | undefined => {
  // Extract city name from location (assuming format "City, State")
  const city = dealLocation.split(',')[0].trim().toLowerCase();
  
  // Find matching market
  return marketComparisons.find(market => 
    market.marketName.toLowerCase().includes(city)
  );
};
