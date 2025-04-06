export interface RelationshipTrendPoint {
  date: string;
  strength: number; // 1-10
  event?: string;
}

export interface RelationshipTrendProps {
  lpId: string;
  className?: string;
}