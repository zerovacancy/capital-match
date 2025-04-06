import { useState, useMemo, useCallback } from 'react';
import { Deal } from '@/data';
import { 
  ScenarioParam, 
  Scenario, 
  ScenarioModification, 
  ProjectedTimelinePoint, 
  ScenarioComparison 
} from './ScenarioModeling.types';

export function useScenarioModeling(deal: Deal) {
  // Define baseline parameters based on the deal
  const baselineParams: ScenarioParam[] = useMemo(() => [
    {
      id: "rentalGrowth",
      name: "Rental Growth",
      value: 3.0, // Default assumption
      min: 0,
      max: 10,
      step: 0.1,
      unit: "%",
      description: "Annual rental growth rate",
      impact: "high"
    },
    {
      id: "exitCap",
      name: "Exit Cap Rate",
      value: 5.0, // Default assumption
      min: 3.0,
      max: 8.0,
      step: 0.05,
      unit: "%",
      description: "Capitalization rate at exit",
      impact: "high"
    },
    {
      id: "constructionCosts",
      name: "Construction Costs",
      value: deal.capitalRequirements.totalInvestment * 0.7, // Assuming 70% of total is construction
      min: deal.capitalRequirements.totalInvestment * 0.5,
      max: deal.capitalRequirements.totalInvestment,
      step: 100000,
      unit: "$",
      description: "Total construction costs",
      impact: "high"
    },
    {
      id: "operatingExpenses",
      name: "Operating Expenses",
      value: 35, // Default percentage of revenue
      min: 25,
      max: 50,
      step: 1,
      unit: "%",
      description: "Operating expenses as % of revenue",
      impact: "medium"
    },
    {
      id: "vacancyRate",
      name: "Vacancy Rate",
      value: 5, // Default percentage
      min: 2,
      max: 15,
      step: 0.5,
      unit: "%",
      description: "Average vacancy rate",
      impact: "medium"
    },
    {
      id: "interestRate",
      name: "Interest Rate",
      value: 5.5, // Default percentage
      min: 3.0,
      max: 8.0,
      step: 0.1,
      unit: "%",
      description: "Loan interest rate",
      impact: "high"
    },
    {
      id: "loanToValue",
      name: "Loan to Value",
      value: Math.round(((deal.capitalRequirements.totalInvestment - deal.capitalRequirements.equityRequired) / 
                        deal.capitalRequirements.totalInvestment) * 100), // Calculate from deal data
      min: 50,
      max: 80,
      step: 1,
      unit: "%",
      description: "Loan to value ratio",
      impact: "medium"
    },
    {
      id: "constructionPeriod",
      name: "Construction Period",
      value: Math.round((new Date(deal.timeline.constructionEnd).getTime() - 
                        new Date(deal.timeline.constructionStart).getTime()) / 
                        (1000 * 60 * 60 * 24 * 30)), // Calculate months from deal data
      min: 6,
      max: 36,
      step: 1,
      unit: "months",
      description: "Construction timeline",
      impact: "medium"
    }
  ], [deal]);

  // State for current scenario parameters
  const [scenarioParams, setScenarioParams] = useState<ScenarioParam[]>(baselineParams);
  
  // State for saved scenarios
  const [savedScenarios, setSavedScenarios] = useState<Scenario[]>([
    {
      id: "baseline",
      name: "Baseline",
      params: baselineParams.reduce((acc, param) => {
        acc[param.id] = param.value;
        return acc;
      }, {} as { [key: string]: number }),
      projectedMetrics: {
        irr: deal.financialMetrics.projectedIRR,
        equityMultiple: deal.financialMetrics.projectedEM,
        cashOnCash: deal.financialMetrics.cashOnCash,
        roi: deal.financialMetrics.projectedIRR, // Simplification
        npv: deal.capitalRequirements.equityRequired * (deal.financialMetrics.projectedEM - 1), // Approximate NPV
        paybackPeriod: 60 // Default 5 years (60 months)
      }
    }
  ]);

  // State for the currently active scenario
  const [activeScenarioId, setActiveScenarioId] = useState<string>("baseline");

  // Find the active scenario
  const activeScenario = useMemo(() => 
    savedScenarios.find(s => s.id === activeScenarioId) || savedScenarios[0], 
    [savedScenarios, activeScenarioId]
  );

  // Calculate projected cash flows based on parameters
  const projectCashFlows = useCallback((params: { [key: string]: number }): ProjectedTimelinePoint[] => {
    const timeline: ProjectedTimelinePoint[] = [];
    
    // Extract key dates from the deal
    const acquisitionDate = new Date(deal.timeline.acquisitionDate);
    const constructionStartDate = new Date(deal.timeline.constructionStart);
    const constructionEndDate = new Date(deal.timeline.constructionEnd);
    const stabilizationDate = new Date(deal.timeline.stabilizationDate);
    const exitDate = new Date(deal.timeline.projectedExit);
    
    // Extract key parameters
    const constructionPeriod = params.constructionPeriod || 
      Math.round((constructionEndDate.getTime() - constructionStartDate.getTime()) / 
                (1000 * 60 * 60 * 24 * 30)); // months
    
    const rentalGrowth = params.rentalGrowth / 100 || 0.03; // convert from percentage
    const vacancyRate = params.vacancyRate / 100 || 0.05; // convert from percentage
    const opEx = params.operatingExpenses / 100 || 0.35; // convert from percentage
    const exitCap = params.exitCap / 100 || 0.05; // convert from percentage
    const loanToValue = params.loanToValue / 100 || 0.7; // convert from percentage
    const interestRate = params.interestRate / 100 || 0.055; // convert from percentage
    
    // Calculate basic financial metrics
    const totalInvestment = deal.capitalRequirements.totalInvestment;
    const equityRequired = deal.capitalRequirements.equityRequired;
    const debt = totalInvestment * loanToValue;
    
    // Simplified NOI calculation (would be more complex in real model)
    // Assume a base NOI that would support the projected IRR
    const baseAnnualNOI = totalInvestment * 0.06; // Simplified assumption: 6% yield on cost
    
    // Generate yearly cash flows
    let cumulativeCashFlow = -equityRequired; // Initial equity investment (negative cash flow)
    
    // Acquisition year
    const acquisitionYear = acquisitionDate.getFullYear();
    timeline.push({
      year: acquisitionYear,
      cashFlow: -equityRequired,
      cumulativeCashFlow,
      phase: "acquisition"
    });
    
    // Construction period
    for (let i = 1; i <= Math.ceil(constructionPeriod / 12); i++) {
      // Construction period typically has negative or zero cash flow
      timeline.push({
        year: acquisitionYear + i,
        cashFlow: 0, // Simplified: assuming no cash flow during construction
        cumulativeCashFlow,
        phase: "construction"
      });
    }
    
    // Stabilization to exit
    const stabilizationYear = stabilizationDate.getFullYear();
    const exitYear = exitDate.getFullYear();
    const operatingPeriod = exitYear - stabilizationYear;
    
    for (let i = 0; i < operatingPeriod; i++) {
      // Calculate growing NOI with compounding rental growth
      const growthFactor = Math.pow(1 + rentalGrowth, i);
      const yearlyNOI = baseAnnualNOI * growthFactor * (1 - vacancyRate) * (1 - opEx);
      
      // Debt service (simple calculation)
      const debtService = debt * interestRate;
      
      // Cash flow after debt service
      const cashFlow = yearlyNOI - debtService;
      cumulativeCashFlow += cashFlow;
      
      timeline.push({
        year: stabilizationYear + i,
        cashFlow,
        cumulativeCashFlow,
        phase: "stabilization"
      });
    }
    
    // Exit year (sale)
    const finalNOI = baseAnnualNOI * Math.pow(1 + rentalGrowth, operatingPeriod) * (1 - vacancyRate) * (1 - opEx);
    const exitValue = finalNOI / exitCap;
    const exitCashFlow = exitValue - debt; // Simplified: assuming debt payoff at exit
    cumulativeCashFlow += exitCashFlow;
    
    timeline.push({
      year: exitYear,
      cashFlow: exitCashFlow,
      cumulativeCashFlow,
      phase: "exit"
    });
    
    return timeline;
  }, [deal]);

  // Calculate the projected metrics based on modified parameters
  const calculateProjectedMetrics = useCallback((params: { [key: string]: number }): Scenario['projectedMetrics'] => {
    // Calculate cash flows
    const cashFlows = projectCashFlows(params);
    
    // Extract base metrics from deal
    const baseIRR = deal.financialMetrics.projectedIRR;
    const baseEM = deal.financialMetrics.projectedEM;
    const baseCOC = deal.financialMetrics.cashOnCash;
    
    // Calculate the impact of modified parameters
    // This is a simplified calculation - in a real model, these would be calculated from scratch
    
    // Impact factors (how much each parameter affects the metrics)
    const irr_impacts: { [key: string]: number } = {
      rentalGrowth: 0.2,
      exitCap: -0.25,
      constructionCosts: -0.1,
      operatingExpenses: -0.1,
      vacancyRate: -0.1,
      interestRate: -0.15,
      loanToValue: 0.05,
      constructionPeriod: -0.05
    };
    
    const em_impacts: { [key: string]: number } = {
      rentalGrowth: 0.15,
      exitCap: -0.2,
      constructionCosts: -0.1,
      operatingExpenses: -0.08,
      vacancyRate: -0.08,
      interestRate: -0.12,
      loanToValue: 0.05,
      constructionPeriod: -0.04
    };
    
    const coc_impacts: { [key: string]: number } = {
      rentalGrowth: 0.25,
      exitCap: 0,
      constructionCosts: -0.05,
      operatingExpenses: -0.15,
      vacancyRate: -0.15,
      interestRate: -0.2,
      loanToValue: 0.1,
      constructionPeriod: 0
    };
    
    // Calculate baseline parameters
    const baselineParamValues = baselineParams.reduce((acc, param) => {
      acc[param.id] = param.value;
      return acc;
    }, {} as { [key: string]: number });
    
    // Calculate percentage changes from baseline
    let irrAdjustment = 0;
    let emAdjustment = 0;
    let cocAdjustment = 0;
    
    for (const paramId in params) {
      if (baselineParamValues[paramId] !== undefined) {
        const baseValue = baselineParamValues[paramId];
        const newValue = params[paramId];
        
        if (baseValue !== 0) {
          const percentChange = (newValue - baseValue) / baseValue;
          
          irrAdjustment += percentChange * (irr_impacts[paramId] || 0);
          emAdjustment += percentChange * (em_impacts[paramId] || 0);
          cocAdjustment += percentChange * (coc_impacts[paramId] || 0);
        }
      }
    }
    
    // Apply adjustments to base metrics
    const projectedIRR = baseIRR * (1 + irrAdjustment);
    const projectedEM = baseEM * (1 + emAdjustment);
    const projectedCOC = baseCOC * (1 + cocAdjustment);
    
    // Calculate other metrics
    const equityRequired = deal.capitalRequirements.equityRequired;
    const totalInvestment = deal.capitalRequirements.totalInvestment;
    
    // Simple ROI calculation
    const roi = projectedIRR; // Simplified
    
    // Simple NPV calculation (very simplified)
    const npv = equityRequired * (projectedEM - 1);
    
    // Estimate payback period in months (simple approximation)
    // In a real model, this would be calculated from detailed cash flows
    const monthlyReturn = projectedCOC / 100 / 12 * equityRequired;
    const paybackPeriod = Math.round(equityRequired / monthlyReturn);
    
    return {
      irr: parseFloat(projectedIRR.toFixed(2)),
      equityMultiple: parseFloat(projectedEM.toFixed(2)),
      cashOnCash: parseFloat(projectedCOC.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      npv: parseFloat(npv.toFixed(0)),
      paybackPeriod
    };
  }, [deal, baselineParams, projectCashFlows]);

  // Update parameter value
  const updateParameter = useCallback((paramId: string, value: number) => {
    setScenarioParams(prevParams => 
      prevParams.map(param => 
        param.id === paramId ? { ...param, value } : param
      )
    );
  }, []);

  // Create a new scenario
  const createScenario = useCallback((name: string) => {
    // Get current parameter values
    const params = scenarioParams.reduce((acc, param) => {
      acc[param.id] = param.value;
      return acc;
    }, {} as { [key: string]: number });
    
    // Calculate projected metrics
    const projectedMetrics = calculateProjectedMetrics(params);
    
    // Create new scenario
    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      name,
      params,
      projectedMetrics
    };
    
    // Add to saved scenarios
    setSavedScenarios(prev => [...prev, newScenario]);
    
    // Set as active
    setActiveScenarioId(newScenario.id);
    
    return newScenario;
  }, [scenarioParams, calculateProjectedMetrics]);

  // Reset to baseline scenario
  const resetToBaseline = useCallback(() => {
    setScenarioParams(baselineParams);
    setActiveScenarioId("baseline");
  }, [baselineParams]);

  // Compare current scenario with baseline
  const compareWithBaseline = useCallback((): ScenarioComparison | null => {
    const baseline = savedScenarios.find(s => s.id === "baseline");
    if (!baseline || !activeScenario) return null;
    
    // Calculate differences
    const deltaMetrics = {
      irr: parseFloat((activeScenario.projectedMetrics.irr - baseline.projectedMetrics.irr).toFixed(2)),
      equityMultiple: parseFloat((activeScenario.projectedMetrics.equityMultiple - baseline.projectedMetrics.equityMultiple).toFixed(2)),
      cashOnCash: parseFloat((activeScenario.projectedMetrics.cashOnCash - baseline.projectedMetrics.cashOnCash).toFixed(2)),
      roi: parseFloat((activeScenario.projectedMetrics.roi - baseline.projectedMetrics.roi).toFixed(2)),
      npv: parseFloat((activeScenario.projectedMetrics.npv - baseline.projectedMetrics.npv).toFixed(0)),
      paybackPeriod: activeScenario.projectedMetrics.paybackPeriod - baseline.projectedMetrics.paybackPeriod
    };
    
    return {
      baselineScenario: baseline,
      updatedScenario: activeScenario,
      deltaMetrics
    };
  }, [savedScenarios, activeScenario]);

  // Get the current projected metrics based on current parameter values
  const currentProjectedMetrics = useMemo(() => {
    const params = scenarioParams.reduce((acc, param) => {
      acc[param.id] = param.value;
      return acc;
    }, {} as { [key: string]: number });
    
    return calculateProjectedMetrics(params);
  }, [scenarioParams, calculateProjectedMetrics]);

  // Get projected cash flows for the current scenario
  const currentCashFlows = useMemo(() => {
    const params = scenarioParams.reduce((acc, param) => {
      acc[param.id] = param.value;
      return acc;
    }, {} as { [key: string]: number });
    
    return projectCashFlows(params);
  }, [scenarioParams, projectCashFlows]);

  return {
    baselineParams,
    scenarioParams,
    savedScenarios,
    activeScenarioId,
    activeScenario,
    currentProjectedMetrics,
    currentCashFlows,
    updateParameter,
    createScenario,
    resetToBaseline,
    compareWithBaseline,
    setActiveScenarioId
  };
}
