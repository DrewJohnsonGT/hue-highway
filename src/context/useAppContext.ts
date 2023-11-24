'use client';

import { createContext, useContext } from 'react';
import { type Color } from '~/types';

interface AppContext {
  colors: Color[];
  setColors: (colors: Color[]) => void;
}

export const Context = createContext<AppContext>({
  colors: [],
  setColors: () => {},
});

export const useAppContext = () => useContext(Context);
