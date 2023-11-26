'use client';

import { createContext, useContext } from 'react';
import { type Color } from '~/types';

interface AppContext {
  colors: Color[];
  setColors: (colors: Color[]) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

export const Context = createContext<AppContext>({
  colors: [],
  isEditMode: false,
  setColors: () => {},
  toggleEditMode: () => {},
});

export const useAppContext = () => useContext(Context);
