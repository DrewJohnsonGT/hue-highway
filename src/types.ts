export interface Color {
  count: number;
  hex: string;
  id: string;
}

export interface Trip {
  colors: Color[];
  created: string;
  id: string;
  lastUpdated: string;
  name: string;
}
