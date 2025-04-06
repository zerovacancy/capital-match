import { Deal } from "@/data";

export interface ScenarioModelingProps {
  deal: Deal;
  className?: string;
}

export interface ScenarioParam {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  description: string;
  impact: "high" | "medium" | "low";
}

export interface Scenario {
  id: string;
  name: string;
  params: { [key: string]: number };
  projectedMetrics: {
    irr: number;
    equityMultiple: number;
    cashOnCash: number;
    roi: number;
    npv: number;
    paybackPeriod: number;
  };
}

export interface ScenarioParam {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  description: string;
  impact: "high" | "medium" | "low";
}

export interface ScenarioModification {
  paramId: string;
  value: number;
}

export interface ProjectedTimelinePoint {
  year: number;
  cashFlow: number;
  cumulativeCashFlow: number;
  phase: "acquisition" | "construction" | "stabilization" | "exit";
}

export interface ScenarioComparison {
  baselineScenario: Scenario;
  updatedScenario: Scenario;
  deltaMetrics: {
    irr: number;
    equityMultiple: number;
    cashOnCash: number;
    roi: number;
    npv: number;
    paybackPeriod: number;
  };
}
