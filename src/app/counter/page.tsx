'use client';

import { v4 as uuid } from 'uuid';
import { AddColor, ColorSquare } from '~/components';
import { SITE_TITLE } from '~/constants';
import { useAppContext } from '~/context/useAppContext';
import styles from './page.module.css';

const CountingPage = () => {
  const { colors, setColors } = useAppContext();

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

  const sortedColors = colors.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    if (a.count < b.count) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{SITE_TITLE}</h1>
      <div className={styles.colorSquares}>
        {sortedColors.map((color) => (
          <ColorSquare
            key={color.id}
            color={color.hex}
            count={color.count}
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
