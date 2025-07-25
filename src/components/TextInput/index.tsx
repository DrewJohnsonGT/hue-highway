import styles from './index.module.css';

interface TextInputProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
}

export const TextInput = ({ label, onChange, value }: TextInputProps) => {
  return (
    <div className={styles.root}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
