import styles from './index.module.css';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
