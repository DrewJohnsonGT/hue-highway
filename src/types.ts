export interface Color {
  id: string;
  hex: string;
  count: number;
}

export interface Trip {
  created: string;
  colors: Color[];
  lastUpdated: string;
  id: string;
  name: string;
}
