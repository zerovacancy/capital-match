export interface CapitalSourceItem {
  source: string;
  amount: number;
  status: string;
}

export interface CapitalSourceBreakdownProps {
  data: CapitalSourceItem[];
  className?: string;
}
