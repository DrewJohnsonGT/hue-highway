'use client';

import React, { type ReactNode, useState } from 'react';
import { DEFAULT_COLORS } from '~/constants';
import { Context } from '~/context/useAppContext';
import { type Color } from '~/types';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [colors, setColors] = useState<Color[]>(DEFAULT_COLORS);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <Context.Provider
      value={{
        colors,
        isEditMode,
        setColors,
        toggleEditMode,
      }}>
      {children}
    </Context.Provider>
  );
};
