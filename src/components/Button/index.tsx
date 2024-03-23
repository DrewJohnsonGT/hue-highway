import styles from './index.module.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
