import { v4 as uuid } from 'uuid';

export const SITE_TITLE = 'Hue Highway';
export const SITE_DESCRIPTION = 'Site description';
export const DEFAULT_COLORS = [
  { count: 155, hex: '#FF0000', id: uuid() },
  { count: 10, hex: '#00FF00', id: uuid() },
  { count: 5, hex: '#0000FF', id: uuid() },
  { count: 5, hex: '#FFFF00', id: uuid() },
  { count: 3, hex: '#FF00FF', id: uuid() },
  { count: 2, hex: '#FFFFFF', id: uuid() },
  { count: 0, hex: '#000000', id: uuid() },
  { count: 0, hex: '#FF6666', id: uuid() },
  { count: 0, hex: '#66FF66', id: uuid() },
];
