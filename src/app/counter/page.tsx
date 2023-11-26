'use client';

import { v4 as uuid } from 'uuid';
import { AddColor, ColorSquare } from '~/components';
import { useAppContext } from '~/context/useAppContext';
import styles from './page.module.css';

const CountingPage = () => {
  const { colors, isEditMode, setColors } = useAppContext();

  const handleIncrement = (id: string) => {
    const newColors = colors.map((color) => {
      if (color.id === id) {
        return {
          ...color,
          count: color.count + 1,
        };
      }
      return color;
    });
    setColors(newColors);
  };

  const handleDecrement = (id: string) => {
    const newColors = colors.map((color) => {
      if (color.id === id) {
        return {
          ...color,
          count: color.count - 1,
        };
      }
      return color;
    });
    setColors(newColors);
  };

  const handleAddNewColor = (newColor: string) => {
    const newColors = [
      ...colors,
      {
        count: 0,
        hex: newColor,
        id: uuid(),
      },
    ];
    setColors(newColors);
  };

  const handleRemove = (id: string) => {
    const newColors = colors.filter((color) => color.id !== id);
    setColors(newColors);
  };

  return (
    <div className={styles.root}>
      <div className={styles.colorSquares}>
        {colors.map((color) => (
          <ColorSquare
            key={color.id}
            color={color.hex}
            count={color.count}
            isEditMode={isEditMode}
            handleRemove={() => {
              handleRemove(color.id);
            }}
            increment={() => {
              handleIncrement(color.id);
            }}
            decrement={() => {
              handleDecrement(color.id);
            }}
          />
        ))}
      </div>
      <AddColor
        onSelectNewColor={(newColor) => {
          handleAddNewColor(newColor);
        }}
      />
    </div>
  );
};

export default CountingPage;
