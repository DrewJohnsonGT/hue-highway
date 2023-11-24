'use client';

import React, { type ReactNode, useState } from 'react';
import { DEFAULT_COLORS } from '~/constants';
import { Context } from '~/context/useAppContext';
import { type Color } from '~/types';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState<Color[]>(DEFAULT_COLORS);
  return (
    <Context.Provider
      value={{
        colors,
        setColors,
      }}
    >
      {children}
    </Context.Provider>
  );
};
