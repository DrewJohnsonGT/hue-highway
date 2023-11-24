import { FaMinus, FaPlus } from 'react-icons/fa';
import { getContrastColor } from '~/util/getContrastColor';
import styles from './index.module.css';

interface ColorSquareProps {
  color: string;
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const ColorSquare = ({
  color,
  count,
  decrement,
  increment,
}: ColorSquareProps) => {
  const contrastingColor = getContrastColor(color);
  return (
    <div
      className={styles.square}
      style={{
        backgroundColor: `${color}AA`,
        borderColor: contrastingColor,
        color: contrastingColor,
      }}
    >
      <p className={styles.count}>{count}</p>
      <div
        className={styles.buttonWrapper}
        style={{ borderTop: `1px solid ${contrastingColor}` }}
      >
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
