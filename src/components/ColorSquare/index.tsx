import { FaMinus, FaPlus, FaRegTimesCircle } from 'react-icons/fa';
import clsx from 'clsx';
import { getContrastColor } from '~/util/getContrastColor';
import styles from './index.module.css';

interface ColorSquareProps {
  color: string;
  count: number;
  isEditMode: boolean;
  handleRemove: () => void;
  increment: () => void;
  decrement: () => void;
}

export const ColorSquare = ({
  color,
  count,
  decrement,
  handleRemove,
  increment,
  isEditMode,
}: ColorSquareProps) => {
  const contrastingColor = getContrastColor(color);
  return (
    <div
      className={clsx(styles.square, isEditMode && styles.shake)}
      style={{
        animationDelay: `${Math.random() * 0.5}s`,
        backgroundColor: `${color}AA`,
        borderColor: contrastingColor,
        color: contrastingColor,
      }}>
      {isEditMode && (
        <FaRegTimesCircle
          className={styles.removeButton}
          onClick={handleRemove}
        />
      )}
      <div
        className={styles.color}
        style={{
          backgroundColor: color,
          border: `1px solid ${contrastingColor}`,
          opacity: isEditMode ? 0 : 1,
        }}
      />
      <p className={styles.count}>{count}</p>
      <div
        className={styles.buttonWrapper}
        style={{ borderTop: `1px solid ${contrastingColor}` }}>
        <div className={styles.button} onClick={decrement}>
          <FaMinus />
        </div>
        <div className={styles.button} onClick={increment}>
          <FaPlus />
        </div>
      </div>
    </div>
  );
};
