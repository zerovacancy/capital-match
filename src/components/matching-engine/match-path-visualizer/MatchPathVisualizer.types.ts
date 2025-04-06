import { Match } from "@/data/matches";
import { LP } from "@/data/lps";
import { Deal } from "@/data/deals";

export interface MatchPathVisualizerProps {
  match: Match;
  lp?: LP;
  deal?: Deal;
  className?: string;
  showDetailedLabels?: boolean;
  animated?: boolean;
  onFactorClick?: (factor: string) => void;
}

export interface ConnectionPath {
  id: string;
  source: string;
  target: string;
  strength: "strong" | "moderate" | "weak";
  score: number;
  factor: string;
  contribution: number;
}

export interface SimulationParameters {
  irr: number;
  equityMultiple: number;
  investmentSize: number;
  investmentHorizon: number;
  locationPreference: number;
  productPreference: number;
}
