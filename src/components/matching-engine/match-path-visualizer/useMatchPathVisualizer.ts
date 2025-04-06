import { useState, useMemo, useCallback } from 'react';
import { Match } from '@/data/matches';
import { LP } from '@/data/lps';
import { Deal } from '@/data/deals';
import { ConnectionPath, SimulationParameters } from './MatchPathVisualizer.types';

export const useMatchPathVisualizer = (match: Match, lp?: LP, deal?: Deal) => {
  const [simulationMode, setSimulationMode] = useState(false);
  const [simulationParams, setSimulationParams] = useState<SimulationParameters>({
    irr: deal?.financialMetrics.projectedIRR || 0,
    equityMultiple: deal?.financialMetrics.projectedEM || 0,
    investmentSize: deal?.capitalRequirements.minInvestment || 0,
    investmentHorizon: deal?.timeline.projectedExit ? 
      new Date(deal.timeline.projectedExit).getFullYear() - new Date(deal.timeline.acquisitionDate).getFullYear() : 0,
    locationPreference: 10, // Initial default values
    productPreference: 10,
  });

  // Calculate connection paths between LP criteria and deal attributes
  const connectionPaths = useMemo(() => {
    if (!match) return [];
    
    const paths: ConnectionPath[] = [];
    
    match.factors.forEach((factor, index) => {
      // Determine strength based on contribution score
      let strength: "strong" | "moderate" | "weak" = "moderate";
      if (factor.contribution >= 80) strength = "strong";
      else if (factor.contribution < 50) strength = "weak";
      
      paths.push({
        id: `connection-${index}`,
        source: `lp-${factor.factor.toLowerCase().replace(/\s+/g, '-')}`,
        target: `deal-${factor.factor.toLowerCase().replace(/\s+/g, '-')}`,
        strength,
        score: factor.score,
        factor: factor.factor,
        contribution: factor.contribution
      });
    });
    
    return paths;
  }, [match]);
  
  // Simulated confidence score when adjusting parameters
  const simulatedConfidenceScore = useMemo(() => {
    if (!simulationMode) return match.confidenceScore;
    
    // Simple simulation algorithm - would be more sophisticated in real implementation
    let baseScore = match.confidenceScore;
    const irrImpact = simulationParams.irr > (lp?.investmentParameters.targetIRR || 0) ? 5 : -5;
    const emImpact = simulationParams.equityMultiple > (lp?.investmentParameters.targetEM || 0) ? 3 : -3;
    const sizeImpact = simulationParams.investmentSize >= (lp?.investmentParameters.minInvestment || 0) && 
                       simulationParams.investmentSize <= (lp?.investmentParameters.maxInvestment || 0) ? 2 : -4;
    
    // Clamp the final score between 0-100
    return Math.max(0, Math.min(100, baseScore + irrImpact + emImpact + sizeImpact));
  }, [match.confidenceScore, simulationMode, simulationParams, lp]);
  
  // Suggested optimizations based on the current simulation parameters
  const suggestedOptimizations = useMemo(() => {
    if (!lp || !deal) return [];
    
    const suggestions = [];
    
    if (simulationParams.irr < lp.investmentParameters.targetIRR) {
      suggestions.push(`Increase IRR from ${simulationParams.irr}% to at least ${lp.investmentParameters.targetIRR}%`);
    }
    
    if (simulationParams.equityMultiple < lp.investmentParameters.targetEM) {
      suggestions.push(`Increase equity multiple from ${simulationParams.equityMultiple}x to at least ${lp.investmentParameters.targetEM}x`);
    }
    
    if (simulationParams.investmentSize < lp.investmentParameters.minInvestment) {
      suggestions.push(`Increase minimum investment from $${(simulationParams.investmentSize / 1000000).toFixed(1)}M to $${(lp.investmentParameters.minInvestment / 1000000).toFixed(1)}M`);
    }
    
    return suggestions;
  }, [lp, deal, simulationParams]);

  // Toggle simulation mode
  const toggleSimulationMode = useCallback(() => {
    setSimulationMode(prevMode => !prevMode);
  }, []);
  
  // Update simulation parameters
  const updateSimulationParam = useCallback((param: keyof SimulationParameters, value: number) => {
    setSimulationParams(prev => ({
      ...prev,
      [param]: value
    }));
  }, []);

  return {
    connectionPaths,
    simulationMode,
    simulationParams,
    simulatedConfidenceScore,
    suggestedOptimizations,
    toggleSimulationMode,
    updateSimulationParam
  };
};
