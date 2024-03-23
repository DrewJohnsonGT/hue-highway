'use client';

import { useState } from 'react';
import { SwatchesPicker } from 'react-color';
import { Button } from '~/components/Button';
import styles from './index.module.css';

interface AddColorProps {
  onSelectNewColor: (color: string) => void;
}

export const AddColor = ({ onSelectNewColor }: AddColorProps) => {
  const [isNewColorPickerOpen, setIsNewColorPickerOpen] =
    useState<boolean>(false);
  return (
    <div className={styles.root}>
      {isNewColorPickerOpen && (
        <div className={styles.pickerContainer}>
          <SwatchesPicker
            className={styles.picker}
            onChange={(color) => {
              onSelectNewColor(color.hex);
              setIsNewColorPickerOpen(false);
            }}
          />
        </div>
      )}
      <Button
        onClick={() => {
          setIsNewColorPickerOpen(!isNewColorPickerOpen);
        }}>
        Add New Color
      </Button>
    </div>
  );
};
